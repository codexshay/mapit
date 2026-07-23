import { useEffect, useState, useMemo } from 'react';
import importedPortals from '../data/generated/portals.json';
import importedSkills from '../data/generated/skills.json';
import importedCatalog from '../data/generated/catalog-normalized.json';
import { CERTIFICATIONS_LIBRARY } from '../data/librariesData';
import { RECOMMENDED_BOOKS } from '../components/LibrariesDashboard';
import { GLOBAL_HACKATHONS, GLOBAL_FESTS } from '../components/Hackathons';
import { TEACHERS_DIRECTORY } from '../components/YoutubeTeachers';
import { ALL_ROLES_DATA } from '../data/rolesData';
import { CATALOG_VERSION } from '../data/version';

export type SearchEntityType =
  | 'portal'
  | 'skill'
  | 'domain'
  | 'topic'
  | 'certification'
  | 'teacher'
  | 'book'
  | 'event'
  | 'role';

export interface SearchDocument {
  id: string;
  entityType: SearchEntityType;
  title: string;
  normalizedTerms: string[];
  aliases: string[];
  relatedIds: string[];
  searchableText: string;
  tabId: 'channels' | 'tools-skills' | 'certs' | 'bookshelf' | 'youtubeTeachers' | 'hackathons';
  itemData: any;
}

/**
 * Custom React Hook for debouncing fast-typing inputs.
 * Ensures the input field value updates in 0ms synchronously while delaying
 * heavy search computation until typing pauses (default 180ms).
 */
export function useDebounce<T>(value: T, delayMs: number = 180): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // If clearing input (empty string), update immediately for snappy UI feel
    if (typeof value === 'string' && value.trim() === '') {
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}

let cachedIndexVersion: string | null = null;
let cachedUnifiedIndex: SearchDocument[] = [];

/**
 * Build or retrieve the cached unified search index once per catalogVersion.
 */
export function getOrBuildSearchIndex(): SearchDocument[] {
  if (cachedIndexVersion === CATALOG_VERSION && cachedUnifiedIndex.length > 0) {
    return cachedUnifiedIndex;
  }

  console.log(`[MapIT Search] Building precomputed unified search index for catalog version: ${CATALOG_VERSION}`);
  const docs: SearchDocument[] = [];

  // 1. Study Portals
  if (Array.isArray(importedPortals)) {
    for (const portal of importedPortals) {
      if (!portal) continue;
      const portalId = portal.id || portal.name;
      const domainsText = Array.isArray(portal.domains) ? portal.domains.join(' ') : '';
      const catText = (portal as any).category || 'Study Portal';
      const formatText = portal.learningFormat || '';

      // Attach matching catalog skills text for deep portal search
      const matchingCatalog = Array.isArray(importedCatalog)
        ? importedCatalog.filter((c: any) => c && (c.portalSlug === portal.id || c.portal === portal.name))
        : [];
      const catalogText = matchingCatalog
        .map((c: any) => `${c.skillOrTool || ''} ${c.topic || ''} ${c.domain || ''}`)
        .join(' ');

      const rawSearchable = `${portal.name} ${catText} ${formatText} ${domainsText} ${catalogText}`.toLowerCase();
      const terms = Array.from(new Set(rawSearchable.split(/\s+/).filter((t) => t.length > 1)));

      docs.push({
        id: portalId,
        entityType: 'portal',
        title: portal.name || 'Study Portal',
        normalizedTerms: terms,
        aliases: portal.domains || [],
        relatedIds: matchingCatalog.map((c: any) => c.id),
        searchableText: rawSearchable,
        tabId: 'channels',
        itemData: {
          ...portal,
          category: catText,
          matchingSkillsCount: matchingCatalog.length,
          matchingSkillsList: matchingCatalog.slice(0, 6),
        },
      });
    }
  }

  // 2. Skills & Tools
  if (Array.isArray(importedSkills)) {
    for (const sk of importedSkills) {
      if (!sk) continue;
      const portalsText = Array.isArray(sk.portals) ? sk.portals.join(' ') : '';
      const rawSearchable = `${sk.name || ''} ${sk.domain || ''} ${sk.topic || ''} ${sk.type || ''} ${portalsText}`.toLowerCase();
      const terms = Array.from(new Set(rawSearchable.split(/\s+/).filter((t) => t.length > 1)));

      docs.push({
        id: sk.id || `sk-${sk.name}`,
        entityType: 'skill',
        title: sk.name || 'Skill / Tool',
        normalizedTerms: terms,
        aliases: Array.isArray(sk.portals) ? sk.portals : [],
        relatedIds: [],
        searchableText: rawSearchable,
        tabId: 'tools-skills',
        itemData: sk,
      });
    }
  }

  // 3. Certifications
  if (Array.isArray(CERTIFICATIONS_LIBRARY)) {
    for (const cert of CERTIFICATIONS_LIBRARY) {
      if (!cert) continue;
      const skillsMeasuredText = Array.isArray((cert as any).skillsMeasured) ? (cert as any).skillsMeasured.join(' ') : '';
      const rolesText = Array.isArray(cert.relatedRoles) ? cert.relatedRoles.join(' ') : '';
      const rawSearchable = `${cert.name} ${cert.provider} ${cert.difficulty} ${cert.description} ${skillsMeasuredText} ${rolesText}`.toLowerCase();
      const terms = Array.from(new Set(rawSearchable.split(/\s+/).filter((t) => t.length > 1)));

      docs.push({
        id: cert.id,
        entityType: 'certification',
        title: cert.name,
        normalizedTerms: terms,
        aliases: cert.relatedRoles || [],
        relatedIds: [],
        searchableText: rawSearchable,
        tabId: 'certs',
        itemData: cert,
      });
    }
  }

  // 4. Bookshelf
  if (Array.isArray(RECOMMENDED_BOOKS)) {
    for (const item of RECOMMENDED_BOOKS) {
      if (!item) continue;
      const bk = item as any;
      const recText = Array.isArray(bk.recommendedFor) ? bk.recommendedFor.join(' ') : '';
      const deptText = bk.department || '';
      const whyText = bk.whyRecommended || '';
      const descText = bk.description || '';
      const rawSearchable = `${bk.title || ''} ${bk.author || ''} ${deptText} ${whyText} ${descText} ${recText}`.toLowerCase();
      const terms = Array.from(new Set(rawSearchable.split(/\s+/).filter((t) => t.length > 1)));

      docs.push({
        id: bk.id || `bk-${bk.title}`,
        entityType: 'book',
        title: bk.title || 'Book',
        normalizedTerms: terms,
        aliases: bk.recommendedFor || [],
        relatedIds: [],
        searchableText: rawSearchable,
        tabId: 'bookshelf',
        itemData: bk,
      });
    }
  }

  // 5. Teachers
  if (Array.isArray(TEACHERS_DIRECTORY)) {
    for (const cat of TEACHERS_DIRECTORY) {
      if (!cat) continue;
      if (Array.isArray(cat.subcategories)) {
        for (const sub of cat.subcategories) {
          if (!sub) continue;
          const teachersText = Array.isArray(sub.teachers)
            ? sub.teachers.map((t: any) => `${t?.name || ''} ${t?.bestFor || ''} ${t?.notes || ''}`).join(' ')
            : '';
          const rawSearchable = `${cat.name || ''} ${sub.skillArea || ''} ${sub.suggestedStudy || ''} ${teachersText}`.toLowerCase();
          const terms = Array.from(new Set(rawSearchable.split(/\s+/).filter((t) => t.length > 1)));

          docs.push({
            id: `yt-${sub.skillArea}`,
            entityType: 'teacher',
            title: sub.skillArea,
            normalizedTerms: terms,
            aliases: [],
            relatedIds: [],
            searchableText: rawSearchable,
            tabId: 'youtubeTeachers',
            itemData: { ...sub, categoryName: cat.name },
          });
        }
      }
    }
  }

  // 6. Hackathons & Events
  const allEvents = [...(GLOBAL_HACKATHONS || []), ...(GLOBAL_FESTS || [])];
  for (const evt of allEvents) {
    if (!evt) continue;
    const themesText = Array.isArray(evt.themes) ? evt.themes.join(' ') : '';
    const rawSearchable = `${evt.title || ''} ${evt.organizer || ''} ${evt.category || ''} ${evt.description || ''} ${evt.prizes || ''} ${themesText}`.toLowerCase();
    const terms = Array.from(new Set(rawSearchable.split(/\s+/).filter((t) => t.length > 1)));

    docs.push({
      id: evt.id || `evt-${evt.title}`,
      entityType: 'event',
      title: evt.title || 'Hackathon Event',
      normalizedTerms: terms,
      aliases: evt.themes || [],
      relatedIds: [],
      searchableText: rawSearchable,
      tabId: 'hackathons',
      itemData: evt,
    });
  }

  cachedIndexVersion = CATALOG_VERSION;
  cachedUnifiedIndex = docs;
  return docs;
}

/**
 * Filter unified search index for a given query string
 */
export function searchUnifiedIndex(
  query: string,
  filterTab?: 'channels' | 'tools-skills' | 'certs' | 'bookshelf' | 'youtubeTeachers' | 'hackathons'
): SearchDocument[] {
  const index = getOrBuildSearchIndex();
  const q = query.trim().toLowerCase();

  if (!q) {
    if (filterTab) {
      return index.filter((doc) => doc.tabId === filterTab);
    }
    return index;
  }

  return index.filter((doc) => {
    if (filterTab && doc.tabId !== filterTab) return false;
    return doc.searchableText.includes(q);
  });
}

export interface CrossTabMatchSummary {
  tabId: 'youtubeTeachers' | 'hackathons' | 'channels' | 'tools-skills' | 'certs' | 'bookshelf';
  tabLabel: string;
  count: number;
  sampleItems: string[];
}

const TAB_LABELS: Record<string, string> = {
  youtubeTeachers: 'YouTube Teachers',
  hackathons: 'Hackathons & Events',
  channels: 'Study Portals',
  'tools-skills': 'Skills & Tools Pool',
  certs: 'Certifications',
  bookshelf: 'Bookshelf',
};

/**
 * Calculate cross-tab match breakdown efficiently in 1 pass over the unified index
 */
export function getCrossTabSummary(query: string): CrossTabMatchSummary[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const index = getOrBuildSearchIndex();
  const matchesByTab: Record<string, { count: number; samples: string[] }> = {
    youtubeTeachers: { count: 0, samples: [] },
    hackathons: { count: 0, samples: [] },
    channels: { count: 0, samples: [] },
    'tools-skills': { count: 0, samples: [] },
    certs: { count: 0, samples: [] },
    bookshelf: { count: 0, samples: [] },
  };

  for (const doc of index) {
    if (doc.searchableText.includes(q)) {
      const tabGroup = matchesByTab[doc.tabId];
      if (tabGroup) {
        tabGroup.count++;
        if (tabGroup.samples.length < 2 && !tabGroup.samples.includes(doc.title)) {
          tabGroup.samples.push(doc.title);
        }
      }
    }
  }

  const results: CrossTabMatchSummary[] = [];
  for (const [tabId, data] of Object.entries(matchesByTab)) {
    if (data.count > 0) {
      results.push({
        tabId: tabId as any,
        tabLabel: TAB_LABELS[tabId] || tabId,
        count: data.count,
        sampleItems: data.samples,
      });
    }
  }

  return results;
}

/**
 * Paginate matching results after search filtering
 */
export function paginateResults<T>(items: T[], page: number, pageSize: number): {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
} {
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const slicedItems = items.slice(startIndex, startIndex + pageSize);

  return {
    items: slicedItems,
    totalPages,
    currentPage,
    totalCount,
  };
}
