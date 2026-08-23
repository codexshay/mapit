export interface Certification {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Required' | 'Preferred' | 'Optional';
  resourceUrl: string;
  costEstimate: string;
}

export interface InterviewTopic {
  technical: string[];
  scenario: string[];
  hr: string[];
}

export interface ResumeKeyword {
  keyword: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface RoleDetail {
  id: string;
  title: string;
  domain: string;
  level: 'Entry-level' | 'Mid-level' | 'Advanced';
  isCoding: boolean;
  isHighPaying: boolean;
  isRemote: boolean;
  indiaSalary: string;
  globalSalary: string;
  historyFuture: {
    history: string;
    future: string;
  };
  roleAsk: {
    explanation: string;
    suitableFor: string;
  };
  mustHaves: {
    tech: string[];
    process: string[];
  };
  cherries: string[];
  recommendedCertifications: Certification[];
  toolsToLearn: string[];
  interviewTopics: InterviewTopic;
  resumeKeywords: ResumeKeyword[];
  upskillingPath: string[];
  nextCareerMoves: string[];
  marketDemandSignal: {
    index: 'High Demand' | 'Medium Demand' | 'Growing Demand';
    percentStat: string;
  };
  nationalInfluence: string;
  companiesHiring: string[];
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  color: string; // Tailwind glow border color, e.g. 'border-cyan-500 shadow-cyan-400'
  roles: string[]; // Role IDs
}

export const TECHNICAL_ROLE_ALIASES: Record<string, string[]> = {
  // Kubernetes & Infrastructure
  "kubernetes-operator-specialist": ["k8s", "kubernetes", "kube", "container admin", "k8s operator", "helm", "kubectl", "docker", "cluster admin"],
  "container-security-specialist": ["k8s security", "container security", "trivy", "falco", "cluster security", "image scanning"],

  // AI, ML & Data Science
  "machine-learning-engineer": ["ml", "ml engineer", "ai engineer", "ai/ml", "deep learning", "model deployment", "pytorch", "tensorflow", "neural networks"],
  "prompt-engineer": ["prompt engineer", "llm", "genai", "generative ai", "chatgpt", "gpt", "rag", "langchain", "prompting", "ai trainer"],
  "generative-ai-engineer": ["genai", "generative ai", "llm developer", "ai engineer", "transformers", "fine-tuning", "ollama"],
  "nlp-developer": ["nlp", "natural language processing", "text analytics", "llm", "spacy", "bert"],
  "mlops-automation-specialist": ["mlops", "ml devops", "model ops", "ml pipeline", "kubeflow", "mlflow"],
  "data-scientist": ["data science", "statistician", "predictive analytics", "machine learning scientist", "r", "python data"],
  "data-analyst": ["analytics", "data analysis", "sql analyst", "data reporting", "excel analyst"],
  "business-intelligence-analyst": ["bi", "bi analyst", "power bi", "tableau", "dashboards", "business intelligence"],
  "big-data-developer": ["big data", "hadoop", "spark", "pyspark", "data lake", "hive"],
  "data-lakehouse-engineer": ["lakehouse", "snowflake", "databricks", "delta lake", "dbt"],

  // DevOps & SRE
  "devops-engineer": ["devops", "cicd", "ci/cd", "gitops", "jenkins", "gitlab ci", "github actions", "pipeline engineer"],
  "site-reliability-engineer": ["sre", "site reliability", "observability", "prometheus", "grafana", "slo", "sla", "error budget"],
  "site-reliability-engineer-sre": ["sre", "site reliability engineer", "observability", "prometheus", "grafana", "slo", "sla"],
  "platform-engineer": ["platform engineering", "developer portal", "backstage", "infrastructure automation", "internal developer platform", "idp"],
  "cloud-systems-engineer": ["cloud engineer", "aws engineer", "azure engineer", "gcp engineer", "terraform", "ansible", "iac"],
  "cloud-solutions-architect": ["cloud architect", "aws architect", "azure architect", "gcp architect", "solutions architect"],
  "infrastructure-lead-engineer": ["infra lead", "infrastructure lead", "iac", "terraform", "ansible"],

  // Cybersecurity & SOC & Pentesting
  "soc-analyst-level-1-trainee": ["soc", "soc analyst", "l1 analyst", "siem", "splunk", "sentinel", "threat triage"],
  "soc-analyst-level-2": ["soc analyst", "l2 analyst", "threat detection", "incident triage", "soc"],
  "soc-analyst-level-3-specialist": ["soc lead", "l3 analyst", "threat hunter", "forensics", "soc"],
  "penetration-tester": ["pentester", "pen testing", "penetration testing", "ethical hacker", "ethical hacking", "red team", "burp suite", "metasploit", "offensive security"],
  "cybersecurity-analyst": ["cyber analyst", "infosec", "security analyst", "cyber", "sec", "threat intelligence"],
  "incident-response-engineer": ["dfir", "digital forensics", "incident response", "blue team", "malware analysis"],
  "grc-analyst": ["grc", "governance risk compliance", "iso 27001", "soc 2", "compliance auditor", "risk analyst"],
  "cloud-security-engineer": ["devsecops", "secops", "cloud sec", "iam security", "zero trust"],

  // QA & Testing
  "software-dev-engineer-in-test-sdet": ["sdet", "qa automation", "automation engineer", "selenium", "cypress", "playwright", "test automation"],
  "qa-analyst": ["qa", "qa engineer", "quality assurance", "software tester", "manual testing", "test cases"],
  "qa-automation-tester": ["qa automation", "automation tester", "test scriptwriter", "sdet"],
  "performance-testing-specialist": ["performance tester", "jmeter", "loadrunner", "stress testing", "load testing"],

  // Software Development
  "full-stack-developer": ["fullstack", "full-stack", "mern", "mean", "software engineer", "sde", "swe", "web developer"],
  "frontend-developer": ["frontend", "front-end", "react", "vue", "angular", "nextjs", "web developer", "ui developer", "html/css"],
  "backend-developer": ["backend", "back-end", "node", "nodejs", "express", "java spring", "django", "python backend", "golang", "go", "api developer"],
  "software-developer": ["sde", "swe", "software engineer", "programmer", "coder"],
  "android-developer": ["android", "mobile developer", "kotlin", "java android", "app developer"],

  // System Administration & IT Support
  "service-desk-analyst-trainee": ["service desk", "helpdesk", "it support", "tier 1 support", "ticketing", "servicenow"],
  "desktop-support-technician": ["desktop support", "euc", "end user computing", "sysadmin", "hardware repair"],
  "system-administrator": ["sysadmin", "system admin", "linux admin", "windows admin", "active directory", "sys admin"],
  "linux-system-administrator": ["linux admin", "sysadmin", "rhel", "ubuntu server", "bash scripting"],
  "windows-system-administrator": ["windows admin", "active directory", "group policy", "powershell"],

  // Database Administration
  "database-administrator-dba": ["dba", "db admin", "database administrator", "sql dba", "postgres dba", "oracle dba", "mysql dba"],
  "postgresql-administrator": ["postgres dba", "postgresql", "postgres admin", "dba"],
  "mysql-dba": ["mysql", "mysql administrator", "dba"],
  "oracle-administrator": ["oracle dba", "oracle admin", "dba"],

  // Networking & Telecom
  "network-engineer": ["network admin", "noc", "ccna", "ccnp", "router", "switch", "routing", "switching", "cisco"],
  "noc-technician": ["noc", "network operations center", "noc analyst", "monitoring"],

  // Project Management & Agile
  "scrum-master": ["scrum", "agile coach", "agile master", "kanban", "sprint master"],
  "it-project-manager": ["pmp", "project manager", "it pm", "project lead", "program manager"],

  // Green Computing
  "green-computing-specialist": ["green computing", "sustainable IT", "carbon-aware", "eco tech", "energy efficient IT"]
};

export function checkRoleMatchesSearchQuery(role: RoleDetail, queryStr: string): boolean {
  if (!queryStr || !queryStr.trim()) return true;
  const q = queryStr.toLowerCase().trim();

  // 1. Direct Title or ID match
  if (role.title.toLowerCase().includes(q) || role.id.toLowerCase().includes(q)) return true;

  // 2. Technical Role Aliases / Alternate Names / Acronyms
  const aliases = TECHNICAL_ROLE_ALIASES[role.id] || [];
  if (aliases.some(alias => alias.toLowerCase().includes(q) || q.includes(alias.toLowerCase()))) return true;

  // 3. Technical Must-Haves (Tech & Process)
  if (role.mustHaves?.tech?.some(s => s.toLowerCase().includes(q))) return true;
  if (role.mustHaves?.process?.some(p => p.toLowerCase().includes(q))) return true;

  // 4. Tools to Learn
  if (role.toolsToLearn?.some(t => t.toLowerCase().includes(q))) return true;

  // 5. Recommended Certifications
  if (role.recommendedCertifications?.some(c => c.name.toLowerCase().includes(q))) return true;

  // 6. Resume Keywords
  if (role.resumeKeywords?.some(rk => rk.keyword.toLowerCase().includes(q))) return true;

  // 7. Technical Aspects & Interview Topics
  if (role.interviewTopics?.technical?.some(it => it.toLowerCase().includes(q))) return true;
  if (role.interviewTopics?.scenario?.some(sc => sc.toLowerCase().includes(q))) return true;

  // 8. Role Ask & Explanation
  if (role.roleAsk?.explanation?.toLowerCase().includes(q) || role.roleAsk?.suitableFor?.toLowerCase().includes(q)) return true;

  return false;
}

export function checkDomainMatchesSearchQuery(domain: Domain, queryStr: string, allRolesData: Record<string, RoleDetail>): boolean {
  if (!queryStr || !queryStr.trim()) return true;
  const q = queryStr.toLowerCase().trim();

  // 1. Domain Name, Description or ID match
  if (domain.name.toLowerCase().includes(q) || domain.description.toLowerCase().includes(q) || domain.id.toLowerCase().includes(q)) {
    return true;
  }

  // 2. Check if ANY role in domain matches (including title, aliases, technical aspects, key skills, tools, and keywords)
  return domain.roles.some(roleId => {
    const role = allRolesData[roleId];
    return role ? checkRoleMatchesSearchQuery(role, q) : false;
  });
}

export const IT_DOMAINS: Domain[] = [
  {
    id: "it-support",
    name: "IT Support, Service Desk & End-User Computing",
    description: "The frontline response handling hardware diagnostic setups, OS imaging, and ticketing queues.",
    color: "#3b82f6", // blue
    roles: [
      "it-support-trainee", "it-support-intern", "service-desk-analyst-trainee",
      "help-desk-technician", "desktop-support-technician", "technical-support-associate",
      "it-support-analyst", "desktop-support-engineer", "vip-support-specialist",
      "senior-technical-support-engineer", "escalation-specialist-l2-l3", "euc-specialist",
      "it-support-lead", "service-desk-team-lead",
      "service-desk-manager", "it-operations-manager",
      "head-of-end-user-computing-support", "director-of-it-support-services",
      "vp-it-operations", "chief-information-officer-cio"
    ]
  },
  {
    id: "systems-infra",
    name: "System Administration & Infrastructure",
    description: "Provisioning systems, maintaining Windows/Linux virtual server hosts, and managing storage blocks.",
    color: "#a855f7", // purple
    roles: [
      "junior-system-administrator", "it-infrastructure-trainee", "linux-admin-intern",
      "windows-administrator-trainee", "server-support-assistant",
      "system-administrator", "windows-system-administrator", "linux-system-administrator",
      "senior-linux-administrator", "virtualization-specialist", "storage-administrator",
      "infrastructure-lead-engineer", "enterprise-systems-analyst-lead",
      "it-infrastructure-manager", "data-center-manager",
      "director-of-it-infrastructure", "head-of-systems-engineering",
      "vp-technology"
    ]
  },
  {
    id: "networking",
    name: "Networking & NOC Operations",
    description: "Sustaining corporate network plumbing, LAN/WAN routers, switches, and load balancers.",
    color: "#10b981", // emerald
    roles: [
      "network-intern", "noc-analyst-trainee", "network-operations-associate",
      "noc-technician", "junior-network-engineer", "wireless-support-tech",
      "network-engineer", "network-administrator", "telecom-support-analyst",
      "senior-network-engineer", "network-automation-engineer", "network-routing-specialist",
      "network-operations-lead", "network-design-engineer",
      "it-network-manager", "head-of-noc-command",
      "director-of-network-engineering", "head-of-global-telecommunication-infrastructure",
      "vp-networks-cloud-infrastructure"
    ]
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    description: "Engineering multi-cloud infrastructures, hypervisors, VPC boundaries, and serverless architectures.",
    color: "#06b6d4", // cyan
    roles: [
      "cloud-support-associate", "cloud-operations-assistant", "junior-cloud-engineer",
      "cloud-support-trainee", "resource-optimizer-specialist",
      "cloud-systems-engineer", "aws-administrator", "azure-administrator", "gcp-specialist",
      "senior-cloud-platform-engineer", "multi-cloud-architect-specialist", "cloud-platform-lead",
      "cloud-infrastructure-lead", "kubernetes-operator-specialist",
      "cloud-engineering-manager", "global-cloud-operations-manager",
      "director-of-cloud-engineering", "head-of-enterprise-virtualization",
      "vp-cloud-platform-systems", "chief-technology-officer-cto"
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity, GRC & Security Operations",
    description: "Defending corporate infrastructures, firewalls, and managing ISO 27001 risk checks.",
    color: "#ef4444", // red
    roles: [
      "cybersecurity-intern", "soc-analyst-level-1-trainee", "grc-trainee",
      "junior-security-analyst", "vulnerability-scanner-specialist",
      "soc-analyst-level-2", "cybersecurity-analyst", "incident-response-engineer", "grc-analyst",
      "senior-security-engineer", "threat-hunter", "penetration-tester", "iam-consultant",
      "soc-analyst-level-3-specialist", "principal-security-architect",
      "security-operations-center-soc-manager", "grc-risk-auditor-manager",
      "director-of-information-security", "enterprise-security-director",
      "chief-information-security-officer-ciso", "vp-cybersecurity-compliance"
    ]
  },
  {
    id: "software-dev",
    name: "Software Development & Engineering",
    description: "Writing system backends, mobile architectures, frontend layouts, and dynamic API pipelines.",
    color: "#d946ef", // fuchsia
    roles: [
      "software-developer-intern", "frontend-dev-trainee", "backend-dev-intern",
      "junior-software-developer", "associate-software-engineer", "web-developer-assistant",
      "software-developer", "frontend-developer", "backend-developer", "android-developer", "full-stack-developer",
      "senior-software-engineer", "staff-software-engineer", "tech-lead-programmer",
      "principal-software-architect", "principal-engineer-developer",
      "software-engineering-manager", "technical-program-delivery-lead",
      "director-of-software-development", "head-of-web-technologies-engineering",
      "vp-engineering-software-systems"
    ]
  },
  {
    id: "qa-testing",
    name: "QA, Software Testing & Quality Engineering",
    description: "Authoring automated regression testing loops, performance indices validation, and bug audits.",
    color: "#ec4899", // pink
    roles: [
      "qa-intern", "bug-testing-trainee", "game-tester-associate",
      "junior-qa-tester", "manual-qa-engineer", "acceptance-analyst",
      "qa-analyst", "software-dev-engineer-in-test-sdet", "qa-automation-tester", "qa-tester",
      "senior-qa-automation-engineer", "performance-testing-specialist", "continuous-testing-lead",
      "qa-test-director-assistant", "test-automation-architect",
      "quality-engineering-manager", "qa-department-head-manager",
      "director-of-quality-assurance", "head-of-software-release-qc",
      "vp-technical-quality-operations"
    ]
  },
  {
    id: "devops-sre",
    name: "DevOps, SRE & Platform Engineering",
    description: "Automating server continuous deploy (CI/CD) pipelines, site reliability monitoring (SRE), and IaC.",
    color: "#0ea5e9", // sky
    roles: [
      "devops-trainee", "release-engineer-intern", "platform-associate-assistant",
      "junior-devops-engineer", "build-deployment-technician",
      "devops-engineer", "site-reliability-engineer-sre", "platform-engineer", "release-engineer", "site-reliability-engineer", "build-deployment-engineer",
      "senior-devops-engineer", "senior-site-system-architect-sre", "infrastructure-automation-specialist",
      "devops-automation-team-lead", "enterprise-sre-lead",
      "platform-engineering-manager", "sre-operations-manager",
      "director-of-site-reliability", "head-of-enterprise-devops-automation",
      "vp-infrastructure-dev"
    ]
  },
  {
    id: "data-analytics",
    name: "Data, Analytics & Business Intelligence",
    description: "Structuring database queries, aggregating analytical tables, and rendering interactive dashboards.",
    color: "#f59e0b", // amber
    roles: [
      "data-analyst", "reporting-assistant-trainee", "sql-systems-helper", "sql-analyst", "bi-analyst", "reporting-analyst",
      "junior-data-analyst", "excel-operations-analyst", "bi-report-assistant",
      "business-intelligence-analyst", "power-bi-developer", "tableau-creator",
      "big-data-developer", "hadoop-spark-developer", "data-lakehouse-engineer",
      "senior-data-analyst", "senior-analytics-consultant", "bi-systems-architect-specialist",
      "data-visualization-tech-lead", "business-intelligence-team-lead",
      "big-data-architect", "director-of-big-data-systems",
      "analytics-operations-manager", "bi-lead-manager-systems",
      "director-of-data-analytics", "head-of-business-intelligence-reporting",
      "vp-enterprise-growth-systems-analytics"
    ]
  },
  {
    id: "data-science-ai",
    name: "Data Science, AI & Machine Learning",
    description: "Developing advanced machine learning algorithms, cleaning vector datablocks, and prompt loops validation.",
    color: "#f43f5e", // rose
    roles: [
      "data-science-intern", "ai-research-assistant-trainee", "ml-prompt-engineering-helper", "ai-trainer", "prompt-engineer",
      "junior-data-scientist", "assistant-model-evaluator", "nlp-analyst-associate",
      "data-scientist", "machine-learning-engineer", "generative-ai-engineer", "nlp-developer", "ai-support-specialist",
      "senior-data-scientist", "applied-research-scientist", "mlops-automation-specialist",
      "generative-ai-platform-lead", "principal-ml-architect",
      "data-science-manager", "head-of-ai-product-operations",
      "director-of-artificial-intelligence", "head-of-ml-research-labs",
      "chief-ai-officer-caio", "vp-machine-learning-systems"
    ]
  },
  {
    id: "db-admin",
    name: "Database Administration (DBA)",
    description: "Preserving cluster configurations, indexing speed audits, backups protocols, and locks resolution.",
    color: "#14b8a6", // teal
    roles: [
      "database-trainee-linux", "sql-support-trainee-analyst", "database-support-intern",
      "junior-dba-tech", "sql-operations-helper",
      "database-administrator-dba", "oracle-administrator", "mysql-dba", "postgresql-administrator",
      "senior-database-administrator-partner", "database-replication-specialist", "data-warehouse-engineer",
      "database-reliability-team-lead", "enterprise-db-architect-specialist",
      "database-support-operations-manager", "data-platforms-head",
      "director-of-database-systems-operations", "corporate-storage-director",
      "vp-it-infrastructure-assets"
    ]
  },
  {
    id: "it-ops-itsm",
    name: "IT Operations, ITSM & Process Management",
    description: "Managing baseline helpdesk queues, incident change boards, SLA metrics, and systems lifecycle structures.",
    color: "#6366f1", // indigo
    roles: [
      "it-operations-intern", "itsm-analyst-trainee", "service-management-helper", "it-operations-associate",
      "change-coordinator", "problem-management-assistant", "sla-analyst-tool-helper",
      "it-operations-analyst", "servicenow-itsm-consultant", "incident-manager", "service-delivery-analyst",
      "senior-incident-management-specialist", "major-incident-lead-operations", "senior-sla-consultant",
      "service-delivery-lead-operations", "it-process-automated-consultant", "it-process-architect-consultant",
      "it-ops-manager", "itsm-incident-manager-lead",
      "director-of-it-operations", "head-of-it-service-management-itsm",
      "vp-it-operations-services"
    ]
  },
  {
    id: "erp-crm",
    name: "ERP, CRM & Business Application Roles",
    description: "Managing SAP modules, Salesforce CRM accounts, workflows setups, and warehouse ledger mappings.",
    color: "#3b82f6", // blue
    roles: [
      "erp-support-trainee", "crm-analyst-intern", "sap-trainee-associate", "erp-support-analyst", "crm-support-analyst",
      "salesforce-admin-trainee", "erp-operations-assistant", "workday-assistant",
      "sap-functional-consultant", "sap-technical-developer", "salesforce-administrator", "servicenow-administrator",
      "senior-salesforce-administrator", "senior-sap-consultant-erp", "oracle-erp-cloud-analyst", "workday-engineer",
      "sap-lead-module-expert", "salesforce-architect-specialist",
      "enterprise-applications-team-lead", "erp-support-manager-systems",
      "director-of-enterprise-business-applications", "head-of-salesforce-oracle-platforms",
      "chief-digital-officer", "vp-enterprise-systems-operations"
    ]
  },
  {
    id: "product-mgmt",
    name: "Product, Project & Program Management",
    description: "Guiding software release cycles, sprints orchestration, grooming backlog pipelines, and scrum meetings.",
    color: "#f59e0b", // yellow
    roles: [
      "project-coordinator", "product-analyst-intern", "scrum-team-assistant",
      "associate-product-manager", "project-management-assistant", "pmo-analyst-helper",
      "it-project-manager", "technical-project-manager", "product-manager", "scrum-master", "agile-coach",
      "senior-product-manager", "senior-technical-project-lead", "agile-coach-consultant", "senior-delivery-manager",
      "principal-product-lead", "product-director-assistant",
      "product-delivery-lead-manager", "pmo-director-assistant-manager",
      "director-of-product-management", "program-management-director",
      "chief-product-officer-cpo", "vp-technical-program-operations"
    ]
  },
  {
    id: "business-analysis",
    name: "Business Analysis & Tech Consulting",
    description: "Translating executive demands into tech instructions, mapping user profiles, and compiling functional grids.",
    color: "#6366f1", // indigo
    roles: [
      "business-analyst-trainee", "consulting-analyst-intern", "requirements-assistant", "it-business-analyst",
      "junior-business-analyst", "process-analyst-assistant",
      "business-analyst", "functional-consultant", "solution-consultant",
      "senior-business-analyst-consultant", "senior-solution-consultant", "process-auditor-specialist",
      "lead-business-consultant", "principal-tech-consultant",
      "consulting-operations-manager", "practice-area-manager-partner",
      "director-of-technology-consulting", "head-of-business-analysis-operations",
      "vp-technical-consulting-services"
    ]
  },
  {
    id: "uiux-design",
    name: "UI/UX, Product Design & Creative Technology",
    description: "Designing user interaction maps, wireframes compilation, design systems configuration, and user tests.",
    color: "#a855f7", // purple
    roles: [
      "ui-design-intern", "ux-research-assistant-trainee", "graphic-designer-trainee",
      "junior-ui-designer", "web-layout-artist-associate", "creative-asset-assistant",
      "ui-designer", "ux-designer", "product-designer", "ux-researcher", "interaction-designer",
      "senior-ux-specialist-designer", "design-systems-architect-lead", "user-researcher-consultant",
      "creative-design-director-assistant", "ux-research-lead-tech",
      "product-design-manager", "user-experience-team-manager",
      "director-of-user-experience", "head-of-creative-ui-design-systems",
      "chief-design-officer", "vp-design-front-end-experience"
    ]
  },
  {
    id: "web-cms",
    name: "Web, CMS & Digital Technology",
    description: "Assembling Shopify landing views, configuring WordPress themes, and managing metadata engines for web visibility.",
    color: "#06b6d4", // cyan
    roles: [
      "cms-web-intern", "seo-assistant-trainee", "wordpress-assistant",
      "website-administrator-assistant", "seo-specialist-associate",
      "cms-developer", "wordpress-developer", "shop-site-creator", "shopify-site-creator", "technical-seo-specialist",
      "senior-web-developer-cms", "digital-platform-architect-specialist", "technical-seo-consultant",
      "web-technology-team-lead", "cms-platform-architect-coordinator",
      "digital-experience-manager", "website-systems-administrator-manager",
      "director-of-web-platforms", "head-of-digital-experience-seo-strategy",
      "vp-corporate-communications-systems"
    ]
  },
  {
    id: "automation-rpa",
    name: "Automation, RPA & Low-Code / No-Code",
    description: "Building automated workflows using UiPath, Power Automate, or n8n to connect company tools.",
    color: "#f43f5e", // rose
    roles: [
      "automation-assistant-intern", "rpa-support-trainee", "no-code-assistant", "automation-analyst",
      "low-code-app-assistant", "junior-automation-analyst",
      "rpa-developer", "uipath-engineer", "power-automate-workflow-specialist", "n8n-developer",
      "senior-rpa-developer", "intelligent-workflow-architect", "low-code-plattform-admin",
      "process-automation-team-lead", "intelligent-automation-architect",
      "rpa-operations-department-manager", "no-code-development-manager",
      "director-of-process-automation", "head-of-digital-office-automation",
      "chief-digital-officer-technology", "vp-operational-efficiency"
    ]
  },
  {
    id: "tech-writing",
    name: "Technical Writing & Knowledge Management",
    description: "Compiling API markdown pages, assembling corporate knowledge bases, and documenting software requirements.",
    color: "#10b981", // emerald
    roles: [
      "content-support-trainee", "knowledge-base-helper", "technical-writer-intern",
      "junior-documentation-writer", "technical-editing-assistant",
      "technical-writer", "api-documentation-writer", "knowledge-analyst", "process-documentation-specialist",
      "senior-technical-writer", "documentation-operations-lead", "knowledge-base-manager-consultant",
      "information-strategy-lead", "principal-technical-writer",
      "technical-documentation-manager", "content-operations-manager-team-lead",
      "director-of-technical-documentation", "head-of-corporate-knowledge-management-systems",
      "vp-corporate-systems"
    ]
  },
  {
    id: "sales-customer-success",
    name: "Sales Engineering & Customer Success Technology",
    description: "Providing pre-sales support, managing product demonstrations, and coordinating technical onboarding.",
    color: "#3b82f6", // blue
    roles: [
      "sales-tech-intern", "pre-sales-assistant-trainee", "onboarding-assistant",
      "customer-success-coordinator", "product-specialist-associate", "technical-account-associate",
      "sales-engineer", "pre-sales-systems-consultant", "customer-success-manager", "technical-account-manager",
      "senior-sales-engineer-consultant", "technical-account-executive-lead", "senior-implementation-specialist",
      "principal-pre-sales-architect", "customer-success-director-assistant",
      "solutions-engineering-team-manager", "head-of-customer-onboarding",
      "director-of-solutions-engineering", "director-of-customer-success-technology-platforms",
      "vp-sales-technology-systems"
    ]
  },
  {
    id: "hardware-iot",
    name: "Hardware, Embedded Systems & IoT Engineering",
    description: "Programming microcontroller firmware, designing PCBs, and coordinating telemetry sensors.",
    color: "#6366f1", // indigo
    roles: [
      "hardware-intern", "iot-associate-assistant-trainee", "firmware-assistant",
      "junior-hardware-technician", "device-stress-testing-specialist",
      "hardware-engineer", "embedded-systems-engineer", "firmware-developer", "iot-specialist",
      "senior-embedded-systems-architect", "pcb-design-specialist", "microcontroller-engineer-specialist",
      "hardware-engineering-team-lead", "principal-embedded-architect",
      "embedded-systems-manager-engineering", "hardware-team-lead-manager",
      "director-of-hardware-engineering", "head-of-iot-products",
      "vp-electronics-engineering"
    ]
  },
  {
    id: "telecom-voice",
    name: "Telecom, Voice & Collaboration",
    description: "Maintaining corporate VoIP routers, corporate unified communications systems, and enterprise Zoom panels.",
    color: "#f59e0b", // amber
    roles: [
      "telecom-support-intern", "voice-engineer-trainee", "uc-operations-assistant", "telecom-engineer", "voice-engineer",
      "junior-voip-technician", "noc-voice-analyst-associate",
      "voice-network-engineer", "voip-administrator", "unified-communications-analyst", "teams-administrator",
      "senior-zoom-and-teams-administrator", "senior-telecom-architect", "unified-collaboration-lead",
      "enterprise-collaboration-systems-lead", "voice-system-principal-architect",
      "telecom-operations-manager", "collaboration-platforms-department-manager",
      "director-of-collaboration-technologies", "head-of-enterprise-communications-networks",
      "vp-technical-operations-infrastructure"
    ]
  },
  {
    id: "governance-audit",
    name: "Governance, Risk, Compliance (GRC) & IT Audit",
    description: "Auditing system safety controls, drafting compliance reports, and testing SOX IT guidelines.",
    color: "#ef4444", // red
    roles: [
      "it-audit-apprentice", "grc-analyst-intern", "compliance-trainee",
      "junior-compliance-analyst", "data-privacy-helper", "compliance-analyst",
      "it-auditor", "grc-analyst", "vulnerability-auditor", "sox-it-compliance-analyst",
      "senior-it-auditor-specialist", "senior-grc-consultant-adviser", "iso-27001-auditor-lead",
      "lead-it-governance-specialist", "privacy-compliance-lead-systems",
      "it-audit-department-manager", "grc-director-assistant-manager",
      "director-of-technology-controls-compliance", "corporate-risk-audit-director",
      "chief-risk-officer-cro", "chief-compliance-officer-cco"
    ]
  },
  {
    id: "architecture",
    name: "Technology Architecture Track",
    description: "Designing system integrations, high-level structural diagrams, cloud security rules, and databases schemas.",
    color: "#10b981", // emerald
    roles: [
      "systems-cadet-engineer", "associate-cloud-architect-assistant",
      "systems-layout-analyzer", "infrastructure-consultant-assistant",
      "solution-architect", "technical-architect", "database-architect", "cloud-architect",
      "senior-enterprise-architect-partner", "security-architect-specialist", "application-architect-architect",
      "principal-solutions-architect", "integrations-lead-architect",
      "corporate-enterprise-architecture-lead-manager", "technical-engineering-board-manager",
      "director-of-enterprise-architecture", "chief-systems-architect-strategy",
      "vp-global-tech-architecture"
    ]
  },
  {
    id: "executive",
    name: "Executive & C-Level Tech Leadership",
    description: "Guiding enterprise digital transformations, funding approvals, cyber plans, and business operations.",
    color: "#d946ef", // fuchsia
    roles: [
      "leadership-associate-trainee", "tech-management-intern",
      "it-coordinator-assistant", "pmo-coordinator-assistant",
      "technical-team-lead", "scrum-master-consultant", "it-operations-supervisor",
      "engineering-lead-associate", "senior-program-manager", "it-delivery-director-partner",
      "practice-area-lead-principal", "head-of-it-systems-operations",
      "it-delivery-department-manager", "staff-engineering-manager-lead",
      "director-of-technical-operations", "vp-it-strategy-operations",
      "chief-information-officer-cio", "chief-information-security-officer-ciso"
    ]
  },
  {
    id: "green-computing",
    name: "Green Computing & Sustainable IT",
    description: "Engineering carbon-efficient software, sustainable cloud resource operations, physical data center thermal scaling, and E-waste governance.",
    color: "#22c55e",
    roles: [
      "green-it-apprentice", "carbon-analyst-trainee", "sustainable-software-developer-intern",
      "green-computing-specialist", "carbon-aware-software-engineer", "sustainable-infrastructure-analyst",
      "senior-sustainable-systems-engineer", "sustainable-data-center-architect", "green-it-compliance-manager",
      "green-ai-analyst", "director-of-sustainable-technology", "chief-sustainability-officer"
    ]
  }
];

export const ROLES_DATA: Record<string, RoleDetail> = {
  'green-computing-specialist': {
    id: 'green-computing-specialist',
    title: 'Green Computing Specialist',
    domain: 'Green Computing & Sustainable IT',
    level: 'Mid-level',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹6.5L - ₹14L',
    globalSalary: '$85,000 - $135,000',
    historyFuture: {
      history: 'Historically, IT was managed of carbon footprints with zero optimization of power-usage-effectiveness (PUE). Computers and data centers were run at full power at all times, leading to massive heating and fossil-fuel power draw.',
      future: 'The future Green Computing Specialist will deploy intelligent virtualization, configure scheduling dynamically for low-carbon hours, audits corporate energy telemetry, and enforce carbon-neutral enterprise IT rules.'
    },
    roleAsk: {
      explanation: 'Responsible for evaluating enterprise hardware and software carbon intensity, optimizing cloud virtualization layouts, reducing E-waste lifecycles, and managing energy telemetry pipelines.',
      suitableFor: 'Perfect for environmental advocates who love systems architecture and database optimization, looking to combine technical IT systems governance with sustainable footprint reductions.'
    },
    mustHaves: {
      tech: ['Carbon accounting standards (GHG Protocol Scope 3)', 'Hardware Energy Telemetry (RAPL, Scaphandre)', 'Cloud Optimization tools (Infracost, AWS Customer Carbon Tool)', 'Virtualization power scaling configurations'],
      process: ['Green IT Lifecycle management', 'Sustainable Procurement metrics', 'Agile energy-reporting frameworks']
    },
    cherries: ['Sovereign energy audits certification', 'Bash/Python for telemetry logging', 'Hands-on experience with Raspberry Pi low-power workloads'],
    recommendedCertifications: [
      { name: 'Green Software Practitioner (GSF)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.greensoftware.foundation/', costEstimate: 'Free' },
      { name: 'SCR (Sustainability & Climate Risk)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.garp.org/scr', costEstimate: '$300' }
    ],
    toolsToLearn: ['Scaphandre', 'Infracost', 'Kepler (Kubernetes Efficient Power Level Exporter)', 'Carbon Aware SDK', 'Cloud Carbon Footprint Tool'],
    interviewTopics: {
      technical: ['Explain Power Usage Effectiveness (PUE) and how a Green IT Specialist can reduce it.', 'What is the Carbon Aware SDK and how do you implement scheduled tasks around grid carbon intensity intensity?'],
      scenario: ['An active server database drop alert is signaled during team hours. What is your process to isolate the failure?', 'A business client reports an integration mismatch in records. How do you troubleshoot?'],
      hr: ['Why is digital green computing important to you personally?', 'How do you convince conservative CTO teams to invest in carbon-aware codebase refactoring?']
    },
    resumeKeywords: [
      { keyword: 'Green IT Strategy', priority: 'High' },
      { keyword: 'Carbon-Efficient Cloud Scaling', priority: 'High' },
      { keyword: 'Energy Telemetry Audits', priority: 'Medium' },
      { keyword: 'Sustainable IT Logistics', priority: 'Medium' }
    ],
    upskillingPath: [
      'Learn the three scopes of greenhouse gas emissions (especially Scope 3 of digital products).',
      'Understand the 8 principles of Green Software Engineering by the Green Software Foundation.',
      'Deploy open-source carbon telemetry tools (e.g. Scaphandre, Cloud Carbon Footprint) on your local workstations.',
      'Construct a portfolio showing model deployment optimizations paired with low-carbon schedulers.',
      'Acquire GSF practitioner certification to establish enterprise-level professional credibility.'
    ],
    nextCareerMoves: ['Director of Sustainable Technology', 'Sustainable Cloud Architect'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Sustainable technology governance and carbon footprinting are in active mandates across 60%+ of Fortune 500 enterprises.'
    },
    nationalInfluence: 'Strongly backed by national environment agencies, ESG regulatory disclosures, and corporate social commitments.',
    companiesHiring: ['Google Cloud', 'Microsoft Philanthropies', 'Wipro Sustainable Systems', 'Infosys Green Initiatives', 'Accenture ESG Center', 'TCS Eco-Sustain']
  },
  'carbon-aware-software-engineer': {
    id: 'carbon-aware-software-engineer',
    title: 'Carbon-Aware Software Engineer',
    domain: 'Green Computing & Sustainable IT',
    level: 'Mid-level',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹8L - ₹18L',
    globalSalary: '$95,000 - $150,000',
    historyFuture: {
      history: 'Historically, software code was authored purely for execution speed or low RAM consumption, completely detached from the physical electricity grid carbon intensity powering the CPUs.',
      future: 'The future Carbon-Aware Software Engineer will write self-aware codebases that dynamically adjust their fidelity, batch background tasks, or shift computation regions based on live low-carbon energy grids.'
    },
    roleAsk: {
      explanation: 'Writing software backends, APIs, and microservices that query real-time grid carbon intensity signals and dynamically throttle heavy processing during high-carbon grid hours.',
      suitableFor: 'Perfect for software engineers who love backend programming, API design, algorithm optimization, and want to lead sustainable coding practices.'
    },
    mustHaves: {
      tech: ['Backend Programming (Node.js, Rust, Go, Python)', 'Carbon Aware SDK Integration', 'API Gateway Throttle Configurations', 'Kepler (Kubernetes efficient power telemetry)', 'Energy-efficient Algorithmic Big-O optimizations'],
      process: ['Green Software Engineering Principles', 'CI/CD runner optimization', 'Carbon weight budgets per software release']
    },
    cherries: ['Rust language low-level memory power control', 'Serverless scaling optimization', 'Kubernetes HPA (Horizontal Pod Autoscaler) rules based on energy levels'],
    recommendedCertifications: [
      { name: 'Green Software Practitioner Certification', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.greensoftware.foundation/', costEstimate: 'Free' },
      { name: 'Certified Kubernetes Administrator (CKA)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/', costEstimate: '$395' }
    ],
    toolsToLearn: ['Carbon Aware SDK', 'GitHub Action Carbon Footprint', 'Kepler Exporter', 'Scaphandre', 'Infracost Carbon Plugin'],
    interviewTopics: {
      technical: ['How does a software program use Carbon Intensity (gCO2eq/kWh) to execute carbon-temporal shifting?', 'What are the main principles of Carbon-Efficient backend processing?'],
      scenario: ['A user requests to generate a heavy report. How do you implement a queue that schedules this job to run when the local electric grid has >50% renewable energy penetration?', 'A legacy bloated microservice is generating high CPU utilization. How do you audit and profile its code to minimize electricity draw?'],
      hr: ['How do you explain the carbon impact of a software update to non-technical product managers?', 'What is your favorite carbon-aware development strategy?']
    },
    resumeKeywords: [
      { keyword: 'Carbon-Aware Code Design', priority: 'High' },
      { keyword: 'Green Software Principles', priority: 'High' },
      { keyword: 'Algorithm Power Profiling', priority: 'Medium' },
      { keyword: 'Kubernetes Energy Telemetry', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master the concepts of carbon-intensity, carbon efficiency, and temporal/spatial shifting.',
      'Build a simple Node.js app that calls the Carbon Aware SDK to throttle background actions.',
      'Integrate energy-efficient logic into your portfolio projects (e.g. databases caching patterns).',
      'Optimize docker base images to minimize CI/CD CPU burn during build cycles.',
      'Achieve the Green Software Practitioner credential to validate your capabilities.'
    ],
    nextCareerMoves: ['Principal Green Software Architect', 'VP of Sustainable Tech Product'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Over 40% of tech firms are starting to establish green code review boards for cloud deployments.'
    },
    nationalInfluence: 'Strong impact across tech hubs leading international cloud infrastructure integrations.',
    companiesHiring: ['Microsoft', 'Thoughtworks Green Lab', 'Intel Sustainable Software', 'Red Hat ESG Group', 'Infosys Sustainable Tech', 'Capgemini Green IT']
  },
  'sustainable-infrastructure-analyst': {
    id: 'sustainable-infrastructure-analyst',
    title: 'Cloud Sustainability & GreenOps Analyst',
    domain: 'Green Computing & Sustainable IT',
    level: 'Mid-level',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹7.5L - ₹16L',
    globalSalary: '$90,000 - $145,000',
    historyFuture: {
      history: 'Before sustainable cloud architectures became standard, cloud resource footprints were measured purely in cost optimization (FinOps), often neglecting idle servers and CPU emissions footprints.',
      future: 'The future GreenOps Analyst will integrate real-time grid emissions telemetry to automatically relocate cloud VM jobs and optimize core operational cloud sustainability with instant ROI.'
    },
    roleAsk: {
      explanation: 'Responsible for tracking and optimizing cloud greenhouse gas emissions, terminating idle VMs, evaluating regions by grid greenness, and setting cost-carbon efficiency thresholds.',
      suitableFor: 'Perfect for cloud engineers and financial analysts passionate about greenhouse gas reductions, cost efficiency, FinOps, and big-data environmental metrics.'
    },
    mustHaves: {
      tech: ['Cloud carbon accounting platforms', 'FinOps cost-carbon analytics', 'Telemetry observability (Grafana/CloudWatch)', 'API integration of carbon indices'],
      process: ['Green cloud migration planning', 'Corporate carbon budgeting', 'Resource provisioning reviews']
    },
    cherries: ['AWS Certified Cloud Practitioner', 'Experience with Infracost Carbon API', 'Familiarity with Cloud Carbon Footprint Tool'],
    recommendedCertifications: [
      { name: 'FinOps Certified Practitioner', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.finops.org/certification/', costEstimate: '$300' },
      { name: 'AWS Certified Cloud Practitioner', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', costEstimate: '$100' }
    ],
    toolsToLearn: ['Cloud Carbon Footprint', 'AWS Carbon Footprint Tool', 'Google Cloud Carbon Footprint Dashboard', 'Azure Emissions Impact Dashboard', 'Kubecost'],
    interviewTopics: {
      technical: ['How do you analyze a cloud carbon dashboard to distinguish between idle workloads and active carbon intensity?', 'What factors influence grid emissions variations across cloud regions?'],
      scenario: ['A team has spinning dev environments running 24/7. How do you implement automated schedules to scale them down and report energy savings?', 'Explain the trade-offs of spatial shifting for active cloud workloads based on carbon intensity.'],
      hr: ['What motivates you to advocate for green operations inside a high-throughput technology firm?', 'How do you handle developers who resist changing cloud regions for their servers?']
    },
    resumeKeywords: [
      { keyword: 'Cloud GreenOps Strategy', priority: 'High' },
      { keyword: 'Cloud Carbon Footprint tracking', priority: 'High' },
      { keyword: 'FinOps & Cloud Optimization', priority: 'Medium' },
      { keyword: 'Spatial and Temporal Workload Shifting', priority: 'Medium' }
    ],
    upskillingPath: [
      'Learn cloud virtualization structures and identify resources that waste physical server power.',
      'Study regional energy sources globally and grasp why cloud data center regions differ in carbon intensity.',
      'Deploy the open-source Cloud Carbon Footprint tool on a sample AWS, GCP, or Azure subscription.',
      'Coordinate with financial and technical teams to build combined cost-and-carbon reporting spreadsheets.',
      'Obtain FinOps practitioner credentials to reinforce corporate resource management strategies.'
    ],
    nextCareerMoves: ['Senior Sustainable Cloud Architect', 'Director of Green Cloud Operations'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Over 55% of cloud-centric enterprise teams have started factoring green cloud metrics into cloud architecture reviews.'
    },
    nationalInfluence: 'Highly relevant in regions adopting global green cloud mandates, corporate carbon bookkeeping rules, and spatial scheduling.',
    companiesHiring: ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure', 'Thoughtworks', 'Accenture Green Cloud', 'Deloitte Digital']
  },
  'sustainable-data-center-architect': {
    id: 'sustainable-data-center-architect',
    title: 'Data Center Sustainability Engineer',
    domain: 'Green Computing & Sustainable IT',
    level: 'Advanced',
    isCoding: false,
    isHighPaying: true,
    isRemote: false,
    indiaSalary: '₹12L - ₹25L',
    globalSalary: '$115,000 - $185,000',
    historyFuture: {
      history: 'Historically, data centers were operated with crude mechanical cooling baselines and high Power Usage Effectiveness (PUE) factors, leading to immense electrical strains and wastewater load.',
      future: 'Future Data Center Sustainability Architects will design zero-waste server spaces utilizing immersion liquid cooling, heat reuse schemes, and direct on-site renewable energy grids.'
    },
    roleAsk: {
      explanation: 'Designs and manages the mechanical, electrical, thermal and environmental systems of hyper-scale server infrastructures to maximize PUE (Power Usage Effectiveness) efficiency and achieve net-zero power and cooling cycles.',
      suitableFor: 'Mechanical, electrical and systems engineers who love large-scale machinery, thermodynamics, smart power grids, and optimizing massive energy footprints.'
    },
    mustHaves: {
      tech: ['Power Usage Effectiveness (PUE) calculations', 'Data Center Infrastructure Management (DCIM) tools', 'HVAC & HVAC thermal dynamics', 'Smart metering systems'],
      process: ['Energy audits and safety compliance', 'E-waste tracking', 'Renewable microgrid integration']
    },
    cherries: ['Certified Data Centre Environmental Specialist (CDCES)', 'Immersion liquid cooling configurations', 'Knowledge of ASHRAE guidelines'],
    recommendedCertifications: [
      { name: 'DCEP (Data Center Energy Practitioner)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.energy.gov/eere/femp/data-center-energy-practitioner-dcep-program', costEstimate: '$500' },
      { name: 'CDCEP (Certified Data Center Environmental Practitioner)', level: 'Advanced', status: 'Preferred', resourceUrl: '#', costEstimate: '$450' }
    ],
    toolsToLearn: ['Schneider Electric EcoStruxure', 'Siemens Desigo CC', 'SynapSense DCIM', 'Nlyte DCIM'],
    interviewTopics: {
      technical: ['How does Power Usage Effectiveness (PUE) translate to server efficiency, and how do you calculate WUE (Water Usage Effectiveness)?', 'Explain the structural design of hot or cold aisle containment setups.'],
      scenario: ['A geographic region suffers intense summer cooling constraints. What mechanical and operational adjustments do you recommend to regulate thermal load without spiking greenhouse emissions?', 'A customer requests to audit server emissions from hardware deployment. What logs do you gather?'],
      hr: ['What is your motivation for making physical data centers more environment-friendly?', 'How do you coordinate with safety teams to implement eco-friendly HVAC modifications?']
    },
    resumeKeywords: [
      { keyword: 'PUE Optimization', priority: 'High' },
      { keyword: 'HVAC Thermal Dynamics', priority: 'High' },
      { keyword: 'DCIM Software deployment', priority: 'Medium' },
      { keyword: 'Liquid Immersion Cooling systems', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master thermodynamics and structural HVAC baseline mechanics.',
      'Familiarize yourself with Data Center Infrastructure Management (DCIM) softwares.',
      'Join sustainability workgroups by organizations such as Open Compute Project (OCP).',
      'Obtain Data Center Energy Practitioner (DCEP) status to gain design-authority privileges.',
      'Build mock models for local energy audits and low-emission server room layouts.'
    ],
    nextCareerMoves: ['Head of Global Infrastructure Sustainability', 'VP of Green Infrastructure Systems'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Sustainable hardware planning requirements have grown by over 70% in cloud facilities.'
    },
    nationalInfluence: 'Strong national influence under cloud infrastructure hubs and clean-energy corridors.',
    companiesHiring: ['Equinix', 'Digital Realty', 'Google Cloud Infrastructure', 'Microsoft Data Centers', 'AWS Infrastructure', 'Adani Green Data Centers', 'CtrlS Datacenters']
  },
  'green-it-compliance-manager': {
    id: 'green-it-compliance-manager',
    title: 'IT Asset / E-waste Compliance Analyst',
    domain: 'Green Computing & Sustainable IT',
    level: 'Advanced',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹9L - ₹18L',
    globalSalary: '$95,000 - $140,000',
    historyFuture: {
      history: 'Historically, discarded IT assets (servers, laptops, components) were dumped in global landfills with minimal hazardous compound checking, resulting in massive toxic waste and zero circular raw-material reclaiming.',
      future: 'Future IT Asset Managers will implement automated circular asset passports to trace all hardware components from raw rare-earth metals to certified clean recycling processes.'
    },
    roleAsk: {
      explanation: 'Coordinates and governs the disposal, repair, reuse, and recycling of enterprise IT hardware, ensuring complete compliance with e-waste guidelines, hazardous waste rules, and circular economy protocols.',
      suitableFor: 'Detail-oriented professionals who have an affinity for compliance, procurement, environmental guidelines, asset tracking, and legal logistics.'
    },
    mustHaves: {
      tech: ['E-waste regulation compliance standards (CPCB, Basel Convention)', 'Hardware lifecycle inventory management', 'EPR (Extended Producer Responsibility) logs', 'Vendor tracking and validation'],
      process: ['E-waste audits', 'Circular economy logistics', 'Environmental safety diagnostics']
    },
    cherries: ['IAITAM Certified IT Asset Manager (CITAM)', 'Familiarity with ISO 14001', 'Experience tracking hazardous heavy-metal telemetry'],
    recommendedCertifications: [
      { name: 'CITAM (Certified IT Asset Manager)', level: 'Advanced', status: 'Required', resourceUrl: 'https://iaitam.org/citam/', costEstimate: '$350' },
      { name: 'ISO 14001 Lead Auditor', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.iso.org/standard/60857.html', costEstimate: '$500' }
    ],
    toolsToLearn: ['ServiceNow ITAM Module', 'Flexera', 'Snow Software', 'Asset Panda', 'Device42'],
    interviewTopics: {
      technical: ['Explain Extended Producer Responsibility (EPR) and its legal impact on corporate device disposal.', 'How do you classify and trace certified zero-landfill e-waste handlers?'],
      scenario: ['An enterprise needs to replace 10,000 laptops. How do you construct a circular disposition strategy that maximizes refurbishment and complies with regional e-waste guidelines?', 'A vendor fails to provide e-waste destruction certificates. What are your immediate actions?'],
      hr: ['Why is the circular economy exciting to you in the context of enterprise IT?', 'How do you handle budget conflicts when clean recycling costs more than standard disposal?']
    },
    resumeKeywords: [
      { keyword: 'E-Waste Governance (EPR)', priority: 'High' },
      { keyword: 'Circular Asset Lifecycle', priority: 'High' },
      { keyword: 'ITAM Compliance & Auditing', priority: 'Medium' },
      { keyword: 'Hazardous Waste Regulation (Basel)', priority: 'Medium' }
    ],
    upskillingPath: [
      'Study regional and international e-waste laws, such as CPCB directives and the Basel Convention.',
      'Learn standard IT Asset Management systems (ITAM) and modern inventory databases.',
      'Build circular recycling templates tracking metals from source to certified recycler.',
      'Earn CITAM credentials through the International Association of IT Asset Managers.',
      'Partner with reliable non-profits and sustainable logistics operators to test recycling scenarios.'
    ],
    nextCareerMoves: ['Director of IT Asset Disposition & ESG', 'VP of Sustainable Procurement'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Corporate governance audits for IT e-waste compliance are now required or active in over 65% of large enterprises.'
    },
    nationalInfluence: 'Strong regulatory backed demand globally with high reliance on regional pollution control boards and e-waste registries.',
    companiesHiring: ['Hewlett Packard Enterprise', 'Dell ESG Global', 'Lenovo Sustainability', 'Apple Environment Team', 'Cognizant Asset Management', 'Wipro Environmental Compliance']
  },
  'carbon-analyst-trainee': {
    id: 'carbon-analyst-trainee',
    title: 'ESG Data & Sustainability Analyst',
    domain: 'Green Computing & Sustainable IT',
    level: 'Entry-level',
    isCoding: false,
    isHighPaying: false,
    isRemote: true,
    indiaSalary: '₹4.5L - ₹8.5L',
    globalSalary: '$55,000 - $85,000',
    historyFuture: {
      history: 'Historically, corporate emissions reports were loosely formulated marketing pamphlets with arbitrary metrics, lacking deep data audits, strict spreadsheets, or standardized cloud emissions dashboards.',
      future: 'In the future, the ESG Data Analyst will build automated financial-grade ESG telemetry loops, utilizing automated cloud accounting to report environmental metrics with zero manual error.'
    },
    roleAsk: {
      explanation: 'Compiles, processes, and reports greenhouse gas footprinting, cloud emissions dashboards, and corporate ESG metrics, coordinating closely with IT, operations, and finance teams.',
      suitableFor: 'Young data enthusiasts who love spreadsheets, Power BI, SQL, and want to help organisations build verified compliance dashboards to reduce their digital carbon footprints.'
    },
    mustHaves: {
      tech: ['Excel dashboards & SQL aggregations', 'Carbon accounting metrics (GHG Protocol Scopes 1, 2, and 3)', 'Business Intelligence dashboards (Power BI / Tableau)', 'Data validation and quality controls'],
      process: ['ESG Reporting Frameworks (GRI, SASB, TCFD)', 'Audit-ready documentation workflows']
    },
    cherries: ['Experience with Microsoft Sustainability Manager', 'Python data processing skills', 'Basic corporate finance modeling'],
    recommendedCertifications: [
      { name: 'GRI Professional Certification', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.globalreporting.org/', costEstimate: '$250' },
      { name: 'Sustainability & Climate Risk (SCR)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.garp.org/scr', costEstimate: '$300' }
    ],
    toolsToLearn: ['Microsoft Sustainability Manager', 'Salesforce Net Zero Cloud', 'Excel Advanced', 'Power BI', 'Deepki', 'Diligent ESG'],
    interviewTopics: {
      technical: ['What are Scope 1, Scope 2, and Scope 3 emissions, and which scope is cloud server footprint generally categorized under?', 'Explain how you approach data validation for mismatched energy consumption records.'],
      scenario: ['The cloud vendor reports a 15% increase in carbon footprint, but the developers show constant CPU usage. How do you investigate this discrepancy?', 'A regulatory auditor requests data sources for your latest carbon disclosures. How do you trace them?'],
      hr: ['What interests you most about combining data analytics with sustainability?', 'How do you maintain precision when handling large datasets from disparate departments?']
    },
    resumeKeywords: [
      { keyword: 'GHG Protocol Carbon Accounting', priority: 'High' },
      { keyword: 'ESG Dashboard Analytics', priority: 'High' },
      { keyword: 'Power BI / Excel Reporting', priority: 'Medium' },
      { keyword: 'Scope 3 Data Validation', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master advanced Excel operations, including query editors, pivots, and basic Power BI desktop layouts.',
      'Study different ESG frameworks (TCFD, GRI, SASB) and the GHG Protocol Corporate Standard.',
      'Create carbon accounting spreadsheets modeling hypothetical server farms and cloud regions.',
      'Obtain beginner ESG certifications like the GRI Practitioner training courses.',
      'Apply to ESG consulting firms, corporate carbon accounting teams, or sustainable IT branches.'
    ],
    nextCareerMoves: ['Senior ESG Specialist', 'Director of Sustainability and Reporting'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Climate disclosures have driven a 60% increase in ESG-focused data analyst postings across tech multinationals.'
    },
    nationalInfluence: 'Backed heavily by corporate governance decrees, financial board regulators, and national disclosures.',
    companiesHiring: ['Deloitte Sustainability', 'PwC Climate Change Advisory', 'Infosys ESG Services', 'TCS Eco-Sustain', 'Microsoft Corporate ESG', 'Wipro Sustainability']
  },
  'green-ai-analyst': {
    id: 'green-ai-analyst',
    title: 'Sustainable AI & Green AI Analyst',
    domain: 'Green Computing & Sustainable IT',
    level: 'Mid-level',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹8.5L - ₹19L',
    globalSalary: '$100,000 - $160,050',
    historyFuture: {
      history: 'With the initial rush of GenAI development, machine learning models were optimized purely for validation accuracy or low response latency, completely ignoring the carbon and energy burn of massive GPU clusters.',
      future: 'Future Green AI Analysts will build autonomous reinforcement learning agents that scale and trim model layers based on real-time grid renewable energy trends.'
    },
    roleAsk: {
      explanation: 'Responsible for evaluating, profiling, and reducing the computational carbon footprint of Machine Learning models and GenAI systems during active training and inference cycles, choosing carbon-efficient base architectures and green cloud zones.',
      suitableFor: 'Python developers and ML practitioners who are passionate about neural networks, model optimization, hardware accelerators (GPUs/TPUs), and climate tracking.'
    },
    mustHaves: {
      tech: ['Python & ML Libraries (PyTorch, TensorFlow)', 'Telemetry tools (CodeCarbon, Green Algorithms)', 'Model compression techniques (Quantization, Distillation, Pruning)', 'Cloud GPU emissions telemetry'],
      process: ['Green AI best practices (energy-to-accuracy trade-offs)', 'Region shifting for model training runs']
    },
    cherries: ['Quantizing large-scale LLMs for lightweight local device runs', 'AWS/GCP Machine Learning specialty certificate'],
    recommendedCertifications: [
      { name: 'Green Software Practitioner Certification', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.greensoftware.foundation/', costEstimate: 'Free' },
      { name: 'Google Cloud Professional Machine Learning Engineer', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://cloud.google.com/learn/credentials/professional-machine-learning-engineer', costEstimate: '$200' }
    ],
    toolsToLearn: ['CodeCarbon', 'Green Algorithms Tool', 'Tensorboard Carbon Plugins', 'Scaphandre', 'Hugging Face Optimum', 'Model Quantizers'],
    interviewTopics: {
      technical: ['Explain what CodeCarbon is and how you would integrate it to track GPU energy consumption in PyTorch.', 'What is model quantization and how does it reduce operational carbon intensity during real-time inference?'],
      scenario: ['A team needs to retrain a 7-billion parameter language model. How do you design a carbon-temporal pipeline to schedule training blocks when the grid renewable ratio is optimal?', 'You notice high heat dissipation and energy spikes on training nodes. How do you profile the tensor operations?'],
      hr: ['How do you make the business and environmental case for deploying smaller, pruned models over large API models?', 'Why is Green AI crucial for the next decade of technology growth?']
    },
    resumeKeywords: [
      { keyword: 'Sustainable AI Optimization', priority: 'High' },
      { keyword: 'Model Compression & Quantization', priority: 'High' },
      { keyword: 'GPU Energy Profiling (CodeCarbon)', priority: 'Medium' },
      { keyword: 'Green Machine Learning', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master Python backend programming and key ML frameworks such as PyTorch or Hugging Face.',
      'Implement CodeCarbon inside a standard training loop and log carbon emissions in real-time.',
      'Learn key model compression concepts: pruning, distillation, and quantization (INT8/FP16).',
      'Optimize neural architectures to minimize high-precision floating point operations (FLOPs).',
      'Publish comparison portfolios displaying model score-to-carbon efficiencies.'
    ],
    nextCareerMoves: ['Head of Sustainable AI Systems', 'Principal Green AI Architect'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Due to skyrocketing GenAI server processing, over 50% of advanced AI development teams are actively tracking training footprints.'
    },
    nationalInfluence: 'Rapidly emerging under global deep-tech frameworks, climate-conscious AI startup corridors, and cloud regulatory standards.',
    companiesHiring: ['Google Research', 'Hugging Face', 'Microsoft AI Group', 'Meta Sustainable Labs', 'AWS AI Platform', 'OpenAI Infrastructure']
  },
  'green-it-apprentice': {
    id: 'green-it-apprentice',
    title: 'Green IT Apprentice',
    domain: 'Green Computing & Sustainable IT',
    level: 'Entry-level',
    isCoding: false,
    isHighPaying: false,
    isRemote: true,
    indiaSalary: '₹3.5L - ₹6L',
    globalSalary: '$45,000 - $70,000',
    historyFuture: {
      history: 'Historically, IT apprenticeships focused purely on desktop assembly, printer configurations, and physical network cabling, with zero emphasis on carbon impacts.',
      future: 'The future Green IT Apprentice will specialize in hardware lifecycle energy analysis, circular procurement monitoring, and basic carbon telemetry configurations.'
    },
    roleAsk: {
      explanation: 'Responsible for assisting the sustainable operations team with corporate energy audits, logging e-waste collection metrics, evaluating energy star equipment, and validating server telemetry schedules.',
      suitableFor: 'An exceptional entry point for graduates or climate advocates passionate about clean tech, basic IT operations, and corporate sustainability metrics.'
    },
    mustHaves: {
      tech: ['Basic spreadsheet management (Excel/Sheets)', 'Understanding of energy efficiency indicators (Energy Star)', 'Operating system power settings configuration'],
      process: ['Basic e-waste handling rules', 'Collaborative green workspace standards']
    },
    cherries: ['Familiarity with GSF (Green Software Foundation) basic concepts', 'Basic scripting in Bash/PowerShell'],
    recommendedCertifications: [
      { name: 'Green Software Practitioner (GSF)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.greensoftware.foundation/', costEstimate: 'Free' }
    ],
    toolsToLearn: ['Excel', 'Trello for green project tracking', 'Windows Powercfg', 'Linux Powertop'],
    interviewTopics: {
      technical: ['What are the basic goals of Green IT?', 'How would you adjust Windows power profiles to minimize energy use on a company laptop?'],
      scenario: ['A user leaves their desktop running all night. How would you explain to them the environmental and cost impact of idle power draw?', 'You are assigned to inventory discarded monitors for recycling. How do you catalog them?'],
      hr: ['What inspired you to seek an apprenticeship in Sustainable IT?', 'How do you approach learning new technical tools?']
    },
    resumeKeywords: [
      { keyword: 'Sustainable IT Support', priority: 'High' },
      { keyword: 'Energy Audits & Inventories', priority: 'High' },
      { keyword: 'E-waste Lifecycle Tracking', priority: 'Medium' }
    ],
    upskillingPath: [
      'Complete the Green Software Practitioner (GSF) training course.',
      'Study foundational IT asset management and inventory practices.',
      'Acquire basic scripting skills to log power telemetry automations.'
    ],
    nextCareerMoves: ['Cloud Sustainability & GreenOps Analyst', 'Green Computing Specialist'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Sustainable technology initiatives are increasing apprentice-level postings by 30% annually.'
    },
    nationalInfluence: 'Actively promoted by ESG mandates and educational partnerships.',
    companiesHiring: ['Wipro Sustainable Systems', 'Infosys Green Initiatives', 'Cognizant', 'TCS Eco-Sustain']
  },
  'sustainable-software-developer-intern': {
    id: 'sustainable-software-developer-intern',
    title: 'Sustainable Software Developer Intern',
    domain: 'Green Computing & Sustainable IT',
    level: 'Entry-level',
    isCoding: true,
    isHighPaying: false,
    isRemote: true,
    indiaSalary: '₹4L - ₹8L',
    globalSalary: '$50,000 - $80,000',
    historyFuture: {
      history: 'Historically, software interns built simple web and mobile utilities without any consideration for the computing resources consumed, electric grid carbon weights, or deployment compiler footprints.',
      future: 'Future Sustainable Dev Interns will learn to build energy-conscious API endpoints, implement lightweight database queries, and measure container power footprints.'
    },
    roleAsk: {
      explanation: 'Assists backend teams in profiling database queries, implementing local caching layers, refactoring heavy loops for high algorithmic efficiency, and integrating carbon-aware SDK hooks.',
      suitableFor: 'Junior developers or computer science students with a deep interest in software performance, backend algorithms, and eco-friendly programming standards.'
    },
    mustHaves: {
      tech: ['Basic JavaScript/TypeScript or Python', 'Understanding of Big-O complexity', 'Relational database basics (SQL)'],
      process: ['Agile team workflows', 'Understanding of Green Software principles']
    },
    cherries: ['Experience with Docker and lightweight base images', 'Familiarity with open-source carbon APIs'],
    recommendedCertifications: [
      { name: 'Green Software Practitioner (GSF)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.greensoftware.foundation/', costEstimate: 'Free' }
    ],
    toolsToLearn: ['Git', 'Docker', 'Carbon Aware SDK', 'VS Code energy tools'],
    interviewTopics: {
      technical: ['How does reducing computational complexity in a function translate to lower carbon emissions?', 'Explain the basic concept of caching and how it reduces server load.'],
      scenario: ['You are asked to optimize a loop that fetches redundant data from an API. What approaches do you take?', 'You need to set up a docker image for development. How do you ensure it is lightweight?'],
      hr: ['Why do you want to build carbon-efficient software instead of just standard features?', 'Tell us about a coding project you are proud of.']
    },
    resumeKeywords: [
      { keyword: 'Energy-Efficient Coding', priority: 'High' },
      { keyword: 'Algorithmic Optimization', priority: 'High' },
      { keyword: 'API Performance Tuning', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master data structures and backend API performance.',
      'Integrate CodeCarbon or Green Algorithms tool in a private project.',
      'Deploy carbon-aware trigger events in personal microservices.'
    ],
    nextCareerMoves: ['Carbon-Aware Software Engineer', 'Green Computing Specialist'],
    marketDemandSignal: {
      index: 'Growing Demand',
      percentStat: 'Tech firms are establishing carbon-efficiency KPI targets for engineering team outputs.'
    },
    nationalInfluence: 'Backed by major software exporters committing to digital carbon-efficiency goals.',
    companiesHiring: ['Thoughtworks Green Lab', 'Intel Sustainable Software', 'Red Hat ESG Group', 'Capgemini Green IT']
  },
  'senior-sustainable-systems-engineer': {
    id: 'senior-sustainable-systems-engineer',
    title: 'Senior Sustainable Systems Engineer',
    domain: 'Green Computing & Sustainable IT',
    level: 'Advanced',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹15L - ₹32L',
    globalSalary: '$130,000 - $210,000',
    historyFuture: {
      history: 'Historically, system engineers scaled computing fleets horizontally to absorb traffic spikes without measuring the dynamic grid carbon weights, leading to underutilized, high-emission cloud clusters.',
      future: 'Future Senior Sustainable Systems Engineers will design automated server scaling policies that dynamically shift container workloads to grids running on renewable solar/wind power.'
    },
    roleAsk: {
      explanation: 'Architects and maintains low-carbon container orchestration pools, automates microservice scaling based on energy indicators, manages hardware telemetry integrations, and establishes system-wide energy metrics.',
      suitableFor: 'Experienced systems developers, DevOps practitioners, or cloud engineers wanting to champion automated sustainability at scale.'
    },
    mustHaves: {
      tech: ['Advanced Kubernetes & Docker configuration', 'Infrastructure as Code (Terraform, Ansible)', 'System monitoring (Prometheus, Grafana, Kepler)', 'Python or Go system scripting'],
      process: ['FinOps cost-carbon frameworks', 'Enterprise high-availability architecture standards']
    },
    cherries: ['Experience using Kepler (Kubernetes Efficient Power Level Exporter)', 'Linux kernel tuning for power conservation'],
    recommendedCertifications: [
      { name: 'FinOps Certified Practitioner', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.finops.org/certification/', costEstimate: '$300' },
      { name: 'Certified Kubernetes Administrator (CKA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/', costEstimate: '$395' }
    ],
    toolsToLearn: ['Kepler', 'Prometheus', 'Grafana', 'Kubecost', 'KEDA (Kubernetes Event-driven Autoscaling)'],
    interviewTopics: {
      technical: ['Explain how you would deploy Kepler to track power draw per pod in a Kubernetes cluster.', 'How does spatial shifting differ from temporal shifting in distributed cloud computing?'],
      scenario: ['A large database migration is scheduled. How do you design an automation script to route the replication workloads only to regions with the lowest carbon index at that hour?', 'Your cloud provider reports a massive carbon spike on standby nodes. How do you optimize cluster consolidation?'],
      hr: ['How do you negotiate with product teams who argue that green operations will compromise application latency?', 'Why is automated systems engineering key to solving the cloud carbon challenge?']
    },
    resumeKeywords: [
      { keyword: 'Cloud GreenOps Orchestration', priority: 'High' },
      { keyword: 'Kepler Power Telemetry', priority: 'High' },
      { keyword: 'Infrastructure as Code (Terraform)', priority: 'Medium' },
      { keyword: 'Carbon-Spatial Workload Routing', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master Kubernetes autoscaling based on custom telemetry metrics.',
      'Deploy Kepler inside cloud clusters and design power-usage dashboards.',
      'Draft enterprise cloud sustainability guidelines and operational checklists.'
    ],
    nextCareerMoves: ['Director of Green Cloud Operations', 'Principal Green Software Architect'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Over 60% of modern multi-cloud enterprises actively include sustainability clauses in cloud architecture reviews.'
    },
    nationalInfluence: 'Driven by severe carbon accounting compliance rules and international cloud metrics alignment.',
    companiesHiring: ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure', 'Deloitte Digital']
  },
  'director-of-sustainable-technology': {
    id: 'director-of-sustainable-technology',
    title: 'Director of Sustainable Technology',
    domain: 'Green Computing & Sustainable IT',
    level: 'Advanced',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹25L - ₹55L',
    globalSalary: '$160,000 - $260,000',
    historyFuture: {
      history: 'Historically, technology directors prioritized capital expenditures, throughput speed, and team scalability while treating the environmental costs of massive compute instances as an invisible externality.',
      future: 'Future Directors of Sustainable Tech will govern the combined technology strategy, aligning IT architecture directly with global greenhouse gas disclosures and digital carbon neutral targets.'
    },
    roleAsk: {
      explanation: 'Defines the strategic roadmap for green IT, leads sustainable cloud migration plans, manages relationships with green utility networks, and oversees enterprise IT hardware procurement and recycling systems.',
      suitableFor: 'Technical managers or senior architects with strong leadership skills, corporate finance literacy, and a passion for leading high-level climate transitions.'
    },
    mustHaves: {
      tech: ['Enterprise architecture planning (TOGAF)', 'FinOps cost-carbon reporting tools', 'GHG Protocol Scope 1-3 reporting standards'],
      process: ['Vendor negotiations and SLA oversight', 'IT budget governance and business finance']
    },
    cherries: ['Executive MBA or master\'s in Sustainable Development', 'Experience leading cross-continental digital migrations'],
    recommendedCertifications: [
      { name: 'SCR (Sustainability & Climate Risk)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.garp.org/scr', costEstimate: '$300' },
      { name: 'TOGAF Enterprise Architecture', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.opengroup.org/certifications/togaf', costEstimate: '$550' }
    ],
    toolsToLearn: ['Jira Portfolio', 'Power BI ESG Templates', 'AWS Customer Carbon Footprint', 'Salesforce Net Zero Cloud'],
    interviewTopics: {
      technical: ['How do you incorporate digital Scope 3 greenhouse gas emissions into corporate procurement contracts?', 'Explain the financial and carbon ROI trade-offs of migrating from a legacy on-premise data center to a carbon-aware cloud infrastructure.'],
      scenario: ['The board mandates a 25% reduction in digital footprint within 18 months. How do you design and prioritize the technical roadmap across development, cloud, and hardware teams?', 'A vendor offers low cost but has no verified e-waste disposal auditing. How do you handle this?'],
      hr: ['How do you manage cultural pushback from engineering divisions who feel green metrics are unnecessary red tape?', 'What is your vision for carbon-neutral enterprise IT operations?']
    },
    resumeKeywords: [
      { keyword: 'Sustainable IT Roadmap', priority: 'High' },
      { keyword: 'Scope 1-3 GHG Strategy', priority: 'High' },
      { keyword: 'Enterprise Architecture (TOGAF)', priority: 'Medium' },
      { keyword: 'Vendor Carbon Procurement', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master the GHG reporting protocol requirements for digital services and platforms.',
      'Coordinate cross-departmental pilot projects using cloud emissions telemetry.',
      'Align technology metrics directly with board-level ESG goals and reports.'
    ],
    nextCareerMoves: ['Chief Sustainability Officer', 'VP of Sustainable Procurement'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Enterprise regulatory reporting rules (like Europe\'s CSRD) have doubled director-level roles in technology sustainability.'
    },
    nationalInfluence: 'Strong international policy support with direct impact on executive ESG governance frameworks.',
    companiesHiring: ['Google Cloud Infrastructure', 'Microsoft Sustainable Technology', 'Wipro ESG', 'Infosys Sustainability', 'Accenture ESG']
  },
  'chief-sustainability-officer': {
    id: 'chief-sustainability-officer',
    title: 'Chief Sustainability Officer',
    domain: 'Green Computing & Sustainable IT',
    level: 'Advanced',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹40L - ₹90L',
    globalSalary: '$220,000 - $380,000',
    historyFuture: {
      history: 'Historically, sustainability officers were limited to marketing or building facility insulation oversight, completely detached from the massive energy footprint of tech-driven data centers and global software operations.',
      future: 'The modern Chief Sustainability Officer directs the full-spectrum corporate climate response, integrating green data centers, carbon-aware cloud scaling, and circular supply chains as core board-level financial objectives.'
    },
    roleAsk: {
      explanation: 'Sets the corporate carbon-neutral roadmap, directs board-level ESG reporting, establishes carbon pricing budgets across product teams, and ensures global environmental compliance across all computing footprints.',
      suitableFor: 'Visionary leaders, executive architects, or ESG strategists looking to define global sustainability benchmarks for technology giants.'
    },
    mustHaves: {
      tech: ['Corporate ESG reporting guidelines (GRI, TCFD, CSRD)', 'Global carbon accounting frameworks', 'Cloud data center sustainability metrics'],
      process: ['Board-level corporate communications', 'Regulatory risk management', 'Global procurement compliance']
    },
    cherries: ['PhD in Environmental Economics or relevant Engineering fields', 'Keynote experience at global climate forums'],
    recommendedCertifications: [
      { name: 'SCR (Sustainability & Climate Risk)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.garp.org/scr', costEstimate: '$300' }
    ],
    toolsToLearn: ['Salesforce Net Zero Cloud', 'Diligent ESG', 'Sustainalytics ESG Dashboard', 'Microsoft Sustainability Manager'],
    interviewTopics: {
      technical: ['How do you design a carbon offset strategy that withstands scientific scrutiny and aligns with global standards?', 'Explain how digital systems can be leveraged to optimize physical supply-chain emissions.'],
      scenario: ['Investors demand a concrete path to net-zero carbon operations, but energy costs in your main server hubs are rising. How do you design and pitch the solution?', 'A new climate regulation is introduced in a key operational region. How do you audit and shift corporate compliance strategies?'],
      hr: ['How do you communicate complex, multi-year sustainability milestones to a board of directors focused primarily on quarterly profit margins?', 'What does true ecological stewardship mean to you in the digital age?']
    },
    resumeKeywords: [
      { keyword: 'Corporate ESG Leadership', priority: 'High' },
      { keyword: 'Net-Zero Roadmap Strategy', priority: 'High' },
      { keyword: 'Global Carbon Audits', priority: 'Medium' },
      { keyword: 'Regulatory Risk & Compliance', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master global sustainability laws and climate disclosure frameworks.',
      'Direct multi-departmental corporate carbon-accounting auditing campaigns.',
      'Represent corporate ESG strategy at international industry and environment forums.'
    ],
    nextCareerMoves: ['Board Member / Director', 'Global ESG Trust Partner'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Boardroom-level climate oversight is now mandated in 80% of major exchange-listed technology enterprises.'
    },
    nationalInfluence: 'High executive impact driven by ESG compliance laws and global institutional investor focus.',
    companiesHiring: ['Hewlett Packard Enterprise', 'Dell ESG Global', 'Lenovo Sustainability', 'Apple Environment Team', 'Google Research']
  },
  'it-support-analyst': {
    id: 'it-support-analyst',
    title: 'IT Support Analyst',
    domain: 'IT Support & Service Desk',
    level: 'Entry-level',
    isCoding: false,
    isHighPaying: false,
    isRemote: true,
    indiaSalary: '₹3.5L - ₹6.5L',
    globalSalary: '$48,000 - $72,000',
    historyFuture: {
      history: 'Historically, the IT Support Analyst was a physical workbench position dealing with hardware cables, bulky CRT monitors, and floppy disk configurations within a localized office space.',
      future: 'The future IT Support Analyst will operate closely with automated self-healing devices, managing remote software deployments, zero-trust cloud endpoints, and AI-driven internal troubleshooting tools.'
    },
    roleAsk: {
      explanation: 'Responsible for solving tier-1 and tier-2 technical queries from employees, installing configuration software, maintaining workstations, and managing access tokens.',
      suitableFor: 'Perfect for great communicators, empathetic listeners, and hands-on trouble-shooters who love technology but do not want active math or coding logic.'
    },
    mustHaves: {
      tech: ['Windows 10/11 troubleshooting', 'Basic IP configuration', 'Active Directory (AD)', 'Outlook & Exchange setups', 'M365 Admin Center'],
      process: ['Excellent customer service', 'SLA urgency awareness', 'Ticketing lifecycle handling (Jira/ServiceNow)']
    },
    cherries: ['PowerShell automation basics', 'Basic understanding of subnets', 'Mac OS enterprise deployment experience'],
    recommendedCertifications: [
      { name: 'Google IT Support Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://grow.google/certificates/it-support/', costEstimate: 'Free/Subscription' },
      { name: 'CompTIA A+', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en-us/certifications/a/', costEstimate: '$246' },
      { name: 'ITIL 4 Foundation', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$380' }
    ],
    toolsToLearn: ['ServiceNow', 'Active Directory', 'Zendesk', 'SCCM', 'TeamViewer', 'Microsoft Intune'],
    interviewTopics: {
      technical: ['How do you troubleshoot a computer which cannot obtain an IP address?', 'Explain the difference between Outlook Cached Mode and Online Mode.', 'What is the role of DHCP in an enterprise environment?'],
      scenario: ['An angry executive calls because their printer is not working 5 minutes before a key presentation. How do you respond?', 'The ticketing queue has 20 items. How do you distinguish high priority from low priority tickets?'],
      hr: ['Why did you choose a career in IT Support?', 'How do you handle repetitive questions from users who are not tech-savvy?']
    },
    resumeKeywords: [
      { keyword: 'Active Directory Admin', priority: 'High' },
      { keyword: 'M365 Cloud Admin', priority: 'High' },
      { keyword: 'Incident Management', priority: 'Medium' },
      { keyword: 'SLA Compliance & Ticketing', priority: 'Medium' }
    ],
    upskillingPath: [
      'Learn standard troubleshooting concepts of CPU, storage and network configurations.',
      'Adopt ticketing tool protocols (Active Directory, Jira Service Management, ServiceNow).',
      'Acquire beginner certifications like the Google IT Support Certificate and CompTIA A+ to validate skills.',
      'Construct a portfolio documenting mock troubleshooting write-ups or active terminal lab projects.',
      'Practice scenario-based interviews on communication skills and SLA management.'
    ],
    nextCareerMoves: ['Network Administrator', 'Cloud Support Associate', 'SysAdmin'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Active Directory appears in 68% of recent IT Support Analyst job posts.'
    },
    nationalInfluence: 'Extremely high demand in IT Hubs (Bangalore, Hyderabad, Pune, Gurgaon) and major multinational call-centers globally.',
    companiesHiring: ['Wipro', 'Infosys', 'Cognizants', 'Amazon Web Services', 'Accenture', 'Capgemini']
  },
  'desktop-support-engineer': {
    id: 'desktop-support-engineer',
    title: 'Desktop Support Engineer',
    domain: 'IT Support & Service Desk',
    level: 'Entry-level',
    isCoding: false,
    isHighPaying: false,
    isRemote: false,
    indiaSalary: '₹3L - ₹5.5L',
    globalSalary: '$45,000 - $65,000',
    historyFuture: {
      history: 'Before laptops dominated, desktop support teams assembled clone PCs, managed CRT monitor arrays, and ran local patch panels under corporate decks.',
      future: 'In the future, desktop support focuses heavily on hybrid conference setups, secure thin-clients, secure biometric key integrations, and smart hardware supply chains.'
    },
    roleAsk: {
      explanation: 'In-office or on-site desktop and equipment troubleshooting, including peripheral setups, OS deployments, and physical network testing.',
      suitableFor: 'Individuals who prefer physical interaction with computer components, asset tracking, and personal coordination with team members.'
    },
    mustHaves: {
      tech: ['Hardware diagnostics', 'Operating system imaging (PXE, SCCM)', 'Network cabling & port patching', 'Bios/UEFI configurations'],
      process: ['Inventory tracking', 'Physical workspace setups', 'Asset disposal safety compliance']
    },
    cherries: ['VoIP desk phone knowledge', 'Experience with barcode inventory tools', 'Smart TV and AV setups'],
    recommendedCertifications: [
      { name: 'CompTIA A+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en-us/certifications/a/', costEstimate: '$246' },
      { name: 'Microsoft 365 Certified: Endpoint Administrator Associate', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/en-us/credentials/browse/', costEstimate: '$165' }
    ],
    toolsToLearn: ['Acronis Cyber Backup', 'SCCM', 'Microsoft Intune', 'Symantec Ghost', 'Smart Deploy'],
    interviewTopics: {
      technical: ['How do you debug a computer that gives a "No Boot Device Found" error?', 'How would you replace RAM safely without generating static electricity?', 'ExplainPXE boot.'],
      scenario: ['A user accidentally spilled coffee on their laptop. What are your immediate actions?', 'How would you organize a bulk rollout of 50 new employee systems over a single weekend?'],
      hr: ['Tell us about a time you had to fix a complex physical problem under a deadline.', 'Do you prefer physical hardware troubleshooting or remote configuration setups?']
    },
    resumeKeywords: [
      { keyword: 'OS Provisioning & PXE', priority: 'High' },
      { keyword: 'Hardware Diagnostic Tools', priority: 'High' },
      { keyword: 'Endpoint Management (Intune)', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master key hardware interfaces (SATA, PCIe, M.2, RAM types, local BIOS setup).',
      'Learn enterprise OS deployment tools (SCCM, PXE build networks, USB recovery packages).',
      'Earn CompTIA A+ certification to secure interviews.',
      'Practice asset logs and inventory workflows.',
      'Apply to on-site service companies or internal corporate IT teams.'
    ],
    nextCareerMoves: ['Systems Operations Analyst', 'IT Operations Lead'],
    marketDemandSignal: {
      index: 'Medium Demand',
      percentStat: 'Hardware diagnostic protocols and image installations constitute 54% of this job market.'
    },
    nationalInfluence: 'High presence in large localized corporate offices, logistics centers, banks, and production facilities.',
    companiesHiring: ['Dell Technologies', 'HP Enterprise', 'TCS', 'HCLTech', 'IBM']
  },
  'network-engineer': {
    id: 'network-engineer',
    title: 'Network Engineer',
    domain: 'Networking',
    level: 'Mid-level',
    isCoding: false,
    isHighPaying: true,
    isRemote: false,
    indiaSalary: '₹6L - ₹14L',
    globalSalary: '$80,000 - $120,000',
    historyFuture: {
      history: 'Historically, the network engineer was a wizard of physical serial cables, massive patch cabinets, physical Cisco router configs, and terminal interfaces with serial links.',
      future: 'The future of networking is software-defined (SDN), using programming loops (Python, Ansible) to deploy, modify, and terminate complex cloud network rules on-demand.'
    },
    roleAsk: {
      explanation: 'Designs, configures, and monitors the network infrastructure (routers, switches, firewalls, load balancers) of an enterprise to ensure maximum security, uptime, and efficiency.',
      suitableFor: 'Logical thinkers who enjoy system-level math, binary operations, subnetting, structured organization, and high-consequence networking protocols.'
    },
    mustHaves: {
      tech: ['OSI Model & TCP/IP protocols', 'IP Routing (OSPF, BGP, EIGRP)', 'VLANs and Spanning Tree Protocol (STP)', 'Firewall rules & ACLs', 'Subnetting logic'],
      process: ['Disaster recovery', 'Detailed network mapping/architectural drawings', 'Change control mechanisms']
    },
    cherries: ['Python network automation (Netmiko/Napalm)', 'Ansible automation scripting', 'AWS/Azure Cloud network designs'],
    recommendedCertifications: [
      { name: 'Cisco CCNA (200-301)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html', costEstimate: '$300' },
      { name: 'Cisco CCNP Enterprise', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html', costEstimate: '$700' },
      { name: 'CompTIA Network+', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.comptia.org/en-us/certifications/network/', costEstimate: '$358' }
    ],
    toolsToLearn: ['Cisco IOS', 'Wireshark', 'Putty / SecureCRT', 'SolarWinds', 'Cisco Packet Tracer', 'GNS3'],
    interviewTopics: {
      technical: ['Explain how a router routes a packet and how it differs from a switch.', 'What is the purpose of STP, and what happens if it fails?', 'Explain the handshake sequence of TCP and how UDP differs (with real-world scenarios).'],
      scenario: ['The office is reporting that Internet access is extremely slow. How do you narrow down if it is a DNS issue, loop, congestion, or ISP latency?', 'Describe how you would plan a VLAN configuration for a new office department of 200 users.'],
      hr: ['Do you feel comfortable handling critical network cutovers in the middle of the night?', 'How do you keep abreast of rapidly growing cloud network changes?']
    },
    resumeKeywords: [
      { keyword: 'Cisco CCNA Certified Routing/Switching', priority: 'High' },
      { keyword: 'Subnetting & VLAN design', priority: 'High' },
      { keyword: 'Packet Capture & Wireshark Diagnosis', priority: 'Medium' },
      { keyword: 'BGP / OSPF Dynamic Routing', priority: 'High' }
    ],
    upskillingPath: [
      'Learn concepts of IP routing, OSI models, and subnetting calculations.',
      'Install Cisco Packet Tracer or GNS3 and configure dual routers to share tables.',
      'Study for and complete Cisco CCNA (200-301) examination.',
      'Master diagnostic tools (Wireshark packet filters, ping/traceroute parameters).',
      'Learn basic network automation with Python script modules.'
    ],
    nextCareerMoves: ['Network Architect', 'Cloud Infrastructure Engineer', 'SecOps Specialist'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Cisco CCNA or equivalent is requested in 74% of enterprise network postings.'
    },
    nationalInfluence: 'Consistently high demand in aerospace, banking, defense, telecom support centers, and global networking services.',
    companiesHiring: ['Cisco Systems', 'Juniper Networks', 'AT&T', 'Airtel', 'Jio', 'Tata Communications', 'Orange Business Services']
  },
  'cloud-support-associate': {
    id: 'cloud-support-associate',
    title: 'Cloud Support Associate',
    domain: 'Cloud Computing',
    level: 'Entry-level',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹5L - ₹9L',
    globalSalary: '$65,000 - $95,000',
    historyFuture: {
      history: 'Derived from traditional VM administrators and server engineers in the early 2010s during the rise of AWS EC2 and initial cloud migrations.',
      future: 'In the future, cloud support associates will handle Serverless architectures, Edge setups, server components on Kubernetes clusters, and AI API pricing endpoints.'
    },
    roleAsk: {
      explanation: 'Traces and resolves client-facing cloud application issues, database connections, VM scaling failures, and server configurations on AWS, Azure, or Google Cloud.',
      suitableFor: 'IT Support team members looking to level up their salaries, learn virtualization, and step away from physical desks and local hardware.'
    },
    mustHaves: {
      tech: ['Linux terminal and basic bash scripts', 'AWS/Azure Core Architecture', 'IAM Roles & security boundaries', 'DNS & VPC networking', 'SSL/TLS setups'],
      process: ['Detailed cloud resource optimization (cost metrics)', 'Troubleshooting latency logs']
    },
    cherries: ['Terraform configuration basics', 'Python SDK scripts (boto3)', 'Docker image configurations'],
    recommendedCertifications: [
      { name: 'AWS Certified Cloud Practitioner', level: 'Beginner', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', costEstimate: '$100' },
      { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/', costEstimate: '$99' },
      { name: 'AWS Certified SysOps Administrator', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-sysops-admin-associate/', costEstimate: '$150' }
    ],
    toolsToLearn: ['AWS Resource Console', 'Azure Portal', 'Putty/SSH Client', 'CloudWatch', 'AWS CLI', 'Linux Bash'],
    interviewTopics: {
      technical: ['Explain the difference between a Public and Private subnet in an AWS VPC.', 'How do you SSH into a remote Linux server securely?', 'Explain how DNS routing works in AWS Route 53 or Azure DNS.'],
      scenario: ['A user claims they cannot access their database EC2 file server. Walk me through your debugging steps.', 'An AWS account is billing 3 times more than expected due to an orphan resource. How do you locate the issue?'],
      hr: ['What motivates you to work in cloud virtualization?', 'How do you handle explaining complex cloud billing schemas to a client?']
    },
    resumeKeywords: [
      { keyword: 'AWS/Azure Cloud Practitioner', priority: 'High' },
      { keyword: 'VPC and Security Groups Config', priority: 'High' },
      { keyword: 'Linux Systems Administration', priority: 'Medium' },
      { keyword: 'IAM Policy & Resource Monitoring', priority: 'High' }
    ],
    upskillingPath: [
      'Learn basic Linux command lines (navigation, file reading, ssh, tailing logs).',
      'Pick a cloud (AWS or Azure) and earn the practitioner/fundamentals exam (AZ-900 or AWS CCP).',
      'Build a simple portfolio project: Host a web page on a cloud VM, route custom domain, secure with free SSL.',
      'Understand core IAM concepts (users, roles, temporary access keys).',
      'Study logs using monitoring tools like CloudWatch.'
    ],
    nextCareerMoves: ['Cloud Engineer', 'DevOps Engineer', 'SRE'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'AWS CCP or Microsoft AZ-900 certification appeared in 62% of associate cloud posts.'
    },
    nationalInfluence: 'Immense global growth, remote-friendly, extremely high entry-points in high-tech zones.',
    companiesHiring: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Capgemini', 'IBM Consulting', 'Deloitte']
  },
  'cybersecurity-analyst': {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    domain: 'Cybersecurity',
    level: 'Entry-level',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹5.5L - ₹11L',
    globalSalary: '$75,000 - $110,000',
    historyFuture: {
      history: 'Evolved from general IT firewall managers and auditing clerks, turning into specialized defensive monitors as hacking groups became global enterprises.',
      future: 'Future cybersecurity analysts will focus on automated AI threats, cryptographical compliance, quantum encryption signatures, and automated threat triage models.'
    },
    roleAsk: {
      explanation: 'Monitors alerts, analyzes system access, audits firewall rules, identifies vulnerability gaps, and deploys corporate security protocols to thwart threat actors.',
      suitableFor: 'Meticulous, skeptical minds who enjoy digital forensics, security auditing, scanning patterns, and maintaining high integrity under pressure.'
    },
    mustHaves: {
      tech: ['Security logs parsing', 'TCP/IP diagnostics', 'Vulnerability scanning tools', 'SIEM platform operations', 'Linux system configurations'],
      process: ['Incident responses templates', 'Risk assessments standard protocols (NIST, ISO27001)', 'General auditing']
    },
    cherries: ['Penetration testing with Kali Linux', 'Python scripting for threat logs parsing', 'Splunk certification'],
    recommendedCertifications: [
      { name: 'Google Cybersecurity Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://grow.google/certificates/cybersecurity/', costEstimate: 'Free/Subscription' },
      { name: 'CompTIA Security+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en-us/certifications/security/', costEstimate: '$370' },
      { name: 'Certified Information Systems Security Professional (CISSP)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.isc2.org/certifications/cissp', costEstimate: '$749' }
    ],
    toolsToLearn: ['Splunk', 'Wireshark', 'Kali Linux', 'Nmap', 'Burp Suite', 'CrowdStrike', 'Nessus'],
    interviewTopics: {
      technical: ['What is the difference between asymmetric and symmetric encryption?', 'Explain what a Man-in-the-Middle (MitM) attack is and how to prevent it on enterprise Wi-Fi.', 'How would you differentiate a false positive scanning alert from a genuine brute-force attack?'],
      scenario: ['You notice multiple failed SSH logins on an enterprise server within 10 seconds. What are your immediate containment steps?', 'A user reports receiving a phishing email that they also opened. How do you respond?'],
      hr: ['How do you stay calm and maintain focus during a catastrophic security breach event?', 'How do you handle users who complain that MFA and authentication policies slow down their daily workflow?']
    },
    resumeKeywords: [
      { keyword: 'SIEM Incident Monitoring (Splunk)', priority: 'High' },
      { keyword: 'CompTIA Security+ Certified', priority: 'High' },
      { keyword: 'NIST Security Framework Audit', priority: 'High' },
      { keyword: 'Vulnerability Scanning & Nessus', priority: 'Medium' }
    ],
    upskillingPath: [
      'Learn core networking concepts (how IP addresses, subnets, and ports operate).',
      'Configure virtualization software on your PC and run security labs with Kali Linux.',
      'Learn SIEM tool logs using Splunk active training portfolios or Google Certificate laboratories.',
      'Achieve CompTIA Security+ certification to validate defensive operations security knowledge.',
      'Understand corporate compliance protocols like SOC2 and ISO27001.'
    ],
    nextCareerMoves: ['SecOps Lead', 'Penetration Tester', 'GRC Specialist'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'CompTIA Security+ or Google Cybersecurity is cited in 70% of junior SOC postings.'
    },
    nationalInfluence: 'Critical across banking, defense, e-commerce, cloud vendors, and global consultancies.',
    companiesHiring: ['CrowdStrike', 'Palo Alto Networks', 'Prudential Inc.', 'EY', 'KPMG', 'Standard Chartered']
  },
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    domain: 'Data & Analytics',
    level: 'Entry-level',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹4.5L - ₹9.5L',
    globalSalary: '$60,000 - $90,000',
    historyFuture: {
      history: 'Evolved from accountants database spreadsheets coordinators and static corporate report compilers using Excel sheets.',
      future: 'The future Data Analyst uses AI-assisted SQL query systems, live stream visualization dashboards, and predictive models.'
    },
    roleAsk: {
      explanation: 'Organizes corporate structured data databases, writes advanced queries to filter and clean datasets, and prepares interactive reports to influence executives and product choices.',
      suitableFor: 'Analytical minds with a strong taste for storytelling through charts, clean databases, statistics, and business strategy.'
    },
    mustHaves: {
      tech: ['SQL relational queries (Joins, CTEs, Window functions)', 'Advanced Excel commands', 'BI Visualization tools (Power BI, Tableau)', 'Python data operations basic (Pandas, Numpy)'],
      process: ['Data cleaning workflows', 'Storytelling presentation with data metrics', 'KPI formulation']
    },
    cherries: ['R programming skills', 'Statistic modules training', 'BigQuery / Snowflake warehouse experience'],
    recommendedCertifications: [
      { name: 'Google Data Analytics Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.coursera.org/professional-certificates/google-data-analytics', costEstimate: 'Free/Subscription' },
      { name: 'Microsoft Power BI Data Analyst (PL-300)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/', costEstimate: '$165' }
    ],
    toolsToLearn: ['MySQL', 'PostgreSQL', 'Power BI', 'Tableau', 'Excel', 'Google BigQuery', 'Python Jupyter Notebooks'],
    interviewTopics: {
      technical: ['Explain the practical difference between standard INNER JOIN, LEFT JOIN, and outer Joins in SQL.', 'What are partition Window Functions in SQL query processes?', 'How do you handle missing or NULL values in a dataset before visualization?'],
      scenario: ['A stakeholder wants to see a daily sales breakdown, but the transaction database updates weekly. How do you manage this constraint?', 'A chart shows a sudden inexplicable 40% spike in conversions. What are your testing steps to rule out instrumentation errors?'],
      hr: ['How do you explain statistical trends or data findings to a business stakeholder who has no technical background?', 'What is your favorite chart style, and why is simplicity key?']
    },
    resumeKeywords: [
      { keyword: 'Advanced SQL Query (Window & Joins)', priority: 'High' },
      { keyword: 'Interactive Dashboard (Power BI / Tableau)', priority: 'High' },
      { keyword: 'Pandas & Jupyter Data Wrangling', priority: 'Medium' },
      { keyword: 'Excel Pivots & Cleaning Techniques', priority: 'Medium' }
    ],
    upskillingPath: [
      'Master SQL queries through free platforms like LeetCode SQL challenges.',
      'Learn a data visualization tool like Power BI or Tableau to convert datasets into dashboards.',
      'Complete the Google Data Analytics Certificate.',
      'Create 3 public data analysis projects using Kaggle datasets and upload to GitHub/Portfolio.',
      'Practice data storytelling - presenting insights in short executive-style summaries.'
    ],
    nextCareerMoves: ['Data Scientist', 'Business Intelligence Engineer', 'Data Engineer'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'SQL queries and dashboard development are mentioned in 82% of data analytics openings.'
    },
    nationalInfluence: 'Extremely high demand in e-commerce, advertising agencies, finance systems, product growth teams.',
    companiesHiring: ['Amazon', 'Flipkart', 'Mu Sigma', 'Fractal Analytics', 'Accenture', 'TCS']
  },
  'frontend-developer': {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    domain: 'Software Development',
    level: 'Entry-level',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹4.5L - ₹11L',
    globalSalary: '$65,000 - $115,000',
    historyFuture: {
      history: 'Historically, frontend development started as basic HTML hacking, tables for design structures, and static text documents connected by blue hyper-links.',
      future: 'The future Frontend Developer designs responsive, component-driven, AI-integrated edge interfaces, running low-latency server-side components.'
    },
    roleAsk: {
      explanation: 'Designs and builds user interfaces, client-side web application logic, navigation routers, state containers, styles, and smooth screen-interaction elements.',
      suitableFor: 'Visual artists, creative layout creators, and problem solvers who enjoy direct sensory feedback of code in action.'
    },
    mustHaves: {
      tech: ['Modern JS (ES6+), HTML, CSS', 'React 18+, Vue, or Angular framework', 'Tailwind CSS / Responsive Design', 'Git Version Control basics', 'REST API consumption mechanisms'],
      process: ['Agile sprint development', 'Perfect pixel alignment to Figma templates']
    },
    cherries: ['TypeScript development training', 'Vite / Webpack modular configurations', 'Web accessibility audits'],
    recommendedCertifications: [
      { name: 'Meta Front-End Developer Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', costEstimate: 'Free/Subscription' }
    ],
    toolsToLearn: ['VS Code', 'GitHub', 'Figma', 'Chrome DevTools', 'Vercel / Netlify', 'Tailwind CSS'],
    interviewTopics: {
      technical: ['Explain React hook dependencies and how to prevent infinite render loops.', 'What is the DOM stack, and how does the browser paint a page under CSS changes?', 'What is the purpose of Git branches, and how do you resolve simple conflicts?'],
      scenario: ['A user claims a component is rendering blank on older iPhone browsers. How do you research and address this legacy issue?', 'The bundle size is causing a 4-second loading delay on basic mobile devices. What are your steps to improve this?'],
      hr: ['How do you manage changes where Figma visual designs conflict with technical UI capabilities?', 'Do you prefer CSS styled layouts or component framework toolkits?']
    },
    resumeKeywords: [
      { keyword: 'React Single Page App (SPA)', priority: 'High' },
      { keyword: 'Responsive UI Design (Tailwind)', priority: 'High' },
      { keyword: 'Git Versioning & GitHub Pulls', priority: 'Medium' },
      { keyword: 'REST API & JSON Consumption', priority: 'High' }
    ],
    upskillingPath: [
      'Master fundamental HTML layout and modern CSS styling values (Flexbox/Grid).',
      'Learn JavaScript dynamic loops, API integration concepts, and fetch.',
      'Master a frontend framework, preferably React, paired with Tailwind CSS.',
      'Develop at least 3 custom front-end applications matching Figma designs.',
      'Learn simple deploying protocols on Vercel or Netlify.'
    ],
    nextCareerMoves: ['Full Stack Developer', 'UI/UX Lead Engineer', 'Frontend Architect'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'React and responsive workflows are cited in 76% of junior frontend positions.'
    },
    nationalInfluence: 'Extremely popular across fast-growing startup environments and modern global IT tech vendors.',
    companiesHiring: ['Paytm', 'Swiggy', 'Zomato', 'Netflix', 'Shopify', 'Epam Systems']
  },
  'devops-engineer': {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    domain: 'DevOps',
    level: 'Advanced',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹8L - ₹20L',
    globalSalary: '$95,000 - $160,000',
    historyFuture: {
      history: 'Historically, systems developers in silos tossed completed code packages over the wall to separate operation specialists/SysAdmins, who had to run/maintain it manually.',
      future: 'In the future, automated cognitive pipelines will handle monitoring metrics, utilizing predictive operations to preemptively scale clusters before spikes.'
    },
    roleAsk: {
      explanation: 'Bridges the gap between software developers and IT systems operations, maintaining continuous delivery pipelines (CI/CD), infrastructure scaling, auto-provisioning, and cluster safety.',
      suitableFor: 'Experienced system managers and developers with a deep passion for continuous automation, stability metrics, and configuration automation.'
    },
    mustHaves: {
      tech: ['Bash scripting or Python scripting', 'Docker container isolation', 'Kubernetes cluster deployment', 'CI/CD pipeline architecture (GitHub Actions / Jenkins)', 'Infrastructure-as-Code (Terraform)'],
      process: ['Zero-downtime deployment planning', 'Incident handling frameworks']
    },
    cherries: ['SRE monitoring (Prometheus / Grafana)', 'AWS Certified Solutions Architect', 'Bash advanced optimization'],
    recommendedCertifications: [
      { name: 'HashiCorp Certified: Terraform Associate', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://developer.hashicorp.com/certifications', costEstimate: '$150' },
      { name: 'Certified Kubernetes Administrator (CKA)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.cncf.io/training/certification/cka/', costEstimate: '$395' },
      { name: 'AWS Certified DevOps Engineer', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/', costEstimate: '$300' }
    ],
    toolsToLearn: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Ansible'],
    interviewTopics: {
      technical: ['Explain Docker container isolation versus virtual machine hypervisor layers.', 'What is Blue-Green deployment, and how does it prevent downtime during upgrades?', 'Explain how you configure a secure multi-stage build in Docker to reduce image footprint.'],
      scenario: ['A continuous deployment build failed in the production phase because of a missing environmental variable. How do you remediate without manual server login?', 'The Kubernetes cluster reports a sudden CrashLoopBackOff error on a core microservice. Walk me through your diagnostics.'],
      hr: ['DevOps is as much a culture as a technology. How do you foster active communication between developers and Operations?']
    },
    resumeKeywords: [
      { keyword: 'Infrastructure as Code (Terraform)', priority: 'High' },
      { keyword: 'Kubernetes Cluster Administration', priority: 'High' },
      { keyword: 'Docker Containment Pipelines', priority: 'High' },
      { keyword: 'CI/CD Integration Automation', priority: 'High' }
    ],
    upskillingPath: [
      'Learn Linux server setup and robust administration script loops.',
      'Containerize standard web applications using Dockerfiles.',
      'Master Git workflow branches, merging, pull requests, and automated testing hooks.',
      'Build fully automated CI/CD pipelines (such as GitHub Actions to launch containers to Cloud Run).',
      'Learn Terraform (IaC) and study cluster management concepts (Kubernetes, AWS EKS).'
    ],
    nextCareerMoves: ['SRE Principal', 'DevOps Director', 'Cloud Enterprise Architect'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Kubernetes and CI/CD competencies appear in 80% of server automation postings.'
    },
    nationalInfluence: 'Extremely critical for high availability websites, SaaS corporations, global e-commerce systems, and core banking portals.',
    companiesHiring: ['Red Hat', 'GitLab', 'HashiCorp', 'Uber Solutions', 'Ola Cabs', 'Salesforce']
  },
  'system-administrator': {
    id: 'system-administrator',
    title: 'System Administrator',
    domain: 'IT Operations',
    level: 'Mid-level',
    isCoding: false,
    isHighPaying: false,
    isRemote: false,
    indiaSalary: '₹4.5L - ₹9L',
    globalSalary: '$60,000 - $95,000',
    historyFuture: {
      history: 'Historically, the System Administrator (SysAdmin) managed physical server rooms, backup tapes, active cooling, and manual system boots in the basement.',
      future: 'In the future, Systems Administrators will orchestrate automated hybrid setups, managing hypervisors, and cloud connectivity lines.'
    },
    roleAsk: {
      explanation: 'Maintains enterprise servers (Windows/Linux), configures domain services, audits server security updates, handles backups, and preserves network storage capacity.',
      suitableFor: 'Detail-oriented professionals who like maintaining high system persistence, active infrastructure, files, and server security.'
    },
    mustHaves: {
      tech: ['Linux Server Administration (RedHat/Ubuntu)', 'Windows Server Domain Services (AD DS)', 'DNS root routing configs', 'Backup disaster recovery setups', 'Virtualization (VMware/Hyper-V)'],
      process: ['Strict change tracking documentation', 'Incident escalation systems']
    },
    cherries: ['PowerShell or Bash script loops', 'SAN NAS network configurations', 'Basic cloud connectivity'],
    recommendedCertifications: [
      { name: 'Red Hat Certified System Administrator (RHCSA)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.redhat.com/en/services/certification/rhcsa', costEstimate: '$400' },
      { name: 'CompTIA Linux+', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en-us/certifications/linux/', costEstimate: '$358' },
      { name: 'Microsoft Certified: Windows Server Hybrid Administrator', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/en-us/credentials/browse/', costEstimate: '$165' }
    ],
    toolsToLearn: ['Active Directory', 'VMware ESXi', 'RedHat Linux', 'Ansible', 'PowerShell', 'Veeam Backup'],
    interviewTopics: {
      technical: ['Explain active directory trust loops and catalog processes.', 'How do you analyze CPU bottlenecks and disc latency on a Linux server?', 'How do you design a reliable redundant RAID 5 server disks configuration?'],
      scenario: ['A core company folder is missing from the shared NAS drive. What are your extraction and restoral steps?', 'The primary domain controller drops offline. What happens to user login services and how do you recover?'],
      hr: ['Describe a time you handled a critical outage and had to coordinate with business departments.']
    },
    resumeKeywords: [
      { keyword: 'Linux Systems Configuration (RHCSA)', priority: 'High' },
      { keyword: 'Windows Server & AD Administration', priority: 'High' },
      { keyword: 'Virtualization & VMware ESXi Services', priority: 'Medium' },
      { keyword: 'Disaster Recovery and Veeam Backups', priority: 'High' }
    ],
    upskillingPath: [
      'Learn core server operating systems (installing Ubuntu Server, configure system services).',
      'Master Shell directories, user account properties, permission models, and SSH keys.',
      'Learn Windows Server, Active Directory Domain Services, and PowerShell scripts.',
      'Earn the RHCSA (Red Hat Certified System Administrator) certification to demonstrate technical hands-on capability.',
      'Configure virtualization using VirtualBox or local Hyper-V platforms.'
    ],
    nextCareerMoves: ['Infrastructure Architect', 'DevOps Practitioner', 'Cloud Support Specialist'],
    marketDemandSignal: {
      index: 'Medium Demand',
      percentStat: 'Hybrid server administration skills represent 52% of core infrastructure job demands.'
    },
    nationalInfluence: 'Strongly desired in universities, financial structures, defense systems, and legacy companies with localized servers.',
    companiesHiring: ['IBM', 'Fujitsu', 'Cognizants', 'State Bank of India', 'Oracle Systems']
  },
  'erp-support-analyst': {
    id: 'erp-support-analyst',
    title: 'ERP Support Analyst',
    domain: 'Business & IT Process Roles',
    level: 'Mid-level',
    isCoding: false,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹5L - ₹11L',
    globalSalary: '$70,000 - $110,000',
    historyFuture: {
      history: 'Historically, ERP Support began with standard database inventory ledger managers and spreadsheet calculations before dynamic ERP platforms.',
      future: 'Future ERP Analysts will manage integrated AI forecasts across CRM interfaces, inventory feeds, and direct ledger interfaces.'
    },
    roleAsk: {
      explanation: 'Coordinates corporate Enterprise Resource Planning (ERP) systems (SAP, Oracle, Workday), troubleshooting user interfaces, ledger entries, and pipeline schemas.',
      suitableFor: 'Logical thinkers who enjoy financial structures, operations logistics, database queries, and assisting corporate business lines.'
    },
    mustHaves: {
      tech: ['Core SAP or Oracle modules configuration', 'SQL database queries', 'Data migration scripts', 'Custom dashboard reports (Power BI/Excel)'],
      process: ['Financial auditing standards', 'Corporate business processes understanding']
    },
    cherries: ['SAP S/4HANA implementation experience', 'ABAP/Apex program basics', 'CRM integration knowledge'],
    recommendedCertifications: [
      { name: 'SAP Certified Application Associate', level: 'Intermediate', status: 'Required', resourceUrl: 'https://training.sap.com/certification', costEstimate: '$250' },
      { name: 'Salesforce Administrator', level: 'Beginner', status: 'Optional', resourceUrl: 'https://trailhead.salesforce.com/en/credentials/administrator', costEstimate: '$200' }
    ],
    toolsToLearn: ['SAP S/4HANA', 'Oracle ERP Cloud', 'Salesforce CRM', 'SQL Server / PL-SQL', 'Jira Service Management'],
    interviewTopics: {
      technical: ['Explain the three-way corporate match concept in invoice processes and ERP validation.', 'How do you troubleshoot a failed invoice integration between CRM and ERP ledgers?', 'Write a simple query to locate unresolved vendor balances.'],
      scenario: ['A user cannot close the fiscal month in ERP due to a ledger locking conflict. Walk us through your support diagnosis.', 'The enterprise is rolling out a new inventory module. How do you validate existing raw inventory data integrity?'],
      hr: ['How do you manage support demands from finance executives during year-end tax season peaks?', 'What led you to combine technology with financial business workflows?']
    },
    resumeKeywords: [
      { keyword: 'SAP ERP Module Support & Config', priority: 'High' },
      { keyword: 'Oracle Enterprise Resource Planning', priority: 'Medium' },
      { keyword: 'Financial Ledger Integration & SQL', priority: 'High' },
      { keyword: 'SQL Joins & Auditing Reports', priority: 'Medium' }
    ],
    upskillingPath: [
      'Learn the core modules of enterprise business (inventory tracking, ledgers, human capitals).',
      'Enroll in official SAP learning hubs or Salesforce Trailhead platforms for hands-on labs.',
      'Acquire certification: SAP Certified Associate or Salesforce Certified Administrator.',
      'Master advanced Excel and SQL data querying.',
      'Apply to large corporate consulting agencies and system integrators.'
    ],
    nextCareerMoves: ['Senior ERP Consultant', 'IT Business Analyst', 'Systems Architect'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Enterprise SAP and Oracle system support is required in 58% of consulting system roles.'
    },
    nationalInfluence: 'Extremely popular across massive retail, logistics, energy, consultancies, and chemical industries globally.',
    companiesHiring: ['Accenture', 'Capgemini', 'SAP India', 'Oracle Corporation', 'Deloitte', 'Reliance Industries']
  },
  'prompt-engineer': {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    domain: 'AI & Automation',
    level: 'Entry-level',
    isCoding: true,
    isHighPaying: true,
    isRemote: true,
    indiaSalary: '₹6L - ₹15L',
    globalSalary: '$85,000 - $145,000',
    historyFuture: {
      history: 'Historically, the role did not exist before the launch of Transformer-based Large Language Models (LLMs) in the early 2020s.',
      future: 'In the future, Prompt Engineers will morph into AI Orchestrators, managing agentic systems, real-time tool calls, and API routing.'
    },
    roleAsk: {
      explanation: 'Designs and evaluates structured text prompts, system instructions, temperature values, and output schemas to get predictable results from generative models (LLMs).',
      suitableFor: 'Creative writers, linguistics enthusiasts, and testers who love interacting with AI models, logical parsing, and designing prompts without needing machine learning heavy math.',
    },
    mustHaves: {
      tech: ['Understanding LLM architectures and limitations', 'Zero-shot, Few-shot and Chain-of-Thought prompting', 'Basic Python script loops & API wrappers', 'Structured JSON outputs constraints', 'Model evaluation metrics'],
      process: ['Systematic variation logs', 'Safety guardrails auditing']
    },
    cherries: ['LangChain or LlamaIndex frameworks', 'Finetuning basics', 'Advanced vector search database index (vector stores)'],
    recommendedCertifications: [
      { name: 'Google Cloud generative AI learning path', level: 'Beginner', status: 'Required', resourceUrl: 'https://cloud.google.com/learn', costEstimate: 'Free' }
    ],
    toolsToLearn: ['Gemini API / Google AI Studio', 'OpenAI Playground', 'Python Jupyter', 'LangChain', 'Pinecone Vector DB', 'Claude API'],
    interviewTopics: {
      technical: ['Explain Chain-of-Thought (CoT) prompting and when it is necessary compared to few-shot prompting.', 'How do you enforce an LLM to return strict JSON formatting without fail?', 'What is the context window, and how does it affect prompt sizing and token price models?'],
      scenario: ['An AI chatbot is occasionally leaking system secrets to clever users through jailbreaking. How do you modify your instructions to secure the system?', 'An orchestration pipeline is returning irrelevant responses. Detail your steps to evaluate and adjust the prompt template.'],
      hr: ['Is prompt engineering a long-term career field or an intermediate phase of software design?', 'How do you evaluate if a prompt change is actually better on 100 sample documents?']
    },
    resumeKeywords: [
      { keyword: 'Generative AI Prompt Design', priority: 'High' },
      { keyword: 'System Instructions & Safety Guards', priority: 'High' },
      { keyword: 'TypeScript / Python LLM APIs', priority: 'Medium' },
      { keyword: 'Few-Shot and CoT Optimizations', priority: 'High' }
    ],
    upskillingPath: [
      'Learn LLM fundamentals (tokens, temperatures, context window limits).',
      'Practice advanced prompting techniques in Google AI Studio or OpenAI Playground.',
      'Complete Google Cloud generative AI learning pathways.',
      'Write simple Python or Node scripts utilizing LLM SDKs to automate text generation.',
      'Document your models evaluation tests on a clean public GitHub repository.'
    ],
    nextCareerMoves: ['AI Solutions Architect', 'NLP Support Engineer', 'AI Product Manager'],
    marketDemandSignal: {
      index: 'High Demand',
      percentStat: 'Generative AI skills and systematic prompt tuning demand has grown over 240% since 2023.'
    },
    nationalInfluence: 'Rapidly growing focus across tech firms, finance startups, creative sectors, and technology consultancies.',
    companiesHiring: ['Google India', 'Microsoft', 'Anthropic', 'Accenture', 'Tech Mahindra', 'Cognizant']
  }
};

// Source-backed Certifications & Skills Engine from MapIT_sources_job_roles_certifications.pdf

export function getDomainRoleCertifications(domainId: string, roleId: string, level: 'Entry-level' | 'Mid-level' | 'Advanced'): Certification[] {
  const rLower = roleId.toLowerCase();

  // 1. IT Support, Service Desk & End-User Computing
  if (domainId === 'it-support' || domainId.includes('support') || domainId.includes('service-desk')) {
    if (level === 'Entry-level') {
      return [
        { name: 'CompTIA A+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/a/', costEstimate: '$253 USD / exam' },
        { name: 'Google IT Support Professional Certificate', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://grow.google/certificates/it-support/', costEstimate: 'Coursera Subscription (~$39-$49/mo)' },
        { name: 'Microsoft 365 Certified: Fundamentals (MS-900)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/microsoft-365-fundamentals/', costEstimate: '$99 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'ITIL 4 Foundation (PeopleCert)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$380 - $480 USD' },
        { name: 'ServiceNow Certified System Administrator (CSA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learning.servicenow.com/lxp/en/pages/now-learning-get-certified?achievement_id=208e1d77dbc27f40de3cdb85ca961987&id=amap_detail', costEstimate: '$300 USD' },
        { name: 'CompTIA Network+', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/network/', costEstimate: '$392 USD' }
      ];
    } else {
      return [
        { name: 'ITIL 4 Managing Professional (MP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$500+ USD' },
        { name: 'ServiceNow Certified Implementation Specialist - ITSM (CIS-ITSM)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learning.servicenow.com/lxp/en/pages/now-learning-get-certified?achievement_id=6c8e1d77dbc27f40de3cdb85ca961970&id=amap_detail', costEstimate: '$450 USD' },
        { name: 'CompTIA Security+', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' }
      ];
    }
  }

  // 2. System Administration & Infrastructure
  if (domainId === 'systems-infra' || domainId.includes('systems') || domainId.includes('infra')) {
    if (rLower.includes('linux') || rLower.includes('rhel')) {
      if (level === 'Entry-level') {
        return [
          { name: 'CompTIA Linux+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/linux/', costEstimate: '$392 USD' },
          { name: 'Red Hat Certified System Administrator (RHCSA EX200)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.redhat.com/en/services/certification/rhcsa', costEstimate: '$400 - $500 USD' },
          { name: 'Linux Foundation Certified System Administrator (LFCS)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/', costEstimate: '$395 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'Red Hat Certified System Administrator (RHCSA EX200)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.redhat.com/en/services/certification/rhcsa', costEstimate: '$400 - $500 USD' },
          { name: 'Linux Foundation Certified System Administrator (LFCS)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/', costEstimate: '$395 USD' },
          { name: 'Red Hat Certified Engineer (RHCE EX294 - Ansible Automation)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.redhat.com/en/services/certification/rhce', costEstimate: '$400 - $500 USD' }
        ];
      } else {
        return [
          { name: 'Red Hat Certified Engineer (RHCE EX294)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.redhat.com/en/services/certification/rhce', costEstimate: '$400 - $500 USD' },
          { name: 'Red Hat Certified Architect (RHCA)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.redhat.com/en/services/certifications', costEstimate: '$1,500+ USD' },
          { name: 'Linux Foundation Certified Engineer (LFCE)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://training.linuxfoundation.org/certification-catalog/', costEstimate: '$395 USD' }
        ];
      }
    }
    if (rLower.includes('windows') || rLower.includes('server')) {
      if (level === 'Entry-level') {
        return [
          { name: 'CompTIA Server+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/server/', costEstimate: '$392 USD' },
          { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/', costEstimate: '$99 USD' },
          { name: 'Microsoft 365 Certified: Endpoint Administrator Associate (MD-102)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/endpoint-administrator/', costEstimate: '$165 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/', costEstimate: '$165 USD' },
          { name: 'CompTIA Server+', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en/certifications/server/', costEstimate: '$392 USD' },
          { name: 'Microsoft Certified: Windows Server Hybrid Administrator Associate', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/windows-server-hybrid-administrator/', costEstimate: '$165 USD' }
        ];
      } else {
        return [
          { name: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)', level: 'Advanced', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/', costEstimate: '$165 USD' },
          { name: 'VMware Certified Professional - Data Center Virtualization (VCP-DCV)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.vmware.com/learning/certification/vcp-dcv.html', costEstimate: '$250 USD' },
          { name: 'Red Hat Certified System Administrator (RHCSA)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.redhat.com/en/services/certification/rhcsa', costEstimate: '$400 USD' }
        ];
      }
    }
    // General systems/infra
    if (level === 'Entry-level') {
      return [
        { name: 'CompTIA Server+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/server/', costEstimate: '$392 USD' },
        { name: 'CompTIA Linux+', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en/certifications/linux/', costEstimate: '$392 USD' },
        { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/', costEstimate: '$99 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Red Hat Certified System Administrator (RHCSA EX200)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.redhat.com/en/services/certification/rhcsa', costEstimate: '$400 - $500 USD' },
        { name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/', costEstimate: '$165 USD' },
        { name: 'Linux Foundation Certified System Administrator (LFCS)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/', costEstimate: '$395 USD' }
      ];
    } else {
      return [
        { name: 'Red Hat Certified Engineer (RHCE EX294)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.redhat.com/en/services/certification/rhce', costEstimate: '$400 - $500 USD' },
        { name: 'VMware Certified Professional - Data Center Virtualization (VCP-DCV)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.vmware.com/learning/certification/vcp-dcv.html', costEstimate: '$250 USD' },
        { name: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/', costEstimate: '$165 USD' }
      ];
    }
  }

  // 3. Networking & NOC Operations
  if (domainId === 'networking') {
    if (level === 'Entry-level') {
      return [
        { name: 'Cisco Certified Support Technician (CCST) Networking', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/entry/ccst-networking.html', costEstimate: '$125 USD' },
        { name: 'CompTIA Network+', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en/certifications/network/', costEstimate: '$392 USD' },
        { name: 'Cisco Certified Network Associate (CCNA 200-301)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/ccna/index.html', costEstimate: '$300 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Cisco Certified Network Associate (CCNA 200-301)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/ccna/index.html', costEstimate: '$300 USD' },
        { name: 'Cisco Certified CyberOps Associate (200-201 CBROPS)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/cyberops-associate/index.html', costEstimate: '$300 USD' },
        { name: 'Cisco Certified DevNet Associate (200-901 DEVASC)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/devnet-associate/index.html', costEstimate: '$300 USD' }
      ];
    } else {
      return [
        { name: 'Cisco Certified Network Professional (CCNP Enterprise)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/professional/ccnp-enterprise/index.html', costEstimate: '$400 + $300 USD' },
        { name: 'Cisco Certified Internetwork Expert (CCIE Enterprise Infrastructure)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/expert/ccie-enterprise-infrastructure/index.html', costEstimate: '$1,600 USD Lab' },
        { name: 'Cisco Certified DevNet Professional', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/professional/devnet-professional/index.html', costEstimate: '$400 + $300 USD' }
      ];
    }
  }

  // 4. Cloud Computing
  if (domainId === 'cloud') {
    if (rLower.includes('aws')) {
      if (level === 'Entry-level') {
        return [
          { name: 'AWS Certified Cloud Practitioner (CLF-C02)', level: 'Beginner', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', costEstimate: '$100 USD' },
          { name: 'AWS Certified Solutions Architect - Associate (SAA-C03)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', costEstimate: '$150 USD' },
          { name: 'AWS Certified SysOps Administrator - Associate (SOA-C02)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://aws.amazon.com/certification/certified-sysops-admin-associate/', costEstimate: '$150 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'AWS Certified Solutions Architect - Associate (SAA-C03)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', costEstimate: '$150 USD' },
          { name: 'AWS Certified SysOps Administrator - Associate (SOA-C02)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-sysops-admin-associate/', costEstimate: '$150 USD' },
          { name: 'AWS Certified Developer - Associate (DVA-C02)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://aws.amazon.com/certification/certified-developer-associate/', costEstimate: '$150 USD' }
        ];
      } else {
        return [
          { name: 'AWS Certified Solutions Architect - Professional (SAP-C02)', level: 'Advanced', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/', costEstimate: '$300 USD' },
          { name: 'AWS Certified DevOps Engineer - Professional (DOP-C02)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/', costEstimate: '$300 USD' },
          { name: 'AWS Certified Security - Specialty (SCS-C02)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://aws.amazon.com/certification/certified-security-specialty/', costEstimate: '$300 USD' }
        ];
      }
    }
    if (rLower.includes('azure')) {
      if (level === 'Entry-level') {
        return [
          { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/', costEstimate: '$99 USD' },
          { name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/', costEstimate: '$165 USD' },
          { name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/security-compliance-and-identity-fundamentals/', costEstimate: '$99 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/', costEstimate: '$165 USD' },
          { name: 'Microsoft Certified: Azure Developer Associate (AZ-204)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-developer/', costEstimate: '$165 USD' },
          { name: 'Microsoft Certified: Azure Security Engineer Associate (AZ-500)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-security-engineer/', costEstimate: '$165 USD' }
        ];
      } else {
        return [
          { name: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)', level: 'Advanced', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/', costEstimate: '$165 USD' },
          { name: 'Microsoft Certified: DevOps Engineer Expert (AZ-400)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/devops-engineer/', costEstimate: '$165 USD' },
          { name: 'Microsoft Certified: Cybersecurity Architect Expert (SC-100)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/cybersecurity-architect-expert/', costEstimate: '$165 USD' }
        ];
      }
    }
    if (rLower.includes('gcp') || rLower.includes('google')) {
      if (level === 'Entry-level') {
        return [
          { name: 'Google Cloud Digital Leader', level: 'Beginner', status: 'Required', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-digital-leader', costEstimate: '$99 USD' },
          { name: 'Google Cloud Associate Cloud Engineer (ACE)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://cloud.google.com/learn/certification/associate-cloud-engineer', costEstimate: '$125 USD' },
          { name: 'Google IT Support Professional Certificate', level: 'Beginner', status: 'Optional', resourceUrl: 'https://grow.google/certificates/it-support/', costEstimate: 'Coursera Subscription' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'Google Cloud Associate Cloud Engineer (ACE)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://cloud.google.com/learn/certification/associate-cloud-engineer', costEstimate: '$125 USD' },
          { name: 'Google Cloud Professional Cloud Architect (PCA)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-architect', costEstimate: '$200 USD' },
          { name: 'Google Cloud Professional Cloud Security Engineer', level: 'Advanced', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-security-engineer', costEstimate: '$200 USD' }
        ];
      } else {
        return [
          { name: 'Google Cloud Professional Cloud Architect (PCA)', level: 'Advanced', status: 'Required', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-architect', costEstimate: '$200 USD' },
          { name: 'Google Cloud Professional Cloud DevOps Engineer', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-devops-engineer', costEstimate: '$200 USD' },
          { name: 'Google Cloud Professional Cloud Security Engineer', level: 'Advanced', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-security-engineer', costEstimate: '$200 USD' }
        ];
      }
    }
    // General cloud
    if (level === 'Entry-level') {
      return [
        { name: 'AWS Certified Cloud Practitioner (CLF-C02)', level: 'Beginner', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', costEstimate: '$100 USD' },
        { name: 'Microsoft Certified: Azure Fundamentals (AZ-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/', costEstimate: '$99 USD' },
        { name: 'Google Cloud Digital Leader', level: 'Beginner', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-digital-leader', costEstimate: '$99 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'AWS Certified Solutions Architect - Associate (SAA-C03)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', costEstimate: '$150 USD' },
        { name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/', costEstimate: '$165 USD' },
        { name: 'Google Cloud Associate Cloud Engineer (ACE)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/associate-cloud-engineer', costEstimate: '$125 USD' }
      ];
    } else {
      return [
        { name: 'AWS Certified Solutions Architect - Professional (SAP-C02)', level: 'Advanced', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/', costEstimate: '$300 USD' },
        { name: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/', costEstimate: '$165 USD' },
        { name: 'Google Cloud Professional Cloud Architect (PCA)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-architect', costEstimate: '$200 USD' }
      ];
    }
  }

  // 5. Cybersecurity, GRC & Security Operations
  if (domainId === 'cybersecurity' || domainId.includes('security') || domainId === 'soc') {
    if (rLower.includes('soc') || rLower.includes('incident') || rLower.includes('threat')) {
      if (level === 'Entry-level') {
        return [
          { name: 'ISC2 Certified in Cybersecurity (CC)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cc', costEstimate: 'Free Promo / $50 USD' },
          { name: 'Google Cybersecurity Professional Certificate', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://grow.google/certificates/cybersecurity/', costEstimate: 'Coursera Subscription (~$39/mo)' },
          { name: 'CompTIA Security+ (SY0-701)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'CompTIA Security+ (SY0-701)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' },
          { name: 'CompTIA CySA+ (Cybersecurity Analyst)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en/certifications/cysa/', costEstimate: '$404 USD' },
          { name: 'Microsoft Certified: Security Operations Analyst Associate (SC-200)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/security-operations-analyst/', costEstimate: '$165 USD' }
        ];
      } else {
        return [
          { name: 'ISC2 Certified Information Systems Security Professional (CISSP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cissp', costEstimate: '$749 USD' },
          { name: 'GIAC Certified Incident Handler (GCIH)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.giac.org/certifications/certified-incident-handler-gcih/', costEstimate: '$979 USD' },
          { name: 'CompTIA SecurityX (CASP+)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/securityx/', costEstimate: '$494 USD' }
        ];
      }
    }
    if (rLower.includes('pentest') || rLower.includes('offensive') || rLower.includes('red-team') || rLower.includes('ethical')) {
      return [
        { name: 'CompTIA PenTest+', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/pentest/', costEstimate: '$404 USD' },
        { name: 'Offensive Security Certified Professional (OSCP)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.offsec.com/courses/pen-200/', costEstimate: '$1,649 USD' },
        { name: 'Certified Ethical Hacker (CEH v13 AI)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/', costEstimate: '$1,199 USD' }
      ];
    }
    if (rLower.includes('grc') || rLower.includes('audit') || rLower.includes('compliance') || rLower.includes('risk')) {
      if (level === 'Entry-level') {
        return [
          { name: 'ISC2 Certified in Cybersecurity (CC)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cc', costEstimate: 'Free Promo / $50 USD' },
          { name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/security-compliance-and-identity-fundamentals/', costEstimate: '$99 USD' },
          { name: 'CompTIA Security+', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'ISACA Certified Information Systems Auditor (CISA)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.isaca.org/credentialing/cisa', costEstimate: '$575 - $760 USD' },
          { name: 'ISO/IEC 27001 Lead Auditor (PECB / IRCA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001', costEstimate: '$800 - $1,200 USD' },
          { name: 'ISACA Certified in Risk and Information Systems Control (CRISC)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.isaca.org/credentialing/crisc', costEstimate: '$575 - $760 USD' }
        ];
      } else {
        return [
          { name: 'ISACA Certified Information Security Manager (CISM)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.isaca.org/credentialing/cism', costEstimate: '$575 - $760 USD' },
          { name: 'ISC2 Certified Information Systems Security Professional (CISSP)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.isc2.org/certifications/cissp', costEstimate: '$749 USD' },
          { name: 'ISACA Certified in the Governance of Enterprise IT (CGEIT)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.isaca.org/credentialing/cgeit', costEstimate: '$575 - $760 USD' }
        ];
      }
    }
    // General Cybersecurity
    if (level === 'Entry-level') {
      return [
        { name: 'ISC2 Certified in Cybersecurity (CC)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cc', costEstimate: 'Free Promo / $50 USD' },
        { name: 'CompTIA Security+ (SY0-701)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' },
        { name: 'Google Cybersecurity Professional Certificate', level: 'Beginner', status: 'Optional', resourceUrl: 'https://grow.google/certificates/cybersecurity/', costEstimate: 'Coursera Subscription' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'CompTIA Security+ (SY0-701)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' },
        { name: 'ISC2 Systems Security Certified Practitioner (SSCP)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.isc2.org/certifications/sscp', costEstimate: '$249 USD' },
        { name: 'CompTIA CySA+', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/cysa/', costEstimate: '$404 USD' }
      ];
    } else {
      return [
        { name: 'ISC2 Certified Information Systems Security Professional (CISSP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cissp', costEstimate: '$749 USD' },
        { name: 'ISACA Certified Information Security Manager (CISM)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.isaca.org/credentialing/cism', costEstimate: '$575 - $760 USD' },
        { name: 'ISC2 Certified Cloud Security Professional (CCSP)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.isc2.org/certifications/ccsp', costEstimate: '$599 USD' }
      ];
    }
  }

  // 6. Software Development & Engineering
  if (domainId === 'software-dev' || domainId.includes('software') || domainId.includes('dev')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Meta Front-End / Back-End Developer Professional Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://grow.google/certificates/', costEstimate: 'Coursera Subscription (~$39/mo)' },
        { name: 'Oracle Certified Associate Java SE Programmer', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://education.oracle.com/oracle-certification-path/pFamily_48', costEstimate: '$245 USD' },
        { name: 'GitHub Foundations Certification', level: 'Beginner', status: 'Optional', resourceUrl: 'https://resources.github.com/learn/certifications/', costEstimate: '$99 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Microsoft Certified: Azure Developer Associate (AZ-204)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-developer/', costEstimate: '$165 USD' },
        { name: 'AWS Certified Developer - Associate (DVA-C02)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-developer-associate/', costEstimate: '$150 USD' },
        { name: 'Oracle Certified Professional: Java SE 17 Developer', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://education.oracle.com/oracle-certification-path/pFamily_48', costEstimate: '$245 USD' }
      ];
    } else {
      return [
        { name: 'AWS Certified Solutions Architect - Professional (SAP-C02)', level: 'Advanced', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/', costEstimate: '$300 USD' },
        { name: 'Google Cloud Professional Cloud Developer', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-developer', costEstimate: '$200 USD' },
        { name: 'The Open Group TOGAF Standard (Practitioner)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.opengroup.org/certifications/togaf', costEstimate: '$550 USD' }
      ];
    }
  }

  // 7. QA, Software Testing & Quality Engineering
  if (domainId === 'qa-testing' || domainId.includes('qa') || domainId.includes('testing')) {
    if (level === 'Entry-level') {
      return [
        { name: 'ISTQB Certified Tester Foundation Level (CTFL 4.0)', level: 'Beginner', status: 'Required', resourceUrl: 'https://istqb.org/certifications/certified-tester-foundation-level/', costEstimate: '$229 USD' },
        { name: 'ISTQB Agile Tester Foundation Extension', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://istqb.org/certifications/agile-tester/', costEstimate: '$229 USD' },
        { name: 'Selenium WebDriver Certified Associate', level: 'Beginner', status: 'Optional', resourceUrl: 'https://istqb.org/certifications/', costEstimate: '$150 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'ISTQB Certified Tester Advanced Level - Test Automation Engineering (CTAL-TAE)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://istqb.org/certifications/test-automation-engineering/', costEstimate: '$250 USD' },
        { name: 'ISTQB Certified Tester Advanced Level - Technical Test Analyst (CTAL-TTA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://istqb.org/certifications/technical-test-analyst/', costEstimate: '$250 USD' },
        { name: 'Postman API Fundamentals Student Expert', level: 'Beginner', status: 'Optional', resourceUrl: 'https://academy.postman.com/', costEstimate: 'Free' }
      ];
    } else {
      return [
        { name: 'ISTQB Certified Tester Advanced Level - Test Manager (CTAL-TM)', level: 'Advanced', status: 'Required', resourceUrl: 'https://istqb.org/certifications/test-manager/', costEstimate: '$250 USD' },
        { name: 'ISTQB Certified Tester Expert Level - Improving the Test Process', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://istqb.org/certifications/expert-level/', costEstimate: '$375 USD' },
        { name: 'PMI Agile Certified Practitioner (PMI-ACP)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.pmi.org/certifications/agile-acp', costEstimate: '$435 - $495 USD' }
      ];
    }
  }

  // 8. DevOps, SRE & Platform Engineering
  if (domainId === 'devops-sre' || domainId.includes('devops') || domainId.includes('sre') || domainId.includes('platform')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Linux Foundation Certified System Administrator (LFCS)', level: 'Beginner', status: 'Required', resourceUrl: 'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/', costEstimate: '$395 USD' },
        { name: 'CNCF Kubernetes and Cloud Native Associate (KCNA)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.cncf.io/training/certification/kcna/', costEstimate: '$250 USD' },
        { name: 'HashiCorp Certified: Terraform Associate (003)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.hashicorp.com/certification/terraform-associate', costEstimate: '$70.50 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'CNCF Certified Kubernetes Administrator (CKA)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.cncf.io/training/certification/cka/', costEstimate: '$395 USD' },
        { name: 'HashiCorp Certified: Terraform Associate (003)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.hashicorp.com/certification/terraform-associate', costEstimate: '$70.50 USD' },
        { name: 'AWS Certified DevOps Engineer - Professional (DOP-C02)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/', costEstimate: '$300 USD' }
      ];
    } else {
      return [
        { name: 'CNCF Certified Kubernetes Security Specialist (CKS)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.cncf.io/training/certification/cks/', costEstimate: '$395 USD' },
        { name: 'Microsoft Certified: DevOps Engineer Expert (AZ-400)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/devops-engineer/', costEstimate: '$165 USD' },
        { name: 'Red Hat Certified Specialist in Ansible Automation', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.redhat.com/en/services/certification/rhcs-ansible-automation', costEstimate: '$400 USD' }
      ];
    }
  }

  // 9. Data, Analytics & Business Intelligence
  if (domainId === 'data-analytics' || domainId.includes('analytics') || domainId.includes('bi')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Google Data Analytics Professional Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://grow.google/certificates/data-analytics/', costEstimate: 'Coursera Subscription (~$39/mo)' },
        { name: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst/', costEstimate: '$165 USD' },
        { name: 'CompTIA Data+ (DA0-001)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/data/', costEstimate: '$392 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst/', costEstimate: '$165 USD' },
        { name: 'Tableau Certified Data Analyst', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.tableau.com/learn/certification/certified-data-analyst', costEstimate: '$250 USD' },
        { name: 'Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/fabric-analytics-engineer-associate/', costEstimate: '$165 USD' }
      ];
    } else {
      return [
        { name: 'Microsoft Certified: Azure Data Engineer Associate (DP-203)', level: 'Advanced', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-data-engineer/', costEstimate: '$165 USD' },
        { name: 'Snowflake SnowPro Core Certification', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learn.snowflake.com/certifications', costEstimate: '$175 USD' },
        { name: 'Google Cloud Professional Data Engineer', level: 'Advanced', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/data-engineer', costEstimate: '$200 USD' }
      ];
    }
  }

  // 10. Data Science, AI & Machine Learning
  if (domainId === 'data-science-ai' || domainId.includes('ai') || domainId.includes('machine-learning') || domainId.includes('data-science')) {
    if (rLower.includes('prompt') || rLower.includes('generative')) {
      return [
        { name: 'AWS Certified AI Practitioner (AIF-C01)', level: 'Beginner', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/', costEstimate: '$75 USD' },
        { name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/', costEstimate: '$99 USD' },
        { name: 'Google Cloud Generative AI Leader Learning Path', level: 'Beginner', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification', costEstimate: 'Free' }
      ];
    }
    if (level === 'Entry-level') {
      return [
        { name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/', costEstimate: '$99 USD' },
        { name: 'IBM Data Science Professional Certificate', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://grow.google/certificates/', costEstimate: 'Coursera Subscription (~$39/mo)' },
        { name: 'AWS Certified AI Practitioner (AIF-C01)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/', costEstimate: '$75 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/', costEstimate: '$165 USD' },
        { name: 'Databricks Certified Machine Learning Associate', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.databricks.com/learn/training/certification', costEstimate: '$200 USD' },
        { name: 'FutureSkills Prime nasscom Certified Data Scientist / AI Specialist', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.futureskillsprime.in/nasscom-certification/', costEstimate: '₹2,500 - ₹8,000 INR' }
      ];
    } else {
      return [
        { name: 'Google Cloud Professional Machine Learning Engineer', level: 'Advanced', status: 'Required', resourceUrl: 'https://cloud.google.com/learn/certification/machine-learning-engineer', costEstimate: '$200 USD' },
        { name: 'AWS Certified Machine Learning - Specialty (MLS-C01)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/', costEstimate: '$300 USD' },
        { name: 'Databricks Certified Machine Learning Professional', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.databricks.com/learn/training/certification', costEstimate: '$200 USD' }
      ];
    }
  }

  // 11. Database Administration (DBA)
  if (domainId === 'db-admin' || domainId.includes('database') || domainId.includes('dba')) {
    if (rLower.includes('oracle')) {
      return [
        { name: 'Oracle Database Administration Certified Professional (OCP)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$245 USD' },
        { name: 'Oracle Cloud Infrastructure Database Specialist', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$245 USD' },
        { name: 'Oracle Database SQL Certified Associate', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$245 USD' }
      ];
    }
    if (level === 'Entry-level') {
      return [
        { name: 'Oracle Database SQL Certified Associate', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$245 USD' },
        { name: 'Microsoft Certified: Azure Data Fundamentals (DP-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-data-fundamentals/', costEstimate: '$99 USD' },
        { name: 'MongoDB Certified DBA Associate', level: 'Beginner', status: 'Optional', resourceUrl: 'https://learn.mongodb.com/pages/certification-overview', costEstimate: '$150 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Microsoft Certified: Azure Database Administrator Associate (DP-300)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-database-administrator-associate/', costEstimate: '$165 USD' },
        { name: 'Oracle Database Administration Certified Professional (OCP)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$245 USD' },
        { name: 'Snowflake SnowPro Core Certification', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learn.snowflake.com/certifications', costEstimate: '$175 USD' }
      ];
    } else {
      return [
        { name: 'Google Cloud Professional Cloud Database Engineer', level: 'Advanced', status: 'Required', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-database-engineer', costEstimate: '$200 USD' },
        { name: 'Microsoft Certified: Azure Data Engineer Associate (DP-203)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-data-engineer/', costEstimate: '$165 USD' },
        { name: 'Oracle Certified Master (OCM)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$2,000+ USD' }
      ];
    }
  }

  // 12. IT Operations, ITSM & Process Management
  if (domainId === 'it-ops-itsm' || domainId.includes('itsm') || domainId.includes('operations')) {
    if (level === 'Entry-level') {
      return [
        { name: 'ITIL 4 Foundation (PeopleCert)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$380 - $480 USD' },
        { name: 'ServiceNow Certified System Administrator (CSA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learning.servicenow.com/lxp/en/pages/now-learning-get-certified?achievement_id=208e1d77dbc27f40de3cdb85ca961987&id=amap_detail', costEstimate: '$300 USD' },
        { name: 'CompTIA A+', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/a/', costEstimate: '$253 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'ServiceNow Certified Implementation Specialist - ITSM (CIS-ITSM)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learning.servicenow.com/lxp/en/pages/now-learning-get-certified?achievement_id=6c8e1d77dbc27f40de3cdb85ca961970&id=amap_detail', costEstimate: '$450 USD' },
        { name: 'ITIL 4 Managing Professional (CDS / DPI)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$500 USD' },
        { name: 'COBIT 2019 Foundation (ISACA)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.isaca.org/credentialing/cobit', costEstimate: '$435 USD' }
      ];
    } else {
      return [
        { name: 'ITIL 4 Strategic Leader (SL - Digital & IT Strategy)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$500+ USD' },
        { name: 'ISO/IEC 20000 Lead Implementer (IT Service Management)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-20000', costEstimate: '$800 - $1,200 USD' },
        { name: 'ISACA Certified in the Governance of Enterprise IT (CGEIT)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.isaca.org/credentialing/cgeit', costEstimate: '$575 - $760 USD' }
      ];
    }
  }

  // 13. ERP, CRM & Business Applications
  if (domainId === 'erp-crm' || domainId.includes('crm') || domainId.includes('erp') || domainId.includes('sap') || domainId.includes('salesforce')) {
    if (rLower.includes('salesforce')) {
      if (level === 'Entry-level') {
        return [
          { name: 'Salesforce Certified Administrator', level: 'Beginner', status: 'Required', resourceUrl: 'https://trailhead.salesforce.com/credentials/administrator', costEstimate: '$200 USD' },
          { name: 'Salesforce Certified Platform App Builder', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://trailhead.salesforce.com/credentials/platformappbuilder', costEstimate: '$200 USD' },
          { name: 'Salesforce Certified Associate', level: 'Beginner', status: 'Optional', resourceUrl: 'https://trailhead.salesforce.com/credentials/associate', costEstimate: '$75 USD' }
        ];
      } else if (level === 'Mid-level') {
        return [
          { name: 'Salesforce Certified Platform Developer I (PDI)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://trailhead.salesforce.com/credentials/platformdeveloperi', costEstimate: '$200 USD' },
          { name: 'Salesforce Certified Sales Cloud / Service Cloud Consultant', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://trailhead.salesforce.com/credentials/salescloudconsultant', costEstimate: '$200 USD' },
          { name: 'Salesforce Certified Business Analyst', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://trailhead.salesforce.com/credentials/businessanalyst', costEstimate: '$200 USD' }
        ];
      } else {
        return [
          { name: 'Salesforce Certified Application Architect', level: 'Advanced', status: 'Required', resourceUrl: 'https://trailhead.salesforce.com/credentials/applicationarchitect', costEstimate: '$400 USD' },
          { name: 'Salesforce Certified System Architect', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://trailhead.salesforce.com/credentials/systemarchitect', costEstimate: '$400 USD' },
          { name: 'Salesforce Certified Technical Architect (CTA)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://trailhead.salesforce.com/credentials/technicalarchitect', costEstimate: '$6,000 USD Board' }
        ];
      }
    }
    if (rLower.includes('sap')) {
      return [
        { name: 'SAP Certified Associate - SAP S/4HANA (FICO / MM / SD / ABAP)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learning.sap.com/certification', costEstimate: '$500 - $600 USD' },
        { name: 'SAP Certified Professional - Enterprise Architect', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learning.sap.com/certification', costEstimate: '$500 - $600 USD' },
        { name: 'SAP Certified Associate - Integration Suite', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learning.sap.com/certification', costEstimate: '$500 USD' }
      ];
    }
    // General ERP/CRM
    if (level === 'Entry-level') {
      return [
        { name: 'Salesforce Certified Administrator', level: 'Beginner', status: 'Required', resourceUrl: 'https://trailhead.salesforce.com/credentials/administrator', costEstimate: '$200 USD' },
        { name: 'Microsoft Certified: Power Platform Fundamentals (PL-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/power-platform-fundamentals/', costEstimate: '$99 USD' },
        { name: 'Microsoft Certified: Dynamics 365 Fundamentals (ERP / CRM)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/d365-fundamentals-erp/', costEstimate: '$99 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Salesforce Certified Platform App Builder', level: 'Intermediate', status: 'Required', resourceUrl: 'https://trailhead.salesforce.com/credentials/platformappbuilder', costEstimate: '$200 USD' },
        { name: 'SAP Certified Associate - SAP S/4HANA Cloud', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://learning.sap.com/certification', costEstimate: '$500 USD' },
        { name: 'ServiceNow Certified Application Developer (CAD)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://learning.servicenow.com/lxp/', costEstimate: '$300 USD' }
      ];
    } else {
      return [
        { name: 'Salesforce Certified Application Architect', level: 'Advanced', status: 'Required', resourceUrl: 'https://trailhead.salesforce.com/credentials/applicationarchitect', costEstimate: '$400 USD' },
        { name: 'SAP Certified Professional - Solution Architect', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learning.sap.com/certification', costEstimate: '$600 USD' },
        { name: 'Oracle Cloud ERP Certified Implementation Specialist', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.oracle.com/in/education/certification/', costEstimate: '$245 USD' }
      ];
    }
  }

  // 14. Product, Project & Program Management
  if (domainId === 'product-mgmt' || domainId.includes('project') || domainId.includes('product-management')) {
    if (level === 'Entry-level') {
      return [
        { name: 'PMI Certified Associate in Project Management (CAPM)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.pmi.org/certifications/certified-associate-capm', costEstimate: '$300 USD' },
        { name: 'Google Project Management Professional Certificate', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://grow.google/certificates/project-management/', costEstimate: 'Coursera Subscription (~$39/mo)' },
        { name: 'Scrum.org Professional Scrum Master I (PSM I)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.scrum.org/assessments/professional-scrum-master-i-certification', costEstimate: '$150 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'PMI Project Management Professional (PMP)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.pmi.org/certifications/project-management-pmp', costEstimate: '$405 - $575 USD' },
        { name: 'Scrum.org Professional Scrum Product Owner I (PSPO I)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification', costEstimate: '$200 USD' },
        { name: 'PMI Agile Certified Practitioner (PMI-ACP)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.pmi.org/certifications/agile-acp', costEstimate: '$435 - $495 USD' }
      ];
    } else {
      return [
        { name: 'PMI Program Management Professional (PgMP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.pmi.org/certifications/program-management-pgmp', costEstimate: '$800 - $1,000 USD' },
        { name: 'SAFe Practice Consultant (SPC) / POPM', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://scaledagile.com/certifications/', costEstimate: '$995 - $1,295 USD' },
        { name: 'PMI Portfolio Management Professional (PfMP)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.pmi.org/certifications/portfolio-management-pfmp', costEstimate: '$800 - $1,000 USD' }
      ];
    }
  }

  // 15. Business Analysis & Tech Consulting
  if (domainId === 'business-analysis' || domainId.includes('consulting') || domainId.includes('analysis')) {
    if (level === 'Entry-level') {
      return [
        { name: 'IIBA Entry Certificate in Business Analysis (ECBA)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.iiba.org/business-analysis-certifications/ecba/', costEstimate: '$150 - $305 USD' },
        { name: 'Scrum.org Professional Scrum Product Owner I (PSPO I)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification', costEstimate: '$200 USD' },
        { name: 'Salesforce Certified Business Analyst', level: 'Beginner', status: 'Optional', resourceUrl: 'https://trailhead.salesforce.com/credentials/businessanalyst', costEstimate: '$200 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'IIBA Certification of Capability in Business Analysis (CCBA)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.iiba.org/business-analysis-certifications/ccba/', costEstimate: '$250 - $405 USD' },
        { name: 'PMI Professional in Business Analysis (PMI-PBA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.pmi.org/certifications/business-analysis-pba', costEstimate: '$405 - $555 USD' },
        { name: 'IIBA Agile Analysis Certification (IIBA-AAC)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.iiba.org/business-analysis-certifications/agile-analysis/', costEstimate: '$250 - $375 USD' }
      ];
    } else {
      return [
        { name: 'IIBA Certified Business Analysis Professional (CBAP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.iiba.org/business-analysis-certifications/cbap/', costEstimate: '$350 - $505 USD' },
        { name: 'IIBA Certification in Business Data Analytics (IIBA-CBDA)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.iiba.org/business-analysis-certifications/cbda/', costEstimate: '$250 - $375 USD' },
        { name: 'The Open Group TOGAF Standard (Practitioner)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.opengroup.org/certifications/togaf', costEstimate: '$550 USD' }
      ];
    }
  }

  // 16. UI/UX, Product Design & Creative Technology
  if (domainId === 'uiux-design' || domainId.includes('ui') || domainId.includes('ux') || domainId.includes('design')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Google UX Design Professional Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://grow.google/certificates/ux-design/', costEstimate: 'Coursera Subscription (~$39/mo)' },
        { name: 'Figma Certified Creator', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.figma.com/education/', costEstimate: 'Free' },
        { name: 'Interaction Design Foundation (IxDF) Certified UX Designer', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.interaction-design.org/', costEstimate: '$192/year' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Human Factors International Certified Usability Analyst (CUA)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://humanfactors.com/certification/cua.aspx', costEstimate: '$850 USD' },
        { name: 'IAAP Certified Professional in Accessibility Core Competencies (CPACC)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.accessibilityassociation.org/page/CPACC', costEstimate: '$485 USD' },
        { name: 'Nielsen Norman Group (NN/g) UX Certified', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.nngroup.com/ux-certification/', costEstimate: '$1,500+ USD' }
      ];
    } else {
      return [
        { name: 'Nielsen Norman Group (NN/g) UX Master Certified', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.nngroup.com/ux-certification/', costEstimate: '$4,000+ USD' },
        { name: 'Human Factors International Certified User Experience Analyst (CXA)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://humanfactors.com/certification/cxa.aspx', costEstimate: '$1,200 USD' },
        { name: 'IAAP Web Accessibility Specialist (WAS)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.accessibilityassociation.org/page/WAS', costEstimate: '$530 USD' }
      ];
    }
  }

  // 17. Web, CMS & Digital Technology
  if (domainId === 'web-cms' || domainId.includes('web') || domainId.includes('cms')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Meta Front-End Developer Professional Certificate', level: 'Beginner', status: 'Required', resourceUrl: 'https://grow.google/certificates/', costEstimate: 'Coursera Subscription (~$39/mo)' },
        { name: 'Google Analytics 4 (GA4) Individual Qualification', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://skillshop.docebosaas.com/learn', costEstimate: 'Free' },
        { name: 'HubSpot Inbound & Content Marketing Certification', level: 'Beginner', status: 'Optional', resourceUrl: 'https://academy.hubspot.com/courses', costEstimate: 'Free' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Shopify Certified App Developer / Partner Certification', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.shopify.com/partners/academy', costEstimate: 'Free' },
        { name: 'Yoast Technical SEO & WordPress Expert Certification', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://yoast.com/academy/', costEstimate: '$99 USD' },
        { name: 'W3Cx Front-End Web Developer Professional Certificate', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.edx.org/school/w3cx', costEstimate: '$199 USD' }
      ];
    } else {
      return [
        { name: 'Adobe Certified Expert - Adobe Experience Manager (AEM) Sites Architect', level: 'Advanced', status: 'Required', resourceUrl: 'https://certification.adobe.com/', costEstimate: '$225 USD' },
        { name: 'Acquia Certified Grand Master (Drupal Architecture)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.acquia.com/careers/certification', costEstimate: '$450 USD' },
        { name: 'Google Cloud Professional Cloud Developer', level: 'Advanced', status: 'Optional', resourceUrl: 'https://cloud.google.com/learn/certification/cloud-developer', costEstimate: '$200 USD' }
      ];
    }
  }

  // 18. Automation, RPA & Low-Code / No-Code
  if (domainId === 'automation-rpa' || domainId.includes('rpa') || domainId.includes('low-code')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Microsoft Certified: Power Platform Fundamentals (PL-900)', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/power-platform-fundamentals/', costEstimate: '$99 USD' },
        { name: 'UiPath Certified RPA Associate (UiRPA)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.uipath.com/learning/certification', costEstimate: '$150 USD' },
        { name: 'Automation Anywhere Certified Essentials RPA Professional', level: 'Beginner', status: 'Optional', resourceUrl: 'https://university.automationanywhere.com/certification/', costEstimate: '$100 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Microsoft Certified: Power Automate RPA Developer Associate (PL-500)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/power-automate-rpa-developer-associate/', costEstimate: '$165 USD' },
        { name: 'UiPath Certified Professional Automation Developer (UiARD)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.uipath.com/learning/certification', costEstimate: '$200 USD' },
        { name: 'Appian Certified Associate Developer', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://community.appian.com/learn/certifications', costEstimate: '$200 USD' }
      ];
    } else {
      return [
        { name: 'UiPath Certified Automation Solution Architect', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.uipath.com/learning/certification', costEstimate: '$300 USD' },
        { name: 'Microsoft Certified: Power Platform Solution Architect Expert (PL-600)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/power-platform-solution-architect-expert/', costEstimate: '$165 USD' },
        { name: 'Automation Anywhere Certified Master RPA Professional', level: 'Advanced', status: 'Optional', resourceUrl: 'https://university.automationanywhere.com/certification/', costEstimate: '$250 USD' }
      ];
    }
  }

  // 19. Technical Writing & Knowledge Management
  if (domainId === 'tech-writing' || domainId.includes('writing') || domainId.includes('documentation')) {
    if (level === 'Entry-level') {
      return [
        { name: 'Google Technical Writing One & Two Certification', level: 'Beginner', status: 'Required', resourceUrl: 'https://developers.google.com/tech-writing', costEstimate: 'Free' },
        { name: 'Society for Technical Communication (STC) Certified Professional Technical Communicator (CPTC Foundation)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.stc.org/certification/', costEstimate: '$260 USD' },
        { name: 'Markdown & API Documentation Fundamentals', level: 'Beginner', status: 'Optional', resourceUrl: 'https://idratherbewriting.com/learnapidoc/', costEstimate: 'Free' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'STC Certified Professional Technical Communicator (CPTC Practitioner)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.stc.org/certification/', costEstimate: '$410 USD' },
        { name: 'Knowledge-Centered Service (KCS) v6 Practices Certification', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.serviceinnovation.org/certification/kcs-practices/', costEstimate: '$450 USD' },
        { name: 'DITA XML Authoring & Information Architecture Specialist', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.stc.org/', costEstimate: '$300 USD' }
      ];
    } else {
      return [
        { name: 'STC Certified Professional Technical Communicator (CPTC Expert)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.stc.org/certification/', costEstimate: '$510 USD' },
        { name: 'Knowledge-Centered Service (KCS) v6 Certified Trainer', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.serviceinnovation.org/certification/', costEstimate: '$850 USD' },
        { name: 'Information Mapping Certified Professional (IMCP)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://informationmapping.com/', costEstimate: '$500 USD' }
      ];
    }
  }

  // 20. Sales Engineering & Customer Success Technology
  if (domainId === 'sales-customer-success' || domainId.includes('sales') || domainId.includes('customer-success')) {
    if (level === 'Entry-level') {
      return [
        { name: 'AWS Certified Cloud Practitioner (CLF-C02)', level: 'Beginner', status: 'Required', resourceUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', costEstimate: '$100 USD' },
        { name: 'Salesforce Certified Associate', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://trailhead.salesforce.com/credentials/associate', costEstimate: '$75 USD' },
        { name: 'SuccessHACKER Certified Customer Success Manager (CCSM Level 1)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.successcoaching.co/ccsm-level-1', costEstimate: '$299 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Certified Pre-Sales Consultant (CPSC) / Great Demo! Methodology', level: 'Intermediate', status: 'Required', resourceUrl: 'https://greatdemo.com/', costEstimate: '$500 USD' },
        { name: 'AWS Certified Solutions Architect - Associate (SAA-C03)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', costEstimate: '$150 USD' },
        { name: 'Gainsight Certified Customer Success Manager', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.gainsight.com/education/gainsight-certified-csm/', costEstimate: '$150 USD' }
      ];
    } else {
      return [
        { name: 'Cisco Certified Solutions Specialist - Pre-Sales Architecture', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html', costEstimate: '$400 USD' },
        { name: 'SuccessHACKER Certified Customer Success Manager (CCSM Level 4)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.successcoaching.co/', costEstimate: '$899 USD' },
        { name: 'The Open Group TOGAF Standard (Foundation & Practitioner)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.opengroup.org/certifications/togaf', costEstimate: '$550 USD' }
      ];
    }
  }

  // 21. Hardware, Embedded Systems & IoT Engineering
  if (domainId === 'hardware-iot' || domainId.includes('hardware') || domainId.includes('embedded') || domainId.includes('iot')) {
    if (level === 'Entry-level') {
      return [
        { name: 'C-DAC PG Diploma in Embedded Systems Design (PG-DESD)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.cdac.in/index.aspx?id=edu_acts_admission_booklet', costEstimate: '₹90,000 INR (Course/Exam)' },
        { name: 'Arm Accredited Engineer (AAE)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://www.arm.com/resources/education/accreditation', costEstimate: '$200 USD' },
        { name: 'IPC-A-610 Certified IPC Specialist (Electronic Assemblies)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.ipc.org/ipc-certification-programs', costEstimate: '$350 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'AWS Certified IoT Specialist / Azure IoT Developer Specialty (AZ-220)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-iot-developer-specialty/', costEstimate: '$165 USD' },
        { name: 'Arm Accredited System Architect', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.arm.com/resources/education/accreditation', costEstimate: '$250 USD' },
        { name: 'NIELIT Advanced Diploma in VLSI and Embedded Systems Design', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.nielit.gov.in/', costEstimate: '₹25,000 INR' }
      ];
    } else {
      return [
        { name: 'Certified System on Chip (SoC) Architect - IEEE / Arm Professional', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.arm.com/resources/education/accreditation', costEstimate: '$500 USD' },
        { name: 'IPC Certified Interconnect Designer (CID+ Advanced PCB Design)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.ipc.org/ipc-certification-programs', costEstimate: '$650 USD' },
        { name: 'C-DAC Advanced Specialist in VLSI & High Performance Embedded Computing', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.cdac.in/', costEstimate: '₹90,000 INR' }
      ];
    }
  }

  // 22. Telecom, Voice & Collaboration
  if (domainId === 'telecom-voice' || domainId.includes('telecom') || domainId.includes('voice')) {
    if (level === 'Entry-level') {
      return [
        { name: 'CompTIA Network+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/network/', costEstimate: '$392 USD' },
        { name: 'Microsoft 365 Certified: Fundamentals (MS-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/microsoft-365-fundamentals/', costEstimate: '$99 USD' },
        { name: 'SIP School Certified Associate (SSCA)', level: 'Beginner', status: 'Optional', resourceUrl: 'https://www.thesipschool.com/courses/view', costEstimate: '$240 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'Microsoft Certified: Teams Administrator Associate (MS-700)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/teams-administrator/', costEstimate: '$165 USD' },
        { name: 'Cisco Certified Network Associate (CCNA Collaboration / 200-301)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/associate/ccna/index.html', costEstimate: '$300 USD' },
        { name: 'Zoom Certified Solutions Integrator', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://partnerlearning.zoom.us/', costEstimate: 'Free' }
      ];
    } else {
      return [
        { name: 'Cisco Certified Network Professional (CCNP Collaboration)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/professional/ccnp-collaboration/index.html', costEstimate: '$400 + $300 USD' },
        { name: 'Cisco Certified Internetwork Expert (CCIE Collaboration)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/expert/ccie-collaboration/index.html', costEstimate: '$1,600 USD Lab' },
        { name: 'SIP School Voice over IP Advanced Professional (SSVAP)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.thesipschool.com/', costEstimate: '$350 USD' }
      ];
    }
  }

  // 23. Governance, Risk, Compliance (GRC) & IT Audit
  if (domainId === 'governance-audit' || domainId.includes('grc') || domainId.includes('governance')) {
    if (level === 'Entry-level') {
      return [
        { name: 'ISC2 Certified in Cybersecurity (CC)', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cc', costEstimate: 'Free Promo / $50 USD' },
        { name: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/security-compliance-and-identity-fundamentals/', costEstimate: '$99 USD' },
        { name: 'CompTIA Security+', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' }
      ];
    } else if (level === 'Mid-level') {
      return [
        { name: 'ISACA Certified Information Systems Auditor (CISA)', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.isaca.org/credentialing/cisa', costEstimate: '$575 - $760 USD' },
        { name: 'ISO/IEC 27001 Lead Auditor (PECB / IRCA)', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001', costEstimate: '$800 - $1,200 USD' },
        { name: 'ISACA Certified in Risk and Information Systems Control (CRISC)', level: 'Intermediate', status: 'Optional', resourceUrl: 'https://www.isaca.org/credentialing/crisc', costEstimate: '$575 - $760 USD' }
      ];
    } else {
      return [
        { name: 'ISACA Certified Information Security Manager (CISM)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.isaca.org/credentialing/cism', costEstimate: '$575 - $760 USD' },
        { name: 'ISACA Certified in the Governance of Enterprise IT (CGEIT)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.isaca.org/credentialing/cgeit', costEstimate: '$575 - $760 USD' },
        { name: 'IAPP Certified Information Privacy Professional (CIPP/E / CIPP/US)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://iapp.org/certify/cipp/', costEstimate: '$550 USD' }
      ];
    }
  }

  // 24. Technology Architecture Track
  if (domainId === 'architecture' || domainId.includes('architect')) {
    return [
      { name: 'The Open Group TOGAF Standard (Foundation & Practitioner 10th Ed)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.opengroup.org/certifications/togaf', costEstimate: '$550 USD' },
      { name: 'AWS Certified Solutions Architect - Professional (SAP-C02)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/', costEstimate: '$300 USD' },
      { name: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/', costEstimate: '$165 USD' }
    ];
  }

  // 25. Executive & C-Level Tech Leadership
  if (domainId === 'executive' || domainId.includes('leadership') || domainId.includes('c-level')) {
    return [
      { name: 'ISC2 Certified Information Systems Security Professional (CISSP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cissp', costEstimate: '$749 USD' },
      { name: 'ISACA Certified in the Governance of Enterprise IT (CGEIT)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.isaca.org/credentialing/cgeit', costEstimate: '$575 - $760 USD' },
      { name: 'ITIL 4 Strategic Leader (SL - Digital & IT Strategy)', level: 'Advanced', status: 'Optional', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$500+ USD' }
    ];
  }

  // 26. Green Computing & Sustainable IT
  if (domainId === 'green-computing' || domainId.includes('green') || domainId.includes('sustainable')) {
    return [
      { name: 'Green Software Foundation (GSF) Green Software Practitioner', level: 'Beginner', status: 'Required', resourceUrl: 'https://learn.greensoftware.foundation/', costEstimate: 'Free' },
      { name: 'Sustainability and Climate Risk (SCR) by GARP', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.garp.org/scr', costEstimate: '$300 USD' },
      { name: 'ISO 14001 Environmental Management Systems Lead Auditor', level: 'Advanced', status: 'Optional', resourceUrl: 'https://pecb.com/en/education-and-certification-for-individuals/iso-14001', costEstimate: '$800 USD' }
    ];
  }

  // Final fallback based on general level
  if (level === 'Entry-level') {
    return [
      { name: 'CompTIA A+', level: 'Beginner', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/a/', costEstimate: '$253 USD / exam' },
      { name: 'Google IT Support Professional Certificate', level: 'Beginner', status: 'Preferred', resourceUrl: 'https://grow.google/certificates/it-support/', costEstimate: 'Coursera Subscription' }
    ];
  } else if (level === 'Mid-level') {
    return [
      { name: 'CompTIA Security+', level: 'Intermediate', status: 'Required', resourceUrl: 'https://www.comptia.org/en/certifications/security/', costEstimate: '$404 USD' },
      { name: 'ITIL 4 Foundation', level: 'Intermediate', status: 'Preferred', resourceUrl: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework', costEstimate: '$380 USD' }
    ];
  } else {
    return [
      { name: 'ISC2 Certified Information Systems Security Professional (CISSP)', level: 'Advanced', status: 'Required', resourceUrl: 'https://www.isc2.org/certifications/cissp', costEstimate: '$749 USD' },
      { name: 'The Open Group TOGAF Standard (Practitioner)', level: 'Advanced', status: 'Preferred', resourceUrl: 'https://www.opengroup.org/certifications/togaf', costEstimate: '$550 USD' }
    ];
  }
}


export function getDomainRoleProfile(domainId: string, roleId: string, level: 'Entry-level' | 'Mid-level' | 'Advanced', isCoding: boolean, title: string, domainName: string) {
  const rLower = roleId.toLowerCase();
  
  // Default technical skills matching domain & certifications
  let techSkills: string[] = [];
  let processSkills: string[] = ['SLA requirements & ticket lifecycle management', 'Agile sprint collaboration & documentation'];
  let tools: string[] = ['Jira Software', 'ServiceNow', 'GitHub', 'Enterprise Diagnostics Portal'];
  let keywords: { keyword: string; priority: 'High' | 'Medium' | 'Low' }[] = [
    { keyword: `${title} Architecture`, priority: 'High' },
    { keyword: `${domainName} Best Practices`, priority: 'High' },
    { keyword: 'Root Cause Analysis (RCA)', priority: 'Medium' }
  ];
  let interviewTopics = {
    technical: [
      `What are the core technical architectures and performance metrics in ${title}?`,
      `How do you diagnose and troubleshoot complex system errors or integration failures in ${domainName}?`,
      `How do modern security standards and automation apply to ${title} workflows?`
    ],
    scenario: [
      `A high-priority production issue arises during peak operational hours. Detail your step-by-step resolution process.`,
      `A cross-functional team member requests a configuration change that conflicts with established domain policies. How do you address this?`
    ],
    hr: [
      `What motivated you to specialize in the ${title} career path?`,
      `How do you stay updated with rapid industry advancements and emerging certifications in ${domainName}?`
    ]
  };

  // 1. IT Support, Service Desk & EUC
  if (domainId === 'it-support' || domainId.includes('support')) {
    techSkills = ['Hardware & OS Diagnostics (Windows, macOS, Linux)', 'Active Directory / Entra ID User Management', 'Network Troubleshooting (TCP/IP, DHCP, DNS, VPN)', 'Endpoint Imaging & Remote Access Tools'];
    processSkills = ['ITIL Incident, Request & Problem Management', 'SLA Urgency & First-Contact Resolution (FCR)', 'Knowledge Base Documentation (KCS)'];
    tools = ['ServiceNow ITSM', 'Jira Service Management', 'Microsoft Intune', 'Active Directory Users & Computers', 'TeamViewer / Remote Assist', 'PowerShell'];
    keywords = [
      { keyword: 'IT Service Desk & EUC', priority: 'High' },
      { keyword: 'Active Directory / Entra ID', priority: 'High' },
      { keyword: 'Incident & SLA Management', priority: 'High' },
      { keyword: 'CompTIA A+ / ITIL 4', priority: 'Medium' }
    ];
  }
  // 2. Systems & Infrastructure
  else if (domainId === 'systems-infra' || domainId.includes('systems') || domainId.includes('infra')) {
    techSkills = ['Linux (RHEL/Ubuntu) & Windows Server Administration', 'Virtualization (VMware ESXi, vSphere, Hyper-V)', 'Storage Protocols (SAN/NAS, iSCSI, RAID)', 'System Backup, Disaster Recovery & Patch Management'];
    processSkills = ['Change Management & Maintenance Window Protocols', 'Infrastructure Capacity Planning', 'High Availability (HA) Failover Architecture'];
    tools = ['Red Hat Enterprise Linux', 'VMware vSphere', 'Bash & PowerShell Scripting', 'Ansible Automation', 'Veeam Backup', 'Nagios / Zabbix'];
    keywords = [
      { keyword: 'Linux & Windows Server Administration', priority: 'High' },
      { keyword: 'Virtualization & Storage Management', priority: 'High' },
      { keyword: 'Patch & Backup Orchestration', priority: 'High' },
      { keyword: 'RHCSA / Azure Administrator', priority: 'Medium' }
    ];
  }
  // 3. Networking
  else if (domainId === 'networking') {
    techSkills = ['Routing & Switching Protocols (BGP, OSPF, VLANs, STP)', 'Firewall & Security Appliances (Palo Alto, Fortinet, Cisco ASA)', 'Subnetting, IPv4/IPv6 Addressing & DNS/DHCP', 'Network Performance Monitoring & Packet Capture (Wireshark)'];
    processSkills = ['Network Change Authorization Protocols', 'Outage Incident Escalation & Post-Mortems', 'NOC 24/7 Monitoring Protocols'];
    tools = ['Cisco IOS / NX-OS', 'Wireshark Packet Analyzer', 'SolarWinds / PRTG Network Monitor', 'Palo Alto Panorama', 'Python Scapy / Netmiko', 'GNS3 / Cisco Packet Tracer'];
    keywords = [
      { keyword: 'Routing & Switching (OSPF/BGP)', priority: 'High' },
      { keyword: 'Cisco CCNA / CCNP Networking', priority: 'High' },
      { keyword: 'Network Security & Firewalls', priority: 'High' },
      { keyword: 'Wireshark Packet Analysis', priority: 'Medium' }
    ];
  }
  // 4. Cloud Computing
  else if (domainId === 'cloud') {
    techSkills = ['Multi-Cloud Infrastructure (AWS, Azure, GCP)', 'Infrastructure as Code (Terraform, CloudFormation, ARM/Bicep)', 'Virtual Networks, VPC Peering & Security Groups', 'Serverless Compute (AWS Lambda, Azure Functions) & Storage Tiers'];
    processSkills = ['FinOps Cloud Cost Optimization & Budget Tracking', 'Well-Architected Framework Best Practices', 'Zero-Trust Cloud Governance & IAM Controls'];
    tools = ['AWS Management Console / CLI', 'Microsoft Azure Portal', 'Google Cloud Platform', 'Terraform', 'Docker', 'CloudWatch / Azure Monitor'];
    keywords = [
      { keyword: 'Cloud Infrastructure Architecture (AWS/Azure/GCP)', priority: 'High' },
      { keyword: 'Terraform & Infrastructure as Code (IaC)', priority: 'High' },
      { keyword: 'IAM Security & VPC Networking', priority: 'High' },
      { keyword: 'FinOps & Cloud Cost Optimization', priority: 'Medium' }
    ];
  }
  // 5. Cybersecurity, GRC & Security Operations
  else if (domainId === 'cybersecurity' || domainId.includes('security')) {
    techSkills = ['SIEM Threat Detection & Log Analysis (Splunk, Microsoft Sentinel)', 'Vulnerability Assessment & Penetration Testing (Nessus, Burp Suite)', 'Identity & Access Management (IAM, MFA, SSO, Zero Trust)', 'Incident Response & Digital Forensics (DFIR)'];
    processSkills = ['ISO/IEC 27001 & SOC 2 Compliance Frameworks', 'NIST Cybersecurity Framework (CSF) Alignment', 'Threat Triage, Containment & Forensic Reporting'];
    tools = ['Splunk Enterprise Security', 'Microsoft Sentinel', 'Wireshark', 'Burp Suite Pro', 'CrowdStrike Falcon / Defender for Endpoint', 'Nessus Vulnerability Scanner'];
    keywords = [
      { keyword: 'SOC Threat Monitoring & SIEM', priority: 'High' },
      { keyword: 'CompTIA Security+ / CISSP', priority: 'High' },
      { keyword: 'Incident Response & DFIR', priority: 'High' },
      { keyword: 'Zero Trust & Vulnerability Management', priority: 'Medium' }
    ];
  }
  // 6. Software Development
  else if (domainId === 'software-dev' || domainId.includes('dev')) {
    techSkills = ['Modern Programming Languages (JavaScript/TypeScript, Python, Java, Go, C#)', 'RESTful API & GraphQL Backend Architecture', 'Database Design & ORM Query Optimization (PostgreSQL, MongoDB)', 'Data Structures, Algorithms & Design Patterns'];
    processSkills = ['Agile Scrum Ceremonies & Sprint Estimations', 'Code Review, PR Lifecycle & Git Branching Strategies', 'Test-Driven Development (TDD) & Clean Architecture'];
    tools = ['Node.js / Express / Next.js', 'React / Angular / Vue', 'PostgreSQL / MongoDB', 'Git & GitHub Actions', 'Postman API Testing', 'Docker Containers'];
    keywords = [
      { keyword: 'Full-Stack / Backend Engineering', priority: 'High' },
      { keyword: 'REST APIs & Microservices', priority: 'High' },
      { keyword: 'Database Modeling & SQL/NoSQL', priority: 'High' },
      { keyword: 'GitOps & CI/CD Pipelines', priority: 'Medium' }
    ];
  }
  // 7. QA & Testing
  else if (domainId === 'qa-testing' || domainId.includes('testing')) {
    techSkills = ['Test Automation Frameworks (Selenium, Cypress, Playwright, Appium)', 'API Testing & Validation (Postman, RestAssured)', 'Performance & Load Testing (JMeter, k6)', 'SQL Querying for Test Data Verification'];
    processSkills = ['ISTQB Test Case Authoring & Defect Lifecycle Management', 'Agile Acceptance Criteria & BDD (Cucumber/Gherkin)', 'Regression & Exploratory Testing Strategies'];
    tools = ['Playwright / Cypress', 'Selenium WebDriver', 'Postman', 'Jira / Xray', 'Apache JMeter', 'Git / GitHub CI'];
    keywords = [
      { keyword: 'Test Automation (Playwright/Selenium)', priority: 'High' },
      { keyword: 'API & Performance Testing', priority: 'High' },
      { keyword: 'ISTQB Certified Methodologies', priority: 'High' },
      { keyword: 'CI/CD Regression Testing', priority: 'Medium' }
    ];
  }
  // 8. DevOps & SRE
  else if (domainId === 'devops-sre' || domainId.includes('devops')) {
    techSkills = ['Container Orchestration (Kubernetes, Docker)', 'CI/CD Pipeline Automation (GitHub Actions, GitLab CI, Jenkins)', 'Infrastructure as Code (Terraform, Ansible)', 'Observability & Metrics (Prometheus, Grafana, OpenTelemetry)'];
    processSkills = ['Site Reliability Engineering (SLI, SLO, SLA, Error Budgets)', 'GitOps Workflow & Automated Deployment Strategies', 'Blameless Post-Mortems & Incident Response'];
    tools = ['Kubernetes (K8s)', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus & Grafana', 'ArgoCD'];
    keywords = [
      { keyword: 'Kubernetes (CKA) & Containers', priority: 'High' },
      { keyword: 'CI/CD Pipeline Engineering', priority: 'High' },
      { keyword: 'Terraform & GitOps IaC', priority: 'High' },
      { keyword: 'Observability (Prometheus/Grafana)', priority: 'Medium' }
    ];
  }
  // 9. Data, Analytics & BI
  else if (domainId === 'data-analytics' || domainId.includes('analytics')) {
    techSkills = ['Advanced SQL Querying, Window Functions & CTEs', 'Data Visualization & Dashboard Engineering (Power BI, Tableau)', 'Data Modeling (Star/Snowflake Schema, DAX)', 'Python / R for Exploratory Data Analysis (Pandas, NumPy)'];
    processSkills = ['Business Metric Definition & KPI Alignment', 'Data Cleaning & Transformation Quality Assurance', 'Executive Stakeholder Storytelling & Presentation'];
    tools = ['Microsoft Power BI', 'Tableau', 'SQL Server / PostgreSQL', 'Python (Pandas, Jupyter)', 'Excel Advanced (Power Query)', 'dbt / Snowflake'];
    keywords = [
      { keyword: 'Power BI & Tableau Dashboarding', priority: 'High' },
      { keyword: 'Advanced SQL Data Modeling', priority: 'High' },
      { keyword: 'Business Intelligence & DAX', priority: 'High' },
      { keyword: 'KPI Storytelling & Analytics', priority: 'Medium' }
    ];
  }
  // 10. Data Science & AI
  else if (domainId === 'data-science-ai' || domainId.includes('ai') || domainId.includes('data-science')) {
    techSkills = ['Machine Learning Algorithms (Regression, Classification, Clustering, XGBoost)', 'Deep Learning & Neural Networks (PyTorch, TensorFlow)', 'Generative AI, LLMs, Prompt Engineering & RAG Architectures', 'Feature Engineering, MLflow & MLOps Pipelines'];
    processSkills = ['Hypothesis Testing & Statistical Validation', 'Model Evaluation (Precision, Recall, F1, ROC-AUC)', 'Responsible AI & Data Privacy Ethics'];
    tools = ['Python (Scikit-Learn, PyTorch, Pandas)', 'Jupyter Notebooks', 'LangChain / LlamaIndex', 'Hugging Face Transformers', 'MLflow / Kubeflow', 'Databricks'];
    keywords = [
      { keyword: 'Machine Learning & PyTorch', priority: 'High' },
      { keyword: 'Generative AI, LLMs & RAG', priority: 'High' },
      { keyword: 'MLOps Pipeline Deployment', priority: 'High' },
      { keyword: 'Statistical Data Science', priority: 'Medium' }
    ];
  }
  // 11. Database Administration
  else if (domainId === 'db-admin' || domainId.includes('database')) {
    techSkills = ['RDBMS Administration (Oracle, PostgreSQL, MySQL, SQL Server)', 'Database Clustering, High Availability & Replication', 'Query Optimization, Index Tuning & Execution Plan Audits', 'Backup Strategies, Point-in-Time Recovery (PITR) & Disaster Recovery'];
    processSkills = ['Database Capacity Planning & Storage Projections', 'Database Security, Encryption & User Privileges Audits', 'Production Maintenance Windows & Zero-Downtime Upgrades'];
    tools = ['Oracle Database / Enterprise Manager', 'PostgreSQL / pgAdmin', 'MySQL Workbench', 'SQL Server Management Studio (SSMS)', 'Snowflake', 'MongoDB'];
    keywords = [
      { keyword: 'Database Administration (DBA)', priority: 'High' },
      { keyword: 'Query Performance & Index Tuning', priority: 'High' },
      { keyword: 'High Availability & Replication', priority: 'High' },
      { keyword: 'Backup & Point-in-Time Recovery', priority: 'Medium' }
    ];
  }
  // 12. IT Operations & ITSM
  else if (domainId === 'it-ops-itsm' || domainId.includes('itsm')) {
    techSkills = ['ITSM Platform Administration & Workflow Configuration', 'CMDB Asset Mapping & Configuration Item (CI) Tracking', 'Monitoring & Event Management Integration', 'Automation Scripts for Operations Tasks'];
    processSkills = ['ITIL 4 Service Value System (Incident, Problem, Change)', 'SLA Governance, OLA Tracking & Metrics Reporting', 'Continuous Service Improvement (CSI) & RCA'];
    tools = ['ServiceNow Enterprise Suite', 'Jira Service Management', 'PagerDuty', 'BMC Helix', 'Splunk Observability', 'Microsoft 365 Admin'];
    keywords = [
      { keyword: 'ITIL 4 Service Management', priority: 'High' },
      { keyword: 'ServiceNow ITSM & CMDB', priority: 'High' },
      { keyword: 'Incident, Problem & Change Management', priority: 'High' },
      { keyword: 'SLA Governance & Operations', priority: 'Medium' }
    ];
  }
  // 13. ERP & CRM
  else if (domainId === 'erp-crm' || domainId.includes('erp') || domainId.includes('crm')) {
    techSkills = ['Salesforce Platform Configuration & Flow Automation', 'SAP S/4HANA Module Implementation (FICO, MM, SD)', 'Data Migration, ETL & Integration via REST/SOAP APIs', 'Role-Based Access Controls & Security Profiles'];
    processSkills = ['Enterprise Business Process Mapping (Order-to-Cash, Procure-to-Pay)', 'User Acceptance Testing (UAT) & Release Deployment', 'Functional Requirements Specification'];
    tools = ['Salesforce Lightning / Flow Builder', 'SAP S/4HANA / Fiori', 'ServiceNow', 'MuleSoft / Integration Middleware', 'Microsoft Dynamics 365', 'Data Loader'];
    keywords = [
      { keyword: 'Salesforce Admin & Architecture', priority: 'High' },
      { keyword: 'SAP S/4HANA ERP Modules', priority: 'High' },
      { keyword: 'Business Workflow Automation', priority: 'High' },
      { keyword: 'CRM/ERP Data Integration', priority: 'Medium' }
    ];
  }
  // 14. Project & Product Management
  else if (domainId === 'product-mgmt' || domainId.includes('product') || domainId.includes('project')) {
    techSkills = ['Product Roadmap Strategy & Backlog Prioritization', 'Agile Frameworks (Scrum, Kanban, SAFe)', 'Data-Driven Decision Making & Product Analytics', 'Risk Management, Budget Forecasting & Resource Allocation'];
    processSkills = ['Sprint Planning, Daily Standups, Reviews & Retrospectives', 'User Story Authoring with Acceptance Criteria', 'Cross-Functional Stakeholder Alignment & Executive Reporting'];
    tools = ['Jira Software / Confluence', 'Miro / Figma for Roadmapping', 'Monday.com / Asana', 'Mixpanel / Amplitude', 'Trello', 'Productboard'];
    keywords = [
      { keyword: 'Agile Scrum & Sprint Leadership', priority: 'High' },
      { keyword: 'Product Roadmap & Feature Strategy', priority: 'High' },
      { keyword: 'PMI PMP / Scrum PSM/PSPO', priority: 'High' },
      { keyword: 'Stakeholder & Release Management', priority: 'Medium' }
    ];
  }
  // 15. Business Analysis & Tech Consulting
  else if (domainId === 'business-analysis' || domainId.includes('consulting')) {
    techSkills = ['Business Process Modeling & Notation (BPMN)', 'Requirements Elicitation & Functional Specifications (BRD/FRD)', 'SQL Data Analysis & Process Flow Mapping', 'Gap Analysis & Feasibility Study Frameworks'];
    processSkills = ['BABOK v3 Business Analysis Methodology', 'Stakeholder Interviewing & Workshop Facilitation', 'User Story Mapping & Acceptance Testing Sign-off'];
    tools = ['Jira / Confluence', 'Microsoft Visio / Lucidchart', 'Power BI / Excel Advanced', 'Balsamiq Wireframing', 'SQL Client', 'Enterprise Architect'];
    keywords = [
      { keyword: 'Business Analysis (IIBA BABOK / CBAP)', priority: 'High' },
      { keyword: 'BPMN Process Modeling & BRD/FRD', priority: 'High' },
      { keyword: 'Agile User Stories & Requirements', priority: 'High' },
      { keyword: 'Gap Analysis & Solution Consulting', priority: 'Medium' }
    ];
  }
  // 16. UI/UX & Design
  else if (domainId === 'uiux-design' || domainId.includes('ui') || domainId.includes('ux')) {
    techSkills = ['Wireframing & Interactive Prototyping (Figma, Adobe XD)', 'User Research, Persona Development & Usability Testing', 'Design Systems, Component Libraries & Token Architecture', 'Accessibility Standards (WCAG 2.1 AA/AAA) & Responsive Layouts'];
    processSkills = ['Double Diamond Design Thinking Process', 'Usability Heuristic Evaluations', 'Developer Handoff & UI Quality Assurance'];
    tools = ['Figma', 'Adobe Creative Cloud (XD, Photoshop, Illustrator)', 'Miro / FigJam', 'Maze / UsabilityHub', 'Zeplin / Storybook', 'Webflow'];
    keywords = [
      { keyword: 'UI/UX Design Systems (Figma)', priority: 'High' },
      { keyword: 'User Research & Usability Testing', priority: 'High' },
      { keyword: 'WCAG Accessibility & Wireframing', priority: 'High' },
      { keyword: 'Design Thinking & Prototyping', priority: 'Medium' }
    ];
  }
  // 17. Web & CMS
  else if (domainId === 'web-cms' || domainId.includes('web')) {
    techSkills = ['Frontend Web Technologies (HTML5, CSS3, JavaScript, Tailwind)', 'CMS Platform Development (WordPress, Shopify, Webflow, Drupal)', 'Technical SEO, Core Web Vitals & PageSpeed Optimization', 'Headless CMS Architecture & REST/GraphQL API Integrations'];
    processSkills = ['Cross-Browser & Mobile Responsive Testing', 'Content Publishing Workflows & Editorial Governance', 'Website Security, SSL & CDN Configuration'];
    tools = ['WordPress / Gutenberg', 'Shopify Liquid / Admin', 'Google Analytics 4 & Search Console', 'GitHub / Vercel', 'VS Code', 'Yoast SEO'];
    keywords = [
      { keyword: 'WordPress & Shopify Development', priority: 'High' },
      { keyword: 'Technical SEO & Core Web Vitals', priority: 'High' },
      { keyword: 'HTML5/CSS3/JavaScript', priority: 'High' },
      { keyword: 'Headless CMS & Web Platforms', priority: 'Medium' }
    ];
  }
  // 18. Automation & RPA
  else if (domainId === 'automation-rpa' || domainId.includes('rpa')) {
    techSkills = ['RPA Bot Architecture & Development (UiPath, Automation Anywhere, Power Automate)', 'Web & Desktop Automation Selectors, Regex & OCR', 'API Integration, Webhooks & Data Transformation', 'Exception Handling, Bot Scheduling & Queue Management'];
    processSkills = ['Process Definition Document (PDD) & Solution Design Document (SDD)', 'ROI Calculation & Process Feasibility Assessment', 'Bot Deployment Lifecycle & Maintenance Governance'];
    tools = ['UiPath Studio & Orchestrator', 'Microsoft Power Automate Desktop', 'Automation Anywhere A360', 'Python Automation (Playwright/BeautifulSoup)', 'n8n / Zapier', 'OCR Engines (ABBYY, Tesseract)'];
    keywords = [
      { keyword: 'UiPath & Power Automate RPA', priority: 'High' },
      { keyword: 'Bot Orchestration & Automation', priority: 'High' },
      { keyword: 'PDD/SDD Process Documentation', priority: 'High' },
      { keyword: 'API & Low-Code Workflow Design', priority: 'Medium' }
    ];
  }
  // 19. Technical Writing
  else if (domainId === 'tech-writing' || domainId.includes('writing')) {
    techSkills = ['Developer Documentation & API Reference Authoring (OpenAPI/Swagger, Markdown)', 'Static Site Generators (Docusaurus, MkDocs, Hugo, GitBook)', 'Information Architecture & Topic-Based Authoring (DITA XML)', 'Version Control for Documentation (Docs-as-Code, Git)'];
    processSkills = ['Documentation Review Cycles with Subject Matter Experts (SMEs)', 'Style Guide Enforcement (Microsoft/Google Developer Documentation Style)', 'User Feedback Analysis & Content Maintenance'];
    tools = ['Markdown / MDX', 'Swagger / Postman API Docs', 'Docusaurus / MkDocs', 'Git & GitHub', 'Snagit / Adobe Illustrator', 'Grammarly / Vale'];
    keywords = [
      { keyword: 'API Documentation & Swagger/OpenAPI', priority: 'High' },
      { keyword: 'Docs-as-Code & Markdown/Docusaurus', priority: 'High' },
      { keyword: 'Technical Writing & Style Guides', priority: 'High' },
      { keyword: 'Knowledge Base & SME Collaboration', priority: 'Medium' }
    ];
  }
  // 20. Sales Engineering & Customer Success
  else if (domainId === 'sales-customer-success' || domainId.includes('sales')) {
    techSkills = ['Technical Solution Architecture & Proof of Concept (PoC) Delivery', 'Enterprise Software Demonstrations & Competitive Positioning', 'Customer Onboarding, Technical Enablement & API Guidance', 'Health Score Analytics & Retention Risk Identification'];
    processSkills = ['Pre-Sales Discovery & Value Proposition Alignment', 'Quarterly Business Reviews (QBRs) & Executive Presentations', 'Customer Journey Mapping & Escalation Management'];
    tools = ['Salesforce CRM', 'Gainsight Customer Success Platform', 'Postman API Demonstrations', 'Jira / Confluence', 'Zoom / Microsoft Teams', 'Loom / Demo Automation'];
    keywords = [
      { keyword: 'Pre-Sales Solutions Engineering', priority: 'High' },
      { keyword: 'Technical Demos & PoC Delivery', priority: 'High' },
      { keyword: 'Customer Success & Retention Strategy', priority: 'High' },
      { keyword: 'Cloud & API Integration Consulting', priority: 'Medium' }
    ];
  }
  // 21. Hardware & IoT
  else if (domainId === 'hardware-iot' || domainId.includes('hardware') || domainId.includes('iot')) {
    techSkills = ['Embedded C/C++ Programming & RTOS (FreeRTOS, Zephyr)', 'Microcontroller Platforms (ARM Cortex, ESP32, STM32, Arduino)', 'Hardware Communication Protocols (I2C, SPI, UART, CAN, BLE, Zigbee)', 'PCB Schematic Design, Layout & Soldering (KiCad, Altium)'];
    processSkills = ['Hardware Prototype Testing & Oscilloscope Diagnostics', 'Firmware Versioning & Over-The-Air (OTA) Update Management', 'EMI/EMC Compliance & Quality Standards'];
    tools = ['Altium Designer / KiCad', 'Embedded C/C++', 'Keil uVision / STM32CubeIDE', 'Logic Analyzers & Oscilloscopes', 'FreeRTOS', 'MQTT / AWS IoT Core'];
    keywords = [
      { keyword: 'Embedded C/C++ & Microcontrollers', priority: 'High' },
      { keyword: 'IoT Protocols (MQTT/BLE/UART)', priority: 'High' },
      { keyword: 'PCB Design & Hardware Debugging', priority: 'High' },
      { keyword: 'RTOS & Firmware Architecture', priority: 'Medium' }
    ];
  }
  // 22. Telecom & Voice
  else if (domainId === 'telecom-voice' || domainId.includes('telecom') || domainId.includes('voice')) {
    techSkills = ['VoIP & SIP Protocol Signaling (Session Initiation Protocol, RTP, SDP)', 'Enterprise Telephony Platforms (Cisco Unified Communications Manager - CUCM, Avaya)', 'Microsoft Teams Voice & Zoom Phone Administration', 'Session Border Controllers (SBC) Configuration & Quality of Service (QoS)'];
    processSkills = ['Telecom Carrier Trunk Management & Number Portability', 'Call Quality Diagnostics (MOS Scores, Jitter, Packet Loss)', 'Telephony Maintenance & E911 Compliance'];
    tools = ['Cisco CUCM / Unity Connection', 'AudioCodes / Ribbon SBCs', 'Microsoft Teams Admin Center', 'Zoom Phone Management Portal', 'Wireshark Voice Analysis', 'SIP Workbench'];
    keywords = [
      { keyword: 'VoIP & SIP Protocol Engineering', priority: 'High' },
      { keyword: 'Cisco CUCM & Collaboration', priority: 'High' },
      { keyword: 'Microsoft Teams & Zoom Phone Voice', priority: 'High' },
      { keyword: 'Session Border Controllers (SBC) & QoS', priority: 'Medium' }
    ];
  }
  // 23. Governance, Risk, Compliance & Audit
  else if (domainId === 'governance-audit' || domainId.includes('grc') || domainId.includes('governance')) {
    techSkills = ['IT General Controls (ITGC) Testing & SOX 404 IT Audits', 'Information Security Standards (ISO/IEC 27001, SOC 2 Type II, NIST 800-53)', 'Privacy Regulations Compliance (GDPR, HIPAA, India DPDPA 2023)', 'Third-Party Vendor Risk Assessment & Continuous Monitoring'];
    processSkills = ['Enterprise Risk Management (ERM) Framework Implementation', 'Audit Planning, Sampling & Management Evidence Workpapers', 'Corrective Action Plan (CAP) Tracking & Policy Governance'];
    tools = ['ServiceNow GRC / MetricStream', 'AuditBoard / OneTrust', 'Microsoft Purview Compliance Manager', 'Excel Advanced Audit Workbooks', 'Jira Compliance', 'Vanta / Drata'];
    keywords = [
      { keyword: 'ISACA CISA / CISM Audit', priority: 'High' },
      { keyword: 'ISO 27001 & SOC 2 Compliance', priority: 'High' },
      { keyword: 'IT General Controls (ITGC) & SOX', priority: 'High' },
      { keyword: 'Data Privacy & Vendor Risk Management', priority: 'Medium' }
    ];
  }
  // 24. Technology Architecture
  else if (domainId === 'architecture') {
    techSkills = ['Enterprise Architecture Frameworks (TOGAF 10th Ed, Zachman)', 'Cloud & Hybrid Distributed Systems Architecture', 'Application Modernization, Microservices & Event-Driven Design', 'Technology Portfolio Evaluation & Vendor Roadmap Selection'];
    processSkills = ['Architecture Review Board (ARB) Governance & Standards', 'Target State Architecture & Technology Migration Roadmaps', 'Business Capabilities Mapping & Technical Debt Management'];
    tools = ['ArchiMate / Enterprise Architect', 'AWS / Azure Architecture Diagrams', 'Lucidchart / Miro', 'Confluence Architecture Repositories', 'LeanIX', 'Cloudcraft'];
    keywords = [
      { keyword: 'TOGAF Enterprise Architecture', priority: 'High' },
      { keyword: 'Cloud & Distributed Systems Design', priority: 'High' },
      { keyword: 'Architecture Review Board (ARB)', priority: 'High' },
      { keyword: 'Microservices & Modernization Strategy', priority: 'Medium' }
    ];
  }
  // 25. Executive Leadership
  else if (domainId === 'executive') {
    techSkills = ['Enterprise Technology Strategy & Digital Transformation Leadership', 'Cybersecurity Governance, Zero-Trust Posture & Resilience', 'Global IT Budgeting, Capex/Opex Optimization & Vendor Negotiations', 'AI Adoption Strategy, Ethics & Corporate Governance'];
    processSkills = ['Board-Level Executive Communication & Risk Reporting', 'Talent Acquisition, Leadership Mentorship & Culture Building', 'Cross-Functional Business Unit Strategy Alignment'];
    tools = ['Executive KPI Dashboards', 'ServiceNow Executive Insights', 'Jira Portfolio / Advanced Roadmaps', 'Power BI Executive Portals', 'Microsoft 365 Enterprise'];
    keywords = [
      { keyword: 'Executive Technology Leadership (CIO/CTO/CISO)', priority: 'High' },
      { keyword: 'Digital Transformation & Strategic Roadmaps', priority: 'High' },
      { keyword: 'IT Budgeting & Board-Level Governance', priority: 'High' },
      { keyword: 'Enterprise Cybersecurity & AI Strategy', priority: 'Medium' }
    ];
  }
  // 26. Green Computing
  else if (domainId === 'green-computing') {
    techSkills = ['Carbon Accounting Standards (GHG Protocol Scope 3)', 'Hardware Energy Telemetry (RAPL, Scaphandre)', 'Cloud Carbon Optimization Tools (Infracost, AWS Carbon Footprint Tool)', 'Carbon-Aware Software Engineering Principles'];
    processSkills = ['Green IT Lifecycle & E-Waste Governance', 'Sustainable Procurement Metrics', 'Agile Energy Reporting Frameworks'];
    tools = ['Scaphandre', 'Infracost', 'Kepler (Kubernetes Efficient Power Exporter)', 'Carbon Aware SDK', 'Cloud Carbon Footprint Tool'];
    keywords = [
      { keyword: 'Green Software & Carbon Accounting', priority: 'High' },
      { keyword: 'Sustainable IT Infrastructure', priority: 'High' },
      { keyword: 'Energy Telemetry Audits', priority: 'High' },
      { keyword: 'Green Software Foundation (GSF)', priority: 'Medium' }
    ];
  }

  return {
    tech: techSkills,
    process: processSkills,
    tools,
    keywords,
    interview: interviewTopics
  };
}

// Generates compliant fallbacks for the other roles to ensure no runtime crashes
export const ALL_ROLES_DATA: Record<string, RoleDetail> = { ...ROLES_DATA };

const FALLBACK_ROLES_LIST = [
  // 1. IT Support, Service Desk & End-User Computing
  { id: 'service-desk-analyst', title: 'Service Desk Analyst', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: true, indiaSalary: '₹3L - ₹5L', globalSalary: '$40,000 - $60,000' },
  { id: 'technical-support-specialist', title: 'Technical Support Specialist', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: true, indiaSalary: '₹3.5L - ₹6L', globalSalary: '$45,000 - $70,000' },
  { id: 'application-support-analyst', title: 'Application Support Analyst', domain: 'IT Support & Service Desk', level: 'Mid-level', isCoding: false, isHighPaying: false, isRemote: true, indiaSalary: '₹4.5L - ₹8L', globalSalary: '$55,000 - $85,000' },
  { id: 'it-support-trainee', title: 'IT Support Trainee', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: false, indiaSalary: '₹2.5L - ₹4L', globalSalary: '$35,000 - $48,000' },
  { id: 'it-support-intern', title: 'IT Support Intern', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: true, indiaSalary: '₹1.8L - ₹3L', globalSalary: '$30,000 - $40,000' },
  { id: 'help-desk-technician', title: 'Help Desk Technician', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: true, indiaSalary: '₹2.8L - ₹5L', globalSalary: '$38,000 - $55,000' },
  { id: 'desktop-support-technician', title: 'Desktop Support Technician', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: false, indiaSalary: '₹3L - ₹5L', globalSalary: '$40,000 - $58,000' },
  { id: 'technical-support-associate', title: 'Technical Support Associate', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: true, indiaSalary: '₹3L - ₹5.5L', globalSalary: '$42,000 - $60,000' },
  { id: 'field-support-technician', title: 'Field Support Technician', domain: 'IT Support & Service Desk', level: 'Entry-level', isCoding: false, isHighPaying: false, isRemote: false, indiaSalary: '₹2.8L - ₹5L', globalSalary: '$40,000 - $55,000' }
];

FALLBACK_ROLES_LIST.forEach((fallback) => {
  if (!ALL_ROLES_DATA[fallback.id]) {
    const isAdvNode = fallback.level === 'Advanced';
    const isMidNode = fallback.level === 'Mid-level';
    const profile = getDomainRoleProfile('it-support', fallback.id, fallback.level as any, fallback.isCoding, fallback.title, fallback.domain);
    const certs = getDomainRoleCertifications('it-support', fallback.id, fallback.level as any);

    ALL_ROLES_DATA[fallback.id] = {
      id: fallback.id,
      title: fallback.title,
      domain: fallback.domain,
      level: fallback.level as any,
      isCoding: fallback.isCoding,
      isHighPaying: fallback.isHighPaying,
      isRemote: fallback.isRemote,
      indiaSalary: fallback.indiaSalary,
      globalSalary: fallback.globalSalary,
      historyFuture: {
        history: `Historically, the ${fallback.title} role emerged as organizations formalized support tiers to maintain continuous enterprise uptime.`,
        future: `In the coming years, the ${fallback.title} will transition to integrate heavily with automated AI operations, low-code systems, and secure cloud endpoints.`
      },
      roleAsk: {
        explanation: `Responsible for managing, maintaining, and supporting the primary systems, applications, or analytics configurations associated with the ${fallback.domain} division.`,
        suitableFor: `Excellent for individuals who enjoy structured technology workflows, targeted problem solving, and looking to progress quickly inside ${fallback.domain}.`
      },
      mustHaves: {
        tech: profile.tech,
        process: profile.process
      },
      cherries: ['Basic scripting in Python/Bash', 'Continuous delivery & cloud administration basics'],
      recommendedCertifications: certs,
      toolsToLearn: profile.tools,
      interviewTopics: profile.interview,
      resumeKeywords: profile.keywords,
      upskillingPath: [
        `Understand core operations and system structures in ${fallback.domain}.`,
        'Acquire foundational platform or cloud administrator certificates.',
        'Complete interactive virtual laboratories or practice projects.',
        'Prepare clean resume summaries listing key tools and process skills.',
        'Actively practice scenario-based mock interviews.'
      ],
      nextCareerMoves: isAdvNode ? ['Enterprise Architect', 'Operations Director'] : isMidNode ? ['Lead Operations Analyst', 'SRE Associate'] : ['Lead Support Engineer', 'Cloud Engineer'],
      marketDemandSignal: {
        index: fallback.isHighPaying ? 'High Demand' : 'Medium Demand',
        percentStat: `Enterprise tools appear in 55% of active ${fallback.title} job descriptions.`
      },
      nationalInfluence: 'Strong national influence across metropolitan cities with major offshore software complexes.',
      companiesHiring: ['Wipro', 'Infosys', 'Cognizant', 'Deloitte', 'HP Systems', 'Google Cloud']
    };
  }
});

IT_DOMAINS.forEach((domain) => {
  domain.roles.forEach((roleId) => {
    if (!ALL_ROLES_DATA[roleId]) {
      const title = roleId
        .split('-')
        .map(word => {
          if (word === 'it' || word === 'itsm' || word === 'rpa' || word === 'dba' || word === 'crm' || word === 'erp' || word === 'sap' || word === 'seo' || word === 'bi' || word === 'sdk' || word === 'vpc' || word === 'noc' || word === 'sox' || word === 'grc' || word === 'sla' || word === 'ui' || word === 'ux') {
            return word.toUpperCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');

      let level: 'Entry-level' | 'Mid-level' | 'Advanced' = 'Mid-level';
      const rLower = roleId.toLowerCase();

      const isAbsoluteEntry = rLower.includes('intern') || rLower.includes('trainee') || rLower.includes('apprentice') || rLower.includes('cadet') || rLower.includes('helper');
      const isAbsoluteAdvanced = rLower.includes('vp') || rLower.includes('chief') || rLower.includes('director') || rLower.includes('executive') || rLower.includes('head') || rLower.startsWith('vp-');

      if (isAbsoluteAdvanced) {
        level = 'Advanced';
      } else if (isAbsoluteEntry) {
        level = 'Entry-level';
      } else if (
        rLower.includes('associate') || 
        rLower.includes('assistant') || 
        rLower.includes('junior') ||
        rLower.startsWith('tech-') ||
        rLower === 'tech'
      ) {
        level = 'Entry-level';
      } else if (
        rLower.includes('senior') || 
        rLower.includes('lead') || 
        rLower.includes('principal') || 
        rLower.includes('architect') || 
        rLower.includes('manager') || 
        rLower.includes('staff')
      ) {
        level = 'Advanced';
      }

      const isCoding = rLower.includes('dev') || rLower.includes('engineer') || rLower.includes('programmer') || rLower.includes('software') || rLower.includes('sdet') || rLower.includes('firmware') || rLower.includes('codec');
      const isHighPaying = level === 'Advanced';
      const isRemote = !rLower.includes('hardware') && !rLower.includes('field') && !rLower.includes('embedded') && !rLower.includes('physical');

      let indiaSalary = '₹5L - ₹10L';
      let globalSalary = '$65,000 - $95,000';
      if (level === 'Entry-level') {
        indiaSalary = '₹3L - ₹5.5L';
        globalSalary = '$42,000 - $65,000';
      } else if (level === 'Advanced') {
        indiaSalary = '₹12L - ₹24L';
        globalSalary = '$110,000 - $175,000';
      }

      const certs = getDomainRoleCertifications(domain.id, roleId, level);
      const profile = getDomainRoleProfile(domain.id, roleId, level, isCoding, title, domain.name);

      ALL_ROLES_DATA[roleId] = {
        id: roleId,
        title,
        domain: domain.name,
        level,
        isCoding,
        isHighPaying,
        isRemote,
        indiaSalary,
        globalSalary,
        historyFuture: {
          history: `Historically, the ${title} role emerged within ${domain.name} as organizations scaled their IT architectures and specialized process roles to maintain systemic robustness.`,
          future: `In the near future, the ${title} will evolve to lead AI integrations, oversee zero-trust security postures, and build automated process sequences within their systems.`
        },
        roleAsk: {
          explanation: `Responsible for managing, maintaining, and developing the critical technical configurations, process models, or development workflows of the ${title} domain.`,
          suitableFor: `Excellent for individuals aiming to develop expertise in ${domain.name}, combining analytical focus with structured IT process solutions.`
        },
        mustHaves: {
          tech: profile.tech.length > 0 ? profile.tech : [
            isCoding ? 'Core coding or scripting proficiency' : 'Configuration management standards',
            'Relational database querying & data processing structures',
            'Standard troubleshooting or analytics tools'
          ],
          process: profile.process
        },
        cherries: ['System scripting (Python/Bash) basics', 'Continuous deployment pipelines awareness', 'Cloud platform certifications'],
        recommendedCertifications: certs,
        toolsToLearn: profile.tools,
        interviewTopics: profile.interview,
        resumeKeywords: profile.keywords,
        upskillingPath: [
          `Learn foundational concepts and architectures of ${domain.name}.`,
          `Acquire relevant credentials (${certs[0]?.name || 'Domain Certification'}) and master core toolsets.`,
          'Build personal laboratory projects and simulate real-world configurations.',
          'Optimize your portfolio and CV with technical keywords.',
          'Prepare for specialized technical and situational interview rounds.'
        ],
        nextCareerMoves: level === 'Advanced' ? ['Enterprise Technical Lead', 'Director of Systems'] : ['Senior Specialist', 'Systems Team Lead'],
        marketDemandSignal: {
          index: isHighPaying ? 'High Demand' : 'Medium Demand',
          percentStat: `Required in approximately 45% of ${domain.name} enterprise job specifications.`
        },
        nationalInfluence: 'Strongly integrated across India\'s metropolitan IT hubs and global captive resource centers.',
        companiesHiring: ['Wipro', 'Infosys', 'TCS', 'Accenture', 'Cognizant', 'Deloitte']
      };
    }
  });
});

// Deterministically jumble the domain categories so that IT Support is not consistently first in any tab/list.
const JUMBLED_IDS = [
  "green-computing",
  "software-dev",
  "cybersecurity",
  "cloud",
  "devops-sre",
  "systems-infra",
  "networking",
  "data-science-ai",
  "db-admin",
  "qa-testing",
  "product-mgmt",
  "business-analysis",
  "it-support",
  "it-ops-itsm",
  "data-analytics",
  "erp-crm",
  "uiux-design",
  "web-cms",
  "automation-rpa"
];

IT_DOMAINS.sort((a, b) => {
  const indexA = JUMBLED_IDS.indexOf(a.id);
  const indexB = JUMBLED_IDS.indexOf(b.id);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
});

// Support dynamic permanent saving of custom job roles and job domains
if (typeof window !== 'undefined') {
  try {
    const storedDomainsStr = localStorage.getItem('mapit_synced_custom_domains');
    if (storedDomainsStr) {
      const parsedDomains = JSON.parse(storedDomainsStr);
      if (Array.isArray(parsedDomains)) {
        parsedDomains.forEach((d: Domain) => {
          if (!IT_DOMAINS.some(existing => existing.id === d.id)) {
            IT_DOMAINS.push({
              id: d.id,
              name: d.name,
              description: d.description,
              color: d.color || '#ec4899',
              roles: d.roles || []
            });
          }
        });
      }
    }

    const storedRolesStr = localStorage.getItem('mapit_synced_custom_roles');
    if (storedRolesStr) {
      const parsedRoles = JSON.parse(storedRolesStr);
      if (Array.isArray(parsedRoles)) {
        parsedRoles.forEach((role: any) => {
          // Normalize properties to match RoleDetail interface
          const normalizedRole: RoleDetail = {
            id: role.id,
            title: role.title || role.name,
            domain: role.domain,
            level: role.level || 'Mid-level',
            isCoding: role.isCoding !== undefined ? role.isCoding : true,
            isHighPaying: role.isHighPaying !== undefined ? role.isHighPaying : true,
            isRemote: role.isRemote !== undefined ? role.isRemote : true,
            indiaSalary: role.indiaSalary || '₹8L - ₹15L',
            globalSalary: role.globalSalary || '$85,000 - $130,000',
            historyFuture: role.historyFuture || {
              history: `Historically, the ${role.title || role.name} emerged to cater to active IT engineering expansions.`,
              future: `In the near future, practitioners of ${role.title || role.name} will heavily align workflows with dynamic AI integration nodes.`
            },
            roleAsk: role.roleAsk || {
              explanation: role.explanation || `Focuses on developing, administering, and monitoring active system integrations utilizing target tools.`,
              suitableFor: `Ideal for technology enthusiasts looking to dive deeper into practical IT deployments.`
            },
            mustHaves: role.mustHaves || {
              tech: ['Key diagnostic scripting', 'Database query metrics', 'Systems automation frameworks'],
              process: ['SLA requirements governance', 'Agile sprint feedback interaction']
            },
            cherries: role.cherries || ['Continuous integration models', 'Cloud deployment architecture basics'],
            recommendedCertifications: role.recommendedCertifications || [
              { name: 'CompTIA Network+ or Cloud Foundation', level: 'Beginner', status: 'Required', resourceUrl: '#', costEstimate: 'Free/Subscription' }
            ],
            toolsToLearn: role.toolsToLearn || ['Jira Portal', 'GitHub Versioning Control', 'Enterprise Client Dashboard'],
            interviewTopics: role.interviewTopics || {
              technical: ['Describe standard troubleshooting steps under this paradigm.', 'How do you structure API configurations?'],
              scenario: ['A critical service goes down during an analytics reload. How do you isolate the error?', 'Aligning teammate conflicting opinions.'],
              hr: ['Why are you looking to specialize in this role?', 'Prioritization under high-pressure ticket arrivals.']
            },
            resumeKeywords: role.resumeKeywords || [
              { keyword: role.title || 'Systems Specialty', priority: 'High' },
              { keyword: 'IT Infrastructure Integration', priority: 'High' }
            ],
            upskillingPath: role.upskillingPath || [
              'Understand key architectures and flow systems.',
              'Study target tools and complete lab prototypes.',
              'Implement automated feedback loops and error isolation.'
            ],
            nextCareerMoves: role.nextCareerMoves || ['Senior Enterprise Architect', 'Principal Operations Director'],
            marketDemandSignal: role.marketDemandSignal || {
              index: 'High Demand',
              percentStat: 'Appears in 45% of active specialist postings.'
            },
            nationalInfluence: role.nationalInfluence || 'Recognized widely across regional technical complexes and hub operations.',
            companiesHiring: role.companiesHiring || ['Accenture', 'Infosys', 'Wipro', 'Cognizant', 'TCS']
          };

          ALL_ROLES_DATA[normalizedRole.id] = normalizedRole;

          // Align domain roles mapping
          const matchedDomain = IT_DOMAINS.find(d => 
            d.name.toLowerCase().includes(normalizedRole.domain.toLowerCase()) || 
            d.id === normalizedRole.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')
          );
          if (matchedDomain) {
            if (!matchedDomain.roles.includes(normalizedRole.id)) {
              matchedDomain.roles.push(normalizedRole.id);
            }
          } else {
            // Create a general category domain if it doesn't match any existing domain name or ID
            const newDomainId = normalizedRole.domain.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const newlyCreatedDomain: Domain = {
              id: newDomainId,
              name: normalizedRole.domain,
              description: `Living synced directory domain focusing on specialized technologies.`,
              color: '#d946ef',
              roles: [normalizedRole.id]
            };
            IT_DOMAINS.push(newlyCreatedDomain);
          }
        });
      }
    }
  } catch (e) {
    console.error("Dynamic roles load error:", e);
  }
}


