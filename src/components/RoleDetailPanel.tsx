import React, { useState } from 'react';
import { RoleDetail, Certification, ResumeKeyword } from '../data/rolesData';
import { 
  X, Briefcase, Award, Terminal, CheckCircle2, AlertCircle, Sparkles, HelpCircle, 
  ArrowRight, ShieldCheck, DollarSign, Building2, MapPin, History, RefreshCw, Clock, ExternalLink, Play,
  FileDown, Paperclip, Youtube, Scale
} from 'lucide-react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import { jsPDF } from 'jspdf';
import { findTeachersForPrerequisite } from '../utils/prereqAudit';

interface RoleDetailPanelProps {
  role: RoleDetail;
  onClose: () => void;
  marketRegion: 'global' | 'india';
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onNavigateToSection?: (sectionType: 'certs' | 'tools-skills' | 'channels' | 'bookshelf' | 'hackathons' | 'youtubeTeachers', searchQuery: string) => void;
  disableScrollIntoView?: boolean;
  isLight?: boolean;
  onCompareRole?: (roleId: string) => void;
}

export function getDirectCertUrl(certName: string, fallbackUrl: string = '#'): string {
  const normalized = certName.toLowerCase();
  
  if (normalized.includes('google it support')) {
    return 'https://www.coursera.org/professional-certificates/google-it-support';
  }
  if (normalized.includes('google cybersecurity')) {
    return 'https://www.coursera.org/professional-certificates/google-cybersecurity';
  }
  if (normalized.includes('comptia a+')) {
    return 'https://www.comptia.org/certifications/a';
  }
  if (normalized.includes('network+') || normalized.includes('comptia network')) {
    return 'https://www.comptia.org/certifications/network';
  }
  if (normalized.includes('security+') || normalized.includes('comptia security')) {
    return 'https://www.comptia.org/certifications/security';
  }
  if (normalized.includes('linux+') || normalized.includes('comptia linux')) {
    return 'https://www.comptia.org/certifications/linux';
  }
  if (normalized.includes('itil 4')) {
    return 'https://www.peoplecert.org/ways-to-get-certified/itil-framework/itil-4-foundation';
  }
  if (normalized.includes('aws cloud practitioner') || normalized.includes('aws certified cloud practitioner')) {
    return 'https://aws.amazon.com/certification/certified-cloud-practitioner/';
  }
  if (normalized.includes('azure fundamentals') || normalized.includes('az-900') || normalized.includes('microsoft certified: azure fundamentals')) {
    return 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/';
  }
  if (normalized.includes('aws certified sysops') || normalized.includes('sysops administrator')) {
    return 'https://aws.amazon.com/certification/certified-sysops-admin-associate/';
  }
  if (normalized.includes('aws certified solutions architect') || normalized.includes('solutions architect')) {
    return 'https://aws.amazon.com/certification/certified-solutions-architect-associate/';
  }
  if (normalized.includes('devops engineer')) {
    return 'https://aws.amazon.com/certification/certified-devops-engineer-professional/';
  }
  if (normalized.includes('power bi') || normalized.includes('pl-300')) {
    return 'https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/';
  }
  if (normalized.includes('salesforce administrator') || normalized.includes('salesforce certified')) {
    return 'https://trailhead.salesforce.com/en/credentials/administrator';
  }
  if (normalized.includes('cisco ccna') || normalized.includes('ccna')) {
    return 'https://learningnetwork.cisco.com/s/ccna';
  }
  if (normalized.includes('google cloud generative ai') || normalized.includes('generative ai learning path')) {
    return 'https://cloud.google.com/training/courses/generative-ai-fundamentals';
  }
  if (normalized.includes('sap certified application')) {
    return 'https://training.sap.com/certification/sap-certified-application-associate-sap-s4hana-cloud-private-edition-sourcing-and-procurement-c_ts452_2023';
  }
  if (normalized.includes('sap certified') || normalized.includes('custom sap')) {
    return 'https://training.sap.com/certification/';
  }
  if (normalized.includes('cissp') || normalized.includes('certified information systems security')) {
    return 'https://www.isc2.org/certifications/cissp';
  }
  if (normalized.includes('kubernetes administrator') || normalized.includes('cka')) {
    return 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/';
  }
  if (normalized.includes('meta front-end')) {
    return 'https://www.coursera.org/professional-certificates/meta-front-end-developer';
  }
  if (normalized.includes('terraform associate')) {
    return 'https://www.hashicorp.com/certification/terraform-associate';
  }
  if (normalized.includes('red hat') || normalized.includes('rhcsa')) {
    return 'https://www.redhat.com/en/services/certification/rhcsa';
  }
  if (normalized.includes('windows server hybrid')) {
    return 'https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/';
  }
  
  if (fallbackUrl === 'https://www.coursera.org') {
    return 'https://www.coursera.org/courses?query=it';
  }
  if (fallbackUrl === 'https://comptia.org') {
    return 'https://www.comptia.org/certifications';
  }

  return fallbackUrl;
}

export interface ResearchedValues {
  mustHave: string;
  goodToHave: string;
  certBoost: string;
  toolKnowledge: string;
  interviewTopics: string;
  projectTasks: string;
  careerMoves: string;
  marketSignal: string;
}

export function getResearchedValues(role: RoleDetail): ResearchedValues {
  const c = role.id;
  
  if (c === 'it-support-analyst') {
    return {
      mustHave: 'Active Directory domain user profiles, Windows 10/11 troubleshooting, Outlook and M365 account configurations, basic TCP/IP networking, and strict SLA ticketing workflows.',
      goodToHave: 'PowerShell systems scripts foundation, business macOS endpoint setups, enterprise printer spool diagnostics, and high-security remote desktop logs.',
      certBoost: 'CompTIA A+ (global foundational standard), Google IT Support Professional certificate, and ITIL 4 Foundation (critical for ITIL/ITSM compliance).',
      toolKnowledge: 'Active Directory Users and Computers, ServiceNow Enterprise ticket management, Zendesk Help Desk suite, Microsoft Intune clients, and TeamViewer tools.',
      interviewTopics: 'Basic hardware diagnostic checks, resolving network IP address assignment failures, and prioritizing peak tickets efficiently under tight SLAs.',
      projectTasks: 'Setting up an isolated hypervisor sandbox (VirtualBox), installing evaluation Windows Server OS, and configuring Active Directory domains with test users.',
      careerMoves: 'Rapid vertical advancement to Enterprise Desktop Support Engineer, Systems Administrator associate, or Lead Support Specialist.',
      marketSignal: 'Critical frontline resource. Appears in over 65% of entry-level business IT support job advertisements nationwide.'
    };
  }
  if (c === 'desktop-support-engineer') {
    return {
      mustHave: 'Physical workstation diagnostics, enterprise OS deployments (PXE, MDT, SCCM imaging), peripheral arrays setups, network cables tracing, and local hardware profiles.',
      goodToHave: 'Corporate VoIP endpoints, interactive smart board visual units, asset registry database administration, and mobile device policies.',
      certBoost: 'CompTIA A+ hardware, Microsoft 365 Certified Endpoint Administrator Associate credentials.',
      toolKnowledge: 'Microsoft Intune / SCCM manager platforms, Acronis Cyber Backup solutions, Symantec Ghost imaging, and Smart Deploy builders.',
      interviewTopics: 'Rebuilding damaged boot records, troubleshooting motherboard power rails, and bulk deploying remote enterprise software updates.',
      projectTasks: 'Executing silent software MSI installer bundles via PowerShell scripts and staging network printer profiles across multiple local subnet channels.',
      careerMoves: 'Promotion to IT Operations Team Lead, virtualization deployment engineer, or systems technician.',
      marketSignal: 'Ubiquitous corporate requirement. High demand across on-site offices, hybrid spaces, and large IT outsourcing centers.'
    };
  }
  if (c === 'network-engineer') {
    return {
      mustHave: 'OSI framework layers, IP subnet calculations (VLSM), IP routing protocols (OSPF, BGP, EIGRP), VLAN partitioning, Cisco IOS parameters, and security ACLs.',
      goodToHave: 'Python scripts for network configuration automation (Netmiko), Ansible configuration templates, and basic AWS/Azure VPS networking configurations.',
      certBoost: 'Cisco CCNA (200-301) routing core, Cisco CCNP Enterprise structures, and CompTIA Network+ foundations.',
      toolKnowledge: 'Cisco IOS terminal commands, Wireshark packet capture diagnostics, GNS3 sandbox simulations, SolarWinds, and Putty terminal clients.',
      interviewTopics: 'Explaining 3-way TCP handshakes, resolving asymmetric routing loops, and implementing network-wide VLAN routing rules.',
      projectTasks: 'Designing a fully functional virtual corporate topology with multiple subnets and access list firewalls inside the Cisco Packet Tracer simulator.',
      careerMoves: 'Advancement to Senior Network Architect, Network Security Specialist, or Infrastructure Operations Director.',
      marketSignal: 'Extremely high demand as enterprises scale data centers, build remote VPN structures, and optimize campus fabrics.'
    };
  }
  if (c === 'cloud-support-associate') {
    return {
      mustHave: 'Linux OS administration command-line, AWS/Azure core resources (VPCs, subnets, IGW), IAM temporary keys and roles, DNS configurations, and TLS/SSL secures.',
      goodToHave: 'Terraform configurations, CloudWatch log streams search, basic Shell script workflows, and Docker container runs.',
      certBoost: 'AWS Certified Cloud Practitioner and Azure Fundamentals (AZ-900) certifications.',
      toolKnowledge: 'AWS Management Console / Azure Portal hubs, AWS CLI tool, CloudWatch, SSH Putty client, and Linux Bash terminals.',
      interviewTopics: 'Debugging cloud instance connectivity, handling failed IAM object permissions, and understanding CDN distribution networks.',
      projectTasks: 'Configuring a static website on AWS S3 with an encrypted Custom CloudFront Distribution and security SSL certificates.',
      careerMoves: 'Pathways leading to Cloud Platforms Engineer, AWS Solutions Architect, and DevOps Associate.',
      marketSignal: 'Fastest-growing entry-level track. High hiring indices across enterprise software firms, technology start-ups, and global system integrators.'
    };
  }
  if (c === 'cybersecurity-analyst') {
    return {
      mustHave: 'SIEM log monitoring feeds, firewall rules analysis, TCP/IP diagnostic handshakes, vulnerability identification pipelines, and threat alert mitigations.',
      goodToHave: 'Penetration tests inside Kali Linux, Nessus scanning setups, basic auditing guidelines (NIST, ISO27001), and Python parser scripts.',
      certBoost: 'CompTIA Security+, Google Cybersecurity certificate validation, and CISSP (advanced executive paths).',
      toolKnowledge: 'Splunk SIEM dashboards, Kali Linux security, Nmap scanners, Wireshark, CrowdStrike Falcon endpoints, and Nessus scanners.',
      interviewTopics: 'Identifying SQL injection footprints on web server log files, isolating suspicious network traffic, and explaining symmetric vs. asymmetric encryption.',
      projectTasks: 'Parsing web server log lines with Python script loops to flag unauthorized IP hits and scanning sandbox servers for open network port vulnerability.',
      careerMoves: 'Security Analyst Tier L2, Incident Command Manager, or GRC Compliance Auditor.',
      marketSignal: 'Premium specialist role. Extreme global shortage of cybersecurity analysts across finance, healthcare, and retail sectors.'
    };
  }
  if (c === 'data-analyst') {
    return {
      mustHave: 'Advanced SQL queries (Joins, window functions, CTEs), interactive business dashboarding tools, data parsing Excel formulas, and data cleaning systems.',
      goodToHave: 'Python Pandas and Numpy data preparation, Jupyter notebooks, basic correlation statistics, and Snowflake or big data warehouses.',
      certBoost: 'Google Data Analytics Professional Certificate, and Microsoft Power BI Data Analyst (PL-300).',
      toolKnowledge: 'PostgreSQL, MySQL databases, Microsoft Power BI, Tableau software, Excel pivot tables, Google BigQuery, and Pandas.',
      interviewTopics: 'Optimizing SQL queries to run faster on major databases, designing clean data visualization dashboards, and handling missing null data values.',
      projectTasks: 'Compiling structured business data from CSV files and constructing interactive KPI visual dashboards with custom measures in Power BI.',
      careerMoves: 'Lead BI Specialist, Enterprise Data Engineer, or Data Science Associate.',
      marketSignal: 'Highly sought role. Critical for businesses converting modern telemetry feeds into executable boardroom strategies.'
    };
  }
  if (c === 'frontend-developer') {
    return {
      mustHave: 'Modern JavaScript (ES6+ loops and asyncs), HTML5 semantic templates, React 18 / dynamic components hooks, responsive layouts, and REST API integrations.',
      goodToHave: 'TypeScript coding, bundler parameters (Vite/Webpack), Next.js framework architectures, and accessibility evaluations.',
      certBoost: 'Meta Front-End Developer certificate, React developer certifications.',
      toolKnowledge: 'VS Code compiler, Github, Figma visual tools, Chrome DevTools console, Vercel deployments, and Tailwind CSS.',
      interviewTopics: 'Explaining React virtual DOM diffing, handling asynchronous component state re-renders, and managing secure API authorization headers.',
      projectTasks: 'Assembling a responsive front-end dashboard consuming real-time external REST APIs and utilizing CSS transitions.',
      careerMoves: 'Senior UI Developer, Frontend Lead Architect, or Full Stack Developer.',
      marketSignal: 'Continuous high demand. Crucial as services migrate to intuitive browser applications and SaaS channels.'
    };
  }
  if (c === 'devops-engineer') {
    return {
      mustHave: 'Linux administration, container isolation (Docker), cluster orchestration (Kubernetes), modern CI/CD automation pipelines, and Terraform scripts (IaC).',
      goodToHave: 'Grafana monitoring, Ansible configuration templates, AWS certified solutions blueprints, and advanced bash automation.',
      certBoost: 'Certified Kubernetes Administrator (CKA), HashiCorp Certified Terraform Associate, and AWS Certified DevOps professional.',
      toolKnowledge: 'Docker engines, Kubernetes clusters (EKS), Terraform configurations, GitHub Actions, Jenkins, Ansible, Prometheus, and Grafana.',
      interviewTopics: 'Explaining immutable infrastructure advantages, constructing zero-downtime rolling updates, and securing API authorization secrets in container runs.',
      projectTasks: 'Writing custom YAML definitions to launch multi-container application clusters and compiling GitHub Actions check workflows.',
      careerMoves: 'Site Reliability Specialist, Platform Engineer Director, or Cloud Systems Architect.',
      marketSignal: 'Top-tier IT role commands massive salary premiums across all major manufacturing, software, and tech hub ecosystems.'
    };
  }
  if (c === 'system-administrator') {
    return {
      mustHave: 'RedHat/Ubuntu server configurations, Windows Server Domain Services (AD DS), server virtualizations, RAID disks arrays, and automated network backup recovery.',
      goodToHave: 'PowerShell systems loops, Unix Bash automation, NAS / SAN storage arrays, and cloud hybrid connections.',
      certBoost: 'Red Hat Certified System Administrator (RHCSA), CompTIA Linux+, and Windows Server Hybrid Administrator credential.',
      toolKnowledge: 'VMware ESXi server, Active Directory, RedHat Linux virtual machines, Veeam backup, Ansible automation, PowerShell, and AD.',
      interviewTopics: 'Replacing failed hard disks in hot-swap RAID arrays without server downs and configuring enterprise active directory security policies.',
      projectTasks: 'Writing an automated Bash backup routine to archive directories, compress outputs, and upload securely to cloud file systems.',
      careerMoves: 'Enterprise Network Cloud Architect, SRE Associate, or Platform Infrastructure Director.',
      marketSignal: 'Pillars of traditional operations. Ongoing hiring priority as companies coordinate multi-cloud integrations.'
    };
  }
  if (c === 'erp-support-analyst') {
    return {
      mustHave: 'Enterprise ERP configuration modules, SQL database ledger queries, invoice data checking, and user access controls/permissions.',
      goodToHave: 'Apex language schemas, data migration script formats, and Salesforce CRM integration feeds.',
      certBoost: 'SAP Certified Associate, and Salesforce Administrator certifications.',
      toolKnowledge: 'SAP S/4HANA configurations, Oracle ERP system, Salesforce CRM, SQL Server, and Jira ticket portal.',
      interviewTopics: 'Diagnosing accounting sync bottlenecks between CRM and financial engines and checking user license tier compliance.',
      projectTasks: 'Drafting custom SQL join queries to locate orphaned billing records and resolving system currency conversions rules.',
      careerMoves: 'ERP Solution Consultant, Business Systems Analyst Lead, or ERP Operations Director.',
      marketSignal: 'Niche corporate role. Tremendously stable job market concentrated inside manufacturing, global commerce, and healthcare giants.'
    };
  }
  if (c === 'prompt-engineer') {
    return {
      mustHave: 'System prompt instructions parameters, Few-shot and Chain-of-Thought template designs, LLM temperature tuning, prompt evaluation trials, and Python API wrappers.',
      goodToHave: 'LangChain integration loops, vector search indexes, jailbreak mitigation scripts, and semantic indexing libraries.',
      certBoost: 'Google Cloud Generative AI learning path, deeplearning.ai prompt certifications.',
      toolKnowledge: 'Google AI Studio / Gemini API, OpenAI Playground console, Python Jupyter labs, LangChain, Pinecone Vector DB, and Claude API.',
      interviewTopics: 'Securing an LLM assistant from malicious input injection and structuring raw texts into exact JSON responses consistently.',
      projectTasks: 'Constructing robust test prompts evaluating LLM responses for accuracy and designing a conversational UI utilizing Gemini SDK API.',
      careerMoves: 'AI Systems Architect, AI Implementation Consultant, or Generative AI Product Manager.',
      marketSignal: 'Cutting-edge job segment. Exceptional growth index as organizations deploy agentic systems and Large Language models.'
    };
  }

  // Dynamic but highly precise fallback generation based on role taxonomy properties
  const roleName = role.title;
  const domain = role.domain;
  const isCoding = role.isCoding;
  const isCloud = domain.includes('Cloud');
  const isCyber = domain.includes('Cyber');
  const isNet = domain.includes('Net');
  const isData = domain.includes('Data');
  const isDev = domain.includes('Development') || domain.includes('DevOps');
  const isSupport = domain.includes('Support') || domain.includes('Service');

  let mustHave = '';
  let goodToHave = '';
  let certBoost = '';
  let toolKnowledge = '';
  let interviewTopics = '';
  let projectTasks = '';
  let careerMoves = '';
  let marketSignal = '';

  if (isCloud) {
    mustHave = `Cloud service patterns (resource allocations), solid operating system fundamentals, IAM security policy grids, and basic command terminals.`;
    goodToHave = `Automation infrastructure configurations (CLI scripts), basic VPC subnetting routes, and cloud dashboard systems monitoring.`;
    certBoost = `AWS Certified Cloud Practitioner or AZ-900 Microsoft Azure Fundamentals certifications.`;
    toolKnowledge = `AWS Cloud Console, Azure Control Portal, CloudWatch analytics, and terminal ssh shell tools.`;
    interviewTopics = `Mitigating server network blocking errors, evaluating file storage permissions, and designing cost-efficient cloud allocations.`;
    projectTasks = `Launching scalable cloud instances with custom firewalls and monitoring memory storage dashboards.`;
    careerMoves = `Promotion to Cloud Platforms Engineer, Systems Admin Associate, or DevOps Technician.`;
    marketSignal = `Rapidly growing sector. Appearing in more than 50% of active ${roleName} job descriptions on global markets.`;
  } else if (isCyber) {
    mustHave = `Network ports security checks, firewall access profiles auditing, system patch verifications, and alert handling logs.`;
    goodToHave = `Vulnerability scanners operating metrics, basic shell parser scripts, and corporate security guidelines implementation.`;
    certBoost = `CompTIA Security+ license or Google Cybersecurity professional certificate indicators.`;
    toolKnowledge = `Splunk platform, Wireshark network analyser, Nmap utilities, Active Directory, and cybersecurity checklists.`;
    interviewTopics = `Explaining asymmetric key safety models, assessing unauthorized network login trials, and closing old firewall vulnerabilities.`;
    projectTasks = `Configuring network security rules on virtual server files and executing test runs to inspect port availability safely.`;
    careerMoves = `Promotion to Lead SOC Analyst, Security Auditor, or Incidents Control Manager.`;
    marketSignal = `High-demand sector. Substantial vacancy indexes nationwide owing to compliance and security mandates.`;
  } else if (isNet) {
    mustHave = `TCP/IP connectivity checks, router routing tables, LAN/WAN switches configurations, VLAN access controls, and terminal utilities.`;
    goodToHave = `Python network scripts, wireless signal assessments, and internet gateway firewall configuration scripts.`;
    certBoost = `Cisco CCNA (200-301) routing certifications or CompTIA Network+ guidelines.`;
    toolKnowledge = `Cisco IOS, Wireshark packets captures, SolarWinds monitor gauges, and Putty terminal lines.`;
    interviewTopics = `Explaining data routing paths, resolving device IP conflicts, and describing firewall routing rules.`;
    projectTasks = `Designing an IP routing network map with subnets and executing target ping diagnostics.`;
    careerMoves = `Senior Network Engineer, Network Security Administrator, or Unified Communications Analyst.`;
    marketSignal = `Steady core sector. Steady vacancy levels in corporate communications, cloud transitions, and offshore centers.`;
  } else if (isData) {
    mustHave = `Structured SQL databases inquiries, spreadsheets processing tables, dynamic formatting formulas, and metric dashboards development.`;
    goodToHave = `Python Pandas scripts, basic correlation statistics, warehouse structures, and clean chart visual configurations.`;
    certBoost = `Google Data Analytics certificate or Microsoft Power BI Associate (PL-300).`;
    toolKnowledge = `PostgreSQL, MySQL, Microsoft Power BI dashboard, Excel analytics, and Tableau tools.`;
    interviewTopics = `Optimizing database search sequences, constructing clear bar and pie charts, and handling empty records safely.`;
    projectTasks = `Preparing structured charts using raw datasets and configuring interactive dashboards with filters.`;
    careerMoves = `Lead Database Analyst, BI Solutions Architect, or Enterprise Data Specialist.`;
    marketSignal = `High growth index. Business automation processes depend heavily on accurate role analytical intelligence.`;
  } else if (isDev) {
    mustHave = `Modern programming structures, version control updates, software debugging methods, and clean API parameters integration.`;
    goodToHave = `Dynamic coding scripts, visual layouts formatting, automated check suites, and cloud testing setups.`;
    certBoost = `React Certified Developer or DevOps Foundations credentials.`;
    toolKnowledge = `VS Code compiler, HTML/CSS frameworks, GitHub actions logs, and docker systems.`;
    interviewTopics = `Describing variables scope, building solid client-server connections, and managing Git changes smoothly.`;
    projectTasks = `Assembling a multi-component interactive website module and verifying API response triggers.`;
    careerMoves = `Senior Software Developer, Team Lead, or Full-Stack Solutions Engineer.`;
    marketSignal = `Robust, premier segment. Sustained recruitment activity across tech consultancies, fintech start-ups, and product engineering.`;
  } else if (isSupport) {
    mustHave = `Ticketing software queues, operating systems parameters, local user profile updates, SLA timings obedience, and active customer feedback processing.`;
    goodToHave = `Scripting line commands, peripherals hardware diagnostics, local networks protocols, and automated deployments setups.`;
    certBoost = `Google IT Support professional certificate or CompTIA A+ hardware essentials.`;
    toolKnowledge = `Active Directory, ServiceNow ticket systems, Zendesk client platform, and Intune admin console.`;
    interviewTopics = `Handling unsatisfied clients gracefully, troubleshooting system start-ups errors, and checking printer network connectivity.`;
    projectTasks = `Launching an active directory user directory in test sandboxes and testing ticketing queues sequences.`;
    careerMoves = `Desktop Engineer associate, VIP Support Specialist, or IT Support Manager.`;
    marketSignal = `Stable pathways. Critical starting point for many systems engineering roles. Offers solid upward ladder mobility.`;
  } else {
    mustHave = `Enterprise system records, basic query structures, metric auditing checks, customer SLA guidelines compliance, and workspace documentation.`;
    goodToHave = `Power BI visual statistics, custom scripts loops, CRM parameters tuning, and business spreadsheet data formatting.`;
    certBoost = `ITIL 4 Foundation or Salesforce/SAP Associate alignments.`;
    toolKnowledge = `ServiceNow dashboard, Jira Service Desk, Salesforce, and Excel pivot sheets.`;
    interviewTopics = `Managing strict corporate workflows, checking license data errors, and logging technical logs efficiently for auditing.`;
    projectTasks = `Evaluating enterprise data sheets and preparing a clean workflow map with SLA checkpoints.`;
    careerMoves = `Business Analyst associate, ERP Consultant, or Operations Controller.`;
    marketSignal = `Moderate hiring frequency. Highly valued in service delivery companies, supply chain hubs, and consulting networks.`;
  }

  return { mustHave, goodToHave, certBoost, toolKnowledge, interviewTopics, projectTasks, careerMoves, marketSignal };
}

interface PDFContent {
  title: string;
  filename: string;
  suitableRoles: string[];
  techSkills: string[];
  technicalQA: { q: string; a: string }[];
  scenarioQA: { q: string; a: string }[];
  hrQA: { q: string; a: string }[];
}

const DOMAIN_PDF_DATA: Record<string, PDFContent> = {
  'IT Support & Service Desk': {
    title: 'IT Support & Service Desk - Professional Interview Prep Guide',
    filename: 'IT_Support_Service_Desk_Interview_Prep.pdf',
    suitableRoles: [
      'IT Support Analyst',
      'Desktop Support Engineer',
      'Service Desk Analyst',
      'Technical Support Specialist',
      'Application Support Analyst'
    ],
    techSkills: [
      'Windows 10/11 Hub Diagnostics',
      'Basic IP Configuration (DHCP/DNS)',
      'Active Directory Domain Management',
      'Outlook & Exchange Account Troubleshooting',
      'M365 Admin Portal Operations Services',
      'Jira / ServiceNow Ticketing Workflows and SLAs'
    ],
    technicalQA: [
      {
        q: 'How do you troubleshoot a user machine that cannot connect to the local network or internet?',
        a: 'First, check the physical layer (cabling, port lights). If wireless, verify the Wi-Fi credentials and adapter status. Use command-line tools like "ipconfig" to check if an IP address is assigned by DHCP. If it shows an APIPA address (169.254.x.x), DHCP is failing. Run "ipconfig /release" and "/renew", check DNS connectivity via "nslookup" or "ping 8.8.8.8" to isolate DNS vs network routing issues, and resolve accordingly.'
      },
      {
        q: 'What is Outlook Exchange cached mode, and when would you disable or rebuild its local assets?',
        a: 'Cached Exchange Mode saves a local copy of the mailbox in an offline data file (.ost) for faster performance. If a user complains of synchronizing issues, missing emails, or massive mailbox delays, we can close Outlook, locate the .ost file in the local AppData folder, delete or rename it, and reopen Outlook to re-download the mailbox cache fresh from the Exchange server.'
      },
      {
        q: 'What is the function of Active Directory (AD), and how do you unlock a user lock state?',
        a: 'Active Directory is a directory service developed by Microsoft for Windows domain networks. It handles identity validation, access permissions, and machine policy configuration. To unlock a user lock state, log into Active Directory Users and Computers (ADUC) or the cloud equivalent, search for the user profile, open properties, navigate to the Account tab, select the check box "Unlock account", and click Apply.'
      }
    ],
    scenarioQA: [
      {
        q: 'A high-level executive calls saying their laptop crashed during a critical client pitch session. How do you respond and handle this ticket?',
        a: 'Acknowledge the high urgency immediately with calm empathy. Stop any low-priority current tasks. Offer an immediate workaround—such as setting up a spare high-grade hot-swap laptop or logging them into an backup conference line. Focus on resolving the immediate client presentation block first, and then run diagnostics on the crashed laptop once the client pitch concludes safely.'
      },
      {
        q: 'How do you handle a scenario where multiple users report that a shared office printer is not printing?',
        a: 'This indicates a shared device or network routing network issue. First, check if the network printer itself is powered on and connected. Check the local print server to see if the print spooler service is hung; restart the printer spooler. If the issue persists, ping the printer IP address to verify connectivity, and inspect if any DHCP ip lease conflicts have knocked the IP offline.'
      }
    ],
    hrQA: [
      {
        q: 'How do you handle a tech-challenged end user who gets frustrated or hostile during a remote support ticket?',
        a: 'Maintain absolute patience and a helpful tone. Avoid using technical acronyms or jargon. Actively listen to their immediate frustration, assure them that we will resolve this issue together, and guide them step-by-step. Break actions down into simple movements (e.g., "Click the blue button at the bottom left") so they feel supported.'
      }
    ]
  },
  'Networking': {
    title: 'Network Administration & Engineering - Professional Interview Prep Guide',
    filename: 'Networking_Interview_Prep.pdf',
    suitableRoles: [
      'Network Support Engineer',
      'NOC Analyst',
      'Network Administrator',
      'Network Engineer'
    ],
    techSkills: [
      'OSI Model Core & 3-Way TCP Handshake Protocols',
      'Subnetting, IPv4 & IPv6 Address Management',
      'VLAN Routing & WAN/LAN Switching Loops (STP)',
      'Dynamic Routing Protocols (OSPF, BGP)',
      'Firewall Rule Management and Port Diagnostics'
    ],
    technicalQA: [
      {
        q: 'Describe the differences between TCP and UDP, and provide standard usage cases for each.',
        a: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, orders packets sequentially, and manages error-checking/retransmissions. It is used for web traffic (HTTP/S), email, and secure operations where data integrity is critical. UDP (User Datagram Protocol) is connectionless, lightweight, has low overhead, and sends data without acknowledgment. It is used for real-time video streaming, gaming, and DNS where speed is preferred over complete delivery verification.'
      },
      {
        q: 'How does Spanning Tree Protocol (STP) prevent layer-2 routing loops in switch interfaces?',
        a: 'In networks with redundant switch paths, broadcast traffic can loop forever, causing network crashes. STP resolves this by automatically mapping the switch mesh, selecting a root bridge, and placing redundant links in a "blocking" mode. If active links fail, STP quickly unblocks the alternative links to maintain routing paths automatically.'
      },
      {
        q: 'Explain the difference between asymmetric routing and a symmetric network loop.',
        a: 'Asymmetric routing occurs when packets leave a source via one path but return via a different route. While this is valid, stateful firewalls can drop returning packets thinking they are unsanctioned. A symmetric routing loop occurs when routers repeatedly bounce packets back and forth between each other, exhausting TTL values and crashing the line.'
      }
    ],
    scenarioQA: [
      {
        q: 'The NOC monitoring system raises a major alarm: a switch stack in the main facility has gone offline. What is your diagnostic sequence?',
        a: 'Verify if the link is entirely dead by trying to ping and SSH into the management layer of the switch. Check if nearby switches are reporting port downs to isolate power versus network line failure. Coordinate with on-site staff to run a physical reboot and inspect LED status, and look up recent change-management tickets to see if a firmware patch or config commit caused the issue.'
      }
    ],
    hrQA: [
      {
        q: 'How do you communicate complex network topology upgrades to non-technical stakeholders?',
        a: 'Translate speeds and subnet technicalities into daily visual metaphors. Explain "bandwidth" as highway lanes and "routers" as traffic coordinators. Focus on business value outcomes, such as how the upgrade prevents network slowdowns during peak hours and maintains secure customer file directories.'
      }
    ]
  },
  'Cloud Computing': {
    title: 'Cloud Computing & Operations - Professional Interview Prep Guide',
    filename: 'Cloud_Computing_Interview_Prep.pdf',
    suitableRoles: [
      'Cloud Support Associate',
      'Azure Administrator',
      'AWS Cloud Practitioner',
      'Cloud Engineer',
      'Cloud Operations Analyst'
    ],
    techSkills: [
      'Public Cloud Architecture (AWS, GCP, Azure)',
      'IAM Role Management & Policies Mapping',
      'Load Balancer Adjustments & Auto-Scaling Rules',
      'Virtual Private Networks (VPCs) & Subnets Setting',
      'CDN Cash Distribution & Microservices Routing'
    ],
    technicalQA: [
      {
        q: 'What is a CDN (Content Delivery Network), and how does it optimize web application delivery?',
        a: 'A CDN is a distributed network of proxy servers and data centers. It caches static website media (such as images, JS modules, CSS files) closer to users geographic locations (at the edge). This minimizes network latency, improves site responsiveness, and offloads origin server processing workloads.'
      },
      {
        q: 'Explain the design purpose of AWS IAM Roles versus IAM Users.',
        a: 'IAM Users represent human identities with long-lived credentials (passwords, access keys). IAM Roles are designed to grant short-lived, temporary access permissions to trusted applications, workloads, or AWS services (like an EC2 instance accessing an S3 bucket) without storing or embedding hardcoded keys.'
      }
    ],
    scenarioQA: [
      {
        q: 'A cloud application server starts throwing "504 Gateway Timeout" errors under peak traffic. How do you diagnose and resolve this?',
        a: 'A 504 error indicates that the load balancer did not receive a timely response from backend EC2 nodes. I would immediately check CPU and memory utilization on backend targets. If they are pegged, I would scale up or trigger auto-scaling to launch additional nodes. I would also check backend application logs to verify database lock states or connection pool exhaustion.'
      }
    ],
    hrQA: [
      {
        q: 'A team member accidentally leaves a cloud account access key in a public GitHub code repository. What do you do?',
        a: 'Immediately delete or revoke that key in the cloud console to prevent further malicious API abuse. Audit cloud trail logs to see if any unauthorized instances, databases, or access roles were created using that compromised key. Rotate all other credentials, delete any rogue resources, and advise the developer to use environment variables and vaults going forward.'
      }
    ]
  },
  'Cybersecurity': {
    title: 'Cybersecurity Operations & Compliance - Professional Interview Prep Guide',
    filename: 'Cybersecurity_Interview_Prep.pdf',
    suitableRoles: [
      'SOC Analyst',
      'Cybersecurity Analyst',
      'GRC Analyst',
      'IAM Analyst',
      'Security Operations Analyst'
    ],
    techSkills: [
      'SIEM Dashboard Log Inspections (Splunk, Elastic)',
      'Threat Vectors & Ransomware Isolation Tactics',
      'Vulnerability Management & Pen-Testing Checks',
      'Symmetric vs. Asymmetric Cryptography Systems',
      'CIS Security Frameworks and SOC-2 Compliances'
    ],
    technicalQA: [
      {
        q: 'What is the difference between asymmetric and symmetric encryption schemes?',
        a: 'Symmetric encryption uses a single shared secret key for both encryption and decryption (e.g., AES). It is fast and suitable for bulk data storage. Asymmetric encryption uses a mathematically linked public-private key pair (e.g., RSA). The public key encrypts data, while the private key performs decryption. It is used for secure key exchanges and digital signatures.'
      },
      {
        q: 'What is the function of a SIEM system, and how do you parse abnormal logs?',
        a: 'A SIEM (Security Information and Event Management) system correlates security logs across firewalls, servers, routers, and endpoints in real-time. To parse abnormal logs, you check for indicators of compromise (IoCs), such as strange logins at invalid hours, unusual outbound traffic to foreign IPs, or repeatedly failed authentication trials followed by massive data queries.'
      }
    ],
    scenarioQA: [
      {
        q: 'An active ransomware infection is detected on a local desktop in the enterprise subnet. What is your immediate incident response sequence?',
        a: 'Isolate the station from the network immediately by pulling the ethernet cable or disconnecting from Wi-Fi to stop the malware from spreading horizontally. Disable any active cloud synchronization clients to prevent cloud files from getting encrypted. Notify the Security lead and preserve logs for forensic audit, then reset user AD credentials.'
      }
    ],
    hrQA: [
      {
        q: 'How do you handle employees who repeatedly bypass security rules (like sharing passwords or plugging in personal USB sticks)?',
        a: 'Address the issue with clear, polite, but firm communication. Explain the systemic risk they pose to the business (such as data breaches or audit failures). Offer a secure alternative, and if they persist, escalate to management to implement group policy blocks (e.g., locking USB drives through Active Directory).'
      }
    ]
  },
  'Data & Analytics': {
    title: 'Data & Business Analytics - Professional Interview Prep Guide',
    filename: 'Data_Analytics_Interview_Prep.pdf',
    suitableRoles: [
      'Data Analyst',
      'SQL Analyst',
      'Power BI Developer',
      'BI Analyst',
      'Reporting Analyst'
    ],
    techSkills: [
      'Relational Database Structuring & SQL Queries',
      'Data Cleansing, Deduplication & Transform (ETL)',
      'Data Visualization Dashboards (Power BI, Tableau)',
      'Python Data Analytics Libraries (Pandas, Numpy)',
      'Handling Missing/Null Values & Statistical Trends'
    ],
    technicalQA: [
      {
        q: 'Explain the difference between standard JOIN types and standard UNIONs in SQL.',
        a: 'A JOIN combines columns from two or more tables based on a related key (e.g., ID), aligning columns horizontally. An UNION combines the output rows of two separate SELECT queries with identical column schemas, stacking them vertically.'
      },
      {
        q: 'How do you handle empty, null, or corrupt records in a fresh master dataset?',
        a: 'I analyze the volume of missing elements first. If they represent a small percentage, I can drop null records or impute them using statistical averages (such as mean, median, or logical defaults). If they are excessive, I verify if there is an ETL tool sync failure, request a fresh harvest, and document the choices in data registers.'
      }
    ],
    scenarioQA: [
      {
        q: 'The business director requests a dashboard report on sales metrics, but the raw financial databases use different formats (CRM vs. Accounting ERP). How do you approach this?',
        a: 'I would build a simple ETL (Extract, Transform, Load) query sequence. Retrieve data from CRM and ERP, establish standard key mappings (e.g., unique order references), transform both formats (cleansing date systems, uniforming currencies), and output a single merged view into Power BI or Tableau.'
      }
    ],
    hrQA: [
      {
        q: 'How do you present data-driven results to business executives who might disagree with the trends?',
        a: 'Keep presentations focused on clear, objective metrics. Walk them through the data validation process to build credibility for the numbers. Frame findings around business impact, such as using the data to suggest concrete actions that can reverse negative trends.'
      }
    ]
  },
  'Software Development': {
    title: 'Software Development & Frontend/Backend - Professional Interview Prep Guide',
    filename: 'Software_Development_Interview_Prep.pdf',
    suitableRoles: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'QA Tester',
      'Software Support Engineer'
    ],
    techSkills: [
      'Modern JavaScript/TypeScript Frameworks',
      'React Virtual DOM & State Re-rendering optimization',
      'Secure API Integrations & CORS handling',
      'SQL / NoSQL Database Management and Queries',
      'Git Version Control & CI-CD Pipelines'
    ],
    technicalQA: [
      {
        q: 'Explain React Virtual DOM diffing and how it helps rendering speeds.',
        a: 'React compiles a virtual shadow of the browser DOM. When component state changes, it creates a new Virtual DOM tree and diffs it with the old one to find the minimum required changes, update only those specific browser nodes, and avoid costly full-page repaints.'
      },
      {
        q: 'Explain CORS (Cross-Origin Resource Sharing) and how to resolve a CORS issue.',
        a: 'CORS is a browser security mechanism that restricts resources from being loaded from alternate domains. To resolve a CORS issue, configure correct Access-Control-Allow-Origin headers on the HTTP backend to authorize client domain calls safely.'
      }
    ],
    scenarioQA: [
      {
        q: 'An endpoint API starts responding with random 401 Unauthorized errors to authenticated mobile app clients. What is your troubleshooting routine?',
        a: 'Verify if the JWT authorization tokens have expired or are formatted wrong in client headers. Check backend key expiration limits and token verification algorithms. Look inside api logs to see if tokens are failing verification because of server clock skew or database cache lookup timeouts.'
      }
    ],
    hrQA: [
      {
        q: 'How do you handle disagreements about code reviews or architecture patterns with another engineer?',
        a: 'Keep discussions focused on objective arguments such as performance, readability, scalability, or testing standards. Avoid taking criticism personally. Build simple prototype sandboxes or benchmarks to compare approaches, and refer to standardized code Style Guides for structural consensus.'
      }
    ]
  },
  'DevOps': {
    title: 'DevOps & Site Reliability - Professional Interview Prep Guide',
    filename: 'DevOps_Site_Reliability_Interview_Prep.pdf',
    suitableRoles: [
      'DevOps Engineer',
      'Release Engineer',
      'Site Reliability Engineer',
      'Build Deployment Engineer'
    ],
    techSkills: [
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Containerization & Orchestrations (Docker, Kubernetes)',
      'CI/CD Pipeline Builders (GitHub Actions, Jenkins)',
      'Prometheus / Grafana Resource Monitoring',
      'Zero-Downtime Rolling & Blue-Green Deployments'
    ],
    technicalQA: [
      {
        q: 'What is Infrastructure as Code (IaC), and what advantages does it offer?',
        a: 'IaC allows provisioning cloud servers and networking using configuration files (like Terraform). This ensures that environment configurations are version-controlled, reproducible, and automated, preventing human errors and configuration drift across dev and prod systems.'
      },
      {
        q: 'Explain the difference between a rolling deployment and a blue-green deployment.',
        a: 'Rolling deployment updates container clusters incrementally so some run old code and others run new code until the update completes. Blue-green deployment boots a complete secondary environment (Green) running the new version, conducts health checks on it, and flips load balancer traffic from the live environment (Blue) to Green instantly.'
      }
    ],
    scenarioQA: [
      {
        q: 'A CI-CD deploy job suddenly fails on the container build step because of a docker layering error. What do you do?',
        a: 'Check build logs to identify the exact failing command in the Dockerfile. Verify if external package dependencies or library repositories are offline or updated. Clear build cache directories in Jenkins/GitHub Actions, and audit recent code commits to see if a dependencies lockfile changed.'
      }
    ],
    hrQA: [
      {
        q: 'What are your strategies for maintaining calm and focus during high-severity production outage calls?',
        a: 'I prioritize systematic diagnostics over panic. I establish clear communication lanes with stakeholders, divide my team to work on finding a temporary workaround first to stop the bleeding, and then investigate the root cause, keeping everyone updated with regular status intervals.'
      }
    ]
  },
  'IT Operations': {
    title: 'IT Operations & System Administration - Professional Interview Prep Guide',
    filename: 'IT_Operations_Interview_Prep.pdf',
    suitableRoles: [
      'System Administrator',
      'Cloud Systems Operator'
    ],
    techSkills: [
      'Linux/Windows Operating Systems diagnostics',
      'Group Policy Objects (GPOs) & Active Directory',
      'RAID Volume Recovery & Hot-Swap storage setups',
      'Disaster Recovery Backups & Warm Restore Sites',
      'Bash/PowerShell Command Automation Shell Scripts'
    ],
    technicalQA: [
      {
        q: 'Explain how you can hot-swap a damaged hard disk in a production server RAID 5 volume without taking it offline.',
        a: 'In a RAID 5 array, data is striped with parity, allowing the server to operate with a single failed disk. First, identify the exact failed drive using physical LED indicators or server management consoles. Carefully unlock and slide the hot-swap tray out, insert a new drive of equal or greater capacity, lock it back in, and verify through the RAID controller that the automatic parity volume rebuild has started.'
      },
      {
        q: 'What are Active Directory Group Policy Objects (GPOs), and how are they inherited?',
        a: 'GPOs are administrative configurations applied to Windows domain devices and users. They are inherited sequentially: Local Machine -> Site -> Domain -> Organizational Unit (LSDOU). The settings applied closest to the object (the lowest sub-OU) override higher parents.'
      }
    ],
    scenarioQA: [
      {
        q: 'A cron backup script has repeatedly failed to upload database archives to offsite storage. How do you troubleshoot?',
        a: 'I would run the script manually, capture the output logs, and verify the exit code. Common culprits include: network firewalls blocking offsite vault ports, disk-full events in standard temporal directories, expired API credentials used in the shell script, or SSH key authorization errors.'
      }
    ],
    hrQA: [
      {
        q: 'How do you coordinate system maintenance downs with business managers who resist any kind of system downtime?',
        a: 'I schedule maintenance during official off-peak hours (like weekend nights) and explain the business risks of postponing it (system vulnerabilities, performance decay). I set up a warm backup environment to ensure quick rollback if updates fail, minimizing the impact of any downtime.'
      }
    ]
  },
  'Business & IT Process': {
    title: 'Business Processes & ERP Systems - Professional Interview Prep Guide',
    filename: 'Business_IT_Process_Interview_Prep.pdf',
    suitableRoles: [
      'Order Management Analyst',
      'Quote-to-Cash Analyst',
      'ERP Support Analyst',
      'CRM Support Analyst',
      'IT Business Analyst'
    ],
    techSkills: [
      'ERP Solutions Workflows (SAP, Oracle, NetSuite)',
      'Quote-to-Cash (Q2C) Pipeline Integrations',
      'CRM System Administration (Salesforce, MS Dynamics)',
      'Data audits, License Compliances & Invoice workflows',
      'UAT (User Acceptance Testing) coordination'
    ],
    technicalQA: [
      {
        q: 'Explain the Quote-to-Cash commercial workflow cycle.',
        a: 'It represents the entire commercial lifecycle: 1) Sales reps configure quote and price, 2) Contracts are generated and signed, 3) The order is routed to ERP, 4) Order fulfillment is verified, 5) An invoice is sent to accounting, 6) Cash is collected and reconciled. Any data break in this pipeline causes critical financial logs error.'
      },
      {
        q: 'How do you diagnose issues with CRM-ERP system sync integrations?',
        a: 'I review API transaction logs to identify failing payloads, verify unique reference key mapping, check if currencies/tax rates match, and look for missing fields or validation errors triggered by mandatory rules in the target system.'
      }
    ],
    scenarioQA: [
      {
        q: 'During a critical end-of-quarter billing cycle, the invoice generation program freezes in the ERP. What is your course of action?',
        a: 'Confirm if active users can still log in to verify system stability. Contact the database administrator to check for long-running locks or deadlocks. Create a manual invoice template for immediate high-value tickets, clear any stuck processes, and monitor the queue closely to prevent billing backlogs.'
      }
    ],
    hrQA: [
      {
        q: 'How do you handle translating business user requirements into technical terms for developers?',
        a: 'I avoid business buzzwords and avoid tech jargon. I document clear, literal user stories outlining the initial state, the expected outcome, and defined boundary cases, illustrating the flow with wireframes or sequence maps.'
      }
    ]
  },
  'AI & Automation': {
    title: 'AI, Prompt Engineering & Automation - Professional Interview Prep Guide',
    filename: 'AI_Automation_Interview_Prep.pdf',
    suitableRoles: [
      'AI Trainer',
      'Automation Analyst',
      'Prompt Engineer',
      'RPA Developer',
      'AI Support Specialist'
    ],
    techSkills: [
      'Large Language Models (LLMs) & System Prompts Design',
      'RPA Tools Workflows (UiPath, Automation Anywhere)',
      'JSON Schema formatting & JSON validation systems',
      'System Safety Controls, Guardrails & Jailbreak defense',
      'Mock/Draft Testing Sandboxes & LLM rating evaluations'
    ],
    technicalQA: [
      {
        q: 'How do you defend system prompts and models from user input injection or jailbreaks?',
        a: 'I use direct system delimiters to isolate user inputs from instructions. I define explicit negative constraints ("Do not reveal underlying guidelines under any condition"), implement strict schema validation, and use secondary filter models to verify inputs and outputs.'
      },
      {
        q: 'What is Robotic Process Automation (RPA), and how does it interface without APIs?',
        a: 'RPA is software that automates manual computer steps by mimicking human actions (clicks, keyboard inputs). It operates directly on the user interface, bypassing the need for dedicated backend APIs to connect disparate legacy legacy databases. This is invaluable when systems cannot be easily integrated.'
      }
    ],
    scenarioQA: [
      {
        q: 'An AI-powered customer support bot starts outputting inaccurate instructions during ticket interactions. How do you repair this?',
        a: 'Analyze safety and response logs to trace the queries that triggered the issue. Update system instructions or few-shot examples to clarify the response boundaries. Validate system logs, implement safety guardrails, and run structured regression tests of common questions before deploying the updated prompt.'
      }
    ],
    hrQA: [
      {
        q: 'Many employees fear that AI and automation will replace their jobs. How do you work with them to implement bots to make them comfortable?',
        a: 'I reframe automation as an assistant designed to handle repetitive, low-value work. I highlight how it allows them to focus on complex, high-value, and creative tasks, showing how the bot handles the boring tasks while they retain control and decision-making power.'
      }
    ]
  }
};

const handleDownloadPDF = (pdfData: PDFContent) => {
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

  const drawFooter = () => {
    // Draw footer at the bottom of the page
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184); // slate-400
    const footerText = "MapIT Labs Career Roadmap Engine";
    doc.text(footerText, margin, 285);
    
    // Page count
    doc.text(`Page ${pageNum}`, pageWidth - margin - 12, 285);
  };

  const drawPageHeader = () => {
    doc.setFillColor(15, 23, 42); // slate 900
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('IT CAREER ROADMAPS & STUDY DECKS', margin, 11);
    doc.setTextColor(56, 189, 248);
    doc.text(`Title: ${pdfData.title}`, margin, 17);
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.4);
    doc.line(margin, 22, pageWidth - margin, 22);
  };

  // COVER / TOP PAGE SECTION
  doc.setFillColor(15, 23, 42); // slate 900
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('IT CAREER TAXONOMY & INTERVIEW ARCHIVE', margin, 14);

  doc.setTextColor(56, 189, 248); // sky-400
  doc.setFontSize(10);
  doc.text('PROFESSIONAL EVALUATION SHEET & MOCK QUESTIONS PACK', margin, 21);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8.5);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Document Reference: ${pdfData.filename}`, margin, 28);
  doc.text(`Core Job Category: ${pdfData.title.split(' - ')[0]}`, margin, 34);

  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.8);
  doc.line(margin, 40, pageWidth - margin, 40);

  // Auto-wrapping text writer helper
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

  // Section 1: Suitable Roles
  addText('1. DESIGNATED SUITABLE ROLES FOR REFERENCE', 10, 'bold', [244, 63, 94], 2); // rose-500
  addText(`Review and preparation profiles for exactly which roles this document is suitable to refer for:`, 8.5, 'italic', [100, 116, 139], 1.5);
  addText(`Role Scope: ${pdfData.suitableRoles.join(', ')}`, 9, 'bold', [15, 23, 42], 4);

  // Section 2: Core Tech Competencies
  addText('2. COGNITIVE SKILLS & CORE COMPETENCY CHECKLIST', 10, 'bold', [244, 63, 94], 2);
  addText(`Ensure deep theoretical and functional understanding of these baseline fields:`, 8.5, 'normal', [71, 85, 105], 1.5);
  pdfData.techSkills.forEach((skill) => {
    addText(`[ ]  ${skill}`, 8.5, 'normal', [51, 65, 85], 1.2);
  });
  y += 3;

  // Section 3: Technical Q&A
  addText('3. DIRECT TECHNICAL QUESTIONS & VERIFIED ANSWERS', 10, 'bold', [244, 63, 94], 2);
  pdfData.technicalQA.forEach((qa, idx) => {
    addText(`Q${idx + 1}: ${qa.q}`, 9, 'bold', [15, 23, 42], 1.2);
    addText(`Answer: ${qa.a}`, 8.5, 'normal', [71, 85, 105], 3.5);
  });

  // Section 4: Scenario Q&A
  addText('4. WORKPLACE COMPLEX CASE SCENARIOS', 10, 'bold', [244, 63, 94], 2);
  pdfData.scenarioQA.forEach((qa, idx) => {
    addText(`Scenario Q${idx + 1}: ${qa.q}`, 9, 'bold', [15, 23, 42], 1.2);
    addText(`Solution Approach: ${qa.a}`, 8.5, 'normal', [71, 85, 105], 3.5);
  });

  // Section 5: Team Fit Q&A
  addText('5. COLLABORATION & INTEGRATION MINDSET', 10, 'bold', [244, 63, 94], 2);
  pdfData.hrQA.forEach((qa, idx) => {
    addText(`Culture Fit Q${idx + 1}: ${qa.q}`, 9, 'bold', [15, 23, 42], 1.2);
    addText(`Recommended Response: ${qa.a}`, 8.5, 'normal', [71, 85, 105], 3.5);
  });

  drawFooter();

  // Save the PDF
  doc.save(pdfData.filename);
};

export default function RoleDetailPanel({ 
  role, 
  onClose, 
  marketRegion,
  isBookmarked = false,
  onToggleBookmark,
  onNavigateToSection,
  disableScrollIntoView = false,
  isLight,
  onCompareRole
}: RoleDetailPanelProps) {
  const isLightMode = isLight !== undefined ? isLight : (typeof document !== 'undefined' && (document.body.classList.contains('light-theme') || document.querySelector('.light-theme') !== null));

  // Budget & commit time calculator variables
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [examBudget, setExamBudget] = useState<number>(300);

  const researched = getResearchedValues(role);

  // Automatically scroll to the profiling panel when it loads
  React.useEffect(() => {
    if (disableScrollIntoView) return;
    const el = document.getElementById(`role-detail-panel-${role.id}`);
    if (el) {
      const timer = setTimeout(() => {
        const offset = 100; // leave elegant margin above for headers
        const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [role.id, disableScrollIntoView]);

  // Group certifications by level for structured display
  const beginnerCerts = role.recommendedCertifications.filter(c => c.level === 'Beginner');
  const intermediateCerts = role.recommendedCertifications.filter(c => c.level === 'Intermediate');
  const advancedCerts = role.recommendedCertifications.filter(c => c.level === 'Advanced');

  // Interactive timeline estimation
  const totalSteps = role.upskillingPath.length;
  // Estimate total hours needed as constant baseline that factors role levels
  const baseHoursRequired = role.level === 'Entry-level' ? 120 : role.level === 'Mid-level' ? 240 : 400;
  // Estimate weeks
  const estimatedWeeks = Math.ceil(baseHoursRequired / weeklyHours);

  return (
    <div className="w-full bg-[#0a0f1d] border-2 border-[#ef4444] rounded-none shadow-[6px_6px_0px_0px_#ef4444] overflow-hidden relative fade-in career-role-detail-panel" id={`role-detail-panel-${role.id}`}>
      {/* Visual Header / Banner */}
      <div className="relative p-5 md:p-6 bg-[#000] border-b-2 border-[#121c38] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-xs">
            <span className="px-2 py-0.5 bg-white text-black border border-gray-300 uppercase font-bold text-[10px]">
              {role.domain}
            </span>
            <span className="px-2 py-0.5 bg-white text-black border border-gray-300 uppercase font-bold text-[10px]">
              {role.level}
            </span>
            {role.isCoding ? (
              <span className="px-2 py-0.5 bg-white text-black border border-gray-300 uppercase font-bold text-[10px]">
                Coding Required
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-white text-black border border-gray-300 uppercase font-bold text-[10px]">
                No Coding Required
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tight uppercase flex items-center gap-2">
            <Briefcase className="text-[#ef4444] w-7 h-7" />
            {isBookmarked && <CustomBookmarkIcon className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse shrink-0" />}
            {role.title}
          </h3>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-center justify-between md:justify-end">
          <div className="text-right font-mono">
            <span className="block text-[10px] text-gray-500 uppercase">Est. Salary Pool</span>
            <span className="text-lg text-[#10b981] font-bold">
              {marketRegion === 'global' ? role.globalSalary : role.indiaSalary} / yr
            </span>
          </div>
          
          {onToggleBookmark && (
            <button
              id="bookmark-role-button"
              onClick={onToggleBookmark}
              className={`p-2 border-2 transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 font-mono text-xs uppercase ${
                isBookmarked 
                  ? 'border-yellow-500 text-yellow-400 bg-yellow-950/20 hover:border-yellow-400' 
                  : 'border-[#121c38] text-gray-400 hover:text-white hover:border-yellow-500/50 bg-[#080e1a]'
              }`}
              title={isBookmarked ? 'Remove career path bookmark' : 'Bookmark this career path'}
            >
              <CustomBookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          )}

          <a
            href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role.title)}`}
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="p-2 border-2 border-emerald-500/30 text-emerald-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 transition-all bg-[#080e1a] rounded-none cursor-pointer flex items-center justify-center gap-1.5 font-mono text-xs uppercase"
            title={`Search ${role.title} Jobs on LinkedIn`}
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span>Jobs</span>
          </a>

          {onCompareRole && (
            <button
              onClick={() => onCompareRole(role.id)}
              className="p-2 border-2 border-[#121c38] text-purple-400 hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-all bg-[#080e1a] rounded-none cursor-pointer flex items-center justify-center gap-1.5 font-mono text-xs uppercase"
              title="Compare this role in the Comparison Matrix"
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Compare</span>
            </button>
          )}

          <button
            id="close-detail-panel"
            onClick={onClose}
            className="p-2 border-2 border-[#121c38] text-gray-400 hover:text-white hover:border-[#ef4444] transition-all bg-[#080e1a] rounded-none cursor-pointer"
            aria-label="Close detailed panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Panel Content - Organised and Classifed Job Profile Requirements */}
      <div className="p-4 md:p-6 space-y-4">
        
        {/* Short Executive Summary */}
        <div className="bg-[#05070c] p-4 border border-[#121c38]/80 font-mono text-xs text-gray-300">
          <span className="text-amber-500 uppercase font-bold block mb-1">������ BRIEF DEFINITION</span>
          <p>{role.roleAsk.explanation}</p>
          <p className="mt-2 text-cyan-400 text-[11px] italic">💡 Ideal Candidates: {role.roleAsk.suitableFor}</p>
        </div>

        {/* The Classified Job Profile Matrix Table */}
        <div className="overflow-hidden border-2 border-[#121c38] bg-[#03060c]">
          
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 bg-black/95 font-mono font-bold uppercase tracking-wider text-slate-400 text-xs border-b-2 border-[#121c38]">
            <div className="col-span-2 p-3 font-bold text-gray-500 uppercase">Category</div>
            <div className="col-span-5 p-3 border-l border-[#121c38] font-bold text-[#e11d48] uppercase">Researched Core Value</div>
            <div className="col-span-5 p-3 border-l border-[#121c38] font-bold text-[#10b981] uppercase">Interactive Breakdown</div>
          </div>

          {/* Matrix Body with Responsive grid */}
          <div className="divide-y divide-[#121c38]">

            {/* 1. MUST-HAVE */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-red-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Must-have
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#818cf8] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.mustHave}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase mb-2 font-bold tracking-wider">🛠️ Technical Prerequisites:</span>
                  <div className="space-y-2">
                    {role.mustHaves.tech.map((skill, idx) => {
                      const ytMatches = findTeachersForPrerequisite(skill);
                      return (
                        <div key={idx} className="bg-slate-900/60 p-2.5 border border-[#1e293b] hover:border-slate-700/80 rounded-xs transition flex flex-col gap-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <span 
                              onClick={() => onNavigateToSection?.('tools-skills', skill)}
                              className="text-slate-100 hover:text-emerald-400 font-mono text-xs font-semibold cursor-pointer active:scale-95 transition-all leading-snug"
                              title={`Click to explore ${skill} in Tools & Skills`}
                            >
                              {skill}
                            </span>
                          </div>
                          {ytMatches.length > 0 ? (
                            <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-950/60 pt-1.5 mt-0.5">
                              <span className="text-[9px] text-[#ef4444] font-mono uppercase font-bold flex items-center gap-0.5">
                                <Youtube className="w-3 h-3 shrink-0" /> YT Lessons:
                              </span>
                              {ytMatches.slice(0, 2).map((yt, yIdx) => {
                                const directSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(yt.name + ' ' + skill)}`;
                                return (
                                  <div key={yIdx} className="inline-flex items-center gap-0.5 bg-red-950/10 border border-red-900/30 rounded-xs">
                                    <button
                                      onClick={() => onNavigateToSection?.('youtubeTeachers', yt.subcategory)}
                                      className="text-[9px] px-1.5 py-0.5 text-red-400 hover:text-white transition flex items-center gap-1 cursor-pointer bg-transparent border-0"
                                      title={`Visualize ${yt.name} under "${yt.subcategory}" inside YouTube Directory`}
                                    >
                                      {yt.name}
                                    </button>
                                    <a
                                      href={directSearchUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="border-l border-red-900/30 px-1 py-0.5 hover:bg-red-900/30 text-red-500 hover:text-red-400 transition flex items-center justify-center cursor-pointer"
                                      title={`Directly search ${yt.name} YouTube lessons for "${skill}"`}
                                    >
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  </div>
                                );
                              })}
                              <button
                                onClick={() => onNavigateToSection?.('tools-skills', skill)}
                                className="text-[9px] text-cyan-400 hover:text-cyan-300 font-mono underline ml-auto flex items-center gap-0.5 pointer-events-auto"
                                title="Click to view tools & practice guides in Study Libraries"
                              >
                                Study Library
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-1 border-t border-slate-950/60 pt-1.5 mt-0.5">
                              <div className="flex items-center gap-1">
                                <span className="text-[9px] text-red-500 font-mono uppercase font-black">🔴 YT GAP</span>
                                <span className="text-[9px] text-gray-500 font-mono font-light">No matching video series</span>
                              </div>
                              <button
                                onClick={() => onNavigateToSection?.('tools-skills', skill)}
                                className="text-[9px] text-cyan-400 hover:text-cyan-300 font-mono underline flex items-center gap-0.5"
                                title="Explore practice guides in Study Libraries"
                              >
                                Study Library
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-900">
                  <span className="block text-[10px] text-gray-400 uppercase mb-1.5 font-bold tracking-wider">💬 Process & Communication:</span>
                  <ul className="space-y-1">
                    {role.mustHaves.process.map((p, idx) => (
                      <li key={idx} className="text-[11px] text-gray-300 font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#ef4444] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. GOOD-TO-HAVE */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-amber-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Good-to-have
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#fbbf24] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.goodToHave}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div>
                  <span className="block text-[10px] text-[#22d3ee] uppercase mb-1.5 font-bold tracking-wider">🌟 Advantage Skills (Cherries):</span>
                  <ul className="space-y-1">
                    {role.cherries.map((cherry, idx) => (
                      <li key={idx} className="text-[11px] text-white bg-cyan-950/20 border border-cyan-900/60 p-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{cherry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-900">
                  <span className="block text-[10px] text-gray-400 uppercase mb-1.5 font-bold tracking-wider">📄 ATS Keywords Checklist:</span>
                  <div className="flex flex-wrap gap-1">
                    {role.resumeKeywords.map((kw, idx) => (
                      <span key={idx} className={`py-0.5 px-1.5 border text-[10px] flex items-center gap-1 ${
                        kw.priority === 'High' 
                          ? 'border-red-900 bg-red-950/20 text-red-300' 
                          : kw.priority === 'Medium' 
                            ? 'border-amber-900 bg-amber-950/25 text-amber-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}>
                        <strong className="text-white text-[8px] uppercase font-bold">[{kw.priority}]</strong>
                        <span>{kw.keyword}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. CERTIFICATION BOOST */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-emerald-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Certification boost
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#34d399] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.certBoost}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <span className="block text-[10px] text-emerald-400 uppercase font-bold tracking-wider mb-2">🎖️ Leveled Preparation Pathway:</span>
                <div className="flex flex-col gap-3">
                  {/* Beginner */}
                  <div className="border border-[#121c38] bg-[#05070c] p-2">
                    <span className="font-bold text-slate-300 text-[10px] border-b border-slate-800 pb-1 mb-2 block uppercase text-center">🪶 Level 1: Beginner</span>
                    {beginnerCerts.length === 0 ? (
                      <p className="text-[10px] text-gray-500 italic text-center py-1">Continuous progression</p>
                    ) : (
                      <div className="space-y-1">
                        {beginnerCerts.map((cert, i) => (
                          <div key={i} className="p-1 border border-slate-700 bg-slate-900/30 text-[10px]">
                            <div className="flex justify-between items-start gap-1 font-bold text-white leading-tight">
                              <span 
                                onClick={() => onNavigateToSection?.('certs', cert.name)}
                                className="cursor-pointer hover:text-cyan-400 hover:underline transition-all"
                                title={`Click to explore ${cert.name} in Certifications`}
                              >
                                {cert.name}
                              </span>
                              <span className="text-[8px] px-1 bg-red-950 text-red-500 shrink-0">{cert.status}</span>
                            </div>
                            <div className="text-[9px] text-gray-400 mt-1">Fee: {cert.costEstimate}</div>
                            <div className="flex gap-2 mt-1 border-t border-slate-800/80 pt-1 text-[8px]">
                              <a href={getDirectCertUrl(cert.name, cert.resourceUrl)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Official ↗</a>
                              <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cert.name + ' free course')}`} target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">YouTube 🎥</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Intermediate */}
                  <div className="border border-[#121c38] bg-[#05070c] p-2">
                    <span className="font-bold text-emerald-400 text-[10px] border-b border-emerald-950 pb-1 mb-2 block uppercase text-center">🛡️ Level 2: Intermediate</span>
                    {intermediateCerts.length === 0 ? (
                      <p className="text-[10px] text-gray-500 italic text-center py-1">Ongoing transition</p>
                    ) : (
                      <div className="space-y-1">
                        {intermediateCerts.map((cert, i) => (
                          <div key={i} className="p-1 border border-slate-700 bg-slate-900/30 text-[10px]">
                            <div className="flex justify-between items-start gap-1 font-bold text-white leading-tight">
                              <span 
                                onClick={() => onNavigateToSection?.('certs', cert.name)}
                                className="cursor-pointer hover:text-cyan-400 hover:underline transition-all"
                                title={`Click to explore ${cert.name} in Certifications`}
                              >
                                {cert.name}
                              </span>
                              <span className="text-[8px] px-1 bg-amber-955 text-amber-500 shrink-0">{cert.status}</span>
                            </div>
                            <div className="text-[9px] text-gray-400 mt-1">Fee: {cert.costEstimate}</div>
                            <div className="flex gap-2 mt-1 border-t border-slate-800/80 pt-1 text-[8px]">
                              <a href={getDirectCertUrl(cert.name, cert.resourceUrl)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Official ↗</a>
                              <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cert.name)}`} target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">YouTube 🎥</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Advanced */}
                  <div className="border border-[#121c38] bg-[#05070c] p-2">
                    <span className="font-bold text-pink-400 text-[10px] border-b border-pink-950 pb-1 mb-2 block uppercase text-center">👑 Level 3: Advanced</span>
                    {advancedCerts.length === 0 ? (
                      <p className="text-[10px] text-gray-500 italic text-center py-1">Continuous development</p>
                    ) : (
                      <div className="space-y-1">
                        {advancedCerts.map((cert, i) => (
                          <div key={i} className="p-1 border border-pink-900/40 bg-pink-950/10 text-[10px]">
                            <div className="flex justify-between items-start gap-1 font-bold text-white leading-tight">
                              <span 
                                onClick={() => onNavigateToSection?.('certs', cert.name)}
                                className="cursor-pointer hover:text-cyan-400 hover:underline transition-all"
                                title={`Click to explore ${cert.name} in Certifications`}
                              >
                                {cert.name}
                              </span>
                              <span className="text-[8px] px-1 bg-pink-955 text-pink-500 shrink-0">{cert.status}</span>
                            </div>
                            <div className="text-[9px] text-gray-400 mt-1">Fee: {cert.costEstimate}</div>
                            <div className="flex gap-2 mt-1 border-t border-slate-800/80 pt-1 text-[8px]">
                              <a href={getDirectCertUrl(cert.name, cert.resourceUrl)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Official ↗</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. TOOL KNOWLEDGE */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-cyan-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Tool knowledge
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#22d3ee] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.toolKnowledge}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase mb-1.5 font-bold tracking-wider">🔧 Tools learned/used in this Role:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.toolsToLearn.map((tool, idx) => {
                      const toolMatchedTeachers = findTeachersForPrerequisite(tool);
                      const bestTeacher = toolMatchedTeachers.length > 0 ? toolMatchedTeachers[0] : null;
                      const youtubeSearchUrl = bestTeacher 
                        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(bestTeacher.name + ' ' + tool)}`
                        : `https://www.youtube.com/results?search_query=${encodeURIComponent(tool + ' tutorial')}`;
                      
                      return (
                        <div 
                          key={idx} 
                          className="inline-flex items-center bg-black border border-[#1e2e54] hover:border-cyan-500/50 transition-all rounded-xs text-[10px]"
                        >
                          <span 
                            onClick={() => onNavigateToSection?.('tools-skills', tool)}
                            className="text-[#22d3ee] hover:text-cyan-300 font-bold px-2 py-0.5 cursor-pointer active:scale-95 transition-all select-none"
                            title={`Click to explore ${tool} in Tools & Skills`}
                          >
                            🔧 {tool}
                          </span>
                          <a
                            href={youtubeSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-l border-[#1e2e54] px-1.5 py-0.5 hover:bg-red-950/25 text-gray-400 hover:text-red-500 transition-all flex items-center justify-center cursor-pointer"
                            title={bestTeacher ? `Search ${bestTeacher.name} YouTube lessons for "${tool}"` : `Search YouTube lessons for "${tool}"`}
                          >
                            <Youtube className="w-3 h-3 text-red-500 shrink-0" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="p-2 bg-slate-900/40 border border-[#1e2e54]/80 text-[10px] leading-relaxed">
                  <span className="font-bold text-amber-500 uppercase block mb-1">💼 enterprise systems checklist:</span>
                  <p className="text-gray-500 mb-2">
                    Does role toolset overlap with corporate ticketing or resource hubs:
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[9px]">
                    {['ServiceNow', 'Jira', 'Zendesk', 'Salesforce', 'SAP', 'Azure', 'M365 Admin'].map((coreTool) => {
                      const hasTool = role.toolsToLearn.some(tool => tool.toLowerCase().includes(coreTool.toLowerCase()));
                      return (
                        <div key={coreTool} className={`px-1 py-0.5 border text-center ${
                          hasTool 
                            ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300 font-bold' 
                            : 'border-slate-800 bg-slate-950 text-gray-500'
                        }`}>
                          {coreTool} {hasTool ? '✅' : '•'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. INTERVIEW TOPICS */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-purple-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Interview topics
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-2 justify-start">
                <div>
                  <span className="text-[9px] text-[#c084fc] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                  <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.interviewTopics}</p>
                </div>

                {/* ATTACHED CATEGORY PDF REFERENCE */}
                <div className="mt-3 pt-3 border-t border-[#121c38]/50 space-y-2">
                  <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider block select-none">📎 ATTACHED PDF REFERENCE (Category: {role.domain}):</span>
                  {(() => {
                    const matchingPdf = DOMAIN_PDF_DATA[role.domain];
                    if (matchingPdf) {
                      return (
                        <div className="bg-black/40 border border-[#1e2e54]/80 p-2 relative group hover:border-cyan-500/50 transition-all rounded-sm">
                          <div className="flex items-start gap-2">
                            <div className="bg-[#121c3a]/50 p-1.5 border border-cyan-800/30 text-cyan-400">
                              <Paperclip className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-gray-200 font-bold truncate">
                                {matchingPdf.filename}
                              </div>
                              <p className="text-[8px] text-gray-400 leading-normal mt-0.5 whitespace-pre-wrap">
                                <span className="text-purple-400 font-bold">Suitable for:</span> {matchingPdf.suitableRoles.join(', ')}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDownloadPDF(matchingPdf)}
                            className="mt-2 w-full flex items-center justify-center gap-1 bg-[#1e293b]/50 hover:bg-[#0f172a] text-[#38bdf8] text-[9px] font-bold py-1 px-1.5 border border-[#1e2e54]/60 hover:border-cyan-500/40 transition-all active:scale-[0.98] uppercase tracking-wider cursor-pointer"
                          >
                            <FileDown className="w-3 h-3 text-cyan-400" />
                            Download PDF Reference File
                          </button>
                        </div>
                      );
                    }
                    return <div className="text-[9px] text-gray-500 italic">No category PDF attached.</div>;
                  })()}

                  {/* Other standard job categories search */}
                  <div className="pt-1.5">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Access other Job Category resources:</span>
                    <div className="grid grid-cols-2 gap-1 max-h-[140px] overflow-y-auto pr-1">
                      {Object.keys(DOMAIN_PDF_DATA)
                        .filter(itemKey => itemKey !== role.domain)
                        .map((key, i) => {
                          const otherPdf = DOMAIN_PDF_DATA[key];
                          return (
                            <button
                              key={i}
                              onClick={() => handleDownloadPDF(otherPdf)}
                              className="text-left text-[8px] bg-[#0c101b]/50 hover:bg-[#11192d] p-1 border border-[#1e2e54]/30 hover:border-cyan-900/40 truncate text-gray-400 hover:text-cyan-300 transition-all cursor-pointer"
                              title={`Download ${otherPdf.title}`}
                            >
                              📁 {otherPdf.filename.replace('_Interview_Prep.pdf', '').replace(/_/g, ' ')}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div className="flex flex-col gap-3">
                  {/* Tech Questions */}
                  <div className="bg-black/40 p-2 border border-[#121c38]">
                    <span className="text-[9px] font-bold text-white uppercase block border-b border-[#121c38] pb-1 mb-1.5">💻 Tech Evaluation:</span>
                    <ul className="space-y-1 text-[10px] text-gray-300">
                      {role.interviewTopics.technical.map((q, i) => (
                        <li key={i} className="leading-tight pl-1.5 border-l border-red-500">"{q}"</li>
                      ))}
                    </ul>
                  </div>

                  {/* Scenario Questions */}
                  <div className="bg-black/40 p-2 border border-[#121c38]">
                    <span className="text-[9px] font-bold text-white uppercase block border-b border-[#121c38] pb-1 mb-1.5">⚙️ Scenario & SLA:</span>
                    <ul className="space-y-1 text-[10px] text-gray-300">
                      {role.interviewTopics.scenario.map((q, i) => (
                        <li key={i} className="leading-tight pl-1.5 border-l border-amber-500">"{q}"</li>
                      ))}
                    </ul>
                  </div>

                  {/* HR Questions */}
                  <div className="bg-black/40 p-2 border border-[#121c38]">
                    <span className="text-[9px] font-bold text-white uppercase block border-b border-[#121c38] pb-1 mb-1.5">🧩 HR & culture fit:</span>
                    <ul className="space-y-1 text-[10px] text-gray-300">
                      {role.interviewTopics.hr.map((q, i) => (
                        <li key={i} className="leading-tight pl-1.5 border-l border-emerald-500">"{q}"</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. PROJECT/PRACTICE TASKS */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-sky-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Project/practice tasks
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#38bdf8] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.projectTasks}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div className="flex flex-col gap-3">
                  
                  {/* Study Commitment Pacing Calculator */}
                  <div className="bg-black/60 p-2 border border-[#121c38]/80 space-y-2">
                    <span className="text-[9px] font-bold text-white block uppercase border-b border-[#121c38] pb-1">Commitment Calculator:</span>
                    <div>
                      <label className="text-[9px] text-gray-400 flex justify-between mb-0.5">
                        <span>Pace:</span>
                        <strong className="text-emerald-400">{weeklyHours}h / week</strong>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="40"
                        step="5"
                        value={weeklyHours}
                        onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800"
                      />
                    </div>
                    <div className="p-1 px-1.5 bg-slate-950 border border-[#121c38] text-[9px] space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration Needed:</span>
                        <span className="text-amber-400 font-bold">{estimatedWeeks} weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Suggested Phases:</span>
                        <span className="text-white font-bold">{totalSteps} milestones</span>
                      </div>
                    </div>
                  </div>

                  {/* Preparation Milestones */}
                  <div className="flex flex-col justify-center space-y-1 text-[10px]">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">🎓 Milestones Pathway:</span>
                    {role.upskillingPath.map((step, idx) => (
                      <div key={idx} className="flex gap-1.5 text-[9px]">
                        <div className="w-3.5 h-3.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center justify-center text-[7px] shrink-0 mt-0.5">{idx + 1}</div>
                        <p className="text-gray-300 leading-normal">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Sandbox info */}
                  <div className="p-1.5 bg-slate-950 border border-slate-900 text-[9px] leading-tight text-gray-400">
                    <span className="text-amber-500 font-bold uppercase block mb-0.5">🎮 hands-on setup:</span>
                    Deploy isolated hypervisor OS servers (VirtualBox), establish networks, use ServiceNow PDIs, or cloud freetiers.
                  </div>
                </div>
              </div>
            </div>

            {/* 7. CAREER MOVEMENT */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-[#ec4899] text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Career movement
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#f472b6] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.careerMoves}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase mb-1.5 font-bold tracking-wider">🚀 Experienced Promotion Tracks:</span>
                  <div className="flex flex-wrap gap-1">
                    {role.nextCareerMoves.map((mov, i) => (
                      <span key={i} className="bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40 px-2 py-0.5 text-[10px] font-bold">
                        🚀 {mov}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[9px] leading-relaxed mt-1">
                  <div className="p-1.5 border border-[#121c38] bg-black/40">
                    <strong className="text-slate-400 block mb-0.5 uppercase text-[8px]">💡 Historic Backstory:</strong>
                    <span className="text-gray-400 italic">"{role.historyFuture.history}"</span>
                  </div>
                  <div className="p-1.5 border border-[#121c38] bg-black/40">
                    <strong className="text-amber-400 block mb-0.5 uppercase text-[8px]">🔮 Future & AI Stability:</strong>
                    <span className="text-gray-300 italic">"{role.historyFuture.future}"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. MARKET SIGNAL */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="col-span-2 p-4 bg-black/30 font-mono font-bold text-pink-400 text-sm md:text-xs uppercase tracking-wider flex items-center md:items-start select-none">
                Market signal
              </div>
              <div className="col-span-5 p-4 bg-[#070b13]/20 border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 flex flex-col gap-1.5 justify-start">
                <span className="text-[9px] text-[#f472b6] font-bold uppercase tracking-wider block select-none">📋 Profile Core Specifics:</span>
                <p className="text-gray-100 leading-relaxed font-sans text-xs">{researched.marketSignal}</p>
              </div>
              <div className="col-span-5 p-4 bg-[#03060c] border-t md:border-t-0 md:border-l border-[#121c38] font-mono text-xs text-gray-300 space-y-3">
                <div className="flex flex-col gap-2 text-[10px]">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase block mb-0.5">Industry Demand Rank:</span>
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-tight">{role.marketDemandSignal.index}</span>
                  </div>
                  <div className="border-t border-[#121c38] pt-1">
                    <span className="text-[9px] text-gray-400 uppercase block mb-0.5">Hiring Frequency Stat:</span>
                    <p className="text-[10px] text-white font-semibold">"{role.marketDemandSignal.percentStat}"</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-slate-900">
                  <span className="block text-[10px] text-gray-400 uppercase mb-1 font-bold tracking-wider">🏢 Leading Active Employers Hiring:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {role.companiesHiring.map((cmp, i) => (
                      <span key={i} className="bg-slate-900 border border-slate-800 text-[#22d3ee] px-1.5 py-0.5 text-[9px]">
                        {cmp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 text-[9px] text-slate-500 italic leading-snug">
                  🌐 Country/National Impact: {role.nationalInfluence}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
