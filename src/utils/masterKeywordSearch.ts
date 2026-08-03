import masterKeywordData from '../data/generated/master-keyword-index.json';

export interface MasterKeywordRecord {
  id: string;
  k: string;      // Keyword name
  nk: string;     // Normalized lowercase keyword
  t: string;      // Keyword type (e.g. software_tool_or_application, job_title)
  c: string;      // Category
  d: string;      // Domain
  desc: string;   // Description snippet
  a: string[];    // Aliases & related terms
  hot?: boolean;  // Is Hot Tech 2026
  ind?: boolean;  // Is In Demand
}

const aliasMap: Record<string, string[]> = masterKeywordData.aliasMap || {};
const keywordsList: MasterKeywordRecord[] = (masterKeywordData.keywords as MasterKeywordRecord[]) || [];

/**
 * Expands a search query into its synonyms and related terms using master-keyword-index.json
 */
export function getExpandedKeywordTerms(userQuery: string): string[] {
  if (!userQuery || !userQuery.trim()) return [];
  
  const cleanQ = userQuery.trim().toLowerCase();
  const terms = new Set<string>([cleanQ]);

  // Exact or partial alias match
  if (aliasMap[cleanQ]) {
    aliasMap[cleanQ].forEach(term => terms.add(term.toLowerCase()));
  }

  // Tokenize user query for multi-word acronyms (e.g. "active directory" -> "ad")
  Object.entries(aliasMap).forEach(([alias, targets]) => {
    if (cleanQ.includes(alias) || alias.includes(cleanQ)) {
      targets.forEach(t => terms.add(t.toLowerCase()));
    }
  });

  return Array.from(terms);
}

/**
 * Searches the 26,367 Master Keyword Index for direct matches
 */
export function searchMasterKeywords(userQuery: string, limit: number = 20): MasterKeywordRecord[] {
  if (!userQuery || !userQuery.trim()) return [];
  
  const cleanQ = userQuery.trim().toLowerCase();
  const expanded = getExpandedKeywordTerms(cleanQ);

  const matched: MasterKeywordRecord[] = [];

  for (const item of keywordsList) {
    const isNameMatch = expanded.some(t => item.nk.includes(t) || t.includes(item.nk));
    const isCategoryMatch = item.c && expanded.some(t => item.c.toLowerCase().includes(t));
    const isDomainMatch = item.d && expanded.some(t => item.d.toLowerCase().includes(t));
    const isAliasMatch = item.a && item.a.some(alias => expanded.some(t => alias.toLowerCase().includes(t)));

    if (isNameMatch || isCategoryMatch || isDomainMatch || isAliasMatch) {
      matched.push(item);
      if (matched.length >= limit) break;
    }
  }

  return matched;
}

/**
 * Resolves category, domain, and keyword_type badge metadata for any tool, cert, skill, or portal item name
 */
export function resolveKeywordMetadata(itemName: string): {
  typeLabel: string;
  domainLabel: string;
  categoryLabel: string;
  isHotTech: boolean;
  isInDemand: boolean;
  aliases: string[];
} {
  const normName = itemName.toLowerCase().trim();
  
  const found = keywordsList.find(k => 
    k.nk === normName || 
    normName.includes(k.nk) || 
    k.nk.includes(normName) ||
    k.a.some(alias => alias.toLowerCase() === normName)
  );

  if (found) {
    const typeClean = (found.t || 'Technology Resource').replace(/_/g, ' ');
    return {
      typeLabel: typeClean.charAt(0).toUpperCase() + typeClean.slice(1),
      domainLabel: found.d || found.c || 'IT & Systems',
      categoryLabel: found.c || 'Resources',
      isHotTech: Boolean(found.hot),
      isInDemand: Boolean(found.ind),
      aliases: found.a || []
    };
  }

  return {
    typeLabel: 'IT Credential & Skill',
    domainLabel: 'Infrastructure & Tech',
    categoryLabel: 'Verified Resource',
    isHotTech: false,
    isInDemand: false,
    aliases: []
  };
}
