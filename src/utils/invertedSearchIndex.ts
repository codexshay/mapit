import { interviewQDatabase, InterviewQItem } from '../data/interviewQDatabase';
import { TOOLS_LIBRARY, SKILLS_LIBRARY, CERTIFICATIONS_LIBRARY, ToolLibraryItem, SkillLibraryItem, CertLibraryItem } from '../data/librariesData';
import { ALL_ROLES_DATA, RoleDetail } from '../data/rolesData';
import { TOP_50_COMPANIES, CompanyInfo } from '../data/topCompaniesData';
import { CHANNELS_POOL, YouTubeChannel } from '../data/youtubeDatabase';
import { GLOBAL_HACKATHONS, Hackathon } from '../components/Hackathons';

// Inverted Index Storage Maps
const interviewQIndex = new Map<string, Set<number>>();
const toolsIndex = new Map<string, Set<number>>();
const skillsIndex = new Map<string, Set<number>>();
const rolesIndex = new Map<string, Set<number>>();
const certsIndex = new Map<string, Set<number>>();
const companiesIndex = new Map<string, Set<number>>();
const youtubeIndex = new Map<string, Set<number>>();

let isIndexBuilt = false;

function tokenizeText(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2);
}

/**
 * Builds fast inverted index maps for instant O(1) keyword lookups across all databases.
 */
export function initializeInvertedSearchIndex() {
  if (isIndexBuilt) return;
  const startTime = performance.now();

  // 1. Index Interview Questions
  interviewQDatabase.forEach((q, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(q.prompt),
      ...tokenizeText(q.domain),
      ...tokenizeText(q.role_slug),
      ...tokenizeText(q.id),
      ...tokenizeText(q.resolution_title)
    ]);
    tokens.forEach(tok => {
      if (!interviewQIndex.has(tok)) interviewQIndex.set(tok, new Set());
      interviewQIndex.get(tok)!.add(idx);
    });
  });

  // 2. Index Tools Library
  TOOLS_LIBRARY.forEach((t, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(t.name),
      ...tokenizeText(t.category),
      ...tokenizeText(t.description)
    ]);
    tokens.forEach(tok => {
      if (!toolsIndex.has(tok)) toolsIndex.set(tok, new Set());
      toolsIndex.get(tok)!.add(idx);
    });
  });

  // 3. Index Skills Library
  SKILLS_LIBRARY.forEach((s, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(s.name),
      ...tokenizeText(s.category),
      ...tokenizeText(s.description),
      ...(s.associatedTools ? s.associatedTools.flatMap(tokenizeText) : [])
    ]);
    tokens.forEach(tok => {
      if (!skillsIndex.has(tok)) skillsIndex.set(tok, new Set());
      skillsIndex.get(tok)!.add(idx);
    });
  });

  // 4. Index Job Roles
  Object.values(ALL_ROLES_DATA).forEach((r, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(r.title),
      ...tokenizeText(r.domain),
      ...tokenizeText(r.id),
      ...(r.roleAsk ? tokenizeText(r.roleAsk.explanation) : [])
    ]);
    tokens.forEach(tok => {
      if (!rolesIndex.has(tok)) rolesIndex.set(tok, new Set());
      rolesIndex.get(tok)!.add(idx);
    });
  });

  // 5. Index Certifications
  CERTIFICATIONS_LIBRARY.forEach((c, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(c.name),
      ...tokenizeText(c.provider),
      ...tokenizeText(c.description),
      ...(c.relatedRoles ? c.relatedRoles.flatMap(tokenizeText) : [])
    ]);
    tokens.forEach(tok => {
      if (!certsIndex.has(tok)) certsIndex.set(tok, new Set());
      certsIndex.get(tok)!.add(idx);
    });
  });

  // 6. Index Companies
  TOP_50_COMPANIES.forEach((comp, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(comp.name),
      ...tokenizeText(comp.category)
    ]);
    tokens.forEach(tok => {
      if (!companiesIndex.has(tok)) companiesIndex.set(tok, new Set());
      companiesIndex.get(tok)!.add(idx);
    });
  });

  // 7. Index YouTube Channels
  CHANNELS_POOL.forEach((ch, idx) => {
    const tokens = new Set<string>([
      ...tokenizeText(ch.name),
      ...tokenizeText(ch.domain),
      ...tokenizeText(ch.bestFor)
    ]);
    tokens.forEach(tok => {
      if (!youtubeIndex.has(tok)) youtubeIndex.set(tok, new Set());
      youtubeIndex.get(tok)!.add(idx);
    });
  });

  isIndexBuilt = true;
  console.log(`[MapIT Index] Inverted Index built in ${(performance.now() - startTime).toFixed(1)}ms across ~140,000 entities.`);
}

/**
 * Fast Index Candidate Search: Returns matching item indices in < 2ms using the inverted index.
 */
export function getCandidateIndices(
  searchTerms: string[],
  targetIndex: Map<string, Set<number>>,
  maxCandidates: number = 50
): number[] {
  if (!isIndexBuilt) initializeInvertedSearchIndex();

  const candidateIndices = new Set<number>();

  for (const term of searchTerms) {
    const cleanTokens = tokenizeText(term);
    for (const tok of cleanTokens) {
      const matchedSet = targetIndex.get(tok);
      if (matchedSet) {
        for (const idx of matchedSet) {
          candidateIndices.add(idx);
          if (candidateIndices.size >= maxCandidates) break;
        }
      }
      if (candidateIndices.size >= maxCandidates) break;
    }

    // Also check prefix matches for short tokens
    if (candidateIndices.size < maxCandidates) {
      for (const [keyTok, setIndices] of targetIndex.entries()) {
        if (keyTok.startsWith(term) || term.startsWith(keyTok)) {
          for (const idx of setIndices) {
            candidateIndices.add(idx);
            if (candidateIndices.size >= maxCandidates) break;
          }
        }
        if (candidateIndices.size >= maxCandidates) break;
      }
    }

    if (candidateIndices.size >= maxCandidates) break;
  }

  return Array.from(candidateIndices);
}

export {
  interviewQIndex,
  toolsIndex,
  skillsIndex,
  rolesIndex,
  certsIndex,
  companiesIndex,
  youtubeIndex
};
