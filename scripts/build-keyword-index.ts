import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, '../New folder/it_tech_keyword_database_2026.csv');
const OUTPUT_PATH = path.join(__dirname, '../src/data/generated/master-keyword-index.json');

console.log('Reading CSV from:', CSV_PATH);

if (!fs.existsSync(CSV_PATH)) {
  console.error('CSV file not found at:', CSV_PATH);
  process.exit(1);
}

const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');

function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let curr = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        curr += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(curr.trim());
      curr = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(curr.trim());
      if (row.some(cell => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
      curr = '';
    } else {
      curr += char;
    }
  }

  if (curr.length > 0 || row.length > 0) {
    row.push(curr.trim());
    lines.push(row);
  }

  return lines;
}

const rows = parseCSV(fileContent);
if (rows.length === 0) {
  console.error('No rows found in CSV');
  process.exit(1);
}

const headers = rows[0].map(h => h.toLowerCase().trim());
console.log('CSV Headers:', headers);

const colIdx = {
  id: headers.indexOf('id'),
  keyword: headers.indexOf('keyword'),
  normalized: headers.indexOf('normalized_keyword'),
  keyword_type: headers.indexOf('keyword_type'),
  category: headers.indexOf('category'),
  subcategory: headers.indexOf('subcategory'),
  domain: headers.indexOf('domain'),
  description: headers.indexOf('description'),
  aliases: headers.indexOf('aliases'),
  related_terms: headers.indexOf('related_terms'),
  hot_technology: headers.indexOf('hot_technology'),
  in_demand: headers.indexOf('in_demand')
};

interface KeywordItem {
  id: string;
  k: string;
  nk: string;
  t: string;
  c: string;
  d: string;
  desc: string;
  a: string[];
  hot?: boolean;
  ind?: boolean;
}

const keywords: KeywordItem[] = [];
const aliasMap: Record<string, string[]> = {};

for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  if (!row || row.length <= colIdx.keyword) continue;

  const id = row[colIdx.id] || `ITK-${r.toString().padStart(6, '0')}`;
  const k = row[colIdx.keyword];
  if (!k) continue;

  const nk = (row[colIdx.normalized] || k).toLowerCase().trim();
  const t = row[colIdx.keyword_type] || '';
  const c = row[colIdx.category] || '';
  const d = row[colIdx.domain] || '';
  const desc = (row[colIdx.description] || '').slice(0, 200);

  const rawAliases = row[colIdx.aliases] || '';
  const rawRelated = row[colIdx.related_terms] || '';

  const aliases = Array.from(new Set([
    ...rawAliases.split(/[,;|]/).map(s => s.trim()).filter(Boolean),
    ...rawRelated.split(/[,;|]/).map(s => s.trim()).filter(Boolean)
  ])).slice(0, 6);

  const hotStr = (row[colIdx.hot_technology] || '').toLowerCase();
  const indStr = (row[colIdx.in_demand] || '').toLowerCase();

  const isHot = hotStr === 'true' || hotStr === '1' || hotStr === 'yes';
  const isInd = indStr === 'true' || indStr === '1' || indStr === 'yes';

  const item: KeywordItem = { id, k, nk, t, c, d, desc, a: aliases };
  if (isHot) item.hot = true;
  if (isInd) item.ind = true;

  keywords.push(item);

  if (nk) {
    if (!aliasMap[nk]) aliasMap[nk] = [];
    if (!aliasMap[nk].includes(k)) aliasMap[nk].push(k);
  }

  aliases.forEach(alias => {
    const normAlias = alias.toLowerCase().trim();
    if (normAlias && normAlias.length >= 2) {
      if (!aliasMap[normAlias]) aliasMap[normAlias] = [];
      if (!aliasMap[normAlias].includes(k)) aliasMap[normAlias].push(k);
    }
  });
}

console.log(`Successfully parsed ${keywords.length} keyword records.`);

const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Slice to top curated 8,000 items with rich descriptions, hot tech, and aliases to keep bundle lightweight (~1.8MB)
const filteredKeywords = keywords
  .filter(k => k.hot || k.ind || k.a.length > 0 || (k.desc && k.desc.length > 40))
  .slice(0, 8500);

const finalData = {
  version: '1.0.0',
  totalRecords: keywords.length,
  indexedRecords: filteredKeywords.length,
  aliasMap,
  keywords: filteredKeywords
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData), 'utf-8');
console.log('Saved master keyword index to:', OUTPUT_PATH);
