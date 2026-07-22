import fs from 'fs';
import path from 'path';

interface CSVRecord {
  portal: string;
  domain: string;
  topic: string;
  skillOrTool: string;
  type: string;
  level: string;
  learningFormat: string;
  officialUrl: string;
  verifiedDate: string;
  notes: string;
}

interface ImportSummary {
  inserted: number;
  updated: number;
  unchanged: number;
  skipped: number;
  failed: number;
  totalRows: number;
  isDryRun: boolean;
}

const REQUIRED_COLUMNS = [
  'Portal',
  'Domain',
  'Topic',
  'Detailed Skill / Tool',
  'Type',
  'Level',
  'Learning Format',
  'Official Source URL',
  'Verified Date',
  'Notes'
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const filePathArg = args.find(a => !a.startsWith('--')) || './data/mapit-study-portal-catalog.csv';

  console.log(`🚀 Starting Study Portal Import from: ${filePathArg}`);
  console.log(`Mode: ${isDryRun ? 'DRY-RUN (No files written)' : 'LIVE IMPORT'}`);

  if (!fs.existsSync(filePathArg)) {
    console.error(`❌ Error: File not found at ${filePathArg}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(filePathArg, 'utf-8');
  const lines = rawContent.split(/\r?\n/).filter(line => line.trim().length > 0);

  if (lines.length < 2) {
    console.error('❌ Error: CSV file is empty or missing data rows');
    process.exit(1);
  }

  const headers = parseCSVLine(lines[0]);
  const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));

  if (missingColumns.length > 0) {
    console.error(`❌ Missing required columns: ${missingColumns.join(', ')}`);
    process.exit(1);
  }

  const headerIndices = REQUIRED_COLUMNS.reduce((acc, col) => {
    acc[col] = headers.indexOf(col);
    return acc;
  }, {} as Record<string, number>);

  const summary: ImportSummary = {
    inserted: 0,
    updated: 0,
    unchanged: 0,
    skipped: 0,
    failed: 0,
    totalRows: lines.length - 1,
    isDryRun
  };

  const portalMap = new Map<string, any>();
  const domainMap = new Map<string, any>();
  const topicMap = new Map<string, any>();
  const skillMap = new Map<string, any>();
  const normalizedRecords: any[] = [];
  const unmappedReports: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < REQUIRED_COLUMNS.length) {
      summary.failed++;
      unmappedReports.push({ line: i + 1, error: 'Malformed row with insufficient columns', row });
      continue;
    }

    const portal = row[headerIndices['Portal']].trim();
    const domain = row[headerIndices['Domain']].trim();
    const topic = row[headerIndices['Topic']].trim();
    const skillOrTool = row[headerIndices['Detailed Skill / Tool']].trim();
    const type = row[headerIndices['Type']].trim();
    const level = row[headerIndices['Level']].trim();
    const learningFormat = row[headerIndices['Learning Format']].trim();
    const officialUrl = row[headerIndices['Official Source URL']].trim();
    const verifiedDate = row[headerIndices['Verified Date']].trim();
    const notes = row[headerIndices['Notes']].trim();

    if (!portal || !domain || !topic || !skillOrTool) {
      summary.skipped++;
      unmappedReports.push({ line: i + 1, error: 'Missing key fields (Portal, Domain, Topic or Skill)', row });
      continue;
    }

    const portalSlug = slugify(portal);
    const domainSlug = slugify(domain);
    const topicSlug = slugify(topic);
    const skillSlug = slugify(skillOrTool);
    const recordId = `${portalSlug}-${domainSlug}-${topicSlug}-${skillSlug}`;

    // 1. Portals
    if (!portalMap.has(portalSlug)) {
      portalMap.set(portalSlug, {
        id: portalSlug,
        name: portal,
        officialUrl,
        learningFormat,
        domains: new Set([domain]),
        totalSkillsCount: 0
      });
    }
    const pEntry = portalMap.get(portalSlug);
    pEntry.domains.add(domain);
    pEntry.totalSkillsCount++;

    // 2. Domains
    if (!domainMap.has(domainSlug)) {
      domainMap.set(domainSlug, {
        id: domainSlug,
        name: domain,
        topics: new Set([topic]),
        portals: new Set([portal])
      });
    } else {
      domainMap.get(domainSlug).topics.add(topic);
      domainMap.get(domainSlug).portals.add(portal);
    }

    // 3. Topics
    if (!topicMap.has(topicSlug)) {
      topicMap.set(topicSlug, {
        id: topicSlug,
        name: topic,
        domain: domain,
        skills: new Set([skillOrTool]),
        portals: new Set([portal])
      });
    } else {
      topicMap.get(topicSlug).skills.add(skillOrTool);
      topicMap.get(topicSlug).portals.add(portal);
    }

    // 4. Skills / Tools
    if (!skillMap.has(skillSlug)) {
      skillMap.set(skillSlug, {
        id: skillSlug,
        name: skillOrTool,
        type,
        level,
        domain,
        topic,
        learningFormat,
        portals: new Set([portal]),
        officialUrls: new Set([officialUrl])
      });
      summary.inserted++;
    } else {
      const existing = skillMap.get(skillSlug);
      existing.portals.add(portal);
      if (officialUrl) existing.officialUrls.add(officialUrl);
      summary.updated++;
    }

    normalizedRecords.push({
      id: recordId,
      portal,
      portalSlug,
      domain,
      domainSlug,
      topic,
      topicSlug,
      skillOrTool,
      skillSlug,
      type,
      level,
      learningFormat,
      officialUrl,
      verifiedDate,
      notes
    });
  }

  // Formatting output JSON objects
  const portalsList = Array.from(portalMap.values()).map(p => ({
    ...p,
    domains: Array.from(p.domains)
  }));

  const domainsList = Array.from(domainMap.values()).map(d => ({
    ...d,
    topics: Array.from(d.topics),
    portals: Array.from(d.portals)
  }));

  const topicsList = Array.from(topicMap.values()).map(t => ({
    ...t,
    skills: Array.from(t.skills),
    portals: Array.from(t.portals)
  }));

  const skillsList = Array.from(skillMap.values()).map(s => ({
    ...s,
    portals: Array.from(s.portals),
    officialUrls: Array.from(s.officialUrls)
  }));

  console.log('\n📊 Import Statistics:');
  console.log(`- Total CSV Rows Processed: ${summary.totalRows}`);
  console.log(`- New Skills/Tools Created: ${summary.inserted}`);
  console.log(`- Multi-Portal Mappings Updated: ${summary.updated}`);
  console.log(`- Total Unique Portals Identified: ${portalsList.length}`);
  console.log(`- Total Unique Domains Identified: ${domainsList.length}`);
  console.log(`- Total Unique Topics Identified: ${topicsList.length}`);
  console.log(`- Skipped/Invalid Rows: ${summary.skipped}`);
  console.log(`- Failed Rows: ${summary.failed}`);

  if (!isDryRun) {
    const outDir = './src/data/generated';
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outDir, 'portals.json'), JSON.stringify(portalsList, null, 2));
    fs.writeFileSync(path.join(outDir, 'domains.json'), JSON.stringify(domainsList, null, 2));
    fs.writeFileSync(path.join(outDir, 'topics.json'), JSON.stringify(topicsList, null, 2));
    fs.writeFileSync(path.join(outDir, 'skills.json'), JSON.stringify(skillsList, null, 2));
    fs.writeFileSync(path.join(outDir, 'catalog-normalized.json'), JSON.stringify(normalizedRecords, null, 2));
    fs.writeFileSync(path.join(outDir, 'unmapped-report.json'), JSON.stringify(unmappedReports, null, 2));

    console.log(`\n✅ Output successfully written to ${outDir}/`);
  } else {
    console.log('\n🔍 Dry Run completed successfully. No files written.');
  }
}

main();
