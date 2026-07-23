import importedPortals from '../data/generated/portals.json';
import importedSkills from '../data/generated/skills.json';
import importedCatalog from '../data/generated/catalog-normalized.json';
import { CERTIFICATIONS_LIBRARY } from '../data/librariesData';
import { RECOMMENDED_BOOKS } from '../components/LibrariesDashboard';
import { GLOBAL_HACKATHONS, GLOBAL_FESTS } from '../components/Hackathons';
import { TEACHERS_DIRECTORY } from '../components/YoutubeTeachers';
import { CHANNELS_POOL } from '../data/youtubeDatabase';
import { ALL_ROLES_DATA, IT_DOMAINS } from '../data/rolesData';

export type PamIntent =
  | 'course-recommendation'
  | 'skill-learning'
  | 'tool-learning'
  | 'certification-recommendation'
  | 'career-role'
  | 'career-comparison'
  | 'learning-path'
  | 'book-recommendation'
  | 'teacher-recommendation'
  | 'event-discovery'
  | 'portal-discovery'
  | 'site-navigation'
  | 'follow-up';

export interface PamQueryContext {
  intent: PamIntent;
  topic: string;
  roleA?: string;
  roleB?: string;
  freeOnly?: boolean;
  beginnerOnly?: boolean;
  handsOnOnly?: boolean;
}

export interface PamRecommendation {
  title: string;
  subtitle?: string;
  description: string;
  url?: string;
  internalRoute?: string;
  isFree?: boolean;
}

export interface PamRetrievalResult {
  context: PamQueryContext;
  recommendations: PamRecommendation[];
  links: { text: string; href: string }[];
  formattedResponse: string;
}

// Helper to check text matches
function textIncludes(source: string | undefined | null, query: string): boolean {
  if (!source) return false;
  return source.toLowerCase().includes(query.toLowerCase());
}

// 1. Intent Classification and Entity Extraction
export function classifyIntentAndExtractEntities(messages: { role: string; content: string }[]): PamQueryContext {
  if (!messages || messages.length === 0) {
    return { intent: 'course-recommendation', topic: 'networking' };
  }

  const latestMsg = messages[messages.length - 1].content.trim();
  const lowerLatest = latestMsg.toLowerCase();

  // Find previous topic from conversation history for follow-ups
  let historicalTopic = '';
  for (let i = messages.length - 2; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === 'user') {
      const topicCandidate = extractTopicFromText(msg.content);
      if (topicCandidate) {
        historicalTopic = topicCandidate;
        break;
      }
    }
  }

  // Check constraints
  const freeOnly = lowerLatest.includes('free') || lowerLatest.includes('no cost') || lowerLatest.includes('zero cost');
  const beginnerOnly = lowerLatest.includes('beginner') || lowerLatest.includes('start') || lowerLatest.includes('entry level') || lowerLatest.includes('novice');
  const handsOnOnly = lowerLatest.includes('practise') || lowerLatest.includes('practice') || lowerLatest.includes('lab') || lowerLatest.includes('hands-on') || lowerLatest.includes('exercise');

  // Check if this is a short follow-up (e.g., "Only free ones", "For beginners", "What about free?")
  const isFollowUp = (
    lowerLatest.length < 25 ||
    lowerLatest.includes('only free') ||
    lowerLatest.includes('free ones') ||
    lowerLatest.includes('for beginner') ||
    lowerLatest.includes('what about') ||
    lowerLatest.includes('which ones are free')
  ) && Boolean(historicalTopic);

  let currentTopic = extractTopicFromText(latestMsg);
  if (isFollowUp && historicalTopic) {
    currentTopic = currentTopic || historicalTopic;
  }
  if (!currentTopic && historicalTopic) {
    currentTopic = historicalTopic;
  }
  if (!currentTopic) {
    currentTopic = 'networking'; // Safe fallback topic
  }

  // Intent classification
  let intent: PamIntent = 'course-recommendation';

  if (isFollowUp) {
    intent = 'follow-up';
  } else if (lowerLatest.includes(' vs ') || lowerLatest.includes(' versus ') || (lowerLatest.includes('or') && (lowerLatest.includes('aws') || lowerLatest.includes('azure') || lowerLatest.includes('gcp') || lowerLatest.includes('devops')))) {
    intent = 'career-comparison';
  } else if (lowerLatest.includes('cert') || lowerLatest.includes('certification') || lowerLatest.includes('exam')) {
    intent = 'certification-recommendation';
  } else if (lowerLatest.includes('how can i become') || lowerLatest.includes('how to become') || lowerLatest.includes('roadmap') || lowerLatest.includes('career path') || lowerLatest.includes('pathway') || lowerLatest.includes('path planner')) {
    intent = 'learning-path';
  } else if (lowerLatest.includes('book') || lowerLatest.includes('reading') || lowerLatest.includes('textbook')) {
    intent = 'book-recommendation';
  } else if (lowerLatest.includes('youtube') || lowerLatest.includes('teacher') || lowerLatest.includes('channel') || lowerLatest.includes('video') || lowerLatest.includes('educator')) {
    intent = 'teacher-recommendation';
  } else if (lowerLatest.includes('hackathon') || lowerLatest.includes('event') || lowerLatest.includes('competition') || lowerLatest.includes('contest') || lowerLatest.includes('fest')) {
    intent = 'event-discovery';
  } else if (lowerLatest.includes('practise') || lowerLatest.includes('practice') || lowerLatest.includes('tool') || lowerLatest.includes('lab') || lowerLatest.includes('hands-on') || lowerLatest.includes('where can i practice')) {
    intent = 'tool-learning';
  } else if (lowerLatest.includes('course') || lowerLatest.includes('learn') || lowerLatest.includes('study') || lowerLatest.includes('tutorial') || lowerLatest.includes('portal')) {
    intent = 'course-recommendation';
  } else if (lowerLatest.includes('role') || lowerLatest.includes('salary') || lowerLatest.includes('job') || lowerLatest.includes('what does a')) {
    intent = 'career-role';
  }

  // Extract Comparison Roles if comparison intent
  let roleA: string | undefined;
  let roleB: string | undefined;
  if (intent === 'career-comparison') {
    if (lowerLatest.includes('aws') && lowerLatest.includes('azure')) {
      roleA = 'aws-administrator';
      roleB = 'azure-administrator';
    } else if (lowerLatest.includes('devops') && lowerLatest.includes('cloud')) {
      roleA = 'devops-engineer';
      roleB = 'cloud-systems-engineer';
    }
  }

  return {
    intent,
    topic: currentTopic,
    roleA,
    roleB,
    freeOnly,
    beginnerOnly,
    handsOnOnly
  };
}

// Helper to extract recognizable topic/domain/skill from raw query text
function extractTopicFromText(text: string): string | null {
  const t = text.toLowerCase();
  
  if (t.includes('network') || t.includes('tcp/ip') || t.includes('subnetting') || t.includes('router') || t.includes('cisco') || t.includes('packet tracer')) {
    return 'networking';
  }
  if (t.includes('kubernetes') || t.includes('k8s') || t.includes('minikube')) {
    return 'kubernetes';
  }
  if (t.includes('python') || t.includes('django') || t.includes('flask')) {
    return 'python';
  }
  if (t.includes('soc analyst') || t.includes('soc') || t.includes('siem') || t.includes('wireshark') || t.includes('incident response')) {
    return 'soc analyst';
  }
  if (t.includes('aws') || t.includes('amazon web services')) {
    return 'aws';
  }
  if (t.includes('azure')) {
    return 'azure';
  }
  if (t.includes('cloud') || t.includes('gcp')) {
    return 'cloud';
  }
  if (t.includes('sql') || t.includes('postgres') || t.includes('database') || t.includes('mysql') || t.includes('sqlite')) {
    return 'sql';
  }
  if (t.includes('system design') || t.includes('architecture') || t.includes('microservices') || t.includes('distributed')) {
    return 'system design';
  }
  if (t.includes('devops') || t.includes('docker') || t.includes('ci/cd') || t.includes('sre') || t.includes('ansible')) {
    return 'devops';
  }
  if (t.includes('ai') || t.includes('machine learning') || t.includes('ml') || t.includes('llm') || t.includes('deep learning')) {
    return 'ai';
  }
  if (t.includes('cyber') || t.includes('security') || t.includes('pentest') || t.includes('ethical hacking') || t.includes('vulnerability')) {
    return 'cybersecurity';
  }
  if (t.includes('linux') || t.includes('sysadmin') || t.includes('system admin') || t.includes('bash') || t.includes('ubuntu')) {
    return 'sysadmin';
  }
  if (t.includes('java') || t.includes('spring')) {
    return 'java';
  }
  if (t.includes('javascript') || t.includes('react') || t.includes('node') || t.includes('frontend') || t.includes('backend')) {
    return 'web development';
  }
  if (t.includes('data analyst') || t.includes('data analytics') || t.includes('power bi') || t.includes('tableau')) {
    return 'data analytics';
  }

  // Fallback regex word extraction
  const keywords = ['networking', 'kubernetes', 'python', 'aws', 'azure', 'cloud', 'sql', 'devops', 'cybersecurity', 'sysadmin', 'ai', 'linux', 'git', 'docker'];
  for (const kw of keywords) {
    if (t.includes(kw)) return kw;
  }

  return null;
}

// 2. MapIT Knowledge Retrieval Engine
export function retrievePamRecommendations(ctx: PamQueryContext): PamRetrievalResult {
  const { intent, topic, freeOnly, roleA, roleB } = ctx;
  const topicLower = topic.toLowerCase();

  const recs: PamRecommendation[] = [];
  const links: { text: string; href: string }[] = [];

  // Default link generators
  const buildPortalLink = (query: string) => ({
    text: `View ${query} courses`,
    href: `/resources/study-portals?query=${encodeURIComponent(query)}`
  });
  const buildSkillsLink = (query: string) => ({
    text: `Explore ${query} skills`,
    href: `/resources/skills-tools?query=${encodeURIComponent(query)}`
  });
  const buildPathLink = (query: string) => ({
    text: `Open ${query} path`,
    href: `/path-planner?domain=${encodeURIComponent(query)}`
  });
  const buildCertLink = (query: string) => ({
    text: `View ${query} certs`,
    href: `/resources/certs?query=${encodeURIComponent(query)}`
  });
  const buildTeacherLink = (query: string) => ({
    text: `Show ${query} YouTube teachers`,
    href: `/resources/youtube-teachers?query=${encodeURIComponent(query)}`
  });
  const buildBookLink = (query: string) => ({
    text: `Browse ${query} books`,
    href: `/resources/bookshelf?query=${encodeURIComponent(query)}`
  });
  const buildHackathonLink = (query: string) => ({
    text: `Browse ${query} hackathons`,
    href: `/resources/hackathons?query=${encodeURIComponent(query)}`
  });
  const buildTaxonomyLink = (query: string) => ({
    text: `Explore ${query} roles`,
    href: `/taxonomy?query=${encodeURIComponent(query)}`
  });

  let directAnswerText = '';
  let nextStepText = '';

  // 1. Networking Query Handler
  if (topicLower === 'networking') {
    directAnswerText = freeOnly
      ? 'Start with free networking fundamentals covering TCP/IP, subnetting, routing, switching, DNS and DHCP.'
      : 'Start with a networking fundamentals course covering TCP/IP, subnetting, routing, switching, DNS and DHCP.';

    recs.push({
      title: 'Cisco Networking Academy',
      subtitle: 'Networking Basics',
      description: 'Official Cisco fundamental track covering networking hardware, OSI layers, and IP addressing.',
      isFree: true
    });
    recs.push({
      title: 'Microsoft Learn',
      subtitle: 'Fundamentals of computer networking',
      description: 'Interactive self-paced module on core network protocols and cloud connectivity.',
      isFree: true
    });
    recs.push({
      title: 'NPTEL or SWAYAM',
      subtitle: 'Computer Networks',
      description: 'University-grade structured lectures on packet switching, routing algorithms, and security.',
      isFree: true
    });

    nextStepText = 'For hands-on practice, continue with Packet Tracer and basic network troubleshooting labs.';

    links.push(buildPortalLink('networking'));
    links.push(buildSkillsLink('networking'));
    links.push(buildPathLink('networking'));
  }
  
  // 2. Kubernetes Query Handler
  else if (topicLower === 'kubernetes') {
    directAnswerText = 'Learn Kubernetes by building container orchestration concepts including pods, deployments, services, and ingress controllers.';

    recs.push({
      title: 'Kubernetes.io Tutorials',
      subtitle: 'Interactive Basics',
      description: 'Official hands-on browser terminal guides for creating clusters and deploying container apps.',
      isFree: true
    });
    recs.push({
      title: 'KodeKloud',
      subtitle: 'Kubernetes for Beginners',
      description: 'Visual diagrams and real terminal practice labs for pod management and YAML configs.',
      isFree: false
    });
    recs.push({
      title: 'Linux Foundation (LFS158x)',
      subtitle: 'Introduction to Kubernetes',
      description: 'Official edX course covering cloud-native architecture, cluster setup, and kubectl.',
      isFree: true
    });

    nextStepText = 'Practice locally using Minikube or Kind for cluster deployment and debugging.';

    links.push(buildSkillsLink('kubernetes'));
    links.push(buildPortalLink('kubernetes'));
    links.push(buildPathLink('devops'));
  }

  // 3. Python Query Handler
  else if (topicLower === 'python') {
    directAnswerText = freeOnly
      ? 'Here are top free Python courses that cover programming syntax, data structures, and practical projects:'
      : 'Master Python through structured courses covering core syntax, data structures, object-oriented programming, and real projects.';

    recs.push({
      title: 'Python for Everybody (Dr. Chuck)',
      subtitle: 'FreeCodeCamp / Coursera',
      description: 'Comprehensive, beginner-friendly introduction to Python data structures and Web APIs.',
      isFree: true
    });
    recs.push({
      title: 'Microsoft Learn',
      subtitle: 'Python for Beginners Track',
      description: 'Hands-on guided path for writing Python scripts, managing packages, and error handling.',
      isFree: true
    });
    recs.push({
      title: 'Harvard CS50P',
      subtitle: 'Introduction to Programming with Python',
      description: 'Rigorous open course on functions, variables, unit testing, and file I/O.',
      isFree: true
    });

    nextStepText = 'Practice writing scripts daily and hosting simple console projects on GitHub.';

    links.push(buildPortalLink('python'));
    links.push(buildSkillsLink('python'));
  }

  // 4. SOC Analyst Query Handler
  else if (topicLower === 'soc analyst' || topicLower === 'soc') {
    directAnswerText = 'To become a SOC Analyst, build skills in SIEM log monitoring, threat detection, network traffic analysis, and incident response.';

    recs.push({
      title: 'Google Cybersecurity Certificate',
      subtitle: 'Coursera / Google',
      description: 'Covers SIEM tools like Chronicle & Splunk, Linux security, Python for security, and incident response.',
      isFree: false
    });
    recs.push({
      title: 'TryHackMe',
      subtitle: 'SOC Level 1 Learning Path',
      description: 'Hands-on lab rooms for analyzing PCAP files, Wireshark, Splunk logs, and phishing analysis.',
      isFree: true
    });
    recs.push({
      title: 'Microsoft SC-200 Certification',
      subtitle: 'Security Operations Analyst',
      description: 'Official track for threat mitigation using Microsoft Sentinel and Defender for Endpoint.',
      isFree: true
    });

    nextStepText = 'Focus on analyzing real attack logs and writing concise incident analysis reports.';

    links.push({ text: 'Open SOC Analyst path', href: '/path-planner?role=soc-analyst' });
    links.push(buildTaxonomyLink('cybersecurity'));
    links.push(buildCertLink('security'));
  }

  // 5. Azure / AWS Certification Query Handler
  else if (topicLower === 'azure' || topicLower === 'aws' || topicLower === 'cloud') {
    const cloudName = topicLower === 'aws' ? 'AWS' : 'Azure';
    directAnswerText = `For ${cloudName}, start with entry-level cloud fundamentals, then progress to operational administration and architecture.`;

    if (topicLower === 'azure') {
      recs.push({
        title: 'AZ-900: Microsoft Azure Fundamentals',
        subtitle: 'Entry-Level Certification',
        description: 'Validates foundational knowledge of Azure services, security, privacy, and cloud pricing.',
        isFree: true
      });
      recs.push({
        title: 'AZ-104: Microsoft Azure Administrator',
        subtitle: 'Core Operational Credential',
        description: 'Measures virtual network management, storage configuration, identities, and governance.',
        isFree: false
      });
      recs.push({
        title: 'AZ-305: Azure Solutions Architect Expert',
        subtitle: 'Advanced Architecture',
        description: 'Covers infrastructure design, business continuity, and data storage solutions.',
        isFree: false
      });
    } else {
      recs.push({
        title: 'AWS Certified Cloud Practitioner',
        subtitle: 'Foundational Certification',
        description: 'Validates overall understanding of AWS Cloud platform, core services, and security.',
        isFree: true
      });
      recs.push({
        title: 'AWS Certified Solutions Architect Associate',
        subtitle: 'Core Architecture Credential',
        description: 'Measures design of resilient, high-performing, decoupled, and cost-optimized architectures.',
        isFree: false
      });
      recs.push({
        title: 'AWS Certified SysOps Administrator',
        subtitle: 'Operations Credential',
        description: 'Focuses on deployment, management, and operations on AWS workloads.',
        isFree: false
      });
    }

    nextStepText = `Combine study modules with hands-on practice in the ${cloudName} Free Tier.`;

    links.push(buildCertLink(cloudName.toLowerCase()));
    links.push(buildSkillsLink(cloudName.toLowerCase()));
    links.push(buildPathLink('cloud'));
  }

  // 6. SQL Query Handler
  else if (topicLower === 'sql') {
    directAnswerText = 'Practice SQL queries for filtering, JOINs, aggregations, window functions, and schema design on interactive platforms.';

    recs.push({
      title: 'LeetCode & HackerRank SQL',
      subtitle: 'Interactive Problem Solving',
      description: 'Graded SQL practice challenges from basic SELECT queries to complex window functions.',
      isFree: true
    });
    recs.push({
      title: 'SQLZoo & Mode Analytics',
      subtitle: 'Interactive Tutorials',
      description: 'Browser-based SQL engine for learning joins, subqueries, and data analytics.',
      isFree: true
    });
    recs.push({
      title: 'W3Schools / Khan Academy SQL',
      subtitle: 'Syntax & Playground',
      description: 'Instant sandbox for executing queries and viewing relational table outputs.',
      isFree: true
    });

    nextStepText = 'Build local databases with PostgreSQL or SQLite to query realistic multi-table datasets.';

    links.push(buildSkillsLink('sql'));
    links.push(buildPortalLink('sql'));
  }

  // 7. System Design Query Handler
  else if (topicLower === 'system design') {
    directAnswerText = 'Here are essential resources for mastering scalability, distributed systems, caching, and architectural design patterns:';

    recs.push({
      title: 'Designing Data-Intensive Applications',
      subtitle: 'Book — Martin Kleppmann',
      description: 'Definitive guide on storage engines, replication, partitioning, and consistency models.',
      isFree: false
    });
    recs.push({
      title: 'System Design Interview',
      subtitle: 'Book — Alex Xu',
      description: 'Step-by-step architectural blueprints for rate limiters, web crawlers, and key-value stores.',
      isFree: false
    });
    recs.push({
      title: 'ByteByteGo / System Design Primer',
      subtitle: 'GitHub & Video Series',
      description: 'Open-source primer explaining load balancing, CDN caching, message queues, and sharding.',
      isFree: true
    });

    nextStepText = 'Focus on analyzing trade-offs between consistency, availability, latency, and fault tolerance.';

    links.push(buildBookLink('system design'));
    links.push(buildPathLink('devops'));
  }

  // 8. DevOps YouTube Teachers Handler
  else if (intent === 'teacher-recommendation' || topicLower === 'devops') {
    directAnswerText = 'Here are top verified YouTube educators covering Docker, Kubernetes, CI/CD, and IaC:';

    recs.push({
      title: 'TechWorld with Nana',
      subtitle: 'YouTube Channel',
      description: 'Exceptionally clear tutorials on Docker, Kubernetes, Terraform, and DevOps pipelines.',
      isFree: true
    });
    recs.push({
      title: 'Kunal Kushwaha',
      subtitle: 'YouTube Channel & Bootcamp',
      description: 'Hands-on open source DevOps & Cloud Native bootcamps with practical assignments.',
      isFree: true
    });
    recs.push({
      title: 'NetworkChuck',
      subtitle: 'YouTube Channel',
      description: 'Engaging, practical guides on networking, Linux CLI, Docker, and automation.',
      isFree: true
    });

    nextStepText = 'Subscribe to followalong build projects and practice creating GitHub Actions workflows.';

    links.push(buildTeacherLink('devops'));
    links.push(buildSkillsLink('devops'));
  }

  // 9. AI Hackathons Handler
  else if (intent === 'event-discovery' || topicLower === 'ai') {
    directAnswerText = 'Here are upcoming hackathons and challenges focused on AI, machine learning, and LLMs:';

    recs.push({
      title: 'Lablab.ai AI Hackathons',
      subtitle: 'Weekly Global Challenges',
      description: 'Build generative AI apps with OpenAI, Claude, Llama 3, and vector databases in 48-hour sprints.',
      isFree: true
    });
    recs.push({
      title: 'Kaggle Competitions',
      subtitle: 'Data Science & ML Challenges',
      description: 'Global machine learning competitions with cash prizes and public leaderboard benchmarking.',
      isFree: true
    });
    recs.push({
      title: 'Devpost AI & LLM Sprints',
      subtitle: 'Open Innovation Challenges',
      description: 'Build open source AI agents, agentic workflows, and multimodal applications.',
      isFree: true
    });

    nextStepText = 'Join Discord builder teams and construct a working MVP with Gemini or Claude API.';

    links.push(buildHackathonLink('ai'));
    links.push(buildSkillsLink('ai'));
  }

  // 10. Generic / Dynamic Retrieval Fallback from MapIT catalog
  else {
    directAnswerText = `Here are verified MapIT recommendations for learning ${topic}:`;

    // Dynamic search catalog
    const catalogMatches = importedCatalog.filter((rec: any) =>
      textIncludes(rec.skillOrTool, topic) ||
      textIncludes(rec.topic, topic) ||
      textIncludes(rec.domain, topic)
    ).slice(0, 3);

    if (catalogMatches.length > 0) {
      catalogMatches.forEach((m: any) => {
        recs.push({
          title: m.portal || 'Study Portal',
          subtitle: m.skillOrTool || m.topic,
          description: m.notes || `Curated learning resources covering ${m.skillOrTool || topic}.`,
          isFree: m.isFree || true
        });
      });
    } else {
      // Fallback items from portals & skills
      recs.push({
        title: 'Coursera & edX',
        subtitle: `${topic} Specialization`,
        description: `University-backed structured courses covering core fundamentals and practical projects in ${topic}.`,
        isFree: true
      });
      recs.push({
        title: 'Microsoft Learn / Official Docs',
        subtitle: `${topic} Documentation`,
        description: `Official self-paced documentation, tutorials, and guided hands-on learning paths.`,
        isFree: true
      });
      recs.push({
        title: 'FreeCodeCamp & YouTube',
        subtitle: `${topic} Full Tutorials`,
        description: `Comprehensive video courses and project tutorials created by industry experts.`,
        isFree: true
      });
    }

    nextStepText = `Practice building small projects in ${topic} to reinforce your learning.`;

    links.push(buildPortalLink(topic));
    links.push(buildSkillsLink(topic));
    links.push(buildPathLink(topic));
  }

  // Comparison override
  if (intent === 'career-comparison' && roleA && roleB) {
    directAnswerText = `Both ${roleA.toUpperCase()} and ${roleB.toUpperCase()} are high-demand cloud tracks. Compare their core duties, required tools, and salary trajectories side-by-side:`;
    recs.length = 0; // Clear
    nextStepText = '';
    links.length = 0;
    links.push({
      text: `Compare ${roleA.replace('-', ' ')} vs ${roleB.replace('-', ' ')}`,
      href: `/comparison?roleA=${roleA}&roleB=${roleB}`
    });
    links.push(buildTaxonomyLink('cloud'));
  }

  // Limit recommendations to at most 3-4 bullets and links to at most 3
  const finalRecs = recs.slice(0, 4);
  const finalLinks = links.slice(0, 3);

  // Construct standard formatted response text
  let formattedResponse = `${directAnswerText}\n\n`;

  if (finalRecs.length > 0) {
    formattedResponse += `Recommended options:\n`;
    finalRecs.forEach((r) => {
      const sub = r.subtitle ? ` — ${r.subtitle}` : '';
      formattedResponse += `- **${r.title}**${sub}: ${r.description}\n`;
    });
    formattedResponse += `\n`;
  }

  if (nextStepText) {
    formattedResponse += `${nextStepText}\n\n`;
  }

  if (finalLinks.length > 0) {
    formattedResponse += finalLinks.map((l) => `[${l.text}](${l.href})`).join(' · ');
  }

  return {
    context: ctx,
    recommendations: finalRecs,
    links: finalLinks,
    formattedResponse: formattedResponse.trim()
  };
}
