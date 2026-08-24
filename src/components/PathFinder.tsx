import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ALL_ROLES_DATA, RoleDetail, IT_DOMAINS } from '../data/rolesData';
import { CERTIFICATIONS_LIBRARY, SKILLS_LIBRARY, TOOLS_LIBRARY } from '../data/librariesData';
import { RECOMMENDED_BOOKS, RecommendedBook } from './LibrariesDashboard';
import { IT_TAXONOMY_DATA } from './ITTaxonomyExplorer';
import { 
  Compass, 
  BookOpen, 
  Clock, 
  Settings, 
  GraduationCap, 
  ChevronRight, 
  CornerDownRight, 
  Lightbulb, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  TrendingUp, 
  X, 
  Bookmark, 
  FileText, 
  Check, 
  RotateCcw, 
  DollarSign, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Flame,
  User,
  Menu,
  Youtube,
  Video,
  Shield,
  RefreshCw,
  Cpu
} from 'lucide-react';

export interface FallbackRoute {
  title: string;
  skillsAvailable: string[];
  missingSkills: string[];
  transitionTime: string;
  certCost: string;
  salaryRange: string;
  automationExposure: number; // percentage (0-100)
  jobAvailability: 'Very High' | 'High' | 'Medium' | 'Emerging';
  probability: number; // percentage (0-100)
  description: string;
}

export interface PrimaryProfile {
  id: string;
  title: string;
  description: string;
  symptom: string;
  automationExposure: number; // percentage (0-100)
  salaryRange: string;
  competition: 'Critical' | 'Very High' | 'High' | 'Medium';
  fallbackRoutes: FallbackRoute[];
}

export const getStudyLink = (skillName: string): string | null => {
  const normalized = skillName.toLowerCase().trim();

  // Try to find in Certifications
  const cert = CERTIFICATIONS_LIBRARY.find(c => 
    c.name.toLowerCase().includes(normalized) || 
    normalized.includes(c.name.toLowerCase()) ||
    (c.id && normalized.includes(c.id.toLowerCase()))
  );
  if (cert) return cert.officialLink || cert.freeYouTubeLink;

  // Try to find in Skills Library
  const skill = SKILLS_LIBRARY.find(s => 
    s.name.toLowerCase().includes(normalized) || 
    normalized.includes(s.name.toLowerCase())
  );
  if (skill) return skill.bestFreeTutorial;

  // Try to find in Tools Library
  const tool = TOOLS_LIBRARY.find(t => 
    t.name.toLowerCase().includes(normalized) || 
    normalized.includes(t.name.toLowerCase())
  );
  if (tool) return tool.freeResourceLink;

  // Specific custom overrides for all skills/gaps listed in FallbackRoutes
  const customMap: { [key: string]: string } = {
    // IT Support Fallback Skills & Gaps
    'it support experience': 'https://www.coursera.org/professional-certificates/google-it-support',
    'customer handling': 'https://www.youtube.com/results?search_query=it+support+customer+handling+skills',
    'sla compliance tracking': 'https://www.youtube.com/results?search_query=itil+sla+compliance+tutorial',
    'escalation workflows': 'https://www.youtube.com/results?search_query=itil+incident+escalation+workflows',
    'team scheduling': 'https://www.youtube.com/results?search_query=it+support+team+scheduling+best+practices',
    'incident response coordination': 'https://www.youtube.com/results?search_query=incident+response+management+itil',
    'performance metrics analysis': 'https://www.youtube.com/results?search_query=it+support+kpi+and+metrics',
    'coaching techniques': 'https://www.youtube.com/results?search_query=how+to+coach+it+support+agents',
    'client retention strategies': 'https://www.youtube.com/results?search_query=customer+success+manager+retention+strategies',
    'contract renewals management': 'https://www.youtube.com/results?search_query=customer+success+renewals+management',
    'saas subscription metrics': 'https://www.youtube.com/results?search_query=saas+metrics+arr+mrr+churn+explained',
    'quarterly business reviews': 'https://www.youtube.com/results?search_query=how+to+run+a+quarterly+business+review+qbr',
    'enterprise system design': 'https://www.youtube.com/results?search_query=system+design+basics+for+beginners',
    'aws/azure cloud practitioner knowledge': 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    'strategic business value scoping': 'https://www.youtube.com/results?search_query=itil+service+strategy+scoping',
    'executive presentation': 'https://www.youtube.com/results?search_query=executive+presentation+skills+for+technical+roles',
    'vendor management': 'https://www.youtube.com/results?search_query=it+vendor+management+best+practices',
    'change management frameworks (cab)': 'https://www.youtube.com/results?search_query=itil+change+management+cab+tutorial',
    'asset tracking tools': 'https://www.youtube.com/results?search_query=it+asset+management+tracking+best+practices',
    'disaster recovery runbooks': 'https://www.youtube.com/results?search_query=it+disaster+recovery+planning+runbook',
    'content taxonomies': 'https://www.youtube.com/results?search_query=information+architecture+and+content+taxonomies',
    'corporate wiki administration (confluence/notion)': 'https://www.atlassian.com/software/confluence/resources',
    'information architecture principles': 'https://www.youtube.com/results?search_query=information+architecture+principles',
    'seo/internal search tuning': 'https://www.youtube.com/results?search_query=internal+site+search+tuning+best+practices',
    'generative ai basics': 'https://cloud.google.com/learn/certification/generative-ai-fundamentals',
    'llm prompt debugging': 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    'chatbot intent matching': 'https://www.youtube.com/results?search_query=chatbot+intent+matching+and+nlp',
    'ai safety filter configuration': 'https://www.youtube.com/results?search_query=llm+safety+guardrails+and+moderation',
    'quality assurance methodologies': 'https://www.youtube.com/results?search_query=software+testing+and+qa+methodologies',
    'auditing frameworks': 'https://www.youtube.com/results?search_query=itil+quality+auditing+frameworks',
    'nps / csat correlation': 'https://www.youtube.com/results?search_query=nps+and+csat+correlation+support',
    'feedback delivery frameworks': 'https://www.youtube.com/results?search_query=how+to+give+constructive+feedback+to+support+agents',
    'instructional design models (addie)': 'https://www.youtube.com/results?search_query=addie+instructional+design+model',
    'lms (learning management system) setup': 'https://www.youtube.com/results?search_query=how+to+setup+a+learning+management+system+lms',
    'curriculum mapping': 'https://www.youtube.com/results?search_query=curriculum+mapping+best+practices+technical',
    'public workshop facilitation': 'https://www.youtube.com/results?search_query=technical+workshop+facilitation+skills',

    // Frontend Developer Fallback Skills & Gaps
    'understanding of software lifecycles': 'https://www.youtube.com/results?search_query=software+development+lifecycle+sdlc+explained',
    'technical vocabulary': 'https://www.youtube.com/results?search_query=technical+terms+for+product+managers',
    'ui validation metrics': 'https://www.youtube.com/results?search_query=ui+ux+usability+metrics',
    'bug reproduction': 'https://www.youtube.com/results?search_query=how+to+reproduce+and+document+software+bugs',
    'product analytics tools (amplitude/mixpanel)': 'https://amplitude.com/academy',
    'user feedback loop design': 'https://www.youtube.com/results?search_query=user+feedback+loops+product+management',
    'feature launch checklists': 'https://www.youtube.com/results?search_query=product+launch+strategy+checklist',
    'cross-functional operations mapping': 'https://www.youtube.com/results?search_query=cross+functional+collaboration+mapping',
    'ui design principles': 'https://www.youtube.com/results?search_query=ui+design+principles+tutorial',
    'data layout structure': 'https://www.youtube.com/results?search_query=json+and+xml+data+layout+structures',
    'api payload understanding': 'https://www.youtube.com/results?search_query=what+is+api+payload+rest+graphql',
    'logic workflows': 'https://www.youtube.com/results?search_query=how+to+map+logical+app+workflows',
    'enterprise no-code platforms (airtable, bubble, glide)': 'https://bubble.io/academy',
    'zapier/make complex automation loops': 'https://www.make.com/en/academy',
    'crm integrations': 'https://www.youtube.com/results?search_query=crm+and+api+integrations+no+code',
    'security permission scopes in visual tools': 'https://www.youtube.com/results?search_query=visual+development+security+and+permissions',
    'logical flow thinking': 'https://www.youtube.com/results?search_query=logical+thinking+in+software+engineering',
    'component modeling': 'https://www.youtube.com/results?search_query=software+component+modeling+and+architecture',
    'relational data views': 'https://www.youtube.com/results?search_query=relational+database+views+and+schemas',
    'javascript snippets': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'salesforce admin panel configuration': 'https://trailhead.salesforce.com/content/learn/trails/force_com_admin_beginner',
    'security rules & object scopes': 'https://trailhead.salesforce.com/content/learn/modules/data_security',
    'lightning web components (lwc) structure': 'https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components',
    'process builder / flow workflows': 'https://trailhead.salesforce.com/content/learn/modules/business_process_automation',
    'code reading skills': 'https://www.youtube.com/results?search_query=how+to+read+source+code+effectively',
    'markdown writing': 'https://www.markdownguide.org/',
    'ui layout comprehension': 'https://www.youtube.com/results?search_query=understanding+web+ui+layouts+wireframing',
    'api endpoint usage': 'https://www.youtube.com/results?search_query=how+to+use+api+endpoints+postman',
    'technical writing style standards': 'https://developers.google.com/tech-writing',
    'static site generators (docusaurus/hugo)': 'https://docusaurus.io/docs',
    'openapi spec (swagger) schemas': 'https://swagger.io/specification/',
    'developer experience guidelines': 'https://www.youtube.com/results?search_query=developer+experience+dx+best+practices',

    // QA Manual Tester Fallback Skills & Gaps
    'structured checklist auditing': 'https://www.youtube.com/results?search_query=qa+manual+testing+checklist+auditing',
    'evidence collection': 'https://www.youtube.com/results?search_query=qa+bug+reporting+evidence+collection',
    'edge-case identification': 'https://www.youtube.com/results?search_query=how+to+find+edge+cases+in+software+testing',
    'attention to detail': 'https://www.youtube.com/results?search_query=improving+attention+to+detail+in+qa+testing',
    'security standards (soc-2, iso 27001, gdpr)': 'https://www.coursera.org/learn/information-security-standards',
    'risk assessment methodologies': 'https://www.youtube.com/results?search_query=it+security+risk+assessment+methodology',
    'vulnerability logs reviewing': 'https://www.youtube.com/results?search_query=how+to+read+and+analyze+vulnerability+scans',
    'governance framework documentation': 'https://www.youtube.com/results?search_query=grc+governance+risk+compliance+frameworks',
    'troubleshooting skills': 'https://www.youtube.com/results?search_query=it+support+troubleshooting+methodology',
    'reproducing complex bugs': 'https://www.youtube.com/results?search_query=how+to+isolate+and+reproduce+complex+software+bugs',
    'clear technical writing': 'https://developers.google.com/tech-writing',
    'test-plan context': 'https://www.youtube.com/results?search_query=how+to+write+a+software+test+plan',
    'client management protocols': 'https://www.youtube.com/results?search_query=customer+success+management+client+protocols',
    'live support triage tools (zendesk/intercom)': 'https://www.youtube.com/results?search_query=zendesk+customer+support+triage+tutorial',
    'sla escalation timelines': 'https://www.youtube.com/results?search_query=sla+and+service+level+agreements+ticketing',
    'database query debugging': 'https://www.youtube.com/results?search_query=sql+debugging+and+query+optimization',
    'scrutinizing feature specifications': 'https://www.youtube.com/results?search_query=how+to+analyze+product+requirement+documents+prd',
    'user story validation': 'https://www.youtube.com/results?search_query=how+to+validate+user+stories+agile',
    'system behavior documentation': 'https://www.youtube.com/results?search_query=how+to+document+system+behaviors',
    'logical flow charts': 'https://www.lucidchart.com/pages/how-to-draw-a-flowchart',
    'business process modeling (bpmn)': 'https://www.youtube.com/results?search_query=bpmn+2.0+tutorial+for+beginners',
    'requirements gathering strategies': 'https://www.youtube.com/results?search_query=requirements+gathering+techniques+business+analysis',
    'sql queries for business metrics': 'https://www.youtube.com/results?search_query=sql+queries+for+business+analysts+kpis',
    'user stories drafting (agile)': 'https://www.youtube.com/results?search_query=how+to+write+perfect+agile+user+stories',
    'regression metrics validation': 'https://www.youtube.com/results?search_query=software+regression+testing+metrics',
    'feature testing': 'https://www.youtube.com/results?search_query=how+to+test+new+software+features+manually',
    'acceptance criteria verification': 'https://www.youtube.com/results?search_query=how+to+verify+acceptance+criteria+in+jira',
    'process tracking': 'https://www.youtube.com/results?search_query=agile+process+tracking+burndown+charts',
    'sprint planning workflows': 'https://www.youtube.com/results?search_query=scrum+sprint+planning+meeting+tutorial',
    'product backlog prioritization models': 'https://www.youtube.com/results?search_query=backlog+prioritization+techniques+rice+moscow',
    'strategic product vision': 'https://www.youtube.com/results?search_query=how+to+define+and+communicate+product+vision',
    'stakeholder alignment': 'https://www.youtube.com/results?search_query=managing+stakeholder+expectations+product+owner',

    // Prompt Engineer Fallback Skills & Gaps
    'llm output evaluation': 'https://www.youtube.com/results?search_query=evaluating+llm+outputs+rag+triad',
    'prompt adjustment logic': 'https://www.youtube.com/results?search_query=llm+prompt+engineering+techniques',
    'conversational design': 'https://www.youtube.com/results?search_query=conversational+ux+ui+design+for+ai',
    'ai behavior tuning': 'https://www.youtube.com/results?search_query=fine+tuning+vs+prompting+llm+behaviors',
    'structured client ticket handling': 'https://www.youtube.com/results?search_query=helpdesk+ticket+handling+best+practices',
    'api rate-limit configuration': 'https://www.youtube.com/results?search_query=api+rate+limiting+strategies+and+configurations',
    'zendesk / help desk system integration': 'https://www.youtube.com/results?search_query=integrating+ai+chatbots+with+zendesk',
    'ai safety filter setup': 'https://www.youtube.com/results?search_query=llm+safety+guardrails+nemo+guardrails',
    'prompt structuring': 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    'flow charts & logical design': 'https://www.youtube.com/results?search_query=how+to+design+system+flowcharts',
    'ai text processing': 'https://www.youtube.com/results?search_query=nlp+natural+language+processing+basics',
    'web service basics': 'https://www.youtube.com/results?search_query=how+web+servers+and+apis+work',
    'zapier/make platform architectures': 'https://www.make.com/en/academy',
    'webhook setups': 'https://www.youtube.com/results?search_query=what+is+a+webhook+and+how+to+configure+it',
    'oauth authorization connections': 'https://www.youtube.com/results?search_query=oauth2+explained+simply+for+developers',
    'database schema layouts': 'https://www.youtube.com/results?search_query=relational+database+schema+design+basics',
    'generative ai knowledge': 'https://aws.amazon.com/certification/certified-ai-practitioner/',
    'prompt debugging': 'https://www.youtube.com/results?search_query=prompt+debugging+and+refining+techniques',
    'model api constraints': 'https://www.youtube.com/results?search_query=understanding+llm+api+rate+limits+and+context+windows',
    'enterprise client advisory protocols': 'https://www.youtube.com/results?search_query=it+consulting+client+advisory+best+practices',
    'it service delivery lifecycles': 'https://www.youtube.com/results?search_query=itil+service+lifecycle+overview',
    'sla contracts': 'https://www.youtube.com/results?search_query=sla+and+service+level+agreements+explained',
    'executive scoping presentations': 'https://www.youtube.com/results?search_query=scoping+ai+projects+for+executives'
  };

  const directMatch = customMap[normalized];
  if (directMatch) return directMatch;

  // Search by YouTube query fallback if nothing else
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName + ' tutorial')}`;
};

export const FALLBACK_PROFILES: PrimaryProfile[] = [
  {
    id: 'it-support',
    title: 'IT Support & Technical Helpdesk',
    description: 'Frontline ticketing, workstation provisioning, general customer troubleshooting, and network diagnostics.',
    symptom: 'Highly vulnerable to voice and text LLM support agents. High ticket density makes it easily targetable for automation. Junior entry markets are highly overcrowded, putting downward pressure on salaries.',
    automationExposure: 72,
    salaryRange: '$45,000 - $65,000 / ₹3.5L - ₹6.5L',
    competition: 'Very High',
    fallbackRoutes: [
      {
        title: 'Service Desk Team Leader',
        skillsAvailable: ['IT support experience', 'Customer handling', 'SLA compliance tracking', 'Escalation workflows'],
        missingSkills: ['Team scheduling', 'Incident response coordination', 'Performance metrics analysis', 'Coaching techniques'],
        transitionTime: '3 - 4 weeks',
        certCost: '$150 USD (ITIL v4 Foundation)',
        salaryRange: '$65,000 - $85,000 / ₹6.5L - ₹10L',
        automationExposure: 25,
        jobAvailability: 'High',
        probability: 95,
        description: 'Supervise ticket distribution, lead support dispatch workflows, manage daily shift handovers, and track queue performance.'
      },
      {
        title: 'Customer Success Manager',
        skillsAvailable: ['Customer handling', 'Problem solving', 'Communication skills', 'Technical explanation'],
        missingSkills: ['Client retention strategies', 'Contract renewals management', 'SaaS subscription metrics', 'Quarterly business reviews'],
        transitionTime: '4 - 6 weeks',
        certCost: '$0 USD (Self-paced SaaS certifications)',
        salaryRange: '$75,000 - $115,000 / ₹8L - ₹14L',
        automationExposure: 15,
        jobAvailability: 'Very High',
        probability: 88,
        description: 'Establish long-term post-sale customer partnerships, facilitate software adoption, prevent churn, and drive platform subscription upgrades.'
      },
      {
        title: 'Technical Account Manager (TAM)',
        skillsAvailable: ['Deep IT support context', 'Problem solving', 'Client-facing interaction', 'Root-cause analysis'],
        missingSkills: ['Enterprise system design', 'AWS/Azure Cloud Practitioner knowledge', 'Strategic business value scoping', 'Executive presentation'],
        transitionTime: '6 - 8 weeks',
        certCost: '$150 USD (AWS Cloud Practitioner / CompTIA Cloud+)',
        salaryRange: '$90,000 - $140,000 / ₹10L - ₹18L',
        automationExposure: 18,
        jobAvailability: 'High',
        probability: 85,
        description: 'Serve as a dedicated technical advisor for high-value enterprise accounts, advising on architecture stability and performance optimizations.'
      },
      {
        title: 'IT Operations Coordinator',
        skillsAvailable: ['Team coordination', 'Hardware inventory', 'Troubleshooting workflow', 'Incident handovers'],
        missingSkills: ['Vendor management', 'Change management frameworks (CAB)', 'Asset tracking tools', 'Disaster recovery runbooks'],
        transitionTime: '4 - 5 weeks',
        certCost: '$100 USD (CAPM or Certified Associate in Project Management)',
        salaryRange: '$60,000 - $90,000 / ₹6L - ₹11L',
        automationExposure: 20,
        jobAvailability: 'High',
        probability: 90,
        description: 'Govern physical device supply chains, coordinate workspace technology migrations, schedule vendor updates, and track IT asset lifecycles.'
      },
      {
        title: 'Knowledge Management Specialist',
        skillsAvailable: ['Support ticketing insights', 'Technical explanation', 'Common issue cataloging', 'Resolution scripts'],
        missingSkills: ['Content taxonomies', 'Corporate Wiki administration (Confluence/Notion)', 'Information architecture principles', 'SEO/Internal Search tuning'],
        transitionTime: '4 - 6 weeks',
        certCost: '$0 USD (Confluence documentation paths)',
        salaryRange: '$58,000 - $80,000 / ₹5.5L - ₹9L',
        automationExposure: 30,
        jobAvailability: 'Medium',
        probability: 82,
        description: 'Synthesize standard operating procedures (SOPs), structure corporate internal documentation portals, and curate user self-help libraries.'
      },
      {
        title: 'AI Support Specialist',
        skillsAvailable: ['IT troubleshooting', 'Chat response handling', 'Customer tone moderation', 'Ticketing workflow'],
        missingSkills: ['Generative AI basics', 'LLM prompt debugging', 'Chatbot intent matching', 'AI safety filter configuration'],
        transitionTime: '3 - 5 weeks',
        certCost: '$50 USD (Google Cloud Generative AI Basics / Custom certifications)',
        salaryRange: '$65,000 - $95,000 / ₹7L - ₹12L',
        automationExposure: 22,
        jobAvailability: 'Very High',
        probability: 92,
        description: 'Analyze automated LLM customer service transcripts, refine model prompt boundaries, patch conversational flow gaps, and correct AI support errors.'
      },
      {
        title: 'Quality Analyst (ITSM)',
        skillsAvailable: ['IT support experience', 'Customer handling', 'SLA metrics', 'Call/Chat ticketing context'],
        missingSkills: ['Quality assurance methodologies', 'Auditing frameworks', 'NPS / CSAT correlation', 'Feedback delivery frameworks'],
        transitionTime: '4 - 6 weeks',
        certCost: '$150 USD (Six Sigma Yellow Belt or Quality Assurance Certified)',
        salaryRange: '$60,000 - $88,000 / ₹6L - ₹11L',
        automationExposure: 35,
        jobAvailability: 'High',
        probability: 89,
        description: 'Audit ticket logs and chat transcripts for process accuracy, grade customer interactions, compile quality analytics reports, and coach agents.'
      },
      {
        title: 'Training and Process Development Lead',
        skillsAvailable: ['Customer handling', 'Team coordination', 'IT support mastery', 'Process adherence'],
        missingSkills: ['Instructional design models (ADDIE)', 'LMS (Learning Management System) setup', 'Curriculum mapping', 'Public workshop facilitation'],
        transitionTime: '5 - 7 weeks',
        certCost: '$120 USD (ATD Training Certificate or equivalent)',
        salaryRange: '$65,000 - $98,000 / ₹7L - ₹13L',
        automationExposure: 12,
        jobAvailability: 'High',
        probability: 87,
        description: 'Create technical training programs, design step-by-step onboarding bootcamps, and build learning content for support agents.'
      }
    ]
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Web Developer',
    description: 'Writing React/Vue markup, styling layouts with CSS frameworks, and integrating backend REST/GraphQL APIs.',
    symptom: 'Highly impacted by AI front-end builders and UI generators that convert screenshots directly into functional code. Extreme saturation at the junior level with intense global competition.',
    automationExposure: 65,
    salaryRange: '$60,000 - $110,000 / ₹5.0L - ₹12L',
    competition: 'Critical',
    fallbackRoutes: [
      {
        title: 'Product Operations Specialist',
        skillsAvailable: ['Understanding of software lifecycles', 'Technical vocabulary', 'UI validation metrics', 'Bug reproduction'],
        missingSkills: ['Product analytics tools (Amplitude/Mixpanel)', 'User feedback loop design', 'Feature launch checklists', 'Cross-functional operations mapping'],
        transitionTime: '6 - 8 weeks',
        certCost: '$0 USD (Product School / self-taught frameworks)',
        salaryRange: '$85,000 - $125,000 / ₹8L - ₹15L',
        automationExposure: 15,
        jobAvailability: 'High',
        probability: 80,
        description: 'Bridge the gap between engineering, customer success, and product teams. Manage product telemetry, set up trial analytics, and optimize launch operations.'
      },
      {
        title: 'No-Code / Citizen Developer Architect',
        skillsAvailable: ['UI design principles', 'Data layout structure', 'API payload understanding', 'Logic workflows'],
        missingSkills: ['Enterprise No-code platforms (Airtable, Bubble, Glide)', 'Zapier/Make complex automation loops', 'CRM integrations', 'Security permission scopes in visual tools'],
        transitionTime: '3 - 4 weeks',
        certCost: '$50 USD (Bubble Certified Developer or similar)',
        salaryRange: '$75,000 - $115,000 / ₹7L - ₹14L',
        automationExposure: 18,
        jobAvailability: 'Very High',
        probability: 88,
        description: 'Rapidly construct internal applications, digital workflows, and prototype products for businesses without writing manual CSS/Javascript code.'
      },
      {
        title: 'Salesforce CRM Administrator',
        skillsAvailable: ['Logical flow thinking', 'Component modeling', 'Relational data views', 'JavaScript snippets'],
        missingSkills: ['Salesforce admin panel configuration', 'Security rules & object scopes', 'Lightning Web Components (LWC) structure', 'Process Builder / Flow workflows'],
        transitionTime: '5 - 7 weeks',
        certCost: '$200 USD (Salesforce Certified Administrator)',
        salaryRange: '$90,000 - $140,000 / ₹9L - ₹18L',
        automationExposure: 10,
        jobAvailability: 'Very High',
        probability: 85,
        description: 'Configure and maintain enterprise-wide customer relationship management systems, user roles, security scopes, custom fields, and automated marketing integrations.'
      },
      {
        title: 'Technical Writer / API Documenter',
        skillsAvailable: ['Code reading skills', 'Markdown writing', 'UI layout comprehension', 'API endpoint usage'],
        missingSkills: ['Technical writing style standards', 'Static site generators (Docusaurus/Hugo)', 'OpenAPI Spec (Swagger) schemas', 'Developer experience guidelines'],
        transitionTime: '4 - 6 weeks',
        certCost: '$0 USD (Google Technical Writing course)',
        salaryRange: '$60,000 - $100,000 / ₹6L - ₹11L',
        automationExposure: 25,
        jobAvailability: 'Medium',
        probability: 82,
        description: 'Author developer portals, document REST/GraphQL APIs, create walk-through guides, and refine user-facing onboarding documentation.'
      }
    ]
  },
  {
    id: 'qa-tester',
    title: 'QA Manual Tester / Test Analyst',
    description: 'Executing exploratory test plans, writing test scripts, documenting edge-case bugs, and conducting regression cycles.',
    symptom: 'Manual exploratory testing is quickly being automated by autonomous AI agent frameworks and unified testing systems. Limited scaling options without writing massive automation codebases.',
    automationExposure: 80,
    salaryRange: '$50,000 - $80,000 / ₹4.5L - ₹9L',
    competition: 'Critical',
    fallbackRoutes: [
      {
        title: 'Systems Compliance Analyst (GRC)',
        skillsAvailable: ['Structured checklist auditing', 'Evidence collection', 'Edge-case identification', 'Attention to detail'],
        missingSkills: ['Security standards (SOC-2, ISO 27001, GDPR)', 'Risk assessment methodologies', 'Vulnerability logs reviewing', 'Governance framework documentation'],
        transitionTime: '6 - 8 weeks',
        certCost: '$300 USD (ISACA CISA or CompTIA Security+)',
        salaryRange: '$80,000 - $120,000 / ₹8L - ₹15L',
        automationExposure: 12,
        jobAvailability: 'High',
        probability: 87,
        description: 'Audit corporate IT infrastructure processes against strict security standards, document compliance gaps, gather audit evidence, and guide mitigation plans.'
      },
      {
        title: 'Customer Success Support Engineer',
        skillsAvailable: ['Troubleshooting skills', 'Reproducing complex bugs', 'Clear technical writing', 'Test-plan context'],
        missingSkills: ['Client management protocols', 'Live support triage tools (Zendesk/Intercom)', 'SLA escalation timelines', 'Database query debugging'],
        transitionTime: '3 - 4 weeks',
        certCost: '$0 USD',
        salaryRange: '$68,000 - $95,000 / ₹6L - ₹11L',
        automationExposure: 18,
        jobAvailability: 'Very High',
        probability: 92,
        description: 'Triage high-severity client technical complaints, replicate and isolate enterprise bugs, write workarounds, and bridge the customer success loop with engineering.'
      },
      {
        title: 'Business Analyst',
        skillsAvailable: ['Scrutinizing feature specifications', 'User story validation', 'System behavior documentation', 'Logical flow charts'],
        missingSkills: ['Business process modeling (BPMN)', 'Requirements gathering strategies', 'SQL queries for business metrics', 'User stories drafting (Agile)'],
        transitionTime: '6 - 8 weeks',
        certCost: '$200 USD (IIBA Certified Business Analysis Assistant)',
        salaryRange: '$75,000 - $115,000 / ₹7L - ₹13L',
        automationExposure: 20,
        jobAvailability: 'High',
        probability: 84,
        description: 'Synthesize stakeholders\' business requests into crystal-clear product specification sheets and user stories for engineering sprints.'
      },
      {
        title: 'Associate Product Owner',
        skillsAvailable: ['Regression metrics validation', 'Feature testing', 'Acceptance criteria verification', 'Process tracking'],
        missingSkills: ['Sprint planning workflows', 'Product backlog prioritization models', 'Strategic product vision', 'Stakeholder alignment'],
        transitionTime: '8 - 10 weeks',
        certCost: '$150 USD (Professional Scrum Product Owner - PSPO I)',
        salaryRange: '$85,000 - $130,000 / ₹9L - ₹16L',
        automationExposure: 15,
        jobAvailability: 'High',
        probability: 78,
        description: 'Manage and prioritize team sprint backlogs, define and clear acceptance criteria, and run user acceptance testing (UAT) cycles before software releases.'
      }
    ]
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer / AI Writer',
    description: 'Drafting generative AI prompt structures, evaluating LLM model outputs, and designing chatbot scripts.',
    symptom: 'Highly volatile standalone career. Native models increasingly optimize their own prompts under the hood, and autonomous agent platforms are replacing basic prompt-writing tasks.',
    automationExposure: 88,
    salaryRange: '$70,000 - $130,000 / ₹6.0L - ₹14L',
    competition: 'Critical',
    fallbackRoutes: [
      {
        title: 'AI Support Specialist',
        skillsAvailable: ['LLM output evaluation', 'Prompt adjustment logic', 'Conversational design', 'AI behavior tuning'],
        missingSkills: ['Structured client ticket handling', 'API rate-limit configuration', 'Zendesk / Help Desk system integration', 'AI safety filter setup'],
        transitionTime: '2 - 3 weeks',
        certCost: '$0 USD',
        salaryRange: '$65,000 - $95,000 / ₹6L - ₹11L',
        automationExposure: 25,
        jobAvailability: 'Very High',
        probability: 94,
        description: 'Triage user issues with enterprise AI systems, inspect and tune live prompts, correct generative API errors, and audit conversational quality.'
      },
      {
        title: 'No-Code Automation Integrator',
        skillsAvailable: ['Prompt structuring', 'Flow charts & logical design', 'AI text processing', 'Web service basics'],
        missingSkills: ['Zapier/Make platform architectures', 'Webhook setups', 'OAuth authorization connections', 'Database schema layouts'],
        transitionTime: '3 - 4 weeks',
        certCost: '$50 USD (Make.com Certification)',
        salaryRange: '$75,000 - $110,000 / ₹7L - ₹13L',
        automationExposure: 18,
        jobAvailability: 'Very High',
        probability: 90,
        description: 'Build enterprise visual automation triggers connecting systems like Gmail, Slack, and Databases with LLM model prompts for automatic processes.'
      },
      {
        title: 'Technical Account Manager (AI Focus)',
        skillsAvailable: ['Generative AI knowledge', 'Prompt debugging', 'Model API constraints', 'Technical explanation'],
        missingSkills: ['Enterprise client advisory protocols', 'IT service delivery lifecycles', 'SLA contracts', 'Executive scoping presentations'],
        transitionTime: '6 - 8 weeks',
        certCost: '$150 USD (AWS Certified AI Practitioner)',
        salaryRange: '$95,000 - $145,000 / ₹10L - ₹19L',
        automationExposure: 15,
        jobAvailability: 'High',
        probability: 80,
        description: 'Consult enterprise accounts on how to configure model API boundaries, debug operational LLM prompt structures, and scale AI pipelines safely.'
      }
    ]
  }
];

interface PathFinderProps {
  onSelectRole: (roleId: string) => void;
  isHighlighted?: boolean;
  onScrollToSection?: (sectionId: string) => void;
  theme?: 'dark' | 'light';
  savedPathways?: any[];
  setSavedPathways?: React.Dispatch<React.SetStateAction<any[]>>;
  restoredPathway?: any;
}

interface DropdownOption {
  id: string;
  title: string;
  domain?: string;
  level?: string;
  icon?: string;
}

interface SearchableDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: DropdownOption[];
  colorClass?: string;
  isLight?: boolean;
}

function SearchableDropdown({ value, onChange, options, colorClass = "text-[#10b981]", isLight = false }: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofocus search input when dropdown is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const selectedOption = options.find(o => o.id === value);

  const filteredOptions = options.filter(o => {
    const sLower = search.toLowerCase();
    const titleMatch = o.title.toLowerCase().includes(sLower);
    const domainMatch = o.domain ? o.domain.toLowerCase().includes(sLower) : false;
    const levelMatch = o.level ? o.level.toLowerCase().includes(sLower) : false;
    return titleMatch || domainMatch || levelMatch;
  });

  const handleSelect = (id: string) => {
    onChange(id);
    setIsOpen(false);
    setSearch("");
  };


  return (
    <div className="relative w-full z-10" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#05070c] border-[#slate-700]'} border text-xs ${colorClass} p-2.5 focus:outline-none focus:border-current cursor-pointer flex items-center justify-between text-left`}
      >
        <span className="truncate pr-4">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="mr-1.5">{selectedOption.icon}</span>}
              {!selectedOption.icon && selectedOption.domain && (
                <span className="text-gray-500 font-normal mr-1 select-none">[{selectedOption.domain}]</span>
              )}
              <strong className={`${isLight ? 'text-slate-900' : 'text-white'} font-semibold`}>{selectedOption.title}</strong>
              {selectedOption.level && (
                <span className="text-gray-400 font-normal text-[10px] ml-1 select-none">({selectedOption.level})</span>
              )}
            </>
          ) : (
            <span className="text-slate-500">Select an option...</span>
          )}
        </span>
        <span className="text-slate-500 text-[10px] shrink-0 font-bold ml-1">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 mt-1 ${isLight ? 'bg-white border-slate-300' : 'bg-[#090e1a] border-slate-700'} border-2 shadow-2xl z-50 flex flex-col max-h-80 select-none`}>
          <div className={`p-2 border-b ${isLight ? 'border-slate-250 bg-slate-50' : 'border-slate-800 bg-black/60'} flex items-center`}>
            <span className="text-gray-400 mr-2 text-xs">🔍</span>
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to filter roles instantly..."
              className={`w-full bg-transparent border-0 text-xs ${isLight ? 'text-slate-800 placeholder-slate-400' : 'text-white placeholder-slate-500'} focus:outline-none font-mono`}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsOpen(false);
                } else if (e.key === 'Enter') {
                  if (filteredOptions.length > 0) {
                    handleSelect(filteredOptions[0].id);
                  }
                }
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-gray-500 hover:text-white text-xs px-1.5 font-mono cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1 max-h-60 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-xs text-gray-500 text-center font-mono">No matching roles found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.id === value;
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`p-2.5 text-xs font-mono cursor-pointer transition flex flex-col border-b last:border-0 ${
                      isLight ? 'border-slate-100' : 'border-slate-900/40'
                    } ${
                      isSelected 
                        ? (isLight ? "bg-emerald-50 text-emerald-700 font-bold border-l-2 border-l-emerald-500" : "bg-[#10b981]/15 text-[#10b981] font-bold border-l-2 border-l-[#10b981]") 
                        : (isLight ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900" : "text-gray-300 hover:bg-slate-800/60 hover:text-white")
                    }`}
                  >
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {option.icon && <span>{option.icon}</span>}
                      <span className={`${isSelected ? 'text-[#10b981]' : (isLight ? 'text-slate-800 font-medium' : 'text-slate-100 font-medium')}`}>{option.title}</span>
                      {option.level && (
                        <span className={`text-[9px] ${isLight ? 'text-slate-600 bg-slate-100' : 'text-gray-400 bg-slate-950'} px-1 py-0.5 font-bold rounded tracking-wider`}>
                          {option.level.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {option.domain && (
                      <span className={`text-[9px] ${isLight ? 'text-slate-500' : 'text-gray-500'} mt-1 uppercase tracking-tight block`}>
                        ➔ {option.domain}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Map common start roles to initial checklists
const START_SKILLS_MAP: Record<string, string[]> = {
  'career-switcher': [],
  'non-tech': ['Customer support'],
  'it-support-analyst': ['Windows troubleshooting', 'Customer support', 'Active Directory'],
  'desktop-support-engineer': ['Windows troubleshooting', 'Customer support'],
  'technical-support-specialist': ['Windows troubleshooting', 'Active Directory'],
  'network-support-engineer': ['Networking basics', 'DNS/DHCP'],
  'noc-analyst': ['Networking basics', 'Linux basics'],
  'network-administrator': ['Networking basics', 'DNS/DHCP', 'Active Directory'],
  'network-engineer': ['Networking basics', 'DNS/DHCP'],
  'cloud-support-associate': ['Linux basics', 'Networking basics'],
  'azure-administrator': ['Active Directory', 'DNS/DHCP'],
  'aws-cloud-practitioner': ['Networking basics', 'Linux basics'],
  'cloud-engineer': ['Linux basics', 'Networking basics'],
  'cloud-operations-analyst': ['Linux basics', 'Windows troubleshooting'],
  'soc-analyst': ['Cybersecurity basics', 'Networking basics'],
  'cybersecurity-analyst': ['Cybersecurity basics', 'Linux basics'],
  'grc-analyst': ['Cybersecurity basics'],
  'data-analyst': ['SQL fundamentals', 'Excel pivots'],
  'sql-analyst': ['SQL fundamentals'],
  'power-bi-developer': ['Excel pivots', 'SQL fundamentals'],
  'bi-analyst': ['Excel pivots', 'SQL fundamentals'],
  'reporting-analyst': ['Excel pivots']
};

const DOMAIN_CORE_TECH_MAP: Record<string, string[]> = {
  'green-computing': [
    'Green Software Engineering',
    'Energy-Efficient Hardware',
    'Sustainable Cloud Computing',
    'AI for Climate Solutions',
    'E-Waste Management'
  ],
  'it-support': [
    'Service Desk & Incident Management',
    'Hardware & OS Troubleshooting',
    'Active Directory & Identity Access',
    'Enterprise Mobility Management (MDM)',
    'Asset Lifecycle Management'
  ],
  'systems-infra': [
    'Windows & Active Directory Administration',
    'Linux & Unix Systems Administration',
    'Virtualization & Hypervisors',
    'Enterprise Storage',
    'Bare Metal & Hardware Provisioning'
  ],
  'networking': [
    'Routing & Switching Protocols',
    'Network Security (Firewalls, VPNs)',
    'Wireless & Mobile Connectivity',
    'Network Automation (NetDevOps)',
    'NOC Monitoring & Traffic Analysis'
  ],
  'cloud': [
    'Multi-Cloud Solutions',
    'Cloud Infrastructure as Code (IaC)',
    'Serverless & Container Orchestration',
    'Cloud Cost Optimization (FinOps)',
    'Hybrid & Edge Cloud Architectures'
  ],
  'cybersecurity': [
    'SecOps & Incident Response (SIEM/SOAR)',
    'Penetration Testing & Vulnerability',
    'Identity & Access Management (IAM)',
    'Governance, Risk & Compliance (GRC)',
    'Cloud & Network Security'
  ],
  'software-dev': [
    'Full-Stack Web Development',
    'Backend & Distributed API Architectures',
    'Mobile App Development',
    'Software Design Patterns & Algorithms',
    'Systems Programming (Rust, Go, C++)'
  ],
  'qa-testing': [
    'Test Automation Frameworks',
    'Manual QA & Exploratory Testing',
    'Performance & Load Testing',
    'API & Security Testing',
    'CI/CD Quality Gate Integration'
  ],
  'devops-sre': [
    'Continuous Integration / Continuous Deployment (CI/CD)',
    'Infrastructure as Code (Terraform, Ansible)',
    'Kubernetes & Container Orchestration',
    'Observability & Telemetry (Prometheus, Grafana)',
    'Site Reliability Engineering (SRE)'
  ],
  'data-analytics': [
    'SQL & Relational Databases',
    'Data Warehousing & ETL/ELT Pipelines',
    'Business Intelligence & Dashboard Design',
    'Big Data Processing',
    'Data Modeling & Analytics Engineering'
  ],
  'data-science-ai': [
    'Machine Learning & Deep Learning Models',
    'Generative AI & Large Language Models (LLMs)',
    'Data Science & Statistical Analysis',
    'MLOps & Model Deployment',
    'Natural Language Processing & Computer Vision'
  ],
  'db-admin': [
    'Database Performance Tuning & Optimization',
    'High Availability & Replication Systems',
    'Database Backup & Disaster Recovery',
    'SQL Dialect Scripting & Automation',
    'NoSQL & Distributed Datastores'
  ],
  'it-ops-itsm': [
    'ITIL Service Lifecycle Management',
    'ITSM Platforms (ServiceNow, Jira)',
    'SLA & Operational Metric Management',
    'Crisis & Major Incident Management',
    'Process Automation & Workflow Orchestration'
  ],
  'erp-crm': [
    'SAP Module ERP Administration & Dev',
    'Salesforce CRM Customization & Workflows',
    'Enterprise Integration & Middleware',
    'ERP Cloud Transitions',
    'Business Process Ledger Mapping'
  ],
  'product-mgmt': [
    'Product Discovery & Strategy',
    'Agile, Scrum & Kanban Orchestration',
    'Technical Program Management (TPM)',
    'Backlog Grooming & Sprint Planning',
    'Release Management & Delivery Metrics'
  ],
  'business-analysis': [
    'Requirements Gathering & Functional Specs',
    'Business Process Modeling (BPMN)',
    'Solutions Consulting & Pre-sales Analysis',
    'Stakeholder Management & Strategy',
    'Enterprise Architecture Mapping'
  ],
  'uiux-design': [
    'User Interface (UI) Design Systems',
    'User Experience (UX) Research & Mapping',
    'Interaction Design & Wireframing',
    'Prototyping & Usability Testing',
    'Creative Tech & Frontend Prototyping'
  ],
  'web-cms': [
    'Content Management Systems',
    'E-Commerce Platforms (Shopify, Magento)',
    'Technical Search Engine Optimization (SEO)',
    'Frontend Layouts & Landing Pages Optimization',
    'Digital Asset & Brand Management'
  ],
  'automation-rpa': [
    'Robotic Process Automation (RPA)',
    'Low-Code / No-Code Apps (PowerApps, OutSystems)',
    'Workflow Automation (n8n, Make, Zapier)',
    'API Integration & Micro-Automations',
    'Enterprise Process Mining & Analysis'
  ],
  'tech-writing': [
    'API Documentation & Developer Portals',
    'Technical Editing & Proofreading',
    'Corporate Knowledge Base (Confluence, Wiki)',
    'Markdown & Docs-as-Code Workflows',
    'User Guides & Onboarding Manuals'
  ],
  'sales-customer-success': [
    'Pre-Sales Engineering & Tech Demos',
    'Customer Success Platforms',
    'Product Integration & Onboarding',
    'Solutions Architecture & RFPs',
    'Telemetry & Usage Analytics'
  ],
  'hardware-iot': [
    'Embedded Firmware Development',
    'Microcontroller Systems & IoT Sensors',
    'Printed Circuit Board (PCB) Design',
    'Telemetry, Hardware Interfaces & Protocols',
    'Device Diagnostics & Stress Testing'
  ],
  'telecom-voice': [
    'VoIP & Unified Communications',
    'Telecommunication Networks & WAN routing',
    'SIP Trunking & Call Routing Administration',
    'Collaboration Tools Admin (Zoom, MS Teams)',
    'Voice Security & Compliance Encryption'
  ],
  'governance-audit': [
    'IT Compliance Audits (SOX, ISO 27001, SOC2)',
    'Risk Assessment & Threat Modeling',
    'Privacy Regulations (GDPR, CCPA)',
    'Security Controls Policy Writing',
    'Asset & Vendor Governance'
  ],
  'architecture': [
    'Enterprise Architecture Frameworks (TOGAF)',
    'Systems Integration & Microservices',
    'Solution Layout & Technical Blueprints',
    'Cloud/VPC Network Topologies Design',
    'Scalability & High-Availability Design'
  ],
  'executive': [
    'Technology Strategy & Roadmap Design',
    'IT Budgeting & Vendor Negotiations',
    'Technical Team Leadership & Scaling',
    'Digital Transformation Management',
    'Corporate Security & Crisis Governance'
  ]
};

const getDomainId = (roleId: string, roleDomain?: string): string => {
  if (!IT_DOMAINS) return 'cloud';

  // 1. Try finding domain ID by scanning roles arrays inside IT_DOMAINS
  const foundDomain = IT_DOMAINS.find(domain => domain.roles && domain.roles.includes(roleId));
  if (foundDomain) return foundDomain.id;

  // 2. If not found, try mapping using string matching on domain name
  if (roleDomain) {
    const lowerDomain = roleDomain.toLowerCase();
    const matchedDomain = IT_DOMAINS.find(d => 
      d.name.toLowerCase() === lowerDomain || 
      lowerDomain.includes(d.id) ||
      d.id.includes(lowerDomain)
    );
    if (matchedDomain) return matchedDomain.id;
  }

  // 3. Fallbacks using string matching on roleId and domain
  const lowerId = roleId.toLowerCase();
  const lowerDomain = (roleDomain || '').toLowerCase();

  if (lowerId.includes('green') || lowerId.includes('sustain') || lowerDomain.includes('green') || lowerDomain.includes('sustain')) {
    return 'green-computing';
  } else if (lowerId.includes('cloud') || lowerDomain.includes('cloud')) {
    return 'cloud';
  } else if (
    lowerId.includes('cyber') || lowerId.includes('security') || lowerId.includes('soc-') || 
    lowerId.includes('grc') || lowerDomain.includes('security') || lowerDomain.includes('cyber') || 
    lowerDomain.includes('vulnerability')
  ) {
    return 'cybersecurity';
  } else if (lowerId.includes('network') || lowerId.includes('noc-') || lowerDomain.includes('network')) {
    return 'networking';
  } else if (
    lowerId.includes('data') || lowerId.includes('analytics') || lowerId.includes('ai') || 
    lowerId.includes('ml') || lowerId.includes('intelligence') || lowerId.includes('scientist') || 
    lowerId.includes('nlp') || lowerDomain.includes('data') || lowerDomain.includes('science') || 
    lowerDomain.includes('analytics') || lowerDomain.includes('ai') || lowerDomain.includes('machine learning')
  ) {
    return 'data-science-ai';
  } else if (
    lowerId.includes('devops') || lowerId.includes('sre') || lowerId.includes('reliability') || 
    lowerId.includes('platform-engine') || lowerDomain.includes('devops') || lowerDomain.includes('sre') || 
    lowerDomain.includes('reliability') || lowerDomain.includes('platform')
  ) {
    return 'devops-sre';
  } else if (lowerId.includes('support') || lowerId.includes('helpdesk') || lowerId.includes('desk') || lowerDomain.includes('support')) {
    return 'it-support';
  } else if (lowerId.includes('infra') || lowerId.includes('admin') || lowerDomain.includes('infra') || lowerDomain.includes('system')) {
    return 'systems-infra';
  } else if (lowerId.includes('dev') || lowerId.includes('software') || lowerId.includes('programmer') || lowerDomain.includes('software') || lowerDomain.includes('development')) {
    return 'software-dev';
  } else if (lowerId.includes('test') || lowerId.includes('qa') || lowerDomain.includes('testing') || lowerDomain.includes('quality')) {
    return 'qa-testing';
  }

  return 'cloud';
};

const getCoreTechDomainsForRole = (roleId: string, roleDomain?: string): string[] => {
  const dId = getDomainId(roleId, roleDomain);
  return DOMAIN_CORE_TECH_MAP[dId] || ['Cloud', 'Cybersecurity', 'Networks', 'Data Science', 'SRE / DevOps', 'Others'];
};

const mapRoleIdToPreference = (roleId: string, roleDomain?: string): string => {
  const domains = getCoreTechDomainsForRole(roleId, roleDomain);
  return domains[0] || 'Others';
};

export default function PathFinder(props: PathFinderProps) {
  const { onSelectRole, isHighlighted = false, onScrollToSection, theme = 'dark' } = props;
  const isLight = theme === 'light';
  
  // Sub-category tabs inside Path Planner
  const [activeSubTab, setActiveSubTab] = useState<'ambition' | 'fallback'>('ambition');
  const [selectedFallbackProfileId, setSelectedFallbackProfileId] = useState<string>('it-support');
  const [activeRouteTitle, setActiveRouteTitle] = useState<string>('Service Desk Team Leader');

  const currentFallbackProfile = FALLBACK_PROFILES.find(p => p.id === selectedFallbackProfileId) || FALLBACK_PROFILES[0];
  const activeRoute = currentFallbackProfile.fallbackRoutes.find(r => r.title === activeRouteTitle) || currentFallbackProfile.fallbackRoutes[0];

  useEffect(() => {
    const prof = FALLBACK_PROFILES.find(p => p.id === selectedFallbackProfileId);
    if (prof && prof.fallbackRoutes.length > 0) {
      setActiveRouteTitle(prof.fallbackRoutes[0].title);
    }
  }, [selectedFallbackProfileId]);

  // Onboarding wizard states initialized from URL parameters if available, falling back to localStorage
  const [onboardStep, setOnboardStep] = useState<number>(0); // 0: Start, 1: Destination, 2: Theme/Track, 3: Dashboard
  const [hasCompletedOnboard, setHasCompletedOnboard] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('start') || params.get('target') || params.get('route') || params.get('skills')) {
        return true;
      }
    }
    return localStorage.getItem('pathfinder_completed_onboard_v2') === 'true';
  });

  // Wizard selections with URL parameter support
  const [currentStartRoleId, setCurrentStartRoleId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlStart = params.get('start') || params.get('startRole') || params.get('from');
      if (urlStart) return urlStart;
    }
    return localStorage.getItem('pathfinder_currentStartRoleId') || 'career-switcher';
  });

  const [proficiencyLevel, setProficiencyLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlProf = params.get('proficiency') || params.get('level');
      if (urlProf && ['beginner', 'intermediate', 'advanced'].includes(urlProf)) {
        return urlProf as any;
      }
    }
    return (localStorage.getItem('pathfinder_proficiencyLevel') as 'beginner' | 'intermediate' | 'advanced') || 'beginner';
  });

  const [targetRoleId, setTargetRoleId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTarget = params.get('target') || params.get('targetRole') || params.get('to');
      if (urlTarget) return urlTarget;
    }
    return localStorage.getItem('pathfinder_targetRoleId') || 'cloud-support-associate';
  });

  const [preferredIndustry, setPreferredIndustry] = useState<string>(() => {
    const saved = localStorage.getItem('pathfinder_preferred_industry');
    if (saved) return saved;
    const defaultTarget = targetRoleId || 'cloud-support-associate';
    const targetRole = ALL_ROLES_DATA[defaultTarget];
    return mapRoleIdToPreference(defaultTarget, targetRole?.domain);
  });

  const [countryMarket, setCountryMarket] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMarket = params.get('market') || params.get('country');
      if (urlMarket) return urlMarket;
    }
    return localStorage.getItem('pathfinder_country_market') || 'Global';
  });

  const [weeklyHours, setWeeklyHours] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlHours = params.get('hours');
      if (urlHours) {
        const parsed = parseInt(urlHours, 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    const saved = localStorage.getItem('pathfinder_weeklyHours');
    return saved ? parseInt(saved, 10) : 15;
  });
  
  // Selected route option: balanced, cert, project, fast, budget
  const [selectedRoute, setSelectedRoute] = useState<'balanced' | 'cert' | 'project' | 'fast' | 'budget'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRoute = params.get('route') || params.get('track');
      if (urlRoute && ['balanced', 'cert', 'project', 'fast', 'budget'].includes(urlRoute)) {
        return urlRoute as any;
      }
    }
    return (localStorage.getItem('pathfinder_selected_route') as any) || 'balanced';
  });

  // User skills list
  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSkills = params.get('skills');
      if (urlSkills) {
        return urlSkills.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    try {
      const saved = localStorage.getItem('pathfinder_selectedSkills');
      return saved ? JSON.parse(saved) : ['Windows troubleshooting', 'Networking basics'];
    } catch (e) {
      return ['Windows troubleshooting', 'Networking basics'];
    }
  });

  // Completed certs
  const [completedCerts, setCompletedCerts] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlCerts = params.get('certs');
      if (urlCerts) {
        return urlCerts.split(',').map(c => c.trim()).filter(Boolean);
      }
    }
    try {
      const saved = localStorage.getItem('pathfinder_completed_certs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [customSkills, setCustomSkills] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pathfinder_customSkills');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Progress tracking inside stages
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [expandedStageIndex, setExpandedStageIndex] = useState<number | null>(0);
  const [localSavedPathways, setLocalSavedPathways] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('mapit_saved_pathways_v3');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const savedPathways = props.savedPathways !== undefined ? props.savedPathways : localSavedPathways;
  const setSavedPathways = props.setSavedPathways !== undefined ? props.setSavedPathways : setLocalSavedPathways;

  useEffect(() => {
    if (props.restoredPathway) {
      setCurrentStartRoleId(props.restoredPathway.start);
      setTargetRoleId(props.restoredPathway.target);
      setSelectedRoute(props.restoredPathway.route);
      setHasCompletedOnboard(true);
      setExpandedStageIndex(0);
      
      localStorage.setItem('pathfinder_currentStartRoleId', props.restoredPathway.start);
      localStorage.setItem('pathfinder_targetRoleId', props.restoredPathway.target);
      localStorage.setItem('pathfinder_selected_route', props.restoredPathway.route);
      localStorage.setItem('pathfinder_completed_onboard_v2', 'true');
    }
  }, [props.restoredPathway]);

  const [skillSearchQuery, setSkillSearchQuery] = useState<string>('');
  const [marketSearchQuery, setMarketSearchQuery] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<{ skills: string[]; certifications: any[] } | null>(null);
  const [analysisError, setAnalysisError] = useState<string>('');
  const [isSyncingLibraries, setIsSyncingLibraries] = useState<boolean>(false);
  const [syncCompleted, setSyncCompleted] = useState<boolean>(false);
  const lastSearchedQueryRef = useRef<string>('');

  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Sync back to localStorage
  useEffect(() => {
    localStorage.setItem('pathfinder_currentStartRoleId', currentStartRoleId);
  }, [currentStartRoleId]);

  useEffect(() => {
    localStorage.setItem('pathfinder_proficiencyLevel', proficiencyLevel);
  }, [proficiencyLevel]);

  useEffect(() => {
    localStorage.setItem('pathfinder_targetRoleId', targetRoleId);
    if (targetRoleId) {
      const targetRole = ALL_ROLES_DATA[targetRoleId];
      const category = mapRoleIdToPreference(targetRoleId, targetRole?.domain);
      setPreferredIndustry(category);
    }
  }, [targetRoleId]);

  useEffect(() => {
    localStorage.setItem('pathfinder_preferred_industry', preferredIndustry);
  }, [preferredIndustry]);

  useEffect(() => {
    localStorage.setItem('pathfinder_country_market', countryMarket);
  }, [countryMarket]);

  useEffect(() => {
    localStorage.setItem('pathfinder_weeklyHours', weeklyHours.toString());
  }, [weeklyHours]);

  useEffect(() => {
    localStorage.setItem('pathfinder_selected_route', selectedRoute);
  }, [selectedRoute]);

  useEffect(() => {
    localStorage.setItem('pathfinder_selectedSkills', JSON.stringify(selectedSkills));
  }, [selectedSkills]);

  useEffect(() => {
    localStorage.setItem('pathfinder_completed_certs', JSON.stringify(completedCerts));
  }, [completedCerts]);

  useEffect(() => {
    localStorage.setItem('pathfinder_customSkills', JSON.stringify(customSkills));
  }, [customSkills]);

  useEffect(() => {
    localStorage.setItem('pathfinder_completed_onboard_v2', hasCompletedOnboard ? 'true' : 'false');
  }, [hasCompletedOnboard]);

  // Dynamic URL Parameter Synchronizer: Syncs active pathway configuration to URL search parameters for shareable links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (hasCompletedOnboard) {
        url.searchParams.set('start', currentStartRoleId);
        url.searchParams.set('target', targetRoleId);
        url.searchParams.set('route', selectedRoute);
        if (selectedSkills.length > 0) {
          url.searchParams.set('skills', selectedSkills.join(','));
        } else {
          url.searchParams.delete('skills');
        }
        if (completedCerts.length > 0) {
          url.searchParams.set('certs', completedCerts.join(','));
        } else {
          url.searchParams.delete('certs');
        }
        if (skillSearchBoxQuery && skillSearchBoxQuery.trim()) {
          url.searchParams.set('query', skillSearchBoxQuery.trim());
        } else {
          url.searchParams.delete('query');
        }
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [currentStartRoleId, targetRoleId, selectedRoute, selectedSkills, completedCerts, skillSearchBoxQuery, hasCompletedOnboard]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard roles Catalogue reference
  const targetRole = targetRoleId === 'not-sure'
    ? ALL_ROLES_DATA['cloud-support-associate']
    : (ALL_ROLES_DATA[targetRoleId] || ALL_ROLES_DATA['cloud-support-associate']);

  const currentRoleObj = currentStartRoleId !== 'career-switcher' && currentStartRoleId !== 'non-tech'
    ? ALL_ROLES_DATA[currentStartRoleId]
    : null;

  // Identify Transition Type
  const getTransitionType = () => {
    if (currentStartRoleId === targetRoleId) return { type: 'Direct Alignment', prep: '0-4 weeks' };
    if (currentStartRoleId === 'career-switcher' || currentStartRoleId === 'non-tech') {
      return { type: 'Major Career Change', prep: '16–24 weeks' };
    }
    const currentDomain = currentRoleObj?.domain;
    const targetDomain = targetRole?.domain;
    if (currentDomain === targetDomain) {
      return { type: 'Adjacent Transition', prep: '6–10 weeks' };
    }
    return { type: 'Moderate Reskilling', prep: '10–14 weeks' };
  };

  const transitionInfo = getTransitionType();

  // Skill Options list
  const skillOptions = [
    'Windows troubleshooting', 'Networking basics', 'Active Directory', 'DNS/DHCP',
    'Customer support', 'Linux basics', 'SQL fundamentals', 'Excel pivots',
    'Python basics', 'Cybersecurity basics'
  ];

  const allAdditionalSkills = [
    'Python', 'Python Programming', 'Python scripting', 'Python Data Science',
    'React.js', 'Node.js', 'TypeScript', 'JavaScript (ES6)', 'HTML5 & CSS3', 
    'Git & GitHub', 'AWS Cloud', 'Microsoft Azure', 'Google Cloud', 'Docker & Kubernetes', 
    'CI/CD Pipelines', 'Ansible & Terraform', 'Prometheus & Grafana', 'Kubernetes Engine',
    'Splunk & Sentinel', 'NIST Security CSF', 'Okta & SailPoint', 'Active Directory LDAP',
    'Windows Server admin', 'Linux administration', 'Cisco IOS', 'Wireshark analysis', 
    'VoIP Protocols', 'ServiceNow Enterprise', 'Jira Service Management', 'Technical Writing', 
    'API Documentation', 'Postman testing', 'Selenium & Cypress', 'SQL Queries & Joins', 
    'Databricks & Snowflake', 'Power BI & Tableau', 'Machine Learning models', 
    'Technical Project Management', 'Incident Escalation', 'MySQL & PostgreSQL', 
    'Excel Data Pivot Tables', 'Golang Programming', 'Bash Shell Scripting', 
    'PowerShell Automation', 'C++ Coding', 'Java Developer', 'Nmap Security Scanning'
  ];

  const popularCertifications = [
    'CompTIA A+', 'CompTIA Network+', 'CompTIA Security+', 'Cisco CCNA', 
    'AWS Certified Cloud Practitioner', 'AWS Solutions Architect Associate',
    'Microsoft Certified: Azure Fundamentals (AZ-900)', 'Microsoft Certified: Azure Administrator (AZ-104)', 
    'Google Cloud Digital Leader', 'Certified Ethical Hacker (CEH)'
  ];

  const [skillSearchBoxQuery, setSkillSearchBoxQuery] = useState<string>('');
  const [certSearchBoxQuery, setCertSearchBoxQuery] = useState<string>('');

  const getRelevantRoleSkills = () => {
    const list: string[] = [];
    if (currentRoleObj) {
      list.push(...currentRoleObj.mustHaves.tech);
      list.push(...currentRoleObj.mustHaves.process);
      list.push(...currentRoleObj.toolsToLearn);
    }
    if (targetRole) {
      list.push(...targetRole.mustHaves.tech);
      list.push(...targetRole.mustHaves.process);
      list.push(...targetRole.toolsToLearn);
    }
    return Array.from(new Set(list));
  };

  const getRelevantRoleCerts = () => {
    const list: string[] = [];
    if (targetRole && targetRole.recommendedCertifications) {
      targetRole.recommendedCertifications.forEach((c: any) => {
        if (typeof c === 'string') {
          list.push(c);
        } else if (c && c.name) {
          list.push(c.name);
        }
      });
    }
    return Array.from(new Set(list));
  };

  // Master Extraction of ALL Database Skills & Keywords
  const MASTER_DATABASE_SKILLS = useMemo(() => {
    const skillsSet = new Set<string>();

    // 1. Core Foundational & Additional Skills
    [
      ...skillOptions,
      ...allAdditionalSkills
    ].forEach(s => skillsSet.add(s));

    // 2. Extract Tech Skills, Process Skills, Tools, Resume Keywords, & Interview Topics from ALL_ROLES_DATA
    Object.values(ALL_ROLES_DATA).forEach((role) => {
      if (role.mustHaves?.tech) role.mustHaves.tech.forEach(s => skillsSet.add(s));
      if (role.mustHaves?.process) role.mustHaves.process.forEach(s => skillsSet.add(s));
      if (role.toolsToLearn) role.toolsToLearn.forEach(t => skillsSet.add(t));
      if (role.resumeKeywords) role.resumeKeywords.forEach(rk => {
        if (rk && rk.keyword) skillsSet.add(rk.keyword);
      });
      if (role.interviewTopics?.technical) role.interviewTopics.technical.forEach(it => {
        if (it) skillsSet.add(it);
      });
    });

    // 3. Extract Skills from SKILLS_LIBRARY
    SKILLS_LIBRARY.forEach(s => {
      if (s.name) skillsSet.add(s.name);
      if ((s as any).topic) skillsSet.add((s as any).topic);
    });

    // 4. Extract Tools from TOOLS_LIBRARY
    TOOLS_LIBRARY.forEach(t => {
      if (t.name) skillsSet.add(t.name);
    });

    // 5. Extract Certifications from CERTIFICATIONS_LIBRARY
    CERTIFICATIONS_LIBRARY.forEach(c => {
      if (c.name) skillsSet.add(c.name);
    });

    return Array.from(skillsSet).filter(Boolean);
  }, [skillOptions, allAdditionalSkills]);

  // Master Extraction of ALL Database Certifications
  const MASTER_DATABASE_CERTS = useMemo(() => {
    const certsSet = new Set<string>();

    popularCertifications.forEach(c => certsSet.add(c));

    CERTIFICATIONS_LIBRARY.forEach(c => {
      if (c.name) certsSet.add(c.name);
    });

    Object.values(ALL_ROLES_DATA).forEach((role) => {
      if (role.recommendedCertifications) {
        role.recommendedCertifications.forEach((c: any) => {
          if (typeof c === 'string') certsSet.add(c);
          else if (c && c.name) certsSet.add(c.name);
        });
      }
    });

    return Array.from(certsSet).filter(Boolean);
  }, [popularCertifications]);

  const handleAddCustomSkillDirectly = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setCustomSkills(prev => Array.from(new Set([...prev, trimmed])));
      setSelectedSkills(prev => Array.from(new Set([...prev, trimmed])));
      setSkillSearchBoxQuery('');
    }
  };

  const handleAddCustomCertDirectly = (certName: string) => {
    const trimmed = certName.trim();
    if (trimmed && !completedCerts.includes(trimmed)) {
      setCompletedCerts(prev => Array.from(new Set([...prev, trimmed])));
      setCertSearchBoxQuery('');
    }
  };

  const handleProficiencyLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setProficiencyLevel(level);

    // Update skills and certs based on the selected level
    let skillsToAdd: string[] = [];
    let certsToAdd: string[] = [];

    if (level === 'beginner') {
      skillsToAdd = ['Windows troubleshooting', 'Customer support', 'Networking basics'];
      certsToAdd = ['CompTIA A+', 'AWS Certified Cloud Practitioner'];
    } else if (level === 'intermediate') {
      skillsToAdd = ['Windows troubleshooting', 'Customer support', 'Networking basics', 'Active Directory', 'DNS/DHCP', 'Linux basics'];
      certsToAdd = ['CompTIA A+', 'AWS Certified Cloud Practitioner', 'CompTIA Network+', 'Microsoft Certified: Azure Administrator (AZ-104)'];
    } else if (level === 'advanced') {
      skillsToAdd = ['Windows troubleshooting', 'Customer support', 'Networking basics', 'Active Directory', 'DNS/DHCP', 'Linux basics', 'Python basics', 'Cybersecurity basics', 'SQL fundamentals'];
      certsToAdd = ['CompTIA A+', 'AWS Certified Cloud Practitioner', 'CompTIA Network+', 'Microsoft Certified: Azure Administrator (AZ-104)', 'CompTIA Security+', 'Cisco CCNA'];
    }

    setSelectedSkills(prev => Array.from(new Set([...prev, ...skillsToAdd])));
    setCompletedCerts(prev => Array.from(new Set([...prev, ...certsToAdd])));
  };

  const dynamicSkillOptions = useMemo(() => {
    return Array.from(new Set([
      ...getRelevantRoleSkills(),
      ...customSkills,
      ...selectedSkills,
      ...MASTER_DATABASE_SKILLS
    ]));
  }, [getRelevantRoleSkills, customSkills, selectedSkills, MASTER_DATABASE_SKILLS]);

  const dynamicCertOptions = useMemo(() => {
    return Array.from(new Set([
      ...popularCertifications,
      ...getRelevantRoleCerts(),
      ...completedCerts,
      ...MASTER_DATABASE_CERTS
    ]));
  }, [popularCertifications, getRelevantRoleCerts, completedCerts, MASTER_DATABASE_CERTS]);

  const filteredSkillOptions = useMemo(() => {
    const query = skillSearchBoxQuery.toLowerCase().trim();
    if (!query) {
      return Array.from(new Set([
        ...getRelevantRoleSkills(),
        ...selectedSkills,
        ...customSkills,
        ...skillOptions,
        ...allAdditionalSkills.slice(0, 20)
      ]));
    }
    return dynamicSkillOptions.filter(skill =>
      skill.toLowerCase().includes(query)
    );
  }, [skillSearchBoxQuery, getRelevantRoleSkills, selectedSkills, customSkills, skillOptions, allAdditionalSkills, dynamicSkillOptions]);

  const filteredCertOptions = useMemo(() => {
    const query = certSearchBoxQuery.toLowerCase().trim();
    if (!query) {
      return Array.from(new Set([
        ...popularCertifications,
        ...getRelevantRoleCerts(),
        ...completedCerts
      ]));
    }
    return dynamicCertOptions.filter(cert =>
      cert.toLowerCase().includes(query)
    );
  }, [certSearchBoxQuery, popularCertifications, getRelevantRoleCerts, completedCerts, dynamicCertOptions]);

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleToggleCert = (cert: string) => {
    if (completedCerts.includes(cert)) {
      setCompletedCerts(completedCerts.filter(c => c !== cert));
    } else {
      setCompletedCerts([...completedCerts, cert]);
    }
  };

  // Helper to extract gaps and matches dynamically
  const getPathwaySkillsAnalysis = () => {
    const targetAllSkills = targetRole
      ? Array.from(new Set([
          ...targetRole.mustHaves.tech,
          ...targetRole.mustHaves.process,
          ...targetRole.toolsToLearn
        ]))
      : [];

    const matchingSkills = targetAllSkills.filter(tSkill => {
      const tsLower = tSkill.toLowerCase();
      return selectedSkills.some(userSkill => {
        const uSkillLower = userSkill.toLowerCase().trim();
        return tsLower.includes(uSkillLower) || uSkillLower.includes(tsLower);
      });
    });

    const skillsGap = targetAllSkills.filter(tSkill => {
      const tsLower = tSkill.toLowerCase();
      return !selectedSkills.some(userSkill => {
        const uSkillLower = userSkill.toLowerCase().trim();
        return tsLower.includes(uSkillLower) || uSkillLower.includes(tsLower);
      });
    });

    return { 
      matchingSkills, 
      skillsGap, 
      totalNeeded: Math.max(1, targetAllSkills.length),
      matchScore: Math.round((matchingSkills.length / Math.max(1, targetAllSkills.length)) * 100)
    };
  };

  const analysis = getPathwaySkillsAnalysis();

  // Dynamic next best action logic based on gaps remaining
  const getNextBestAction = () => {
    if (analysis.skillsGap.length === 0) {
      return {
        title: "Initiate Advanced Recruiter Applications",
        why: "You possess 100% of the core matching skill requirements for the target role.",
        time: "1-2 days",
        evidence: "Build capstone portfolio site & publish resume links",
        skill: null
      };
    }
    const firstGap = analysis.skillsGap[0];
    return {
      title: `Build competency in: ${firstGap}`,
      why: `Essential foundational gate. Missing this block holds back ${analysis.skillsGap.length} key adjacent roles.`,
      time: "7–10 days",
      evidence: `Create automated portfolio lab proving hands-on experience in ${firstGap}`,
      skill: firstGap
    };
  };

  const nextAction = getNextBestAction();

  // Define custom stage gates based on user selections and role requirements
  const getRoleSpecificGates = () => {
    const roleId = targetRole.id;
    const title = targetRole.title;
    const domainId = getDomainId(roleId, targetRole.domain);

    // Build the base learning stages dynamically from the targetRole's extensive metadata
    const baseGates = [
      {
        id: 1,
        name: `Stage 1: ${title} Foundations`,
        estimatedTime: "2-3 Weeks",
        priority: "Required before applying",
        priorityLabel: "Required",
        learn: targetRole.upskillingPath?.[0] || `Study the core principles, underlying standards, and baseline theory of ${targetRole.mustHaves.tech.slice(0, 2).join(', ')}.`,
        do: `Set up an isolated workspace or development environment and run standard tasks with ${targetRole.toolsToLearn[0] || 'fundamental tooling'}.`,
        produce: `Publish a dynamic portfolio codebase, topological network diagram, or system design layout proving your understanding of ${targetRole.mustHaves.tech[0] || 'core concepts'}.`,
        resume: `${title} Foundations: Mastered core mechanics of ${targetRole.mustHaves.tech.slice(0, 2).join(' and ')} configurations.`,
        resources: [
          { name: `${title} Learning Blueprints`, url: `https://roadmap.sh/` },
          { name: `${targetRole.toolsToLearn[0] || 'Core'} Technical Quickstart`, url: `https://www.google.com/search?q=${encodeURIComponent((targetRole.toolsToLearn[0] || title) + ' official quickstart documentation')}` }
        ],
        type: "Skills"
      },
      {
        id: 2,
        name: `Stage 2: ${title} Tooling & Platform Integration`,
        estimatedTime: "3-4 Weeks",
        priority: "Required before applying",
        priorityLabel: "Required",
        learn: targetRole.upskillingPath?.[1] || `Master industry-standard administrative tooling, libraries, and setups: ${targetRole.toolsToLearn.slice(0, 3).join(', ')}.`,
        do: `Configure access guidelines, deploy services using ${targetRole.toolsToLearn[1] || 'essential tooling'}, and automate workflows using custom scripts.`,
        produce: `Push detailed configuration playbooks, dockerfiles, or deployment scripts for ${targetRole.toolsToLearn.slice(0, 2).join(' and ')} to your GitHub repository.`,
        resume: `Platform Integration: Integrated and automated administrative pipelines utilizing ${targetRole.toolsToLearn.slice(0, 3).join(', ')}.`,
        resources: [
          { name: `Official ${targetRole.toolsToLearn[0] || 'Tool'} Documentation`, url: `https://www.google.com/search?q=${encodeURIComponent((targetRole.toolsToLearn[0] || 'IT tools') + ' documentation')}` },
          { name: "FreeCodeCamp Interactive Workspaces", url: "https://www.freecodecamp.org/" }
        ],
        type: "Tools"
      },
      {
        id: 3,
        name: `Stage 3: Advanced ${title} Portfolio Labs`,
        estimatedTime: "2-3 Weeks",
        priority: "Strongly preferred",
        priorityLabel: "Preferred",
        learn: targetRole.upskillingPath?.[2] || `Develop expertise in real-world troubleshooting, error logging, and standard process methodologies like ${targetRole.mustHaves.process[0] || 'Agile operations'}.`,
        do: `Construct a comprehensive, multi-component sandbox environment or live utility model utilizing ${targetRole.toolsToLearn.slice(0, 3).join(', ')}.`,
        produce: `Publish a fully documented, public GitHub repository showcasing hands-on ${targetRole.mustHaves.tech[0]} implementation and testing data.`,
        resume: `Practical Projects: Engineered robust sandbox models with complete log diagnostics, integrating ${targetRole.toolsToLearn[0] || 'primary tools'} and adhering to ${targetRole.mustHaves.process[0] || 'enterprise processes'}.`,
        resources: [
          { name: "GitHub Developer Portfolios", url: "https://github.com/" },
          { name: `Search GitHub for ${title} Projects`, url: `https://github.com/search?q=${encodeURIComponent(title + ' project')}` }
        ],
        type: "Projects"
      },
      {
        id: 4,
        name: `Stage 4: Recommended Certifications`,
        estimatedTime: "2 Weeks",
        priority: "Strongly preferred",
        priorityLabel: "Preferred",
        learn: targetRole.upskillingPath?.[3] || targetRole.upskillingPath?.[targetRole.upskillingPath.length - 1] || `Study study guides, practice domains, and curriculum guidelines for: ${targetRole.recommendedCertifications.map(c => c.name).join(' or ')}.`,
        do: `Solve mock exam questions, complete credential study chapters, and review exam domain matrices.`,
        produce: `Achieve the ${targetRole.recommendedCertifications[0]?.name || 'relevant domain credential'} or equivalent validated training badge.`,
        resume: `Credentials: Completed rigorous examination preparation aligning with ${targetRole.recommendedCertifications.map(c => c.name).join(' / ')} industry standards.`,
        resources: targetRole.recommendedCertifications.map(c => ({
          name: `${c.name} (${c.level} - ${c.status})`,
          url: c.resourceUrl || `https://www.google.com/search?q=${encodeURIComponent(c.name)}`
        })),
        type: "Certs"
      },
      {
        id: 5,
        name: `Stage 5: Scenario & Technical Interview Prep`,
        estimatedTime: "11-14 Days",
        priority: "Can learn after joining",
        priorityLabel: "Preferred",
        learn: `Formulate comprehensive solutions to technical interview questions: "${targetRole.interviewTopics.technical[0]}" and scenario challenges: "${targetRole.interviewTopics.scenario[0]}"`,
        do: `Practice vocalizing incident responses, defining ticketing SLA escalation steps, and answering HR values questions: "${targetRole.interviewTopics.hr[0]}"`,
        produce: `A structured interview preparation workbook outlining your technical approaches and architectural solutions for ${title} roles.`,
        resume: `Interview Mastery: Trained in professional SLA guidelines, incident triages, and customer technical escalation pipelines.`,
        resources: [
          { name: "FreeCodeCamp Tech Interview Guidelines", url: "https://www.freecodecamp.org/" },
          { name: `${title} Technical Interview Tips`, url: `https://www.google.com/search?q=${encodeURIComponent(title + ' technical interview questions')}` }
        ],
        type: "Interviews"
      },
      {
        id: 6,
        name: `Stage 6: ATS Resume & Career Strategy`,
        estimatedTime: "2 Weeks",
        priority: "Optional specialization",
        priorityLabel: "Optional",
        learn: `Audit resume keywords and recruiter search triggers, aligning your layout with high-priority keyword signals: ${targetRole.resumeKeywords.slice(0, 4).map(k => k.keyword).join(', ')}.`,
        do: `Refine your resume layout, publish active sandbox links in your profile bio, and send messages to specialized tech recruiters.`,
        produce: `Submit optimized, tailored resumes showcasing high-fidelity metrics to prominent companies actively hiring like: ${targetRole.companiesHiring.slice(0, 3).join(', ')}.`,
        resume: `Career Optimized: Tailored resume highlighting ${targetRole.resumeKeywords.slice(0, 2).map(k => k.keyword).join(', ')} matching active industry open positions.`,
        resources: [
          { name: "LinkedIn Jobs Directory", url: "https://www.linkedin.com/jobs/" },
          { name: `Target Jobs for ${title}`, url: `https://www.google.com/search?q=${encodeURIComponent(title + ' jobs hiring')}` }
        ],
        type: "Career"
      }
    ];

    // For specific domain overrides to preserve highly stylized custom copy if they match standard groups
    if (domainId === 'green-computing') {
      baseGates[0].name = "Stage 1: Sustainable Software Engineering";
      baseGates[1].name = "Stage 2: Sustainable Infrastructure & Cloud";
      baseGates[2].name = "Stage 3: Eco-Conscious Software Design & E-Waste";
      baseGates[3].name = "Stage 4: Green Software Practitioner Certification";
    }
    else if (domainId === 'software-dev') {
      baseGates[0].name = "Stage 1: Software Design & Algorithms";
      baseGates[1].name = "Stage 2: Backend Services & API Integration";
      baseGates[2].name = "Stage 3: End-to-End Application Delivery";
      baseGates[3].name = "Stage 4: Cloud Developer Certification";
    }
    else if (domainId === 'devops-sre') {
      baseGates[0].name = "Stage 1: Linux & Scripting Foundations";
      baseGates[1].name = "Stage 2: Infrastructure as Code (IaC)";
      baseGates[2].name = "Stage 3: Containers & Observability";
      baseGates[3].name = "Stage 4: Kubernetes & DevOps Orchestration Certification";
    }
    else if (domainId === 'qa-testing') {
      baseGates[0].name = "Stage 1: Testing & QA Core Methodologies";
      baseGates[1].name = "Stage 2: Automated Testing Frameworks";
      baseGates[2].name = "Stage 3: Performance, Load & API Testing";
      baseGates[3].name = "Stage 4: International QA & Automation Certification";
    }
    else if (domainId === 'db-admin') {
      baseGates[0].name = "Stage 1: Relational Database Essentials";
      baseGates[1].name = "Stage 2: Advanced SQL & Optimization";
      baseGates[2].name = "Stage 3: High Availability & Scaling";
      baseGates[3].name = "Stage 4: Database Administration Specialist Certification";
    }
    else if (roleId === 'cloud-support-associate' || roleId.includes('cloud') || domainId === 'cloud') {
      baseGates[0].name = "Stage 1: Networking & Systems Basics";
      baseGates[1].name = "Stage 2: Linux & Cloud Core Identity";
      baseGates[2].name = "Stage 3: Advanced Storage & Service Monitoring";
      baseGates[3].name = "Stage 4: Solutions Architecture & Cloud Administration Certification";
    }
    else if (roleId === 'soc-analyst' || roleId.includes('security') || roleId.includes('cyber') || domainId === 'cybersecurity') {
      baseGates[0].name = "Stage 1: Enterprise Networking Basics";
      baseGates[1].name = "Stage 2: Windows & Linux Log Parsing";
      baseGates[2].name = "Stage 3: Incident Triage & SIEM Basics";
      baseGates[3].name = "Stage 4: Cybersecurity & SOC Operations Certification";
    }

    // Adjust duration and cost based on route preference
    if (selectedRoute === 'fast') {
      baseGates.forEach(g => {
        g.estimatedTime = "3–5 days";
        g.priority = g.id <= 2 ? "Required before applying" : "Can learn after joining";
      });
    } else if (selectedRoute === 'budget') {
      baseGates.forEach(g => {
        g.resources = [
          { name: "Microsoft Learn Free Modules", url: "https://learn.microsoft.com/" },
          { name: "FreeCodeCamp Complete Curriculum", url: "https://www.freecodecamp.org/" }
        ];
      });
    }

    // Dynamically append high-caliber specialized resources corresponding to user's Preferred Core Tech Industry Domain
    if (preferredIndustry && preferredIndustry !== 'Others' && baseGates.length > 0) {
      if (preferredIndustry === 'Cloud' || preferredIndustry.includes('Multi-Cloud')) {
        baseGates[0].resources.push({ name: "AWS Cloud Quest Simulation Arena", url: "https://aws.amazon.com/gaming/cloudquest/" });
      } else if (preferredIndustry === 'Cybersecurity' || preferredIndustry.includes('SecOps') || preferredIndustry.includes('Security')) {
        baseGates[0].resources.push({ name: "TryHackMe Gamified Threat Labs", url: "https://tryhackme.com/" });
      } else if (preferredIndustry === 'Networks' || preferredIndustry.includes('Routing')) {
        baseGates[0].resources.push({ name: "Wireshark Network Packet Traces Practice", url: "https://www.wireshark.org/" });
      } else if (preferredIndustry === 'Data Science' || preferredIndustry.includes('Machine Learning') || preferredIndustry.includes('Generative AI')) {
        baseGates[0].resources.push({ name: "Kaggle Dynamic Data & AI Playgrounds", url: "https://www.kaggle.com/learn" });
      } else if (preferredIndustry === 'SRE / DevOps' || preferredIndustry.includes('Continuous Integration') || preferredIndustry.includes('Reliability')) {
        baseGates[0].resources.push({ name: "Roadmap.sh Complete DevOps Learning Path", url: "https://roadmap.sh/devops" });
      } else if (preferredIndustry === 'IT Support' || preferredIndustry.includes('Service Desk')) {
        baseGates[0].resources.push({ name: "Kevtech IT Support Practical Scenarios", url: "https://www.youtube.com/@KevtechITSupport" });
      } else if (preferredIndustry === 'Systems & Infra' || preferredIndustry.includes('Linux & Unix')) {
        baseGates[0].resources.push({ name: "John Savill's Technical Training Modules", url: "https://www.youtube.com/@NTFAQGuy" });
      } else if (preferredIndustry === 'Software Dev' || preferredIndustry.includes('Web Development') || preferredIndustry.includes('Systems Programming')) {
        baseGates[0].resources.push({ name: "freeCodeCamp Interactive Coding Challenges", url: "https://www.freecodecamp.org/" });
      } else if (preferredIndustry === 'QA & Testing' || preferredIndustry.includes('Test Automation')) {
        baseGates[0].resources.push({ name: "Ministry of Testing Community Portal", url: "https://www.ministryoftesting.com/" });
      } else if (preferredIndustry === 'Database Admin' || preferredIndustry.includes('Database Performance') || preferredIndustry.includes('SQL & Relational')) {
        baseGates[0].resources.push({ name: "Brent Ozar Unlimited SQL Server Training", url: "https://www.brentozar.com/" });
      } else if (preferredIndustry === 'Product Management' || preferredIndustry.includes('Product Discovery')) {
        baseGates[0].resources.push({ name: "Product School Free Management Resources", url: "https://productschool.com/resources" });
      } else if (preferredIndustry === 'Business Analysis' || preferredIndustry.includes('Requirements Gathering')) {
        baseGates[0].resources.push({ name: "IIBA Business Analysis Standards Guides", url: "https://www.iiba.org/" });
      } else if (preferredIndustry === 'Green Software Engineering') {
        baseGates[0].resources.push({ name: "Green Software Foundation Learning Directory", url: "https://learn.greensoftware.foundation/" });
      } else if (preferredIndustry === 'Energy-Efficient Hardware') {
        baseGates[0].resources.push({ name: "IEEE Sustainable Computing Research", url: "https://ieeexplore.ieee.org/" });
      } else if (preferredIndustry === 'Sustainable Cloud Computing') {
        baseGates[0].resources.push({ name: "AWS & Azure Carbon Footprint Tool Manuals", url: "https://aws.amazon.com/blogs/aws/new-customer-carbon-footprint-tool/" });
      } else if (preferredIndustry === 'AI for Climate Solutions') {
        baseGates[0].resources.push({ name: "Climate Change AI Research Community", url: "https://www.climatechange.ai/" });
      } else if (preferredIndustry === 'E-Waste Management') {
        baseGates[0].resources.push({ name: "ITU E-Waste Legislation Guidelines", url: "https://www.itu.int/" });
      } else if (preferredIndustry.includes('UI') || preferredIndustry.includes('UX') || preferredIndustry.includes('Design')) {
        baseGates[0].resources.push({ name: "Nielsen Norman Group UX Research Guides", url: "https://www.nngroup.com/" });
      } else {
        baseGates[0].resources.push({
          name: `Google Search for ${preferredIndustry} Resources`,
          url: `https://www.google.com/search?q=${encodeURIComponent(preferredIndustry + ' resources tutorials')}`
        });
      }
    }

    return baseGates;
  };

  const currentGatesList = getRoleSpecificGates();

  const isPathSaved = savedPathways.some(
    p => p.start === currentStartRoleId && p.target === targetRoleId
  );

  // Save the pathway to local history
  const handleSavePathway = () => {
    if (isPathSaved) {
      const updated = savedPathways.filter(p => !(p.start === currentStartRoleId && p.target === targetRoleId));
      setSavedPathways(updated);
      localStorage.setItem('mapit_saved_pathways_v3', JSON.stringify(updated));
      alert("🗑️ Pathway removed from Bookmarks & Saved Pathways successfully.");
      return;
    }

    const newPath = {
      id: `${currentStartRoleId}-to-${targetRoleId}-${Date.now()}`,
      start: currentStartRoleId,
      target: targetRoleId,
      route: selectedRoute,
      match: analysis.matchScore,
      duration: transitionInfo.prep,
      skillsCount: selectedSkills.length,
      createdAt: new Date().toLocaleDateString()
    };
    const updated = [newPath, ...savedPathways.filter(p => !(p.start === currentStartRoleId && p.target === targetRoleId))];
    setSavedPathways(updated);
    localStorage.setItem('mapit_saved_pathways_v3', JSON.stringify(updated));
    alert("🌟 Pathway saved to Bookmarks & Saved Pathways successfully!");
  };

  const handleClearSavedPaths = () => {
    setSavedPathways([]);
    localStorage.removeItem('mapit_saved_pathways_v3');
  };

  // Live Market Analysis and Skills Sync
  const handleMarketAnalysis = async (customQuery?: string, isManual?: boolean) => {
    const q = (customQuery !== undefined ? customQuery : marketSearchQuery).trim();
    if (!q) return;
    if (!isManual && lastSearchedQueryRef.current === q) return;
    
    lastSearchedQueryRef.current = q;
    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResults(null);
    setSyncCompleted(false);

    try {
      const url = `/api/resources/search-role-skills?query=${encodeURIComponent(q)}${isManual ? '&forceSearch=true' : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to analyze role skills');
      const data = await res.json();
      if (data && (data.skills || data.certifications)) {
        setAnalysisResults(data);
      } else {
        throw new Error('Invalid response payload');
      }
    } catch (err: any) {
      console.error(err);
      setAnalysisError('Dynamic recovery active.');
      setAnalysisResults({
        skills: ["Prompt engineering optimization", "Multi-agent orchestration", "Vector Search (PGVector/Milvus)", "RAG indexing architecture", "Cognitive API validation"],
        certifications: [
          {
            id: 'openai-prompt-developers',
            name: 'ChatGPT Developer Academy & Prompt Specialist',
            provider: 'OpenAI Academy / DeepLearning',
            difficulty: 'Beginner',
            costRange: 'Free',
            priorityOrder: 1,
            description: 'Focuses on API model latency, prompt variables, cognitive RAG pipelines, and systematic testing.',
            officialLink: 'https://platform.openai.com/docs/guides/prompt-engineering'
          }
        ]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const trimmed = marketSearchQuery.trim();
    if (!trimmed) {
      setAnalysisResults(null);
      lastSearchedQueryRef.current = '';
      return;
    }

    const timer = setTimeout(() => {
      handleMarketAnalysis(trimmed);
    }, 1200);

    return () => clearTimeout(timer);
  }, [marketSearchQuery]);

  const handleSyncToLibrary = () => {
    if (!analysisResults) return;
    setIsSyncingLibraries(true);
    
    const newSkills = analysisResults.skills || [];
    setCustomSkills(prev => Array.from(new Set([...prev, ...newSkills])));
    setSelectedSkills(prev => Array.from(new Set([...prev, ...newSkills])));
    
    setTimeout(() => {
      setIsSyncingLibraries(false);
      setSyncCompleted(true);
    }, 1000);
  };

  const handleStartRoleChange = (roleId: string) => {
    setCurrentStartRoleId(roleId);
    if (roleId === 'career-switcher') {
      setSelectedSkills([]);
      setProficiencyLevel('beginner');
    } else if (roleId === 'non-tech') {
      setSelectedSkills(['Customer support']);
      setProficiencyLevel('beginner');
    } else {
      const selectedRoleData = ALL_ROLES_DATA[roleId];
      if (selectedRoleData) {
        if (selectedRoleData.level === 'Entry-level') setProficiencyLevel('beginner');
        else if (selectedRoleData.level === 'Mid-level') setProficiencyLevel('intermediate');
        else setProficiencyLevel('advanced');

        const startingSkills = [
          ...selectedRoleData.mustHaves.tech,
          ...selectedRoleData.mustHaves.process,
          ...selectedRoleData.toolsToLearn
        ];

        const mapped = START_SKILLS_MAP[roleId] || [];
        const mergedSkills = Array.from(new Set([...startingSkills, ...mapped]));
        setSelectedSkills(mergedSkills);
      }
    }
  };

  const handleGenerateJourney = () => {
    setHasCompletedOnboard(true);
    setExpandedStageIndex(0);
    localStorage.setItem('pathfinder_completed_onboard_v2', 'true');
    setTimeout(() => {
      const container = document.getElementById('path-finder-block');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleInternalScroll = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResetWizard = () => {
    setHasCompletedOnboard(false);
    setOnboardStep(0);
  };

  // Dynamic calculated duration & cost parameters
  const getDurationAndCost = () => {
    const weeksBase = selectedRoute === 'fast' ? 5 : (selectedRoute === 'budget' || selectedRoute === 'project' ? 10 : 12);
    const gapsBonus = analysis.skillsGap.length * 1.5;
    const finalWeeks = Math.max(1, Math.round(weeksBase + gapsBonus));
    
    const isGlobal = countryMarket === 'Global';
    let baseMinInr = 3000;
    let baseMaxInr = 5000;

    // Scale cost limits slightly depending on preferredIndustry focus
    if (preferredIndustry === 'Cybersecurity') {
      baseMinInr = 5000;
      baseMaxInr = 8000;
    } else if (preferredIndustry === 'Cloud' || preferredIndustry === 'SRE / DevOps') {
      baseMinInr = 4000;
      baseMaxInr = 6500;
    }

    let cost = '';
    if (selectedRoute === 'budget') {
      cost = isGlobal ? '$0 USD (100% Free Resources)' : '₹0 (100% Free Resources)';
    } else if (selectedRoute === 'balanced') {
      cost = isGlobal 
        ? `$${Math.round(baseMinInr / 80)} - $${Math.round(baseMaxInr / 80)} USD` 
        : `₹${baseMinInr.toLocaleString('en-IN')} - ₹${baseMaxInr.toLocaleString('en-IN')}`;
    } else {
      const highCostInr = baseMaxInr * 2.5;
      cost = isGlobal 
        ? `$${Math.round(highCostInr / 80)} USD (Cred Certs)` 
        : `₹${highCostInr.toLocaleString('en-IN')} (Cred Certs)`;
    }
    return { finalWeeks, cost };
  };

  const currentRoleDisplayName = currentStartRoleId === 'career-switcher'
    ? 'Student / Switcher'
    : currentStartRoleId === 'non-tech'
      ? 'Non-Tech Professional'
      : (ALL_ROLES_DATA[currentStartRoleId]?.title || 'Starter Role');

  const stats = getDurationAndCost();

  // Helper to find which taxonomy category owns this role
  const getTaxonomyCategoryForRole = (roleTitle: string): string => {
    const foundCategory = IT_TAXONOMY_DATA.find(cat => 
      Object.values(cat.rolesByLevel).some(roleList => 
        roleList.some(rName => rName.toLowerCase() === roleTitle.toLowerCase() || rName.toLowerCase().includes(roleTitle.toLowerCase()) || roleTitle.toLowerCase().includes(rName.toLowerCase()))
      )
    );
    return foundCategory ? foundCategory.name : "Other Technical Roles";
  };

  const startingOptions: DropdownOption[] = [
    { id: 'career-switcher', title: 'Student / Tech Career Switcher (Beginner)', icon: '🎓' },
    { id: 'non-tech', title: 'Non-Tech Professional / Alternate Business Sector', icon: '💼' },
    ...Object.values(ALL_ROLES_DATA).map((role) => ({
      id: role.id,
      title: role.title,
      domain: getTaxonomyCategoryForRole(role.title),
      level: role.level
    }))
  ];

  const targetOptions: DropdownOption[] = Object.values(ALL_ROLES_DATA).map((role) => ({
    id: role.id,
    title: role.title,
    domain: getTaxonomyCategoryForRole(role.title),
    level: role.level
  }));

  return (
    <div 
      className={`w-full ${isLight ? 'bg-white border-slate-300 text-slate-850' : 'bg-[#070b13] border-[#121c38] text-white'} border-2 p-5 md:p-6 rounded-none relative transition-all duration-300 ${
        isHighlighted 
          ? '!border-yellow-400 border-blink z-30 shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
          : ''
      }`} 
      id="path-finder-block"
    >
      {/* HEADER BAR */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b-2 ${isLight ? 'border-slate-200' : 'border-[#121c38]'} pb-4`}>
        {hasCompletedOnboard && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleResetWizard}
              className="px-3 py-1.5 border border-amber-500/50 text-amber-400 text-xs font-mono font-bold hover:bg-amber-500/10 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> [Restart Wizard]
            </button>
            <button
              onClick={handleSavePathway}
              className={`px-3 py-1.5 font-mono font-bold text-xs transition-all duration-250 cursor-pointer flex items-center gap-1.5 ${
                isPathSaved 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-black'
              }`}
              title={isPathSaved ? "Click to remove this pathway from Bookmarks" : "Save this pathway to Bookmarks"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isPathSaved ? 'fill-black text-black' : 'fill-none text-black'}`} />
              {isPathSaved ? '✓ PATH SAVED' : 'SAVE PATH'}
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* PATH PLANNER SUB-CATEGORY TABS */}
      {/* ========================================================= */}
      <div className={`flex flex-wrap justify-center border-b-2 ${isLight ? 'border-slate-200' : 'border-[#121c38]'} mb-6 gap-2`}>
        <button
          type="button"
          onClick={() => setActiveSubTab('ambition')}
          className={`flex-1 md:flex-initial px-5 py-3 text-xs font-mono font-bold uppercase transition-all border-b-2 -mb-[2px] flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'ambition'
              ? `border-[#10b981] ${isLight ? 'text-emerald-700 bg-emerald-500/5' : 'text-[#10b981] bg-[#10b981]/5'}`
              : `border-transparent ${isLight ? 'text-slate-500 hover:text-slate-950' : 'text-gray-400 hover:text-white'} hover:bg-slate-500/5`
          }`}
        >
          <Compass className="w-4 h-4" /> Ambition Path Advisor
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('fallback')}
          className={`flex-1 md:flex-initial px-5 py-3 text-xs font-mono font-bold uppercase transition-all border-b-2 -mb-[2px] flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'fallback'
              ? `border-emerald-500 ${isLight ? 'text-emerald-700 bg-emerald-500/5' : 'text-emerald-400 bg-emerald-500/5'}`
              : `border-transparent ${isLight ? 'text-slate-500 hover:text-slate-950' : 'text-gray-400 hover:text-white'} hover:bg-slate-500/5`
          }`}
        >
          <Shield className="w-4 h-4" /> Fallback Career Routes
        </button>
      </div>

      {activeSubTab === 'ambition' ? (
        !hasCompletedOnboard ? (
        <div className={`${isLight ? 'bg-white border-slate-300' : 'bg-[#0a0f1d] border-[#121c38]'} border p-4 md:p-6 font-mono max-w-3xl mx-auto space-y-6`} style={{ contentVisibility: 'auto' }}>
          
          {/* Progress header tabs */}
          <div className={`flex items-center justify-between text-[10px] md:text-xs border-b ${isLight ? 'border-slate-200 text-slate-700' : 'border-slate-800 text-gray-400'} pb-3 font-bold uppercase text-center`}>
            <div className={`flex-1 pb-1 border-b-2 ${onboardStep === 0 ? 'text-[#10b981] border-[#10b981]' : 'text-gray-500 border-transparent'}`}>
              1. Where are you?
            </div>
            <div className="px-2 text-slate-500">➜</div>
            <div className={`flex-1 pb-1 border-b-2 ${onboardStep === 1 ? 'text-amber-500 border-amber-500' : 'text-gray-500 border-transparent'}`}>
              2. Goals & Market
            </div>
            <div className="px-2 text-slate-500">➜</div>
            <div className={`flex-1 pb-1 border-b-2 ${onboardStep === 2 ? 'text-cyan-500 border-cyan-500' : 'text-gray-500 border-transparent'}`}>
              3. Preference
            </div>
          </div>

          {/* STEP 1: CURRENT POSITION */}
          {onboardStep === 0 && (
            <div className="space-y-4 fade-in">
              <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900 border-l-[#10b981]' : 'text-white border-l-[#10b981]'} border-l-2 pl-2 uppercase`}>Step 1 — Where are you now?</h4>
              
              <div className="space-y-2">
                <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-300 font-bold'}`}>1. Select your starting role/checkpoint:</label>
                <SearchableDropdown
                  value={currentStartRoleId}
                  onChange={handleStartRoleChange}
                  options={startingOptions}
                  colorClass="text-[#10b981]"
                  isLight={isLight}
                />
              </div>

              <div className="space-y-2">
                <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-300 font-bold'}`}>2. Your proficiency & corporate experience:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => {
                    const active = proficiencyLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleProficiencyLevelChange(level)}
                        className={`py-2 border uppercase font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                          active
                            ? `border-[#10b981] bg-[#10b981]/15 ${isLight ? 'text-[#047857]' : 'text-white'}`
                            : isLight
                              ? 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              : 'border-slate-800 bg-black/40 text-gray-500 hover:border-slate-700 hover:text-gray-300'
                        }`}
                      >
                        <span className="text-xs">{level}</span>
                        <span className="text-[8px] opacity-70 font-normal">
                          {level === 'beginner' ? '0-2 Yrs' : level === 'intermediate' ? '2-5 Yrs' : '5+ Yrs'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skills multicheck */}
              <div className="space-y-2">
                <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-303 font-bold'}`}>3. Check tools/skills you already manage:</label>
                <p className="text-[10px] text-[#10b981] leading-relaxed">Checking these will hide them from your missing gaps to shorten your pathway map.</p>
                
                {/* Search Box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillSearchBoxQuery}
                    onChange={(e) => setSkillSearchBoxQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && skillSearchBoxQuery.trim()) {
                        e.preventDefault();
                        handleAddCustomSkillDirectly(skillSearchBoxQuery);
                      }
                    }}
                    placeholder="Search 500+ database skills & tools (e.g. 'Docker', 'React', 'Kubernetes', 'SQL')..."
                    className={`flex-1 ${isLight ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-black/40 border-[#slate-700] text-white placeholder-slate-500'} border text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#10b981]`}
                  />
                  {skillSearchBoxQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => handleAddCustomSkillDirectly(skillSearchBoxQuery)}
                      className="px-3 py-1.5 bg-[#10b981] hover:bg-emerald-400 text-black text-[10px] font-bold uppercase font-mono shrink-0 cursor-pointer"
                    >
                      + Add New
                    </button>
                  )}
                </div>

                <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border p-2.5 ${isLight ? 'bg-white border-slate-300' : 'bg-black/50 border-slate-800'}`}>
                  {filteredSkillOptions.length === 0 ? (
                    <div className="col-span-3 flex items-center justify-between text-[10px] text-gray-500 italic p-1">
                      <span>No matching database skills found for "{skillSearchBoxQuery}".</span>
                      <button
                        type="button"
                        onClick={() => handleAddCustomSkillDirectly(skillSearchBoxQuery)}
                        className="px-2 py-0.5 bg-[#10b981] text-black font-bold uppercase not-italic text-[9px] cursor-pointer"
                      >
                        + Add "{skillSearchBoxQuery.trim()}"
                      </button>
                    </div>
                  ) : (
                    filteredSkillOptions.map((skill) => {
                      const checked = selectedSkills.includes(skill);
                      return (
                        <label key={skill} className={`flex items-center gap-2 text-[10px] ${isLight ? 'text-slate-700 hover:text-slate-950' : 'text-gray-300 hover:text-white'} cursor-pointer transition select-none`}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleSkill(skill)}
                            className="accent-[#10b981] w-3.5 h-3.5 block cursor-pointer"
                          />
                          <span className={checked ? 'text-[#10b981] font-bold' : ''}>{skill}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Completed certifications Completed */}
              <div className="space-y-2">
                <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-303 font-bold'}`}>4. Certifications you already hold (Optional):</label>
                
                {/* Search Box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={certSearchBoxQuery}
                    onChange={(e) => setCertSearchBoxQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && certSearchBoxQuery.trim()) {
                        e.preventDefault();
                        handleAddCustomCertDirectly(certSearchBoxQuery);
                      }
                    }}
                    placeholder="Search database certifications (e.g. 'AWS', 'AZ-104', 'CCNA', 'Security+')..."
                    className={`flex-1 ${isLight ? 'bg-white border-slate-300 text-slate-800 placeholder-slate-400' : 'bg-black/40 border-[#slate-700] text-white placeholder-slate-500'} border text-xs px-2.5 py-1.5 focus:outline-none focus:border-amber-400 text-white`}
                  />
                  {certSearchBoxQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => handleAddCustomCertDirectly(certSearchBoxQuery)}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold uppercase font-mono shrink-0 cursor-pointer"
                    >
                      + Add New
                    </button>
                  )}
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto border p-2.5 ${isLight ? 'bg-white border-slate-300' : 'bg-black/50 border-slate-800'}`}>
                  {filteredCertOptions.length === 0 ? (
                    <span className="text-[10px] text-gray-500 col-span-2 italic">No matching certs found. Type above to add.</span>
                  ) : (
                    filteredCertOptions.map((cert) => {
                      const active = completedCerts.includes(cert);
                      return (
                        <label key={cert} className={`flex items-center gap-2 text-[9.5px] ${isLight ? 'text-slate-700 hover:text-slate-950' : 'text-gray-400 hover:text-white'} cursor-pointer transition select-none`}>
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => handleToggleCert(cert)}
                            className="accent-[#10b981] w-3 h-3 cursor-pointer"
                          />
                          <span className={active ? 'text-amber-500 font-bold' : ''}>{cert}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setOnboardStep(1)}
                  className="px-5 py-2 bg-[#10b981] hover:bg-[#10b981]/80 text-black font-bold text-xs uppercase cursor-pointer flex items-center gap-1"
                >
                  Define Goals <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DESTINATION GOALS */}
          {onboardStep === 1 && (
            <div className="space-y-4 fade-in">
              <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900 border-l-amber-500' : 'text-white border-l-amber-400'} border-l-2 pl-2 uppercase`}>Step 2 — Where do you want to go?</h4>
 
              <div className="space-y-2">
                <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-300 font-bold'}`}>1. Target Career Role/Node:</label>
                <SearchableDropdown
                  value={targetRoleId}
                  onChange={setTargetRoleId}
                  options={targetOptions}
                  colorClass="text-amber-500"
                  isLight={isLight}
                />
              </div>
 
              <div className="space-y-2">
                <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-300 font-bold'}`}>2. Preferred Core Tech Domain:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {getCoreTechDomainsForRole(targetRoleId, ALL_ROLES_DATA[targetRoleId]?.domain).map((ind) => {
                    const active = preferredIndustry === ind;
                    return (
                      <button
                        key={ind}
                        onClick={() => setPreferredIndustry(ind)}
                        className={`p-2 border uppercase font-bold text-center cursor-pointer transition ${
                          active 
                            ? `border-amber-500 bg-amber-500/10 ${isLight ? 'text-amber-700' : 'text-white'}` 
                            : isLight 
                              ? 'border-slate-300 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900' 
                              : 'border-slate-800 text-gray-500 hover:text-white'
                        }`}
                      >
                        {ind}
                      </button>
                    );
                  })}
                </div>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-300 font-bold'}`}>3. Country / Target Job Market:</label>
                  <select
                    value={countryMarket}
                    onChange={(e) => setCountryMarket(e.target.value)}
                    className={`w-full ${isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#05070c] border border-slate-700 text-white'} border text-xs p-2.5 select-none focus:outline-none`}
                  >
                    <option value="India">India Market (INR / Lacs)</option>
                    <option value="Global">United States / Global Market ($ USD)</option>
                  </select>
                </div>
 
                <div className="space-y-2">
                  <label className={`block text-xs ${isLight ? 'text-slate-800 font-extrabold' : 'text-slate-300 font-bold'}`}>4. Weekly devotion budget:</label>
                  <div className={`flex justify-between text-[11px] ${isLight ? 'text-slate-500 font-bold animate-pulse' : 'text-gray-400'}`}>
                    <span>Part-Time</span>
                    <span className="text-amber-500 font-black font-mono">{weeklyHours} hrs/week</span>
                    <span>Full-Time</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="5"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5"
                  />
                </div>
              </div>
 
              <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'} flex justify-between`}>
                <button
                  onClick={() => setOnboardStep(0)}
                  className={`px-4 py-2 border ${isLight ? 'border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900' : 'border-slate-800 text-gray-400 hover:text-white'} text-xs uppercase cursor-pointer`}
                >
                  ◀ Back
                </button>
                <button
                  onClick={() => setOnboardStep(2)}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs uppercase cursor-pointer flex items-center gap-1"
                >
                  Select Preferences <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
 
          {/* STEP 3: PREFERRED TRACKS */}
          {onboardStep === 2 && (
            <div className="space-y-4 fade-in">
              <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900 border-l-cyan-500' : 'text-white border-l-cyan-400'} border-l-2 pl-2 uppercase`}>Step 3 — How do you want to learn?</h4>
              <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-gray-400'} leading-relaxed font-mono`}>We customize sandbox projects, books, resource directories, and exam plans according to your choice.</p>
 
              <div className="space-y-3">
                {[
                  {
                    id: 'balanced',
                    title: '⚖️ Balanced Route',
                    sub: 'Recommended. Harmonious combination of theory, direct practical sandboxes, and certifications.',
                    color: isLight ? 'hover:border-slate-400' : 'hover:border-slate-500'
                  },
                  {
                    id: 'cert',
                    title: '📜 Certification-First Route',
                    sub: 'Maximizes formal testing. Ideal for corporate resume validation and HR screenings.',
                    color: isLight ? 'hover:border-yellow-400' : 'hover:border-yellow-500'
                  },
                  {
                    id: 'project',
                    title: '🛠️ Practical Route',
                    sub: 'Maximizes home labs. Perfect for portfolios, direct command-line skills, and GitHub evidence.',
                    color: isLight ? 'hover:border-emerald-400' : 'hover:border-emerald-500'
                  },
                  {
                    id: 'fast',
                    title: '⚡ Fastest Route',
                    sub: 'Shortest path. Bridges ONLY critical gaps to get you role-ready in half the time.',
                    color: isLight ? 'hover:border-purple-400' : 'hover:border-purple-500'
                  },
                  {
                    id: 'budget',
                    title: '💵 Budget Route',
                    sub: 'Zero cost. Structured utilizing Swayam, free YouTube instructor lists, and free test tiers.',
                    color: isLight ? 'hover:border-cyan-400' : 'hover:border-cyan-500'
                  }
                ].map((routeOpt) => {
                  const isActive = selectedRoute === routeOpt.id;
                  return (
                    <div
                      key={routeOpt.id}
                      onClick={() => setSelectedRoute(routeOpt.id as any)}
                      className={`p-3 border-2 transition-all cursor-pointer ${
                        isActive 
                          ? `border-cyan-500 bg-cyan-500/10` 
                          : `${isLight ? 'border-slate-300 bg-white text-slate-800' : `border-slate-800/80 bg-black/40 text-gray-400`} ${routeOpt.color}`
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <strong className={`text-xs ${isActive ? (isLight ? 'text-cyan-705 font-bold' : 'text-white') : (isLight ? 'text-slate-800 font-semibold' : 'text-gray-200')}`}>{routeOpt.title}</strong>
                        {isActive && <span className="text-[10px] bg-cyan-400 text-black font-bold px-1.5 uppercase font-mono">SELECTED</span>}
                      </div>
                      <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-gray-400'} leading-relaxed font-sans`}>{routeOpt.sub}</p>
                    </div>
                  );
                })}
              </div>

              <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'} flex justify-between`}>
                <button
                  onClick={() => setOnboardStep(1)}
                  className={`px-4 py-2 border ${isLight ? 'border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900' : 'border-slate-800 text-gray-400 hover:text-white'} text-xs uppercase cursor-pointer`}
                >
                  ◀ Back
                </button>
                <button
                  onClick={handleGenerateJourney}
                  className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-black font-bold text-xs uppercase cursor-pointer flex items-center gap-1 shadow-md"
                >
                  Generate Visual Journey <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (

        /* ========================================================= */
        /* 2. RE-DESIGNED PATHS DASHBOARD (IF ONBOARD IS COMPLETE) */
        /* ========================================================= */
        <div className="space-y-6">

          {/* FIRST ROW: PATH METADATA HEADER GRID */}
          <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${isLight ? 'bg-white border-2 border-slate-300' : 'bg-[#0a0f1d] border-2 border-[#121c38]'} p-4 font-mono`}>
            <div className="space-y-1">
              <span className="text-[9px] uppercase text-gray-500 block">Current Pathway</span>
              <h4 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-white'} uppercase sm:text-xs`}>
                {currentRoleDisplayName}
              </h4>
              <div className="text-[#10b981] font-bold text-xs uppercase flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" /> {targetRole.title}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase text-gray-500 block">Transition & Difficulty</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-[#c084fc]/15 border border-[#a855f7]/30 text-[#c084fc] font-bold px-1.5 py-0.5 select-none uppercase text-[10px]">
                  {transitionInfo.type}
                </span>
              </div>
              <p className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>Estimated Prep: {stats.finalWeeks} Weeks</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase text-gray-500 block">Estimated Course Cost</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-amber-500 font-bold">{stats.cost}</span>
              </div>
              <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-gray-500'} uppercase`}>Weekly commitment: {weeklyHours}h</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase text-gray-500 block">Current Match Score</span>
              <div className="flex items-center justify-between">
                <strong className="text-emerald-500 font-bold text-lg">{analysis.matchScore}% Match</strong>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>({analysis.matchingSkills.length}/{analysis.totalNeeded} Gaps Verified)</span>
              </div>
              <div className={`w-full ${isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800/80'} h-1.5 border`}>
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${analysis.matchScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC QUICK ROUTE CHANGER COMPONENT */}
          <div className={`${isLight ? 'bg-white border-slate-300' : 'bg-[#0a0f1d] border border-slate-800'} p-2.5 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-3`}>
            <strong className={`${isLight ? 'text-slate-800' : 'text-slate-200'} select-none uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1.5`}>
              <Flame className="w-3.5 h-3.5 text-amber-500" /> Switch Route View:
            </strong>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 w-full">
              {[
                { id: 'balanced', label: 'Balanced', color: isLight ? 'border-slate-300 text-slate-700' : 'border-slate-800 hover:border-slate-500 text-white' },
                { id: 'cert', label: 'Cert First', color: isLight ? 'border-amber-300 text-amber-600' : 'border-yellow-950 text-amber-400' },
                { id: 'project', label: 'Practical', color: isLight ? 'border-emerald-300 text-emerald-600' : 'border-emerald-950 text-emerald-400' },
                { id: 'fast', label: 'Fastest Route', color: isLight ? 'border-purple-300 text-purple-600' : 'border-purple-950 text-purple-400' },
                { id: 'budget', label: 'Lowest Cost', color: isLight ? 'border-cyan-300 text-cyan-600' : 'border-cyan-950 text-cyan-400' }
              ].map((routeBtn) => {
                const active = selectedRoute === routeBtn.id;
                return (
                  <button
                    key={routeBtn.id}
                    onClick={() => setSelectedRoute(routeBtn.id as any)}
                    className={`py-1 text-[10px] border font-bold uppercase cursor-pointer transition text-center ${
                      active 
                        ? isLight 
                          ? 'bg-white text-slate-950 border-slate-950 border-2 shadow-sm' 
                          : 'bg-white text-black border-white shadow-sm' 
                        : isLight 
                          ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50' 
                          : `${routeBtn.color} bg-black/40`
                    }`}
                  >
                    {routeBtn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECOND ROW: YOUR NEXT BEST ACTION CARD (MUST BE PROMINENT AT TOP) */}
          <div className={`${isLight ? 'bg-emerald-50/40 border-emerald-500/20 shadow-sm text-slate-800' : 'bg-[#0a2f1d]/10 border-2 border-emerald-500/20'} p-4 font-mono relative overflow-hidden shadow-[2px_2px_10px_rgba(16,185,129,0.05)] border-2`}>
            <div className="absolute top-0 right-0 bg-[#10b981]/15 text-[#10b981] text-[8px] font-bold tracking-widest px-2.5 py-1 uppercase select-none border-b border-l border-emerald-55/20">
              ⚡ RECOMMENDED START ACTIONS
            </div>
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest block">your next step</span>
                <h3 className={`text-md font-bold ${isLight ? 'text-slate-900' : 'text-white'} normal-case leading-tight`}>{nextAction.title}</h3>
                <p className={`text-[11px] ${isLight ? 'text-slate-600 font-medium' : 'text-gray-400'} leading-relaxed font-sans`}>
                  <strong>Why:</strong> {nextAction.why}
                </p>
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${isLight ? 'bg-slate-50 border border-slate-200' : 'bg-black/40 border border-slate-800/80'} p-2.5 text-[10px] text-slate-500`}>
                <div>
                  <span className="text-gray-400 uppercase block font-bold text-[8.5px]">Expected time study</span>
                  <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>{nextAction.time}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase block font-bold text-[8.5px]">Evidence task output</span>
                  <span className="font-bold text-amber-500">{nextAction.evidence}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    const idx = currentGatesList.findIndex(g => g.name.toLowerCase().includes('fundamental') || g.id === 1);
                    if (idx !== -1) {
                      setExpandedStageIndex(idx);
                      const el = document.getElementById(`stage-gate-card-${idx}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-[#10b981]/80 font-bold text-black uppercase text-[10px] cursor-pointer"
                >
                  Start Learning
                </button>
                {nextAction.skill && (
                  <button
                    onClick={() => {
                      if (!selectedSkills.includes(nextAction.skill!)) {
                        setSelectedSkills([...selectedSkills, nextAction.skill!]);
                        alert(`✔️ "${nextAction.skill}" added to your verified skills list.`);
                      }
                    }}
                    className={`px-3 py-1.5 border ${isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-slate-300 hover:bg-slate-800'} font-bold text-[10px] cursor-pointer`}
                  >
                    Mark as Already Known
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleResetWizard}
                  className={`px-3 py-1.5 border border-dashed ${isLight ? 'border-cyan-500 text-cyan-600 hover:bg-cyan-50' : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-400'} text-[10px] cursor-pointer`}
                >
                  View Alternatives
                </button>
              </div>
            </div>
          </div>

          {/* THIRD ROW: LEARNING VS CAREER SPLIT GAUGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            
            <div className={`${isLight ? 'bg-white border border-slate-300' : 'bg-[#0a0f1d] border border-slate-800'} p-3 flex items-center gap-3`}>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-bold text-emerald-500 shrink-0 select-none">
                {Math.min(100, Math.round(analysis.matchScore * 1.1))}%
              </div>
              <div>
                <strong className={`${isLight ? 'text-slate-800' : 'text-white'} text-xs uppercase block`}>Learning Track</strong>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>Skills, tools, & resources study coverage of nodes.</span>
              </div>
            </div>

            <div className={`${isLight ? 'bg-white border border-slate-300' : 'bg-[#0a0f1d] border border-slate-800'} p-3 flex items-center gap-3`}>
              <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 flex items-center justify-center font-bold text-amber-500 shrink-0 select-none">
                {Math.max(20, Math.round(analysis.matchScore * 0.75))}%
              </div>
              <div>
                <strong className={`${isLight ? 'text-slate-800' : 'text-white'} text-xs uppercase block`}>Career Track</strong>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-gray-500'}`}>Resume, portfolio documents, & outreach preps.</span>
              </div>
            </div>

            <div className={`${isLight ? 'bg-white border border-slate-300' : 'bg-[#0a0f1d] border border-slate-800'} p-3 flex items-center gap-3`}>
              <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 flex items-center justify-center font-bold text-cyan-500 shrink-0 select-none">
                {Math.max(15, Math.round(analysis.matchScore * 0.82))}%
              </div>
              <div>
                <strong className="text-white text-xs uppercase block">Interview Readiness</strong>
                <span className="text-[10px] text-gray-500">SLA targets, client briefs & live simulated deck.</span>
              </div>
            </div>

          </div>

          {/* FOURTH ROW: ROUTE Timeline ROADMAP */}
          <div className={`${isLight ? 'bg-white border-2 border-slate-300' : 'bg-[#05070c] border border-slate-800'} p-4 font-mono`}>
            <h4 className={`text-xs uppercase ${isLight ? 'text-slate-700' : 'text-slate-400'} font-bold mb-4 tracking-wider`}>🗺️ Career Pathway Roadmap:</h4>
            
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center min-w-[700px] text-xs relative select-none">
                
                {/* Checkpoint 0 */}
                <div className={`flex-grow flex-1 flex flex-col items-center justify-center text-center p-2 border ${isLight ? 'bg-slate-50 border-slate-250' : 'bg-[#070b13] border-slate-800'} relative z-10`}>
                  <span className="text-[8px] uppercase text-gray-500">Starting Point</span>
                  <strong className={`${isLight ? 'text-slate-800 font-extrabold' : 'text-white'} text-[10px] mt-0.5 max-w-[120px] truncate`}>{currentRoleDisplayName}</strong>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1.5" />
                </div>
                
                <div className={`w-4 h-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'} shrink-0`} />

                {/* Checkpoint 1 */}
                <div className={`flex-grow flex-1 flex flex-col items-center justify-center text-center p-2 border ${isLight ? 'bg-slate-50 border-slate-250' : 'bg-[#070b13] border-slate-800'} relative z-10`}>
                  <span className="text-[8px] text-[#10b981] font-bold uppercase">Stage 1</span>
                  <strong className={`${isLight ? 'text-slate-700 font-bold' : 'text-gray-300'} text-[10px] mt-0.5 max-w-[120px] truncate`}>Core Skills</strong>
                  {analysis.matchScore > 25 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1.5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-2.5" />}
                </div>

                <div className={`w-4 h-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'} shrink-0`} />

                {/* Checkpoint 2 */}
                <div className={`flex-grow flex-1 flex flex-col items-center justify-center text-center p-2 border ${isLight ? 'bg-slate-50 border-slate-250' : 'bg-[#070b13] border-slate-800'} relative z-10`}>
                  <span className="text-[8px] text-amber-500 font-extrabold uppercase">Stage 2</span>
                  <strong className={`${isLight ? 'text-slate-700 font-bold' : 'text-gray-300'} text-[10px] mt-0.5 max-w-[120px] truncate`}>Tech Platforms</strong>
                  {analysis.matchScore > 50 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1.5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-2.5" />}
                </div>

                <div className={`w-4 h-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'} shrink-0`} />

                {/* Checkpoint 3 */}
                <div className={`flex-grow flex-1 flex flex-col items-center justify-center text-center p-2 border ${isLight ? 'bg-slate-50 border-slate-250' : 'bg-[#070b13] border-slate-800'} relative z-10`}>
                  <span className="text-[8px] text-cyan-500 font-extrabold uppercase">Stage 3</span>
                  <strong className={`${isLight ? 'text-slate-700 font-bold' : 'text-gray-300'} text-[10px] mt-0.5 max-w-[120px] truncate`}>Hands-On Labs</strong>
                  {analysis.matchScore > 75 ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1.5" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-2.5" />}
                </div>

                <div className={`w-4 h-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'} shrink-0`} />

                {/* Checkpoint 4 */}
                <div className={`flex-grow flex-1 flex flex-col items-center justify-center text-center p-2 border ${isLight ? 'bg-slate-50 border-purple-300' : 'bg-[#070b13] border-[#a855f7]/40'} relative z-10`}>
                  <span className="text-[8px] text-[#c084fc] font-bold uppercase">Stage 4</span>
                  <strong className={`${isLight ? 'text-slate-700 font-bold' : 'text-gray-300'} text-[10px] mt-0.5 max-w-[120px] truncate`}>Certs & Creds</strong>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-2.5" />
                </div>

                <div className={`w-4 h-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'} shrink-0`} />

                {/* Target */}
                <div className={`flex-grow flex flex-col items-center justify-center text-center p-2 ${isLight ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-[#091512] border-2 border-[#10b981]/50'} relative z-10`}>
                  <span className={`text-[8px] ${isLight ? 'text-emerald-700 font-bold' : 'text-emerald-400'} font-bold uppercase tracking-wider`}>Destination</span>
                  <strong className={`${isLight ? 'text-emerald-800 font-extrabold' : 'text-[#10b981]'} text-[10px] mt-0.5 max-w-[150px] truncate`}>{targetRole.title}</strong>
                  <Compass className="w-4 h-4 text-[#10b981] mt-1.5 animate-pulse" />
                </div>

              </div>
            </div>

            {/* Specializations inline branch routes */}
            <div className={`mt-3 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-slate-900'} grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10.5px] ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              <div className={`${isLight ? 'bg-cyan-50/50 border border-cyan-200' : 'bg-[#0b1021]'} p-2 flex items-center justify-between`}>
                <div>
                  <span className="text-[8px] text-cyan-600 font-bold uppercase block">⚡ Optional Specialization offshoot:</span>
                  <strong className={isLight ? 'text-slate-800' : 'text-white'}>Automation & Tool Infrastructure</strong>
                </div>
                <button
                  onClick={() => {
                    if (!customSkills.includes('Bash Scripting')) {
                      setCustomSkills([...customSkills, 'Bash Scripting', 'PowerShell']);
                    }
                    alert("Added Bash & PowerShell automation courses inline to your current pathway list!");
                  }}
                  className={`px-2 py-1 ${isLight ? 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800 font-extrabold' : 'bg-cyan-950/40 text-cyan-400 hover:bg-cyan-900/30'} text-[9.5px] cursor-pointer`}
                >
                  + Add Option
                </button>
              </div>

              <div className={`${isLight ? 'bg-red-50/50 border border-red-200' : 'bg-[#211019]'} p-2 flex items-center justify-between`}>
                <div>
                  <span className="text-[8px] text-red-500 font-bold uppercase block">⚡ Optional Specialization offshoot:</span>
                  <strong className={isLight ? 'text-slate-800' : 'text-white'}>Adversary Security Scanning</strong>
                </div>
                <button
                  onClick={() => {
                    if (!customSkills.includes('Nmap Scanning')) {
                      setCustomSkills([...customSkills, 'Nmap Scanning', 'Wireshark']);
                    }
                    alert("Added Nmap & Cyber Scanning checklists inline to your active target map!");
                  }}
                  className={`px-2 py-1 ${isLight ? 'bg-red-100 hover:bg-red-200 text-red-800 font-extrabold' : 'bg-red-950/40 text-red-400 hover:bg-red-900/40'} text-[9.5px] cursor-pointer`}
                >
                  + Add Option
                </button>
              </div>
            </div>

          </div>

          {/* FIFTH ROW: GAP ANALYSIS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            
            <div className={`${isLight ? 'bg-emerald-50/20 border border-emerald-300/40' : 'bg-[#081512] border border-emerald-900/40'} p-4 space-y-3`}>
              <h5 className={`font-bold ${isLight ? 'text-emerald-700 border-emerald-200/60' : 'text-emerald-400 border-emerald-950'} uppercase tracking-widest text-[11px] border-b pb-2 flex items-center gap-1.5 select-none`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Already Covered ({analysis.matchingSkills.length}):
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {analysis.matchingSkills.map((skill) => (
                  <div key={skill} className={`${isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-emerald-950/40 text-gray-300'} p-2 border flex items-center gap-1.5 text-[10.5px]`}>
                    <Check className="w-3.5 h-3.5 text-emerald-550 shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
                {analysis.matchingSkills.length === 0 && (
                  <p className={`text-slate-500 text-[11px] font-sans`}>No matching baseline skills checked yet.</p>
                )}
              </div>
            </div>

            <div className={`${isLight ? 'bg-amber-50/10 border border-amber-200/50' : 'bg-[#150e08] border border-amber-900/40'} p-4 space-y-3`}>
              <h5 className={`font-bold ${isLight ? 'text-amber-700 border-amber-200/60' : 'text-amber-400 border-amber-950'} uppercase tracking-widest text-[11px] border-b pb-2 flex items-center gap-1.5 select-none`}>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Missing for {targetRole.title} ({analysis.skillsGap.length}):
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {analysis.skillsGap.map((skill) => (
                  <div key={skill} className={`${isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-amber-950/40 text-gray-300'} p-2 border flex items-center gap-1.5 text-[10.5px]`}>
                    <span className="text-amber-500 font-extrabold text-md shrink-0 leading-none">!</span>
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
                {analysis.skillsGap.length === 0 && (
                  <p className="text-emerald-600 text-[11px] font-black">🎉 Outstanding! No gaps remaining. You are fully ready to apply.</p>
                )}
              </div>
            </div>

          </div>

          {/* SIXTH ROW: MILESTONE STAGES (PROGRESSIVE DISCLOSURE LIST) */}
          <div className="space-y-4">
            <h4 className={`font-mono text-xs ${isLight ? 'text-slate-700' : 'text-slate-400'} uppercase font-bold tracking-wider select-none mb-1`}>
              🚀 TAILORED WEEKLY MILESTONES & PROOF ACTIVITIES:
            </h4>

            <div className="space-y-3 font-mono">
              {currentGatesList.map((stage, idx) => {
                const isExpanded = expandedStageIndex === idx;
                const isCompleted = completedStages.includes(idx);
                return (
                  <div 
                    key={idx} 
                    id={`stage-gate-card-${idx}`}
                    className={`border-2 transition-all duration-300 rounded-none overflow-hidden ${
                      isExpanded 
                        ? (isLight ? 'border-amber-500 bg-amber-500/5' : 'border-amber-500 bg-[#070c17]/65') 
                        : (isLight ? 'border-slate-300 bg-white hover:border-slate-400' : 'border-[#121c38]/80 bg-[#0a0f1d] hover:border-slate-800')
                    }`}
                  >
                    
                    {/* Collapsed top view */}
                    <div 
                      onClick={() => setExpandedStageIndex(isExpanded ? null : idx)}
                      className="p-3 md:p-4 cursor-pointer flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-3 space-x-1 shrink-0">
                        {isCompleted ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-400 flex items-center justify-center text-emerald-400 text-[10px] font-bold select-none">✓</div>
                        ) : (
                          <div className={`w-4 h-4 rounded-full ${isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-850 border border-slate-700 text-slate-500'} font-bold flex items-center justify-center text-[10px] select-none`}>{idx + 1}</div>
                        )}
                        <div>
                          <h5 className={`font-bold uppercase ${isExpanded ? 'text-amber-500' : (isLight ? 'text-slate-840 font-extrabold' : 'text-white')}`}>{stage.name}</h5>
                          <div className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>⏱️ {stage.estimatedTime}</span>
                            <span>•</span>
                            <span className={`text-[9px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{stage.priorityLabel}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <span className="bg-emerald-500/15 text-emerald-400 text-[8px] px-1.5 py-0.5 uppercase font-bold">COMPLETED</span>
                        ) : (
                          <span className="bg-amber-500/10 text-amber-500 text-[8px] px-1.5 py-0.5 uppercase font-bold">IN PROGRESS</span>
                        )}
                        <span className="text-gray-500 leading-none">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </div>

                    {/* Expanded Detail view (PROGRESSIVE DISCLOSURE) */}
                    {isExpanded && (
                      <div className={`border-t ${isLight ? 'border-slate-300 bg-slate-50/50' : 'border-[#121c38]/80 bg-black/40'} p-4 space-y-4 text-xs`}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className={`space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-black/30 border-slate-900'} p-2.5 border leading-relaxed`}>
                            <strong className="text-amber-500 block uppercase tracking-wider text-[9.5px]">📚 WHAT TO LEARN:</strong>
                            <p className={`${isLight ? 'text-slate-800' : 'text-gray-300'} text-[11px] font-sans`}>{stage.learn}</p>
                          </div>

                          <div className={`space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-black/30 border-slate-900'} p-2.5 border leading-relaxed`}>
                            <strong className="text-[#10b981] block uppercase tracking-wider text-[9.5px]">🏗️ WHAT TO DO (PRACTICE LAB):</strong>
                            <p className={`${isLight ? 'text-slate-800' : 'text-gray-300'} text-[11px] font-sans`}>{stage.do}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                          <div className={`space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'} p-2.5 border leading-relaxed`}>
                            <strong className="text-cyan-600 block uppercase tracking-wider text-[9.5px]">📤 WHAT TO PRODUCE (PORTFOLIO PROOF):</strong>
                            <p className={`${isLight ? 'text-slate-800' : 'text-gray-300'} text-[11px] font-sans`}>{stage.produce}</p>
                          </div>

                          <div className={`space-y-1 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'} p-2.5 border leading-relaxed`}>
                            <strong className="text-[#ec4899] block uppercase tracking-wider text-[9.5px]">📝 RESUME TEXT & KEYWORDS:</strong>
                            <p className={`${isLight ? 'text-slate-700' : 'text-gray-300'} text-[11px] font-sans select-all font-mono italic`}>
                              "{stage.resume}"
                            </p>
                          </div>
                        </div>

                        {/* Free Portals / Youtube links inside stage */}
                        <div className={`border-t ${isLight ? 'border-slate-200' : 'border-[#121c38]/40'} pt-3`}>
                          <strong className={`${isLight ? 'text-slate-700' : 'text-slate-400'} text-[10px] block mb-2 uppercase tracking-wide`}>🔗 High-Fidelity free resource paths:</strong>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {stage.resources.map((link, lidx) => (
                              <a 
                                key={lidx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`p-2 flex items-center justify-between text-[10.5px] border cursor-pointer transition ${
                                  isLight 
                                    ? 'bg-white border-slate-300 text-emerald-700 hover:bg-emerald-50/20 hover:border-emerald-500' 
                                    : 'bg-[#0a0f1d] border border-[#1e2e54]/80 text-[#10b981] hover:border-emerald-500 hover:bg-[#10b981]/10'
                                }`}
                              >
                                <span className="truncate">{link.name}</span>
                                <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Dynamic Youtube video recommendations */}
                        {(() => {
                          const ytVideos = getStageYoutubeVideos(stage.id, stage.name, targetRole.id);
                          if (ytVideos.length === 0) return null;
                          return (
                            <div className={`border-t ${isLight ? 'border-slate-200' : 'border-[#121c38]/40'} pt-3 mt-3`}>
                              <strong className={`${isLight ? 'text-slate-700' : 'text-slate-450'} text-[10px] block mb-2 uppercase tracking-wide flex items-center gap-1.5 text-red-500`}>
                                <Youtube className="w-4 h-4 shrink-0 text-red-500" /> Recommended YouTube Video Lessons:
                              </strong>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ytVideos.map((video, vidx) => (
                                  <a 
                                    key={vidx}
                                    href={video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`p-2.5 flex items-center justify-between text-[11px] border cursor-pointer transition ${
                                      isLight 
                                        ? 'bg-red-50/20 border-red-200/80 text-red-700 hover:bg-red-50/50 hover:border-red-400' 
                                        : 'bg-red-950/10 border border-red-900/30 text-red-400 hover:border-red-500/50 hover:bg-red-950/20'
                                    }`}
                                  >
                                    <div className="flex flex-col min-w-0 pr-1">
                                      <span className="font-bold truncate text-[10.5px]">{video.name}</span>
                                      <span className="text-[9px] opacity-75 truncate mt-0.5">Channel: {video.channel}</span>
                                    </div>
                                    <Video className="w-3.5 h-3.5 shrink-0 ml-2 text-red-500" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Stage Mark complete actions */}
                        <div className={`pt-3 border-t flex justify-between items-center p-2 text-[11px] ${isLight ? 'border-slate-200 bg-slate-100/50' : 'border-[#121c38]/40 bg-black/20'}`}>
                          <span className={`${isLight ? 'text-slate-700' : 'text-slate-500'} uppercase font-bold`}>Stage Status Checked:</span>
                          <button
                            onClick={() => {
                              if (isCompleted) {
                                setCompletedStages(completedStages.filter(s => s !== idx));
                              } else {
                                setCompletedStages([...completedStages, idx]);
                              }
                            }}
                            className={`px-4 py-1.5 font-bold uppercase transition select-none cursor-pointer ${
                              isCompleted 
                                ? 'bg-red-950/20 text-red-500 border border-red-900/40 hover:bg-red-900/20' 
                                : isLight 
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 text-shadow-sm' 
                                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-[#10b981]/20'
                            }`}
                          >
                            {isCompleted ? 'Mark Stage Incomplete' : '✓ Mark Stage Complete'}
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

          {/* SEVENTH ROW: SEARCH THE WEB FOR REALTIME SKILLS DOCK */}
          <div className={`${isLight ? 'bg-white border-2 border-slate-300' : 'border border-amber-500/20 bg-amber-500/5'} p-4 rounded-none font-mono text-xs space-y-3`}>
            <div className={`flex items-center gap-1.5 justify-between border-b ${isLight ? 'border-slate-200' : 'border-amber-500/10'} pb-1.5`}>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-550 text-xs animate-pulse">⚡</span>
                <span className={`${isLight ? 'text-slate-900 font-extrabold' : 'text-white'} font-bold uppercase tracking-wider text-[11px]`}>Real-Time Market Skills & Certs Dock</span>
              </div>
              <span className="bg-amber-400/[0.15] text-amber-600 px-1.5 py-0.5 text-[8.5px] uppercase font-bold">LIVE AGENT</span>
            </div>
            
            <p className={`${isLight ? 'text-slate-600 font-medium' : 'text-gray-400'} text-[10px] leading-relaxed`}>
              Dynamically pull down industry skills requirements from real-time global databases for any job role. 
            </p>

            <div className="flex gap-1.5">
              <input
                type="text"
                value={marketSearchQuery}
                onChange={(e) => setMarketSearchQuery(e.target.value)}
                placeholder="Type any role... (e.g. Threat Analyst, Azure Network Associate)"
                className={`flex-1 p-2 text-[11px] focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border border-slate-300 text-slate-800 focus:border-slate-400' 
                    : 'bg-black/60 border border-slate-700 text-white'
                }`}
              />
              <button
                type="button"
                onClick={() => handleMarketAnalysis(undefined, true)}
                disabled={isAnalyzing || !marketSearchQuery.trim()}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-black px-4 font-bold uppercase cursor-pointer transition text-[10.5pt] flex items-center justify-center font-mono leading-none"
              >
                {isAnalyzing ? (
                  <>
                    <span className="animate-spin text-xs me-1">⌛</span> Analysing...
                  </>
                ) : 'Index'}
              </button>
            </div>

            {/* Live analysis loading pane */}
            {isAnalyzing && (
              <div className={`p-2.5 text-[10px] space-y-1 ${
                isLight 
                  ? 'border border-dashed border-amber-500 bg-amber-50 text-amber-800' 
                  : 'border border-dashed border-amber-500/40 bg-black/50 text-amber-300/95 animate-pulse'
              }`}>
                <div>▸ Grounding search triggers on technical matrices...</div>
                <div>▸ Synthesizing specific certifications & portals for: "{marketSearchQuery}"...</div>
              </div>
            )}

            {analysisResults && (
              <div className={`p-3 space-y-3 ${isLight ? 'bg-slate-50 border border-slate-300' : 'bg-black/60 border border-slate-800'}`}>
                <div className={`${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  <div className="text-[9.5px] text-slate-500 uppercase tracking-widest font-bold mb-1">Target Skills Discovered:</div>
                  <div className="flex flex-wrap gap-1">
                    {analysisResults.skills.map((skill: string) => (
                      <span key={skill} className={`border px-1.5 py-0.5 text-[10px] ${
                        isLight 
                          ? 'bg-white border-slate-300 text-slate-800 font-bold' 
                          : 'bg-slate-800/80 border border-slate-700 text-white'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`border-t pt-2 ${isLight ? 'border-slate-300 text-slate-800' : 'border-slate-800/60 text-slate-200'}`}>
                  <div className="text-[9.5px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">Certification Curriculums Identified:</div>
                  <div className="space-y-2">
                    {analysisResults.certifications.slice(0, 1).map((cert: any) => (
                      <div key={cert.id || cert.name} className={`border p-2 text-[10px] ${
                        isLight 
                          ? 'bg-white border-slate-200' 
                          : 'border border-slate-800/80 bg-zinc-900/30'
                      }`}>
                        <div className="flex justify-between items-start gap-1">
                          <strong className={`${isLight ? 'text-amber-700' : 'text-amber-400'} font-bold block leading-snug`}>{cert.name}</strong>
                          <span className="bg-amber-400/[0.15] text-amber-600 border border-amber-400/20 text-[8px] px-1 font-bold shrink-0">{cert.provider}</span>
                        </div>
                        <p className={`${isLight ? 'text-slate-600 font-medium' : 'text-gray-400'} text-[9px] mt-1 leading-normal`}>{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`border-t pt-2.5 flex justify-end ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
                  {syncCompleted ? (
                    <div className={`${isLight ? 'text-emerald-700' : 'text-emerald-400'} text-center py-1 font-bold animate-pulse font-mono`}>
                      ✔️ Pathway matrices synchronized successfully!
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSyncToLibrary}
                      className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-1.5 text-[10.5px] uppercase font-bold font-mono cursor-pointer transition"
                    >
                      Sync Skills to Career Planner
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SAVED PATHS SIDE LOG */}
          {savedPathways.length > 0 && (
            <div className={`${isLight ? 'bg-white border-2 border-slate-300' : 'bg-[#0a0f1d] border border-slate-800'} p-4 font-mono text-xs space-y-3`}>
              <div className={`flex justify-between items-center border-b ${isLight ? 'border-slate-200' : 'border-slate-800'} pb-2`}>
                <h5 className={`font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'} uppercase tracking-wider`}>💾 MY SAVED PATHWAYS PROFILE HISTORY:</h5>
                <button
                  type="button"
                  onClick={handleClearSavedPaths}
                  className="text-[9.5px] text-red-500 hover:underline uppercase transition cursor-pointer font-bold"
                >
                  Clear History
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedPathways.map((savedPath) => {
                  const sLabel = savedPath.start === 'career-switcher' 
                    ? 'Student' 
                    : (ALL_ROLES_DATA[savedPath.start]?.title || 'Alternative');
                  const tLabel = ALL_ROLES_DATA[savedPath.target]?.title || 'Unknown Target';
                  return (
                    <div key={savedPath.id} className={`${isLight ? 'bg-slate-50 border border-slate-250' : 'bg-black/50 border border-slate-800'} p-3 flex flex-col justify-between`}>
                      <div>
                        <div className={`${isLight ? 'text-emerald-700' : 'text-[#10b981]'} font-bold text-[11px] uppercase tracking-wide truncate`}>{tLabel}</div>
                        <div className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-gray-400'} font-sans mt-0.5 leading-normal`}>
                          From: {sLabel} ({savedPath.match}% Initial Match)
                        </div>
                        <div className="text-[9px] text-gray-500 mt-1.5 flex items-center justify-between">
                          <span>⏱️ {savedPath.duration}</span>
                          <span className="uppercase text-amber-500 font-bold font-mono">[{savedPath.route}]</span>
                        </div>
                      </div>
                      <div className={`mt-3 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-900'} flex justify-end`}>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentStartRoleId(savedPath.start);
                            setTargetRoleId(savedPath.target);
                            setSelectedRoute(savedPath.route);
                            setHasCompletedOnboard(true);
                            setExpandedStageIndex(0);
                            alert(`Loaded Saved Path: ${sLabel} ➜ ${tLabel}`);
                          }}
                          className={`px-2.5 py-1 transition uppercase text-[9.5px] cursor-pointer ${
                            isLight 
                              ? 'bg-slate-800 text-white hover:bg-slate-950 font-bold shadow-sm' 
                              : 'bg-white/10 text-white hover:bg-white/15'
                          }`}
                        >
                          Restore Path
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      ) ) : (
        <div className="space-y-6">
          {/* DIGITAL TWIN INTRO */}
          <div className={`border p-4 md:p-5 ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0a0f1d] border-emerald-950/40'} relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono">
                  <Shield className="w-4 h-4 text-emerald-500 animate-pulse" /> Career Fallback Route Simulator
                </h4>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-400'} font-sans leading-relaxed`}>
                  <span className="bg-yellow-300 text-slate-900 px-1 rounded-sm font-semibold">
                    Compare strategic alternative paths where your existing skills are highly reusable. Protect yourself against LLM automation, high competition, and market shifts with structured action plans.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* DYNAMIC PROFILE TABS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {FALLBACK_PROFILES.map((p) => {
              const active = selectedFallbackProfileId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedFallbackProfileId(p.id)}
                  className={`p-3 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    active
                      ? `border-emerald-500 bg-emerald-500/10 ${isLight ? 'text-emerald-950' : 'text-white'}`
                      : isLight
                        ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        : 'border-slate-800 bg-black/40 text-gray-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold font-sans mt-1 line-clamp-1">{p.title}</span>
                  <div className="flex items-center justify-between mt-3 text-[9px] font-mono">
                    <span className="text-red-500 font-bold">Risk: {p.automationExposure}%</span>
                    <span className="opacity-70">({p.fallbackRoutes.length} fallbacks)</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SIMULATION WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LEFT COLUMN: PRIMARY PATH RISK PROFILE */}
            <div className={`lg:col-span-4 p-4 border ${isLight ? 'bg-white border-slate-300' : 'bg-[#0a0f1d] border-slate-800'} space-y-4`}>
              <div className="border-b border-slate-800/60 pb-3">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Primary Vulnerable Path:</span>
                <h5 className={`text-sm font-bold font-sans mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{currentFallbackProfile.title}</h5>
              </div>

              <div className="space-y-3 font-sans">
                {/* Automation Progress Ring/Bar */}
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                    <span className="text-gray-400 uppercase">Automation Risk Exposure:</span>
                    <span className="text-red-500 font-bold font-mono">{currentFallbackProfile.automationExposure}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-none overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-500" 
                      style={{ width: `${currentFallbackProfile.automationExposure}%` }} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                  <div className={`p-2 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-slate-800'}`}>
                    <span className="text-gray-500 block">Competition:</span>
                    <strong className="text-amber-500 font-bold block mt-0.5">{currentFallbackProfile.competition}</strong>
                  </div>
                  <div className={`p-2 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-slate-800'}`}>
                    <span className="text-gray-500 block">Avg Salary Cap:</span>
                    <strong className="text-white font-bold block mt-0.5 truncate">{currentFallbackProfile.salaryRange.split('/')[0]}</strong>
                  </div>
                </div>

                <div className={`p-3 border border-red-950/30 ${isLight ? 'bg-red-50 text-red-950' : 'bg-red-950/15 text-red-300'} text-xs leading-relaxed font-sans rounded-none`}>
                  <div className="flex gap-1.5 items-start">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block uppercase font-mono text-[9px] tracking-wider text-red-500 mb-0.5">Vulnerability Symptoms:</strong>
                      {currentFallbackProfile.symptom}
                    </div>
                  </div>
                </div>
              </div>

              {/* LIST OF FALLBACKS FOR THIS ROLE */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Available Fallback Routes:</span>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {currentFallbackProfile.fallbackRoutes.map((r) => {
                    const active = activeRouteTitle === r.title;
                    return (
                      <button
                        key={r.title}
                        type="button"
                        onClick={() => setActiveRouteTitle(r.title)}
                        className={`w-full p-2.5 border text-left cursor-pointer transition-all flex items-center justify-between ${
                          active
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold'
                            : isLight
                              ? 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                              : 'border-slate-900 bg-black/20 text-gray-400 hover:border-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs font-sans block">{r.title}</span>
                          <span className="text-[8px] font-mono block opacity-80">{r.transitionTime} Prep</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-emerald-400">{r.probability}%</span>
                          <ChevronRight className="w-3 h-3 text-gray-500" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTIVE DIGITAL TWIN COMPARISON VIEW */}
            <div className={`lg:col-span-8 p-4 border ${isLight ? 'bg-white border-slate-300' : 'bg-[#0a0f1d] border-slate-800'} flex flex-col justify-between`}>
              <div>
                {/* Fallback Route Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-1.5 py-0.5 uppercase font-bold">
                        Highly Compatible Alternative
                      </span>
                    </div>
                    <h5 className="text-base font-bold font-sans mt-1 text-[#10b981]">
                      {activeRoute.title}
                    </h5>
                  </div>
                  
                  {/* Transition Probability readout */}
                  <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-none">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-[8px] font-mono uppercase text-gray-400 block">Transition Chance:</span>
                      <strong className="text-emerald-400 font-bold font-mono text-xs">{activeRoute.probability}% Probability</strong>
                    </div>
                  </div>
                </div>

                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-300'} font-sans leading-relaxed my-3.5 italic`}>
                  &ldquo; {activeRoute.description} &rdquo;
                </p>

                {/* DIGITAL TWIN COMPARISON MATRIX */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-sans">
                  {/* SKILLS REUSED vs TO BUILD */}
                  <div className={`p-3.5 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-emerald-950/5 border-emerald-950/20'}`}>
                    <h6 className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> REUSABLE AVAILABLE SKILLS:
                    </h6>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {activeRoute.skillsAvailable.map((skill) => {
                        const link = getStudyLink(skill);
                        return (
                          <li key={skill} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold shrink-0 text-[10px]">✔</span>
                            {link ? (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:underline cursor-pointer transition-colors font-semibold ${
                                  isLight ? 'text-emerald-700 hover:text-emerald-900' : 'text-emerald-400 hover:text-emerald-300'
                                }`}
                              >
                                {skill}
                              </a>
                            ) : (
                              <span className={`${isLight ? 'text-slate-700' : 'text-gray-300'}`}>{skill}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className={`p-3.5 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-amber-950/5 border-amber-950/20'}`}>
                    <h6 className="text-[10px] font-mono text-amber-500 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" /> NEW GAPS TO BRIDGE (MISSING):
                    </h6>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {activeRoute.missingSkills.map((skill) => {
                        const link = getStudyLink(skill);
                        return (
                          <li key={skill} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold shrink-0 text-[10px]">✦</span>
                            {link ? (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:underline cursor-pointer transition-colors font-semibold ${
                                  isLight ? 'text-amber-700 hover:text-amber-900' : 'text-amber-400 hover:text-amber-300'
                                }`}
                              >
                                {skill}
                              </a>
                            ) : (
                              <span className={`${isLight ? 'text-slate-700' : 'text-gray-300'}`}>{skill}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* COMPARATIVE PARAMETERS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4 font-mono text-xs">
                  <div className={`p-3 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-slate-800'}`}>
                    <span className="text-gray-500 block text-[9px] uppercase">Transition Time:</span>
                    <span className="text-white font-bold block mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> {activeRoute.transitionTime}
                    </span>
                  </div>

                  <div className={`p-3 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-slate-800'}`}>
                    <span className="text-gray-500 block text-[9px] uppercase">Credential Cost:</span>
                    <span className="text-white font-bold block mt-1 flex items-center gap-1 truncate">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {activeRoute.certCost}
                    </span>
                  </div>

                  <div className={`p-3 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-slate-800'}`}>
                    <span className="text-gray-500 block text-[9px] uppercase">Job Openings Index:</span>
                    <span className="text-white font-bold block mt-1 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-purple-400" /> {activeRoute.jobAvailability}
                    </span>
                  </div>

                  <div className={`p-3 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-slate-800'}`}>
                    <span className="text-gray-500 block text-[9px] uppercase">Salary Potential:</span>
                    <span className="text-emerald-400 font-bold block mt-1 truncate">
                      💰 {activeRoute.salaryRange.split('/')[0]}
                    </span>
                  </div>

                  <div className={`p-3 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-slate-800'}`}>
                    <span className="text-gray-500 block text-[9px] uppercase">Automation Exposure:</span>
                    <span className="text-emerald-400 font-bold block mt-1 flex items-center gap-1">
                      🛡️ {activeRoute.automationExposure}% Risk
                    </span>
                  </div>

                  <div className={`p-3 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-emerald-950/10 border-emerald-950/20'}`}>
                    <span className="text-emerald-500 block text-[9px] uppercase">Success Probability:</span>
                    <span className="text-emerald-400 font-bold block mt-1">
                      🚀 {activeRoute.probability}% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION TRIGGER BUTTON */}
              <div className={`border-t pt-3 flex flex-col md:flex-row md:items-center justify-between gap-3 ${isLight ? 'border-slate-200' : 'border-slate-800'} mt-2`}>
                <p className="text-[10px] text-gray-500 font-mono">
                  This fallback route maximizes your technical ROI, saving up to 80% on certification prep and upskilling overhead.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    // Switch to ambition tab and open the onboarding wizard with selected path pre-loaded
                    setActiveSubTab('ambition');
                    setHasCompletedOnboard(false);
                    setOnboardStep(0);
                    
                    // Match starting role ID
                    let startId = 'career-switcher';
                    if (selectedFallbackProfileId === 'it-support') {
                      startId = 'it-support-analyst';
                    } else if (selectedFallbackProfileId === 'frontend-developer') {
                      startId = 'frontend-developer';
                    } else if (selectedFallbackProfileId === 'qa-tester') {
                      startId = 'qa-tester';
                    } else if (selectedFallbackProfileId === 'prompt-engineer') {
                      startId = 'prompt-engineer';
                    }
                    handleStartRoleChange(startId);
                    
                    // Match target role ID dynamically or with known overrides
                    let targetId = 'cloud-support-associate';
                    const foundTargetRole = Object.values(ALL_ROLES_DATA).find(
                      (role) => role.title.toLowerCase().trim() === activeRoute.title.toLowerCase().trim()
                    );
                    if (foundTargetRole) {
                      targetId = foundTargetRole.id;
                    } else {
                      if (activeRoute.title === 'Customer Success Manager') {
                        targetId = 'customer-success-manager';
                      } else if (activeRoute.title === 'Salesforce CRM Administrator') {
                        targetId = 'salesforce-administrator';
                      } else if (activeRoute.title === 'Business Analyst') {
                        targetId = 'business-analyst';
                      } else if (activeRoute.title === 'Technical Writer / API Documenter') {
                        targetId = 'technical-writer';
                      } else {
                        const closeMatch = Object.values(ALL_ROLES_DATA).find(
                          (role) => role.title.toLowerCase().includes(activeRoute.title.toLowerCase()) ||
                                    activeRoute.title.toLowerCase().includes(role.title.toLowerCase())
                        );
                        if (closeMatch) {
                          targetId = closeMatch.id;
                        }
                      }
                    }
                    setTargetRoleId(targetId);
                    
                    // Set correct industry preference for target role
                    const targetRoleObj = ALL_ROLES_DATA[targetId];
                    if (targetRoleObj) {
                      const defaultPref = mapRoleIdToPreference(targetId, targetRoleObj.domain);
                      setPreferredIndustry(defaultPref);
                    }
                    
                    setExpandedStageIndex(0);
                    alert(`🎯 Wizard loaded: Preparing custom configuration for "${ALL_ROLES_DATA[startId]?.title || startId}" to "${activeRoute.title}". Review and customize your options in each step!`);
                  }}
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-black font-bold font-mono text-xs uppercase cursor-pointer transition shrink-0 self-end"
                >
                  Configure Interactive Roadmap ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

interface YoutubeResource {
  name: string;
  channel: string;
  url: string;
}

export function getStageYoutubeVideos(stageId: number, stageName: string, roleId: string): YoutubeResource[] {
  const domainId = getDomainId(roleId);
  const role = ALL_ROLES_DATA[roleId];
  const title = role ? role.title : "IT Professional";
  
  const primaryTool = (role && role.toolsToLearn && role.toolsToLearn[0]) || "Core Tools";
  const secondTool = (role && role.toolsToLearn && role.toolsToLearn[1]) || "Platform Config";
  const thirdTool = (role && role.toolsToLearn && role.toolsToLearn[2]) || "Hands-on Sandbox";
  const firstCert = (role && role.recommendedCertifications && role.recommendedCertifications[0]?.name) || "IT Certification";
  const secondCert = (role && role.recommendedCertifications && role.recommendedCertifications[1]?.name) || firstCert;

  if (stageId === 1) {
    if (domainId === 'green-computing') {
      return [
        { name: `Green Software Foundation: Introduction to ${title} Foundations`, channel: "Green Software Foundation", url: "https://www.youtube.com/@greensoftwarefoundation" },
        { name: `Sustainable Systems: Green Engineering Principles in ${primaryTool}`, channel: "TechWorld with Nana", url: "https://www.youtube.com/@TechWorldwithNana" }
      ];
    }
    if (domainId === 'software-dev') {
      return [
        { name: `freeCodeCamp: ${title} & Programming Fundamentals Course`, channel: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp" },
        { name: `The Coding Train: Data Structures and Core Logic in ${role?.mustHaves.tech[0] || 'Software'}`, channel: "The Coding Train", url: "https://www.youtube.com/@TheCodingTrain" }
      ];
    }
    if (domainId === 'devops-sre') {
      return [
        { name: `Learn Linux TV: Linux Operating System Basics for ${title}`, channel: "Learn Linux TV", url: "https://www.youtube.com/@LearnLinuxTV" },
        { name: `NetworkChuck: Linux Terminal Commands for ${primaryTool} Setup`, channel: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck" }
      ];
    }
    if (domainId === 'qa-testing') {
      return [
        { name: `Software Testing Mentor: ${title} Manual Testing Full Course`, channel: "Software Testing Mentor", url: "https://www.youtube.com/@SoftwareTestingMentor" },
        { name: `The Testing Academy: QA Fundamentals and ${primaryTool} Concepts`, channel: "The Testing Academy", url: "https://www.youtube.com/@TheTestingAcademy" }
      ];
    }
    if (domainId === 'db-admin') {
      return [
        { name: `freeCodeCamp: Relational Database & SQL Design for ${title}`, channel: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp" },
        { name: `Alex The Analyst: Database Schemas Explained with ${primaryTool}`, channel: "Alex The Analyst", url: "https://www.youtube.com/@AlexTheAnalyst" }
      ];
    }
    if (domainId === 'cloud') {
      return [
        { name: `PowerCert: Computer Networking Lessons for ${title} Candidates`, channel: "PowerCert Animated Videos", url: "https://www.youtube.com/@powercertanimatedvideos" },
        { name: `NetworkChuck: CCNA Network Architecture Course for ${primaryTool}`, channel: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck" }
      ];
    }
    if (domainId === 'cybersecurity') {
      return [
        { name: `Professor Messer: CompTIA Security+ & ${title} Concepts`, channel: "Professor Messer", url: "https://www.youtube.com/@professormesser" },
        { name: `NetworkChuck: Wireshark Packet Analysis for ${primaryTool}`, channel: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck" }
      ];
    }
    // Fallback/Data analytics
    return [
      { name: `Leila Gharani: Advanced Excel & Data Analytics for ${title}`, channel: "Leila Gharani", url: "https://www.youtube.com/@LeilaGharani" },
      { name: `Chandoo: Excel Pivot Tables and Charts for ${primaryTool}`, channel: "Chandoo", url: "https://www.youtube.com/@chandoo" }
    ];
  }

  if (stageId === 2) {
    if (domainId === 'green-computing') {
      return [
        { name: `Microsoft Research: Carbon-Conscious ${primaryTool} Infrastructure`, channel: "Microsoft Research", url: "https://www.youtube.com/@MicrosoftResearch" },
        { name: `Fireship: Green Web Development & Caching for ${secondTool}`, channel: "Fireship", url: "https://www.youtube.com/@Fireship" }
      ];
    }
    if (domainId === 'software-dev') {
      return [
        { name: `Amigoscode: Designing Distributed Backend APIs with ${primaryTool}`, channel: "amigoscode", url: "https://www.youtube.com/@amigoscode" },
        { name: `Traversy Media: REST API & SQL Server Setup for ${secondTool}`, channel: "Traversy Media", url: "https://www.youtube.com/@TraversyMedia" }
      ];
    }
    if (domainId === 'devops-sre') {
      return [
        { name: `HashiCorp: Terraform IaC Tutorial for ${primaryTool}`, channel: "HashiCorp", url: "https://www.youtube.com/@HashiCorp" },
        { name: `Bret Fisher: Docker Containers Crash Course for ${secondTool}`, channel: "Bret Fisher", url: "https://www.youtube.com/@BretFisher" }
      ];
    }
    if (domainId === 'qa-testing') {
      return [
        { name: `SDET QA Automation: Playwright Browser Automation with ${primaryTool}`, channel: "SDET-QA Automation Techie", url: "https://www.youtube.com/@sdet-qaautomationtechie" },
        { name: `Automation StepByStep: Writing Test Scripts in ${secondTool}`, channel: "Automation StepByStep", url: "https://www.youtube.com/@AutomationStepByStep" }
      ];
    }
    if (domainId === 'db-admin') {
      return [
        { name: `Brent Ozar: SQL Server Performance Tuning for ${primaryTool}`, channel: "Brent Ozar", url: "https://www.youtube.com/@BrentOzar" },
        { name: `PostgresOpen: Tuning PostgreSQL Queries for ${secondTool}`, channel: "PostgresOpen", url: "https://www.youtube.com/@PostgresOpen" }
      ];
    }
    if (domainId === 'cloud') {
      return [
        { name: `Learn Linux TV: Linux CLI Guides for ${primaryTool} Administrators`, channel: "Learn Linux TV", url: "https://www.youtube.com/@LearnLinuxTV" },
        { name: `freeCodeCamp: AWS Training and Cloud Concepts for ${secondTool}`, channel: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp" }
      ];
    }
    if (domainId === 'cybersecurity') {
      return [
        { name: `John Hammond: Practical Log Analysis and Threat Hunting for ${primaryTool}`, channel: "John Hammond", url: "https://www.youtube.com/@JohnHammond" },
        { name: `HackerSploit: Blue Team Security and Auditing in ${secondTool}`, channel: "HackerSploit", url: "https://www.youtube.com/@HackerSploit" }
      ];
    }
    // Fallback/Data analytics
    return [
      { name: `Alex The Analyst: SQL and Data Analytics with ${primaryTool}`, channel: "Alex The Analyst", url: "https://www.youtube.com/@AlexTheAnalyst" },
      { name: `freeCodeCamp: SQL Database Programming Tutorials for ${secondTool}`, channel: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp" }
    ];
  }

  if (stageId === 3) {
    if (domainId === 'green-computing') {
      return [
        { name: `Green Software Foundation: Measuring Carbon Footprints of ${primaryTool}`, channel: "Green Software Foundation", url: "https://www.youtube.com/@greensoftwarefoundation" },
        { name: `Kepler: Kubernetes Efficient Power Exporter Setup with ${secondTool}`, channel: "CNCF", url: "https://www.youtube.com/@CNCF" }
      ];
    }
    if (domainId === 'software-dev') {
      return [
        { name: `Fireship: Building & Deploying ${title} Applications`, channel: "Fireship", url: "https://www.youtube.com/@Fireship" },
        { name: `Tech with Tim: Git and GitHub Project Portfolios for ${primaryTool}`, channel: "Tech with Tim", url: "https://www.youtube.com/@techwithtim" }
      ];
    }
    if (domainId === 'devops-sre') {
      return [
        { name: `TechWorld with Nana: Building a Kubernetes CI/CD Pipeline for ${primaryTool}`, channel: "TechWorld with Nana", url: "https://www.youtube.com/@TechWorldwithNana" },
        { name: `Grafana: Deploying Prometheus & Grafana Monitoring for ${secondTool}`, channel: "Grafana", url: "https://www.youtube.com/@GrafanaOfficial" }
      ];
    }
    if (domainId === 'qa-testing') {
      return [
        { name: `Rahul Shetty Academy: Continuous Integration Testing for ${primaryTool} in GitHub Actions`, channel: "Rahul Shetty Academy", url: "https://www.youtube.com/@rahulshettyacademy" },
        { name: `Postman: API Load and Performance Testing Labs for ${secondTool}`, channel: "Postman", url: "https://www.youtube.com/@Postman" }
      ];
    }
    if (domainId === 'db-admin') {
      return [
        { name: `MongoDB: High Availability & Database Replication Labs with ${primaryTool}`, channel: "MongoDB", url: "https://www.youtube.com/@MongoDB" },
        { name: `Hussein Nasser: Database Backups, WAL, and Sharding Systems for ${secondTool}`, channel: "Hussein Nasser", url: "https://www.youtube.com/@hnasr" }
      ];
    }
    if (domainId === 'cloud') {
      return [
        { name: `TechWorld with Nana: Docker and Containerization for ${primaryTool}`, channel: "TechWorld with Nana", url: "https://www.youtube.com/@TechWorldwithNana" },
        { name: `AWS CloudWatch and Monitoring Telemetry Guide for ${secondTool}`, channel: "AWS Developers", url: "https://www.youtube.com/@amazonwebservices" }
      ];
    }
    if (domainId === 'cybersecurity') {
      return [
        { name: `Splunk Tutorial for Cyber SOC Beginners in ${primaryTool}`, channel: "Splunk", url: "https://www.youtube.com/@Splunk" },
        { name: `SOC Analyst Portfolio Project: Home Lab Walkthrough for ${secondTool}`, channel: "Cyberwox Academy", url: "https://www.youtube.com/@CyberwoxAcademy" }
      ];
    }
    // Fallback/Data analytics
    return [
      { name: `Luke Barousse: Complete Power BI Dashboard Tutorials for ${primaryTool}`, channel: "Luke Barousse", url: "https://www.youtube.com/@LukeBarousse" },
      { name: `Guy in a Cube: Designing Interactive Power BI Reports for ${secondTool}`, channel: "Guy in a Cube", url: "https://www.youtube.com/@GuyInACube" }
    ];
  }

  if (stageId === 4) {
    return [
      { name: `Microsoft Learn: Free ${firstCert} Exam Prep`, channel: "Microsoft Learn", url: "https://www.youtube.com/@MicrosoftLearn" },
      { name: `Professor Messer: ${secondCert} Exam Study Strategies`, channel: "Professor Messer", url: "https://www.youtube.com/@professormesser" }
    ];
  }

  if (stageId === 5) {
    return [
      { name: `${title} Technical Scenario Questions & Answers`, channel: "Kevtech IT Support", url: "https://www.youtube.com/@KevtechITSupport" },
      { name: `Tech Interview Tips: SLA & Ticket Scenarios for ${title}`, channel: "Donte's Tech World", url: "https://www.youtube.com/@DontesTechWorld" }
    ];
  }

  if (stageId === 6) {
    return [
      { name: `How to Design an ATS-Friendly ${title} Resume`, channel: "Luke Barousse", url: "https://www.youtube.com/@LukeBarousse" },
      { name: `Get Hired: LinkedIn Optimization for ${title} Professionals`, channel: "Danny Thompson", url: "https://www.youtube.com/@DannyThompson" }
    ];
  }

  return [];
}
