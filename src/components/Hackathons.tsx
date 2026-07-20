import React, { useState, useEffect } from 'react';
import { 
  Flame, Globe, Search, RefreshCw, Calendar, Tag, MapPin, 
  ExternalLink, Trophy, Users, CheckCircle2, AlertCircle, ArrowUpRight, 
  Compass, Radio, Sparkles, Filter, Bookmark, Info
} from 'lucide-react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import { motion, AnimatePresence } from 'motion/react';

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  region: 'Global' | 'Asia Pacific' | 'North America' | 'Europe' | 'India' | 'Middle East';
  prizes: string;
  themes: string[];
  difficulty: string;
  daysLeft: number;
  url: string;
  type: 'Online' | 'Hybrid' | 'In-person';
  location: string;
  description: string;
  targetAudience: string;
  careerBenefit: string;
  isConcluded?: boolean;
  momUrl?: string;
  momTitle?: string;
  replayUrl?: string;
  replayTitle?: string;
  isNewAddition?: boolean;
  category?: 'Hackathon' | 'Event' | 'Bootcamp' | 'Challenge' | 'Webinar' | 'CFP' | 'Training';
  scheduleStatus?: 'Active' | 'Upcoming' | 'Closed';
}

export const GLOBAL_HACKATHONS: Hackathon[] = [
  {
    id: 'google-solution-2026',
    title: 'Google Developer Solution Challenge 2026',
    organizer: 'Google Developers',
    region: 'Global',
    prizes: 'Global Mentorship + $12,000 Cash Tier Prizes',
    themes: ['AI/ML', 'Cloud', 'UN SDGs Solvers'],
    difficulty: 'All Levels',
    daysLeft: 12,
    url: 'https://developers.google.com/community/gdsc-solution-challenge',
    type: 'Online',
    location: 'Online (Global Broadcast / Self-Submitted)',
    description: 'Build real-world solutions for one or more of the United Nations Sustainable Development Goals using Google products and AI models like Gemini.',
    targetAudience: 'University Students & Budding Developers',
    careerBenefit: 'Direct visibility with Google engineers and global recognition on Google Developers blog.'
  },
  {
    id: 'sih-2026',
    title: 'Smart India Hackathon (SIH) 2026',
    organizer: 'Ministry of Education, GoI & AICTE',
    region: 'India',
    prizes: '₹15 Lakhs+ Cash Pool + Incubator Support',
    themes: ['Hardware', 'Software', 'Smart Cities', 'Agriculture'],
    difficulty: 'All Levels',
    daysLeft: 4,
    url: 'https://www.sih.gov.in/',
    type: 'Hybrid',
    location: 'Nodal Centers Across India & Online Submissions',
    description: 'A nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, inculcating a culture of product innovation.',
    targetAudience: 'College Students (Undergrad/Postgrad)',
    careerBenefit: 'Direct governmental recognition, venture capital exposure, and hardware startup incubation programs.'
  },
  {
    id: 'nasa-space-apps',
    title: 'NASA Space Apps Challenge 2026',
    organizer: 'NASA & Global Space Partners',
    region: 'Global',
    prizes: 'Global Winner Travel to Rocket Launch + Prestige',
    themes: ['Space Tech', 'Data Analytics', 'Open Source'],
    difficulty: 'All Levels',
    daysLeft: 22,
    url: 'https://www.spaceappschallenge.org/',
    type: 'Hybrid',
    location: 'Global Local Leads & Virtual Collaboration Nodes',
    description: 'The world\'s largest annual hackathon, using NASA\'s open-source data to address global challenges on Earth and in space.',
    targetAudience: 'Data Scientists, Coders, Space Enthusiasts, Storytellers',
    careerBenefit: 'Prestigious award highly recognizable by international aerospace and major scientific firms.'
  },
  {
    id: 'devpost-ai-frontiers',
    title: 'Global AI Frontiers Hybrid Hackathon',
    organizer: 'Devpost Community & AWS',
    region: 'North America',
    prizes: '$60,000 AWS Cloud Credits + NVIDIA GPUs',
    themes: ['AI/ML', 'Vector Databases', 'Agents'],
    difficulty: 'Advanced',
    daysLeft: 9,
    url: 'https://devpost.com/hackathons',
    type: 'Online',
    location: 'Online (San Francisco, CA Host Timezone)',
    description: 'Integrate advanced multi-agent systems, complex retrievers, and scalable backends to solve legacy enterprise pipeline constraints.',
    targetAudience: 'Senior Software Engineers & AI researchers',
    careerBenefit: 'Direct recruiter check-ins from sponsor companies (AWS, Pinecone, Cohere).'
  },
  {
    id: 'ethglobal-london',
    title: 'ETHGlobal London 2026',
    organizer: 'ETHGlobal Ecosystem',
    region: 'Europe',
    prizes: '$125,000 Sponsor Integration Bounty Pool',
    themes: ['Web3', 'Cryptography', 'Smart Contracts'],
    difficulty: 'Intermediate',
    daysLeft: 16,
    url: 'https://ethglobal.com/',
    type: 'In-person',
    location: 'Central London, United Kingdom (In-person Venue)',
    description: 'The ultimate weekend of building and learning on the Ethereum stack, joining hundreds of decentralized tech masters in Central London.',
    targetAudience: 'Web3 developers, UI/UX researchers, blockchain engineers',
    careerBenefit: 'Direct ecosystem funding, crypto project grants, and Web3 seed-fund network introductions.'
  },
  {
    id: 'imagine-cup-2026',
    title: 'Microsoft Imagine Cup Global Championship',
    organizer: 'Microsoft Philanthropies',
    region: 'Global',
    prizes: '$100,000 Cash Prize + Mentorship with Satya Nadella',
    themes: ['AI/ML', 'Cloud', 'Social Impact'],
    difficulty: 'All Levels',
    daysLeft: 35,
    url: 'https://imaginecup.microsoft.com/',
    type: 'Online',
    location: 'Online Virtual Live Stream',
    description: 'Bring your technology ideas to life alongside Microsoft Cloud, Azure infrastructure and open resources dedicated to sustainable innovation.',
    targetAudience: 'Undergrad & Postgrad Student Teams',
    careerBenefit: 'Lifetime professional alumni status and elite business mentoring with key Microsoft leaders.'
  },
  {
    id: 'junction-helsinki',
    title: 'Junction Europe 2026 Flagship',
    organizer: 'Junction Communities',
    region: 'Europe',
    prizes: '€20,000 Grand Prize + Tech Gadgets',
    themes: ['Full Stack', 'Game Tech', 'IoT', 'UI/UX'],
    difficulty: 'Intermediate',
    daysLeft: 42,
    url: 'https://www.hackjunction.com/',
    type: 'Hybrid',
    location: 'Helsinki, Finland & Online Broadcast Hubs',
    description: 'Europe\'s largest hackathon converging 1500+ hackathon creators and tech organizations for an immersive 48-hour build cycle.',
    targetAudience: 'Designers, developers, and product minds worldwide',
    careerBenefit: 'Exceptional international networking and direct interview pipelines with leading Nordic tech enterprises.'
  },
  {
    id: 'unstop-ignite-cyber',
    title: 'Unstop Ignite National Coding League 2026',
    organizer: 'Unstop Platform',
    region: 'Asia Pacific',
    prizes: 'Direct Job Interviews + ₹5,00,000 Cash',
    themes: ['Cyber Security', 'Speed Debugging', 'Algorithms'],
    difficulty: 'Intermediate',
    daysLeft: 0,
    url: 'https://unstop.com/',
    type: 'Online',
    location: 'Online Web Portal Speed-Run Arena',
    description: 'Speed debugging sprints, secure reverse-engineering, and complex SQL performance debugging modules representing top industry benchmarks.',
    targetAudience: 'Computer Science Graduates',
    careerBenefit: 'Guaranteed placement interviews and direct profile indexing across 100+ partnering tech conglomerates.',
    isConcluded: true,
    momUrl: 'https://unstop.com/blog/ignite-national-coding-league-winners',
    momTitle: 'Ignite National Coding League - Hall of Fame & Winners',
    replayUrl: 'https://youtube.com/results?search_query=unstop+ignite+finals+coding',
    replayTitle: 'Grand Finale Web Stream Recording'
  },
  {
    id: 'solana-renaissance',
    title: 'Solana Renaissance Global Hackathon',
    organizer: 'Solana Foundation',
    region: 'Global',
    prizes: '$1,000,000 Pool in Seed Funding & Bounties',
    themes: ['Web3', 'DeFi', 'Mobile dApps'],
    difficulty: 'Advanced',
    daysLeft: 18,
    url: 'https://solana.com/renaissance',
    type: 'Online',
    location: 'Online Rust & Web3 Ecosystem Labs',
    description: 'Build high-performance consumer web apps on-chain, focusing on scalable Rust contracts, lightning fast UI widgets, and mobile adapters.',
    targetAudience: 'Rust engineers, Web3 founders, designer squads',
    careerBenefit: 'High possibility of spinning out into venture-funded startups via Solana incubator network.'
  },
  {
    id: 'hacks-ap-youth',
    title: 'Asia-Pacific Youth Climate Tech Hackathon',
    organizer: 'UNDP Asia-Pacific Centre',
    region: 'Asia Pacific',
    prizes: '$15,000 Pilot Implementation Grants',
    themes: ['Climate Tech', 'AI/ML', 'Hardware'],
    difficulty: 'All Levels',
    daysLeft: 30,
    url: 'https://www.undp.org/asia-pacific',
    type: 'Hybrid',
    location: 'Bangkok, Thailand & Online Collaboration Streams',
    description: 'Leveraging data-driven solutions and low-code automated IoT systems to analyze air quality and water telemetry across maritime zones.',
    targetAudience: 'Environmental engineers, tech analysts, open innovators',
    careerBenefit: 'United Nations certification credential and funded pilot deployment in collaborating APAC municipal nodes.'
  },
  {
    id: 'esa-copernicus-2026',
    title: 'ESA Copernicus Space App Hackathon 2026',
    organizer: 'European Space Agency (ESA)',
    region: 'Europe',
    prizes: '€10,000 Copernicus Incubation Grant + ESA Mentorship',
    themes: ['Space Tech', 'Earth Observation', 'AI/ML'],
    difficulty: 'All Levels',
    daysLeft: 19,
    url: 'https://www.copernicus.eu/',
    type: 'Hybrid',
    location: 'Frascati, Italy & Online Copernicus Portal',
    description: 'Create solutions for climate change and smart monitoring using satellite images from Europe\'s Copernicus Sentinel missions combined with AI pipelines.',
    targetAudience: 'Remote Sensing Students, Space Data Engineers, and AI Developers',
    careerBenefit: 'Direct partnership pathways with European aerospace companies and sovereign startup funding.'
  },
  {
    id: 'isro-bharatiya-2026',
    title: 'ISRO Bhartiya Antariksh Hackathon 2026',
    organizer: 'Indian Space Research Organisation (ISRO)',
    region: 'India',
    prizes: '₹5,00,000 Cash Prizes + ISRO Scientist Mentoring',
    themes: ['Space Tech', 'Satellite Telemetry', 'Cloud'],
    difficulty: 'Intermediate',
    daysLeft: 8,
    url: 'https://www.isro.gov.in/',
    type: 'Hybrid',
    location: 'ISRO Telemetry Tracking Command Network (ISTRAC) & Online',
    description: 'Solve real satellite raw telemetry processing problems, orbital estimation calculations, and deep space payload image classification using Indian space datasets.',
    targetAudience: 'Indian Engineering Students and Space Enthusiasts',
    careerBenefit: 'Highly recognized certificate by ISRO and direct invite to presentation rounds at Space Application Centers.'
  },
  {
    id: 'green-computing-hackathon',
    title: 'Global Green Software Foundation Hackathon 2026',
    organizer: 'Green Software Foundation & GitHub & Microsoft',
    region: 'Global',
    prizes: '$50,000 Cash Pool + Carbon Offset Awards',
    themes: ['Climate Tech', 'Green Computing', 'Carbon-Aware Software', 'AI/ML'],
    difficulty: 'All Levels',
    daysLeft: 14,
    url: 'https://grnsft.org/hackathon',
    type: 'Online',
    location: 'GitHub Co-Location Nodes & Online Submission Portal',
    description: 'Build applications and systems using the Carbon Aware SDK to shift computing workloads to when clean solar or wind energy is peak. Focus on measuring kilowatt consumption and minimizing CPU loads.',
    targetAudience: 'Software Engineers, UI Designers, Green Energy Advocates',
    careerBenefit: 'Showcase sustainable software design to global tech companies, with winning projects featured on GSF and GitHub Developer channels.'
  }
];

export const GLOBAL_FESTS: Hackathon[] = [
  {
    id: 'microsoft-ai-skills-fest-2026',
    title: 'Microsoft AI Skills Fest 2026 (AISF2026)',
    organizer: 'Microsoft Learn Ecosystem',
    region: 'Global',
    prizes: 'Certified AI Credentials & Shareable LinkedIn Badges + Learning Swags + Exam Vouchers',
    themes: ['AI/ML', 'Cloud', 'Copilot', 'GenAI'],
    difficulty: 'Self-Paced Learning + Live Mentored Talks',
    daysLeft: 24,
    url: 'https://aiskillsnavigator.microsoft.com/events/AISF2026?UTM_Source=AISF_Banner&UTM_Medium=Banner&UTM_Campaign=Learn',
    type: 'Online',
    location: 'Online (Microsoft Learn Web Portal / Global Broadcast Hubs)',
    description: 'The premier AI upskilling festival running globally with local meetups to transition technical mindsets into Microsoft Azure GenAI systems. Program incorporates deep dives into Azure AI Studio, model endpoints orchestration, prompt engineering frameworks, and customizable Copilot templates. Highly recommended for professionals and career seekers updating credentials.',
    targetAudience: 'Developers, IT Generalists, Students, and Cloud Enthusiasts in 8+ Localized Countries',
    careerBenefit: 'Directly validates cloud skills readiness, ranks portfolio higher with verified Microsoft Learn credentials, and connects with recruiter pathways.'
  },
  {
    id: 'google-cloud-summit-2026',
    title: 'Google Cloud Summit & Interactive Innovators Live',
    organizer: 'Google Cloud Developer Relations',
    region: 'Global',
    prizes: 'Certified Google Cloud Badges + 500 Qwiklabs Credits + Smart Device Giveaways',
    themes: ['Cloud', 'AI/ML', 'Open Source'],
    difficulty: 'Expert Tech Talks & Lab Walkthroughs',
    daysLeft: 14,
    url: 'https://cloud.withgoogle.com/events/',
    type: 'Hybrid',
    location: 'Online & Live Interactive Dev Sandboxes',
    description: 'Google Cloud Summit brings the absolute core of Google development advocates and product managers direct to your screens. Immerse yourself in expert sessions detailing highly performant Firestore database architectures, multi-region container grids, API proxying secrets, and live codelab sandboxes using Gemini models.',
    targetAudience: 'Cloud Architects, DevOps Leads, Back-end and Full-Stack Builders',
    careerBenefit: 'Direct cloud skills boost badges, developer directory profile listing, and live 1-on-1 expert troubleshooting channels.'
  },
  {
    id: 'aws-summit-india-2026',
    title: 'AWS Summit India & Generative AI Builder Fest',
    organizer: 'Amazon Web Services',
    region: 'India',
    prizes: 'AWS GenAI Bedrock Badges + $150 AWS Service Vouchers + Local Swag Bundles',
    themes: ['Cloud', 'AI/ML', 'Full Stack'],
    difficulty: 'Interactive Panels & Code Labs',
    daysLeft: 9,
    url: 'https://aws.amazon.com/events/summits/series/bengaluru/',
    type: 'In-person',
    location: 'Bengaluru, Karnataka, India (In-person Convention Center)',
    description: 'A massive local developer technology festival held in Bengaluru. Featuring sovereign cloud virtualization breakouts, AWS Bedrock API best practices, low-latency container clusters, and hands-on developer sandbox lanes.',
    targetAudience: 'Indian Tech Professionals, DevOps Architects, and Cloud Admin Apprentices',
    careerBenefit: 'Invaluable local developer networking, resume evaluations by AWS Principal Architects, and express placement vouchers.'
  },
  {
    id: 'nvidia-gtc-2026',
    title: 'NVIDIA GTC 2026 Artificial Intelligence Summit',
    organizer: 'NVIDIA Corporation',
    region: 'Global',
    prizes: 'NVIDIA DLI Digital Credentials + Deep Learning Institute Access Vouchers',
    themes: ['AI/ML', 'Vector Databases', 'Hardware'],
    difficulty: 'Advanced Research Talks',
    daysLeft: 38,
    url: 'https://www.nvidia.com/gtc/',
    type: 'Hybrid',
    location: 'San Jose, California, USA & Virtual Streams',
    description: 'The monumental global computing conference detailing hardware-accelerated deep learning architectures, vector retrievals, generative media, and LLM edge execution models. Featuring technical tracks by top researchers.',
    targetAudience: 'Machine Learning Engineers, Data Scientists, & hardware-inclined programmers',
    careerBenefit: 'Elite technical developer prestige, priority access to enterprise beta SDKs, and theoretical foundational computer science updates.'
  },
  {
    id: 'github-universe-2026',
    title: 'GitHub Universe 2026 - Global Developer Festival',
    organizer: 'GitHub Ecosystem',
    region: 'Global',
    prizes: 'GitHub Certified Copilot Badges + Custom Octocat Stickers & Hoodies',
    themes: ['Open Source', 'DevOps'],
    difficulty: 'Tutorial & Keynote Talks',
    daysLeft: 31,
    url: 'https://githubuniverse.com/',
    type: 'Hybrid',
    location: 'San Francisco, California, USA & Online Global Hub',
    description: 'An interactive developer festival featuring high-quality keynote talks, live coding, and workshops focusing on GitHub Copilot Workspace, secure CI/CD pipelines with GitHub Actions, and open-source contributions.',
    targetAudience: 'All Software Developers, Product Managers, and Open Source Contributors',
    careerBenefit: 'Elevates development flow speed with AI agent pair programming, and crafts modern visible portfolio profiles.'
  },
  {
    id: 'eu-open-source-forum-2026',
    title: 'EU Open Open Source Policy & Cyber Resilience Fest',
    organizer: 'European Open Source Initiative',
    region: 'Europe',
    prizes: 'EC Sovereign Tech Badges + European Commission Digital Certificates',
    themes: ['Open Source', 'Cyber Security'],
    difficulty: 'Tech Legal & Resiliency Talks',
    daysLeft: 18,
    url: 'https://open-source.europa.eu/',
    type: 'Hybrid',
    location: 'Brussels, Belgium & Euro-Ecosystem Virtual Portal',
    description: 'A highly educational forum discussing open-source digital sovereignty, Software Bills of Materials (SBOM), secure code dependencies, and enterprise cyber resilience regulations.',
    targetAudience: 'Security analysts, compliance officers, and collaborative open-source maintainers',
    careerBenefit: 'Crucial understanding of upcoming legislative cyber requirements and secure supply chain software management.'
  },
  {
    id: 'apac-cloud-devops-summit-2026',
    title: 'APAC Cloud, Security & DevOps Summit',
    organizer: 'APAC Tech Council',
    region: 'Asia Pacific',
    prizes: 'Summit Participation Certificate + Advanced Cloud Academy Vouchers',
    themes: ['Cloud', 'DevOps', 'Cyber Security'],
    difficulty: 'Tutorial Workshops & Keynotes',
    daysLeft: 11,
    url: 'https://www.apactechcouncil.org/',
    type: 'Online',
    location: 'Online (APAC Tech Council Live Stream Hub)',
    description: 'A leading regional tech festival bridging the APAC developer community. Sessions examine modern multi-cloud networks, automated zero-trust authorization pipelines, and low-latency microservice architectures.',
    targetAudience: 'Cloud Admin apprentices, Systems Admins, and backend engineers',
    careerBenefit: 'Certified skill credentials and career network contacts across fast-growing digital economies.'
  },
  {
    id: 'gcc-digital-innovation-2026',
    title: 'GCC Digital Innovation & Responsible AI Forum',
    organizer: 'Middle East Tech Association',
    region: 'Middle East',
    prizes: 'Responsible AI Digital Badges + regional incubator mentoring sessions',
    themes: ['AI/ML', 'Smart Cities', 'Cloud'],
    difficulty: 'Expert Panels & Policy Reviews',
    daysLeft: 20,
    url: 'https://www.tdra.gov.ae/',
    type: 'In-person',
    location: 'Riyadh & Dubai, Middle East (In-person Sovereign Summits)',
    description: 'A prominent regional summit held across Dubai & Riyadh, exploring smart cities telemetry, model ethics, and sovereign regional cloud hosting infrastructures.',
    targetAudience: 'Sovereign database architectures, cloud developers, and smart city designers',
    careerBenefit: 'Direct local networking with regional ministries, state tech enterprises, and cloud providers.'
  },
  {
    id: 'apple-wwdc-2026',
    title: 'Apple Worldwide Developers Conference (WWDC) 2026',
    organizer: 'Apple Inc. (Fortune 500)',
    region: 'Global',
    prizes: 'Apple Design Awards Prestige + Swift Student Challenge Prizes',
    themes: ['UI/UX', 'iOS/macOS', 'Swift', 'AI/ML'],
    difficulty: 'All Levels (Global Livestreams & Tech Labs)',
    daysLeft: 45,
    url: 'https://www.youtube.com/user/Apple',
    type: 'Online',
    location: 'Apple Park, California & YouTube Live Broadcast',
    description: 'Apple\'s premier developer showcase introducing the latest operating systems, Swift progress, API controls, and on-device machine learning architectures. Join the keynote live stream or review deep-dive videos on the official YouTube channel to discover swift design patterns.',
    targetAudience: 'iOS/macOS App Developers, UI designers, Swift programmers, and tech students',
    careerBenefit: 'First-hand awareness of next-gen mobile SDKs and recognition opportunities via Swift Student Challenge.'
  },
  {
    id: 'salesforce-dreamforce-2026',
    title: 'Salesforce Dreamforce Flagship Enterprise Summit',
    organizer: 'Salesforce (Fortune 500)',
    region: 'North America',
    prizes: 'Salesforce AI Badges + MuleSoft Platform Access Vouchers',
    themes: ['Cloud', 'AI/ML', 'Full Stack'],
    difficulty: 'All Levels (Keynotes & Case Studies)',
    daysLeft: 0,
    url: 'https://www.salesforce.com/dreamforce/',
    type: 'Hybrid',
    location: 'San Francisco, CA & Salesforce+ Live Streams',
    description: 'Join Salesforce and global Fortune 500 technical leads to explore low-code agentic systems, real-time relational databases integrations, and scalable multi-tenant SaaS architectures.',
    targetAudience: 'SaaS Software Architects, Admin Managers, and Enterprise Builders',
    careerBenefit: 'Valuable software architectural understanding, enterprise network channels, and Salesforce certified badging.',
    isConcluded: true,
    momUrl: 'https://www.salesforce.com/plus/experience/dreamforce/',
    momTitle: 'Dreamforce 2026 Keynote Minutes & Commitments',
    replayUrl: 'https://youtube.com/user/salesforce',
    replayTitle: 'Salesforce YouTube Live Broadcast Showcase \& recordings'
  },
  {
    id: "build-with-ai-bootcamps-2026",
    title: "Build with AI: Bootcamps 2026",
    organizer: "Hack2Skill",
    region: "Global",
    prizes: "Completion Certificate, AWS/Cloud Credits, and Mentorship",
    themes: ["AI/ML", "Cloud", "Web Development"],
    difficulty: "Beginner-friendly",
    daysLeft: 24,
    url: "https://hack2skill.com/event/bootcamps-2026",
    type: "Online",
    location: "Online",
    description: "Specialized cohort learning designed to boost real-world building skill sets using advanced generative AI and cloud infrastructure.",
    targetAudience: "Students, Freshers, and Aspiring AI Engineers",
    careerBenefit: "Build a production-ready AI project portfolio, verify your credentials, and connect with global cloud mentors.",
    category: "Bootcamp",
    scheduleStatus: "Active"
  },
  {
    id: "agentic-ai-global-bootcamp",
    title: "Agentic AI Global Bootcamp",
    organizer: "Hack2Skill",
    region: "Global",
    prizes: "Exclusive Swag, Agentic AI Certification, and Cash Rewards",
    themes: ["AI/ML", "DevOps", "Systems Infrastructure"],
    difficulty: "Intermediate",
    daysLeft: 18,
    url: "https://hack2skill.com/event/agenticaiglobalbootcamp",
    type: "Online",
    location: "Online",
    description: "Hands-on specialized training focusing on orchestration frameworks, autonomous multi-agent engineering, and custom vector databases.",
    targetAudience: "Software Engineers, DevOps Professionals, and AI Researchers",
    careerBenefit: "Master production-level AI agent deployment pipelines and system containerization.",
    category: "Bootcamp",
    scheduleStatus: "Active"
  },
  {
    id: "google-cloud-tech-camp",
    title: "Google Cloud Tech Camp",
    organizer: "Hack2Skill",
    region: "India",
    prizes: "Google Cloud Skill Badges, Swag, and Direct Hackathon Nominations",
    themes: ["Cloud", "DevOps", "Systems Infrastructure"],
    difficulty: "Beginner-friendly",
    daysLeft: 9,
    url: "https://hack2skill.com/google-cloud-tech-camp",
    type: "Online",
    location: "Online",
    description: "Intense structured learning bootcamp for mastering Kubernetes, cloud compute, serverless deployment, and active IAM security protocols.",
    targetAudience: "Students, Freshers, and Cloud Administrators",
    careerBenefit: "Prepare directly for the Associate Cloud Engineer exam with live instructor instruction.",
    category: "Bootcamp",
    scheduleStatus: "Active"
  }
];

interface HackathonsProps {
  theme?: string;
  bookmarks?: any[];
  toggleBookmark?: (item: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  selectedItemId?: string | null;
  setSelectedItemId?: (id: string | null) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  hideInternalSearch?: boolean;
  syncTrigger?: number;
  onSyncStateChange?: (isSyncing: boolean, statusMsg: string) => void;
}

export default function Hackathons({
  theme = 'dark',
  bookmarks = [],
  toggleBookmark,
  isBookmarked,
  selectedItemId: selectedItemIdProp,
  setSelectedItemId: setSelectedItemIdProp,
  searchQuery: searchQueryProp,
  setSearchQuery: setSearchQueryProp,
  hideInternalSearch = false,
  syncTrigger = 0,
  onSyncStateChange
}: HackathonsProps = {}) {
  const isLight = theme === 'light';
  const [eventsList, setEventsList] = useState<Hackathon[]>(() => {
    let baseList: Hackathon[] = [];
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pathfinder_synced_hackathons');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            baseList = parsed;
          }
        }
      } catch (e) {
        console.error("Failed to load synced hackathons", e);
      }
    }
    if (baseList.length === 0) {
      baseList = [...GLOBAL_HACKATHONS, ...GLOBAL_FESTS];
    }
    return baseList
      .map((item: any) => ({ ...item, isNewAddition: false }))
      .filter((item: any) => {
        const hasDaysLeft = item.daysLeft !== undefined && item.daysLeft > 0;
        const isNotClosed = item.scheduleStatus !== 'Closed';
        return hasDaysLeft && isNotClosed;
      });
  });
  const COMBINED_EVENTS = eventsList;
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const [localSelectedItemId, setLocalSelectedItemId] = useState<string | null>(COMBINED_EVENTS[0]?.id || null);
  const selectedItemId = selectedItemIdProp !== undefined ? selectedItemIdProp : localSelectedItemId;
  const setSelectedItemId = setSelectedItemIdProp || setLocalSelectedItemId;

  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
  const searchQuery = searchQueryProp !== undefined ? searchQueryProp : localSearchQuery;
  const setSearchQuery = setSearchQueryProp || setLocalSearchQuery;

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllHackathons, setShowAllHackathons] = useState<boolean>(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update selection if filtered or category changes to first visible match
  useEffect(() => {
    setShowAllHackathons(false);
  }, [regionFilter, domainFilter, categoryFilter, statusFilter]);
  
  // Real-time ticking system
  const [secondsTick, setSecondsTick] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state machine
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncPhase, setSyncPhase] = useState<number>(0);
  const [activeSyncMessage, setActiveSyncMessage] = useState<string>('Sensors calibrated. Ready to monitor global registries.');
  const [lastSyncedTime, setLastSyncedTime] = useState<string>(new Date().toLocaleTimeString());

  // Bubble up sync status if callback is provided
  useEffect(() => {
    if (onSyncStateChange) {
      onSyncStateChange(isSyncing, activeSyncMessage);
    }
  }, [isSyncing, activeSyncMessage, onSyncStateChange]);

  // Handle manual sync triggered from parent component
  useEffect(() => {
    if (syncTrigger && syncTrigger > 0) {
      handleManualSync();
    }
  }, [syncTrigger]);

  // Website automatic silent background resync on initial boot
  useEffect(() => {
    let active = true;
    const runAutoResync = async () => {
      try {
        const res = await fetch("/api/hackathons/update-events");
        if (!res.ok) return;
        const data = await res.json();
        if (active && data.events && Array.isArray(data.events) && data.events.length > 0) {
          const baseEvents = [...GLOBAL_HACKATHONS, ...GLOBAL_FESTS];
          const merged = [...baseEvents];
          
          data.events.forEach((incomingEvent: any) => {
            const index = merged.findIndex(item => item.id === incomingEvent.id);
            const processedEvent = {
              ...incomingEvent,
              isNewAddition: false // On automatic silent boot sync, do not highlight as new
            };
            if (index !== -1) {
              merged[index] = { ...merged[index], ...processedEvent };
            } else {
              merged.push(processedEvent);
            }
          });
          
          // Filter to remove expired/concluded listings
          const filtered = merged.filter((item: any) => {
            const hasDaysLeft = item.daysLeft !== undefined && item.daysLeft > 0;
            const isNotClosed = item.scheduleStatus !== 'Closed';
            return hasDaysLeft && isNotClosed;
          });
          
          setEventsList(filtered);
          try {
            localStorage.setItem('pathfinder_synced_hackathons', JSON.stringify(filtered));
          } catch (e) {
            console.error("Failed to save auto-synced hackathons", e);
          }
          setLastSyncedTime(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.warn("Auto website sync error:", err);
      }
    };
    runAutoResync();
    return () => {
      active = false;
    };
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncPhase(1);
    setActiveSyncMessage('Querying Google Search grounding engine for active global hackathons...');
    
    try {
      const res = await fetch("/api/hackathons/update-events?force=true");
      if (!res.ok) {
        throw new Error("Neural link search query failed. Code: " + res.status);
      }
      const data = await res.json();
      setSyncPhase(2);
      setActiveSyncMessage('Structuring verified challenges, registry timelines, and award pools...');
      
      if (data.events && Array.isArray(data.events) && data.events.length > 0) {
        // Reset isNewAddition on all current items first, so old highlights from previous sync sessions don't linger
        const currentList = eventsList.map(item => ({ ...item, isNewAddition: false }));
        const CURRENT_IDS = new Set(currentList.map(item => item.id));
        const merged = [...currentList];
        let newCount = 0;
        
        data.events.forEach((incomingEvent: any) => {
          const index = merged.findIndex(item => item.id === incomingEvent.id);
          const isNew = !CURRENT_IDS.has(incomingEvent.id);
          if (isNew) {
            newCount++;
          }
          const processedEvent = {
            ...incomingEvent,
            isNewAddition: isNew // Only highlight truly brand-new items found in this manual sync session
          };
          if (index !== -1) {
            merged[index] = { ...merged[index], ...processedEvent };
          } else {
            merged.push(processedEvent);
          }
        });
        
        // Filter to remove expired/concluded listings
        const filtered = merged.filter((item: any) => {
          const hasDaysLeft = item.daysLeft !== undefined && item.daysLeft > 0;
          const isNotClosed = item.scheduleStatus !== 'Closed';
          return hasDaysLeft && isNotClosed;
        });
        
        setEventsList(filtered);
        try {
          localStorage.setItem('pathfinder_synced_hackathons', JSON.stringify(filtered));
        } catch (e) {
          console.error("Failed to save manually synced hackathons", e);
        }
        if (setSelectedItemId) {
          const firstNew = filtered.find((e: any) => e.isNewAddition);
          setSelectedItemId(firstNew ? firstNew.id : filtered[0]?.id || null);
        }

        setTimeout(() => {
          setSyncPhase(3);
          setActiveSyncMessage('Injecting real-time global search events cache into MapIT...');
          setTimeout(() => {
            setIsSyncing(false);
            setSyncPhase(0);
            setActiveSyncMessage(`Grounding sync successful! Real worldwide hackathons verified. Found ${newCount === 0 ? "no" : newCount} new ${newCount === 1 ? "listing" : "listings"}!`);
            setLastSyncedTime(new Date().toLocaleTimeString());
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          setSyncPhase(3);
          setActiveSyncMessage('Injecting real-time global search events cache into MapIT...');
          setTimeout(() => {
            setIsSyncing(false);
            setSyncPhase(0);
            setActiveSyncMessage('Grounding sync successful! No new hackathons were found at this time.');
            setLastSyncedTime(new Date().toLocaleTimeString());
          }, 1000);
        }, 1000);
      }
    } catch (e: any) {
      console.error(e);
      setSyncPhase(0);
      setIsSyncing(false);
      setActiveSyncMessage('Sync alert: search pipeline exception. Utilizing local offline database.');
    }
  };

  const getCountdownString = (id: string, initialDays: number) => {
    if (initialDays <= 0) return "Concluded / Closed";
    const totalSeconds = (initialDays * 86400) - (secondsTick % 86400);
    if (totalSeconds <= 0) return "Concluded / Closed";
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${days}d : ${String(hours).padStart(2, '0')}h : ${String(mins).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
  };

  // Combine unique domains list across BOTH datasets
  const ALL_DOMAINS = ['All', ...Array.from(new Set(
    COMBINED_EVENTS.flatMap(item => item.themes)
  ))];

  // Categories helper
  const getCategory = (item: Hackathon): string => {
    if (item.category) return item.category;
    const title = item.title.toLowerCase();
    const desc = item.description.toLowerCase();
    const org = item.organizer.toLowerCase();
    if (title.includes('hackathon') || desc.includes('hackathon')) return 'Hackathon';
    if (title.includes('bootcamp') || desc.includes('bootcamp') || org.includes('upgrad') || org.includes('scaler') || title.includes('academy')) return 'Bootcamp';
    if (title.includes('challenge') || desc.includes('challenge')) return 'Challenge';
    if (title.includes('webinar') || desc.includes('webinar')) return 'Webinar';
    if (title.includes('cfp') || desc.includes('cfp') || title.includes('speaker') || org.includes('sessionize')) return 'CFP';
    if (title.includes('training') || desc.includes('training') || title.includes('masterclass') || title.includes('course')) return 'Training';
    return 'Event';
  };

  // Schedule status helper
  const getScheduleStatus = (item: Hackathon): string => {
    if (item.scheduleStatus) return item.scheduleStatus;
    if (item.daysLeft <= 0 || item.isConcluded) return 'Closed';
    if (item.daysLeft > 15) return 'Upcoming';
    return 'Active';
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Hackathon':
        return 'border-amber-500 bg-amber-500/10 text-amber-500';
      case 'Bootcamp':
        return 'border-purple-500 bg-purple-500/10 text-purple-400';
      case 'Event':
        return 'border-sky-500 bg-sky-500/10 text-sky-450';
      case 'Challenge':
        return 'border-orange-500 bg-orange-500/10 text-orange-450';
      case 'Webinar':
        return 'border-pink-500 bg-pink-500/10 text-pink-400';
      case 'CFP':
        return 'border-rose-500 bg-rose-500/10 text-rose-450';
      case 'Training':
        return 'border-teal-500 bg-teal-500/10 text-teal-400';
      default:
        return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
      case 'Upcoming':
        return 'border-indigo-400 bg-indigo-400/10 text-indigo-400';
      case 'Closed':
        return 'border-red-500 bg-red-500/10 text-red-400';
      default:
        return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  // Filter and sort list (newer additions on top)
  const filteredItems = COMBINED_EVENTS.filter(item => {
    const matchesRegion = regionFilter === 'All' || item.region === regionFilter;
    const matchesDomain = domainFilter === 'All' || item.themes.includes(domainFilter);
    const matchesCategory = categoryFilter === 'All' || getCategory(item) === categoryFilter;
    const matchesStatus = statusFilter === 'All' || getScheduleStatus(item) === statusFilter;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchLower) ||
                          item.organizer.toLowerCase().includes(searchLower) ||
                          item.description.toLowerCase().includes(searchLower) ||
                          item.themes.some(t => t.toLowerCase().includes(searchLower)) ||
                          (item.region && item.region.toLowerCase().includes(searchLower)) ||
                          (item.prizes && item.prizes.toLowerCase().includes(searchLower)) ||
                          (item.difficulty && item.difficulty.toLowerCase().includes(searchLower)) ||
                          (item.location && item.location.toLowerCase().includes(searchLower)) ||
                          (item.targetAudience && item.targetAudience.toLowerCase().includes(searchLower)) ||
                          (item.careerBenefit && item.careerBenefit.toLowerCase().includes(searchLower)) ||
                          getCategory(item).toLowerCase().includes(searchLower) ||
                          getScheduleStatus(item).toLowerCase().includes(searchLower);
                          
    return matchesRegion && matchesDomain && matchesCategory && matchesStatus && matchesSearch;
  }).sort((a, b) => {
    const aNew = a.isNewAddition ? 1 : 0;
    const bNew = b.isNewAddition ? 1 : 0;
    return bNew - aNew;
  });

  const selectedItem = COMBINED_EVENTS.find(item => item.id === selectedItemId) || filteredItems[0] || COMBINED_EVENTS[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Collapsible Mobile Preferences Button */}
      <div className="flex items-center justify-between lg:hidden p-3 border-2 border-red-500/20 bg-red-950/5 font-mono text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Filter className="w-3.5 h-3.5 text-red-500" />
          <span className="font-bold text-white uppercase text-[10px]">Filter Options</span>
        </div>
        <button 
          type="button"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold uppercase transition cursor-pointer select-none"
        >
          <span>Preferences {isMobileFiltersOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* 3. FILTERS BAR */}
      <div className={`${isMobile ? (isMobileFiltersOpen ? 'flex flex-col' : 'hidden') : 'flex flex-col lg:flex-row'} border-2 p-4 items-stretch lg:items-center justify-between gap-4 font-mono text-xs ${isLight ? 'bg-white border-gray-200 text-slate-800 shadow-[3px_3px_0px_0px_#cbd5e1]' : 'bg-[#070b14] border-[#121c38] text-white shadow-[3px_3px_0px_#121c38]'}`}>
        
        <div className="flex flex-wrap items-center gap-3">
          <span className={`font-bold flex items-center gap-1 uppercase mr-1 hidden lg:flex ${isLight ? 'text-slate-900 font-extrabold' : 'text-white'}`}>
            <Filter className="w-3.5 h-3.5 text-red-500" />
          </span>

          {/* Region selector */}
          <div className={`flex items-center gap-1 border px-2 py-1 ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050912] border-[#121c38]'}`}>
            <span className="text-gray-500 text-[10px] uppercase font-bold">REGION:</span>
            <select 
              value={regionFilter} 
              onChange={(e) => setRegionFilter(e.target.value)}
              className={`bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 ${isLight ? 'text-slate-900 *:bg-white *:text-slate-800' : 'text-white *:bg-[#050912] *:text-white'}`}
            >
              <option value="All">All Regions</option>
              <option value="Global">Global Reach</option>
              <option value="India">India</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>

          {/* Domains selector */}
          <div className={`flex items-center gap-1 border px-2 py-1 ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050912] border-[#121c38]'}`}>
            <span className="text-gray-500 text-[10px] uppercase font-bold">DOMAINS:</span>
            <select 
              value={domainFilter} 
              onChange={(e) => setDomainFilter(e.target.value)}
              className={`bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 ${isLight ? 'text-slate-900 *:bg-white *:text-slate-800' : 'text-white *:bg-[#050912] *:text-white'}`}
            >
              {ALL_DOMAINS.map(domain => (
                <option key={domain} value={domain}>{domain === 'All' ? 'All Domains' : domain}</option>
              ))}
            </select>
          </div>

          {/* Category selector */}
          <div className={`flex items-center gap-1 border px-2 py-1 ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050912] border-[#121c38]'}`}>
            <span className="text-gray-500 text-[10px] uppercase font-bold">CATEGORY:</span>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 ${isLight ? 'text-slate-900 *:bg-white *:text-slate-800' : 'text-white *:bg-[#050912] *:text-white'}`}
            >
              <option value="All">All Categories</option>
              <option value="Hackathon">Hackathons</option>
              <option value="Event">Events</option>
              <option value="Bootcamp">Bootcamps</option>
              <option value="Challenge">Challenges</option>
              <option value="CFP">CFP Trackers</option>
              <option value="Training">Trainings</option>
            </select>
          </div>

          {/* Status selector */}
          <div className={`flex items-center gap-1 border px-2 py-1 ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050912] border-[#121c38]'}`}>
            <span className="text-gray-500 text-[10px] uppercase font-bold">STATUS:</span>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 ${isLight ? 'text-slate-900 *:bg-white *:text-slate-800' : 'text-white *:bg-[#050912] *:text-white'}`}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Title Search Input */}
        {!hideInternalSearch && (
          <div className="relative w-full lg:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Search events, registries or hosts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050912] border-[#121c38] text-white'} border pl-9 pr-4 py-1.5 uppercase tracking-wider text-[11px] focus:outline-none focus:border-red-500 placeholder-gray-500 rounded-none`}
            />
          </div>
        )}

      </div>

      {/* 4. MAIN LAYOUT: MASTER LIST AND DETAIL CARD VIEW */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left list: Master list of matches */}
        <div className="lg:col-span-5 flex flex-col gap-2 max-h-[550px] overflow-y-auto pr-1">
          {filteredItems.slice(0, isMobile && !showAllHackathons ? 4 : undefined).map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedItemId(item.id);
                  if (isMobile) {
                    setTimeout(() => {
                      document.getElementById('hackathon-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 80);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItemId(item.id);
                    if (isMobile) {
                      setTimeout(() => {
                        document.getElementById('hackathon-detail-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 80);
                    }
                  }
                }}
                style={{
                  borderColor: isSelected ? '#10b981' : (item.isNewAddition ? '#10b981' : (isLight ? '#cbd5e1' : '#121c38')),
                  boxShadow: isSelected ? '3px 3px 0px 0px #10b981' : (item.isNewAddition ? '3px 3px 0px 0px rgba(16,185,129,0.3)' : 'none')
                }}
                className={`w-full p-4 text-left border-2 transition-all relative rounded-none flex flex-col gap-2 font-mono text-xs cursor-pointer ${
                  isSelected 
                    ? (isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0f2c20]/40 text-white') 
                    : item.isNewAddition
                      ? (isLight ? 'bg-[#f0fdf4] text-slate-850' : 'bg-[#0a1e16] text-gray-300')
                      : (isLight ? 'bg-white hover:bg-slate-50 text-slate-700' : 'bg-[#090f1e] hover:bg-[#0c162b] text-gray-400')
                }`}
              >
                <div className="flex justify-between items-start gap-2 w-full">
                  <span className="text-[10px] text-gray-500 uppercase font-sans font-bold block truncate">
                    {item.organizer}
                  </span>
                  
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    {item.isNewAddition && (
                      <span className="px-1.5 py-0.5 text-[8px] md:text-[8.5px] border border-[#10b981] bg-[#10b981]/15 text-[#10b981] font-bold rounded-none uppercase animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full inline-block animate-ping" />
                        LATEST ADDITION
                      </span>
                    )}
                    
                    {/* Category Label */}
                    <span className={`px-1.5 py-0.5 text-[8.2px] border font-bold uppercase rounded-none font-mono ${getCategoryStyle(getCategory(item))}`}>
                      {getCategory(item)}
                    </span>

                    {/* Status Badge */}
                    <span className={`px-1.5 py-0.5 text-[8.2px] border font-bold uppercase rounded-none font-mono flex items-center gap-1 ${getStatusStyle(getScheduleStatus(item))}`}>
                      {getScheduleStatus(item) === 'Active' && <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping shrink-0" />}
                      {getScheduleStatus(item)}
                    </span>

                    {toggleBookmark && isBookmarked && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleBookmark({
                            id: item.id,
                            name: item.title,
                            type: 'hackathon',
                            subtext: `${item.organizer} • ${item.region}`,
                            url: item.url
                          });
                        }}
                        className="p-0.5 text-gray-500 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center"
                        title={isBookmarked(item.id, 'hackathon') ? 'Remove bookmark' : 'Bookmark this item'}
                      >
                        <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isBookmarked(item.id, 'hackathon') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                      </button>
                    )}
                    <span className={`px-1.5 py-0.5 text-[8.2px] border font-bold rounded-none uppercase ${isLight ? 'border-gray-200 bg-gray-100/50 text-slate-800' : 'border-gray-650 bg-slate-900/40 text-gray-400'}`}>
                      {item.type}
                    </span>
                  </div>
                </div>

                <h3 className={`font-sans font-bold text-sm block tracking-tight leading-tight uppercase transition-colors ${
                  isSelected 
                    ? 'text-emerald-400 font-extrabold' 
                    : (isLight ? 'text-slate-800' : 'text-slate-200')
                }`}>
                  {item.title}
                </h3>

                <div className={`flex items-center justify-between text-[11px] pt-1 border-t mt-1 select-none w-full gap-2 ${isLight ? 'border-gray-200' : 'border-[#121c38]/50'}`}>
                  <span className="text-gray-500 flex items-center gap-1 min-w-0 flex-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate" title={`${item.region} • ${item.location}`}>{item.region} • {item.location}</span>
                  </span>
                  
                  <span className={`${item.daysLeft <= 0 ? 'text-gray-500' : 'text-yellow-450'} font-semibold flex items-center gap-1 font-mono shrink-0`}>
                    <Calendar className="w-3" />
                    {getCountdownString(item.id, item.daysLeft)}
                  </span>
                </div>

                {/* Themes tag chips */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {item.themes.map(t => (
                    <span key={t} className="text-[8.5px] bg-white text-black border border-gray-300 font-bold uppercase px-1.5 py-0.5">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="border-2 border-dashed border-red-500/20 bg-red-950/10 p-10 text-center text-red-400 font-mono text-xs">
              ⚠️ No entry matched the active search filters and keywords.
            </div>
          )}

          {isMobile && filteredItems.length > 4 && (
            <div className="mt-2 flex justify-center">
              <button
                onClick={() => setShowAllHackathons(!showAllHackathons)}
                className="w-full py-2.5 bg-slate-950 hover:bg-[#121c38] border border-[#1e2e54] hover:border-[#10b981] text-[#10b981] font-mono text-xs font-bold uppercase transition focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{showAllHackathons ? '▲ Show Fewer Hackathons' : `▼ Show All Hackathons (${filteredItems.length})`}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right panel: Detail breakdown */}
        <div id="hackathon-detail-panel" className="lg:col-span-7 scroll-mt-20">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className={`border-2 p-5 flex flex-col justify-between h-full relative ${isLight ? 'bg-white border-gray-200 text-slate-800 shadow-[4px_4px_0px_0px_#cbd5e1]' : 'bg-[#080d1a] border-[#121c38] text-white shadow-[4px_4px_0px_#121c38]'} border-emerald-950/40`}
              >
                
                {/* Header detail */}
                <div className="space-y-3.5">
                  <div className={`flex items-center justify-between border-b pb-3 font-mono ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest block leading-none mb-1 text-emerald-400">
                        {selectedItem.prizes.toLowerCase().includes('cash') || selectedItem.prizes.toLowerCase().includes('$') ? 'ACTIVE BUILD OPPORTUNITY SPECIFICATIONS' : 'EXPERT TECHNOLOGY SUMMIT/FEST'}
                      </span>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold font-sans text-md uppercase leading-tight ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
                          {selectedItem.organizer}
                        </h4>
                        {toggleBookmark && isBookmarked && (
                          <button
                            onClick={() => toggleBookmark({
                              id: selectedItem.id,
                              name: selectedItem.title,
                              type: 'hackathon',
                              subtext: `${selectedItem.organizer} • ${selectedItem.region}`,
                              url: selectedItem.url
                            })}
                            className="p-1 text-gray-500 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center animate-pulse"
                            title={isBookmarked(selectedItem.id, 'hackathon') ? 'Remove bookmark' : 'Bookmark this item'}
                          >
                            <CustomBookmarkIcon className={`w-4 h-4 ${isBookmarked(selectedItem.id, 'hackathon') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">
                        Difficulty / Format
                      </span>
                      <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-800 font-extrabold' : 'text-white'}`}>{selectedItem.difficulty}</span>
                    </div>
                  </div>

                  {/* Large Name */}
                  <div className="space-y-1.5 font-mono">
                    <h2 className={`text-xl font-bold font-sans tracking-tight uppercase leading-snug text-emerald-400`}>
                      {selectedItem.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-[11px] border px-2.5 py-0.5 font-mono uppercase font-semibold ${getCategoryStyle(getCategory(selectedItem))}`}>
                        CATEGORY: {getCategory(selectedItem)}
                      </span>
                      <span className={`text-[11px] border px-2.5 py-0.5 font-mono uppercase font-semibold flex items-center gap-1.5 ${getStatusStyle(getScheduleStatus(selectedItem))}`}>
                        {getScheduleStatus(selectedItem) === 'Active' && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />}
                        STATUS: {getScheduleStatus(selectedItem)}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 font-mono uppercase font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        {selectedItem.region} Focus
                      </span>
                      <span className={`text-[11px] border px-2.5 py-0.5 font-mono uppercase font-semibold ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700/80 text-gray-300'}`}>
                        {selectedItem.type} Access
                      </span>
                    </div>
                  </div>

                      {/* Location Banner */}
                  <div className={`flex items-start gap-2.5 text-xs font-mono border p-3 ${isLight ? 'bg-slate-50 border-gray-200 text-slate-800 font-medium' : 'bg-black/40 border-[#1e2e54]/40 text-slate-300'}`}>
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400 animate-pulse" />
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-gray-500 uppercase block font-bold leading-none">EVENT COORDINATES & LOCATION</span>
                      <strong className={`font-sans font-semibold text-[13px] ${isLight ? 'text-slate-850' : 'text-white'}`}>{selectedItem.location}</strong>
                    </div>
                  </div>

                  {/* Core Description Panel */}
                  <div className={`p-4 font-mono text-xs border space-y-2 ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050810] border-[#1e2e54]/50 text-slate-300'}`}>
                    <span className="font-bold block uppercase text-[10px] text-emerald-400">
                      ✔ OVERVIEW & OBJECTIVES
                    </span>
                    <p className={`leading-relaxed font-sans font-normal text-[12.5px] normal-case ${isLight ? 'text-slate-705' : 'text-slate-200'}`}>
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Target Audience & Career Growth Advantages */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 font-mono text-xs">
                    <div className="space-y-1.5">
                      <span className="text-slate-500 uppercase text-[9px] block">TARGET DEMOGRAPHICS:</span>
                      <div className={`leading-relaxed font-sans border-l-2 border-indigo-500 pl-2.5 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}`}>
                        {selectedItem.targetAudience}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-slate-500 uppercase text-[9px] block">CAREER ADVANCEMENT & SKILLS:</span>
                      <div className={`leading-relaxed font-sans border-l-2 border-[#10b981] pl-2.5 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}`}>
                        {selectedItem.careerBenefit}
                      </div>
                    </div>
                  </div>

                  {/* Prizes and Themes highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-2">
                    <div className="p-3 border flex items-start gap-2.5 bg-emerald-950/10 border-emerald-900/35">
                      <Trophy className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                      <div>
                        <span className="text-[9px] uppercase block font-bold leading-none mb-1 text-emerald-400">
                          PRIZES, CERTIFICATES & ADVANTAGES
                        </span>
                        <strong className={`text-[12px] uppercase leading-tight font-sans tracking-wide ${isLight ? 'text-slate-850 font-extrabold' : 'text-white'}`}>
                          {selectedItem.prizes}
                        </strong>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-950/10 border border-indigo-900/35 flex items-start gap-2.5">
                      <Tag className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-indigo-400 uppercase block font-bold leading-none mb-1">THEMATIC SKILL MATRICES</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedItem.themes.map(t => (
                            <span key={t} className="bg-white border border-gray-300 text-black text-[9px] font-bold px-1.5 py-0.5 font-sans">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Controls & Redirect Portal URI */}
                {selectedItem.daysLeft <= 0 || selectedItem.isConcluded ? (
                  <div className={`mt-6 border-t pt-5 space-y-4 font-mono text-xs ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
                    <div className="flex items-center gap-2 p-2 bg-[#ef4444]/10 border border-[#ef4444]/30 text-red-500 font-bold">
                      <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
                      <span>🔴 REGISTRATION CLOSED / EVENT CONCLUDED</span>
                    </div>
                    
                    <div className={`p-4 leading-relaxed border ${isLight ? 'bg-slate-50 border-gray-200 text-slate-700' : 'bg-[#0f1423] border-[#1e2e54] text-slate-300'}`}>
                      <p className="font-sans text-[12.5px] mb-3">
                        This opportunity is currently concluded. Below are official online recommended portals, videos, or Minutes of Meetings (MOM) to see performance highlights and project portfolios:
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        {selectedItem.momUrl && (
                          <a
                            href={selectedItem.momUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-center flex items-center justify-center gap-1.5 rounded-none shadow-[2px_2px_0px_#091d3e] transition-all cursor-pointer"
                          >
                            📄 {selectedItem.momTitle || 'View Event MOM'} <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {selectedItem.replayUrl && (
                          <a
                            href={selectedItem.replayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-red-650 hover:bg-red-600 text-white font-bold text-center flex items-center justify-center gap-1.5 rounded-none shadow-[2px_2px_0px_#4c0505] transition-all cursor-pointer"
                          >
                            🎥 {selectedItem.replayTitle || 'Watch Event Replay'} <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`mt-6 border-t pt-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse shrink-0 bg-[#10b981]" />
                      <span className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        Closes in:{' '}
                        <strong className="text-red-500 font-bold">
                          {getCountdownString(selectedItem.id, selectedItem.daysLeft)}
                        </strong>
                      </span>
                    </div>

                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full sm:w-auto px-5 py-2.5 text-black font-semibold uppercase tracking-wider text-xs font-sans text-center transition flex items-center justify-center gap-1.5 cursor-pointer bg-[#10b981] hover:bg-emerald-400 ${isLight ? 'shadow-[2px_2px_0px_#1e2e54]' : 'shadow-[2px_2px_0px_#fff]'}`}
                    >
                      Open Official Portal <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                )}

              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-800 p-8 text-center text-gray-500 font-mono text-xs">
                Select an item from the left registry panel to view full specifications.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 5. CODESPOT ROADMAP BROADCAST FEED */}
      <div className="mt-6 bg-[#070b13] border-2 border-[#121c38] p-4.5 font-mono text-xs shadow-[4px_4px_0px_0px_#1e2e54]">
        <div className="flex items-center justify-between border-b border-[#121c38] pb-2.5 mb-3.5">
          <span className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#10b981] animate-pulse" /> INTEGRATED BUILD & METEORIC BROADCAST
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300 leading-normal text-[11px]">
          <div className="p-3 bg-[#0a0f1d] border border-[#121c38] rounded-none">
            <span className="text-slate-500 text-[10px] block uppercase mb-1">Portfolio Creation</span>
            <p className="font-sans font-light">
              Build robust, end-to-end applications under pressure to instantly enrich your visual portfolio and GitHub statistics.
            </p>
          </div>
          <div className="p-3 bg-[#0a0f1d] border border-[#121c38] rounded-none">
            <span className="text-slate-500 text-[10px] block uppercase mb-1">Enterprise Bounties & Badges</span>
            <p className="font-sans font-light">
              Partnering sponsors seek developer squads using their cloud APIs & data schemas, giving out cloud credit keys and verified certifications.
            </p>
          </div>
          <div className="p-3 bg-[#0a0f1d] border border-[#121c38] rounded-none">
            <span className="text-slate-500 text-[10px] block uppercase mb-1">Ecosystem Placements & MOMs</span>
            <p className="font-sans font-light">
              National challenges and sustainable fests promote direct placement lines. Check concluded event resources for project minutes (MOMs).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
