import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, Award, Link, Compass, CheckSquare, X, Search, Info, HelpCircle, 
  ExternalLink, Layers, Sparkles, BookOpen, ChevronRight, Minimize2, ZoomIn, Grid, 
  Tv, Cpu, ShieldAlert, Monitor, Terminal, Database, Server, Smartphone, ListCollapse, Leaf
} from 'lucide-react';
import { ALL_ROLES_DATA, IT_DOMAINS } from '../data/rolesData';
import RoleDetailPanel from './RoleDetailPanel';

// 25 Domain Categories based on the user's MapIT Source Register & role list
export interface TaxonomyCategory {
  id: string;
  name: string;
  shortDesc: string;
  recommendation: string;
  color: string; // Tailwind tint (e.g., 'emerald')
  icon: any;
  indiaScheme: string; // Specific India Gov aligned text (NPTEL, C-DAC, FutureSkills Prime nasscom)
  rolesByLevel: {
    intern: string[];
    associate: string[];
    professional: string[];
    senior: string[];
    lead: string[];
    manager: string[];
    director: string[];
    executive: string[];
  };
  certifications: {
    name: string;
    provider: string;
    bestFor: string;
    url: string;
  }[];
  toolsAndResources: string[];
}

export const IT_TAXONOMY_DATA: TaxonomyCategory[] = [
  {
    id: "it-support",
    name: "IT Support, Service Desk & End-User Computing",
    shortDesc: "The frontline response handling hardware diagnostic setups, OS imaging, and ticketing queues.",
    recommendation: "Focus on establishing quick empathy, SLA guidelines, and master Active Directory or M365 configs.",
    color: "blue",
    icon: Monitor,
    indiaScheme: "NIELIT O Level, CCC Digital Literacy course nodes.",
    rolesByLevel: {
      intern: ["IT Support Trainee", "IT Support Intern", "Service Desk Analyst Trainee"],
      associate: ["Help Desk Technician", "Desktop Support Technician", "Technical Support Associate"],
      professional: ["IT Support Analyst", "Desktop Support Engineer", "VIP Support Specialist"],
      senior: ["Senior Technical Support Engineer", "Escalation Specialist L2/L3", "EUC Specialist"],
      lead: ["IT Support Lead", "Service Desk Team Lead"],
      manager: ["Service Desk Manager", "IT Operations Manager"],
      director: ["Head of End-User Computing Support", "Director of IT Support Services"],
      executive: ["VP IT Operations", "Chief Information Officer (CIO)"]
    },
    certifications: [
      { name: "Google IT Support Certificate", provider: "Google / Coursera", bestFor: "Entry Level Hardware troubleshooting & support", url: "https://grow.google/certificates/it-support/" },
      { name: "CompTIA A+", provider: "CompTIA", bestFor: "Global vendor-neutral IT fundamentals", url: "https://www.comptia.org/en-us/certifications/a/" },
      { name: "ITIL 4 Foundation", provider: "PeopleCert", bestFor: "ITSM, service desk compliance", url: "https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework" },
      { name: "NIELIT Student Portal CCC/O Level", provider: "Govt of India (NIELIT)", bestFor: "India national digital literacy standards", url: "https://student.nielit.gov.in/" }
    ],
    toolsAndResources: ["ServiceNow ticketing suite", "Active Directory Users & Computers", "Microsoft Intune endpoint engine", "Zendesk", "TeamViewer"]
  },
  {
    id: "systems-infra",
    name: "System Administration & Infrastructure",
    shortDesc: "Provisioning systems, maintaining Windows/Linux virtual server hosts, and managing storage blocks.",
    recommendation: "Establish core Unix directory command-lines and understand RAID arrays & cluster security.",
    color: "purple",
    icon: Server,
    indiaScheme: "FutureSkills Prime systems pathways, and C-DAC advanced Computing infrastructure modules.",
    rolesByLevel: {
      intern: ["Junior System Administrator", "IT Infrastructure Trainee", "Linux Admin Intern"],
      associate: ["Windows Administrator Trainee", "Server Support Assistant"],
      professional: ["System Administrator", "Windows System Administrator", "Linux System Administrator"],
      senior: ["Senior Linux Administrator", "Virtualization Specialist", "Storage Administrator"],
      lead: ["Infrastructure Lead Engineer", "Enterprise Systems Analyst Lead"],
      manager: ["IT Infrastructure Manager", "Data Center Manager"],
      director: ["Director of IT Infrastructure", "Head of Systems Engineering"],
      executive: ["VP Technology", "Chief Information Officer (CIO)"]
    },
    certifications: [
      { name: "Red Hat Certified System Administrator (RHCSA)", provider: "RedHat", bestFor: "RedHat Enterprise Linux server management", url: "https://www.redhat.com/en/services/certification/rhcsa" },
      { name: "CompTIA Linux+", provider: "CompTIA", bestFor: "Linux shell and command terminal", url: "https://www.comptia.org/en-us/certifications/linux/" },
      { name: "CompTIA Server+", provider: "CompTIA", bestFor: "Data center server maintenance & bios setups", url: "https://www.comptia.org/en-us/certifications/server/" },
      { name: "Microsoft Certified Hybrid Administrator", provider: "Microsoft Learn", bestFor: "Windows Server AD & cloud integrations", url: "https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/" }
    ],
    toolsAndResources: ["VMware ESXi hypervisor", "RedHat OS", "Veeam backup recovery", "Windows Server Active Directory Domain Services"]
  },
  {
    id: "networking",
    name: "Networking & NOC Operations",
    shortDesc: "Sustaining corporate network plumbing, LAN/WAN routers, switches, and load balancers.",
    recommendation: "Begin with binary routing, TCP/IP handshakes, and move into software-defined net automation.",
    color: "emerald",
    icon: Network,
    indiaScheme: "NPTEL Academic networking certificates and SWAYAM curriculum systems.",
    rolesByLevel: {
      intern: ["Network Intern", "NOC Analyst Trainee", "Network Operations Associate"],
      associate: ["NOC Technician", "Junior Network Engineer", "Wireless Support Tech"],
      professional: ["Network Engineer", "Network Administrator", "Telecom Support Analyst"],
      senior: ["Senior Network Engineer", "Network Automation Engineer", "Network Routing Specialist"],
      lead: ["Network Operations Lead", "Network Design Engineer"],
      manager: ["IT Network Manager", "Head of NOC Command"],
      director: ["Director of Network Engineering", "Head of Global Telecommunication Infrastructure"],
      executive: ["VP Networks & Cloud Infrastructure", "CTO"]
    },
    certifications: [
      { name: "Cisco CCNA (200-301)", provider: "Cisco Systems", bestFor: "Industry-standard network routing & VLANs", url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html" },
      { name: "Cisco Networking Academy NetAcad Badges", provider: "Cisco NetAcad", bestFor: "Foundational cybersecurity & IP routing sandbox", url: "https://www.netacad.com/badges-certifications" },
      { name: "Juniper Certification JNCIA", provider: "Juniper Program", bestFor: "Juniper networks software suite routing", url: "https://learningportal.juniper.net/juniper/" },
      { name: "CompTIA Network+", provider: "CompTIA", bestFor: "Foundational hardware routing theory", url: "https://www.comptia.org/en-us/certifications/network/" }
    ],
    toolsAndResources: ["Cisco IOS commands", "Wireshark Packet analyzer", "Putty/SecureCRT", "GNS3 Virtual Sandbox Simulator", "SolarWinds"]
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    shortDesc: "Engineering multi-cloud infrastructures, hypervisors, VPC boundaries, and serverless architectures.",
    recommendation: "Understand IAM role policies and secure VPC subnet routes. Always initialize budget watches.",
    color: "cyan",
    icon: Compass,
    indiaScheme: "Digital India Cloud training tracks and FutureSkills Prime Cloud computing frameworks.",
    rolesByLevel: {
      intern: ["Cloud Support Associate", "Cloud Operations Assistant", "Junior Cloud Engineer"],
      associate: ["Cloud Support Trainee", "Resource Optimizer Specialist"],
      professional: ["Cloud Systems Engineer", "AWS Administrator", "Azure Administrator", "GCP Specialist"],
      senior: ["Senior Cloud Platform Engineer", "Multi-Cloud Architect Specialist", "Cloud Platform Lead"],
      lead: ["Cloud Infrastructure Lead", "Kubernetes Operator Specialist"],
      manager: ["Cloud Engineering Manager", "Global Cloud Operations Manager"],
      director: ["Director of Cloud Engineering", "Head of Enterprise Virtualization"],
      executive: ["VP Cloud Platform Systems", "Chief Technology Officer (CTO)"]
    },
    certifications: [
      { name: "AWS Certified Cloud Practitioner (CLF-C02)", provider: "AWS", bestFor: "Entry-level AWS cloud models & billing", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
      { name: "AZ-900 Microsoft Azure Fundamentals", provider: "Microsoft Learn", bestFor: "Baseline Azure cloud hosting configurations", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
      { name: "AWS Certified Solutions Architect Associate (SAA)", provider: "AWS", bestFor: "Enterprise cloud engineering and VPC routing designs", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
      { name: "Google Professional Cloud Architect (PCA)", provider: "Google Cloud", bestFor: "Advanced engineering and container clustering standards", url: "https://cloud.google.com/learn/certification" }
    ],
    toolsAndResources: ["AWS Resource Console", "Microsoft Azure Portal", "Google Cloud VPC SDK", "CloudWatch analytics", "Kubernetes engine"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity, GRC & Security Operations",
    shortDesc: "Defending corporate infrastructures, firewalls, and managing ISO 27001 risk checks.",
    recommendation: "Begin as SOC Level 1 reviewer. Learn log auditing (SIEM) and understand asymmetric keys.",
    color: "red",
    icon: ShieldAlert,
    indiaScheme: "C-DAC ACTS PG Diploma in Information Security, FutureSkills nasscom Security paths.",
    rolesByLevel: {
      intern: ["Cybersecurity Intern", "SOC Analyst Level 1 Trainee", "GRC Trainee"],
      associate: ["Junior Security Analyst", "Vulnerability Scanner Specialist"],
      professional: ["SOC Analyst Level 2", "Cybersecurity Engineer", "Incident Response Engineer", "GRC Analyst"],
      senior: ["Senior Security Engineer", "Threat Hunter", "Penetration Tester", "IAM Consultant"],
      lead: ["SOC Analyst Level 3 Specialist", "Principal security architect"],
      manager: ["Security Operations Center (SOC) Manager", "GRC Risk Auditor Manager"],
      director: ["Director of Information Security", "Enterprise Security Director"],
      executive: ["Chief Information Security Officer (CISO)", "VP Cybersecurity Compliance"]
    },
    certifications: [
      { name: "Google Cybersecurity Certificate", provider: "Google / Coursera", bestFor: "Entry-level SOC operations & python script parsing", url: "https://grow.google/certificates/cybersecurity/" },
      { name: "CompTIA Security+", provider: "CompTIA", bestFor: "Global base baseline cybersecurity fundamentals", url: "https://www.comptia.org/en-us/certifications/security/" },
      { name: "ISC2 CC - Certified in Cybersecurity", provider: "ISC2", bestFor: "First step defensive cybersecurity mapping", url: "https://www.isc2.org/certifications/cc" },
      { name: "CISA - Information Systems Auditor", provider: "ISACA", bestFor: "Enterprise IT auditing and risk GRC guidelines", url: "https://www.isaca.org/credentialing/cisa" },
      { name: "EC-Council CCISO", provider: "EC-Council", bestFor: "CISO track administrative governance compliance", url: "https://www.eccouncil.org/train-certify/certified-chief-information-security-officer-cciso/" }
    ],
    toolsAndResources: ["Splunk SIEM dashboard", "Wireshark packet monitoring", "Kali Linux penetration utilities", "Nessus vulnerability diagnostics", "CrowdStrike Falcon endpoint"]
  },
  {
    id: "software-dev",
    name: "Software Development & Engineering",
    shortDesc: "Writing system backends, mobile architectures, frontend layouts, and dynamic API pipelines.",
    recommendation: "Build clean, reusable components and write integration loops. Maintain precise Git branch systems.",
    color: "fuchsia",
    icon: Terminal,
    indiaScheme: "C-DAC advanced Computing pathways, AICTE approved academic engineering sandboxes.",
    rolesByLevel: {
      intern: ["Software Developer Intern", "Frontend Dev Trainee", "Backend Dev Intern"],
      associate: ["Junior Software Developer", "Associate Software Engineer", "Web Developer Assistant"],
      professional: ["Software Developer", "Frontend Developer", "Backend Developer", "Android Developer"],
      senior: ["Senior Software Engineer", "Staff Software Engineer", "Tech Lead Programmer"],
      lead: ["Principal Software Architect", "Principal Engineer Developer"],
      manager: ["Software Engineering Manager", "Technical Program Delivery Lead"],
      director: ["Director of Software Development", "Head of Web Technologies Engineering"],
      executive: ["Chief Technology Officer (CTO)", "VP Engineering Software Systems"]
    },
    certifications: [
      { name: "Meta Front-End Developer Certificate", provider: "Meta / Coursera", bestFor: "React framework and interface layout mechanisms", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
      { name: "Meta Back-End Developer Certificate", provider: "Meta / Coursera", bestFor: "Python, databases, and microservices logic", url: "https://www.coursera.org/professional-certificates/meta-back-end-developer" },
      { name: "Oracle Certified Java Developer", provider: "Oracle Group", bestFor: "Strict object-oriented Enterprise Java SE compilers", url: "https://education.oracle.com/oracle-certification-path/pFamily_48" },
      { name: "freeCodeCamp Developer Portfolio Certs", provider: "freeCodeCamp", bestFor: "Interactive responsive sandbox projects validation", url: "https://www.freecodecamp.org/learn" }
    ],
    toolsAndResources: ["VS Code", "GitHub pipeline version keys", "Chrome developer runtime tools", "Postman API inspector", "Vercel / Netlify edge platforms"]
  },
  {
    id: "qa-testing",
    name: "QA, Software Testing & Quality Engineering",
    shortDesc: "Authoring automated regression testing loops, performance indices validation, and bug audits.",
    recommendation: "Move quickly from manual testing scripts into automated SDET frameworks like Selenium, Playwright or Cypress.",
    color: "pink",
    icon: CheckSquare,
    indiaScheme: "NPTEL and SWAYAM Software Testing academic tracks.",
    rolesByLevel: {
      intern: ["QA Intern", "Bug Testing Trainee", "Game Tester Associate"],
      associate: ["Junior QA Tester", "Manual QA Engineer", "Acceptance Analyst"],
      professional: ["QA Analyst", "Software Dev Engineer in Test (SDET)", "QA Automation Tester"],
      senior: ["Senior QA Automation Engineer", "Performance Testing Specialist", "Continuous Testing Lead"],
      lead: ["QA Test Director Assistant", "Test Automation Architect"],
      manager: ["Quality Engineering Manager", "QA Department head Manager"],
      director: ["Director of Quality Assurance", "Head of Software Release QC"],
      executive: ["VP Technical Quality Operations", "CTO"]
    },
    certifications: [
      { name: "ISTQB Certified Tester Foundation Level (CTFL)", provider: "ISTQB Board", bestFor: "Global baseline manual and automated testing principles", url: "https://www.istqb.org/certifications/" },
      { name: "Katalon Academy Testing Badges", provider: "Katalon Academy", bestFor: "No-code and low-code testing automation paths", url: "https://academy.katalon.com/" },
      { name: "Postman API Fundamentals Badge", provider: "Postman", bestFor: "REST API diagnostics integration verification loops", url: "https://academy.postman.com/" }
    ],
    toolsAndResources: ["Selenium and WebDriver API", "Playwright testing engineJS", "Jira bug portal", "Cypress automation dashboard", "Postman collections"]
  },
  {
    id: "devops-sre",
    name: "DevOps, SRE & Platform Engineering",
    shortDesc: "Automating server continuous deploy (CI/CD) pipelines, site reliability monitoring (SRE), and IaC.",
    recommendation: "Learn VM packaging via Docker container patterns first, followed by Kubernetes cluster pods setups.",
    color: "sky",
    icon: Layers,
    indiaScheme: "FutureSkills Prime advanced DevOps modules supported via C-DAC.",
    rolesByLevel: {
      intern: ["DevOps Trainee", "Release Engineer Intern", "Platform Associate Assistant"],
      associate: ["Junior DevOps Engineer", "Build Deployment technician"],
      professional: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer"],
      senior: ["Senior DevOps Engineer", "Senior site system architect SRE", "Infrastructure Automation specialist"],
      lead: ["DevOps Automation Team Lead", "Enterprise SRE Lead"],
      manager: ["Platform Engineering Manager", "SRE Operations Manager"],
      director: ["Director of Site Reliability", "Head of Enterprise DevOps Automation"],
      executive: ["VP Infrastructure Dev", "Chief Technology Officer (CTO)"]
    },
    certifications: [
      { name: "Certified Kubernetes Administrator (CKA)", provider: "Cloud Native Computing Foundation (CNCF)", bestFor: "Kubernetes containers cluster provisioning operations", url: "https://www.cncf.io/training/certification/cka/" },
      { name: "HashiCorp Certified Terraform Associate", provider: "HashiCorp", bestFor: "Infrastructure as Code AWS/Azure platform configurations", url: "https://developer.hashicorp.com/certifications" },
      { name: "GitHub System Foundations & Actions Certs", provider: "GitHub", bestFor: "CI/CD compile workflows automations validation", url: "https://resources.github.com/learn/certifications/" }
    ],
    toolsAndResources: ["Docker containment runtime", "Kubernetes cluster orchestrator", "Terraform script config", "GitHub Actions CI/CD compiler", "Prometheus monitors Dashboard"]
  },
  {
    id: "data-analytics",
    name: "Data, Analytics & Business Intelligence",
    shortDesc: "Structuring database queries, aggregating analytical tables, and rendering interactive dashboards.",
    recommendation: "Write SQL Window triggers, CTE chains, and represent records graphically to business managers.",
    color: "amber",
    icon: Database,
    indiaScheme: "NPTEL Database Management Systems curriculum, FutureSkills nasscom Big Data courses.",
    rolesByLevel: {
      intern: ["Data Analyst Intern", "Reporting Assistant Trainee", "SQL systems helper"],
      associate: ["Junior Data Analyst", "Excel Operations Analyst", "BI Report Assistant"],
      professional: ["Data Analyst", "Business Intelligence Analyst", "Power BI Developer", "Tableau Creator"],
      senior: ["Senior Data Analyst", "Senior analytics consultant", "BI Systems Architect Specialist"],
      lead: ["Data visualization Tech Lead", "Business Intelligence Team Lead"],
      manager: ["Analytics Operations Manager", "BI Lead Manager Systems"],
      director: ["Director of Data Analytics", "Head of Business Intelligence Reporting"],
      executive: ["Chief Data Officer (CDO)", "VP Enterprise Growth Systems Analytics"]
    },
    certifications: [
      { name: "Google Data Analytics Certificate", provider: "Google / Coursera", bestFor: "SQL query basics, spreadsheets, R charts", url: "https://grow.google/certificates/data-analytics/" },
      { name: "Microsoft Power BI Data Analyst (PL-300)", provider: "Microsoft Learn", bestFor: "Power BI ingestion configurations and DAX formulas", url: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/" },
      { name: "Tableau Desktop Data Analyst", provider: "Tableau Platform", bestFor: "Advanced Tableau dashboard transformations validation", url: "https://www.tableau.com/learn/certification" }
    ],
    toolsAndResources: ["MySQL Workbench", "PostgreSQL database client", "Microsoft Power BI Desktop", "Tableau suite", "Google BigQuery console"]
  },
  {
    id: "data-science-ai",
    name: "Data Science, AI & Machine Learning",
    shortDesc: "Developing advanced machine learning algorithms, cleaning vector datablocks, and prompt loops validation.",
    recommendation: "Master Python scientific libraries (Pandas, Numpy, Scikit-learn), then specialize in LLM context windows.",
    color: "rose",
    icon: Sparkles,
    indiaScheme: "C-DAC ACTS Post Graduate Diploma in AI & Big Data. Digital India skilling initiatives.",
    rolesByLevel: {
      intern: ["Data Science Intern", "AI Research Assistant Trainee", "ML Prompt engineering helper"],
      associate: ["Junior Data Scientist", "Assistant Model Evaluator", "NLP analyst associate"],
      professional: ["Data Scientist", "Machine Learning Engineer", "Generative AI Engineer", "NLP developer"],
      senior: ["Senior Data Scientist", "Applied Research Scientist", "MLOps Automation specialist"],
      lead: ["Generative AI Platform Lead", "Principal ML Architect"],
      manager: ["Data Science Manager", "Head of AI Product Operations"],
      director: ["Director of Artificial Intelligence", "Head of ML Research Labs"],
      executive: ["Chief AI Officer (CAIO)", "VP Machine Learning Systems"]
    },
    certifications: [
      { name: "AWS Certified AI Practitioner (AIF-C01)", provider: "AWS", bestFor: "Generative AI cloud deployments and prompt logic validation", url: "https://aws.amazon.com/certification/" },
      { name: "Databricks Data Engineer Associate", provider: "Databricks", bestFor: "Big Data processing and lakehouse data lake models", url: "https://www.databricks.com/learn/training/certification" },
      { name: "Snowflake SnowPro Core Certification", provider: "Snowflake", bestFor: "Snowflake cloud data warehouse structures operations", url: "https://learn.snowflake.com/certifications" }
    ],
    toolsAndResources: ["Jupyter Notebooks", "PyTorch deep learning modules", "HuggingFace model repository", "Databricks analytics platform", "Snowflake storage engines"]
  },
  {
    id: "db-admin",
    name: "Database Administration (DBA)",
    shortDesc: "Preserving cluster configurations, indexing speed audits, backups protocols, and locks resolution.",
    recommendation: "Understand database shard logs, replication lag lines, and transaction locking conditions.",
    color: "teal",
    icon: Database,
    indiaScheme: "SWAYAM Database Management certification tracks.",
    rolesByLevel: {
      intern: ["Database Trainee Linux", "SQL Support Trainee Analyst", "Database Support Intern"],
      associate: ["Junior DBA Tech", "SQL operations helper"],
      professional: ["Database Administrator (DBA)", "Oracle Administrator", "MySQL DBA", "PostgreSQL Administrator"],
      senior: ["Senior Database Administrator Partner", "Database replication Specialist", "Data Warehouse Engineer"],
      lead: ["Database Reliability Team Lead", "Enterprise DB Architect Specialist"],
      manager: ["Database Support Operations Manager", "Data Platforms Head"],
      director: ["Director of Database Systems Operations", "Corporate Storage Director"],
      executive: ["Chief Data Officer (CDO)", "VP IT Infrastructure Assets"]
    },
    certifications: [
      { name: "MongoDB Associate Database Administrator", provider: "MongoDB University", bestFor: "NoSQL document collections replication and backups", url: "https://learn.mongodb.com/pages/certification-program" },
      { name: "EDB PostgreSQL Certified Associate", provider: "EnterpriseDB", bestFor: "PostgreSQL DBA query scaling and administrative configurations", url: "https://www.enterprisedb.com/training/postgres-certification" },
      { name: "Microsoft Certified DP-300: Database Administrator", provider: "Microsoft Learn", bestFor: "Azure SQL servers security policies configuration", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/" }
    ],
    toolsAndResources: ["Oracle DBMS", "PostgreSQL engine", "MongoDB Atlas config panel", "Veeam recovery console", "MySQL Enterprise Workbench"]
  },
  {
    id: "it-ops-itsm",
    name: "IT Operations, ITSM & Process Management",
    shortDesc: "Managing baseline helpdesk queues, incident change boards, SLA metrics, and systems lifecycle structures.",
    recommendation: "Master ITIL processes. Change management is critical inside large multinational client centers.",
    color: "indigo",
    icon: Server,
    indiaScheme: "FutureSkills Prime ITSM governance structures.",
    rolesByLevel: {
      intern: ["IT Operations Intern", "ITSM Analyst Trainee", "Service Management Helper"],
      associate: ["Change Coordinator", "Problem Management assistant", "SLA Analyst Tool helper"],
      professional: ["IT Operations Analyst", "ServiceNow ITSM Consultant", "Incident Manager", "Service Delivery Analyst"],
      senior: ["Senior Incident Management Specialist", "Major Incident Lead Operations", "Senior SLA consultant"],
      lead: ["Service Delivery Lead Operations", "IT Process Architect Consultant"],
      manager: ["IT Operations Manager", "ITSM incident manager lead"],
      director: ["Director of IT Operations", "Head of IT Service Management (ITSM)"],
      executive: ["VP IT Operations Services", "Chief Information Officer (CIO)"]
    },
    certifications: [
      { name: "ITIL 4 Practice Manager / Managing Professional", provider: "PeopleCert", bestFor: "Incident/Change/Release control procedures", url: "https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework" },
      { name: "ServiceNow Certified Implementation Specialist ITSM", provider: "ServiceNow", bestFor: "ServiceNow incident and service catalogs workflows", url: "https://learn.servicenow.com/lxp" },
      { name: "COBIT Foundation by ISACA", provider: "ISACA", bestFor: "Governance of enterprise IT frameworks audit", url: "https://www.isaca.org/resources/cobit" }
    ],
    toolsAndResources: ["ServiceNow workflow builder", "Jira Service Management", "ITIL process guidelines", "PagerDuty incident escalation systems", "Confluence operational desk boards"]
  },
  {
    id: "erp-crm",
    name: "ERP, CRM & Business Application Roles",
    shortDesc: "Managing SAP modules, Salesforce CRM accounts, workflows setups, and warehouse ledger mappings.",
    recommendation: "Focus on SAP modules (FI/CO/MM/SD) or Salesforce Admin triggers. This is highly requested in consulting firms.",
    color: "blue",
    icon: Cpu,
    indiaScheme: "Academic college level ERP setups, and SAP authorized training centers in India.",
    rolesByLevel: {
      intern: ["ERP support trainee", "CRM analyst intern", "SAP Trainee Associate"],
      associate: ["Salesforce Admin Trainee", "ERP operations assistant", "Workday Assistant"],
      professional: ["SAP Functional Consultant", "SAP Technical Developer", "Salesforce Administrator", "ServiceNow Administrator"],
      senior: ["Senior Salesforce Administrator", "Senior SAP consultant ERP", "Oracle ERP Cloud Analyst", "Workday Engineer"],
      lead: ["SAP Lead Module Expert", "Salesforce Architect Specialist"],
      manager: ["Enterprise Applications team Lead", "ERP Support Manager Systems"],
      director: ["Director of Enterprise Business Applications", "Head of Salesforce & Oracle platforms"],
      executive: ["Chief Digital Officer", "VP Enterprise Systems Operations"]
    },
    certifications: [
      { name: "Salesforce Certified Administrator", provider: "Salesforce Trailhead", bestFor: "CRM customization, page layouts, analytics", url: "https://trailhead.salesforce.com/en/credentials/administrator" },
      { name: "SAP Certified Application Associate", provider: "SAP Learning Center", bestFor: "SAP S/4HANA core business module workflows", url: "https://training.sap.com/certification/" },
      { name: "Dynamics 365 Certifications", provider: "Microsoft Learn", bestFor: "Microsoft business ERP dynamic modules", url: "https://learn.microsoft.com/en-us/credentials/certifications/browse/?products=dynamics-365" }
    ],
    toolsAndResources: ["SAP S/4HANA transaction codes", "Salesforce Lightning setup panel", "ServiceNow CAD panel", "Workday HR dashboard", "Oracle ERP ledgers client"]
  },
  {
    id: "product-mgmt",
    name: "Product, Project & Program Management",
    shortDesc: "Guiding software release cycles, sprints orchestration, grooming backlog pipelines, and scrum meetings.",
    recommendation: "Combine logical tech understanding with corporate sprint frameworks and ROI metrics tracker.",
    color: "yellow",
    icon: Network,
    indiaScheme: "PMI Indian Chapter certifications, academic project Management certifications.",
    rolesByLevel: {
      intern: ["Project Coordinator", "Product Analyst Intern", "Scrum Team Assistant"],
      associate: ["Associate Product Manager", "Project Management assistant", "PMO Analyst helper"],
      professional: ["IT Project Manager", "Technical Project Manager", "Product Manager", "Scrum Master", "Agile Coach"],
      senior: ["Senior Product Manager", "Senior Technical Project Lead", "Agile Coach Consultant", "Senior Delivery Manager"],
      lead: ["Principal Product Lead", "Product Director Assistant"],
      manager: ["Product Delivery Lead Manager", "PMO Director Assistant Manager"],
      director: ["Director of Product Management", "Program Management Director"],
      executive: ["Chief Product Officer (CPO)", "VP Technical Program Operations"]
    },
    certifications: [
      { name: "PMI CAPM - Certified Associate Project Management", provider: "Project Management Institute (PMI)", bestFor: "Entry level project timeline coordination", url: "https://www.pmi.org/certifications/certified-associate-capm" },
      { name: "PMI PMP - Project Management Professional", provider: "PMI", bestFor: "Enterprise project delivery, budgets, risk control", url: "https://www.pmi.org/certifications/project-management-pmp" },
      { name: "Scrum.org PSM I - Professional Scrum Master", provider: "Scrum.org", bestFor: "Agile methodologies, sprint cycles, scrum rules", url: "https://www.scrum.org/professional-scrum-certifications" },
      { name: "Product School AI for Product Certificate", provider: "Product School", bestFor: "AI product management and design models", url: "https://productschool.com/certifications" }
    ],
    toolsAndResources: ["Jira Software sprint board", "Miro online whiteboard templates", "Microsoft Project scheduling tool", "Confluence specifications desk", "Slack collaboration loops"]
  },
  {
    id: "business-analysis",
    name: "Business Analysis & Tech Consulting",
    shortDesc: "Translating executive demands into tech instructions, mapping user profiles, and compiling functional grids.",
    recommendation: "Learn functional requirement document schemas (FRD), SQL, and work tightly with system architects.",
    color: "indigo",
    icon: BookOpen,
    indiaScheme: "Academic business analytics master certificates program.",
    rolesByLevel: {
      intern: ["Business Analyst Trainee", "Consulting Analyst Intern", "Requirements Assistant"],
      associate: ["Junior Business Analyst", "Process Analyst Assistant"],
      professional: ["Business Analyst", "IT Business Analyst", "Functional Consultant", "Solution Consultant"],
      senior: ["Senior Business Analyst Consultant", "Senior Solution Consultant", "Process Auditor specialist"],
      lead: ["Lead Business Consultant", "Principal Tech Consultant"],
      manager: ["Consulting Operations Manager", "Practice Area Manager Partner"],
      director: ["Director of Technology Consulting", "Head of Business Analysis Operations"],
      executive: ["VP Technical Consulting Services", "Chief Digital Officer (CDO)"]
    },
    certifications: [
      { name: "IIBA ECBA - Entry Certificate in Business Analysis", provider: "IIBA Board", bestFor: "Requirements Gathering, functional specifications", url: "https://www.iiba.org/business-analysis-certifications/ecba/" },
      { name: "IIBA CBAP - Certified Business Analysis Professional", provider: "IIBA", bestFor: "Advanced enterprise functional architect systems", url: "https://www.iiba.org/business-analysis-certifications/cbap/" },
      { name: "Salesforce Certified Business Analyst", provider: "Salesforce Trailhead", bestFor: "Salesforce functional deployments optimization", url: "https://trailhead.salesforce.com/en/credentials/businessanalyst" }
    ],
    toolsAndResources: ["Jira Agile specifications", "Draw.io flowchart panel", "Microsoft Visio vector maps", "SQL Client", "Excel statistical toolkits"]
  },
  {
    id: "uiux-design",
    name: "UI/UX, Product Design & Creative Technology",
    shortDesc: "Designing user interaction maps, wireframes compilation, design systems configuration, and user tests.",
    recommendation: "Build layout wireframes, master typography pairs, and understand design component libraries (figma).",
    color: "purple",
    icon: Tv,
    indiaScheme: "Govt of India design institute paths (NID), FutureSkills UX programs.",
    rolesByLevel: {
      intern: ["UI Design Intern", "UX Research Assistant Trainee", "Graphic Designer Trainee"],
      associate: ["Junior UI Designer", "Web Layout Artist Associate", "Creative Asset Assistant"],
      professional: ["UI Designer", "UX Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
      senior: ["Senior UX Specialist Designer", "Design Systems Architect Lead", "User researcher consultant"],
      lead: ["Creative Design Director Assistant", "UX Research Lead Tech"],
      manager: ["Product Design Manager", "User experience team Manager"],
      director: ["Director of User Experience", "Head of Creative UI design systems"],
      executive: ["Chief Design Officer", "VP Design & Front-End Experience"]
    },
    certifications: [
      { name: "Google UX Design Professional Certificate", provider: "Google / Coursera", bestFor: "Figma wireframing, UX logic, persona mapping", url: "https://grow.google/certificates/ux-design/" },
      { name: "Nielsen Norman Group UX Certification", provider: "NNGroup", bestFor: "Prestigious user research and testing standards", url: "https://www.nngroup.com/ux-certification/" },
      { name: "Interaction Design Foundation Portfolio", provider: "IxDF", bestFor: "Interaction design methodologies validation labs", url: "https://www.interaction-design.org/certificates" }
    ],
    toolsAndResources: ["Figma cloud design platform", "Adobe Creative suite CC", "Storybook UI component catalog", "Optimal Workshop user research cards"]
  },
  {
    id: "web-cms",
    name: "Web, CMS & Digital Technology",
    shortDesc: "Assembling Shopify landing views, configuring WordPress themes, and managing metadata engines for web visibility.",
    recommendation: "Focus on understanding SEO index mechanisms, web core vital performance markers, and theme systems.",
    color: "cyan",
    icon: Monitor,
    indiaScheme: "Academic web layouts design standard certifications pathways.",
    rolesByLevel: {
      intern: ["CMS Web Intern", "SEO assistant trainee", "WordPress Assistant"],
      associate: ["Website Administrator Assistant", "SEO specialist associate"],
      professional: ["CMS Developer", "WordPress Developer", "Shopify site creator", "Technical SEO Specialist"],
      senior: ["Senior Web Developer CMS", "Digital Platform architect Specialist", "Technical SEO Consultant"],
      lead: ["Web Technology Team Lead", "CMS platform Architect Coordinator"],
      manager: ["Digital Experience Manager", "Website Systems Administrator Manager"],
      director: ["Director of Web Platforms", "Head of Digital Experience & SEO Strategy"],
      executive: ["VP Corporate Communications Systems", "CTO"]
    },
    certifications: [
      { name: "Google Analytics Certification (GA4)", provider: "Google Skillshop", bestFor: "Web analytics, traffic audits, marketing telemetry", url: "https://skillshop.withgoogle.com/" },
      { name: "Shopify Partner Merchant Learning", provider: "Shopify Academy", bestFor: "E-Commerce checkout customization and product inventory logic", url: "https://academy.shopify.com/" },
      { name: "Meta Digital Marketing Associate", provider: "Meta Blueprint", bestFor: "Landing page conversion, ads tracking pixels validation", url: "https://www.facebook.com/business/learn/certification" }
    ],
    toolsAndResources: ["WordPress core layout structures", "Shopify Liquid theme scripts", "Google Analytics GA4 dashboard", "Yoast SEO plugins", "Screaming Frog visibility validator"]
  },
  {
    id: "automation-rpa",
    name: "Automation, RPA & Low-Code / No-Code",
    shortDesc: "Building automated workflows using UiPath, Power Automate, or n8n to connect company tools.",
    recommendation: "Understand API endpoints request loops, variables parsing, and low-code integrations.",
    color: "rose",
    icon: Layers,
    indiaScheme: "FutureSkills Prime robotic automation training tracks.",
    rolesByLevel: {
      intern: ["Automation assistant Intern", "RPA support trainee", "No-code assistant"],
      associate: ["Low-Code app assistant", "Junior Automation analyst"],
      professional: ["RPA Developer", "UiPath Engineer", "Power Automate workflow Specialist", "n8n Developer"],
      senior: ["Senior RPA Developer", "Intelligent workflow architect", "Low-Code Plattform Admin"],
      lead: ["Process Automation Team Lead", "Intelligent Automation Architect"],
      manager: ["RPA Operations Department Manager", "No-Code Development manager"],
      director: ["Director of Process Automation", "Head of Digital Office automation"],
      executive: ["Chief Digital officer Technology", "VP Operational Efficiency"]
    },
    certifications: [
      { name: "UiPath Certified Associate", provider: "UiPath Academy", bestFor: "Robotic process screen scraping and ledger updates automation", url: "https://academy.uipath.com/certification" },
      { name: "Power Platform Fundamentals PL-900", provider: "Microsoft Learn", bestFor: "Microsoft Power Automate and Power Apps baseline connections", url: "https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/" },
      { name: "Appian Certified Associate Developer", provider: "Appian Institute", bestFor: "Enterprise BPM low-code app development layouts", url: "https://appian.com/learn/certifications.html" }
    ],
    toolsAndResources: ["UiPath Studio framework", "Microsoft Power Automate triggers", "n8n open-source workflow connectors", "Zapier API engine", "Mendix low-code studio"]
  },
  {
    id: "tech-writing",
    name: "Technical Writing & Knowledge Management",
    shortDesc: "Compiling API markdown pages, assembling corporate knowledge bases, and documenting software requirements.",
    recommendation: "Learn direct, clear communication, markdown formatting, and API description standards like Swagger.",
    color: "emerald",
    icon: BookOpen,
    indiaScheme: "Technical writing certificates available in national language departments and tech colleges.",
    rolesByLevel: {
      intern: ["Content Support Trainee", "Knowledge base helper", "Technical writer Intern"],
      associate: ["Junior Documentation Writer", "Technical Editing assistant"],
      professional: ["Technical Writer", "API Documentation Writer", "Knowledge Analyst", "Process documentation specialist"],
      senior: ["Senior Technical Writer", "Documentation Operations Lead", "Knowledge Base Manager consultant"],
      lead: ["Information Strategy Lead", "Principal Technical Writer"],
      manager: ["Technical Documentation Manager", "Content Operations Manager Team lead"],
      director: ["Director of Technical Documentation", "Head of Corporate Knowledge Management Systems"],
      executive: ["Chief Information Officer (CIO)", "VP Corporate systems"]
    },
    certifications: [
      { name: "Google Technical Writing Courses Certs", provider: "Google Developer Core", bestFor: "Technical developer clear documentation, markdown patterns", url: "https://developers.google.com/tech-writing" },
      { name: "Tech Writing Credentials", provider: "Technical Writing Boards", bestFor: "Standard technical write-ups, layout architectures", url: "https://www.freecodecamp.org/learn" }
    ],
    toolsAndResources: ["Markdown syntax, Hugo, Docusaurus", "Confluence database pages", "GitBook system docs", "Swagger Open-API specs", "Git version control commits"]
  },
  {
    id: "sales-customer-success",
    name: "Sales Engineering & Customer Success Technology",
    shortDesc: "Providing pre-sales support, managing product demonstrations, and coordinating technical onboarding.",
    recommendation: "Combine deep technical architecture understanding with sales strategy, communication, and CRM systems.",
    color: "blue",
    icon: Network,
    indiaScheme: "Consulting standard customer success modules.",
    rolesByLevel: {
      intern: ["Sales Tech Intern", "Pre-Sales Assistant Trainee", "Onboarding Assistant"],
      associate: ["Customer Success Coordinator", "Product Specialist Associate", "Technical Account Associate"],
      professional: ["Sales Engineer", "Pre-Sales Systems Consultant", "Customer Success Manager", "Technical Account Manager"],
      senior: ["Senior Sales Engineer Consultant", "Technical Account Executive Lead", "Senior Implementation Specialist"],
      lead: ["Principal Pre-sales Architect", "Customer Success Director assistant"],
      manager: ["Solutions Engineering Team Manager", "Head of Customer onboarding"],
      director: ["Director of Solutions Engineering", "Director of Customer Success Technology Platforms"],
      executive: ["VP Sales Technology Systems", "Chief Product Officer (CPO)"]
    },
    certifications: [
      { name: "Microsoft Fundamentals AZ-900 / MS-900", provider: "Microsoft Learn", bestFor: "Pre-sales product capabilities walkthrough certifications", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
      { name: "AWS Certified Practitioner CLF-C02", provider: "AWS", bestFor: "High-level sales engineering and pricing systems optimization", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/" }
    ],
    toolsAndResources: ["Salesforce CRM logs", "Product simulation sandboxes", "Miro mapping diagrams", "Gong call tracking", "Slack portal channels"]
  },
  {
    id: "hardware-iot",
    name: "Hardware, Embedded Systems & IoT Engineering",
    shortDesc: "Programming microcontroller firmware, designing PCBs, and coordinating telemetry sensors.",
    recommendation: "Focus on understanding low-level C programming, breadboard electrical schematics, and sensor pins.",
    color: "indigo",
    icon: Cpu,
    indiaScheme: "C-DAC ACTS PG Diploma in Embedded Systems (DESD). National VLSI skilling programs.",
    rolesByLevel: {
      intern: ["Hardware intern", "IoT Associate assistant Trainee", "Firmware assistant"],
      associate: ["Junior Hardware technician", "Device stress testing specialist"],
      professional: ["Hardware Engineer", "Embedded Systems Engineer", "Firmware Developer", "IoT Specialist"],
      senior: ["Senior Embedded Systems architect", "PCB Design Specialist", "Microcontroller Engineer Specialist"],
      lead: ["Hardware engineering Team Lead", "Principal Embedded Architect"],
      manager: ["Embedded Systems Manager Engineering", "Hardware Team Lead Manager"],
      director: ["Director of Hardware Engineering", "Head of IoT Products"],
      executive: ["VP Electronics Engineering", "CTO"]
    },
    certifications: [
      { name: "C-DAC ACTS Certificate in Embedded/VLSI", provider: "C-DAC India", bestFor: "Advanced VLSI design, C programming, microcontrollers", url: "https://www.cdac.in/index.aspx?id=edu_acts_CertificateCoursesList" },
      { name: "FutureSkills Prime IoT certification", provider: "nasscom / MeitY", bestFor: "India national IoT telemetry sensors certifications", url: "https://www.futureskillsprime.in/" }
    ],
    toolsAndResources: ["Arduino and Raspberry Pi microcontrollers", "C/C++ firmware program compilers", "KiCad PCB designers software", "Oscilloscopes physical diagnostics", "MQTT networking brokers"]
  },
  {
    id: "telecom-voice",
    name: "Telecom, Voice & Collaboration",
    shortDesc: "Maintaining corporate VoIP routers, corporate unified communications systems, and enterprise Zoom panels.",
    recommendation: "Learn SIP handshakes, corporate network QoS configurations, and Zoom/Teams cloud backends.",
    color: "amber",
    icon: PhoneVoiceIcon,
    indiaScheme: "Telecommunications ministry aligned student courses.",
    rolesByLevel: {
      intern: ["Telecom Support Intern", "Voice engineer Trainee", "UC Operations Assistant"],
      associate: ["Junior VoIP Technician", "NOC Voice analyst associate"],
      professional: ["Voice Network Engineer", "VoIP administrator", "Unified Communications Analyst", "Teams Administrator"],
      senior: ["Senior Zoom and Teams Administrator", "Senior Telecom architect", "Unified collaboration Lead"],
      lead: ["Enterprise Collaboration Systems Lead", "Voice System principal Architect"],
      manager: ["Telecom Operations Manager", "Collaboration platforms Department manager"],
      director: ["Director of Collaboration Technologies", "Head of Enterprise Communications Networks"],
      executive: ["VP Technical Operations Infrastructure", "Chief Information Officer (CIO)"]
    },
    certifications: [
      { name: "Cisco Cisco Collaboration Tracks CCNP", provider: "Cisco Systems", bestFor: "SIP trunks, voice gateways QoS configurations", url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html" },
      { name: "Microsoft MS-700 Unified Teams Admin", provider: "Microsoft Learn", bestFor: "Enterprise MS Teams policies, networks routing", url: "https://learn.microsoft.com/en-us/credentials/certifications/m365-teams-administrator-associate/" }
    ],
    toolsAndResources: ["Cisco Voice gateways CLI", "Wireshark SIP filter parser", "Zoom Cloud admin Center", "Microsoft Teams Portal dashboard", "FreePBX servers"]
  },
  {
    id: "governance-audit",
    name: "Governance, Risk, Compliance (GRC) & IT Audit",
    shortDesc: "Auditing system safety controls, drafting compliance reports, and testing SOX IT guidelines.",
    recommendation: "Focus on understanding cybersecurity policies (SOC2, HIPAA, NIST) and master the audit logic.",
    color: "red",
    icon: Award,
    indiaScheme: "ISACA India chapters educational workshops and certifications.",
    rolesByLevel: {
      intern: ["IT Audit Apprentice", "GRC analyst Intern", "Compliance Trainee"],
      associate: ["Junior Compliance Analyst", "Data Privacy helper"],
      professional: ["IT Auditor", "GRC Analyst", "Vulnerability Auditor", "SOX IT compliance Analyst"],
      senior: ["Senior IT Auditor Specialist", "Senior GRC Consultant Adviser", "ISO 27001 Auditor Lead"],
      lead: ["Lead IT Governance Specialist", "Privacy compliance Lead systems"],
      manager: ["IT Audit Department Manager", "GRC Director Assistant Manager"],
      director: ["Director of Technology Controls & Compliance", "Corporate Risk Audit Director"],
      executive: ["Chief Risk Officer (CRO)", "Chief Compliance Officer (CCO)"]
    },
    certifications: [
      { name: "CISA - Certified Information Systems Auditor", provider: "ISACA", bestFor: "Corporate database audit, firewall compliance standards", url: "https://www.isaca.org/credentialing/cisa" },
      { name: "CRISC - Certified in Risk & Controls", provider: "ISACA", bestFor: "Identifying enterprise risk profiles, mitigation patterns", url: "https://www.isaca.org/credentialing/crisc" },
      { name: "ISO 27001 Lead Auditor Certific", provider: "PeopleCert ISO", bestFor: "Global ISO security standards certifications", url: "https://www.peoplecert.org/" }
    ],
    toolsAndResources: ["Audit logs databases", "NIST cybersecurity framework metrics", "Confluence risk lists", "Jira Compliance cards", "ISO 27001 directories checklists"]
  },
  {
    id: "architecture",
    name: "Technology Architecture Track",
    shortDesc: "Designing system integrations, high-level structural diagrams, cloud security rules, and databases schemas.",
    recommendation: "This track follows advanced experience in engineers, software, cloud or databases fields.",
    color: "emerald",
    icon: Network,
    indiaScheme: "Advanced nasscom architecture standards frameworks.",
    rolesByLevel: {
      intern: ["Systems Cadet Engineer", "Associate Cloud Architect Assistant"],
      associate: ["Systems layout analyzer", "Infrastructure Consultant assistant"],
      professional: ["Solution Architect", "Technical Architect", "Database Architect", "Cloud Architect"],
      senior: ["Senior Enterprise Architect Partner", "Security Architect Specialist", "Application Architect Architect"],
      lead: ["Principal Solutions Architect", "Integrations Lead Architect"],
      manager: ["Corporate Enterprise Architecture Lead Manager", "Technical engineering board Manager"],
      director: ["Director of Enterprise Architecture", "Chief Systems Architect Strategy"],
      executive: ["Chief Technology Officer (CTO)", "VP Global Tech Architecture"]
    },
    certifications: [
      { name: "TOGAF Enterprise Architecture Foundation", provider: "The Open Group", bestFor: "Global standard enterprise architectures mapping schemas", url: "https://www.opengroup.org/certifications/togaf" },
      { name: "AWS Solutions Architect Professional", provider: "AWS Cloud", bestFor: "Advanced cloud scaling, disaster VPC setups validation", url: "https://aws.amazon.com/certification/certified-solutions-architect-professional/" },
      { name: "DAMA CDMP - Data Management", provider: "DAMA Platform", bestFor: "Enterprise data governance, metadata administration database formats", url: "https://www.dama.org/cpages/cdmp-information" }
    ],
    toolsAndResources: ["TOGAF design frameworks", "Draw.io network architecture diagrams", "Enterprise UML design diagrams", "AWS Pricing Calculator", "Lucidchart vector templates"]
  },
  {
    id: "executive",
    name: "Executive & C-Level Tech Leadership",
    shortDesc: "Guiding enterprise digital transformations, funding approvals, cyber plans, and business operations.",
    recommendation: "Combine technical foundations with MBA business finance, team mentoring, and corporate vision strategies.",
    color: "fuchsia",
    icon: Network,
    indiaScheme: "Executive PG programs in top IITs and Indian Institutes of Management (IIMs) via SWAYAM.",
    rolesByLevel: {
      intern: ["Leadership Associate Trainee", "Tech Management Intern"],
      associate: ["IT Coordinator Assistant", "PMO Coordinator Assistant"],
      professional: ["Technical Team Lead", "Scrum Master Consultant", "IT Operations Supervisor"],
      senior: ["Engineering Lead Associate", "Senior program manager", "IT Delivery Director Partner"],
      lead: ["Practice Area Lead Principal", "Head of IT systems Operations"],
      manager: ["IT Delivery Department Manager", "Staff Engineering Manager Lead"],
      director: ["Director of Technical Operations", "VP IT Strategy Operations"],
      executive: ["Chief Technology Officer (CTO)", "Chief Information Officer (CIO)", "Chief Information Security Officer (CISO)"]
    },
    certifications: [
      { name: "ISACA CISM - Security Manager", provider: "ISACA", bestFor: "Administrative leadership, security budgeting", url: "https://www.isaca.org/credentialing/cism" },
      { name: "SWAYAM Executive IIM/IIT Certs", provider: "SWAYAM National System", bestFor: "Advanced university management, technology scaling", url: "https://swayam.gov.in/" },
      { name: "ITIL 4 Strategic Leader Master", provider: "PeopleCert", bestFor: "Organizational digital transformation strategy", url: "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-4-1" }
    ],
    toolsAndResources: ["Balance Ledger dashboards", "MBA Financial optimization sheets", "Strategic Roadmaps boards", "Slack enterprise networks", "Jira Portfolio plans"]
  },
  {
    id: "green-computing",
    name: "Green Computing & Sustainable IT",
    shortDesc: "Engineering carbon-efficient software, sustainable cloud resource operations, physical data center thermal scaling, and E-waste governance.",
    recommendation: "Learn the 8 principles of Green Software Engineering, deploy open-source carbon telemetry tools (e.g., Scaphandre, Kepler, Cloud Carbon Footprint), and get GSF Certified.",
    color: "emerald",
    icon: Leaf,
    indiaScheme: "FutureSkills Prime green computing paths, and C-DAC sustainability computing frameworks.",
    rolesByLevel: {
      intern: ["ESG Data & Sustainability Analyst", "Green IT Apprentice", "Sustainable Software Developer Intern"],
      associate: [],
      professional: ["Green Computing Specialist", "Carbon-Aware Software Engineer", "Cloud Sustainability & GreenOps Analyst", "Sustainable AI & Green AI Analyst"],
      senior: ["Senior Sustainable Systems Engineer"],
      lead: [],
      manager: ["IT Asset / E-waste Compliance Analyst"],
      director: ["Data Center Sustainability Engineer", "Director of Sustainable Technology"],
      executive: ["Chief Sustainability Officer"]
    },
    certifications: [
      { name: "Green Software Practitioner", provider: "Green Software Foundation", bestFor: "Principles of green software design", url: "https://learn.greensoftware.foundation/" },
      { name: "Sustainability & Climate Risk (SCR)", provider: "GARP", bestFor: "Enterprise climate risk and ESG reporting standards", url: "https://www.garp.org/scr" },
      { name: "FinOps Certified Practitioner", provider: "FinOps Foundation", bestFor: "Cloud cost and carbon optimization", url: "https://www.finops.org/certification/" },
      { name: "Data Center Energy Practitioner (DCEP)", provider: "U.S. DOE", bestFor: "Data center physical server efficiency auditing", url: "https://www.energy.gov/eere/femp/data-center-energy-practitioner-dcep-program" }
    ],
    toolsAndResources: ["Kepler (Kubernetes efficient power telemetry)", "Scaphandre hardware telemetry", "Carbon Aware SDK", "Cloud Carbon Footprint Tool", "Infracost Carbon Plugin"]
  }
];

function PhoneVoiceIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
  );
}

interface ITTaxonomyExplorerProps {
  onSelectRole: (roleId: string) => void;
  isHighlighted?: boolean;
  marketRegion?: 'global' | 'india';
  onNavigateToSection?: (sectionType: 'certs' | 'tools-skills' | 'channels' | 'bookshelf' | 'hackathons' | 'youtubeTeachers', searchQuery: string) => void;
  activeCategoryId?: string | null;
  selectedRoleSlug?: string | null;
  onActiveCategoryChange?: (catId: string | null) => void;
  onSelectedRoleSlugChange?: (slug: string | null) => void;
  isEmbedded?: boolean;
}

export default function ITTaxonomyExplorer({ 
  onSelectRole, 
  isHighlighted = false, 
  marketRegion = 'global',
  onNavigateToSection,
  activeCategoryId,
  selectedRoleSlug: selectedRoleSlugProp,
  onActiveCategoryChange,
  onSelectedRoleSlugChange,
  isEmbedded = false
}: ITTaxonomyExplorerProps) {
  const [localActiveCategoryId, setLocalActiveCategoryId] = useState<string | null>(null);
  const [localSelectedRoleSlug, setLocalSelectedRoleSlug] = useState<string | null>(null);

  const activeCategoryIdResolved = activeCategoryId !== undefined ? activeCategoryId : localActiveCategoryId;
  const selectedRoleSlugResolved = selectedRoleSlugProp !== undefined ? selectedRoleSlugProp : localSelectedRoleSlug;

  const activeCategory = IT_TAXONOMY_DATA.find(c => c.id === activeCategoryIdResolved) || null;
  const selectedRoleSlug = selectedRoleSlugResolved;

  const setActiveCategory = (cat: TaxonomyCategory | null) => {
    const catId = cat ? cat.id : null;
    if (onActiveCategoryChange) {
      onActiveCategoryChange(catId);
    } else {
      setLocalActiveCategoryId(catId);
    }
  };

  const setSelectedRoleSlug = (slug: string | null) => {
    if (onSelectedRoleSlugChange) {
      onSelectedRoleSlugChange(slug);
    } else {
      setLocalSelectedRoleSlug(slug);
    }
  };

  const [explorerSearch, setExplorerSearch] = useState<string>('');
  const [chartLayout, setChartLayout] = useState<'treemap' | 'orgchart' | 'list'>('treemap');
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});

  const overlayRef = useRef<HTMLDivElement>(null);

  // Scroll to top of overlay when activeCategory changes with robust multi-stage resets
  useEffect(() => {
    if (activeCategory) {
      const resetScroll = () => {
        if (overlayRef.current) {
          overlayRef.current.scrollTop = 0;
        }
      };
      
      resetScroll();
      
      const t1 = setTimeout(resetScroll, 10);
      const t2 = setTimeout(resetScroll, 50);
      const t3 = setTimeout(resetScroll, 150);
      const t4 = setTimeout(resetScroll, 300);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [activeCategory]);

  // Listen for escape key press and manage background overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategory(null);
        setSelectedRoleSlug(null);
      }
    };
    if (activeCategory) {
      window.addEventListener('keydown', handleKeyDown, { capture: true });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.body.style.overflow = '';
    };
  }, [activeCategory]);

  // Sorting and searchingcategories
  const searchedCategories = IT_TAXONOMY_DATA.filter(cat => {
    if (explorerSearch.trim() === '') return true;
    return cat.name.toLowerCase().includes(explorerSearch.toLowerCase()) || 
           cat.shortDesc.toLowerCase().includes(explorerSearch.toLowerCase()) ||
           cat.certifications.some(cert => cert.name.toLowerCase().includes(explorerSearch.toLowerCase())) ||
           cat.toolsAndResources.some(t => t.toLowerCase().includes(explorerSearch.toLowerCase()));
  });

  const toggleLevel = (levelId: string) => {
    setExpandedLevels(prev => ({
      ...prev,
      [levelId]: !prev[levelId]
    }));
  };

  const syncToAppModule = (roleTitle: string) => {
    // Attempt to map a text title to existing keys in ALL_ROLES_DATA
    // e.g. "IT Support Analyst" -> "it-support-analyst"
    const slug = roleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const triggerLocalScroll = () => {
      setTimeout(() => {
        const container = overlayRef.current;
        const target = document.getElementById('taxonomy-popup-role-detail');
        if (container && target) {
          const containerRect = container.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const targetTop = container.scrollTop + (targetRect.top - containerRect.top) - 100;
          container.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      }, 150);
    };

    if (ALL_ROLES_DATA[slug]) {
      setSelectedRoleSlug(slug);
      onSelectRole(slug);
      triggerLocalScroll();
    } else {
      // Fallback: search for subtitle match or alert client of target
      const matchKey = Object.keys(ALL_ROLES_DATA).find(key => 
        ALL_ROLES_DATA[key].title.toLowerCase() === roleTitle.toLowerCase() ||
        roleTitle.toLowerCase().includes(ALL_ROLES_DATA[key].title.toLowerCase())
      );
      if (matchKey) {
        setSelectedRoleSlug(matchKey);
        onSelectRole(matchKey);
        triggerLocalScroll();
      } else {
        console.log(`Synergizing active role profile: "${roleTitle}". Details are rendered bottom.`);
      }
    }
  };

  return (
    <div 
      className={`w-full relative transition-all duration-300 ${
        isEmbedded 
          ? 'bg-transparent border-0 p-0 shadow-none' 
          : `bg-[#070b13] border-2 p-5 md:p-6 rounded-none ${
              isHighlighted 
                ? '!border-white border-blink z-30 shadow-[0_0_20px_#fff]' 
                : 'border-[#121c38] shadow-[4px_4px_0px_0px_#1e2e54]'
            }`
      }`}
      id="it-taxonomy-explorer-section"
    >
      {/* Decorative Bezel label */}
      {!isEmbedded && (
        <div className="absolute top-0 right-0 p-1 bg-[#ec4899] text-black font-mono text-[9px] uppercase tracking-wider font-bold">
          TAXONOMY CONTROLLER
        </div>
      )}

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b-2 border-[#121c38] pb-4 mb-5 flex-wrap">
        <div className="flex items-center gap-2.5">
        </div>

        {/* Chart View modes control */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setChartLayout('treemap')}
            className={`px-2 py-1 font-mono text-[11px] border uppercase rounded-none transition cursor-pointer flex items-center justify-center ${
              chartLayout === 'treemap'
                ? 'bg-[#ec4899]/20 text-[#ec4899] border-[#ec4899] font-bold shadow-[2px_2px_0px_#ec4899]'
                : 'text-gray-400 border-[#121c38] hover:border-gray-500'
            }`}
            title="Tactical Treemap Grid"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={() => setChartLayout('orgchart')}
            className={`px-2 py-1 font-mono text-[11px] border uppercase rounded-none transition cursor-pointer flex items-center justify-center ${
              chartLayout === 'orgchart'
                ? 'bg-[#ec4899]/20 text-[#ec4899] border-[#ec4899] font-bold shadow-[2px_2px_0px_#ec4899]'
                : 'text-gray-400 border-[#121c38] hover:border-gray-500'
            }`}
            title="Org Hierarchical Tree"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={() => setChartLayout('list')}
            className={`px-2 py-1 font-mono text-[11px] border uppercase rounded-none transition cursor-pointer flex items-center justify-center ${
              chartLayout === 'list'
                ? 'bg-[#ec4899]/20 text-[#ec4899] border-[#ec4899] font-bold shadow-[2px_2px_0px_#ec4899]'
                : 'text-gray-400 border-[#121c38] hover:border-gray-500'
            }`}
            title="Bento Detailed Ledger"
          >
            <ListCollapse className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SEARCH BOX FOR EXPLORER */}
      <div className="relative mb-5 font-mono">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        <input
          id="taxonomy-search-box"
          type="text"
          value={explorerSearch}
          onChange={(e) => setExplorerSearch(e.target.value)}
          placeholder="Filter domains, roles, registries or software technologies (e.g., Salesforce, SAP, C-DAC, AWS, Cybersecurity)..."
          className="w-full bg-[#02050a] border border-[#1e2e54] pl-10 pr-4 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#ec4899]"
        />
      </div>

      {/* CHART RENDERS */}

      {/* 1. TACTICAL TREEMAP CHART (GRID BENTO GRID OF DOMAINS WITH STYLED CORNERS AND RELATIVE PROPORTION) */}
      {chartLayout === 'treemap' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {searchedCategories.map((cat, idx) => {
            const Icon = cat.icon || Network;
            // Select custom background glow based on color
            let tileStyle = "border-[#1e2e54] hover:border-[#ec4899] hover:shadow-[0_0_10px_rgba(236,72,153,0.15)]";
            if (cat.color === 'emerald') tileStyle = "border-[#1e2e54] hover:border-[#10b981] hover:shadow-[0_0_10px_rgba(16,185,129,0.15)]";
            if (cat.color === 'cyan') tileStyle = "border-[#1e2e54] hover:border-[#06b6d4] hover:shadow-[0_0_10px_rgba(6,182,212,0.15)]";
            if (cat.color === 'blue') tileStyle = "border-[#1e2e54] hover:border-[#3b82f6] hover:shadow-[0_0_10px_rgba(59,130,246,0.15)]";
            if (cat.color === 'yellow') tileStyle = "border-[#1e2e54] hover:border-[#eab308] hover:shadow-[0_0_10px_rgba(234,179,8,0.15)]";
            if (cat.color === 'red') tileStyle = "border-[#1e2e54] hover:border-[#ef4444] hover:shadow-[0_0_10px_rgba(239,68,68,0.15)]";

            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`bg-[#080d19] border p-4.5 rounded-none flex flex-col justify-between cursor-pointer font-mono text-left transition duration-200 select-none relative ${tileStyle}`}
              >
                {/* Visual Number node identifier */}
                <div className="absolute top-2 right-2.5 text-[9px] text-[#121c38] font-bold">
                  {String(idx + 1).padStart(2, '0')} // NODE
                </div>

                <div>
                  <div className="mb-2">
                    <span className="text-[10px] text-gray-400 block font-normal uppercase tracking-wide">
                      Domain Branch
                    </span>
                  </div>

                  <strong className="text-white text-xs font-bold leading-normal block mb-1 hover:text-[#ec4899] transition-colors line-clamp-2">
                    {cat.name}
                  </strong>

                  <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-3 mb-4">
                    {cat.shortDesc}
                  </p>
                </div>

                <div className="border-t border-[#121c38]/50 pt-2 flex items-center justify-between text-[10px] text-[#ec4899] font-bold">
                  <span className="text-slate-500 font-normal">Roles: {Object.values(cat.rolesByLevel).flat().length}</span>
                  <span className="hover:underline">Open PopUp ➔</span>
                </div>
              </div>
            );
          })}

          {searchedCategories.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12 font-mono text-xs border border-dashed border-[#1e2e54]">
              No taxonomy branches found matching search parameters.
            </div>
          )}
        </div>
      )}

      {/* 2. ORG HIERARCHICAL TREE VIEW DIAGRAM */}
      {chartLayout === 'orgchart' && (
        <div className="bg-[#04060b]/95 border-2 border-[#121c38] p-4 md:p-6 rounded-none relative overflow-x-auto min-w-full font-mono text-xs select-none">
          <div className="space-y-6 min-w-[700px] py-4">
            
            {/* BROAD REGULATORY CATEGORY BRANCHES LAYOUT CONTAINER */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-1.5 border-t border-b border-[#1e2e54] py-4 bg-black/20">
              
              {/* Branch 1 */}
              <div className="text-center p-2.5">
                <strong className="text-sky-400 block uppercase font-bold text-[10px] mb-1">Support & Infra Operations</strong>
                <p className="text-[9px] text-gray-500">Service desk, systems, networking networks & operations.</p>
                <div className="mt-2.5">
                  <select 
                    onChange={(e) => {
                      const found = IT_TAXONOMY_DATA.find(cat => cat.id === e.target.value);
                      if (found) setActiveCategory(found);
                    }}
                    className="bg-[#03050a] border border-[#1e2e54] text-[#ec4899] text-[10px] py-1 px-1.5 focus:outline-none cursor-pointer w-full"
                    value={['it-support', 'systems-infra', 'networking', 'telecom-voice'].includes(activeCategoryIdResolved || '') ? (activeCategoryIdResolved || '') : ''}
                  >
                    <option value="" disabled>Select Branch...</option>
                    <option value="it-support">IT Support & Desktop</option>
                    <option value="systems-infra">Systems Administration</option>
                    <option value="networking">Networking & NOC</option>
                    <option value="telecom-voice">Telecom & Voice</option>
                  </select>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="text-center border-t md:border-t-0 md:border-l border-[#121c38]/40 md:border-[#121c38] p-2.5 pt-4 md:pt-2.5">
                <strong className="text-cyan-400 block uppercase font-bold text-[10px] mb-1">Virtualization & Cloud</strong>
                <p className="text-[9px] text-gray-500">Cloud virtualization, DevOps orchestration and platform scaling.</p>
                <div className="mt-2.5">
                  <select 
                    onChange={(e) => {
                      const found = IT_TAXONOMY_DATA.find(cat => cat.id === e.target.value);
                      if (found) setActiveCategory(found);
                    }}
                    className="bg-[#03050a] border border-[#1e2e54] text-[#ec4899] text-[10px] py-1 px-1.5 focus:outline-none cursor-pointer w-full"
                    value={['cloud', 'devops-sre', 'architecture', 'green-computing'].includes(activeCategoryIdResolved || '') ? (activeCategoryIdResolved || '') : ''}
                  >
                    <option value="" disabled>Select Branch...</option>
                    <option value="cloud">Cloud Computing</option>
                    <option value="devops-sre">DevOps & SRE</option>
                    <option value="architecture">Technology Architecture</option>
                    <option value="green-computing">Green Computing & Sustainable IT</option>
                  </select>
                </div>
              </div>

              {/* Branch 3 */}
              <div className="text-center border-t md:border-t-0 md:border-l border-[#121c38]/40 md:border-[#121c38] p-2.5 pt-4 md:pt-2.5">
                <strong className="text-red-400 block uppercase font-bold text-[10px] mb-1">Defensive & Compliance</strong>
                <p className="text-[9px] text-gray-500">Cybersecurity analysis, security monitoring, GRC auditing.</p>
                <div className="mt-2.5">
                  <select 
                    onChange={(e) => {
                      const found = IT_TAXONOMY_DATA.find(cat => cat.id === e.target.value);
                      if (found) setActiveCategory(found);
                    }}
                    className="bg-[#03050a] border border-[#1e2e54] text-[#ec4899] text-[10px] py-1 px-1.5 focus:outline-none cursor-pointer w-full"
                    value={['cybersecurity', 'governance-audit'].includes(activeCategoryIdResolved || '') ? (activeCategoryIdResolved || '') : ''}
                  >
                    <option value="" disabled>Select Branch...</option>
                    <option value="cybersecurity">Cybersecurity Analyst</option>
                    <option value="governance-audit">GRC Audit Compliance</option>
                  </select>
                </div>
              </div>

              {/* Branch 4 */}
              <div className="text-center border-t md:border-t-0 md:border-l border-[#121c38]/40 md:border-[#121c38] p-2.5 pt-4 md:pt-2.5">
                <strong className="text-rose-400 block uppercase font-bold text-[10px] mb-1">Software & Interfaces</strong>
                <p className="text-[9px] text-gray-500">System programing, QA tests, UI/UX graphic mapping, CMS web.</p>
                <div className="mt-2.5">
                  <select 
                    onChange={(e) => {
                      const found = IT_TAXONOMY_DATA.find(cat => cat.id === e.target.value);
                      if (found) setActiveCategory(found);
                    }}
                    className="bg-[#03050a] border border-[#1e2e54] text-[#ec4899] text-[10px] py-1 px-1.5 focus:outline-none cursor-pointer w-full"
                    value={['software-dev', 'qa-testing', 'uiux-design', 'web-cms', 'hardware-iot'].includes(activeCategoryIdResolved || '') ? (activeCategoryIdResolved || '') : ''}
                  >
                    <option value="" disabled>Select Branch...</option>
                    <option value="software-dev">Software Development</option>
                    <option value="qa-testing">QA Testing SDET</option>
                    <option value="uiux-design">UI/UX Design UI</option>
                    <option value="web-cms">Web & CMS Tech</option>
                    <option value="hardware-iot">Hardware & IoT</option>
                  </select>
                </div>
              </div>

              {/* Branch 5 */}
              <div className="text-center border-t md:border-t-0 md:border-l border-[#121c38]/40 md:border-[#121c38] p-2.5 pt-4 md:pt-2.5">
                <strong className="text-yellow-400 block uppercase font-bold text-[10px] mb-1">Analytics, BI & AI ML</strong>
                <p className="text-[9px] text-gray-500">Data science models, analytic tables queries, ERP/CRM engines.</p>
                <div className="mt-2.5">
                  <select 
                    onChange={(e) => {
                      const found = IT_TAXONOMY_DATA.find(cat => cat.id === e.target.value);
                      if (found) setActiveCategory(found);
                    }}
                    className="bg-[#03050a] border border-[#1e2e54] text-[#ec4899] text-[10px] py-1 px-1.5 focus:outline-none cursor-pointer w-full"
                    value={['data-analytics', 'data-science-ai', 'db-admin', 'erp-crm', 'automation-rpa'].includes(activeCategoryIdResolved || '') ? (activeCategoryIdResolved || '') : ''}
                  >
                    <option value="" disabled>Select Branch...</option>
                    <option value="data-analytics">Data Analytics & BI</option>
                    <option value="data-science-ai">Data Science & AI/ML</option>
                    <option value="db-admin">Database Admin (DBA)</option>
                    <option value="erp-crm">ERP, CRM platforms</option>
                    <option value="automation-rpa">Automation RPA low-code</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CORE LADDER SENIORITY LEVEL TREE STEPS */}
            <div className="border border-[#121c38] p-3.5 bg-black/40 text-left space-y-4">
              <strong className="text-[#ec4899] uppercase text-xs font-bold leading-none block border-b border-[#121c38] pb-1.5">
                Step-by-Step IT Seniority Career Ladder:
              </strong>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                {/* Level 1 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-amber-500 block">Level 1: Intern/Trainee</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Focuses on absorbing team standard practices, getting familiar with tools.</p>
                </div>
                {/* Level 2 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-emerald-500 block">Level 2: Associate/Junior</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Implements task tickets independently; masters terminal command-lines.</p>
                </div>
                {/* Level 3 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-cyan-400 block">Level 3: Professional</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Core developer/engineer; manages SLA timelines with clients.</p>
                </div>
                {/* Level 4 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-rose-400 block">Level 4: Senior Specialist</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Designs systems; conducts code verification and audit guidelines.</p>
                </div>
                {/* Level 5 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-indigo-400 block">Level 5: Team Lead / Architect</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Orchestrates architecture plans; configures cluster topologies.</p>
                </div>
                {/* Level 6 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-pink-400 block">Level 6: Ops Manager</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Budget allocations; ensures teams abide by SLA security controls.</p>
                </div>
                {/* Level 7 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-purple-400 block">Level 7: Department Director</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Drives multi-year roadmap schedules; corporate platforms choice.</p>
                </div>
                {/* Level 8 */}
                <div className="bg-[#05070c] border border-slate-800 p-2 text-[10px]">
                  <strong className="text-red-400 block">Level 8: Executive (CIO/CTO)</strong>
                  <p className="text-slate-500 leading-normal mt-0.5">Guarantees digital expansion; defines privacy governance paths.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. BENTO DETAILED LEDGER LISTING ALL THE DOMAINS */}
      {chartLayout === 'list' && (
        <div className="space-y-4">
          {searchedCategories.map((cat, idx) => {
            const Icon = cat.icon || Network;
            return (
              <div 
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className="bg-[#080d19] border border-[#1e2e54] hover:border-[#ec4899] hover:shadow-[0_0_12px_rgba(236,72,153,0.15)] p-4 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition cursor-pointer select-none"
              >
                <div className="flex items-start">
                  <div>
                    <span className="text-[9px] text-[#ec4899] font-bold block mb-0.5">DOMAIN #{idx + 1}</span>
                    <h4 className="text-white text-sm font-bold">{cat.name}</h4>
                    <p className="text-gray-400 text-[11px] leading-relaxed mt-1 max-w-2xl">{cat.shortDesc}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[10px] text-gray-500 bg-black/40 px-1.5 py-0.5 border border-slate-900">
                        Certifications: <strong className="text-slate-300 font-normal">{cat.certifications.length}</strong>
                      </span>
                      <span className="text-[10px] text-gray-500 bg-black/40 px-1.5 py-0.5 border border-slate-900">
                        India Track: <strong className="text-amber-400 font-normal">{cat.indiaScheme.split(',')[0]}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-1.5 bg-[#ec4899]/15 border border-[#ec4899] text-[#ec4899] hover:bg-[#ec4899]/30 text-xs font-bold uppercase transition rounded-none cursor-pointer text-center md:self-center"
                >
                  Inspect Domain details ➔
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* POPUP OVERLAY DETAIL WINDOW */}
      <AnimatePresence>
        {activeCategory && typeof document !== 'undefined' && (
          createPortal(
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              ref={overlayRef}
              onClick={() => {
                setActiveCategory(null);
                setSelectedRoleSlug(null);
              }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[9999] overflow-y-auto custom-scrollbar font-mono select-text"
            >
              <div className="flex min-h-full items-center justify-center p-1.5 sm:p-4 md:p-8">
                <motion.div 
                  initial={{ y: 25, opacity: 0, scale: 0.97 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 25, opacity: 0, scale: 0.97 }}
                  transition={{ type: "spring", damping: 28, stiffness: 220 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-6xl bg-[#060b14] border border-[#ec4899] p-3.5 sm:p-5 md:p-6 shadow-[0_0_40px_rgba(236,72,153,0.3)] my-2 sm:my-8 relative"
                >
            
            {/* Details Title Header */}
            <div className="flex justify-between items-start border-b-2 border-[#121c38] pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div>
                  <span className="text-[9px] text-[#ec4899] font-bold block uppercase tracking-wider">CAREER TAXONOMY INSPECTION PROFILE</span>
                  <h3 className="text-lg md:text-xl text-white font-bold font-sans">{activeCategory.name}</h3>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveCategory(null);
                  setSelectedRoleSlug(null);
                }}
                className="p-1.5 border border-red-500 text-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 transition cursor-pointer flex items-center justify-center rounded-none"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Recommendation details & credentials */}
              <div className="lg:col-span-4 space-y-4 text-xs">
                
                <div className="bg-black/60 border border-[#1e2e54] p-3.5 relative">
                  <strong className="text-white block mb-1 uppercase tracking-wider text-[11px] text-[#ec4899]">💡 STUDY RECOMMENDATIONS:</strong>
                  <p className="text-gray-300 leading-relaxed text-[11px]">{activeCategory.recommendation}</p>
                </div>

                <div className="bg-black/60 border border-amber-900/50 p-3.5 relative">
                  <strong className="text-amber-400 block mb-1 uppercase tracking-wider text-[11px] font-bold">📡 INDIA NATIONAL SKILLING GATEWAY:</strong>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{activeCategory.indiaScheme}</p>
                  <p className="text-[10px] text-gray-500 leading-normal mt-2 italic border-t border-amber-900/40 pt-1.5">
                    * Aligning your training with Indian registries like SWAYAM (NPTEL) or C-DAC ACTS provides direct academic credit transfers.
                  </p>
                </div>

                {/* Practical sandbox environment check */}
                <div className="bg-[#03050a] border border-[#121c38] p-3.5">
                  <strong className="text-white uppercase block mb-2 text-[11px] tracking-wider text-cyan-400">🔧 PRACTICAL TEST SETUP:</strong>
                  <div className="space-y-1.5 text-gray-400 text-[11.px]">
                    {activeCategory.toolsAndResources.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-cyan-500">✔</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Roles mapped by seniority levels ladder & certified registries */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* MAPPED REGISTRY CERTIFICATIONS */}
                <div>
                  <strong className="text-white uppercase tracking-wider text-xs font-bold block mb-3 text-[#ec4899] border-b border-[#121c38] pb-1.5">
                    Recommended Credentials & Official Registries:
                  </strong>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {[...activeCategory.certifications]
                      .sort((a, b) => {
                        const providerCompare = a.provider.localeCompare(b.provider);
                        if (providerCompare !== 0) return providerCompare;
                        return a.name.localeCompare(b.name);
                      })
                      .map((cert, k) => (
                      <div key={k} className="bg-[#0c1224]/50 border border-[#1e2e54] p-3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                            <span>{cert.provider}</span>
                            <span className="text-amber-500 font-bold">Authorized Registry</span>
                          </div>
                          <strong className="text-white text-xs block leading-snug">{cert.name}</strong>
                          <p className="text-gray-400 text-[10px] leading-relaxed mt-1">{cert.bestFor}</p>
                        </div>

                        <div className="border-t border-[#121c38]/50 pt-2 mt-2.5 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">Verify & Register:</span>
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#ec4899] hover:underline flex items-center gap-0.5 font-bold"
                          >
                            Official Portal <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROLES COORD MATRIX BY SENIORITY LADDER */}
                <div>
                  <strong className="text-white uppercase tracking-wider text-xs font-bold block mb-3 text-[#ec4899] border-b border-[#121c38] pb-1.5">
                    Domain Role Matrix Across the Career Ladder:
                  </strong>

                  <div className="bg-[#03060c] border border-[#121c38] divide-y divide-[#121c38]/40 text-[11px] font-mono">
                    <div className="hidden sm:grid grid-cols-12 p-2 px-3 bg-black/60 font-bold text-[#ec4899]">
                      <div className="col-span-4 uppercase">Seniority Level</div>
                      <div className="col-span-8 uppercase text-left">Mapped Industry Roles</div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-amber-500 flex items-center gap-1">
                        <span className="sm:hidden text-amber-500/70">▶</span> 1. Intern / Trainee
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.intern.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-emerald-500 flex items-center gap-1">
                        <span className="sm:hidden text-emerald-500/70">▶</span> 2. Associate / Junior
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.associate.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-cyan-400 flex items-center gap-1">
                        <span className="sm:hidden text-cyan-400/70">▶</span> 3. Specialist Professional
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.professional.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-[#ec4899] flex items-center gap-1">
                        <span className="sm:hidden text-[#ec4899]/70">▶</span> 4. Senior Specialist
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.senior.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-indigo-400 flex items-center gap-1">
                        <span className="sm:hidden text-indigo-400/70">▶</span> 5. Team Lead / Architect
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.lead.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-slate-400 flex items-center gap-1">
                        <span className="sm:hidden text-slate-400/70">▶</span> 6. Operations Manager
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.manager.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-purple-400 flex items-center gap-1">
                        <span className="sm:hidden text-purple-400/70">▶</span> 7. Department Director
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.director.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-12 p-2.5 sm:p-2 px-3 gap-1.5 sm:gap-0">
                      <div className="sm:col-span-4 font-bold text-red-400 flex items-center gap-1">
                        <span className="sm:hidden text-red-400/70">▶</span> 8. CXO Executive Tech
                      </div>
                      <div className="sm:col-span-8 text-slate-300">
                        <div className="flex flex-wrap gap-1.5">
                          {activeCategory.rolesByLevel.executive.map((r, i) => (
                            <button key={i} onClick={() => syncToAppModule(r)} className="px-1.5 py-0.5 bg-black hover:bg-[#ec4899]/10 hover:text-white text-[10px] border border-slate-900 transition-colors cursor-pointer select-text">{r} ⚡</button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                  <span className="text-[10px] text-gray-500 leading-normal italic block mt-2 text-right">
                    * Click any role representing with a '⚡' symbol to set it dynamically in active target comparison tables.
                  </span>
                </div>

              </div>

            </div>

             {/* If a role profile is selected locally, render it in a details card below the matrix lists in taxonomy view */}
             {selectedRoleSlug && ALL_ROLES_DATA[selectedRoleSlug] && (
               <div id="taxonomy-popup-role-detail" className="mt-8 space-y-4 border-2 border-[#ec4899]/60 p-1 bg-[#050912]/95 scroll-mt-20">
                 <div className="flex justify-between items-center bg-[#0d1527] p-3 px-4 border-b border-[#ec4899]/30">
                   <span className="text-xs text-slate-300">
                     Active Taxonomy Role Inspection: <strong className="text-[#ec4899] font-bold uppercase tracking-wider font-sans">{ALL_ROLES_DATA[selectedRoleSlug].title}</strong>
                   </span>
                   <button
                     onClick={() => setSelectedRoleSlug(null)}
                     className="px-2.5 py-1 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-white border border-red-900/40 text-xs font-bold transition flex items-center justify-center cursor-pointer uppercase font-mono"
                     title="Close details"
                   >
                     Close Panel ✕
                   </button>
                 </div>
                 <div className="bg-[#050912]/95 p-3.5 max-h-[600px] overflow-y-auto custom-scrollbar">
                   <RoleDetailPanel 
                     role={ALL_ROLES_DATA[selectedRoleSlug]} disableScrollIntoView={true}
                     onClose={() => setSelectedRoleSlug(null)}
                     marketRegion={marketRegion}
                     onNavigateToSection={(sectionType, queryText) => {
                       // Close taxonomy popup when navigating to specific general sections
                       setActiveCategory(null);
                       setSelectedRoleSlug(null);
                       onNavigateToSection?.(sectionType, queryText);
                     }}
                   />
                 </div>
               </div>
             )}

            {/* Popup footer advice */}
            <div className="border-t border-[#121c38] pt-3.5 mt-5 text-[10px] text-gray-500 font-mono text-center flex flex-col sm:flex-row sm:justify-between items-center gap-2">
              <span>* Data source registers cross-referenced against SFIA competence models 2026.</span>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-red-500 hover:underline uppercase font-bold"
              >
                [Dismiss and return to dashboard]
              </button>
            </div>

                </motion.div>
              </div>
            </motion.div>,
            document.body
          )
        )}
      </AnimatePresence>

    </div>
  );
}
