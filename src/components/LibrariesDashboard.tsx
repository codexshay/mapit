import React, { useState } from 'react';
import { CERTIFICATIONS_LIBRARY, CertLibraryItem } from '../data/librariesData';
import importedPortals from '../data/generated/portals.json';
import importedSkills from '../data/generated/skills.json';
import importedTopics from '../data/generated/topics.json';
import importedDomains from '../data/generated/domains.json';
import importedCatalog from '../data/generated/catalog-normalized.json';
import { BookOpen, Award, Terminal, Wrench, Search, Play, ExternalLink, HelpCircle, Globe, Layers, Book, ArrowRight, Youtube, FileDown, AlertCircle, CheckCircle, Video, Trophy, Filter, RefreshCw, GitBranch, LayoutGrid, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import YoutubeTeachers, { TEACHERS_DIRECTORY } from './YoutubeTeachers';
import Hackathons, { GLOBAL_HACKATHONS, GLOBAL_FESTS } from './Hackathons';
import { auditPrerequisites } from '../utils/prereqAudit';
import { IT_TAXONOMY_DATA } from './ITTaxonomyExplorer';
import { useDebounce, getCrossTabSummary, searchUnifiedIndex } from '../utils/searchIndex';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storageMigration';
import { resolveKeywordMetadata } from '../utils/masterKeywordSearch';
import { getOfferedStudyPortals, getPortalCourseDirectUrl } from '../utils/studyPortalLookup';
import { expandQueryViaKnowledgeGraph, calculateItemRelevanceScore } from '../utils/knowledgeGraphEngine';

const cleanFamilyName = (name: string): string => {
  return name.replace(/^(?:\d+\.\s*|[^a-zA-Z\d\s]+\s*)/, '');
};

const getTaxonomyCategoryForCert = (certName: string): string => {
  const foundCategory = IT_TAXONOMY_DATA.find(cat => 
    cat.certifications.some(c => c.name.toLowerCase() === certName.toLowerCase() || c.name.toLowerCase().includes(certName.toLowerCase()) || certName.toLowerCase().includes(c.name.toLowerCase()))
  );
  return foundCategory ? foundCategory.name : "Professional IT Certifications";
};

const mapCertToYoutubeCategories = (certId: string): string[] => {
  const cats: string[] = [];
  
  if (certId.includes('green')) cats.push('green-computing');
  
  if (certId.includes('az900') || certId.includes('ccp') || certId.includes('cloud') || certId.includes('az104') || certId.includes('az204') || certId.includes('az305') || certId.includes('saa') || certId.includes('dva') || certId.includes('ace') || certId.includes('pca')) {
    cats.push('cloud', 'devops');
  }
  
  if (certId.includes('network') || certId.includes('ccna') || certId.includes('ccst') || certId.includes('jncia') || certId.includes('comptia-a')) {
    cats.push('networking', 'sysadmin');
  }
  
  if (certId.includes('security') || certId.includes('cyber') || certId.includes('cissp') || certId.includes('cisa') || certId.includes('ceh') || certId.includes('oscp') || certId.includes('fortinet')) {
    cats.push('security', 'sysadmin');
  }
  
  if (certId.includes('data') || certId.includes('bi') || certId.includes('analytics') || certId.includes('databricks')) {
    cats.push('data', 'databases');
  }
  
  if (certId.includes('ai900') || certId.includes('ai-ml')) {
    cats.push('ai-ml', 'data');
  }
  
  if (certId.includes('snowflake') || certId.includes('mongodb') || certId.includes('database') || certId.includes('sql')) {
    cats.push('databases', 'data');
  }
  
  if (certId.includes('python') || certId.includes('java') || certId.includes('frontend') || certId.includes('meta-frontend') || certId.includes('software') || certId.includes('acts')) {
    cats.push('software', 'foundations');
  }
  
  if (certId.includes('ctfl') || certId.includes('istqb')) {
    cats.push('qa', 'software');
  }
  
  if (certId.includes('devops') || certId.includes('terraform') || certId.includes('github') || certId.includes('cka')) {
    cats.push('devops', 'cloud');
  }
  
  if (certId.includes('pmp') || certId.includes('scrum') || certId.includes('psm') || certId.includes('ecba') || certId.includes('togaf') || certId.includes('cobit')) {
    cats.push('leadership', 'business-apps');
  }
  
  if (certId.includes('ux') || certId.includes('cpacc') || certId.includes('design')) {
    cats.push('design', 'foundations');
  }
  
  if (certId.includes('uipath') || certId.includes('rpa') || certId.includes('automation')) {
    cats.push('automation-rpa', 'software');
  }
  
  if (certId.includes('salesforce')) {
    cats.push('business-apps', 'support');
  }
  
  if (certId.includes('support') || certId.includes('itil') || certId.includes('servicenow') || certId.includes('iso')) {
    cats.push('support', 'leadership');
  }
  
  if (certId.includes('linux') || certId.includes('server') || certId.includes('comptia-a')) {
    cats.push('sysadmin', 'support');
  }
  
  if (cats.length === 0) {
    cats.push('foundations');
  }
  
  return Array.from(new Set(cats));
};

const getAlternativeLearningPortal = (cert: CertLibraryItem): { name: string; url: string } => {
  const providerLower = cert.provider.toLowerCase();
  const nameLower = cert.name.toLowerCase();
  const idLower = cert.id.toLowerCase();

  // Indian Government / state-level programs
  if (
    providerLower.includes('nielit') || 
    idLower.includes('nielit') || 
    idLower.includes('c-dac') || 
    providerLower.includes('c-dac') || 
    providerLower.includes('swayam') || 
    providerLower.includes('nptel')
  ) {
    return {
      name: "Swayam NPTEL",
      url: "https://swayam.gov.in/"
    };
  }

  // Salesforce
  if (providerLower.includes('salesforce') || idLower.includes('salesforce')) {
    return {
      name: "Salesforce Trailhead",
      url: "https://trailhead.salesforce.com/"
    };
  }

  // ServiceNow
  if (providerLower.includes('servicenow') || idLower.includes('servicenow')) {
    return {
      name: "Now Learning",
      url: "https://nowlearning.servicenow.com/"
    };
  }

  // AWS
  if (providerLower.includes('amazon') || providerLower.includes('aws') || idLower.includes('aws')) {
    return {
      name: "AWS Skill Builder",
      url: "https://aws.amazon.com/training/"
    };
  }

  // Microsoft
  if (
    providerLower.includes('microsoft') || 
    providerLower.includes('azure') || 
    idLower.includes('az-') || 
    idLower.includes('az900') || 
    idLower.includes('ai-') || 
    idLower.includes('ai900')
  ) {
    return {
      name: "Microsoft Learn",
      url: "https://learn.microsoft.com/"
    };
  }

  // Google
  if (providerLower.includes('google') || idLower.includes('google') || idLower.includes('gcp')) {
    if (nameLower.includes('cloud') || providerLower.includes('cloud')) {
      return {
        name: "Google Cloud Skills Boot",
        url: "https://www.cloudskillsboost.google/"
      };
    }
    return {
      name: "Coursera Google Hub",
      url: "https://www.coursera.org/google-certificates"
    };
  }

  // Cisco
  if (providerLower.includes('cisco') || idLower.includes('cisco') || idLower.includes('ccna') || idLower.includes('ccst')) {
    return {
      name: "Cisco Skills for All",
      url: "https://skillsforall.com/"
    };
  }

  // Linux Foundation & CNCF / CKA
  if (providerLower.includes('linux foundation') || providerLower.includes('cncf') || idLower.includes('cka') || idLower.includes('kubernetes')) {
    return {
      name: "Linux Foundation Learn",
      url: "https://training.linuxfoundation.org/"
    };
  }

  // Databricks
  if (providerLower.includes('databricks') || idLower.includes('databricks')) {
    return {
      name: "Databricks Academy",
      url: "https://www.databricks.com/learn/training"
    };
  }

  // Snowflake
  if (providerLower.includes('snowflake') || idLower.includes('snowflake')) {
    return {
      name: "Snowflake University",
      url: "https://learn.snowflake.com/"
    };
  }

  // MongoDB
  if (providerLower.includes('mongodb') || idLower.includes('mongodb')) {
    return {
      name: "MongoDB University",
      url: "https://learn.mongodb.com/"
    };
  }

  // Oracle
  if (providerLower.includes('oracle') || idLower.includes('oracle') || idLower.includes('java')) {
    return {
      name: "Oracle University",
      url: "https://education.oracle.com/"
    };
  }

  // CompTIA
  if (providerLower.includes('comptia') || idLower.includes('comptia')) {
    return {
      name: "Coursera CompTIA Prep",
      url: `https://www.coursera.org/search?query=${encodeURIComponent(cert.name)}`
    };
  }

  // Security (ISACA, ISC2, OSCP, etc)
  if (
    providerLower.includes('isaca') || 
    providerLower.includes('isc2') || 
    providerLower.includes('offsec') || 
    idLower.includes('security') || 
    idLower.includes('oscp') || 
    idLower.includes('cissp') || 
    idLower.includes('cisa')
  ) {
    return {
      name: "Coursera Security Hub",
      url: "https://www.coursera.org/courses?query=cybersecurity"
    };
  }

  // Fallback - Coursera is globally trusted and highly functional
  return {
    name: "Coursera Learning",
    url: `https://www.coursera.org/search?query=${encodeURIComponent(cert.name)}`
  };
};

interface LearningPlatform {
  name: string;
  category: 'Developer Handbooks' | 'Professional Edtech' | 'Government Authorised Program';
  description: string;
  url: string;
  badges: string[];
}

const LEARNING_CHANNELS: LearningPlatform[] = [
  {
    name: 'W3Schools Interactive Sandbox',
    category: 'Developer Handbooks',
    description: 'Premier destination for responsive, interactive playground-style learning of SQL, Python, HTML/CSS, JavaScript, and command terminal basics.',
    url: 'https://www.w3schools.com/',
    badges: ['SQL Web Playgrounds', 'Interactive Quizzes', 'Developer Handbooks']
  },
  {
    name: 'GeeksforGeeks Tech Portal',
    category: 'Developer Handbooks',
    description: 'Exceptional dictionary for computer science logic, Data Structures & Algorithms (DSA), backend languages, database queries, and system security fundamentals.',
    url: 'https://www.geeksforgeeks.org/',
    badges: ['DSA Roadmaps', 'System Design Base', 'Mock Coding Practice']
  },
  {
    name: 'Microsoft Learn Training Console',
    category: 'Professional Edtech',
    description: 'Official free technical learning home for Microsoft Cloud. Tailored preparation modules for Azure (AZ-900), Power Platform, SQL Server databases, enterprise security, and M365 systems.',
    url: 'https://learn.microsoft.com/',
    badges: ['Official MS Sandboxes', 'Azure Cert Paths', 'No Fee Training']
  },
  {
    name: 'AWS Skill Builder Center',
    category: 'Professional Edtech',
    description: 'Amazon Web Services official resource center for cloud fundamentals. Offers structured video routes, interactive learning games, and official CLF-C02 preparation materials.',
    url: 'https://aws.amazon.com/training/',
    badges: ['Official AWS Content', 'Practitioner Labs', 'Self-Paced Courses']
  },
  {
    name: 'Google Cloud Skills Boost Learn',
    category: 'Professional Edtech',
    description: 'Direct interactive training sandbox for Google Cloud Platform. Features hands-on labs for BigQuery, VPC networking, Kubernetes engine, and Vertex AI model endpoints.',
    url: 'https://www.cloudskillsboost.google/',
    badges: ['Real Cloud Consoles', 'GCP Skill Badges', 'AI & Data Engineering']
  },
  {
    name: 'Grow with Google Career Hub',
    category: 'Professional Edtech',
    description: 'Google\'s premier global career upskilling initiative. Hosts training programs, Google Career Certificates (IT Support, Cybersecurity, Data Analytics, Project Management), and AI-specific fundamentals.',
    url: 'https://grow.google/',
    badges: ['Google Certificates', 'IT & Security Tracks', 'Career Preparation']
  },
  {
    name: 'Green Software Foundation Learn Portal',
    category: 'Professional Edtech',
    description: 'The global developer home for learning carbon-efficient program methodologies, calculating software emissions metrics, and adopting carbon-neutral design guidelines.',
    url: 'https://learn.greensoftware.foundation/',
    badges: ['Green IT Certification', 'Principles of Green Code', 'Sustainability Guides']
  },
  {
    name: 'Google Developers Learn Portal',
    category: 'Professional Edtech',
    description: 'Google\'s central educational platform for software engineering. Features curated pathways, interactive codelabs, and virtual credentials for Web Dev, Android, Flutter, TensorFlow, and Firebase.',
    url: 'https://developers.google.com/learn/',
    badges: ['Codelabs Sandbox', 'Android & Flutter', 'Firebase Dev Tracks']
  },
  {
    name: 'Google Tech Dev Guide',
    category: 'Developer Handbooks',
    description: 'Google\'s official Tech Dev Guide offering computer science learning materials, coding challenges, and educational guides curated by Google engineers for learners at all stages.',
    url: 'https://techdevguide.withgoogle.com/',
    badges: ['Google Engineer Curated', 'Coding Challenges', 'DSA Roadmap Guide']
  },
  {
    name: 'IBM SkillsBuild Tech Credentials',
    category: 'Professional Edtech',
    description: 'IBM\'s community upskilling ecosystem providing no-charge courses, digital badges, and interactive pathways for artificial intelligence, hybrid cloud, data analyst, and project coordinators.',
    url: 'https://skillsbuild.org/',
    badges: ['IBM Digital Badges', 'AI Foundations', 'Free Certification']
  },
  {
    name: 'FutureSkills Prime (Nasscom & MeitY)',
    category: 'Government Authorised Program',
    description: 'Apex digital technology upskilling joint initiative between Nasscom and Government of India (MeitY). Offers authorized certifications in cybersecurity, cloud administration, and advanced web tech.',
    url: 'https://futureskillsprime.in/',
    badges: ['MeitY Govt Backed', 'India Industry Standard', 'Bridge Placements']
  },
  {
    name: 'SWAYAM NPTEL National Portal',
    category: 'Government Authorised Program',
    description: 'Government of India authorized platform providing accredited university-level certification courses in computer networks, operating systems, cloud systems, and AI databases.',
    url: 'https://swayam.gov.in/',
    badges: ['Govt Authorized', 'Accredited Credits', 'MHRD Supported']
  },
  {
    name: 'Swayam Central (NPTEL)',
    category: 'Government Authorised Program',
    description: 'Free university-grade courses across engineering and technology. Certification exams are authorized by top IITs and available at low fees.',
    url: 'https://nptel.ac.in/',
    badges: ['IIT Instructed', 'Govt Exam Node', 'Official Certificate']
  },
  {
    name: 'Infosys Springboard Learning Portal',
    category: 'Government Authorised Program',
    description: 'Exceptional corporate-backed free digital literacy and software programming portal from Infosys. Prepares freshers and graduates for enterprise technology roles.',
    url: 'https://infyspringboard.onwingspan.com/',
    badges: ['Enterprise Software Ready', 'Free Skill Tracks', 'Agile & Coding Basics']
  },
  {
    name: 'US FedVTE (Federal Virtual Training)',
    category: 'Government Authorised Program',
    description: 'Authorized federal cybersecurity training engine hosted by CISA. Free, comprehensive pathways into risk assessment, cloud security, and computer forensics.',
    url: 'https://fedvte.usalearning.gov/',
    badges: ['US Govt CISA', 'Cybersecurity Ops', 'No Fee Tiers']
  },
  {
    name: 'Coursera Professional Specializations',
    category: 'Professional Edtech',
    description: 'Leading global carrier representing verified professional certifications designed directly by Google, IBM, Microsoft, and AWS.',
    url: 'https://www.coursera.org/',
    badges: ['Google Professional Certs', 'Full Study Tracks', 'Flexible Aid']
  },
  {
    name: 'edX University MicroMasters',
    category: 'Professional Edtech',
    description: 'Premier university learning hub hosted by MIT, Harvard, and Berkeley. Ideal for advanced cloud systems, database operations, and machine learning structures.',
    url: 'https://www.edx.org/',
    badges: ['Ivy League Base', 'Advanced MicroDegrees', 'Audit for Free']
  },
  {
    name: 'LinkedIn Learning paths',
    category: 'Professional Edtech',
    description: 'In-depth tutorial collections teaching Windows Server, Intune administration, network routing, software development, and soft office skills.',
    url: 'https://www.linkedin.com/learning/',
    badges: ['Integrated LinkedIn Profile', 'Skill Assessments', 'Enterprise Standards']
  }
];

interface UniversalTool {
  area: string;
  whatToLearn: string;
  trustedResources: { name: string; url: string }[];
}

interface RoleFamilyToolMap {
  id: string;
  name: string;
  roles: string[];
  groups: {
    name: string;
    skills: string;
    resources: { name: string; url: string }[];
  }[];
}

export interface RecommendedBook {
  title: string;
  author: string;
  bestFor: string;
  summary: string;
  url: string;
  coverAccent: string;
  category: "CEO" | "CTO" | "Product" | "Dev" | "DevOps" | "Security" | "Data" | "Operations" | "HR" | "Marketing" | "Academic";
}

export function getYouTubeTeachersForTopic(topicName: string, skillsText: string, familyId?: string): { name: string; url: string }[] {
  // Map familyId to TEACHERS_DIRECTORY category IDs
  const idMap: { [key: string]: string } = {
    'it-support': 'support',
    'sysadmin': 'sysadmin',
    'networking': 'networking',
    'cloud-computing': 'cloud',
    'cybersecurity': 'security',
    'software-dev': 'software',
    'qa-testing': 'qa',
    'devops-sre': 'devops',
    'data-analytics': 'data',
    'data-science-ai': 'ai-ml',
    'database': 'databases',
    'project-delivery': 'leadership'
  };

  const targetCategoryId = familyId ? idMap[familyId] : undefined;
  
  // Find category in TEACHERS_DIRECTORY
  const categories = targetCategoryId 
    ? TEACHERS_DIRECTORY.filter(cat => cat.id === targetCategoryId)
    : TEACHERS_DIRECTORY;

  const results: { name: string; url: string }[] = [];
  const added = new Set<string>();

  // Helper to add unique teachers
  const addTeachers = (teachersList: { name: string; url: string }[]) => {
    for (const t of teachersList) {
      if (!added.has(t.name.toLowerCase())) {
        added.add(t.name.toLowerCase());
        results.push(t);
      }
    }
  };

  // Perform scoring/matching against skillArea and suggestedStudy
  const cleanTopic = topicName.toLowerCase();
  const cleanSkills = skillsText.toLowerCase();

  // Primary check: precise matching keywords
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      const area = sub.skillArea.toLowerCase();

      // Check if keyword overlapping
      const isMatch = 
        area.includes(cleanTopic) || 
        cleanTopic.includes(area) ||
        area.split(/[\s,/-]+/).some(word => word.length > 3 && (cleanTopic.includes(word) || cleanSkills.includes(word)));

      if (isMatch) {
         addTeachers(sub.teachers);
      }
    }
  }

  // Fallback: If no match, check any subcategory in the category as a fallback
  if (results.length === 0 && targetCategoryId) {
    const parentCat = TEACHERS_DIRECTORY.find(cat => cat.id === targetCategoryId);
    if (parentCat && parentCat.subcategories.length > 0) {
      // Just take the first subcategory's teachers
      addTeachers(parentCat.subcategories[0].teachers);
    }
  }

  // Absolute fallback for universal tools if absolutely empty
  if (results.length === 0) {
    // Return some foundations teachers
    const foundationCat = TEACHERS_DIRECTORY.find(cat => cat.id === 'foundations');
    if (foundationCat && foundationCat.subcategories.length > 0) {
      addTeachers(foundationCat.subcategories[0].teachers);
    }
  }

  return results.slice(0, 4); // Limit to top 4 unique teachers
}

const UNIVERSAL_TOOLS: UniversalTool[] = [
  {
    area: "Operating systems",
    whatToLearn: "Windows 10/11, Windows Server basics, macOS, Linux basics",
    trustedResources: [
      { name: "Microsoft Learn Windows", url: "https://learn.microsoft.com/windows/" },
      { name: "Linux Foundation Training", url: "https://training.linuxfoundation.org/" },
      { name: "Red Hat Training", url: "https://www.redhat.com/en/services/training" }
    ]
  },
  {
    area: "Identity & access",
    whatToLearn: "Active Directory, Entra ID, IAM, MFA, SSO, RBAC",
    trustedResources: [
      { name: "Microsoft Entra docs", url: "https://learn.microsoft.com/entra/" },
      { name: "AWS IAM docs", url: "https://docs.aws.amazon.com/IAM/" },
      { name: "Google Cloud IAM docs", url: "https://cloud.google.com/iam/docs" }
    ]
  },
  {
    area: "Networking fundamentals",
    whatToLearn: "DNS, DHCP, TCP/IP, VPN, Wi-Fi, firewalls, load balancers",
    trustedResources: [
      { name: "Cisco Networking Academy", url: "https://www.netacad.com/" },
      { name: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/" },
      { name: "Microsoft networking fundamentals", url: "https://learn.microsoft.com/training/" }
    ]
  },
  {
    area: "Ticketing & ITSM",
    whatToLearn: "ServiceNow, Jira Service Management, Zendesk, incident/change/problem management",
    trustedResources: [
      { name: "ServiceNow Now Learning", url: "https://nowlearning.servicenow.com/" },
      { name: "Atlassian University", url: "https://university.atlassian.com/" },
      { name: "Zendesk Training", url: "https://training.zendesk.com/" },
      { name: "ITIL PeopleCert", url: "https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework" }
    ]
  },
  {
    area: "Collaboration & productivity",
    whatToLearn: "Microsoft 365, Google Workspace, Teams, Slack, Zoom, documentation discipline",
    trustedResources: [
      { name: "Microsoft 365 Training", url: "https://support.microsoft.com/training" },
      { name: "Google Workspace Learning Center", url: "https://support.google.com/a/users" },
      { name: "Slack Resources", url: "https://slack.com/resources" },
      { name: "Zoom Learning Center", url: "https://learning.zoom.us/" }
    ]
  },
  {
    area: "Security basics",
    whatToLearn: "Phishing, MFA, least privilege, endpoint protection, vulnerability awareness, logging",
    trustedResources: [
      { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
      { name: "NICE Cybersecurity Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" },
      { name: "OWASP", url: "https://owasp.org/" },
      { name: "Microsoft Security Learn", url: "https://learn.microsoft.com/security/" }
    ]
  },
  {
    area: "Cloud basics",
    whatToLearn: "AWS, Azure, Google Cloud, compute, storage, networking, IAM, billing basics",
    trustedResources: [
      { name: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
      { name: "Microsoft Learn Azure", url: "https://learn.microsoft.com/azure/" },
      { name: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/" }
    ]
  },
  {
    area: "Documentation & knowledge base",
    whatToLearn: "SOPs, KB articles, runbooks, diagrams, post-incident notes",
    trustedResources: [
      { name: "Google Technical Writing", url: "https://developers.google.com/tech-writing" },
      { name: "Microsoft Style Guide", url: "https://learn.microsoft.com/style-guide/" },
      { name: "Atlassian Confluence resources", url: "https://www.atlassian.com/software/confluence/resources" }
    ]
  },
  {
    area: "AI productivity",
    whatToLearn: "Prompting, summarization, spreadsheet/formula help, code explanation, safe AI use",
    trustedResources: [
      { name: "Microsoft AI learning", url: "https://learn.microsoft.com/ai/" },
      { name: "Google AI for Developers", url: "https://ai.google.dev/" },
      { name: "IBM SkillsBuild AI", url: "https://skillsbuild.org/" }
    ]
  }
];

const ROLE_FAMILY_MAPS: RoleFamilyToolMap[] = [
  {
    id: "green-computing",
    name: "0. Green Computing & Sustainable IT",
    roles: ["Green IT Apprentice", "Carbon Analyst Trainee", "Sustainable Software Developer Intern", "Green Computing Specialist", "Carbon-Aware Software Engineer", "Sustainable Infrastructure Analyst", "Senior Sustainable Systems Engineer", "Sustainable Data Center Architect", "Green IT Compliance Manager", "Green AI Analyst", "Director of Sustainable Technology", "Chief Sustainability Officer"],
    groups: [
      {
        name: "Carbon-efficient programming & APIs",
        skills: "Carbon Aware SDK, spatial shift configurations, temporal task scheduling, energy-proportional code optimization",
        resources: [
          { name: "Green Software Practitioner", url: "https://learn.greensoftware.foundation/" },
          { name: "Carbon Aware SDK", url: "https://github.com/Green-Software-Foundation/carbon-aware-sdk" }
        ]
      },
      {
        name: "Power metrology & telemetry",
        skills: "Scaphandre, Kepler Kubernetes Exporter, running power consumption profiling loops, measuring CPU power draws",
        resources: [
          { name: "Scaphandre", url: "https://github.com/hubblo-org/scaphandre" },
          { name: "Kepler Project", url: "https://sustainable-computing.io/" }
        ]
      },
      {
        name: "Sustainable cloud resource practices",
        skills: "FinOps-ESG alignment, scheduling servers to low-intensity grid hours, container density maximization, underutilized node hibernation",
        resources: [
          { name: "CNCF Environmental Sustainability", url: "https://github.com/cncf/tag-environmental-sustainability" },
          { name: "AWS Customer Carbon Footprint", url: "https://aws.amazon.com/blogs/aws/new-customer-carbon-footprint-tool/" }
        ]
      }
    ]
  },
  {
    id: "it-support",
    name: "1. IT Support, Help Desk & Desktop Support",
    roles: ["Help Desk Technician", "Service Desk Analyst", "IT Support Analyst", "Desktop Support Engineer", "Field Support Technician"],
    groups: [
      {
        name: "Remote support & endpoint tools",
        skills: "Windows Quick Assist, Remote Desktop, TeamViewer, AnyDesk, Intune, SCCM, Jamf",
        resources: [
          { name: "Microsoft Intune", url: "https://learn.microsoft.com/mem/intune/" },
          { name: "Microsoft Config Manager", url: "https://learn.microsoft.com/mem/configmgr/" },
          { name: "Jamf Training", url: "https://training.jamf.com/" }
        ]
      },
      {
        name: "Ticketing & customer support",
        skills: "ServiceNow, Zendesk, Jira Service Management, Freshservice",
        resources: [
          { name: "ServiceNow Learning", url: "https://nowlearning.servicenow.com/" },
          { name: "Zendesk Training", url: "https://training.zendesk.com/" },
          { name: "Atlassian University", url: "https://university.atlassian.com/" },
          { name: "Freshworks Academy", url: "https://academy.freshworks.com/" }
        ]
      },
      {
        name: "Endpoint troubleshooting",
        skills: "Event Viewer, Device Manager, Disk Management, PowerShell basics, BIOS/UEFI, drivers",
        resources: [
          { name: "Microsoft Windows client", url: "https://learn.microsoft.com/windows/" },
          { name: "PowerShell docs", url: "https://learn.microsoft.com/powershell/" },
          { name: "Dell Tech Education", url: "https://education.dell.com/" }
        ]
      },
      {
        name: "Microsoft 365 support",
        skills: "Outlook, Teams, OneDrive, SharePoint, Exchange admin, M365 admin center",
        resources: [
          { name: "Microsoft 365 admin docs", url: "https://learn.microsoft.com/microsoft-365/admin/" },
          { name: "Microsoft 365 Training", url: "https://support.microsoft.com/training" }
        ]
      }
    ]
  },
  {
    id: "sysadmin",
    name: "2. System Administration & Infrastructure",
    roles: ["Junior System Administrator", "Windows/Linux Administrator", "Server Administrator", "Infrastructure Engineer"],
    groups: [
      {
        name: "Server administration",
        skills: "Windows Server, Linux, Active Directory, Group Policy, DNS, DHCP",
        resources: [
          { name: "Windows Server docs", url: "https://learn.microsoft.com/windows-server/" },
          { name: "Red Hat Training", url: "https://www.redhat.com/en/services/training" },
          { name: "Linux Foundation Training", url: "https://training.linuxfoundation.org/" }
        ]
      },
      {
        name: "Virtualization",
        skills: "VMware vSphere, Hyper-V, Proxmox basics",
        resources: [
          { name: "VMware Learning", url: "https://www.vmware.com/learning.html" },
          { name: "Microsoft Hyper-V docs", url: "https://learn.microsoft.com/windows-server/virtualization/hyper-v/" }
        ]
      },
      {
        name: "Monitoring & backup",
        skills: "Veeam, Zabbix, Nagios, PRTG, Azure Monitor",
        resources: [
          { name: "Veeam University", url: "https://www.veeam.com/education.html" },
          { name: "Zabbix Training", url: "https://www.zabbix.com/training" },
          { name: "Azure Monitor docs", url: "https://learn.microsoft.com/azure/azure-monitor/" }
        ]
      },
      {
        name: "Automation",
        skills: "PowerShell, Bash, Ansible, Python basics",
        resources: [
          { name: "PowerShell docs", url: "https://learn.microsoft.com/powershell/" },
          { name: "Red Hat Ansible Learning", url: "https://www.redhat.com/en/services/training-and-certification" },
          { name: "Python docs", url: "https://docs.python.org/3/tutorial/" }
        ]
      }
    ]
  },
  {
    id: "networking",
    name: "3. Networking, NOC, Telecom & Collaboration",
    roles: ["NOC Analyst", "Network Engineer", "Network Administrator", "Telecom Engineer", "VoIP Engineer"],
    groups: [
      {
        name: "Network devices & protocols",
        skills: "Cisco IOS, routers, switches, VLANs, OSPF, BGP, NAT, VPN",
        resources: [
          { name: "Cisco Learning Network", url: "https://learningnetwork.cisco.com/" },
          { name: "Cisco Networking Academy", url: "https://www.netacad.com/" }
        ]
      },
      {
        name: "Monitoring & packet analysis",
        skills: "Wireshark, SolarWinds, PRTG, Nagios, Zabbix",
        resources: [
          { name: "Wireshark docs", url: "https://www.wireshark.org/docs/" },
          { name: "SolarWinds Academy", url: "https://academy.solarwinds.com/" },
          { name: "PRTG Manual", url: "https://www.paessler.com/manuals/prtg" }
        ]
      },
      {
        name: "Firewalls & security",
        skills: "Fortinet, Palo Alto, Cisco ASA/Firepower, pfSense",
        resources: [
          { name: "Fortinet Training", url: "https://training.fortinet.com/" },
          { name: "Palo Alto Beacon", url: "https://beacon.paloaltonetworks.com/" },
          { name: "Cisco Security Certs", url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/security/index.html" }
        ]
      },
      {
        name: "Voice & collaboration",
        skills: "Microsoft Teams admin, Zoom, contact center platforms",
        resources: [
          { name: "Microsoft Teams admin docs", url: "https://learn.microsoft.com/microsoftteams" },
          { name: "Zoom Learning Center", url: "https://learning.zoom.us/" }
        ]
      }
    ]
  },
  {
    id: "cloud-computing",
    name: "4. Cloud Computing",
    roles: ["Cloud Support Associate", "Cloud Engineer", "Azure/AWS/GCP Administrator", "Cloud Architect"],
    groups: [
      {
        name: "Cloud platforms",
        skills: "AWS, Microsoft Azure, Google Cloud, Oracle Cloud",
        resources: [
          { name: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
          { name: "Microsoft Learn Azure", url: "https://learn.microsoft.com/azure/" },
          { name: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/" },
          { name: "Oracle MyLearn", url: "https://mylearn.oracle.com/" }
        ]
      },
      {
        name: "Cloud operations",
        skills: "CloudWatch, Azure Monitor, Google Cloud Operations, billing/cost management",
        resources: [
          { name: "AWS CloudWatch docs", url: "https://docs.aws.amazon.com/cloudwatch/" },
          { name: "Azure Monitor docs", url: "https://learn.microsoft.com/azure/azure-monitor/" },
          { name: "Google Cloud Operations", url: "https://cloud.google.com/products/operations" }
        ]
      },
      {
        name: "Infrastructure as code",
        skills: "Terraform, CloudFormation, ARM/Bicep",
        resources: [
          { name: "HashiCorp Developer", url: "https://developer.hashicorp.com/terraform" },
          { name: "AWS CloudFormation docs", url: "https://docs.aws.amazon.com/cloudformation/" },
          { name: "Azure Bicep docs", url: "https://learn.microsoft.com/azure/azure-resource-manager/bicep/" }
        ]
      },
      {
        name: "Cloud security & IAM",
        skills: "IAM, KMS, Key Vault, Security Center/Defender, WAF",
        resources: [
          { name: "AWS Security Learning", url: "https://aws.amazon.com/training/security/" },
          { name: "Microsoft Security Learn", url: "https://learn.microsoft.com/security/" },
          { name: "Google Cloud Security", url: "https://cloud.google.com/security" }
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    name: "5. Cybersecurity, SOC, GRC & IAM",
    roles: ["SOC Analyst", "Security Analyst", "IAM Analyst", "GRC Analyst", "Security Engineer", "Security Architect"],
    groups: [
      {
        name: "SOC & SIEM",
        skills: "Splunk, Microsoft Sentinel, Elastic, QRadar, Chronicle",
        resources: [
          { name: "Splunk Education", url: "https://www.splunk.com/en_us/training.html" },
          { name: "Microsoft Sentinel Learn", url: "https://learn.microsoft.com/azure/sentinel/" },
          { name: "Elastic Training", url: "https://www.elastic.co/training/" }
        ]
      },
      {
        name: "Security frameworks",
        skills: "NIST CSF, NIST NICE, MITRE ATT&CK, CIS Controls, OWASP",
        resources: [
          { name: "NIST CS Framework", url: "https://www.nist.gov/cyberframework" },
          { name: "MITRE ATT&CK", url: "https://attack.mitre.org/" },
          { name: "CIS Controls", url: "https://www.cisecurity.org/controls" },
          { name: "OWASP Program", url: "https://owasp.org/" }
        ]
      },
      {
        name: "Vulnerability & endpoint",
        skills: "Tenable/Nessus, Qualys, Defender, CrowdStrike basics",
        resources: [
          { name: "Tenable University", url: "https://www.tenable.com/education" },
          { name: "Qualys Training", url: "https://www.qualys.com/training/" },
          { name: "Microsoft Defender docs", url: "https://learn.microsoft.com/defender/" }
        ]
      },
      {
        name: "GRC/IAM",
        skills: "Okta, Entra ID, SailPoint, ISO 27001, COBIT, ISACA",
        resources: [
          { name: "Okta Training", url: "https://www.okta.com/training/" },
          { name: "Microsoft Entra docs", url: "https://learn.microsoft.com/entra/" },
          { name: "ISACA Certifications", url: "https://www.isaca.org/credentialing" }
        ]
      }
    ]
  },
  {
    id: "software-dev",
    name: "6. Software Development & Engineering",
    roles: ["Frontend", "Backend", "Full Stack", "Mobile", "API Developer", "Software Engineer"],
    groups: [
      {
        name: "Languages & frameworks",
        skills: "JavaScript/TypeScript, Python, Java, .NET, React, Node.js, Spring",
        resources: [
          { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
          { name: "Python Tutorial", url: "https://docs.python.org/3/tutorial/" },
          { name: "Microsoft .NET Learn", url: "https://learn.microsoft.com/dotnet/" },
          { name: "Spring Academy", url: "https://spring.academy/" }
        ]
      },
      {
        name: "Version control",
        skills: "Git, GitHub, GitLab, branching, pull requests",
        resources: [
          { name: "GitHub Skills", url: "https://skills.github.com/" },
          { name: "Git docs", url: "https://git-scm.com/doc" },
          { name: "GitLab Learn", url: "https://about.gitlab.com/learn/" }
        ]
      },
      {
        name: "APIs & testing",
        skills: "REST, GraphQL, Postman, Swagger/OpenAPI, unit testing",
        resources: [
          { name: "Postman Learning Center", url: "https://learning.postman.com/" },
          { name: "OpenAPI Specification", url: "https://spec.openapis.org/oas/latest.html" },
          { name: "GraphQL Learn", url: "https://graphql.org/learn/" }
        ]
      },
      {
        name: "Developer cloud basics",
        skills: "AWS/Azure/GCP developer services, serverless, containers",
        resources: [
          { name: "AWS Developer Center", url: "https://aws.amazon.com/developer/" },
          { name: "Microsoft Developer Learn", url: "https://learn.microsoft.com/" },
          { name: "Google Cloud Developers", url: "https://cloud.google.com/developers" }
        ]
      }
    ]
  },
  {
    id: "qa-testing",
    name: "7. QA, Testing & Quality Engineering",
    roles: ["Manual Tester", "QA Analyst", "Automation Tester", "QA Engineer", "SDET", "QA Lead"],
    groups: [
      {
        name: "Testing fundamentals",
        skills: "Test cases, test plans, defect lifecycle, regression, exploratory testing",
        resources: [
          { name: "ISTQB Org", url: "https://www.istqb.org/" },
          { name: "Ministry of Testing", url: "https://www.ministryoftesting.com/" }
        ]
      },
      {
        name: "Automation tools",
        skills: "Selenium, Playwright, Cypress, Appium",
        resources: [
          { name: "Selenium Docs", url: "https://www.selenium.dev/" },
          { name: "Playwright Docs", url: "https://playwright.dev/" },
          { name: "Cypress Learn", url: "https://learn.cypress.io/" }
        ]
      },
      {
        name: "API & performance testing",
        skills: "Postman, JMeter, k6, LoadRunner",
        resources: [
          { name: "Postman Learning", url: "https://learning.postman.com/" },
          { name: "Apache JMeter", url: "https://jmeter.apache.org/" },
          { name: "k6 docs", url: "https://grafana.com/docs/k6/latest/" }
        ]
      },
      {
        name: "CI/CD for QA",
        skills: "GitHub Actions, Jenkins, Azure DevOps",
        resources: [
          { name: "GitHub Actions", url: "https://docs.github.com/actions" },
          { name: "Jenkins Docs", url: "https://www.jenkins.io/doc/" }
        ]
      }
    ]
  },
  {
    id: "devops-sre",
    name: "8. DevOps, SRE & Platform Engineering",
    roles: ["DevOps Engineer", "SRE", "Platform Engineer", "Release Engineer", "Kubernetes Engineer"],
    groups: [
      {
        name: "CI/CD & source control",
        skills: "GitHub Actions, Jenkins, GitLab CI, Azure DevOps",
        resources: [
          { name: "GitHub Skills", url: "https://skills.github.com/" },
          { name: "Jenkins docs", url: "https://www.jenkins.io/doc/" },
          { name: "GitLab Learn", url: "https://about.gitlab.com/learn/" },
          { name: "Azure DevOps docs", url: "https://learn.microsoft.com/azure/devops/" }
        ]
      },
      {
        name: "Containers & orchestration",
        skills: "Docker, Kubernetes, Helm, OpenShift",
        resources: [
          { name: "Docker Docs", url: "https://docs.docker.com/" },
          { name: "Kubernetes Docs", url: "https://kubernetes.io/docs/" },
          { name: "Helm Docs", url: "https://helm.sh/docs/" },
          { name: "Red Hat OpenShift Learning", url: "https://www.redhat.com/en/services/training" }
        ]
      },
      {
        name: "IaC & configuration",
        skills: "Terraform, Ansible, Pulumi, CloudFormation",
        resources: [
          { name: "HashiCorp Developer", url: "https://developer.hashicorp.com/" },
          { name: "Red Hat Ansible", url: "https://www.redhat.com/en/technologies/management/ansible" },
          { name: "Pulumi Learn", url: "https://www.pulumi.com/learn/" }
        ]
      },
      {
        name: "Observability & reliability",
        skills: "Prometheus, Grafana, Datadog, SLO/SLI, incident response",
        resources: [
          { name: "Prometheus docs", url: "https://prometheus.io/docs/" },
          { name: "Grafana Labs Learn", url: "https://grafana.com/tutorials/" },
          { name: "Google SRE Books", url: "https://sre.google/books/" }
        ]
      }
    ]
  },
  {
    id: "data-analytics",
    name: "9. Data Analytics, BI, Reporting & MIS",
    roles: ["Data Analyst", "BI Analyst", "Reporting Analyst", "Power BI Developer", "Tableau Developer"],
    groups: [
      {
        name: "Spreadsheets & SQL",
        skills: "Advanced Excel, Google Sheets, SQL, database basics",
        resources: [
          { name: "Microsoft Excel training", url: "https://support.microsoft.com/excel" },
          { name: "Google Sheets training", url: "https://support.google.com/a/users" },
          { name: "SQLBolt Interactive", url: "https://sqlbolt.com/" }
        ]
      },
      {
        name: "BI tools",
        skills: "Power BI, Tableau, Looker Studio, Qlik",
        resources: [
          { name: "Power BI Learn", url: "https://learn.microsoft.com/power-bi/" },
          { name: "Tableau Learning", url: "https://www.tableau.com/learn" },
          { name: "Looker Studio Help", url: "https://support.google.com/looker-studio" }
        ]
      },
      {
        name: "Analytics foundations",
        skills: "Statistics basics, dashboards, KPIs, data storytelling",
        resources: [
          { name: "Google Data Analytics", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
          { name: "IBM SkillsBuild Data", url: "https://skillsbuild.org/" }
        ]
      },
      {
        name: "Data preparation",
        skills: "Power Query, SQL joins, ETL basics, data quality",
        resources: [
          { name: "Power Query docs", url: "https://learn.microsoft.com/power-query/" },
          { name: "Microsoft Fabric Learn", url: "https://learn.microsoft.com/fabric/" }
        ]
      }
    ]
  },
  {
    id: "data-science-ai",
    name: "10. Data Engineering, Data Science, AI & ML",
    roles: ["Data Engineer", "Data Scientist", "ML Engineer", "AI Engineer", "MLOps Engineer", "LLM Engineer"],
    groups: [
      {
        name: "Programming & notebooks",
        skills: "Python, R, Jupyter, pandas, NumPy, scikit-learn",
        resources: [
          { name: "Python docs", url: "https://docs.python.org/3/tutorial/" },
          { name: "Jupyter docs", url: "https://docs.jupyter.org/" },
          { name: "Scikit-Learn docs", url: "https://scikit-learn.org/" }
        ]
      },
      {
        name: "Data platforms",
        skills: "Databricks, Snowflake, BigQuery, Microsoft Fabric, Spark",
        resources: [
          { name: "Databricks Academy", url: "https://www.databricks.com/learn/training" },
          { name: "Snowflake University", url: "https://learn.snowflake.com/" },
          { name: "Google BigQuery docs", url: "https://cloud.google.com/bigquery/docs" },
          { name: "Apache Spark docs", url: "https://spark.apache.org/docs/latest/" }
        ]
      },
      {
        name: "ML/AI platforms",
        skills: "Azure AI, AWS AI/ML, Google Vertex AI, Hugging Face",
        resources: [
          { name: "Microsoft AI Learn", url: "https://learn.microsoft.com/ai/" },
          { name: "AWS Machine Learning", url: "https://aws.amazon.com/machine-learning/mlu/" },
          { name: "Google Vertex AI docs", url: "https://cloud.google.com/vertex-ai/docs" },
          { name: "Hugging Face Learn", url: "https://huggingface.co/learn" }
        ]
      },
      {
        name: "MLOps & governance",
        skills: "MLflow, model monitoring, responsible AI, AI risk",
        resources: [
          { name: "MLflow docs", url: "https://mlflow.org/docs/latest/" },
          { name: "Google Responsible AI", url: "https://ai.google/responsibility/" },
          { name: "NIST AI Risk Registry", url: "https://www.nist.gov/itl/ai-risk-management-framework" }
        ]
      }
    ]
  },
  {
    id: "database",
    name: "11. Database Administration & Database Development",
    roles: ["Junior DBA", "SQL DBA", "Oracle DBA", "MySQL/PostgreSQL DBA", "Database Developer"],
    groups: [
      {
        name: "Relational databases",
        skills: "SQL Server, Oracle Database, MySQL, PostgreSQL",
        resources: [
          { name: "Microsoft SQL docs", url: "https://learn.microsoft.com/sql/" },
          { name: "Oracle MyLearn", url: "https://mylearn.oracle.com/" },
          { name: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" }
        ]
      },
      {
        name: "NoSQL databases",
        skills: "MongoDB, Redis, Cassandra, DynamoDB",
        resources: [
          { name: "MongoDB University", url: "https://learn.mongodb.com/" },
          { name: "Redis University", url: "https://redis.io/learn/" }
        ]
      },
      {
        name: "DB operations",
        skills: "Backup/restore, indexing, performance tuning, high availability",
        resources: [
          { name: "MS SQL Performance", url: "https://learn.microsoft.com/sql/relational-databases/performance/" },
          { name: "Oracle Database docs", url: "https://docs.oracle.com/en/database/" }
        ]
      },
      {
        name: "Cloud databases",
        skills: "Azure SQL, Amazon RDS, Google Cloud SQL, Snowflake",
        resources: [
          { name: "AWS Database Training", url: "https://aws.amazon.com/training/learn-about/databases/" },
          { name: "Azure Database Learning", url: "https://learn.microsoft.com/azure/azure-sql/" }
        ]
      }
    ]
  },
  {
    id: "project-delivery",
    name: "12. Product, Project, Program, Scrum & Delivery",
    roles: ["Project Coordinator", "Scrum Master", "Product Manager", "Technical PM", "Program Manager", "Delivery Manager"],
    groups: [
      {
        name: "Project management",
        skills: "Jira, Microsoft Project, Asana, Trello, Monday.com",
        resources: [
          { name: "Atlassian University", url: "https://university.atlassian.com/" },
          { name: "Asana Academy", url: "https://academy.asana.com/" }
        ]
      },
      {
        name: "Agile & Scrum",
        skills: "Scrum, Kanban, SAFe, sprint planning, retrospectives",
        resources: [
          { name: "Scrum.org", url: "https://www.scrum.org/resources" },
          { name: "Scrum Guide", url: "https://scrumguides.org/" }
        ]
      },
      {
        name: "Product tools",
        skills: "Productboard, Aha!, Figma, analytics, roadmap tools",
        resources: [
          { name: "Productboard Academy", url: "https://academy.productboard.com/" },
          { name: "Figma Learn", url: "https://help.figma.com/" }
        ]
      },
      {
        name: "PM standards",
        skills: "PMI, PRINCE2, risk, stakeholder management",
        resources: [
          { name: "PMI Certifications", url: "https://www.pmi.org/certifications" },
          { name: "PeopleCert PRINCE2", url: "https://www.peoplecert.org/" }
        ]
      }
    ]
  },
  {
    id: "universal-foundations",
    name: "🔑 Universal IT Tools & Core Foundations",
    roles: ["All Roles (Core Essential Knowledge for Every Professional)"],
    groups: [
      {
        name: "Operating Systems & Platforms",
        skills: "Windows 10/11, Windows Server basics, macOS, Linux basics",
        resources: [
          { name: "Microsoft Learn Windows", url: "https://learn.microsoft.com/windows/" },
          { name: "Linux Foundation Training", url: "https://training.linuxfoundation.org/" },
          { name: "Red Hat Training", url: "https://www.redhat.com/en/services/training" }
        ]
      },
      {
        name: "Identity & Access Management",
        skills: "Active Directory, Entra ID, IAM, MFA, SSO, RBAC",
        resources: [
          { name: "Microsoft Entra docs", url: "https://learn.microsoft.com/entra/" },
          { name: "AWS IAM docs", url: "https://docs.aws.amazon.com/IAM/" },
          { name: "Google Cloud IAM docs", url: "https://cloud.google.com/iam/docs" }
        ]
      },
      {
        name: "Networking Fundamentals",
        skills: "DNS, DHCP, TCP/IP, VPN, Wi-Fi, firewalls, load balancers",
        resources: [
          { name: "Cisco Networking Academy", url: "https://www.netacad.com/" },
          { name: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/" },
          { name: "Microsoft networking fundamentals", url: "https://learn.microsoft.com/training/" }
        ]
      },
      {
        name: "Ticketing & ITSM Platforms",
        skills: "ServiceNow, Jira Service Management, Zendesk, incident/change/problem management",
        resources: [
          { name: "ServiceNow Now Learning", url: "https://nowlearning.servicenow.com/" },
          { name: "Atlassian University", url: "https://university.atlassian.com/" },
          { name: "Zendesk Training", url: "https://training.zendesk.com/" },
          { name: "ITIL PeopleCert", url: "https://www.peoplecert.org/Frameworks-Professionals/ITIL-framework" }
        ]
      },
      {
        name: "Collaboration & Documentation",
        skills: "Microsoft 365, Google Workspace, Teams, Slack, Zoom, SOPs, KB articles, runbooks",
        resources: [
          { name: "Microsoft 365 Training", url: "https://support.microsoft.com/training" },
          { name: "Google Workspace Learning Center", url: "https://support.google.com/a/users" },
          { name: "Google Technical Writing", url: "https://developers.google.com/tech-writing" }
        ]
      },
      {
        name: "Cloud & Security Basics",
        skills: "AWS, Azure, Google Cloud basics, computed storage, phishing, least privilege, logging",
        resources: [
          { name: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
          { name: "Microsoft Learn Azure", url: "https://learn.microsoft.com/azure/" },
          { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" }
        ]
      },
      {
        name: "AI Productivity & Workflows",
        skills: "Prompting, summarization, spreadsheet/formula help, code explanation, safe AI use",
        resources: [
          { name: "Microsoft AI learning", url: "https://learn.microsoft.com/ai/" },
          { name: "Google AI for Developers", url: "https://ai.google.dev/" }
        ]
      }
    ]
  }
];

export const RECOMMENDED_BOOKS: RecommendedBook[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann (O'Reilly Media)",
    bestFor: "Backend Developers, Distributed Systems Engineers, and Database Administrators",
    summary: "The industry-leading masterclass on data systems, storage engine internals, replication, partitioning, transactions, and distributed consensus algorithms.",
    url: "https://www.oreilly.com/library/view/designing-data-intensive/9781491903063/",
    coverAccent: "border-yellow-500 shadow-[4px_4px_0px_#f59e0b]",
    category: "Dev"
  },
  {
    title: "Kubernetes Up & Running: Dive into the Future of Infrastructure",
    author: "Brendan Burns, Joe Beda, Kelsey Hightower & Lachlan Evenson",
    bestFor: "DevOps Engineers, Cloud Architects, and Platform Developers",
    summary: "Practical, hands-on guide written by the original creators and maintainers of Kubernetes. Explores pods, deployments, service discovery, ingress routing, and multi-cluster patterns.",
    url: "https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/",
    coverAccent: "border-blue-500 shadow-[4px_4px_0px_#3b82f6]",
    category: "DevOps"
  },
  {
    title: "Staff Engineer: Leadership beyond the management track",
    author: "Will Larson",
    bestFor: "Senior Engineers, Tech Leads, and Aspiring Principal Architects",
    summary: "The definitive guide on navigating the individual contributor career path at the highest levels. Explores technical leadership, sponsorship, technical vision, and strategic impact.",
    url: "https://staffeng.com/book/",
    coverAccent: "border-purple-500 shadow-[4px_4px_0px_#a855f7]",
    category: "CTO"
  },
  {
    title: "Building Green Software: A Guide to Reducing Carbon Emissions in Software",
    author: "Anne Currie, Sarah Hsu & Sara Bergman (O'Reilly Media)",
    bestFor: "Software Engineers, Sustainable IT Leads, and Engineering Architects",
    summary: "The definitive guide to carbon-efficient programming and architecture. Explores how to measure code power footprint, optimize cloud host deployments, implement temporal & spatial shifting, and apply the Green Software Foundation principles to lower software carbon footprint.",
    url: "https://www.oreilly.com/library/view/building-green-software/9781098150617/",
    coverAccent: "border-green-500 shadow-[4px_4px_0px_#22c55e]",
    category: "Academic"
  },
  {
    title: "Harnessing Green IT, Sustainable Software & Circular Economy",
    author: "San Murugesan / Green Software Foundation / Tom Greenwood / CPCB",
    bestFor: "Sustainable IT Architects, Infrastructure Directors, and Cloud FinOps Leads",
    summary: "Explores green data centers, carbon-aware runtime cloud scaling, sustainable web coding to reduce network byte payload sizes, electronic waste recovery laws (CPCB rules), and circular economy paradigms designed to mitigate IT's carbon footprint.",
    url: "https://greensoftware.foundation/",
    coverAccent: "border-green-600 shadow-[4px_4px_0px_#16a34a]",
    category: "CTO"
  },
  {
    title: "Introduction to Computer Science & Coding Foundations",
    author: "OpenStax (Rice University) / E. Balagurusamy / Yashavant Kanetkar / NCERT",
    bestFor: "Beginners, School-to-College bridge, Indian CBSE and Engineering CS foundations",
    summary: "Combines OpenStax Open Textbook with classic Indian academic pathways ('Programming in ANSI C', 'Let Us C', 'Programming with Java') and NCERT CS Class XI-XII resources. Establishes robust conceptual foundations in variables, control flow, memory mapping, OOP, and data structures.",
    url: "https://openstax.org/subjects/computer-science",
    coverAccent: "border-indigo-500 shadow-[4px_4px_0px_#6366f1]",
    category: "Academic"
  },
  {
    title: "CompTIA A+ Study Guide, Microsoft 365 & Windows Internals",
    author: "Quentin Docter (Sybex) / Mark Russinovich (Microsoft Press) / Microsoft Learn",
    bestFor: "IT Support Specialists, Advanced Windows Troubleshooters, and Help Desk Analysts",
    summary: "Integrates Quentin Docter's complete A+ certification core guidelines with Mark Russinovich's Windows Internals Part 1 & 2. Teaches advanced diagnostics, processes, registry configurations, Intune endpoint administration, and enterprise Microsoft 365 workflow solutions.",
    url: "https://learn.microsoft.com/training/",
    coverAccent: "border-blue-500 shadow-[4px_4px_0px_#3b82f6]",
    category: "Operations"
  },
  {
    title: "Computer Networking: A Top-Down Approach & Data Communications",
    author: "James Kurose & Keith Ross / Achyut S. Godbole / Atul Kahate / Cisco Press",
    bestFor: "Network Engineers, NOC Specialists, Security Analysts, and CCNA/CCNP candidates",
    summary: "Synthesizes Kurose's famous Top-Down protocol-oriented methodology with Achyut Godbole's data communications standard and Cisco Networking Academy. Provides practical masteries in routing protocols, subnets mapping, TCP/IP streams, and Wireshark practical packet analysis.",
    url: "https://www.netacad.com/",
    coverAccent: "border-emerald-500 shadow-[4px_4px_0px_#10b981]",
    category: "DevOps"
  },
  {
    title: "The Linux Command Line & UNIX/Linux System Administration",
    author: "William Shotts / Evi Nemeth / Brian Ward (No Starch Press)",
    bestFor: "Systems Administrators, DevOps Engineers, and RHCSA/RHCE certifications",
    summary: "Comprehensive guide to shell commands, Bash script automation, kernel interfaces, filesystem security permissions, and daemon configurations. Combined with Evi Nemeth's Handbook for running enterprise-hardened Linux networks safely.",
    url: "https://sourceforge.net/projects/linuxcommand/",
    coverAccent: "border-amber-500 shadow-[4px_4px_0px_#f59e0b]",
    category: "DevOps"
  },
  {
    title: "AWS, Azure, GCP Certified Solutions Guides & Cloud Native Patterns",
    author: "Amazon Web Services / Microsoft Learn / Cornelia Davis (Manning)",
    bestFor: "Cloud Solutions Architects, Cloud Operations Engineers, and FinOps Specialists",
    summary: "An exceptional aggregate of official guides for AZ-900, AZ-104, AWS SAA, and GCP ACE. Integrates Cornelia Davis's Cloud Native Patterns to teach designing highly resilient, self-healing, stateless microservices suitable for auto-scaling cloud topologies.",
    url: "https://learn.microsoft.com/azure/",
    coverAccent: "border-cyan-500 shadow-[4px_4px_0px_#06b6d4]",
    category: "DevOps"
  },
  {
    title: "Cryptography & Network Security with Indian Cyber Law (DPDP Act 2023)",
    author: "Atul Kahate / Nina Godbole & Sunit Belapure / MeitY",
    bestFor: "Cybersecurity Analysts, GRC Managers, and SOC Tier-1 Security Engineers",
    summary: "A unique synthesis of cryptography, network protocols, digital forensics, and threat modeling, combined with core legal learning on Indian cyber legislation including the landmark Digital Personal Data Protection (DPDP) Act 2023 and IT Act 2000 mandates.",
    url: "https://www.meity.gov.in/",
    coverAccent: "border-red-500 shadow-[4px_4px_0px_#ef4444]",
    category: "Security"
  },
  {
    title: "Clean Code & Language Mastery (Java, Python, JS, C++)",
    author: "Robert C. Martin / Allen B. Downey / Reema Thareja / Kyle Simpson",
    bestFor: "Software Developers, QA Testers, and API Designers",
    summary: "Pairs Robert Martin's timeless clean code principles with language-specific deep dives: Reema Thareja's Python and Data Structures, Balagurusamy's OOP with C++, and Kyle Simpson's JS foundations. Covers refactoring, unit tests, and writing zero-smell algorithms.",
    url: "https://github.com/getify/You-Dont-Know-JS",
    coverAccent: "border-purple-500 shadow-[4px_4px_0px_#a855f7]",
    category: "Dev"
  },
  {
    title: "C++ Primer & Object-Oriented Programming in C++",
    author: "Stanley B. Lippman, Josée Lajoie & Barbara E. Moo / E. Balagurusamy / Yashavant Kanetkar",
    bestFor: "C++ Developers, Systems Engineers, Game Programmers, and CS Engineering Students",
    summary: "Comprehensive reference and tutorial for modern C++. Explores pointers, dynamic memory management, STL containers, OOP principles, templates, RAII, and C++11/14/17 standard libraries.",
    url: "https://isocpp.org/",
    coverAccent: "border-blue-600 shadow-[4px_4px_0px_#2563eb]",
    category: "Dev"
  },
  {
    title: "Learning SQL, SQLBolt, & Fundamentals of Data Engineering",
    author: "Alan Beaulieu / Joe Reis & Matt Housley (O'Reilly)",
    bestFor: "Database Administrators, Analytics Developers, and Data Engineers",
    summary: "Step-by-step SQL syntax and normalization practice (SQLBolt/MySQL) combined with joe Reis's flagship Data Engineering lifecycle. Teaches storage architecture, schema designs, stream processing ingestions, and Snowflake Data Lakehouse design trade-offs.",
    url: "https://sqlbolt.com/",
    coverAccent: "border-indigo-400 shadow-[4px_4px_0px_#818cf8]",
    category: "Data"
  },
  {
    title: "Fundamentals of Data Visualization & Professional BI (PL-300)",
    author: "Claus O. Wilke (O'Reilly) / Microsoft Learn / Salesforce",
    bestFor: "Data Analysts, BI Developers, Excel power-users, and PL-300 Candidates",
    summary: "Highlights Claus Wilke's conceptual blueprint for aesthetic, high-density data visualizations. Integrates Microsoft official learning paths for PL-300 Power BI Data Analyst certificate labs, DAX formulas, and Tableau Enterprise Blueprint reports.",
    url: "https://clauswilke.com/dataviz/",
    coverAccent: "border-pink-500 shadow-[4px_4px_0px_#ec4899]",
    category: "Data"
  },
  {
    title: "Mathematics for ML, Artificial Intelligence: A Modern Approach",
    author: "Gilbert Strang / Marc Peter Deisenroth / Stuart Russell & Peter Norvig / IIT Madras",
    bestFor: "AI Engineers, Machine Learning Researchers, and Data Scientists",
    summary: "Links MIT Profesor Gilbert Strang's linear algebra lectures with Deisenroth's ML mathematical framework and Russel & Norvig's definitive AI textbook. Supported by IIT Madras NPTEL data science tracks, covering calculus optimization, model trees, neural backprop, and AI ethics rules.",
    url: "https://mml-book.github.io/",
    coverAccent: "border-rose-400 shadow-[4px_4px_0px_#f43f5e]",
    category: "Data"
  },
  {
    title: "The Google SRE Playbook, Kubernetes in Action & Terraform",
    author: "Google SRE Team / Marko Luksa (Manning) / HashiCorp",
    bestFor: "Site Reliability Engineers, Platform Operations, and DevOps Practitioners",
    summary: "Combines Google's official SRE playbook detailing SLIs/SLOs, monitoring alerts, and incident retro forms with Marko Luksa's classic Kubernetes guide and HashiCorp's official declarative Infrastructure as Code (IaC) architectures.",
    url: "https://sre.google/books/",
    coverAccent: "border-teal-500 shadow-[4px_4px_0px_#0d9488]",
    category: "DevOps"
  },
  {
    title: "Foundations of Software Testing & QA Test Automation",
    author: "Rex Black / Dorothy Graham (ISTQB) / Lisa Crispin (Agile Testing)",
    bestFor: "QA Engineers, Manual Testers, SDETs, and ISTQB certification candidates",
    summary: "Comprehensive guide to manual and automated test strategies. Integrates ISTQB foundational testing syllabi, standard bug lifecycles, and agile defect management with hands-on automation frameworks in Selenium and Playwright.",
    url: "https://www.istqb.org/",
    coverAccent: "border-amber-600 shadow-[4px_4px_0px_#d97706]",
    category: "Dev"
  },
  {
    title: "ITIL 4 Foundation & ServiceNow Platform Governance",
    author: "PeopleCert / Axelos / ServiceNow Developer Training Teams",
    bestFor: "Service Desk Admins, ServiceNow Developers, and Service Delivery Managers",
    summary: "Maps out the ITIL 4 service value chain, SLA metrics, incident/change flow configurations, and CMDB assets. Includes practical exercises from ServiceNow developer guides to design custom workflows inside personal developer instances.",
    url: "https://developer.servicenow.com/",
    coverAccent: "border-emerald-600 shadow-[4px_4px_0px_#059669]",
    category: "Operations"
  },
  {
    title: "The Lean Startup, Zero to One, & The Manager's Path",
    author: "Eric Ries / Peter Thiel / Camille Fournier / Startup India",
    bestFor: "Tech Team Leads, Program Managers, Product Owners, and Startup Founders",
    summary: "Curriculum for leadership and business agility. Integrates Eric Ries's MVP methodology, Peter Thiel's startup rules, and Camille Fournier's roadmap from engineer to CTO. Supplemented by Startup India program details for technology commercialization.",
    url: "https://www.startupindia.gov.in/",
    coverAccent: "border-yellow-500 shadow-[4px_4px_0px_#eab308]",
    category: "CEO"
  },
  {
    title: "TOGAF Standard, COBIT 2019, & Systems Thinking",
    author: "The Open Group / ISACA / Donella Meadows (Systems Thinking)",
    bestFor: "Enterprise Architects, CIOs, IT Auditors, and IT Security Directors",
    summary: "A stellar curriculum detailing TOGAF principles for aligning commercial goals with software architectures, COBIT framework guidelines for enterprise IT risk and compliance, and Donella Meadows' core Systems Thinking models.",
    url: "https://www.isaca.org/resources/cobit",
    coverAccent: "border-violet-500 shadow-[4px_4px_0px_#8b5cf6]",
    category: "CTO"
  },
  {
    title: "High Output Management & Measure What Matters",
    author: "Andrew S. Grove / John Doerr",
    bestFor: "Chief Executive Officers, Chief Operating Officers, and General Managers",
    summary: "The definitive playbook for tech leaders. Standardizes OKRs (Objectives and Key Results), team-working leverage, and alignment of thousands of personnel, guiding tech enterprises from startup status to hyper-scale status.",
    url: "https://www.goodreads.com/book/show/27074478-measure-what-matters",
    coverAccent: "border-slate-800 shadow-[4px_4px_0px_#1e293b]",
    category: "CEO"
  },
  {
    title: "Work Rules! Insights from Inside Google That Will Transform How You Live and Lead",
    author: "Laszlo Bock (CHRO / Google VP of People Operations)",
    bestFor: "CHROs, Principal Recruiters, HR Generalists, and Staffing Directors",
    summary: "Reinvents people operations, automated tech grading metrics, recruiting biases, peer-driven promotions, and high-performance reward incentives. Provides deep blueprints for designing interview questions and rubrics for hiring.",
    url: "https://www.laszlobock.com/",
    coverAccent: "border-teal-400 shadow-[4px_4px_0px_#2dd4bf]",
    category: "HR"
  },
  {
    title: "Cracking the Coding Interview & Tech Resume Roadmap",
    author: "Gayle Laakmann McDowell / CareerCup Team",
    bestFor: "College Graduates, Placements, Coding Aspirants, and Staffing Recruiters",
    summary: "The absolute standard for tech recruitment preparation. Details 189 questions on big-O notation, algorithm layout, trees, graphs, and system designs, alongside custom tips for crafting resumes and clearing hard panel screenings.",
    url: "http://www.crackingthecodinginterview.com/",
    coverAccent: "border-emerald-500 shadow-[4px_4px_0px_#10b981]",
    category: "HR"
  },
  {
    title: "Inspired: How to Create Tech Products Customers Love",
    author: "Marty Cagan (Silicon Valley Product Group)",
    bestFor: "Chief Product Officers, Product Owners, UI/UX Managers, and Systems designers",
    summary: "Unpacks the dynamic product cycle. Guides teams through building a continuous discovery workflow, validating engineering feasibility, assessing user usability friction, and mapping user experience layouts for mobile and web platforms.",
    url: "https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/",
    coverAccent: "border-purple-600 shadow-[4px_4px_0px_#7c3aed]",
    category: "Product"
  },
  {
    title: "Crossing the Chasm & Sales Engineering Essentials",
    author: "Geoffrey A. Moore / John Care (Artech House)",
    bestFor: "Chief Marketing Officers, Solutions Engineers, and Technology Sales Executives",
    summary: "The premier handbook for introducing state-of-the-art tech platforms to traditional enterprise markets. Unfolds how to articulate SaaS infrastructure architectures, handle RFPs, demonstrate custom developer tools, and deliver client value.",
    url: "https://www.goodreads.com/book/show/61329.Crossing_the_Chasm",
    coverAccent: "border-amber-700 shadow-[4px_4px_0px_#b45309]",
    category: "Marketing"
  },
  {
    title: "GATE CSE Masterclass: Distributed Algorithms & Automata Theory",
    author: "Thomas H. Cormen (CLRS) / Peter Galvin (Operating Systems)",
    bestFor: "B.Tech/BCA College Graduates, National Gate Exam Aspirants, and Degree Seekers",
    summary: "A rigorous textbook syllabus covering advanced data structures, discrete mathematics, compiler designs, Turing machines, and CPU thread mapping. Highly recommended for succeeding in national technical competitive exams and college honors degrees.",
    url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
    coverAccent: "border-pink-600 shadow-[4px_4px_0px_#db2777]",
    category: "Academic"
  },
  {
    title: "Sumita Arora CBSE Computer Science & AP CS Exam Guide",
    author: "Sumita Arora (Dhanpat Rai) / Barron's Academic",
    bestFor: "High School Students, CBSE Standards XI-XII, and AP Computer Science candidates",
    summary: "Tailored to academic examinations, teaching object-oriented logic, standard structures, database links (SQL with Python), and basic networking architectures. Simplifies syntax with robust test papers, practice tests, and exam layouts.",
    url: "https://www.cbse.gov.in/",
    coverAccent: "border-blue-600 shadow-[4px_4px_0px_#2563eb]",
    category: "Academic"
  }
];

const matchesQuery = (text: string, query: string): boolean => {
  if (!query || !query.trim()) return true;
  if (!text) return false;
  const lowerText = text.toLowerCase();
  const rawQuery = query.trim().toLowerCase();

  // Direct substring match first
  if (lowerText.includes(rawQuery)) {
    return true;
  }

  // Handle C++ alias matching
  const isCpp = rawQuery === 'c++' || rawQuery === 'cpp' || rawQuery === 'cplusplus' || rawQuery === 'c plus plus';
  if (isCpp) {
    if (lowerText.includes('c++') || lowerText.includes('cpp') || lowerText.includes('cplusplus')) {
      return true;
    }
  }

  // Tokenize query safely (preserving special tokens like c++)
  const queryTokens = rawQuery
    .replace(/\+/g, 'plus')
    .split(/[\s,/\-]+/)
    .filter(t => t.length >= 2);
    
  if (queryTokens.length === 0) return false;

  const stopwords = ['and', 'for', 'the', 'with', 'basics', 'administration', 'services', 'expert', 'support', 'management', 'development', 'certified', 'associate'];
  const significantTokens = queryTokens.filter(t => !stopwords.includes(t));

  if (significantTokens.length > 0) {
    return significantTokens.some(token => {
      const normalizedToken = token === 'cplusplus' ? 'c++' : token;
      return lowerText.includes(normalizedToken) || lowerText.includes(token);
    });
  }

  return queryTokens.some(token => {
    const normalizedToken = token === 'cplusplus' ? 'c++' : token;
    return lowerText.includes(normalizedToken) || lowerText.includes(token);
  });
};

interface LibrariesDashboardProps {
  theme?: string;
  isHighlighted?: boolean;
  bookmarks?: any[];
  toggleBookmark?: (item: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  activeTab?: 'youtubeTeachers' | 'hackathons' | 'channels' | 'tools-skills' | 'certs' | 'bookshelf';
  setActiveTab?: (tab: 'youtubeTeachers' | 'hackathons' | 'channels' | 'tools-skills' | 'certs' | 'bookshelf') => void;
  query?: string;
  setQuery?: (q: string) => void;
  selectedRoleFamily?: string;
  setSelectedRoleFamily?: (f: string) => void;

  // Youtube & Hackathon states
  youtubeSearchQuery?: string;
  setYoutubeSearchQuery?: (q: string) => void;
  youtubeCategoryId?: string | null;
  setSelectedCategoryId?: (id: string | null) => void;
  highlightedYoutubeCategories?: string[];
  setHighlightedYoutubeCategories?: (cats: string[]) => void;
  hackathonsSelectedItemId?: string | null;
  setHackathonsSelectedItemId?: (id: string | null) => void;
  hackathonsSearchQuery?: string;
  setHackathonsSearchQuery?: (q: string) => void;
  tipIndex?: number;
  globalActiveTab?: string;
}

export default function LibrariesDashboard({
  theme = 'dark',
  isHighlighted = false,
  bookmarks = [],
  toggleBookmark,
  isBookmarked,
  activeTab: activeTabProp,
  setActiveTab: setActiveTabProp,
  query: queryProp,
  setQuery: setQueryProp,
  selectedRoleFamily: selectedRoleFamilyProp,
  setSelectedRoleFamily: setSelectedRoleFamilyProp,

  youtubeSearchQuery,
  setYoutubeSearchQuery,
  youtubeCategoryId,
  setSelectedCategoryId,
  highlightedYoutubeCategories,
  setHighlightedYoutubeCategories,
  hackathonsSelectedItemId,
  setHackathonsSelectedItemId,
  hackathonsSearchQuery,
  setHackathonsSearchQuery,
  tipIndex = 0,
  globalActiveTab
}: LibrariesDashboardProps) {
  const isLight = theme === 'light';
  const [localActiveTab, setLocalActiveTab] = useState<'youtubeTeachers' | 'hackathons' | 'channels' | 'tools-skills' | 'certs' | 'bookshelf'>('hackathons');
  const activeTab = activeTabProp !== undefined ? activeTabProp : localActiveTab;
  const setActiveTab = setActiveTabProp || setLocalActiveTab;

  const [localQuery, setLocalQuery] = useState<string>('');
  const query = queryProp !== undefined ? queryProp : localQuery;
  const setQuery = setQueryProp || setLocalQuery;

  const [localSelectedRoleFamily, setLocalSelectedRoleFamily] = useState<string>('green-computing');
  const selectedRoleFamily = selectedRoleFamilyProp !== undefined ? selectedRoleFamilyProp : localSelectedRoleFamily;
  const setSelectedRoleFamily = setSelectedRoleFamilyProp || setLocalSelectedRoleFamily;

  // Fallbacks for Youtube & Hackathons
  const [localYoutubeSearchQuery, setLocalYoutubeSearchQuery] = useState('');
  const ytSearchQuery = youtubeSearchQuery !== undefined ? youtubeSearchQuery : localYoutubeSearchQuery;
  const setYtSearchQuery = setYoutubeSearchQuery || setLocalYoutubeSearchQuery;

  const [localYoutubeCategoryId, setLocalYoutubeCategoryId] = useState<string | null>('green-computing');
  const ytCategoryId = youtubeCategoryId !== undefined ? youtubeCategoryId : localYoutubeCategoryId;
  const setYtCategoryId = setSelectedCategoryId || setLocalYoutubeCategoryId;

  const [localHighlightedYoutubeCategories, setLocalHighlightedYoutubeCategories] = useState<string[]>([]);
  const highlightedCats = highlightedYoutubeCategories !== undefined ? highlightedYoutubeCategories : localHighlightedYoutubeCategories;
  const setHighlightedCats = setHighlightedYoutubeCategories || setLocalHighlightedYoutubeCategories;

  const [localHackathonsSelectedItemId, setLocalHackathonsSelectedItemId] = useState<string | null>(null);
  const hSelectedItemId = hackathonsSelectedItemId !== undefined ? hackathonsSelectedItemId : localHackathonsSelectedItemId;
  const setHSelectedItemId = setHackathonsSelectedItemId || setLocalHackathonsSelectedItemId;

  const [localHackathonsSearchQuery, setLocalHackathonsSearchQuery] = useState('');
  const hSearchQuery = hackathonsSearchQuery !== undefined ? hackathonsSearchQuery : localHackathonsSearchQuery;
  const setHSearchQuery = setHackathonsSearchQuery || setLocalHackathonsSearchQuery;

  const [auditFilter, setAuditFilter] = useState<'all' | 'covered' | 'gap'>('all');
  const [auditQuery, setAuditQuery] = useState<string>('');
  const [isAuditPanelExpanded, setIsAuditPanelExpanded] = useState<boolean>(false);
  const [selectedBookDept, setSelectedBookDept] = useState<string>('All');
  const [skillDomainFilter, setSkillDomainFilter] = useState<string>('All');
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>('All');
  const [skillPage, setSkillPage] = useState<number>(1);
  const skillPageSize = 12;

  const fullAuditList = React.useMemo(() => auditPrerequisites(), []);

  // Synchronize active family if query matches another family
  React.useEffect(() => {
    if (query) {
      const match = ROLE_FAMILY_MAPS.find(rf =>
        matchesQuery(rf.name, query) ||
        rf.roles.some(r => matchesQuery(r, query)) ||
        rf.groups.some(g =>
          matchesQuery(g.name, query) ||
          matchesQuery(g.skills, query) ||
          g.resources.some(res => matchesQuery(res.name, query))
        )
      );
      if (match && match.id !== selectedRoleFamily) {
        setSelectedRoleFamily(match.id);
      }
    }
  }, [query, selectedRoleFamily, setSelectedRoleFamily]);

  const [certifications, setCertifications] = useState<CertLibraryItem[]>(() => {
    const defaultCerts = CERTIFICATIONS_LIBRARY;
    try {
      const stored = localStorage.getItem('pathfinder_synced_certifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = [...parsed];
          defaultCerts.forEach(c => {
            if (!merged.some(item => item.id === c.id)) {
              merged.push(c);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return defaultCerts;
  });

  // Find matches for redirection target (Disabled to ensure search results are listed first)
  const redirectionMatch = React.useMemo(() => {
    return null;
  }, []);

  const [books, setBooks] = useState<RecommendedBook[]>(() => {
    const defaultBooks = RECOMMENDED_BOOKS;
    try {
      const stored = localStorage.getItem('pathfinder_synced_books');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = [...parsed];
          defaultBooks.forEach(b => {
            if (!merged.some(item => item.title.toLowerCase() === b.title.toLowerCase())) {
              merged.push(b);
            }
          });
          return merged;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return defaultBooks;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [syncCount, setSyncCount] = useState<number>(0);
  const [newCerts, setNewCerts] = useState<string[]>([]);
  const [newBooks, setNewBooks] = useState<string[]>([]);

  const [isHackathonsSyncing, setIsHackathonsSyncing] = useState<boolean>(false);
  const [hackathonsSyncMessage, setHackathonsSyncMessage] = useState<string>('');
  const [hackathonsSyncTrigger, setHackathonsSyncTrigger] = useState<number>(0);

  const handleUnifiedResync = () => {
    if (activeTab === 'hackathons') {
      setHackathonsSyncTrigger(prev => prev + 1);
    } else if (activeTab !== 'youtubeTeachers') {
      handleLiveSearchSync();
    }
  };

  const debouncedQuery = useDebounce(query, 180);

  const getCrossTabSearchResults = React.useMemo(() => {
    return getCrossTabSummary(debouncedQuery);
  }, [debouncedQuery]);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllCerts, setShowAllCerts] = useState<boolean>(false);
  const [showAllChannels, setShowAllChannels] = useState<boolean>(false);
  const [showAllBooks, setShowAllBooks] = useState<boolean>(false);
  const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  const dynamicDomains = React.useMemo(() => {
    const domainCounts = new Map<string, number>();
    importedSkills.forEach((sk: any) => {
      if (sk && sk.domain) {
        domainCounts.set(sk.domain, (domainCounts.get(sk.domain) || 0) + 1);
      }
    });
    return Array.from(domainCounts.entries())
      .map(([name, skillCount]) => ({ name, skillCount }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const dynamicTypes = React.useMemo(() => {
    const typeSet = new Set<string>();
    importedSkills.forEach((sk: any) => {
      if (sk && sk.type) {
        typeSet.add(sk.type);
      }
    });
    return Array.from(typeSet).sort();
  }, []);

  const [certPage, setCertPage] = useState<number>(1);
  const [bookPage, setBookPage] = useState<number>(1);
  const certPageSize = 6;
  const bookPageSize = 6;

  React.useEffect(() => {
    setCertPage(1);
  }, [query, selectedRoleFamily]);

  React.useEffect(() => {
    setBookPage(1);
  }, [selectedBookDept, query]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    // Preload server-cached certifications and books permanently synced
    const preloadServerCache = async () => {
      try {
        const res = await fetch('/api/resources/get-cached-resources');
        if (res.ok) {
          const data = await res.json();
          if (data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0) {
            setCertifications(prev => {
              const merged = [...data.certifications];
              CERTIFICATIONS_LIBRARY.forEach(c => {
                if (!merged.some(item => item.id === c.id)) {
                  merged.push(c);
                }
              });
              try {
                localStorage.setItem('pathfinder_synced_certifications', JSON.stringify(merged));
              } catch (e) {
                console.error(e);
              }
              return merged;
            });
          }
          if (data.books && Array.isArray(data.books) && data.books.length > 0) {
            setBooks(prev => {
              const merged = [...data.books];
              RECOMMENDED_BOOKS.forEach(b => {
                if (!merged.some(item => item.title.toLowerCase() === b.title.toLowerCase())) {
                  merged.push(b);
                }
              });
              try {
                localStorage.setItem('pathfinder_synced_books', JSON.stringify(merged));
              } catch (e) {
                console.error(e);
              }
              return merged;
            });
          }
        }
      } catch (err) {
        console.warn("Could not load cached resources from server:", err);
      }
    };

    preloadServerCache();

    // Dynamic synchronization from other tabs / sessions
    try {
      const storedCerts = localStorage.getItem('pathfinder_synced_certifications');
      if (storedCerts) {
        const parsed = JSON.parse(storedCerts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCertifications(prev => {
            const merged = [...parsed];
            CERTIFICATIONS_LIBRARY.forEach(c => {
              if (!merged.some(item => item.id === c.id)) {
                merged.push(c);
              }
            });
            return merged;
          });
        }
      }

      const storedBooks = localStorage.getItem('pathfinder_synced_books');
      if (storedBooks) {
        const parsed = JSON.parse(storedBooks);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBooks(prev => {
            const merged = [...parsed];
            RECOMMENDED_BOOKS.forEach(b => {
              if (!merged.some(item => item.title.toLowerCase() === b.title.toLowerCase())) {
                merged.push(b);
              }
            });
            return merged;
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [globalActiveTab, activeTabProp]);

  const handleLiveSearchSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatus('Spinning up Google Search Grounding Engine...');
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSyncStatus('Searching modern web credential databases (AWS, Azure, CompTIA)...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncStatus('Verifying 2026/2027 latest exam fees & newly introduced modules...');
      
      const res = await fetch('/api/resources/update-search-data');
      if (!res.ok) throw new Error('Failed to query google search grounded api endpoint');
      
      const data = await res.json();
      setSyncStatus('Analyzing returned specifications & auditing schema compatibility...');
      await new Promise(resolve => setTimeout(resolve, 800));

      let newlyAddedCertsCount = 0;
      let newlyAddedBooksCount = 0;
      const newlyAddedCertIdsList: string[] = [];
      const newlyAddedBookTitlesList: string[] = [];

      if (data.certifications && data.certifications.length > 0) {
        const existingIds = new Set(certifications.map(c => c.id));
        data.certifications.forEach((c: any) => {
          if (!existingIds.has(c.id)) {
            newlyAddedCertsCount++;
            newlyAddedCertIdsList.push(c.id);
          }
        });

        setCertifications(prev => {
          const merged = [...prev];
          data.certifications.forEach((newCert: any) => {
            const idx = merged.findIndex(c => c.id === newCert.id);
            if (idx > -1) {
              merged[idx] = { 
                ...merged[idx], 
                ...newCert,
                costRange: newCert.costRange || merged[idx].costRange
              };
            } else {
              merged.unshift({
                ...newCert,
                difficulty: newCert.difficulty || 'Beginner',
                priorityOrder: newCert.priorityOrder || 2,
                costRange: newCert.costRange || '$100 - $300'
              } as CertLibraryItem);
            }
          });
          try {
            localStorage.setItem('pathfinder_synced_certifications', JSON.stringify(merged));
          } catch (e) {
            console.error(e);
          }
          return merged;
        });
      }

      if (data.books && Array.isArray(data.books) && data.books.length > 0) {
        const existingTitles = new Set(books.filter(b => b && b.title).map(b => b.title.toLowerCase()));
        data.books.forEach((b: any) => {
          if (b && b.title && !existingTitles.has(b.title.toLowerCase())) {
            newlyAddedBooksCount++;
            newlyAddedBookTitlesList.push(b.title.toLowerCase());
          }
        });

        setBooks(prev => {
          const merged = [...prev];
          data.books.forEach((newBook: any) => {
            if (!newBook || !newBook.title) return;
            const idx = merged.findIndex(b => b && b.title && b.title.toLowerCase() === newBook.title.toLowerCase());
            if (idx > -1) {
              merged[idx] = { ...merged[idx], ...newBook };
            } else {
              merged.unshift(newBook);
            }
          });
          try {
            localStorage.setItem('pathfinder_synced_books', JSON.stringify(merged));
          } catch (e) {
            console.error(e);
          }
          return merged;
        });
      }

      setNewCerts(prev => [...prev, ...newlyAddedCertIdsList]);
      setNewBooks(prev => [...prev, ...newlyAddedBookTitlesList]);
      setSyncCount(prev => prev + 1);

      const certMsg = newlyAddedCertsCount > 0 ? `${newlyAddedCertsCount} new ${newlyAddedCertsCount === 1 ? 'certification' : 'certifications'}` : '';
      const bookMsg = newlyAddedBooksCount > 0 ? `${newlyAddedBooksCount} new ${newlyAddedBooksCount === 1 ? 'book' : 'books'}` : '';
      const summaryMsg = [certMsg, bookMsg].filter(Boolean).join(' and ');
      const finalReport = summaryMsg 
        ? `Successfully analyzed and merged live verified data! Found ${summaryMsg} and highlighted them in the list.` 
        : 'Successfully analyzed and merged live verified data! No new listings found at this time.';

      setSyncStatus(finalReport);
      setTimeout(() => setSyncStatus(''), 6000);
    } catch (err) {
      console.error(err);
      setSyncStatus('Neural link disconnected. Failed to verify with live Google search.');
      setTimeout(() => setSyncStatus(''), 4505);
    } finally {
      setIsSyncing(false);
    }
  };

  // Filtering based on debounced search query
  const filteredCerts = certifications.filter(c => 
    matchesQuery(c.name, debouncedQuery) ||
    matchesQuery(c.provider, debouncedQuery) ||
    matchesQuery(c.description, debouncedQuery)
  );

  const filteredChannels = importedPortals.map(portal => {
    if (!portal) return null;
    const portalRecords = importedCatalog.filter((rec: any) => rec && (rec.portalSlug === portal.id || rec.portal === portal.name));
    
    const matchingRecords = debouncedQuery.trim() ? portalRecords.filter((rec: any) => 
      rec && (
        matchesQuery(rec.skillOrTool, debouncedQuery) ||
        matchesQuery(rec.topic, debouncedQuery) ||
        matchesQuery(rec.domain, debouncedQuery) ||
        matchesQuery(rec.learningFormat, debouncedQuery) ||
        matchesQuery(rec.notes, debouncedQuery)
      )
    ) : [];

    const isDirectPortalMatch = 
      matchesQuery(portal.name, debouncedQuery) ||
      matchesQuery((portal as any).category, debouncedQuery) ||
      matchesQuery(portal.learningFormat, debouncedQuery) ||
      matchesQuery(portal.officialUrl, debouncedQuery) ||
      (Array.isArray(portal.domains) && portal.domains.some((d: string) => matchesQuery(d, debouncedQuery)));

    return {
      ...portal,
      category: (portal as any).category || 'Study Portal',
      totalSkillsCount: portalRecords.length,
      matchingSkillsCount: matchingRecords.length,
      matchingSkillsList: matchingRecords.slice(0, 6),
      isMatched: !debouncedQuery.trim() || isDirectPortalMatch || matchingRecords.length > 0
    };
  }).filter((p): p is NonNullable<typeof p> => Boolean(p && p.isMatched));


  return (
    <div 
      className={`w-full border-2 p-5 md:p-6 rounded-none relative transition-all duration-300 ${
        isLight
          ? 'bg-white border-gray-200 text-slate-800 shadow-[4px_4px_0px_0px_#cbd5e1]'
          : 'bg-[#070b13] border-[#121c38] text-white shadow-[4px_4px_0px_0px_#1e2e54]'
      } ${
        isHighlighted 
          ? '!border-white border-blink z-30 shadow-[0_0_20px_#fff]' 
          : ''
      }`} 
      id="libraries-dashboard-block"
    >
      {/* 🔍 DEDICATED RESOURCES SEARCH CONSOLE INPUT */}
      <div className={`mb-4 border-2 p-3 flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 shadow-xs' : 'bg-[#0a0f1d] border-[#1e2e54] text-white'
      }`}>
        <div className="relative flex-1 w-full flex items-center">
          <Search className={`w-4 h-4 absolute left-3 ${isLight ? 'text-slate-500' : 'text-emerald-400'}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setYtSearchQuery(e.target.value);
            }}
            placeholder="Search across all resources (Books, Certifications, SCCM, Active Directory, Tools, YouTube Educators, Hackathons)..."
            className={`w-full pl-9 pr-8 py-2 font-mono text-xs border rounded-none focus:outline-none transition-all ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' 
                : 'bg-[#040812] border-[#1e2e54] text-white focus:border-emerald-400'
            }`}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setYtSearchQuery('');
              }}
              className="absolute right-2 text-xs font-mono text-gray-400 hover:text-red-500 p-1 cursor-pointer"
              title="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Header element - visible on desktop, managed via SectionShell Navigator on mobile */}
      <div className={`hidden md:flex flex-col xl:flex-row xl:items-center justify-start gap-3 border-b-2 pb-3 mb-4 ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
        {/* Tab triggers */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {/* HACKATHONS TAB */}
          <button
            id="tab-hackathons"
            onClick={() => setActiveTab('hackathons')}
            className={`px-3 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hackathons'
                ? (isLight ? 'bg-white text-amber-600 border-amber-500 font-bold shadow-[2px_2px_0px_#d97706]' : 'bg-amber-500/10 text-amber-500 border-amber-500/50 font-bold shadow-[2px_2px_0px_#f59e0b]')
                : (isLight ? 'bg-white text-amber-700 border-slate-300 hover:border-amber-400' : 'bg-[#091120] text-amber-500 border-[#1e2e54] hover:border-amber-800')
            }`}
          >
            Hackathons & Events
          </button>

          {/* YOUTUBE TEACHERS TAB */}
          <button
            id="tab-youtubeTeachers"
            onClick={() => setActiveTab('youtubeTeachers')}
            className={`px-3 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'youtubeTeachers'
                ? (isLight ? 'bg-white text-red-600 border-red-500 font-bold shadow-[2px_2px_0px_#dc2626]' : 'bg-red-500/10 text-red-400 border-red-500/50 font-bold shadow-[2px_2px_0px_#ef4444]')
                : (isLight ? 'bg-white text-red-600 border-slate-300 hover:border-red-400' : 'bg-[#091120] text-red-400 border-[#1e2e54] hover:border-red-800')
            }`}
          >
            YouTube Teachers
          </button>

          {/* CURATED HUB TAB */}
          <button
            id="tab-channels"
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'channels'
                ? (isLight ? 'bg-white text-amber-600 border-amber-500 font-bold shadow-[2px_2px_0px_#d97706]' : 'bg-amber-500/10 text-amber-400 border-amber-400 font-bold shadow-[2px_2px_0px_#f59e0b]')
                : (isLight ? 'bg-white text-amber-700 border-slate-300 hover:border-amber-400' : 'bg-[#091122] text-amber-400/80 border-[#1e2e54] hover:border-amber-700')
            }`}
          >
            Study Portals
          </button>

          <button
            id="tab-tools-skills"
            onClick={() => setActiveTab('tools-skills')}
            className={`px-3 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tools-skills'
                ? (isLight ? 'bg-white text-emerald-600 border-emerald-500 font-bold shadow-[2px_2px_0px_#059669]' : 'bg-emerald-500/10 text-[#10b981] border-[#10b981] font-bold shadow-[2px_2px_0px_#10b981]')
                : (isLight ? 'bg-white text-emerald-700 border-slate-300 hover:border-emerald-400' : 'bg-[#091120] text-emerald-400 border-[#1e2e54] hover:border-emerald-800')
            }`}
          >
            Skills & Tools Pool
          </button>

          <button
            id="tab-certs"
            onClick={() => setActiveTab('certs')}
            className={`px-3 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certs'
                ? (isLight ? 'bg-white text-slate-900 border-slate-900 font-bold shadow-[2px_2px_0px_#334155]' : 'bg-slate-900 text-white border-white font-bold shadow-[2px_2px_0px_#ffffff]')
                : (isLight ? 'bg-white text-slate-800 border-slate-300 hover:border-slate-500' : 'bg-[#091120] text-white/80 border-[#1e2e54] hover:border-slate-500')
            }`}
          >
            Certifications
          </button>

          <button
            id="tab-bookshelf"
            onClick={() => setActiveTab('bookshelf')}
            className={`px-3 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bookshelf'
                ? (isLight ? 'bg-white text-[#8b4513] border-[#8b4513] font-bold shadow-[2px_2px_0px_#8b4513]' : 'bg-[#8b4513]/10 text-[#8b4513] border-[#8b4513] font-bold shadow-[2px_2px_0px_#8b4513]')
                : (isLight ? 'bg-white text-[#a0522d] border-slate-300 hover:border-[#8b4513]' : 'bg-[#091120] text-[#a0522d] border-[#1e2e54] hover:border-[#8b4513]')
            }`}
          >
            Bookshelf
          </button>

          {/* Department Filter for Bookshelf placed on the right of Bookshelf, beside the sync icon */}
          {activeTab === 'bookshelf' && (
            <div className="flex items-center gap-1">
              <div className="relative flex items-center">
                <Filter className="w-3.5 h-3.5 text-[#8b4513] absolute left-2 pointer-events-none" />
                <select
                  id="dept-select-header"
                  value={selectedBookDept}
                  onChange={(e) => setSelectedBookDept(e.target.value)}
                  className={`pl-7 pr-2 py-1.5 font-mono text-xs border uppercase transition-all rounded-none cursor-pointer focus:outline-none focus:border-[#8b4513] ${
                    isLight 
                      ? 'bg-white text-slate-800 border-gray-300' 
                      : 'bg-[#070b13] text-[#a0522d] border-[#1e2e54]'
                  }`}
                  style={{ color: '#8b4513', borderColor: '#8b4513' }}
                >
                  <option value="All">All Departments</option>
                  <option value="CEO">Boardroom (CEO)</option>
                  <option value="CTO">Architecture (CTO)</option>
                  <option value="Product">Product & Design</option>
                  <option value="Dev">Dev & QA</option>
                  <option value="DevOps">Cloud & SRE</option>
                  <option value="Security">Cybersecurity</option>
                  <option value="Data">Data & AI</option>
                  <option value="Operations">IT Operations</option>
                  <option value="HR">HR & Talent</option>
                  <option value="Marketing">Marketing & Sales</option>
                  <option value="Academic">Academic Prep</option>
                </select>
              </div>
            </div>
          )}

          {/* Settle this resync icon on the right space of the last tab Bookshelf */}
          {activeTab !== 'youtubeTeachers' && (
            <button
              onClick={handleUnifiedResync}
              disabled={isSyncing || isHackathonsSyncing}
              title={
                isSyncing || isHackathonsSyncing
                  ? "Resyncing..."
                  : `Re-sync data for the active ${activeTab === 'hackathons' ? 'hackathons & events' : 'resources'} tab`
              }
              className={`p-1.5 font-mono text-xs uppercase font-bold border transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ml-1 ${
                isSyncing || isHackathonsSyncing
                  ? 'border-gray-500 text-gray-400 bg-gray-500/10 cursor-not-allowed'
                  : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 shadow-[2px_2px_0px_rgba(16,185,129,0.15)] active:translate-y-0.5'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing || isHackathonsSyncing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Universal Blue Line Divider between Tab Navigation and Content Area */}
      <div className="hidden md:block w-full h-0.5 bg-[#0891b2] my-4 shadow-[0_0_10px_rgba(8,145,178,0.4)]" />

      {/* Cross-Tab Search Active Banner & Match Pills */}
      {Boolean(query) && Boolean(query.trim()) && (
        <div className={`p-2.5 mb-4 border-2 font-mono text-xs flex flex-wrap items-center justify-between gap-2.5 transition-all ${
          isLight ? 'bg-emerald-50/80 border-emerald-400 text-slate-800' : 'bg-[#071322] border-[#10b981]/50 text-slate-200 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
        }`}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#10b981] font-bold flex items-center gap-1 uppercase tracking-wider text-[11px]">
              <Search className="w-3.5 h-3.5" /> Search Active Across Section: <span className="underline decoration-emerald-500 font-extrabold">"{query}"</span>
            </span>
            <span className="text-gray-400 text-[10px] hidden sm:inline">| Matches per tab:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'hackathons', shortLabel: 'Hackathons' },
                { id: 'youtubeTeachers', shortLabel: 'YT Teachers' },
                { id: 'channels', shortLabel: 'Portals' },
                { id: 'tools-skills', shortLabel: 'Skills/Tools' },
                { id: 'certs', shortLabel: 'Certs' },
                { id: 'bookshelf', shortLabel: 'Books' },
              ].map(tab => {
                const tabMatch = getCrossTabSearchResults.find(m => m.tabId === tab.id);
                const count = tabMatch ? tabMatch.count : 0;
                const isActiveTab = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-2 py-0.5 text-[10px] font-mono border uppercase transition cursor-pointer flex items-center gap-1 ${
                      isActiveTab
                        ? 'bg-[#10b981] text-black border-[#10b981] font-bold shadow-[1px_1px_0px_#000]'
                        : count > 0
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:border-emerald-400'
                        : 'bg-black/20 text-gray-400 border-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <span>{tab.shortLabel}</span>
                    <span className={`px-1 py-0.2 text-[9px] font-bold ${
                      isActiveTab ? 'bg-black text-[#10b981]' : count > 0 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setQuery('')}
            className="px-2 py-1 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 text-[10px] font-bold uppercase transition cursor-pointer flex items-center gap-1 ml-auto"
            title="Clear search query and restore all complete results"
          >
            ✕ Clear Search
          </button>
        </div>
      )}

      {/* 🎯 SEAMLESS REDIRECTION DISCOVERY CARD */}
      {redirectionMatch && (
        <div 
          className={`mb-6 border-2 p-5 rounded-none relative transition-all duration-300 ${
            isLight
              ? 'bg-[#f0fdf4] border-emerald-300 text-slate-800 shadow-[6px_6px_0px_0px_#a7f3d0]'
              : 'bg-[#021f1a]/85 border-[#10b981]/50 text-white shadow-[6px_6px_0px_0px_#10b981]/30'
          }`}
        >
          {/* Top category pill log */}
          <div className="flex items-center justify-between gap-4 border-b pb-3 mb-4 border-dashed border-[#10b981]/30">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-500 animate-bounce" />
              <div className="font-mono text-xs font-bold tracking-wider uppercase text-emerald-500">
                🎯 Seam-Free Redirection Discovery Focus
              </div>
            </div>
            
            <button 
              onClick={() => {
                setQuery('');
                setYtSearchQuery('');
              }}
              className="px-2 py-0.5 border border-red-500/30 text-xs text-red-500 hover:bg-red-500/10 cursor-pointer uppercase font-mono font-bold"
              title="Close redirection spot and surf main tabs"
            >
              ✕ Exit Focus Spot
            </button>
          </div>

          {(() => {
            const rData = redirectionMatch.data as any;
            if (redirectionMatch.type === 'certification') {
              return (
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-emerald-500 text-white rounded-none">
                      {rData.provider}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-none">
                      Level: {rData.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 uppercase">
                    {rData.name}
                  </h4>
                  
                  <p className="text-xs leading-relaxed opacity-95 mb-4 max-w-4xl">
                    {rData.description}
                  </p>

                  <div className="p-3 bg-black/10 dark:bg-white/5 border border-emerald-500/25 mb-4 text-xs font-mono">
                    <span className="text-emerald-500 font-bold block mb-1 uppercase tracking-wider text-[10px]">💰 ESTIMATE EXAM BUDGET:</span>
                    <span className="opacity-80">{rData.costRange}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2.5">
                    <a 
                      href={rData.officialLink}
                      target="_blank" 
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase font-bold tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Official Cert Site
                    </a>

                    {rData.freeYouTubeLink && (
                      <a 
                        href={rData.freeYouTubeLink}
                        target="_blank" 
                        rel="noreferrer"
                        referrerPolicy="no-referrer"
                        className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase font-bold tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                        YouTube Course Playlists
                      </a>
                    )}

                    <button 
                      onClick={() => toggleBookmark?.({ id: rData.id, name: rData.name, type: 'cert' })}
                      className={`px-3.5 py-1.5 border uppercase text-xs font-mono font-bold tracking-wider cursor-pointer flex items-center gap-1.5 ${
                        isBookmarked?.(rData.id, 'cert')
                          ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                          : 'border-slate-400 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <CustomBookmarkIcon fill={isBookmarked?.(rData.id, 'cert') ? 'currentColor' : 'none'} />
                      {isBookmarked?.(rData.id, 'cert') ? 'Saved!' : 'Save Cert'}
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-red-500 text-white rounded-none">
                    {rData.emoji} {rData.categoryName}
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-none">
                    Core Area
                  </span>
                </div>

                <h4 className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 uppercase">
                  YouTube Teacher Topic: {rData.skillArea}
                </h4>

                {rData.matchedTeacher && (
                  <div className="p-3.5 bg-red-500/5 border border-red-500/25 mb-4 rounded-sm">
                    <span className="text-red-500 font-bold block mb-1 text-[10px] font-mono uppercase tracking-wider">📺 REDIRECTED TEACHER CHANNEL:</span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                      <span className="text-sm font-bold text-slate-800 dark:text-white">
                        {rData.matchedTeacher.name}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href={rData.matchedTeacher.url}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="px-3 py-1 bg-[#1e293b] hover:bg-[#334155] text-white text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer transition-all border border-slate-700"
                          title={`Go to ${rData.matchedTeacher.name}'s main channel`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Channel Home
                        </a>
                        <a 
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(rData.matchedTeacher.name + ' ' + (rData.skillArea || query))}`}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer hover:scale-105 transition-all"
                          title={`Directly search ${rData.matchedTeacher.name} lessons for "${rData.skillArea || query}"`}
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          Search Lessons
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-black/10 dark:bg-white/5 border border-slate-200 dark:border-slate-800">
                    <span className="text-emerald-500 font-bold block mb-1 font-mono text-[10px] uppercase tracking-wider">💼 TRUST AUDIT DETAILS:</span>
                    <p className="text-xs opacity-90 leading-relaxed text-slate-700 dark:text-gray-300">
                      {rData.whyTrust}
                    </p>
                  </div>
                  <div className="p-3 bg-black/10 dark:bg-white/5 border border-slate-200 dark:border-slate-800">
                    <span className="text-amber-500 font-bold block mb-1 font-mono text-[10px] uppercase tracking-wider">🗓️ SUGGESTED SYLLABUS:</span>
                    <p className="text-xs opacity-90 leading-relaxed text-slate-700 dark:text-gray-300">
                      {rData.suggestedStudy}
                    </p>
                  </div>
                </div>

                {/* Show alternate teachers in this area */}
                {!rData.matchedTeacher && rData.teachers && (
                  <div className="mb-4">
                    <span className="text-slate-500 font-bold block mb-2 font-mono text-[10px] uppercase tracking-wider">📺 CHANNELS IN THIS CATEGORY:</span>
                    <div className="flex flex-wrap gap-2">
                      {rData.teachers.map((t: any, idx: number) => (
                        <a 
                          key={idx}
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-red-500/10 text-xs font-mono text-slate-800 dark:text-gray-200 border border-slate-300 dark:border-slate-700 hover:border-red-500/50 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Youtube className="w-3.5 h-3.5 text-red-500" />
                          {t.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          
          <div className="border-t border-dashed border-[#10b981]/25 pt-2 mt-2 text-[10px] font-mono text-slate-500 dark:text-gray-400">
            💡 You are currently viewing the targeted redirection detail above. You are fully free to click on and surf any main section tabs below as well.
          </div>
        </div>
      )}

      {/* Dynamic Sync Status Console */}
      {(isSyncing || isHackathonsSyncing) && (
        <div className="mb-5 p-2.5 bg-black border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-2 animate-pulse rounded-none">
          <span className="w-2 h-2 bg-emerald-500 animate-ping rounded-none shrink-0" />
          <span className="font-bold text-emerald-500">SYSTEM DATA INGESTION CYCLE:</span>
          <span>{isHackathonsSyncing ? hackathonsSyncMessage : syncStatus}</span>
        </div>
      )}

      {/* RENDER CONTENT PANELS */}

      {/* 0.1 YOUTUBE TEACHERS TAB RENDER */}
      {activeTab === 'youtubeTeachers' && (
        <div id="youtube-teachers-block" className="space-y-4">
          <YoutubeTeachers 
            theme={theme}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            searchQuery={query}
            setSearchQuery={setQuery}
            selectedCategoryId={ytCategoryId}
            setSelectedCategoryId={setYtCategoryId}
            adviceIndex={tipIndex}
            hideInternalSearch={true}
          />
        </div>
      )}

      {/* 0.2 HACKATHONS TAB RENDER */}
      {activeTab === 'hackathons' && (
        <div id="hackathons-radar-block" className="space-y-4">
          <Hackathons 
            theme={theme}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            selectedItemId={hSelectedItemId}
            setSelectedItemId={setHSelectedItemId}
            searchQuery={query}
            setSearchQuery={setQuery}
            hideInternalSearch={true}
            syncTrigger={hackathonsSyncTrigger}
            onSyncStateChange={(syncing, msg) => {
              setIsHackathonsSyncing(syncing);
              setHackathonsSyncMessage(msg);
            }}
          />
        </div>
      )}

      {/* 1. CERTIFICATIONS TAB RENDER */}
      {activeTab === 'certs' && (
        <div className="space-y-4 font-mono">
          {/* Sliced pagination of certs list */}
          {(() => {
            const totalCertPages = Math.ceil(filteredCerts.length / certPageSize);
            const activePage = Math.min(certPage, Math.max(1, totalCertPages));
            const startIdx = (activePage - 1) * certPageSize;
            const slicedCerts = filteredCerts.slice(startIdx, startIdx + certPageSize);

            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slicedCerts.map((cert) => {
                    const isNew = newCerts.includes(cert.id);
                    return (
                      <div key={cert.id} className={`border p-4 rounded-none flex flex-col justify-between font-mono text-xs transition duration-200 ${
                        isNew 
                          ? (isLight ? 'bg-[#f0fdf4] border-[#10b981] shadow-[2px_2px_0px_rgba(16,185,129,0.3)]' : 'bg-[#0a1e16] border-[#10b981] shadow-[2px_2px_0px_rgba(16,185,129,0.3)] text-white')
                          : (isLight ? 'bg-white border-gray-200 text-slate-800' : 'bg-[#0c1224]/80 border-[#1e2e54]/80 text-white')
                      }`}>
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <div>
                              <span className="text-[10px] text-gray-400 block font-normal uppercase">{cert.provider}</span>
                              <strong className={`text-sm font-bold leading-tight block mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{cert.name}</strong>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {isNew && (
                                <span className="px-1.5 py-0.5 text-[8px] border border-[#10b981] bg-[#10b981]/15 text-[#10b981] font-bold rounded-none uppercase animate-pulse flex items-center gap-1 shrink-0">
                                  <span className="w-1 h-1 bg-[#10b981] rounded-full inline-block animate-ping" />
                                  LATEST ADDITION
                                </span>
                              )}
                              {toggleBookmark && isBookmarked && (
                                <button
                                  onClick={() => toggleBookmark({
                                    id: cert.id,
                                    name: cert.name,
                                    type: 'certification',
                                    subtext: `${cert.provider} Certification`,
                                    url: cert.officialLink
                                  })}
                                  className="p-1 text-gray-400 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center"
                                  title={isBookmarked(cert.id, 'certification') ? 'Remove certification bookmark' : 'Bookmark certification'}
                                >
                                  <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(cert.id, 'certification') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                </button>
                              )}
                              <span className={`px-2 py-0.5 text-[9px] border font-bold ${
                                cert.difficulty === 'Beginner' 
                                  ? (isLight ? 'bg-green-100/60 text-green-800 border-green-200' : 'bg-green-950 text-green-400 border-green-800/30') 
                                  : (isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300')
                              }`}>
                                {cert.difficulty}
                              </span>
                            </div>
                          </div>

                          {(() => {
                            const meta = resolveKeywordMetadata(cert.name);
                            return (
                              <div className="mb-2 flex flex-wrap gap-1.5 items-center">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase ${
                                  isLight ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/40'
                                }`}>
                                  🧬 Taxonomy: {getTaxonomyCategoryForCert(cert.name)}
                                </span>
                                {meta.domainLabel && (
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded-none font-bold uppercase ${
                                    isLight ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                                  }`}>
                                    🏷️ Domain: {meta.domainLabel}
                                  </span>
                                )}
                                {meta.isHotTech && (
                                  <span className="px-1.5 py-0.5 text-[8px] bg-red-500 text-white font-bold rounded-none uppercase flex items-center gap-1">
                                    🔥 HOT TECH 2026
                                  </span>
                                )}
                              </div>
                            );
                          })()}

                          <p className={`leading-normal mb-4 text-[11px] ${isLight ? 'text-slate-650' : 'text-gray-400'}`}>
                            {cert.description}
                          </p>
                        </div>

                        <div className={`border-t pt-3 mt-3 space-y-2.5 ${isLight ? 'border-gray-200' : 'border-[#121c38]/80'}`}>
                          <div className="text-[11px] flex gap-1.5 items-center">
                            <span className="text-gray-500">Est. Exam Fee:</span>
                            <span className={`font-bold ${isLight ? 'text-amber-700 font-extrabold' : 'text-amber-400'}`}>{cert.costRange}</span>
                          </div>

                          {/* Training Links */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                            <a 
                              href={cert.officialLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`p-1 px-2 text-center border text-[10px] flex items-center justify-center gap-0.5 transition font-sans ${isLight ? 'bg-slate-50 border-gray-200 hover:bg-amber-100/50 hover:text-amber-800 text-slate-800' : 'bg-black hover:bg-[#eab308]/15 hover:text-[#eab308] border-slate-800 text-gray-300'}`}
                            >
                              Official Portal <ExternalLink className="w-2.5 h-2.5" />
                            </a>

                            <button 
                              onClick={() => {
                                const categories = mapCertToYoutubeCategories(cert.id);
                                if (setActiveTab) {
                                  setActiveTab('youtubeTeachers');
                                }
                                if (setSelectedCategoryId && categories.length > 0) {
                                  setSelectedCategoryId(categories[0]);
                                }
                                setHighlightedCats(categories);
                              }}
                              className={`p-1 px-2 text-center border text-[10px] flex items-center justify-center gap-0.5 transition font-sans cursor-pointer ${isLight ? 'bg-slate-50 border-gray-200 hover:bg-red-100/50 hover:text-red-800 text-slate-800' : 'bg-black hover:bg-red-950/20 hover:text-red-400 border-slate-800 text-gray-300'}`}
                            >
                              YouTube Learning <Play className="w-2.5 h-2.5 text-red-500 shrink-0" />
                            </button>

                            {(() => {
                              const portal = getAlternativeLearningPortal(cert);
                              return (
                                <a 
                                  href={portal.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className={`p-1 px-2 text-center border text-[10px] flex items-center justify-center gap-0.5 transition font-sans ${isLight ? 'bg-slate-50 border-gray-200 hover:bg-purple-100/50 hover:text-purple-800 text-slate-800' : 'bg-black hover:bg-purple-950/20 hover:text-purple-400 border-slate-800 text-gray-300'}`}
                                >
                                  {portal.name} <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredCerts.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-12">No certifications matched your criteria.</div>
                  )}
                </div>

                {/* Elegant pagination triggers list */}
                {totalCertPages > 1 && (
                  <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono-pure ${isLight ? 'border-slate-200' : 'border-[#121c38]'}`}>
                    <div className={isLight ? 'text-slate-500' : 'text-gray-400'}>
                      Showing <span className="font-bold text-[#10b981]">{startIdx + 1}</span> to <span className="font-bold text-[#10b981]">{Math.min(startIdx + certPageSize, filteredCerts.length)}</span> of <span className="font-bold">{filteredCerts.length}</span> certifications
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCertPage(prev => Math.max(1, prev - 1))}
                        disabled={activePage === 1}
                        className={`px-2.5 py-1 text-[10px] border font-bold uppercase transition select-none cursor-pointer ${
                          activePage === 1 
                            ? 'opacity-40 cursor-not-allowed border-slate-800 text-gray-605'
                            : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-[#1e2e54] bg-[#0c1224] hover:border-[#10b981] text-white')
                        }`}
                      >
                        Prev
                      </button>
                      
                      {Array.from({ length: totalCertPages }).map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = pageNum === activePage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCertPage(pageNum)}
                            className={`w-7 h-7 text-[10px] border font-bold text-center flex items-center justify-center transition select-none cursor-pointer ${
                              isCurrent 
                                ? 'bg-[#10b981] text-black border-[#10b981] font-black'
                                : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-[#1e2e54] bg-black text-gray-300 hover:border-slate-600')
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCertPage(prev => Math.min(totalCertPages, prev + 1))}
                        disabled={activePage === totalCertPages}
                        className={`px-2.5 py-1 text-[10px] border font-bold uppercase transition select-none cursor-pointer ${
                          activePage === totalCertPages 
                            ? 'opacity-40 cursor-not-allowed border-slate-800 text-gray-605'
                            : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-[#1e2e54] bg-[#0c1224] hover:border-[#10b981] text-white')
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
      </div>
    )}

      {/* 2. UNIFIED TOOLS & SKILLS TAB RENDER */}
      {activeTab === 'tools-skills' && (
        <div className="space-y-6 font-mono">

          {/* FILTERS TOOLBAR FOR SKILLS & TOOLS POOL WITH TOP-RIGHT PAGINATION */}
          {(() => {
            const filteredSkillsForBar = importedSkills.filter((sk: any) => {
              if (skillDomainFilter !== 'All' && sk.domain !== skillDomainFilter) return false;
              if (skillTypeFilter !== 'All' && sk.type !== skillTypeFilter) return false;
              if (!debouncedQuery.trim()) return true;
              return (
                matchesQuery(sk.name, debouncedQuery) ||
                matchesQuery(sk.domain, debouncedQuery) ||
                matchesQuery(sk.topic, debouncedQuery) ||
                matchesQuery(sk.type, debouncedQuery) ||
                (sk.portals && sk.portals.some((p: string) => matchesQuery(p, debouncedQuery)))
              );
            });
            const totalSkillPagesForBar = Math.ceil(filteredSkillsForBar.length / skillPageSize);
            const activeSkillPageForBar = Math.min(skillPage, Math.max(1, totalSkillPagesForBar));

            return (
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b border-emerald-500/30">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Domain filter */}
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10.5px] text-emerald-400 font-bold uppercase tracking-wider">Domain:</label>
                    <select
                      value={skillDomainFilter}
                      onChange={(e) => {
                        setSkillDomainFilter(e.target.value);
                        setSkillPage(1);
                      }}
                      className={`p-1.5 text-[11px] font-mono border rounded-none cursor-pointer ${isLight ? 'bg-white text-slate-800 border-slate-300' : 'bg-[#081220] text-slate-200 border-slate-700'}`}
                    >
                      <option value="All">All Domains ({dynamicDomains.length})</option>
                      {dynamicDomains.map((d: any) => (
                        <option key={d.name} value={d.name}>{d.name} ({d.skillCount})</option>
                      ))}
                    </select>
                  </div>

                  {/* Type filter */}
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10.5px] text-emerald-400 font-bold uppercase tracking-wider">Type:</label>
                    <select
                      value={skillTypeFilter}
                      onChange={(e) => {
                        setSkillTypeFilter(e.target.value);
                        setSkillPage(1);
                      }}
                      className={`p-1.5 text-[11px] font-mono border rounded-none cursor-pointer ${isLight ? 'bg-white text-slate-800 border-slate-300' : 'bg-[#081220] text-slate-200 border-slate-700'}`}
                    >
                      <option value="All">All Types ({dynamicTypes.length})</option>
                      {dynamicTypes.map((tName: string) => (
                        <option key={tName} value={tName}>{tName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* TOP RIGHT CORNER: PAGINATION CONTROLS REPLACING "586 Total Verified Entries" */}
                {totalSkillPagesForBar > 1 ? (
                  <div className="flex items-center gap-1.5 font-mono">
                    <button
                      onClick={() => setSkillPage(prev => Math.max(1, prev - 1))}
                      disabled={activeSkillPageForBar === 1}
                      className={`px-2.5 py-1 text-[10px] border font-bold uppercase transition select-none cursor-pointer ${
                        activeSkillPageForBar === 1 
                          ? 'opacity-40 cursor-not-allowed border-slate-800 text-gray-600'
                          : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-slate-700 bg-black hover:border-emerald-500 text-emerald-400')
                      }`}
                    >
                      Prev
                    </button>
                    <span className="text-[10px] font-extrabold text-emerald-400 px-1">
                      {activeSkillPageForBar} / {totalSkillPagesForBar}
                    </span>
                    <button
                      onClick={() => setSkillPage(prev => Math.min(totalSkillPagesForBar, prev + 1))}
                      disabled={activeSkillPageForBar === totalSkillPagesForBar}
                      className={`px-2.5 py-1 text-[10px] border font-bold uppercase transition select-none cursor-pointer ${
                        activeSkillPageForBar === totalSkillPagesForBar 
                          ? 'opacity-40 cursor-not-allowed border-slate-800 text-gray-600'
                          : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-slate-700 bg-black hover:border-emerald-500 text-emerald-400')
                      }`}
                    >
                      Next ➔
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-400 font-mono font-bold">
                    {filteredSkillsForBar.length} Entries
                  </span>
                )}
              </div>
            );
          })()}

          {/* CATALOG SKILLS GRID */}
          {(() => {
            const filteredSkills = importedSkills.filter((sk: any) => {
              if (skillDomainFilter !== 'All' && sk.domain !== skillDomainFilter) return false;
              if (skillTypeFilter !== 'All' && sk.type !== skillTypeFilter) return false;
              if (!debouncedQuery.trim()) return true;
              return (
                matchesQuery(sk.name, debouncedQuery) ||
                matchesQuery(sk.domain, debouncedQuery) ||
                matchesQuery(sk.topic, debouncedQuery) ||
                matchesQuery(sk.type, debouncedQuery) ||
                (sk.portals && sk.portals.some((p: string) => matchesQuery(p, debouncedQuery)))
              );
            });

            if (filteredSkills.length === 0) {
              return (
                <div className={`p-8 text-center border-2 border-dashed font-mono text-xs ${isLight ? 'border-emerald-300 bg-emerald-50/30 text-slate-800' : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'}`}>
                  No catalog skills or tools matched the query "{query}" with selected filters.
                </div>
              );
            }

            // Relevance score sorting
            const sortedSkills = [...filteredSkills].sort((a: any, b: any) => {
              if (!debouncedQuery.trim()) return 0;
              const kg = expandQueryViaKnowledgeGraph(debouncedQuery);
              const scoreA = calculateItemRelevanceScore(a.name, a.domain, a.topic, debouncedQuery, kg);
              const scoreB = calculateItemRelevanceScore(b.name, b.domain, b.topic, debouncedQuery, kg);
              return scoreB - scoreA;
            });

            const totalPages = Math.ceil(sortedSkills.length / skillPageSize);
            const activeSkillPage = Math.min(skillPage, Math.max(1, totalPages));
            const startIdx = (activeSkillPage - 1) * skillPageSize;
            const slicedSkills = sortedSkills.slice(startIdx, startIdx + skillPageSize);

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slicedSkills.map((sk: any, sIdx: number) => (
                    <div key={`${sk.id || 'sk'}-${sIdx}`} className={`border-2 p-4 flex flex-col justify-between font-mono text-xs transition duration-200 ${
                      isLight ? 'bg-white border-slate-200 hover:border-emerald-500 text-slate-800' : 'bg-[#060c18] border-[#121c38] hover:border-emerald-500/60 text-slate-200'
                    }`}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 border ${
                            sk.type === 'Tool / Platform'
                              ? 'bg-white text-black border-slate-300 font-extrabold'
                              : (isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60')
                          }`}>
                            {sk.type}
                          </span>
                          {toggleBookmark && isBookmarked && (
                            <button
                              onClick={() => toggleBookmark({
                                id: sk.id || sk.name,
                                name: sk.name,
                                type: 'skill',
                                subtext: `${sk.domain || 'Skill'} • ${sk.topic || 'Tech'}`
                              })}
                              className="p-1 text-gray-400 hover:text-yellow-400 transition cursor-pointer shrink-0"
                              title={isBookmarked(sk.id || sk.name, 'skill') ? 'Remove bookmark' : 'Bookmark skill'}
                            >
                              <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(sk.id || sk.name, 'skill') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                            </button>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-1">
                          <h5 className="text-sm font-bold text-white block leading-snug">{sk.name}</h5>
                        </div>

                        {(() => {
                          const meta = resolveKeywordMetadata(sk.name);
                          return (
                            <div className="flex flex-wrap gap-1 text-[10px]">
                              <span className={`border px-1.5 py-0.5 font-bold ${
                                isLight ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-black/60 border-slate-800 text-cyan-400'
                              }`}>Domain: {meta.domainLabel || sk.domain}</span>
                              <span className={`border px-1.5 py-0.5 ${
                                isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-black/60 border-slate-800 text-slate-300'
                              }`}>Topic: {sk.topic}</span>
                              {meta.typeLabel && (
                                <span className={`border px-1.5 py-0.5 font-bold ${
                                  isLight ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-purple-950/40 text-purple-300 border-purple-900/40'
                                }`}>🏷️ {meta.typeLabel}</span>
                              )}
                              {meta.isHotTech && (
                                <span className="px-1.5 py-0.5 text-[8px] bg-red-500 text-white font-bold rounded-none uppercase flex items-center gap-1">
                                  🔥 HOT TECH 2026
                                </span>
                              )}
                            </div>
                          );
                        })()}

                        {sk.notes && (
                          <p className="text-[10.5px] text-gray-400 font-sans leading-normal line-clamp-2">
                            {sk.notes}
                          </p>
                        )}

                        {/* Offered by Study Portals */}
                        {(() => {
                          const hasExistingPortals = sk.portals && sk.portals.length > 0;
                          const portalsList = hasExistingPortals 
                            ? sk.portals.map((pName: string, idx: number) => ({
                                portal: pName,
                                url: sk.officialUrls && sk.officialUrls[idx] ? sk.officialUrls[idx] : 'https://www.google.com'
                              }))
                            : getOfferedStudyPortals(sk.name, sk.domain);

                          return (
                            <div className="pt-2 border-t border-slate-800/80">
                              <span className="text-[9px] text-gray-400 font-bold uppercase block mb-1">🎓 OFFERED BY STUDY PORTALS:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {portalsList.map((p: any, pIdx: number) => (
                                  <a
                                    key={pIdx}
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-0.5 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/50 hover:border-emerald-400 text-[10px] text-emerald-300 hover:text-white flex items-center gap-1 transition font-mono font-bold"
                                  >
                                    {p.portal} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(sk.name + ' tutorial')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-red-400 hover:text-white flex items-center gap-1 transition font-bold"
                        >
                          <Youtube className="w-3 h-3 text-red-500" /> Search YouTube Lessons
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination for skills */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-gray-400 font-mono">
                      Showing {startIdx + 1} - {Math.min(filteredSkills.length, startIdx + skillPageSize)} of {filteredSkills.length} skills
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSkillPage(prev => Math.max(1, prev - 1))}
                        disabled={activeSkillPage === 1}
                        className="px-2 py-1 text-[10px] border border-slate-800 bg-black text-white disabled:opacity-40 cursor-pointer"
                      >
                        Prev
                      </button>
                      <span className="text-[10px] font-bold text-emerald-400 px-2">
                        {activeSkillPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setSkillPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={activeSkillPage === totalPages}
                        className="px-2 py-1 text-[10px] border border-slate-800 bg-black text-white disabled:opacity-40 cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Role Family Tools & Skills Maps Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Role Family Sidebar list */}
              <div className="w-full lg:w-1/3 space-y-1 bg-black/60 border border-slate-800 p-2 h-fit max-h-[460px] overflow-y-auto custom-scrollbar">
                <strong className="text-[10px] text-cyan-400 block p-1 border-b border-slate-800 mb-2 uppercase">SELECT CAREER FAMILY:</strong>
                {ROLE_FAMILY_MAPS.map((rf) => {
                  const isSelected = selectedRoleFamily === rf.id;
                  const isMatchingQuery = Boolean(query) && Boolean(query.trim()) && Boolean(
                    (rf?.name && rf.name.toLowerCase().includes(query.toLowerCase())) || 
                    (Array.isArray(rf?.roles) && rf.roles.some(r => r && typeof r === 'string' && r.toLowerCase().includes(query.toLowerCase()))) ||
                    (Array.isArray(rf?.groups) && rf.groups.some(g => (g?.name && g.name.toLowerCase().includes(query.toLowerCase())) || (g?.skills && g.skills.toLowerCase().includes(query.toLowerCase()))))
                  );

                  return (
                    <button
                      key={rf.id}
                      onClick={() => {
                        setSelectedRoleFamily(rf.id);
                        setQuery('');
                        if (isMobile) {
                          setTimeout(() => {
                            document.getElementById('role-family-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 80);
                        }
                      }}
                      className={`w-full text-left p-2 text-xs border transition flex items-center justify-between group rounded-none ${
                        isSelected 
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/60 font-bold' 
                          : isMatchingQuery
                          ? 'bg-amber-500/10 text-amber-300 border-amber-600/50'
                          : 'bg-transparent text-gray-400 border-transparent hover:bg-slate-900/60 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-2">{cleanFamilyName(rf.name)}</span>
                      <ArrowRight className={`w-3 h-3 text-cyan-500 transition-transform ${isSelected ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Detail view of active Role Family */}
              <div id="role-family-detail-panel" className="flex-1 bg-[#090f1e]/80 border border-slate-800 p-4 min-h-[400px] flex flex-col justify-between scroll-mt-20">
                {(() => {
                  const activeFamily = ROLE_FAMILY_MAPS.find(rf => rf.id === selectedRoleFamily) || ROLE_FAMILY_MAPS[0];
                  return (
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-3">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest opacity-80">Career Path Roadmap</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <h5 className="text-base font-bold text-white">{cleanFamilyName(activeFamily.name)}</h5>
                          {toggleBookmark && isBookmarked && (
                            <button
                              onClick={() => toggleBookmark({
                                id: activeFamily.id,
                                name: cleanFamilyName(activeFamily.name),
                                type: 'jobCategory',
                                subtext: `${cleanFamilyName(activeFamily.name)} Technology Family Category`
                              })}
                              className="p-0.5 text-gray-400 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center shrink-0"
                              title={isBookmarked(activeFamily.id, 'jobCategory') ? 'Remove category bookmark' : 'Bookmark this category'}
                            >
                              <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(activeFamily.id, 'jobCategory') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                            </button>
                          )}
                        </div>
                        
                        <div className="mt-2.5 flex flex-wrap gap-1.5 leading-normal">
                          <span className="text-[10px] text-slate-500">Target Roles:</span>
                          {activeFamily.roles.map((role) => (
                            <span key={role} className="bg-black/60 border border-slate-800 px-2 py-0.5 text-slate-300 text-[10px]">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tool/Skill Sub-groups */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {(() => {
                          const filteredGroups = activeFamily.groups.filter(grp =>
                            query === '' ||
                            matchesQuery(grp.name, query) ||
                            matchesQuery(grp.skills, query) ||
                            grp.resources.some(res => matchesQuery(res.name, query))
                          );

                          if (filteredGroups.length === 0) {
                            return (
                              <div className="col-span-2 py-8 text-center text-gray-500 font-mono text-xs border border-dashed border-[#1e2e54]/50">
                                No specific skills or toolsets here match "{query}".
                              </div>
                            );
                          }

                          return filteredGroups.map((grp) => (
                            <div key={grp.name} className="bg-black/40 border border-slate-800/80 p-3 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-1 border-b border-slate-800/60 pb-1">
                                  <strong className="text-xs text-white block uppercase leading-snug">{grp.name}</strong>
                                  {toggleBookmark && isBookmarked && (
                                    <button
                                      onClick={() => toggleBookmark({
                                        id: `${activeFamily.id}-${grp.name}`,
                                        name: grp.name,
                                        type: 'skill',
                                        subtext: `${cleanFamilyName(activeFamily.name)} Skill Pool`
                                      })}
                                      className="p-0.5 text-gray-500 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center shrink-0"
                                      title={isBookmarked(`${activeFamily.id}-${grp.name}`, 'skill') ? 'Remove skill pool bookmark' : 'Bookmark skill pool'}
                                    >
                                      <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(`${activeFamily.id}-${grp.name}`, 'skill') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                    </button>
                                  )}
                                </div>
                                <p className="text-xs text-slate-300 leading-normal mb-3">
                                  <span className="text-gray-500 font-bold block text-[10px]">KEY TOOLSETS & SKILLS:</span>
                                  {grp.skills}
                                </p>
                              </div>

                              <div className="space-y-2 mt-auto">
                                <div>
                                  <span className="text-[9px] text-gray-500 block mb-1 uppercase font-bold">Free Practice Sandbox:</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {grp.resources.map((link) => (
                                      <a 
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2 py-0.5 bg-black/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500 text-[10px] text-cyan-400 hover:text-white flex items-center gap-1 transition"
                                      >
                                        {link.name} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                {/* Curated YouTube Lessons */}
                                {(() => {
                                  const teachers = getYouTubeTeachersForTopic(grp.name, grp.skills, activeFamily.id);
                                  if (teachers.length === 0) return null;
                                  return (
                                    <div className="border-t border-slate-900 pt-2">
                                      <span className="text-[9px] text-[#ef4444] block mb-1 uppercase font-bold flex items-center gap-1">
                                        <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" /> Curated YouTube Lessons:
                                      </span>
                                      <div className="flex flex-wrap gap-1.5 font-mono">
                                        {teachers.map((t) => {
                                          const directSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(t.name + ' ' + grp.name)}`;
                                          return (
                                            <div key={t.name} className="inline-flex items-center gap-1 bg-black/80 border border-slate-800 p-0.5 rounded-xs">
                                              <span className="text-[10px] text-gray-300 font-bold px-1 select-none">{t.name}</span>
                                              <a 
                                                href={t.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-1.5 py-0.5 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-[9px] text-red-400 hover:text-white flex items-center gap-0.5 transition"
                                                title={`Visit ${t.name}'s main channel`}
                                              >
                                                Channel <ExternalLink className="w-2 h-2 shrink-0" />
                                              </a>
                                              <a 
                                                href={directSearchUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white text-[9px] font-bold flex items-center gap-0.5 transition"
                                                title={`Search ${t.name} lessons for "${grp.name}"`}
                                              >
                                                Lessons <Youtube className="w-2.5 h-2.5 shrink-0 text-white" />
                                              </a>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 4. BOOKSHELF TAB RENDER */}
      {activeTab === 'bookshelf' && (
        <div className="space-y-4 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
            {(() => {
              const filtered = books.filter(b => {
                if (!debouncedQuery.trim()) return true;
                const lowerQ = debouncedQuery.toLowerCase();
                const titleMatch = b.title ? b.title.toLowerCase().includes(lowerQ) : false;
                const authorMatch = b.author ? b.author.toLowerCase().includes(lowerQ) : false;
                const bestForMatch = b.bestFor ? b.bestFor.toLowerCase().includes(lowerQ) : false;
                const summaryMatch = b.summary ? b.summary.toLowerCase().includes(lowerQ) : false;
                return titleMatch || authorMatch || bestForMatch || summaryMatch;
              });

              if (filtered.length === 0) {
                return (
                  <div className={`col-span-full text-center py-12 ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>
                    No books matched the selected company department or search query.
                  </div>
                );
              }

              const totalBookPages = Math.ceil(filtered.length / bookPageSize);
              const activePage = Math.min(bookPage, Math.max(1, totalBookPages));
              const startIdx = (activePage - 1) * bookPageSize;
              const slicedBooks = filtered.slice(startIdx, startIdx + bookPageSize);

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 col-span-full">
                    {slicedBooks.map((book) => {
                      const isNew = newBooks.includes(book.title.toLowerCase());
                      return (
                        <div key={book.title} className={`border-2 p-4 flex flex-col justify-between font-mono text-xs transition duration-200 ${
                          isNew 
                            ? (isLight ? 'bg-[#f0fdf4] border-[#10b981] shadow-[2px_2px_0px_rgba(16,185,129,0.3)]' : 'bg-[#0a1e16] border-[#10b981] shadow-[2px_2px_0px_rgba(16,185,129,0.3)] text-white')
                            : (isLight ? 'bg-white border-gray-200 text-slate-800' : 'bg-[#050914] border-[#121c38] text-white')
                        } ${book.coverAccent}`}>
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                {isNew && (
                                  <span className="px-1.5 py-0.5 text-[8px] border border-[#10b981] bg-[#10b981]/15 text-[#10b981] font-bold rounded-none uppercase animate-pulse flex items-center gap-1 shrink-0 mb-1.5 w-fit">
                                    <span className="w-1 h-1 bg-[#10b981] rounded-full inline-block animate-ping" />
                                    LATEST ADDITION
                                  </span>
                                )}
                                <strong className={`text-sm block font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{book.title}</strong>
                                <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-400'}`}>{book.author}</span>
                              </div>
                              <span className="text-[9px] px-1.5 py-0.5 bg-[#8b4513]/20 text-[#be123c] border border-[#8b4513]/40 font-bold rounded-none whitespace-nowrap font-sans">
                                {book.category}
                              </span>
                            </div>

                            <div className={`text-[10px] px-2 py-1 block w-fit border ${isLight ? 'text-amber-700 bg-amber-500/5 border-amber-500/30' : 'text-amber-500 bg-amber-500/5 border-amber-500/20'}`}>
                              👉 Best For: <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-300 font-semibold'}>{book.bestFor}</span>
                            </div>

                            <p className={`text-[11px] leading-relaxed font-sans font-light normal-case ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                              {book.summary}
                            </p>
                          </div>

                          <div className={`mt-4 pt-3 border-t ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
                            <a 
                              href={book.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full p-2 border text-[11px] text-[#a0522d] hover:text-white flex items-center justify-center gap-1.5 transition uppercase font-bold ${isLight ? 'bg-gray-50 border-gray-200 hover:bg-amber-800' : 'bg-black hover:bg-[#8b4513]/10 border-slate-800'}`}
                            >
                              Explore Book <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Elegant pagination triggers for books */}
                  {totalBookPages > 1 && (
                    <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono col-span-full ${isLight ? 'border-slate-200' : 'border-[#121c38]'}`}>
                      <div className={isLight ? 'text-slate-500' : 'text-gray-400'}>
                        Showing <span className="font-bold text-amber-500">{startIdx + 1}</span> to <span className="font-bold text-amber-500">{Math.min(startIdx + bookPageSize, filtered.length)}</span> of <span className="font-bold">{filtered.length}</span> books
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setBookPage(prev => Math.max(1, prev - 1))}
                          disabled={activePage === 1}
                          className={`px-2.5 py-1 text-[10px] border font-bold uppercase transition select-none cursor-pointer ${
                            activePage === 1 
                              ? 'opacity-40 cursor-not-allowed border-slate-850 text-gray-600'
                              : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-[#1e2e54] bg-[#0c1224] hover:border-amber-600 text-white')
                          }`}
                        >
                          Prev
                        </button>
                        
                        {Array.from({ length: totalBookPages }).map((_, i) => {
                          const pageNum = i + 1;
                          const isCurrent = pageNum === activePage;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setBookPage(pageNum)}
                              className={`w-7 h-7 text-[10px] border font-bold text-center flex items-center justify-center transition select-none cursor-pointer ${
                                isCurrent 
                                  ? 'bg-amber-600 text-white border-amber-605 font-black'
                                  : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-[#1e2e54] bg-black text-gray-300 hover:border-slate-600')
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => setBookPage(prev => Math.min(totalBookPages, prev + 1))}
                          disabled={activePage === totalBookPages}
                          className={`px-2.5 py-1 text-[10px] border font-bold uppercase transition select-none cursor-pointer ${
                            activePage === totalBookPages 
                              ? 'opacity-40 cursor-not-allowed border-slate-850 text-gray-600'
                              : (isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-[#1e2e54] bg-[#0c1224] hover:border-amber-600 text-white')
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 3. STUDY PORTALS MIND-MAP & SKILL BRANCHING TREE RENDER */}
      {activeTab === 'channels' && (
        <div className="space-y-4 font-mono max-h-[750px] overflow-y-auto custom-scrollbar pr-1">
          {(() => {
            const activeKey = selectedPortalId || filteredChannels[0]?.id || filteredChannels[0]?.name;
            const activePortal = filteredChannels.find(p => (p.id || p.name) === activeKey) || filteredChannels[0];

            // Get all skill records associated with active portal
            const portalRecords = activePortal ? importedCatalog.filter((rec: any) => 
              rec && (rec.portalSlug === activePortal.id || rec.portal === activePortal.name)
            ) : [];

            // Group skills by Domain into tree branches
            const domainBranchesMap = new Map<string, any[]>();
            portalRecords.forEach((rec: any) => {
              const dom = rec.domain || 'Software Engineering & Architecture';
              if (!domainBranchesMap.has(dom)) {
                domainBranchesMap.set(dom, []);
              }
              domainBranchesMap.get(dom)!.push(rec);
            });

            const domainBranches = Array.from(domainBranchesMap.entries());

            return (
              <>
                {/* 🌐 INTERACTIVE BREADCRUMB & PORTAL FILTER BAR */}
                <div className={`p-3 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isLight ? 'bg-amber-50/70 border-amber-300 text-slate-900 shadow-xs' : 'bg-[#121622] border-[#222b3d] text-slate-100'
                }`}>
                  {/* Breadcrumb Path & Dropdown Filter */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-amber-500 font-extrabold flex items-center gap-1.5 uppercase">
                      <BookOpen className="w-4 h-4 text-amber-400 shrink-0" /> Study Portals
                    </span>

                    <span className="text-slate-500">/</span>

                    {/* Portal Selector Dropdown (Breadcrumb Filter) */}
                    <div className="relative inline-flex items-center">
                      <select
                        value={activeKey}
                        onChange={(e) => setSelectedPortalId(e.target.value)}
                        aria-label="Filter by Study Portal"
                        className={`pl-2.5 pr-7 py-1 text-xs font-mono font-bold rounded-none border cursor-pointer focus:outline-none transition-all ${
                          isLight 
                            ? 'bg-white border-amber-400 text-amber-900 focus:border-amber-600 shadow-xs' 
                            : 'bg-[#1a202c] border-amber-400/80 text-amber-300 focus:border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                        }`}
                      >
                        {filteredChannels.map((plat) => {
                          const platKey = plat.id || plat.name;
                          return (
                            <option key={platKey} value={platKey} className={isLight ? 'bg-white text-slate-900' : 'bg-[#121620] text-amber-200'}>
                              {plat.name} ({plat.totalSkillsCount} Skills)
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-amber-400 absolute right-2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Quick Switch Horizontal Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 custom-scrollbar text-[10px]">
                    <span className="text-gray-400 shrink-0 text-[9.5px] uppercase font-bold hidden lg:inline">
                      Quick Switch:
                    </span>
                    {filteredChannels.map((plat) => {
                      const platKey = plat.id || plat.name;
                      const isSelected = activeKey === platKey;
                      return (
                        <button
                          key={platKey}
                          type="button"
                          onClick={() => setSelectedPortalId(platKey)}
                          className={`px-2 py-0.5 border text-[10px] uppercase font-bold shrink-0 transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-400 shadow-xs'
                              : isLight
                                ? 'bg-white text-slate-700 border-amber-200 hover:border-amber-400'
                                : 'bg-[#181d2a] text-slate-300 border-[#2d384d] hover:border-amber-500/60'
                          }`}
                        >
                          {plat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MAIN SPLIT-VIEW CANVAS */}
                <div className="flex flex-col md:flex-row gap-5 items-start">
                  {/* LEFT SIDE PANEL: Study Portals Selector (visible on desktop) */}
                  <div className={`hidden md:block w-full md:w-80 lg:w-96 shrink-0 border-2 p-3.5 space-y-2.5 max-h-[680px] overflow-y-auto custom-scrollbar ${
                    isLight ? 'bg-[#fbf9f5] border-amber-200/80' : 'bg-[#121620] border-[#222938]'
                  }`}>
                    <div className="flex items-center justify-between border-b pb-2 border-slate-800/80">
                      <span className="text-[11px] font-extrabold uppercase text-amber-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Select Study Portal
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {filteredChannels.length} Options
                      </span>
                    </div>

                    <div className="space-y-2">
                      {filteredChannels.map((plat) => {
                        const platKey = plat.id || plat.name;
                        const isSelected = activeKey === platKey;
                        
                        return (
                          <button
                            key={platKey}
                            type="button"
                            onClick={() => setSelectedPortalId(platKey)}
                            className={`w-full text-left p-3 border transition-all cursor-pointer relative overflow-hidden group ${
                              isSelected
                                ? (isLight ? 'bg-amber-50/90 border-amber-500 text-slate-900 shadow-xs' : 'bg-[#241f17] border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.15)]')
                                : (isLight ? 'bg-white border-amber-100 hover:border-amber-300 text-slate-700' : 'bg-[#181d2a] border-[#252e42] hover:border-amber-700/60 text-slate-300')
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                            )}
                            
                            <div className="flex items-center justify-end gap-1 mb-1">
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 border ${
                                isSelected ? 'bg-amber-400 text-black border-amber-300' : 'bg-amber-950/50 text-amber-300 border-amber-800/40'
                              }`}>
                                {plat.totalSkillsCount} Skills
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <h5 className={`text-xs font-extrabold ${isSelected ? 'text-amber-300' : 'group-hover:text-white'}`}>
                                {plat.name}
                              </h5>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : 'text-gray-500'}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* MAIN CANVAS: Embedded Skills Mind-Map Tree */}
                  {!activePortal ? (
                    <div className="w-full p-12 text-center border-2 border-dashed border-amber-500/30 bg-amber-950/10 text-amber-300">
                      Select a Study Portal from the breadcrumb filter to expand its topics.
                    </div>
                  ) : (
                    <div className={`flex-1 w-full border-2 p-4 sm:p-5 space-y-6 min-h-[500px] max-h-[720px] overflow-y-auto custom-scrollbar relative transition-all ${
                      isLight ? 'bg-[#f7f5f0] border-amber-200/80' : 'bg-[#131722] border-[#222938]'
                    }`}>
                      {/* Active Portal Header & Direct Portal Visit Link */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 pb-4 border-slate-800/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
                              Active Portal
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {portalRecords.length} Embedded Skills
                            </span>
                          </div>
                          <h3 className={`text-lg md:text-xl font-black mt-1 flex items-center gap-2 ${
                            isLight ? 'text-slate-900' : 'text-amber-100'
                          }`}>
                            {activePortal.name}
                          </h3>
                        </div>

                        <a
                          href={activePortal.officialUrl || (activePortal as any).url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-300 font-extrabold text-xs uppercase transition flex items-center gap-1.5 rounded-xs shrink-0 shadow-[2px_2px_0px_#ffffff]"
                        >
                          <span>Visit Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* DOMAIN BRANCHES & CLEAN TOPIC NODES */}
                      {domainBranches.length === 0 ? (
                        <div className="p-8 text-center border border-dashed border-amber-500/30 text-gray-400 text-xs font-mono">
                          No embedded skills matching the current filter.
                        </div>
                      ) : (
                        <AnimatePresence mode="popLayout">
                          <div className="space-y-7 relative">
                            {domainBranches.map(([domainName, skillsInDomain], branchIdx) => (
                              <motion.div
                                key={`${activePortal.id || activePortal.name}-${domainName}`}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25, delay: branchIdx * 0.05 }}
                                className="space-y-3 relative pl-4 border-l-2 border-amber-500/40"
                              >
                                {/* Branch Hub Header */}
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                                  <h4 className="text-xs font-extrabold uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
                                    {domainName}
                                  </h4>
                                </div>

                                {/* Skills / Topics Nodes Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                                  {skillsInDomain.map((sk: any, sIdx: number) => {
                                    const skillKey = sk.id || sk.skillOrTool || sk.name || `sk-${sIdx}`;
                                    const mainTitle = sk.skillOrTool || sk.name;
                                    
                                    return (
                                      <motion.div
                                        key={skillKey}
                                        layout
                                        layoutId={`skill-node-${skillKey}`}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.85 }}
                                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                                        className={`p-3.5 border-2 flex flex-col justify-between transition-all duration-200 hover:border-amber-400 group relative ${
                                          isLight
                                            ? 'bg-white border-amber-100 hover:shadow-md text-slate-800'
                                            : 'bg-[#1a202c] border-[#293448] hover:bg-[#202838] text-slate-200'
                                        }`}
                                      >
                                        <div className="space-y-2">
                                          <div className="flex items-start justify-between gap-2">
                                            <h5 className="text-xs font-extrabold text-amber-50 group-hover:text-amber-300 transition-colors leading-snug">
                                              {mainTitle}
                                            </h5>

                                            {toggleBookmark && isBookmarked && (
                                              <button
                                                onClick={() => toggleBookmark({
                                                  id: sk.id || mainTitle,
                                                  name: mainTitle,
                                                  type: 'skill',
                                                  subtext: `${sk.domain || ''}`
                                                })}
                                                className="p-0.5 text-gray-400 hover:text-yellow-400 transition cursor-pointer shrink-0"
                                                title={isBookmarked(sk.id || mainTitle, 'skill') ? 'Remove bookmark' : 'Bookmark topic'}
                                              >
                                                <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(sk.id || mainTitle, 'skill') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                              </button>
                                            )}
                                          </div>

                                          {/* COVERED SKILLS SLIDING DRAWER TOGGLE */}
                                          {Array.isArray(sk.skills) && sk.skills.length > 0 && (
                                            <div className="pt-1">
                                              <button
                                                type="button"
                                                onClick={() => setExpandedCardIds(prev => ({ ...prev, [skillKey]: !prev[skillKey] }))}
                                                className={`px-2 py-0.5 text-[9.5px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 rounded-xs border ${
                                                  expandedCardIds[skillKey]
                                                    ? (isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-950/80 text-amber-200 border-amber-500/50')
                                                    : (isLight ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' : 'bg-[#151c28] text-amber-400/90 border-[#2d3a52] hover:border-amber-500/50 hover:text-amber-300')
                                                }`}
                                                title={expandedCardIds[skillKey] ? "Hide covered skills" : "View covered skills"}
                                              >
                                                <ChevronRight className={`w-3 h-3 text-amber-400 transition-transform duration-300 ${expandedCardIds[skillKey] ? 'rotate-90' : ''}`} />
                                                <span>Covered Skills ({sk.skills.length})</span>
                                              </button>

                                              <AnimatePresence>
                                                {expandedCardIds[skillKey] && (
                                                  <motion.div
                                                    initial={{ opacity: 0, height: 0, x: -10 }}
                                                    animate={{ opacity: 1, height: 'auto', x: 0 }}
                                                    exit={{ opacity: 0, height: 0, x: -10 }}
                                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                                    className="mt-2 p-2 bg-amber-950/40 border-l-2 border-amber-400/80 space-y-1 overflow-hidden rounded-r-xs"
                                                  >
                                                    <span className="text-[8.5px] font-mono font-bold uppercase text-amber-400/80 block">
                                                      Skills covered in this topic:
                                                    </span>
                                                    <div className="flex flex-wrap gap-1">
                                                      {sk.skills.map((skillName: string, idx: number) => (
                                                        <span
                                                          key={idx}
                                                          className="px-1.5 py-0.5 text-[9px] font-mono bg-amber-500/15 text-amber-200 border border-amber-500/30 rounded-xs"
                                                        >
                                                          {skillName}
                                                        </span>
                                                      ))}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          )}
                                        </div>

                                        {/* Action Links */}
                                        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                                          <a
                                            href={getPortalCourseDirectUrl(activePortal.name, mainTitle, sk.url || sk.officialUrl)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[9.5px] text-amber-400 hover:text-white font-bold flex items-center gap-1 transition uppercase"
                                          >
                                            Course Link <ExternalLink className="w-2.5 h-2.5" />
                                          </a>

                                          <a
                                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activePortal.name + ' ' + mainTitle + ' tutorial')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[9.5px] text-red-400 hover:text-white font-bold flex items-center gap-1 transition uppercase"
                                            title={`Search YouTube video lessons for ${activePortal.name} ${mainTitle}`}
                                          >
                                            <Youtube className="w-2.5 h-2.5 text-red-500" /> YouTube
                                          </a>
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>
                      )}
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

    </div>
  );
}
