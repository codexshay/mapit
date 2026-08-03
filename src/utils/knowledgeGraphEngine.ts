import masterKeywordData from '../data/generated/master-keyword-index.json';

export interface ConceptCluster {
  id: string;
  primaryTitle: string;
  synonymRoles: string[];
  associatedSkillsAndTools: string[];
  roleSlugs: string[];
  domains: string[];
}

const KNOWLEDGE_GRAPH_CLUSTERS: ConceptCluster[] = [
  {
    id: "it-support-cluster",
    primaryTitle: "Technical Support / IT Support / Help Desk",
    synonymRoles: [
      "technical support", "it support", "help desk", "service desk", "desktop support", 
      "support technician", "euc", "end user computing", "it support analyst", "desktop engineer", 
      "field support", "it technician", "customer support engineer", "it customer service"
    ],
    associatedSkillsAndTools: [
      "active directory", "servicenow", "microsoft intune", "sccm", "mecm", "powershell", 
      "event viewer", "device manager", "disk management", "remote desktop", "teamviewer", 
      "anydesk", "windows 11", "m365 admin", "outlook", "teams", "zendesk", "jira service management",
      "freshservice", "dhcp", "dns", "ping", "traceroute", "bsod", "troubleshooting"
    ],
    roleSlugs: [
      "it-support-technician", "help-desk-analyst", "desktop-support-engineer", 
      "service-desk-analyst", "euc-engineer", "field-support-technician"
    ],
    domains: [
      "IT Support", "Help Desk", "Desktop Support", "Service Desk", "End User Computing", 
      "Operations & Support", "Technical Support"
    ]
  },
  {
    id: "sysadmin-cluster",
    primaryTitle: "System Administration & Infrastructure",
    synonymRoles: [
      "sysadmin", "system administrator", "systems administrator", "windows administrator", 
      "linux administrator", "server administrator", "infrastructure engineer", "systems engineer"
    ],
    associatedSkillsAndTools: [
      "windows server", "linux", "ubuntu", "red hat", "active directory", "group policy", 
      "gpo", "dns", "dhcp", "vmware", "vsphere", "hyper-v", "proxmox", "powershell", 
      "bash", "veeam", "zabbix", "nagios", "prtg", "azure monitor", "ansible"
    ],
    roleSlugs: [
      "system-administrator", "windows-administrator", "linux-administrator", 
      "server-administrator", "infrastructure-engineer"
    ],
    domains: [
      "System Administration", "Infrastructure", "Server Management", "Virtualization"
    ]
  },
  {
    id: "networking-cluster",
    primaryTitle: "Networking, NOC & Telecom",
    synonymRoles: [
      "network engineer", "noc analyst", "network administrator", "telecom engineer", 
      "voip engineer", "network security engineer", "network specialist"
    ],
    associatedSkillsAndTools: [
      "cisco", "ccna", "routers", "switches", "vlans", "ospf", "bgp", "nat", "pat", 
      "vpn", "wireshark", "solarwinds", "prtg", "fortinet", "palo alto", "pfsense", 
      "tcp/ip", "subnetting", "dns", "dhcp", "ipconfig"
    ],
    roleSlugs: [
      "network-engineer", "noc-analyst", "network-administrator", "telecom-engineer"
    ],
    domains: [
      "Networking", "NOC Operations", "Telecom", "Network Security", "Voice & Collaboration"
    ]
  },
  {
    id: "cloud-cluster",
    primaryTitle: "Cloud Computing & Architecture",
    synonymRoles: [
      "cloud engineer", "cloud architect", "azure administrator", "aws engineer", 
      "gcp architect", "cloud support associate", "cloud consultant"
    ],
    associatedSkillsAndTools: [
      "aws", "amazon web services", "azure", "google cloud", "gcp", "terraform", 
      "kubernetes", "docker", "iam", "vpc", "ec2", "s3", "lambda", "cloudwatch", 
      "azure monitor", "bigquery", "serverless", "devops"
    ],
    roleSlugs: [
      "cloud-engineer", "cloud-architect", "azure-administrator", "aws-solutions-architect"
    ],
    domains: [
      "Cloud Computing", "Cloud Architecture", "AWS", "Azure", "GCP"
    ]
  },
  {
    id: "devops-cluster",
    primaryTitle: "DevOps & Site Reliability Engineering (SRE)",
    synonymRoles: [
      "devops engineer", "site reliability engineer", "sre", "platform engineer", 
      "build engineer", "release engineer", "devsecops engineer"
    ],
    associatedSkillsAndTools: [
      "docker", "kubernetes", "terraform", "ansible", "jenkins", "github actions", 
      "gitlab ci", "prometheus", "grafana", "helm", "argocd", "bash", "python", 
      "git", "ci/cd", "linux", "cloud"
    ],
    roleSlugs: [
      "devops-engineer", "site-reliability-engineer", "platform-engineer", "devsecops-engineer"
    ],
    domains: [
      "DevOps", "Site Reliability Engineering", "Platform Engineering", "CI/CD"
    ]
  },
  {
    id: "cybersecurity-cluster",
    primaryTitle: "Cybersecurity, SOC & GRC",
    synonymRoles: [
      "cybersecurity analyst", "security analyst", "soc analyst", "penetration tester", 
      "pentester", "ethical hacker", "security engineer", "ciso", "grc analyst", "it auditor"
    ],
    associatedSkillsAndTools: [
      "siem", "splunk", "wireshark", "metasploit", "nmap", "nessus", "crowdstrike", 
      "active directory", "iam", "firewall", "offsec", "cissp", "cisa", "ceh", 
      "comptia security+", "iso 27001", "nist"
    ],
    roleSlugs: [
      "cybersecurity-analyst", "soc-analyst", "penetration-tester", "grc-analyst"
    ],
    domains: [
      "Cybersecurity", "SOC Operations", "Governance, Risk & Compliance", "Information Security"
    ]
  },
  {
    id: "data-cluster",
    primaryTitle: "Data Engineering, Analytics & AI",
    synonymRoles: [
      "data engineer", "data analyst", "business intelligence analyst", "bi analyst", 
      "data scientist", "ai engineer", "machine learning engineer", "database administrator"
    ],
    associatedSkillsAndTools: [
      "sql", "python", "power bi", "tableau", "spark", "hadoop", "snowflake", 
      "databricks", "bigquery", "postgresql", "mysql", "mongodb", "etl", "dbt", 
      "pandas", "scikit-learn", "tensorflow", "pytorch"
    ],
    roleSlugs: [
      "data-engineer", "data-analyst", "bi-analyst", "data-scientist", "dba"
    ],
    domains: [
      "Data Engineering", "Data Analytics", "Business Intelligence", "Artificial Intelligence & ML"
    ]
  },
  {
    id: "software-cluster",
    primaryTitle: "Software Development & Engineering",
    synonymRoles: [
      "software engineer", "full stack developer", "backend developer", "frontend developer", 
      "web developer", "mobile developer", "application engineer", "qa engineer"
    ],
    associatedSkillsAndTools: [
      "javascript", "typescript", "react", "next.js", "node.js", "python", "java", 
      "c++", "c#", ".net", "go", "rust", "html", "css", "git", "rest api", "graphql", 
      "jest", "cypress", "selenium"
    ],
    roleSlugs: [
      "software-engineer", "fullstack-developer", "backend-developer", "frontend-developer", "qa-engineer"
    ],
    domains: [
      "Software Engineering", "Web Development", "Mobile Development", "QA & Testing"
    ]
  }
];

const aliasMap: Record<string, string[]> = masterKeywordData.aliasMap || {};

/**
 * Knowledge Graph Query Expander: Returns an expanded vector of all related 
 * synonym titles, tools, skills, role slugs, and domain keywords for a given user query.
 */
export function expandQueryViaKnowledgeGraph(userQuery: string): {
  queryTerms: string[];
  matchedClusters: ConceptCluster[];
  associatedTools: string[];
  associatedRoleSlugs: string[];
  associatedDomains: string[];
} {
  if (!userQuery || !userQuery.trim()) {
    return {
      queryTerms: [],
      matchedClusters: [],
      associatedTools: [],
      associatedRoleSlugs: [],
      associatedDomains: []
    };
  }

  const cleanQ = userQuery.trim().toLowerCase();
  const queryTermsSet = new Set<string>([cleanQ]);
  const matchedClusters: ConceptCluster[] = [];
  const associatedToolsSet = new Set<string>();
  const associatedRoleSlugsSet = new Set<string>();
  const associatedDomainsSet = new Set<string>();

  // 1. Search Master Keyword CSV Aliases Map
  if (aliasMap[cleanQ]) {
    aliasMap[cleanQ].forEach(term => queryTermsSet.add(term.toLowerCase()));
  }

  Object.entries(aliasMap).forEach(([alias, targets]) => {
    if (cleanQ.includes(alias) || alias.includes(cleanQ)) {
      targets.forEach(t => queryTermsSet.add(t.toLowerCase()));
    }
  });

  // 2. Search Concept Clusters in Knowledge Graph
  for (const cluster of KNOWLEDGE_GRAPH_CLUSTERS) {
    const isPrimaryMatch = cluster.primaryTitle.toLowerCase().includes(cleanQ) || cleanQ.includes(cluster.primaryTitle.toLowerCase());
    const isRoleMatch = cluster.synonymRoles.some(role => cleanQ.includes(role) || role.includes(cleanQ));
    const isSkillMatch = cluster.associatedSkillsAndTools.some(tool => cleanQ.includes(tool) || tool.includes(cleanQ));
    const isDomainMatch = cluster.domains.some(dom => cleanQ.includes(dom.toLowerCase()) || dom.toLowerCase().includes(cleanQ));

    if (isPrimaryMatch || isRoleMatch || isSkillMatch || isDomainMatch) {
      matchedClusters.push(cluster);
      cluster.synonymRoles.forEach(r => queryTermsSet.add(r));
      cluster.associatedSkillsAndTools.forEach(t => associatedToolsSet.add(t));
      cluster.roleSlugs.forEach(s => associatedRoleSlugsSet.add(s));
      cluster.domains.forEach(d => associatedDomainsSet.add(d.toLowerCase()));
    }
  }

  return {
    queryTerms: Array.from(queryTermsSet),
    matchedClusters,
    associatedTools: Array.from(associatedToolsSet),
    associatedRoleSlugs: Array.from(associatedRoleSlugsSet),
    associatedDomains: Array.from(associatedDomainsSet)
  };
}
