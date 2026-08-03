export interface CertLibraryItem {
  id: string;
  name: string;
  provider: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  costRange: string;
  priorityOrder: number; // 1 = High/Immediate, 2 = Medium/Next, 3 = Advanced/Specialist
  description: string;
  officialLink: string;
  freeYouTubeLink: string;
  linkedInLearningLink: string;
  edxLink: string;
  relatedRoles?: string[];
}

export interface SkillLibraryItem {
  name: string;
  category: 'Operating Systems' | 'Network & Infrastructure' | 'Cloud & Virtualization' | 'Support & Processes' | 'Programming & Data' | 'Security';
  description: string;
  bestFreeTutorial: string;
  associatedTools: string[];
}

export interface ToolLibraryItem {
  name: string;
  category: 'Enterprise Ticketing' | 'Active Directory & Identity' | 'Cloud Console & CLI' | 'Data & BI' | 'Containers & Automation' | 'Diagnostics';
  description: string;
  costModel: string;
  howToPractice: string;
  freeResourceLink: string;
}

export const CERTIFICATIONS_LIBRARY: CertLibraryItem[] = [
  {
    id: 'aws-certified-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    provider: 'Amazon Web Services (AWS)',
    difficulty: 'Beginner',
    costRange: '$75 USD exam fee (2026/2027 updated)',
    priorityOrder: 1,
    description: 'Validates foundational knowledge of artificial intelligence, machine learning, and generative AI concepts, use cases, and AWS services.',
    officialLink: 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=AWS+Certified+AI+Practitioner+Course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/aws-certified-ai-practitioner',
    edxLink: 'https://www.edx.org/school/aws',
    relatedRoles: ['AI Specialist', 'Cloud Analyst', 'Generative AI Practitioner']
  },
  {
    id: 'azure-ai-fundamentals',
    name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    provider: 'Microsoft',
    difficulty: 'Beginner',
    costRange: '$99 USD exam fee (2026/2027 updated)',
    priorityOrder: 1,
    description: 'Covers machine learning, computer vision, natural language processing, and conversational AI workloads on Microsoft Azure.',
    officialLink: 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=Microsoft+Azure+AI+Fundamentals+AI-900+Course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/azure-ai-fundamentals',
    edxLink: 'https://www.edx.org/school/microsoft',
    relatedRoles: ['Azure Specialist', 'AI Engineer', 'Technology Consultant']
  },
  {
    id: 'google-cloud-digital-leader',
    name: 'Google Cloud Digital Leader',
    provider: 'Google Cloud',
    difficulty: 'Beginner',
    costRange: '$99 USD exam fee (2026/2027 updated)',
    priorityOrder: 1,
    description: 'Demonstrates knowledge of Google Cloud services, cloud technology, security, and digital transformation strategy.',
    officialLink: 'https://cloud.google.com/learn/certification/cloud-digital-leader',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=Google+Cloud+Digital+Leader+Complete+Course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/google-cloud-digital-leader',
    edxLink: 'https://www.edx.org/school/google-cloud',
    relatedRoles: ['Digital Transformation Advisor', 'Cloud Analyst', 'Technical Business Developer']
  },
  {
    id: 'cisco-ccst-cybersecurity',
    name: 'Cisco Certified Support Technician (CCST) Cybersecurity',
    provider: 'Cisco',
    difficulty: 'Beginner',
    costRange: '$125 USD exam fee (2026/2027 updated)',
    priorityOrder: 1,
    description: 'Validates entry-level cybersecurity knowledge, endpoint security, incident handling, threat intelligence, and network vulnerability principles.',
    officialLink: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/ccst-cybersecurity.html',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=Cisco+CCST+Cybersecurity+Course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/cisco-ccst-cybersecurity',
    edxLink: 'https://www.edx.org/school/cisco',
    relatedRoles: ['Cybersecurity Support Analyst', 'SOC Level 1 Engineer', 'Help Desk Technician']
  },
  {
    id: 'green-software-practitioner',
    name: 'Green Software Practitioner',
    provider: 'Green Software Foundation (GSF) / Linux Foundation',
    difficulty: 'Beginner',
    costRange: 'Free learning modules / $150 exam fee',
    priorityOrder: 1,
    description: 'Learn the principles of sustainable software engineering, carbon efficiency, electricity carbon intensity, and hardware power profiling.',
    officialLink: 'https://learn.greensoftware.foundation/',
    freeYouTubeLink: 'https://www.youtube.com/@greensoftwarefoundation',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/sustainable-it',
    edxLink: 'https://www.edx.org/course/green-software-for-practitioners',
    relatedRoles: ['Green Computing Specialist', 'Carbon-Aware Software Engineer', 'Sustainable Systems Architect']
  },
  {
    id: 'google-it-support',
    name: 'Google IT Support Professional Certificate',
    provider: 'Coursera / Google',
    difficulty: 'Beginner',
    costRange: 'Free via financial aid / $39 per month subscription',
    priorityOrder: 1,
    description: 'Foundational 5-course program checking troubleshooting, customer service, OS basics, networks, and system administration.',
    officialLink: 'https://grow.google/certificates/it-support/',
    freeYouTubeLink: 'https://www.youtube.com/@freecodecamp',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/it-help-desk',
    edxLink: 'https://www.edx.org/course/introduction-to-it-support',
    relatedRoles: ['IT Support Analyst', 'Desktop Support Engineer', 'Technical Support Specialist']
  },
  {
    id: 'comptia-a',
    name: 'CompTIA A+',
    provider: 'CompTIA',
    difficulty: 'Beginner',
    costRange: '$246 per exam (requires two exams)',
    priorityOrder: 1,
    description: 'The industry standard for establishing a career in IT. Validates core technologies from security to cloud to IP routing.',
    officialLink: 'https://www.comptia.org/en-us/certifications/a/',
    freeYouTubeLink: 'https://www.youtube.com/@professormesser', // Professor Messer
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-comptia-a-plus-220-1101-and-220-1102-exams',
    edxLink: 'https://www.edx.org/learn/computer-hardware',
    relatedRoles: ['IT Support Analyst', 'Desktop Support Engineer', 'Technical Support Specialist']
  },
  {
    id: 'comptia-network',
    name: 'CompTIA Network+',
    provider: 'CompTIA',
    difficulty: 'Beginner',
    costRange: '$358',
    priorityOrder: 1,
    description: 'Validates technical skills needed to securely establish, maintain and troubleshoot the essential networks that businesses rely on.',
    officialLink: 'https://www.comptia.org/en-us/certifications/network/',
    freeYouTubeLink: 'https://www.youtube.com/@professormesser', // Professor Messer Network+
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-comptia-network-plus-n10-008-certification',
    edxLink: 'https://www.edx.org/learn/networking',
    relatedRoles: ['Network Support Engineer', 'NOC Analyst', 'Network Administrator']
  },
  {
    id: 'comptia-security',
    name: 'CompTIA Security+',
    provider: 'CompTIA',
    difficulty: 'Beginner',
    costRange: '$370',
    priorityOrder: 1,
    description: 'First security certification a candidate should earn. It establishes the core knowledge required of any cybersecurity role.',
    officialLink: 'https://www.comptia.org/en-us/certifications/security/',
    freeYouTubeLink: 'https://www.youtube.com/@professormesser', // Professor Messer Security+
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-comptia-security-plus-sy0-701-certification-exam',
    edxLink: 'https://www.edx.org/learn/cybersecurity',
    relatedRoles: ['Security Analyst (SOC)', 'Systems Administrator']
  },
  {
    id: 'itil-4',
    name: 'ITIL 4 Foundation',
    provider: 'PeopleCert / Axelos',
    difficulty: 'Beginner',
    costRange: '$380 - $490 (depending on region)',
    priorityOrder: 2,
    description: 'Teaches modern corporate service desk frameworks, incident response queues, SLA escalation rules, and change controls.',
    officialLink: 'https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework',
    freeYouTubeLink: 'https://www.youtube.com/@ValueInsights',
    linkedInLearningLink: 'https://www.linkedin.com/learning/itil-4-foundation-cert-prep-1-introduction-to-service-management-and-the-itil-4-framework',
    edxLink: 'https://www.edx.org/learn/itil',
    relatedRoles: ['IT Support Analyst', 'Desktop Support Engineer', 'ERP Support Specialist']
  },
  {
    id: 'ms-az900',
    name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
    provider: 'Microsoft',
    difficulty: 'Beginner',
    costRange: '$99 (often free via MS Virtual Training Days)',
    priorityOrder: 1,
    description: 'Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    freeYouTubeLink: 'https://www.youtube.com/@freecodecamp', // FreeCodeCamp Azure AZ-900
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-azure-fundamentals-az-900-cert-prep-1-cloud-concepts',
    edxLink: 'https://www.edx.org/learn/microsoft-azure/microsoft-microsoft-azure-fundamentals-az-900',
    relatedRoles: ['Cloud Support Associate', 'Systems Administrator']
  },
  {
    id: 'aws-ccp',
    name: 'AWS Certified Cloud Practitioner (CLF-C02)',
    provider: 'Amazon Web Services',
    difficulty: 'Beginner',
    costRange: '$100',
    priorityOrder: 1,
    description: 'Provides a detailed conceptual overview of AWS cloud services, IAM, security, storage, billing modules, and global networks.',
    officialLink: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    freeYouTubeLink: 'https://www.youtube.com/@freecodecamp', // AWS FreeCodeCamp
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-aws-certified-cloud-practitioner-clf-c01-exam',
    edxLink: 'https://www.edx.org/learn/aws/amazon-web-services-aws-cloud-practitioner-essentials',
    relatedRoles: ['Cloud Support Associate', 'DevOps Engineer']
  },
  {
    id: 'cisco-ccna',
    name: 'Cisco CCNA (200-301) Routing & Switching',
    provider: 'Cisco Systems',
    difficulty: 'Intermediate',
    costRange: '$300',
    priorityOrder: 2,
    description: 'The golden standard of networking. Confirms IP routing tables, subnetting, VLAN switches, and enterprise connection commands.',
    officialLink: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html',
    freeYouTubeLink: 'https://www.youtube.com/@JeremysITLab', // Jeremy IT Lab CCNA
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-cisco-ccna-200-301-certification-exam',
    edxLink: 'https://www.edx.org/learn/networking/cisco-computer-networking-basics',
    relatedRoles: ['Network Administrator', 'Network Support Engineer', 'NOC Analyst']
  },
  {
    id: 'google-cybersecurity',
    name: 'Google Cybersecurity Certificate',
    provider: 'Coursera / Google',
    difficulty: 'Beginner',
    costRange: 'Free via financial aid / $39 per month subscription',
    priorityOrder: 1,
    description: 'Hands-on training in SIEM, Python logs parsing, SQL safety syntax, Linux server logs, and security policy management structures.',
    officialLink: 'https://grow.google/certificates/cybersecurity/',
    freeYouTubeLink: 'https://www.youtube.com/@freecodecamp',
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/become-a-cybersecurity-analyst',
    edxLink: 'https://www.edx.org/learn/cybersecurity/university-of-washington-introduction-to-cybersecurity',
    relatedRoles: ['Security Analyst (SOC)']
  },
  {
    id: 'power-bi-analyst',
    name: 'Microsoft Power BI Data Analyst (PL-300)',
    provider: 'Microsoft',
    difficulty: 'Intermediate',
    costRange: '$165',
    priorityOrder: 2,
    description: 'Proves your capacity to connect data sources, perform transformations, write DAX, and construct responsive dashboards.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/',
    freeYouTubeLink: 'https://www.youtube.com/@LukeBarousse', // Luke Barousse Power BI
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-power-bi-data-analyst-pl-300-cert-prep-1-prepare-the-data',
    edxLink: 'https://www.edx.org/learn/business-intelligence/davidson-next-analyzing-and-visualizing-data-with-power-bi',
    relatedRoles: ['Data Analyst']
  },
  {
    id: 'salesforce-admin',
    name: 'Salesforce Certified Administrator',
    provider: 'Salesforce',
    difficulty: 'Beginner',
    costRange: '$200',
    priorityOrder: 2,
    description: 'Validates configuration, custom fields, page layouts, analytics dashboards, workflows and security criteria inside Salesforce CRM.',
    officialLink: 'https://trailhead.salesforce.com/en/credentials/administrator',
    freeYouTubeLink: 'https://www.youtube.com/@SalesforceDevs', // Salesforce Training
    linkedInLearningLink: 'https://www.linkedin.com/learning/salesforce-administrator-cert-prep-1-setup-and-security',
    edxLink: 'https://www.edx.org/learn/salesforce/salesforce-salesforce-fundamental-for-everyone',
    relatedRoles: ['ERP Support Specialist']
  }
].concat([
  {
    id: 'comptia-linux',
    name: 'CompTIA Linux+',
    provider: 'CompTIA',
    difficulty: 'Intermediate',
    costRange: '$358',
    priorityOrder: 2,
    description: 'Validates key server skills needed of early-career systems administrators supporting Linux server kernels and terminal utilities.',
    officialLink: 'https://www.comptia.org/en-us/certifications/linux/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=comptia+linux+plus+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=comptia+linux+',
    edxLink: 'https://www.edx.org/search?q=comptia+linux',
    relatedRoles: ['Cloud Support Associate', 'Systems Administrator']
  },
  {
    id: 'comptia-server',
    name: 'CompTIA Server+',
    provider: 'CompTIA',
    difficulty: 'Intermediate',
    costRange: '$358',
    priorityOrder: 2,
    description: 'Validates server architecture, storage, security, disaster recovery, and troubleshooting across server environments.',
    officialLink: 'https://www.comptia.org/en-us/certifications/server/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=comptia+server+plus+tutorial',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=comptia+server',
    edxLink: 'https://www.edx.org/search?q=comptia+server',
    relatedRoles: ['Desktop Support Engineer', 'Systems Administrator']
  },
  {
    id: 'comptia-cloud',
    name: 'CompTIA Cloud+',
    provider: 'CompTIA',
    difficulty: 'Intermediate',
    costRange: '$358',
    priorityOrder: 2,
    description: 'Focuses on Cloud infrastructure delivery, resource provisioning, security parameters, virtualization setups, and server migrations.',
    officialLink: 'https://www.comptia.org/en-us/certifications/cloud/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=comptia+cloud+plus+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=comptia+cloud',
    edxLink: 'https://www.edx.org/search?q=comptia+cloud',
    relatedRoles: ['Cloud Support Associate', 'Systems Administrator']
  },
  {
    id: 'comptia-data',
    name: 'CompTIA Data+',
    provider: 'CompTIA',
    difficulty: 'Intermediate',
    costRange: '$358',
    priorityOrder: 2,
    description: 'Covers core corporate data literacy, schema mapping, relational SQL queries, data manipulation, and visualization techniques.',
    officialLink: 'https://www.comptia.org/en-us/certifications/data/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=comptia+data+plus+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=comptia+data',
    edxLink: 'https://www.edx.org/search?q=comptia+data',
    relatedRoles: ['Data Analyst', 'BI Analyst']
  },
  {
    id: 'google-it-automation',
    name: 'Google IT Automation with Python Professional Certificate',
    provider: 'Coursera / Google',
    difficulty: 'Beginner',
    costRange: 'Free via financial aid / $39 per month subscription',
    priorityOrder: 1,
    description: 'Teaches python coding foundations, version controls (git/GitHub), system configuration scripts, and troubleshooting techniques.',
    officialLink: 'https://grow.google/certificates/it-automation/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=google+it+automation+with+python+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=google+python+automation',
    edxLink: 'https://www.edx.org/search?q=google+python+automation',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist', 'Systems Administrator']
  },
  {
    id: 'nielit-ccc',
    name: 'NIELIT Course on Computer Concepts (CCC)',
    provider: 'NIELIT India',
    difficulty: 'Beginner',
    costRange: '₹500 + taxes',
    priorityOrder: 1,
    description: 'India National computer literacy baseline validation covering hardware basics, office suites, web searches, and safety.',
    officialLink: 'https://student.nielit.gov.in/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=nielit+ccc+complete+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=computer+literacy',
    edxLink: 'https://www.edx.org/search?q=computer+literacy',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist']
  },
  {
    id: 'nielit-o-level',
    name: 'NIELIT O Level IT Course',
    provider: 'NIELIT India',
    difficulty: 'Intermediate',
    costRange: '₹4,500',
    priorityOrder: 2,
    description: 'National Level IT diploma course by MeitY validating web designs, Python scripting, and Internet of Things (IoT) hardware frameworks.',
    officialLink: 'https://onlineapply.nielit.in/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=nielit+o+level+lectures',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=nielit',
    edxLink: 'https://www.edx.org/search?q=nielit',
    relatedRoles: ['Technical Support Specialist', 'Systems Administrator']
  },
  {
    id: 'servicenow-csa',
    name: 'ServiceNow Certified System Administrator (CSA)',
    provider: 'ServiceNow',
    difficulty: 'Intermediate',
    costRange: '$300',
    priorityOrder: 2,
    description: 'Validates configuration, database schemes, custom rules, form fields, and incident ticket routing inside ServiceNow dashboards.',
    officialLink: 'https://nowlearning.servicenow.com/lxp',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=servicenow+csa+course+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/servicenow',
    edxLink: 'https://www.edx.org/search?q=servicenow',
    relatedRoles: ['IT Support Analyst', 'Systems Administrator']
  },
  {
    id: 'cobit-foundation',
    name: 'COBIT Foundation',
    provider: 'ISACA',
    difficulty: 'Intermediate',
    costRange: '$400',
    priorityOrder: 2,
    description: 'Focuses on enterprise IT governance, risk controls management, governance frameworks, and ITSM organizational structures.',
    officialLink: 'https://www.isaca.org/resources/cobit',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=cobit+foundation+tutorial',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=cobit',
    edxLink: 'https://www.edx.org/search?q=cobit',
    relatedRoles: ['Systems Administrator', 'Security Analyst (SOC)']
  },
  {
    id: 'iso-20000',
    name: 'ISO/IEC 20000 Foundation',
    provider: 'PeopleCert',
    difficulty: 'Intermediate',
    costRange: '$350',
    priorityOrder: 2,
    description: 'Validates knowledge of the international standard for IT Service Management (ITSMS) and audit procedures.',
    officialLink: 'https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ISO-20000-1',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=iso+20000+foundation+training+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=iso+20000',
    edxLink: 'https://www.edx.org/search?q=iso+20000',
    relatedRoles: ['IT Support Analyst', 'Systems Administrator']
  },
  {
    id: 'cisco-ccst',
    name: 'Cisco Certified Support Technician (CCST) Networking',
    provider: 'Cisco Systems',
    difficulty: 'Beginner',
    costRange: '$125',
    priorityOrder: 1,
    description: 'Entry networks certificate verifying fundamental IP routing formulas, network security parameters, and pings.',
    officialLink: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=cisco+ccst+networking+full+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=ccst+networking',
    edxLink: 'https://www.edx.org/search?q=cisco+networking',
    relatedRoles: ['Network Support Engineer', 'NOC Analyst']
  },
  {
    id: 'juniper-jncia',
    name: 'Juniper Networks Certified Associate (JNCIA-Junos)',
    provider: 'Juniper Networks',
    difficulty: 'Intermediate',
    costRange: '$200',
    priorityOrder: 2,
    description: 'Confirms network infrastructure knowledge, routing equations, and default configurations on Juniper Networks Junos OS.',
    officialLink: 'https://learningportal.juniper.net/juniper/user_activity_info.aspx?id=EDU-JUN-WBT-JOL-CERTIFICATION-PROGRAM-HOME',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=jncia+junos+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=jncia+junos',
    edxLink: 'https://www.edx.org/search?q=juniper+networks',
    relatedRoles: ['Network Administrator', 'NOC Analyst']
  },
  {
    id: 'fortinet-fca',
    name: 'Fortinet Certified Associate (FCA) Network Security',
    provider: 'Fortinet Training Institute',
    difficulty: 'Beginner',
    costRange: 'Free training / $150 exam',
    priorityOrder: 1,
    description: 'Validates skills to configure, monitor, and troubleshoot basic threat protection and firewall rules on FortiGate.',
    officialLink: 'https://training.fortinet.com/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=fortinet+fca+cybersecurity+training',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=fortinet',
    edxLink: 'https://www.edx.org/search?q=fortinet',
    relatedRoles: ['Security Analyst (SOC)', 'Network Support Engineer']
  },
  {
    id: 'ms-az104',
    name: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
    provider: 'Microsoft',
    difficulty: 'Intermediate',
    costRange: '$165',
    priorityOrder: 2,
    description: 'Validates cloud networks configurations, storage, identity access management, compute nodes, and monitoring controls.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=az+104+azure+administrator+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-azure-administrator-az-104-cert-prep-1-manage-azure-identities-and-governance',
    edxLink: 'https://www.edx.org/search?q=az-104',
    relatedRoles: ['Systems Administrator', 'Cloud Operations Analyst']
  },
  {
    id: 'ms-az204',
    name: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
    provider: 'Microsoft',
    difficulty: 'Intermediate',
    costRange: '$165',
    priorityOrder: 2,
    description: 'Proves skill in building serverless cloud programs, Docker apps, SDK connections, and secured caching on Azure.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=az+204+azure+developer+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-certified-azure-developer-associate-az-204-cert-prep-1-develop-azure-compute-solutions',
    edxLink: 'https://www.edx.org/search?q=az-204',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'ms-az305',
    name: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
    provider: 'Microsoft',
    difficulty: 'Advanced',
    costRange: '$165',
    priorityOrder: 3,
    description: 'Validates high-level Azure design architecture, SQL/NoSQL cloud setups, security zones, and multi-tier network topologies.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=az+305+azure+solutions+architect+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-certified-azure-solutions-architect-expert-az-305-cert-prep-1-design-identity-governance-and-monitoring-solutions',
    edxLink: 'https://www.edx.org/search?q=az-305',
    relatedRoles: ['Systems Administrator']
  },
  {
    id: 'ms-az500',
    name: 'Microsoft Certified: Azure Security Engineer Associate (AZ-500)',
    provider: 'Microsoft',
    difficulty: 'Intermediate',
    costRange: '$165',
    priorityOrder: 2,
    description: 'Confirms proficiency implementing advanced identity access controls, threat monitors, container security and firewalls.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=az+500+azure+security+engineer+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-azure-security-technologies-az-500-cert-prep-1-manage-identity-and-access-updated',
    edxLink: 'https://www.edx.org/search?q=az-500',
    relatedRoles: ['Security Analyst (SOC)', 'Systems Administrator']
  },
  {
    id: 'ms-ai900',
    name: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    provider: 'Microsoft',
    difficulty: 'Beginner',
    costRange: '$99',
    priorityOrder: 1,
    description: 'Introductory cloud AI certificate detailing cognitive web sensors, prompt queries, vector models, and ethical machine learning.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=ai+900+azure+ai+fundamentals+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-certified-azure-ai-fundamentals-ai-900-cert-prep-1-ai-workloads-and-guiding-principles',
    edxLink: 'https://www.edx.org/search?q=ai-900',
    relatedRoles: ['Data Analyst', 'Cloud Support Associate']
  },
  {
    id: 'openai-prompt-engineering',
    name: 'ChatGPT Prompt Engineering for Developers',
    provider: 'OpenAI / DeepLearning.AI',
    difficulty: 'Beginner',
    costRange: 'Free',
    priorityOrder: 1,
    description: 'The definitive hands-on guide to prompt engineering. Learn how to prompt LLMs, build custom chatbots, and use LLM APIs for translation, summarization, and parsing.',
    officialLink: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=chatgpt+prompt+engineering+for+developers+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/introducing-prompt-engineering-for-developers',
    edxLink: 'https://www.edx.org/search?q=prompt+engineering',
    relatedRoles: ['Data Analyst', 'Technical Support Specialist', 'AI Prompt Analyst']
  },
  {
    id: 'openai-sdk-foundations',
    name: 'OpenAI API & Generative AI SDK Foundations',
    provider: 'OpenAI Academy',
    difficulty: 'Intermediate',
    costRange: 'Free',
    priorityOrder: 1,
    description: 'Master OpenAI\'s official developer toolkit. Explores chat completions, structured JSON outputs, functional API calls, embeddings, vector search, and model fine-tuning.',
    officialLink: 'https://platform.openai.com/docs/guides/text-generation',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=openai+api+development+tutorial+for+beginners',
    linkedInLearningLink: 'https://www.linkedin.com/learning/building-apps-with-the-openai-api',
    edxLink: 'https://www.edx.org/search?q=openai',
    relatedRoles: ['Cloud Support Associate', 'Cloud Engineer', 'Generative AI Developer']
  },
  {
    id: 'anthropic-claude-academy',
    name: 'Anthropic Claude Prompt Engineering & SDKs',
    provider: 'Anthropic Academy',
    difficulty: 'Intermediate',
    costRange: 'Free',
    priorityOrder: 1,
    description: 'Learn Anthropic\'s exclusive prompt design principles for Claude. Master system prompt constraints, XML tags, long-context parsing, tool-use (function calling), and prefill templates.',
    officialLink: 'https://github.com/anthropics/anthropic-cookbook',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=anthropic+claude+prompt+engineering+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/prompt-engineering-with-claude',
    edxLink: 'https://www.edx.org/search?q=anthropic',
    relatedRoles: ['Generative AI Developer', 'AI Prompt Analyst']
  },
  {
    id: 'google-genai-pathway',
    name: 'Google Cloud GenAI Learning Path: GenAI Fundamentals',
    provider: 'Google Cloud Skills Boost',
    difficulty: 'Beginner',
    costRange: 'Free',
    priorityOrder: 1,
    description: 'Official micro-credential validating knowledge of Generative AI principles, LLM architecture, diffusion image generation, and Vertex AI model custom tuning.',
    officialLink: 'https://www.cloudskillsboost.google/paths/118',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=google+cloud+generative+ai+fundamentals+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/introduction-to-generative-ai-by-google-cloud',
    edxLink: 'https://www.edx.org/courses?q=google+cloud+genai',
    relatedRoles: ['Cloud Support Associate', 'Cloud Engineer', 'Generative AI Developer']
  },
  {
    id: 'deeplearning-generative-ai-llms',
    name: 'Generative AI with Large Language Models (LLMs)',
    provider: 'DeepLearning.AI / AWS / Coursera',
    difficulty: 'Intermediate',
    costRange: '$49/month Coursera',
    priorityOrder: 2,
    description: 'A deep-dive technical certification in training and evaluating LLMs. Includes self-attention transformer layers, parameter-efficient fine-tuning (LoRA, PEFT), and RLHF state tracking.',
    officialLink: 'https://www.coursera.org/learn/generative-ai-with-llms',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=generative+ai+with+large+language+models+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/programming-large-language-models-llms',
    edxLink: 'https://www.edx.org/search?q=large+language+models',
    relatedRoles: ['Cloud Engineer', 'Generative AI Developer']
  },
  {
    id: 'deeplearning-specialization',
    name: 'Advanced Deep Learning & Transformer Architectures',
    provider: 'DeepLearning.AI / Coursera',
    difficulty: 'Advanced',
    costRange: '$49/month',
    priorityOrder: 3,
    description: 'Expert-level machine learning program tracking neural-net math matrices, CNNs, multi-head self-attention mechanisms, and production-grade server clustering for transformer deployment.',
    officialLink: 'https://www.coursera.org/specializations/deep-learning',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=deep+learning+specialization+andrew+ng+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/applied-machine-learning-foundations',
    edxLink: 'https://www.edx.org/search?q=deep+learning',
    relatedRoles: ['AI Research Engineer', 'Machine Learning Engineer']
  },
  {
    id: 'ms-ai102',
    name: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    provider: 'Microsoft / OpenAI',
    difficulty: 'Advanced',
    costRange: '$165',
    priorityOrder: 2,
    description: 'Validates professional skills in building cognitive web APIs, search vector stores (RAG), conversational agents, and deploying custom models via Azure OpenAI Service.',
    officialLink: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer-associate/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=ai+102+azure+ai+engineer+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/microsoft-certified-azure-ai-engineer-associate-ai-102-cert-prep-1-plan-and-manage-an-azure-ai-service-solution',
    edxLink: 'https://www.edx.org/search?q=ai-102',
    relatedRoles: ['Generative AI Developer', 'Azure AI Solutions Architect']
  },
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect Associate (SAA-C03)',
    provider: 'Amazon Web Services',
    difficulty: 'Intermediate',
    costRange: '$150',
    priorityOrder: 2,
    description: 'Proves proficiency in designing robust, cost-optimized, and resilient systems architectures on cloud AWS networks.',
    officialLink: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=aws+solutions+architect+associate+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-aws-certified-solutions-architect-associate-saa-c03-exam',
    edxLink: 'https://www.edx.org/search?q=aws+solutions+architect',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'aws-dva',
    name: 'AWS Certified Developer Associate (DVA-C02)',
    provider: 'Amazon Web Services',
    difficulty: 'Intermediate',
    costRange: '$150',
    priorityOrder: 2,
    description: 'Validates ability to write, debug, and deploy secure modular web applications using AWS API, SDKs, and Lambdas.',
    officialLink: 'https://aws.amazon.com/certification/certified-developer-associate/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=aws+developer+associate+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-aws-certified-developer-associate-dva-c02-certification-exam',
    edxLink: 'https://www.edx.org/search?q=aws+developer',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'aws-dop',
    name: 'AWS Certified DevOps Engineer Professional (DOP-C02)',
    provider: 'Amazon Web Services',
    difficulty: 'Advanced',
    costRange: '$300',
    priorityOrder: 3,
    description: 'Elite cloud DevOps credential validating complex auto-scaling systems, zero downtime setups, and pipelines infrastructure.',
    officialLink: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=aws+devops+professional+course+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=aws+devops+professional',
    edxLink: 'https://www.edx.org/search?q=aws+devops',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'aws-scs',
    name: 'AWS Certified Security Specialty (SCS-C02)',
    provider: 'Amazon Web Services',
    difficulty: 'Advanced',
    costRange: '$300',
    priorityOrder: 3,
    description: 'Deep security specialization verifying complex IAM barriers, KMS token encryptions, systems compliance audits, and cloud threats safeguards.',
    officialLink: 'https://aws.amazon.com/certification/certified-security-specialty/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=aws+security+specialty+course+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=aws+security+specialty',
    edxLink: 'https://www.edx.org/search?q=aws+security',
    relatedRoles: ['Security Analyst (SOC)']
  },
  {
    id: 'gcp-ace',
    name: 'Google Cloud Certified Associate Cloud Engineer (ACE)',
    provider: 'Google Cloud',
    difficulty: 'Intermediate',
    costRange: '$125',
    priorityOrder: 2,
    description: 'Validates skills in launching VMs, configure secured access, logs monitoring, and managing database connections on GC.',
    officialLink: 'https://cloud.google.com/learn/certification/cloud-engineer',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=google+cloud+associate+cloud+engineer+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=google+associate+cloud+engineer',
    edxLink: 'https://www.edx.org/search?q=gcp',
    relatedRoles: ['Cloud Support Associate', 'Systems Administrator']
  },
  {
    id: 'gcp-pca',
    name: 'Google Cloud Certified Professional Cloud Architect (PCA)',
    provider: 'Google Cloud',
    difficulty: 'Advanced',
    costRange: '$200',
    priorityOrder: 3,
    description: 'Elite architecture qualification verifying multi-tenant designs, Spanner limits, global networks safety, and microservices on GCP.',
    officialLink: 'https://cloud.google.com/learn/certification/cloud-architect',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=gcp+professional+cloud+architect+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=gcp+professional+cloud+architect',
    edxLink: 'https://www.edx.org/search?q=gcp+architect',
    relatedRoles: ['Systems Administrator']
  },
  {
    id: 'google-data-analytics',
    name: 'Google Data Analytics Professional Certificate',
    provider: 'Coursera / Google',
    difficulty: 'Beginner',
    costRange: 'Free via financial aid / $39 per month subscription',
    priorityOrder: 1,
    description: 'Introductory 8-course program checking SQL queries, Tableau dashboards, R programming, and corporate databases manipulation.',
    officialLink: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=google+data+analytics+certification+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=google+data+analytics',
    edxLink: 'https://www.edx.org/search?q=data+analytics',
    relatedRoles: ['Data Analyst', 'BI Analyst']
  },
  {
    id: 'isc2-cissp',
    name: 'ISC2 CISSP - Certified Information Systems Security Professional',
    provider: 'ISC2',
    difficulty: 'Advanced',
    costRange: '$749',
    priorityOrder: 3,
    description: 'Gold standard global security leadership verifying operational risk audits, frameworks setup, cryptos, and corporate safety code.',
    officialLink: 'https://www.isc2.org/certifications/cissp',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=cissp+complete+training+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-cissp-certification-exam',
    edxLink: 'https://www.edx.org/search?q=cissp',
    relatedRoles: ['Security Analyst (SOC)']
  },
  {
    id: 'isaca-cisa',
    name: 'ISACA Certified Information Systems Auditor (CISA)',
    provider: 'ISACA',
    difficulty: 'Advanced',
    costRange: '$575 - $760',
    priorityOrder: 3,
    description: 'Validates skills in examining network assets, identifying vulnerabilities, reporting security issues, and compliance audit frameworks.',
    officialLink: 'https://www.isaca.org/credentialing/cisa',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=isaca+cisa+course+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=isaca+cisa',
    edxLink: 'https://www.edx.org/search?q=cisa',
    relatedRoles: ['Security Analyst (SOC)', 'Systems Administrator']
  },
  {
    id: 'eccouncil-ceh',
    name: 'EC-Council Certified Ethical Hacker (CEH v12)',
    provider: 'EC-Council',
    difficulty: 'Intermediate',
    costRange: '$1,199',
    priorityOrder: 2,
    description: 'Teaches system sniffing commands, penetration strategies, wireless threats testing, malware vectors, and firewall protections.',
    officialLink: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=certified+ethical+hacker+free+lectures',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/ethical-hacking',
    edxLink: 'https://www.edx.org/search?q=ethical+hacking',
    relatedRoles: ['Security Analyst (SOC)']
  },
  {
    id: 'offsec-oscp',
    name: 'OffSec Certified Professional (OSCP)',
    provider: 'OffSec',
    difficulty: 'Advanced',
    costRange: '$1,599',
    priorityOrder: 3,
    description: 'Intense 24-hour physical lab exam verifying server penetration testing, exploit development, and command execution competence.',
    officialLink: 'https://www.offsec.com/courses/pen-200/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=oscp+prep+free+resources',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=oscp',
    edxLink: 'https://www.edx.org/search?q=penetration+testing',
    relatedRoles: ['Security Analyst (SOC)']
  },
  {
    id: 'cncf-cka',
    name: 'CNCF Certified Kubernetes Administrator (CKA)',
    provider: 'Linux Foundation / CNCF',
    difficulty: 'Intermediate',
    costRange: '$395',
    priorityOrder: 2,
    description: 'Hands-on performance test certifying capability to install, run, network, and security harden live Kubernetes clusters.',
    officialLink: 'https://www.cncf.io/training/certification/cka/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=certified+kubernetes+administrator+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-certified-kubernetes-administrator-cka-exam',
    edxLink: 'https://www.edx.org/search?q=kubernetes',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'hashicorp-terraform',
    name: 'HashiCorp Certified: Terraform Associate',
    provider: 'HashiCorp',
    difficulty: 'Intermediate',
    costRange: '$150',
    priorityOrder: 2,
    description: 'Validates automated server setups, infrastructure-as-code patterns, modular scripts, and state machines configuration.',
    officialLink: 'https://developer.hashicorp.com/certifications',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=terraform+associate+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=terraform+associate',
    edxLink: 'https://www.edx.org/search?q=terraform',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'github-foundations',
    name: 'GitHub Foundations Certified',
    provider: 'GitHub',
    difficulty: 'Beginner',
    costRange: '$99',
    priorityOrder: 1,
    description: 'Verifies knowledge of Git commands, branch structures, pull reviews, markdown formatting, and GitHub Actions setups.',
    officialLink: 'https://resources.github.com/learn/certifications/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=github+foundations+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=github+foundations',
    edxLink: 'https://www.edx.org/search?q=github+git',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist', 'Cloud Support Associate']
  },
  {
    id: 'databricks-data-engineer',
    name: 'Databricks Certified Data Engineer Associate',
    provider: 'Databricks',
    difficulty: 'Intermediate',
    costRange: '$200',
    priorityOrder: 2,
    description: 'Validates apache spark engines setups, lakehouse architectures, stream queries, and copy tables pipelines.',
    officialLink: 'https://www.databricks.com/learn/certification/data-engineer-associate',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=databricks+data+engineer+associate+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=databricks',
    edxLink: 'https://www.edx.org/search?q=databricks',
    relatedRoles: ['Data Analyst']
  },
  {
    id: 'snowflake-snowpro',
    name: 'Snowflake SnowPro Core Certification',
    provider: 'Snowflake',
    difficulty: 'Intermediate',
    costRange: '$175',
    priorityOrder: 2,
    description: 'Confirms cloud warehouse modeling, clone staging, compute scaling groups, and live data sharing configurations.',
    officialLink: 'https://learn.snowflake.com/certifications',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=snowflake+snowpro+core+training+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=snowflake+snowpro',
    edxLink: 'https://www.edx.org/search?q=snowflake',
    relatedRoles: ['Data Analyst']
  },
  {
    id: 'mongodb-developer',
    name: 'MongoDB Certified Associate Developer',
    provider: 'MongoDB University',
    difficulty: 'Intermediate',
    costRange: '$150',
    priorityOrder: 2,
    description: 'Teaches NoSQL document design, nested schemas, aggregation syntax, index scaling, and Node.js backend connections.',
    officialLink: 'https://learn.mongodb.com/pages/certification-program',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=mongodb+certification+free+tutorial',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=mongodb',
    edxLink: 'https://www.edx.org/search?q=mongodb',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'oracle-java',
    name: 'Oracle Certified Associate: Java SE Programmer',
    provider: 'Oracle',
    difficulty: 'Intermediate',
    costRange: '$245',
    priorityOrder: 2,
    description: 'Validates OOP compiler commands, classes inheritance, exceptions catching, and core programming flows in Java SE.',
    officialLink: 'https://education.oracle.com/oracle-certification-path/pFamily_48',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=java+se+programmer+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=java+programmer',
    edxLink: 'https://www.edx.org/search?q=java+oracle',
    relatedRoles: ['Cloud Support Associate']
  },
  {
    id: 'meta-frontend',
    name: 'Meta Front-End Developer Professional Certificate',
    provider: 'Meta / Coursera',
    difficulty: 'Beginner',
    costRange: 'Free via financial aid / $39 per month subscription',
    priorityOrder: 1,
    description: 'Comprehensive UI program verifying React loops, CSS frameworks, HTML structures, and interactive prototypes setups in Figma.',
    officialLink: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=meta+front+end+developer+course+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=meta+front+end',
    edxLink: 'https://www.edx.org/search?q=front+end+development',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist']
  },
  {
    id: 'istqb-ctfl',
    name: 'ISTQB Certified Tester Foundation Level (CTFL)',
    provider: 'ISTQB',
    difficulty: 'Beginner',
    costRange: '$250',
    priorityOrder: 2,
    description: 'International standard program verifying software quality checks, static/dynamic audits, and bug tracking models.',
    officialLink: 'https://www.istqb.org/certifications/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=istqb+foundation+level+training+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=istqb',
    edxLink: 'https://www.edx.org/search?q=software+testing',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist']
  },
  {
    id: 'pmi-pmp',
    name: 'PMI Project Management Professional (PMP)',
    provider: 'Project Management Institute',
    difficulty: 'Advanced',
    costRange: '$405',
    priorityOrder: 3,
    description: 'Elite corporate credentials verifying waterfall, agile, and hybrid projects planning, budget models, and team workflows.',
    officialLink: 'https://www.pmi.org/certifications/project-management-pmp',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=pmp+certification+free+training',
    linkedInLearningLink: 'https://www.linkedin.com/learning/paths/prepare-for-the-project-management-professional-pmp-certification-exam',
    edxLink: 'https://www.edx.org/search?q=project+management',
    relatedRoles: ['ERP Support Specialist']
  },
  {
    id: 'scrum-psm',
    name: 'Scrum.org Professional Scrum Master I (PSM I)',
    provider: 'Scrum.org',
    difficulty: 'Beginner',
    costRange: '$150',
    priorityOrder: 2,
    description: 'Verifies command of Scrum frameworks, agile sprint iterations, product increments, and backlog alignment tactics.',
    officialLink: 'https://www.scrum.org/professional-scrum-certifications',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=scrum+master+psm+i+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=scrum+master',
    edxLink: 'https://www.edx.org/search?q=scrum',
    relatedRoles: ['IT Support Analyst', 'ERP Support Specialist']
  },
  {
    id: 'iiba-ecba',
    name: 'IIBA Entry Certificate in Business Analysis (ECBA)',
    provider: 'IIBA',
    difficulty: 'Beginner',
    costRange: '$110',
    priorityOrder: 2,
    description: 'Validates baseline corporate process audits, user requirements mapping, and business analysis BABOK architectures.',
    officialLink: 'https://www.iiba.org/business-analysis-certifications/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=iiba+ecba+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=business+analysis',
    edxLink: 'https://www.edx.org/search?q=business+analysis',
    relatedRoles: ['IT Support Analyst', 'Data Analyst']
  },
  {
    id: 'google-ux',
    name: 'Google UX Design Professional Certificate',
    provider: 'Coursera / Google',
    difficulty: 'Beginner',
    costRange: 'Free via financial aid / $39 per month subscription',
    priorityOrder: 1,
    description: 'Validates layout design competency, wireframes mappings, Figma responsive prototypes, and interactive surveys setups.',
    officialLink: 'https://grow.google/certificates/ux-design/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=google+ux+design+professional+certificate+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=google+ux+design',
    edxLink: 'https://www.edx.org/search?q=ux+design',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist']
  },
  {
    id: 'iaap-cpacc',
    name: 'IAAP Certified Professional in Accessibility Core Competencies',
    provider: 'IAAP',
    difficulty: 'Intermediate',
    costRange: '$330',
    priorityOrder: 2,
    description: 'Validates deep knowledge of WCAG 2.1 levels, reader devices safety, and inclusive system layouts for digital platforms.',
    officialLink: 'https://www.accessibilityassociation.org/s/certification',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=iaap+cpacc+accessibility+training+free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=accessibility+wcag',
    edxLink: 'https://www.edx.org/search?q=digital+accessibility',
    relatedRoles: ['IT Support Analyst', 'Technical Support Specialist']
  },
  {
    id: 'uipath-associate',
    name: 'UiPath Certified RPA Associate (UiRPA)',
    provider: 'UiPath Academy',
    difficulty: 'Intermediate',
    costRange: '$150',
    priorityOrder: 2,
    description: 'Teaches Robotic Process Automation (RPA), text scraping web loops, spreadsheet triggers, and automated data logging systems.',
    officialLink: 'https://academy.uipath.com/certification',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=uipath+rpa+associate+free+training',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=uipath+rpa',
    edxLink: 'https://www.edx.org/search?q=robotic+process+automation',
    relatedRoles: ['Systems Administrator', 'Data Analyst']
  },
  {
    id: 'futureskills-prime',
    name: 'FutureSkills Prime Nasscom Certification',
    provider: 'Nasscom / MeitY India',
    difficulty: 'Beginner',
    costRange: 'Free / Subsidized',
    priorityOrder: 1,
    description: 'India emerging IT domains baseline validation covering Big Data clusters, IoT nodes, cloud DB, and cyber safeguards.',
    officialLink: 'https://www.futureskillsprime.in/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=futureskills+prime+nasscom',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=nasscom',
    edxLink: 'https://www.edx.org/search?q=emerging+technology',
    relatedRoles: ['Data Analyst', 'IT Support Analyst', 'Cloud Support Associate']
  },
  {
    id: 'cdac-acts',
    name: 'C-DAC PG Diploma in Advanced Computing (C-CAT)',
    provider: 'C-DAC ACTS India',
    difficulty: 'Intermediate',
    costRange: '₹91,000',
    priorityOrder: 2,
    description: 'Indian systems-level computing diploma checking backend frameworks, algorithms, data engineering structures, and networks.',
    officialLink: 'https://www.cdac.in/index.aspx?id=edu_acts_PGDiplomaAdmission',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=cdac+acts+c-cat+exam+prep',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=c-dac',
    edxLink: 'https://www.edx.org/search?q=c-dac',
    relatedRoles: ['Systems Administrator', 'Network Support Engineer']
  },
  {
    id: 'togaf-architect',
    name: 'TOGAF Enterprise Architecture Foundation',
    provider: 'The Open Group',
    difficulty: 'Advanced',
    costRange: '$395',
    priorityOrder: 3,
    description: 'Teaches enterprise architecture, systems design principles, corporate taxonomy mapping, and modeling benchmarks.',
    officialLink: 'https://www.opengroup.org/certifications/togaf',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=togaf+enterprise+architecture+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=togaf',
    edxLink: 'https://www.edx.org/search?q=enterprise+architecture',
    relatedRoles: ['Systems Administrator']
  },
  {
    id: 'cpp-cpa-cert',
    name: 'C++ Certified Associate Programmer (CPA / CPP)',
    provider: 'C++ Institute / Pearson VUE',
    difficulty: 'Intermediate',
    costRange: '$195',
    priorityOrder: 2,
    description: 'Validates proficiency in C++ syntax, object-oriented programming, STL templates, memory management, and stream I/O.',
    officialLink: 'https://cppinstitute.org/cpa-c-certified-associate-programmer',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=C%2B%2B+Complete+Course+Free',
    linkedInLearningLink: 'https://www.linkedin.com/learning/topics/c-plus-plus',
    edxLink: 'https://www.edx.org/learn/c-plus-plus',
    relatedRoles: ['C++ Developer', 'Systems Engineer', 'Software Developer']
  },
  {
    id: 'iaap-cippe',
    name: 'IAPP Certified Information Privacy Professional (CIPP/E)',
    provider: 'IAPP',
    difficulty: 'Advanced',
    costRange: '$550',
    priorityOrder: 3,
    description: 'The standard global data privacy qualification verifying command of GDPR limits, server audits, and privacy standards.',
    officialLink: 'https://iapp.org/certify/',
    freeYouTubeLink: 'https://www.youtube.com/results?search_query=iapp+cipp+gdpr+free+course',
    linkedInLearningLink: 'https://www.linkedin.com/learning/search?keywords=gdpr+cipp',
    edxLink: 'https://www.edx.org/search?q=data+privacy',
    relatedRoles: ['Security Analyst (SOC)', 'Systems Administrator']
  }
]) as CertLibraryItem[];

export const SKILLS_LIBRARY: SkillLibraryItem[] = [
  {
    name: 'C++ Systems & Memory Management',
    category: 'Programming & Data',
    description: 'Developing high-performance software using C++, managing stack/heap memory, smart pointers, RAII, and STL algorithms.',
    bestFreeTutorial: 'https://www.youtube.com/@TheCherno',
    associatedTools: ['GCC/Clang', 'GDB', 'CMake', 'Valgrind']
  },
  {
    name: 'Carbon-Aware Code Optimization',
    category: 'Programming & Data',
    description: 'Refactoring software algorithms and background schedulers to dynamically adjust operations based on regional power grids carbon-intensity.',
    bestFreeTutorial: 'https://learn.greensoftware.foundation/',
    associatedTools: ['Carbon Aware SDK', 'Scaphandre', 'Kepler Exporter']
  },
  {
    name: 'Active Directory User Access',
    category: 'Security',
    description: 'Creating, disabling, resetting passwords for enterprise users, configuring groups inside domain forests.',
    bestFreeTutorial: 'https://www.youtube.com/results?search_query=active+directory+crash+course+for+helpdesk',
    associatedTools: ['Active Directory Users & Computers', 'Microsoft Entra ID']
  },
  {
    name: 'OS Troubleshooting (Windows/Mac)',
    category: 'Operating Systems',
    description: 'Resolving Blue Screens of Death (BSOD), driver conflicts, disk partitions, file restoration and local user accounts.',
    bestFreeTutorial: 'https://www.youtube.com/results?search_query=windows+11+troubleshooting+guide+it+support',
    associatedTools: ['Event Viewer', 'Device Manager', 'Terminal/Powershell']
  },
  {
    name: 'Subnetting & IP Configuration',
    category: 'Network & Infrastructure',
    description: 'Structuring IP addresses into logical network segments, checking gateway routes, CIDR notation, and subnet masks.',
    bestFreeTutorial: 'https://www.youtube.com/@PracticalNetworking', // Practical Networking
    associatedTools: ['IPCONFIG / IFCONFIG', 'Ping', 'Traceroute']
  },
  {
    name: 'SQL Querying (Window/Joins)',
    category: 'Programming & Data',
    description: 'Writing relational database requests to merge logs, identify values, aggregate metrics, and clean records.',
    bestFreeTutorial: 'https://www.youtube.com/@freecodecamp', // freeCodeCamp
    associatedTools: ['PostgreSQL', 'MySQL Workbench', 'DB Fiddle']
  },
  {
    name: 'Linux Server Navigation',
    category: 'Operating Systems',
    description: 'Connecting via SSH, configuring directory permissions (chmod), tailing logs (tail -f), and running shell script tasks.',
    bestFreeTutorial: 'https://www.youtube.com/@freecodecamp', // freeCodeCamp Linux
    associatedTools: ['Putty', 'Bash Shell', 'OpenSSH']
  },
  {
    name: 'IAM Policies & Security boundaries',
    category: 'Cloud & Virtualization',
    description: 'Writing custom JSON cloud strategies to enforce minimum privilege policies across VMs, databases, and buckets.',
    bestFreeTutorial: 'https://www.youtube.com/results?search_query=aws+iam+policies+explained+simply',
    associatedTools: ['AWS IAM Portal', 'Azure RBAC Panel']
  },
  {
    name: 'Container Isolation',
    category: 'Cloud & Virtualization',
    description: 'Writing Dockerfiles to pack applications and standard dependencies into isolated server layers.',
    bestFreeTutorial: 'https://www.youtube.com/@TechWorldwithNana', // TechWorld with Nana Docker
    associatedTools: ['Docker Desktop', 'Docker CLI']
  },
  {
    name: 'SLA Escalation Planning',
    category: 'Support & Processes',
    description: 'Assessing enterprise tick priority based on global work impact and ticking hours countdowns.',
    bestFreeTutorial: 'https://www.youtube.com/results?search_query=itil+sla+incident+management+basics',
    associatedTools: ['ServiceNow', 'Jira Service Management']
  }
];

export const TOOLS_LIBRARY: ToolLibraryItem[] = [
  {
    name: 'CMake & GCC/Clang (C++ Toolkit)',
    category: 'Containers & Automation',
    description: 'Cross-platform build system and compiler suite for C and C++ software engineering.',
    costModel: '100% Free & Open Source',
    howToPractice: 'Write C++ source files, configure CMakeLists.txt, build native executables, and debug with GDB/LLDB.',
    freeResourceLink: 'https://cmake.org/'
  },
  {
    name: 'Scaphandre',
    category: 'Diagnostics',
    description: 'An open-source power consumption metrology agent designed to help measure software power draws and export them to metrics platforms.',
    costModel: '100% Free & Open Source',
    howToPractice: 'Deploy the agent on a Linux server or desktop, measure your application workloads, and plot the power draw (Watts) over time.',
    freeResourceLink: 'https://github.com/hubblo-org/scaphandre'
  },
  {
    name: 'ServiceNow',
    category: 'Enterprise Ticketing',
    description: 'The premier enterprise service platform globally. Manages logs, catalog orders, changes, and service databases.',
    costModel: 'Enterprise pricing (typically expensive, license-based)',
    howToPractice: 'Register for free at the ServiceNow Developer Portal to obtain a Personal Developer Instance (PDI)!',
    freeResourceLink: 'https://developer.servicenow.com/'
  },
  {
    name: 'Active Directory (AD)',
    category: 'Active Directory & Identity',
    description: 'Microsoft identity, endpoint, credentials database, managing network computer groups.',
    costModel: 'Bundled inside Windows Server license',
    howToPractice: 'Establish a local Windows Server VM inside a free VirtualBox environment and configure it as Domain Controller.',
    freeResourceLink: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services'
  },
  {
    name: 'Wireshark',
    category: 'Diagnostics',
    description: 'An open source packet capture diagnostic engine. Captures ethernet data lines to analyze handshakes, latency, or encryption failures.',
    costModel: '100% Free & Open Source',
    howToPractice: 'Install the client locally and run a package monitor while browsing secure websites to trace SSL exchanges.',
    freeResourceLink: 'https://www.wireshark.org/'
  },
  {
    name: 'Docker',
    category: 'Containers & Automation',
    description: 'Compiles applications, system runtimes, and components into compact, transportable containers.',
    costModel: 'Free Community edition / Developer Paid limits',
    howToPractice: 'Download Docker Desktop, write a basic index.html container and host locally on Port 80.',
    freeResourceLink: 'https://www.docker.com/products/docker-desktop/'
  },
  {
    name: 'AWS Cloud Console & CLI',
    category: 'Cloud Console & CLI',
    description: 'The graphical cloud panel and terminal toolkit used to configure global AWS cloud resources and storage parameters.',
    costModel: 'Free tier limits (750 EC2 hours free) / Pay as you use',
    howToPractice: 'Register for a Free Account using credit cards and set AWS Billing Alerts at $1 immediately.',
    freeResourceLink: 'https://aws.amazon.com/free/'
  },
  {
    name: 'Power BI',
    category: 'Data & BI',
    description: 'Enterprise dashboard suite to clean, merge database tables and outline business insights.',
    costModel: 'Free Desktop application / Pro licenses needed for online sharing',
    howToPractice: 'Download Power BI Desktop free on the Microsoft Store and upload Kaggle CSV datasets.',
    freeResourceLink: 'https://powerbi.microsoft.com/en-us/desktop/'
  },
  {
    name: 'SCCM / MECM (Microsoft Configuration Manager)',
    category: 'Active Directory & Identity',
    description: 'Microsoft Endpoint Configuration Manager (SCCM/MECM) for enterprise OS deployment (OSD), software patch distribution (WSUS), application packaging, asset management, and Endpoint compliance.',
    costModel: 'Microsoft System Center Licensing',
    howToPractice: 'Build a local Windows Server 2022 lab VM and install MECM Technical Preview with Active Directory integration.',
    freeResourceLink: 'https://learn.microsoft.com/en-us/mem/configmgr/'
  },
  {
    name: 'Microsoft Intune (Cloud MDM / MAM)',
    category: 'Active Directory & Identity',
    description: 'Cloud-native endpoint management solution for mobile devices (MDM), mobile applications (MAM), zero-touch deployment (Autopilot), and security compliance for Windows, macOS, iOS, and Android.',
    costModel: 'Included in M365 E3/E5 / EMS licensing',
    howToPractice: 'Sign up for a free 90-day renewable Microsoft 365 Developer tenant with Intune evaluation licenses.',
    freeResourceLink: 'https://learn.microsoft.com/en-us/mem/intune/'
  },
  {
    name: 'Group Policy Management (GPO)',
    category: 'Active Directory & Identity',
    description: 'Centralized policy configuration framework in Active Directory to enforce security baselines, user profiles, software restriction policies, and registry keys across enterprise Windows networks.',
    costModel: 'Bundled in Windows Server',
    howToPractice: 'Configure Active Directory OUs and link GPOs to mandate password complexity, disable USB drives, and enforce Windows Firewall rules.',
    freeResourceLink: 'https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn168923(v=ws.11)'
  },
  {
    name: 'Microsoft Entra ID (Azure Active Directory)',
    category: 'Active Directory & Identity',
    description: 'Enterprise cloud identity solution providing Single Sign-On (SSO), Multi-Factor Authentication (MFA), Conditional Access rules, and hybrid cloud identity sync via Entra Connect.',
    costModel: 'Free tier included / P1 & P2 premium licenses',
    howToPractice: 'Set up a free Azure Portal tenant and sync test domain accounts using Entra ID Connect Sync.',
    freeResourceLink: 'https://learn.microsoft.com/en-us/entra/identity/'
  },
  {
    name: 'PowerShell Automation & Scripting',
    category: 'Cloud Console & CLI',
    description: 'Command-line shell and object-oriented scripting language built for automating system administration, Active Directory workflows, Azure/M365 tasks, and CI/CD pipelines.',
    costModel: '100% Free & Open Source',
    howToPractice: 'Open PowerShell terminal and write scripts to bulk create Active Directory users, query event logs, and parse JSON data.',
    freeResourceLink: 'https://learn.microsoft.com/en-us/powershell/'
  }
];

export const CORNER_TIPS: string[] = [
  'Choose a field which gives you the room to grow and develop.',
  'Create while studying and Study while creating.',
  'Make your own time to study and create.',
  'Choose a field and know how it would transform in the coming years and work for the path.',
  'A certification verifies your knowledge, but practical projects verify your capability.',
  'First understand the network plumbing (Subnets, TCP/IP, DNS); it governs both Cloud and Cybersecurity.',
  'Automate everything: A 5-line bash loop is better than doing the same task 50 times.'
];
