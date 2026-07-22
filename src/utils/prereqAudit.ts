import { ALL_ROLES_DATA } from '../data/rolesData';
import { TEACHERS_DIRECTORY } from '../components/YoutubeTeachers';
import { jsPDF } from 'jspdf';

export interface PrereqMatchInfo {
  prereq: string;
  roles: { id: string; title: string; domain: string }[];
  matchedTeachers: { name: string; url: string; subcategory: string; category: string }[];
  status: 'covered' | 'gap';
}

/**
 * Searches TEACHERS_DIRECTORY to find appropriate YouTube channels/teachers
 * that cover the given prerequisite topic.
 */
export function findTeachersForPrerequisite(prereq: string): { name: string; url: string; subcategory: string; category: string }[] {
  const query = prereq.toLowerCase();
  const results: { name: string; url: string; subcategory: string; category: string }[] = [];
  const added = new Set<string>();

  // Tokenize the prerequisite to find word overlaps
  const tokens = query
    .split(/[\s,./()&+-]+/)
    .map(w => w.trim())
    .filter(w => w.length > 3 && !['with', 'your', 'and', 'from', 'basics', 'basic', 'advanced', 'using', 'tool', 'tools', 'setup', 'setups', 'configuration', 'troubleshooting'].includes(w));

  for (const cat of TEACHERS_DIRECTORY) {
    for (const sub of cat.subcategories) {
      const area = sub.skillArea.toLowerCase();
      const study = sub.suggestedStudy.toLowerCase();

      // Check direct inclusion of either string
      let isMatch = area.includes(query) || query.includes(area) || study.includes(query) || query.includes(study);

      // Check if some key token from the prerequisite overlaps with area/study
      if (!isMatch) {
        isMatch = tokens.some(token => area.includes(token) || study.includes(token));
      }

      if (isMatch) {
        for (const t of sub.teachers) {
          if (!added.has(t.name.toLowerCase())) {
            added.add(t.name.toLowerCase());
            results.push({
              name: t.name,
              url: t.url,
              subcategory: sub.skillArea,
              category: cat.name
            });
          }
        }
      }
    }
  }

  return results;
}

/**
 * Audits all technical prerequisites from all role profiles against TEACHERS_DIRECTORY.
 */
export function auditPrerequisites(): PrereqMatchInfo[] {
  const result: Record<string, PrereqMatchInfo> = {};

  // Gather unique prerequisites across all roles
  Object.values(ALL_ROLES_DATA).forEach((role) => {
    if (!role.mustHaves || !role.mustHaves.tech) return;

    role.mustHaves.tech.forEach((skill) => {
      const cleanSkill = skill.trim();
      if (!cleanSkill) return;

      const key = cleanSkill.toLowerCase();
      if (!result[key]) {
        result[key] = {
          prereq: cleanSkill,
          roles: [],
          matchedTeachers: [],
          status: 'gap'
        };
      }

      // Avoid duplicate roles for the same prerequisite
      if (!result[key].roles.some(r => r.id === role.id)) {
        result[key].roles.push({
          id: role.id,
          title: role.title,
          domain: role.domain
        });
      }
    });
  });

  // Perform matching with youtube teachers
  Object.keys(result).forEach((key) => {
    const item = result[key];
    const teachers = findTeachersForPrerequisite(item.prereq);
    
    // Explicit hardcoded alignments for highly specific terms to prevent false gaps
    if (teachers.length === 0) {
      if (key.includes('active directory') || key.includes('ad ds') || key.includes('m3c5') || key.includes('exchange setups') || key.includes('outlook')) {
        // Map to John Savill or Microsoft
        item.matchedTeachers = [
          { name: "John Savill's Technical Training", url: 'https://www.youtube.com/@NTFAQGuy', subcategory: 'Windows Server, AD, GPO', category: 'SysAdmin & Infrastructure' },
          { name: 'Microsoft Learn', url: 'https://www.youtube.com/@MicrosoftLearn', subcategory: 'Windows, M365, Azure basics', category: 'Universal IT Foundations' }
        ];
        item.status = 'covered';
      } else if (key.includes('wiring') || key.includes('cabling') || key.includes('port patching') || key.includes('ip routing') || key.includes('vlan') || key.includes('stp') || key.includes('subnetting') || key.includes('subnet') || key.includes('osi')) {
        // Map to Network / Cisco teachers
        item.matchedTeachers = [
          { name: "Jeremy's IT Lab", url: 'https://www.youtube.com/@JeremysITLab', subcategory: 'CCNA and routing/switching', category: 'Networking & NOC Collaboration' },
          { name: 'David Bombal Tech', url: 'https://www.youtube.com/@DavidBombal', subcategory: 'CCNA and routing/switching', category: 'Networking & NOC Collaboration' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck', subcategory: 'Networking fundamentals', category: 'Universal IT Foundations' }
        ];
        item.status = 'covered';
      } else if (key.includes('linux') || key.includes('bash') || key.includes('shell')) {
        item.matchedTeachers = [
          { name: 'Learn Linux TV', url: 'https://www.youtube.com/@LearnLinuxTV', subcategory: 'Linux sysadmin', category: 'SysAdmin & Infrastructure' },
          { name: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck', subcategory: 'Linux and command line', category: 'Universal IT Foundations' }
        ];
        item.status = 'covered';
      } else if (key.includes('prompt') || key.includes('llm') || key.includes('gpt') || key.includes('ai') || key.includes('machine learning') || key.includes('ml')) {
        item.matchedTeachers = [
          { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp', subcategory: 'Generative AI and Prompt Engineering', category: 'Data Science & Artificial Intelligence' }
        ];
        item.status = 'covered';
      } else if (key.includes('sql') || key.includes('query') || key.includes('database')) {
        item.matchedTeachers = [
          { name: 'Alex The Analyst', url: 'https://www.youtube.com/@AlexTheAnalyst', subcategory: 'SQL, databases and BI tools', category: 'Data Analytics & Business Intelligence' },
          { name: 'Kudvenkat', url: 'https://www.youtube.com/@kudvenkat', subcategory: 'Relational databases and administration', category: 'Database Administration (DBA)' }
        ];
        item.status = 'covered';
      } else {
        item.matchedTeachers = [];
        item.status = 'gap';
      }
    } else {
      item.matchedTeachers = teachers;
      item.status = 'covered';
    }
  });

  // Sort: Gaps first, then by roles affected count descending
  return Object.values(result).sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === 'gap' ? -1 : 1;
    }
    return b.roles.length - a.roles.length;
  });
}

/**
 * Compiles and generates a professional PDF report detailing technical prerequisite gaps
 * that do not have matching curated YouTube teachers in our directory.
 */
export function exportPrereqGapsPDF(auditResults: PrereqMatchInfo[]) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  let y = 50;
  let pageNum = 1;

  const gapsOnly = auditResults.filter(item => item.status === 'gap');
  const coveredOnly = auditResults.filter(item => item.status === 'covered');

  const drawFooter = () => {
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184); // slate-400
    const footerText = "MapIT V4 Audit Pipeline - Verified Prerequisite Gaps & Curated Resource Gaps.";
    doc.text(footerText, margin, 285);
    doc.text(`Page ${pageNum}`, pageWidth - margin - 12, 285);
  };

  const drawPageHeader = () => {
    doc.setFillColor(15, 23, 42); // slate 900
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('MAPIT PREREQUISITE COVERAGE & YT GAPS AUDIT REPORT', margin, 11);
    doc.setTextColor(239, 68, 68); // Red
    doc.text(`STATUS: ${gapsOnly.length} RESOURCE GAPS IDENTIFIED`, margin, 17);
    doc.setDrawColor(239, 68, 68);
    doc.setLineWidth(0.4);
    doc.line(margin, 22, pageWidth - margin, 22);
  };

  const addText = (text: string, fontSize: number, style: 'normal' | 'bold' | 'italic', color: [number, number, number], spacing: number = 4.5) => {
    doc.setFont('Helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentWidth);
    for (let i = 0; i < lines.length; i++) {
      if (y > 270) {
        drawFooter();
        doc.addPage();
        pageNum++;
        drawPageHeader();
        y = 35;
      }
      doc.text(lines[i], margin, y);
      y += (fontSize * 0.42);
    }
    y += spacing;
  };

  // --- TOP PAGE COVER DESIGN ---
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('MAPIT CAREER TAXONOMY V4', margin, 15);

  doc.setTextColor(248, 113, 113); // red-400
  doc.setFontSize(10);
  doc.text('EXECUTIVE PREREQUISITES & YOUTUBE CHANNELS GAP REPORT', margin, 23);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8.5);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Generated At: ${new Date().toUTCString()}`, margin, 30);
  doc.text(`Analyzed Data: ${auditResults.length} Unique Prerequisites / 110+ IT Role Profiles`, margin, 36);

  doc.setDrawColor(239, 68, 68);
  doc.setLineWidth(1.0);
  doc.line(margin, 42, pageWidth - margin, 42);

  y = 52;

  // Introduction Block
  addText('1. EXECUTIVE SUMMARY & AUDIT RATIONALE', 11, 'bold', [15, 23, 42], 2);
  addText(
    'This compliance report was compiled by scanning the technical prerequisites of all career pathways across 16 different sub-domain job registries in MapIT. We cross-referenced these prerequisites against our active YouTube Teachers Directory to evaluate coverage depth and identify training catalog gaps.',
    9, 'normal', [71, 85, 105], 3
  );

  // Metrics Table
  addText('2. MAIN ANALYSIS STATUS METRICS', 10, 'bold', [15, 23, 42], 2);
  addText(`Total Evaluated Prerequisite Topics: ${auditResults.length}`, 9, 'bold', [30, 41, 59], 2);
  addText(`Successfully Serviced Topics (🟢 Covered): ${coveredOnly.length} (${Math.round((coveredOnly.length/auditResults.length)*100)}% coverage)`, 9, 'normal', [16, 185, 129], 2);
  addText(`Identified Training Gaps (🔴 Unserved / Gaps): ${gapsOnly.length} (${Math.round((gapsOnly.length/auditResults.length)*100)}% gap)`, 9, 'bold', [239, 68, 68], 5);

  // Gaps List
  addText('3. CRITICAL AUDIT REPORT: IDENTIFIED TRAINING GAPS', 11, 'bold', [239, 68, 68], 2);
  addText('The following represents technical prerequisite skill-nodes that DO NOT have an explicitly recommended YouTube teacher or organization in our YouTube learning directory, sorted by number of affected roles. Prompt interventions with curated link attachments are advised.', 8.5, 'italic', [100, 116, 139], 4);

  let gapIndex = 1;
  gapsOnly.forEach((item) => {
    // Add Prerequisite header
    addText(`${gapIndex}. Prerequisite Topic: "${item.prereq}"`, 10, 'bold', [15, 23, 42], 1.5);
    
    // Affected roles
    const rolesList = item.roles.map(r => `${r.title} (${r.domain})`).join(', ');
    addText(`Affected Role Profiles: ${rolesList}`, 8.5, 'normal', [71, 85, 105], 1.5);

    // Remediation Advice
    let advice = 'Recommended Remediation: Monitor official dev documentation or configure hands-on sandbox labs.';
    if (item.prereq.toLowerCase().includes('hardware') || item.prereq.toLowerCase().includes('bios')) {
      advice = 'Recommended Learning Source: Vendor manual pages (Dell, HP, Lenovo Support portals) and basic practical hardware manuals.';
    } else if (item.prereq.toLowerCase().includes('diagram') || item.prereq.toLowerCase().includes('wireframe')) {
      advice = 'Recommended Learning Source: Draw.io interactive guides, Figma sandbox tutorials, or Microsoft Visio documentation.';
    } else if (item.prereq.toLowerCase().includes('backup') || item.prereq.toLowerCase().includes('disaster')) {
      advice = 'Recommended Learning Source: Veeam official whitepapers, AWS S3 storage classes documentation, or VMware backup tutorials.';
    } else if (item.prereq.toLowerCase().includes('sap') || item.prereq.toLowerCase().includes('erp')) {
      advice = 'Recommended Learning Source: Official SAP Learning Hub, openSAP course sequences, and Microsoft Dynamics trial portals.';
    }
    
    addText(`Remediation Path: ${advice}`, 8.5, 'italic', [220, 38, 38], 4);
    gapIndex++;
  });

  // Adding Covered Topics briefly for comprehensive report standard
  if (y > 230) {
    drawFooter();
    doc.addPage();
    pageNum++;
    drawPageHeader();
    y = 35;
  }
  
  addText('4. HISTORICALLY SERVICE-COVERED COMPLIANCE TOPICS', 11, 'bold', [16, 185, 129], 2);
  addText('These prerequisites are fully tracked and mapped to primary learning playlists in our active Study Libraries:', 8.5, 'italic', [100, 116, 139], 3.5);

  coveredOnly.slice(0, 15).forEach((item) => {
    const teacherNames = item.matchedTeachers.map(t => t.name).join(', ');
    addText(`• ${item.prereq} -> Supported by ${teacherNames}`, 9, 'normal', [51, 65, 85], 1.5);
  });
  if (coveredOnly.length > 15) {
    addText(`• ... and ${coveredOnly.length - 15} more successfully mapped competencies.`, 9, 'italic', [100, 116, 139], 2);
  }

  drawFooter();
  doc.save('Prerequisites_Youtube_Gaps_Report.pdf');
}
