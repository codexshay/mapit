import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Globe, Search, RefreshCw, Calendar, Tag, MapPin, 
  ExternalLink, Trophy, Users, CheckCircle2, AlertCircle, ArrowUpRight, 
  Compass, Radio, Sparkles, Filter, Bookmark, Info, Bell, BellOff, ChevronRight
} from 'lucide-react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import { motion, AnimatePresence } from 'motion/react';
import autoHackathons from '../data/generated/auto_hackathons.json';

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
  concludedDaysAgo?: number;
  momUrl?: string;
  momTitle?: string;
  replayUrl?: string;
  replayTitle?: string;
  isNewAddition?: boolean;
  autoIngested?: boolean;
  category?: 'Hackathon' | 'Event' | 'Bootcamp' | 'Challenge' | 'Webinar' | 'CFP' | 'Training' | 'Quiz' | 'College Fest' | 'Scholarship' | 'Workshop' | 'Conference' | 'Hiring Challenge';
  scheduleStatus?: 'Active' | 'Upcoming' | 'Closed';
}

export const GLOBAL_HACKATHONS: Hackathon[] = [
  {
    id: 'sih-2026-software-hardware',
    title: 'Smart India Hackathon 2026 (Software & Hardware Edition)',
    organizer: 'Ministry of Education, AICTE & Persistent Systems',
    region: 'India',
    prizes: '₹1 Lakh per Problem Statement + Direct Govt Industry Incubation',
    themes: ['Smart Automation', 'AI/ML', 'Clean Tech', 'Cybersecurity', 'Heritage Tech'],
    difficulty: 'All Levels',
    daysLeft: 15,
    url: 'https://sih.gov.in/',
    type: 'Hybrid',
    location: 'Nodal Centers Across India & Online Submissions',
    description: 'India’s largest nationwide hackathon initiative providing students a platform to solve real-world pressing problems of Central & State Ministries, PSUs, and Industry Leaders.',
    targetAudience: 'Engineering, Polytechnic & University Students Nationwide',
    careerBenefit: 'Direct recognition by Govt of India, cash awards, and startup seed funding access.',
    category: 'Hackathon',
    isNewAddition: true
  },
  {
    id: 'ethindia-2026-devfolio',
    title: "ETHIndia 2026 (Asia's Largest Ethereum Hackathon)",
    organizer: 'Devfolio & Ethereum Foundation',
    region: 'Global',
    prizes: '$100,000+ USD Total Track Grants & Bounties',
    themes: ['Web3', 'DeFi', 'Zero-Knowledge Proofs', 'Smart Contracts'],
    difficulty: 'Intermediate',
    daysLeft: 9,
    url: 'https://ethindia.co/',
    type: 'Hybrid',
    location: 'KTPO Bengaluru & Online Portal',
    description: 'Premier Web3 hackathon gathering 2,000+ developers to build decentralized applications, zero-knowledge systems, and next-gen blockchain infrastructure.',
    targetAudience: 'Full-Stack Developers, Crypto Researchers & Engineering Students',
    careerBenefit: 'Direct venture capital seed grants, ecosystem job offers, and Ethereum Foundation support.',
    category: 'Hackathon',
    isNewAddition: true
  },
  {
    id: 'mlh-global-hack-week-2026',
    title: 'Major League Hacking (MLH) Global Hack Week 2026',
    organizer: 'Major League Hacking (MLH)',
    region: 'Global',
    prizes: 'Digital Badges, Swag Boxes, AWS Credits & Partner Bounties',
    themes: ['Open Source', 'Web Dev', 'AI Agents', 'DevOps'],
    difficulty: 'Beginner',
    daysLeft: 4,
    url: 'https://globalhackweek.mlh.io/',
    type: 'Online',
    location: 'Discord & Twitch Virtual Streams',
    description: 'A week-long global celebration of hacking where developers of all skill levels learn new technologies, build projects, and complete daily coding challenges.',
    targetAudience: 'Global Student Developers & Self-Taught Coders',
    careerBenefit: 'MLH Fellowship fast-track, GitHub portfolio boost, and global peer network.',
    category: 'Event',
    isNewAddition: true
  },
  {
    id: 'kaggle-llm-science-2026',
    title: 'Kaggle LLM & AI Science Research Competition 2026',
    organizer: 'Kaggle & Google AI',
    region: 'Global',
    prizes: '$50,000 USD Prize Pool + Kaggle Grandmaster GM Points',
    themes: ['LLMs', 'Prompt Engineering', 'RAG Systems', 'NLP'],
    difficulty: 'Advanced',
    daysLeft: 21,
    url: 'https://www.kaggle.com/competitions',
    type: 'Online',
    location: 'Kaggle Platform',
    description: 'Global machine learning competition challenging data scientists to evaluate and optimize Large Language Models on complex STEM reasoning benchmarks.',
    targetAudience: 'Data Scientists, ML Engineers, Researchers & Graduate Students',
    careerBenefit: 'Global Kaggle leaderboard ranking, peer-reviewed paper opportunities, and top AI lab recruiting.',
    category: 'Challenge',
    isNewAddition: true
  },
  
  {
    id: 'unstop-tata-imagination-2026',
    title: 'Tata Imagination Challenge 2026',
    organizer: 'Tata Group & Unstop',
    region: 'India',
    prizes: '₹25 Lakhs Prize Pool + TAS Executive Trainee Direct Fast-Track',
    themes: ['Business Quiz', 'Case Competition', 'Innovation'],
    difficulty: 'All Levels',
    daysLeft: 11,
    url: 'https://unstop.com/competitions/tata-imagination-challenge-tata-sons-1204859',
    type: 'Online',
    location: 'Online via Unstop Platform',
    description: 'National case study, innovation, and aptitude quiz competition organized by Tata Sons on Unstop for college students across India.',
    targetAudience: 'Undergraduate & Postgraduate Students in India',
    careerBenefit: 'Direct fast-track interview opportunity for the prestigious Tata Administrative Services (TAS) program.',
    category: 'Quiz'
  },
  {
    id: 'unstop-flipkart-grid-6',
    title: 'Flipkart GRID 6.0 Software & Robotics Challenge',
    organizer: 'Flipkart & Unstop',
    region: 'India',
    prizes: '₹16 Lakhs Cash Pool + SDE-1 Direct Hiring Offers',
    themes: ['Software Engineering', 'Robotics', 'Supply Chain Tech'],
    difficulty: 'Intermediate',
    daysLeft: 2,
    url: 'https://unstop.com/hackathons/flipkart-grid-60-software-development-track-flipkart-984210',
    type: 'Online',
    location: 'Online via Unstop Portal',
    description: 'Flipkart’s flagship engineering hackathon on Unstop inviting students to build scalable systems, AI algorithms, and logistics robotics.',
    targetAudience: 'B.Tech / B.E. / M.Tech Students across India',
    careerBenefit: 'Direct SDE-1 and SDE Intern hiring interviews at Flipkart.',
    category: 'Hackathon'
  },
  {
    id: 'unstop-iit-bombay-techfest',
    title: 'IIT Bombay Techfest 2026 (Asia\'s Largest Sci-Tech Fest)',
    organizer: 'IIT Bombay & Unstop',
    region: 'India',
    prizes: '₹45 Lakhs Total Prize Pool + Certificates',
    themes: ['Robotics', 'Coding Sprint', 'AI Competition', 'Cultural Tech'],
    difficulty: 'All Levels',
    daysLeft: 18,
    url: 'https://unstop.com/college-fests/techfest-iit-bombay-110294',
    type: 'Hybrid',
    location: 'IIT Bombay Campus, Powai, Mumbai',
    description: 'Asia’s premier annual science and technology college festival featuring high-stakes robotics wars, hackathons, international keynotes, and tech exhibitions.',
    targetAudience: 'Engineering, Science & Management Students Nationwide',
    careerBenefit: 'Prizes, internships, networking with industry stalwarts and international tech leaders.',
    category: 'College Fest'
  },
  {
    id: 'unstop-google-generation-scholarship',
    title: 'Generation Google Scholarship APAC (India Track)',
    organizer: 'Google Build Your Future',
    region: 'India',
    prizes: '$2,500 USD (~₹2,10,000) Educational Grant',
    themes: ['Diversity in Tech', 'Computer Science', 'Women in STEM'],
    difficulty: 'All Levels',
    daysLeft: 7,
    url: 'https://www.google.com/about/careers/applications/buildyourfuture/',
    type: 'Online',
    location: 'Online Application via Google Build Your Future Portal',
    description: 'Scholarship program by Google to inspire and help female students pursuing computer science degrees to excel in technology and become leaders in the field.',
    targetAudience: 'Female Computer Science Students in Indian Universities',
    careerBenefit: 'Direct financial assistance, Google community access, and mentorship opportunities.',
    category: 'Scholarship'
  },
  {
    id: 'unstop-amazon-wow-2026',
    title: 'Amazon WOW (Women in Tech) Hiring Challenge 2026',
    organizer: 'Amazon India',
    region: 'India',
    prizes: 'Amazon SDE Full-Time & Internship Roles',
    themes: ['DSA', 'System Design', 'Coding Quiz'],
    difficulty: 'Intermediate',
    daysLeft: 0,
    url: 'https://unstop.com/competitions/amazon-wow-india',
    type: 'Online',
    location: 'Online Assessment Platform',
    description: 'A networking and skill-building platform for women engineering students across India, offering coding tests and interviews for SDE roles.',
    targetAudience: 'Women Engineering Students in 2nd, 3rd, and 4th Years',
    careerBenefit: 'Direct recruitment into Amazon Software Development Engineer (SDE) positions.',
    category: 'Hiring Challenge'
  },
  {
    id: 'unstop-microsoft-ai-workshop',
    title: 'Microsoft AI & Cloud Masterclass Workshop Series',
    organizer: 'Microsoft Reactor India',
    region: 'India',
    prizes: 'Free Azure Certification Vouchers & Digital Credentials',
    themes: ['Generative AI', 'Azure Cloud', 'OpenAI API'],
    difficulty: 'Beginner',
    daysLeft: 0,
    url: 'https://unstop.com/workshops/microsoft-ai-developer-workshop',
    type: 'Online',
    location: 'Virtual Masterclass Broadcast',
    description: 'Hands-on technical workshop hosted by Microsoft engineers covering Azure OpenAI services, prompt engineering, and RAG pipeline deployment.',
    targetAudience: 'Developers, Students & Tech Enthusiasts in India',
    careerBenefit: 'Industry-recognized Microsoft Certification badge and hands-on portfolio project.',
    category: 'Workshop'
  },
  {
    id: 'google-solution-2026',
    title: 'Google Developer Solution Challenge 2026',
    organizer: 'Google Developers',
    region: 'Global',
    prizes: 'Global Mentorship + $12,000 Cash Tier Prizes',
    themes: ['AI/ML', 'Cloud', 'UN SDGs Solvers'],
    difficulty: 'All Levels',
    daysLeft: 5,
    url: 'https://promptwars.in/solutionchallenge2026.html',
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
    daysLeft: 0,
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
    daysLeft: 15,
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
    daysLeft: 2,
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
    daysLeft: 9,
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
    daysLeft: 28,
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
    daysLeft: 35,
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
    daysLeft: 11,
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
    daysLeft: 23,
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
    daysLeft: 12,
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
    daysLeft: 1,
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
    daysLeft: 7,
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
    daysLeft: 17,
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
    daysLeft: 7,
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
    daysLeft: 2,
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
    daysLeft: 31,
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
    daysLeft: 24,
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
    daysLeft: 11,
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
    daysLeft: 4,
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
    daysLeft: 13,
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
    daysLeft: 38,
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
    daysLeft: 17,
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
    daysLeft: 11,
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
    daysLeft: 2,
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
      baseList = [
        ...(Array.isArray(autoHackathons) ? (autoHackathons as Hackathon[]) : []),
        ...GLOBAL_HACKATHONS,
        ...GLOBAL_FESTS
      ];
    }
    return baseList
      .map((item: any) => ({ ...item, isNewAddition: false }))
      .filter((item: any) => {
        const daysSinceClosed = item.concludedDaysAgo !== undefined 
          ? item.concludedDaysAgo 
          : (item.daysLeft !== undefined && item.daysLeft <= 0 ? Math.abs(item.daysLeft) : (item.isConcluded || item.scheduleStatus === 'Closed' ? 1 : 0));
        
        // Auto-purge events completed more than 15 days ago
        if (item.isConcluded || item.scheduleStatus === 'Closed' || (item.daysLeft !== undefined && item.daysLeft <= 0)) {
          return daysSinceClosed <= 15;
        }
        return true;
      });
  });
  const COMBINED_EVENTS = eventsList;
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isStreamsOpen, setIsStreamsOpen] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  // Mouse Drag-to-Scroll Handlers for Streams Slider
  const streamsSliderRef = useRef<HTMLDivElement>(null);
  const isStreamsMouseDown = useRef<boolean>(false);
  const streamsStartX = useRef<number>(0);
  const streamsScrollLeft = useRef<number>(0);

  const handleStreamsMouseDown = (e: React.MouseEvent) => {
    if (!streamsSliderRef.current) return;
    isStreamsMouseDown.current = true;
    streamsStartX.current = e.pageX - streamsSliderRef.current.offsetLeft;
    streamsScrollLeft.current = streamsSliderRef.current.scrollLeft;
  };

  const handleStreamsMouseLeave = () => {
    isStreamsMouseDown.current = false;
  };

  const handleStreamsMouseUp = () => {
    isStreamsMouseDown.current = false;
  };

  const handleStreamsMouseMove = (e: React.MouseEvent) => {
    if (!isStreamsMouseDown.current || !streamsSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - streamsSliderRef.current.offsetLeft;
    const walk = (x - streamsStartX.current) * 2;
    streamsSliderRef.current.scrollLeft = streamsScrollLeft.current - walk;
  };

  const handleStreamsWheel = (e: React.WheelEvent) => {
    if (streamsSliderRef.current) {
      streamsSliderRef.current.scrollLeft += e.deltaY;
    }
  };
  
  const [localSelectedItemId, setLocalSelectedItemId] = useState<string | null>(null);
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

  // Live Sync Broadcast: Dispatch event to DASH card in App.tsx whenever eventsList updates
  useEffect(() => {
    if (typeof window !== 'undefined' && eventsList && eventsList.length > 0) {
      window.dispatchEvent(new CustomEvent('mapit_hackathons_updated', { detail: eventsList }));
    }
  }, [eventsList]);
  
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

  const [toastMessage, setToastMessage] = useState<{ id: string; text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Show a beautiful temporary toast
  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToastMessage({ id, text, type });
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleGoogleCalendarReminder = (item: Hackathon, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 1. Calculate and open Google Calendar template in a new window/tab
    const url = getGoogleCalendarUrl(item);
    window.open(url, '_blank');

    // 2. Inform the user with a dynamic success notification toast!
    showToast(`📅 Opening Google Calendar for "${item.title}"!`, "success");
  };

  const triggerInAppAlert = (item: Hackathon) => {
    showToast(`🔔 ALERT: "${item.title}" is closing in ${item.daysLeft} days!`, "warning");
    
    // Also try standard browser notification if permission is granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`MapIT Event Alert!`, {
          body: `"${item.title}" organized by ${item.organizer} is closing in ${item.daysLeft} days. Get ready to submit!`,
          icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2310b981'/%3E%3Ccircle cx='16' cy='16' r='6' fill='%23ffffff'/%3E%3C/svg%3E"
        });
      } catch (e) {
        console.error("Browser notification failed", e);
      }
    }
  };

  const getGoogleCalendarUrl = (item: Hackathon) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + item.daysLeft);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(17, 0, 0, 0);

    const formatTargetDate = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const dates = `${formatTargetDate(startDate)}/${formatTargetDate(endDate)}`;
    const title = encodeURIComponent(item.title);
    const details = encodeURIComponent(
      `${item.description}\n\nOrganizer: ${item.organizer}\nType: ${item.type}\nLocation: ${item.location}\nURL: ${item.url}`
    );
    const location = encodeURIComponent(item.location);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = (item: Hackathon) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + item.daysLeft);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(17, 0, 0, 0);

    const formatIcsDate = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MapIT//Hackathon Reminders//EN",
      "BEGIN:VEVENT",
      `UID:${item.id}-${Date.now()}@mapit.app`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:${item.title}`,
      `DESCRIPTION:${item.description.replace(/\n/g, "\\n")} \\n\\nOrganizer: ${item.organizer} \\nURL: ${item.url}`,
      `LOCATION:${item.location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.id}-reminder.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("📅 ICS Calendar file download started!");
  };

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
          
          // Filter to remove listings concluded over 15 days ago
          const filtered = merged.filter((item: any) => {
            const daysSinceClosed = item.concludedDaysAgo !== undefined 
              ? item.concludedDaysAgo 
              : (item.daysLeft !== undefined && item.daysLeft <= 0 ? Math.abs(item.daysLeft) : (item.isConcluded || item.scheduleStatus === 'Closed' ? 1 : 0));
            if (item.isConcluded || item.scheduleStatus === 'Closed' || (item.daysLeft !== undefined && item.daysLeft <= 0)) {
              return daysSinceClosed <= 15;
            }
            return true;
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
        
        // Filter to remove listings concluded over 15 days ago
        const filtered = merged.filter((item: any) => {
          const daysSinceClosed = item.concludedDaysAgo !== undefined 
            ? item.concludedDaysAgo 
            : (item.daysLeft !== undefined && item.daysLeft <= 0 ? Math.abs(item.daysLeft) : (item.isConcluded || item.scheduleStatus === 'Closed' ? 1 : 0));
          if (item.isConcluded || item.scheduleStatus === 'Closed' || (item.daysLeft !== undefined && item.daysLeft <= 0)) {
            return daysSinceClosed <= 15;
          }
          return true;
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
    if (title.includes('quiz') || desc.includes('quiz')) return 'Quiz';
    if (title.includes('fest') || desc.includes('fest') || title.includes('cultural')) return 'College Fest';
    if (title.includes('scholarship') || desc.includes('scholarship') || title.includes('grant')) return 'Scholarship';
    if (title.includes('workshop') || desc.includes('workshop')) return 'Workshop';
    if (title.includes('conference') || desc.includes('conference') || title.includes('summit')) return 'Conference';
    if (title.includes('hiring') || desc.includes('hiring challenge') || title.includes('placement')) return 'Hiring Challenge';
    if (title.includes('hackathon') || desc.includes('hackathon')) return 'Hackathon';
    if (title.includes('bootcamp') || desc.includes('bootcamp') || org.includes('upgrad') || org.includes('scaler') || title.includes('academy')) return 'Bootcamp';
    if (title.includes('challenge') || desc.includes('challenge') || title.includes('competition')) return 'Challenge';
    if (title.includes('webinar') || desc.includes('webinar')) return 'Webinar';
    if (title.includes('cfp') || desc.includes('cfp') || title.includes('speaker') || org.includes('sessionize')) return 'CFP';
    if (title.includes('training') || desc.includes('training') || title.includes('course')) return 'Training';
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
      case 'Quiz':
        return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
      case 'College Fest':
        return 'border-purple-500 bg-purple-500/10 text-purple-400';
      case 'Scholarship':
        return 'border-yellow-400 bg-yellow-400/10 text-yellow-300';
      case 'Workshop':
        return 'border-cyan-500 bg-cyan-500/10 text-cyan-400';
      case 'Conference':
        return 'border-indigo-500 bg-indigo-500/10 text-indigo-400';
      case 'Hiring Challenge':
        return 'border-rose-500 bg-rose-500/10 text-rose-450';
      case 'Bootcamp':
        return 'border-blue-500 bg-blue-500/10 text-blue-400';
      case 'Challenge':
        return 'border-orange-500 bg-orange-500/10 text-orange-450';
      case 'Webinar':
        return 'border-pink-500 bg-pink-500/10 text-pink-400';
      case 'CFP':
        return 'border-red-500 bg-red-500/10 text-red-400';
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

  const selectedItemDesktop = selectedItemId 
    ? COMBINED_EVENTS.find(item => item.id === selectedItemId) || filteredItems[0] || COMBINED_EVENTS[0] 
    : filteredItems[0] || COMBINED_EVENTS[0];

  const selectedItemMobile = selectedItemId 
    ? COMBINED_EVENTS.find(item => item.id === selectedItemId) || null 
    : null;

  const renderDetailCard = (item: typeof COMBINED_EVENTS[0], showBackButton: boolean) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className={`border-2 p-5 sm:p-6 flex flex-col justify-between relative ${
        isLight 
          ? 'bg-white border-emerald-500/30 text-slate-800 shadow-[4px_4px_0px_0px_#10b981]' 
          : 'bg-[#080d1a] border-emerald-500/40 text-white shadow-[4px_4px_0px_#10b981]'
      }`}
    >
      {/* Top Bar: Back to Primary List Arrow Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-5 border-emerald-500/20 font-mono">
        {showBackButton && (
          <button
            type="button"
            onClick={() => setSelectedItemId(null)}
            className="px-4 py-2 border-2 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-mono font-bold uppercase text-xs flex items-center gap-2 cursor-pointer transition-all shadow-[2px_2px_0px_#10b981]"
          >
            <span>← Back to Hackathons List</span>
          </button>
        )}

        {/* Event Counter & Prev/Next Quick Cycle Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px]">
            {filteredItems.findIndex(i => i.id === item.id) + 1} of {filteredItems.length} Events
          </span>
          {filteredItems.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const idx = filteredItems.findIndex(i => i.id === item.id);
                  const prevIdx = idx > 0 ? idx - 1 : filteredItems.length - 1;
                  setSelectedItemId(filteredItems[prevIdx].id);
                }}
                className="px-2 py-1 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 text-[10px] uppercase font-bold cursor-pointer"
              >
                ← Prev
              </button>
              <button
                onClick={() => {
                  const idx = filteredItems.findIndex(i => i.id === item.id);
                  const nextIdx = idx < filteredItems.length - 1 ? idx + 1 : 0;
                  setSelectedItemId(filteredItems[nextIdx].id);
                }}
                className="px-2 py-1 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 text-[10px] uppercase font-bold cursor-pointer"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Header detail */}
      <div className="space-y-4">
        <div className={`flex flex-wrap items-center justify-between border-b pb-3 font-mono gap-2 ${isLight ? 'border-gray-200' : 'border-[#121c38]'}`}>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <h4 className={`font-bold font-sans text-md uppercase leading-tight ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
                {item.organizer}
              </h4>
              {toggleBookmark && isBookmarked && (
                <button
                  onClick={() => toggleBookmark({
                    id: item.id,
                    name: item.title,
                    type: 'hackathon',
                    subtext: `${item.organizer} • ${item.region}`,
                    url: item.url
                  })}
                  className="p-1 text-gray-500 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center animate-pulse"
                  title={isBookmarked(item.id, 'hackathon') ? 'Remove bookmark' : 'Bookmark this item'}
                >
                  <CustomBookmarkIcon className={`w-4 h-4 ${isBookmarked(item.id, 'hackathon') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                </button>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGoogleCalendarReminder(item, e);
                }}
                className="p-1 text-gray-500 hover:text-emerald-400 transition cursor-pointer flex items-center justify-center"
                title="Add to Google Calendar"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-gray-500 block uppercase font-mono">
              Difficulty / Format
            </span>
            <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-800 font-extrabold' : 'text-white'}`}>{item.difficulty}</span>
          </div>
        </div>

        {/* Large Name */}
        <div className="space-y-1.5 font-mono">
          <h2 className={`text-xl sm:text-2xl font-bold font-sans tracking-tight uppercase leading-snug text-emerald-400`}>
            {item.title}
          </h2>
          
          <div className="flex flex-wrap gap-1.5">
            <span className={`text-[11px] border px-2.5 py-0.5 font-mono uppercase font-semibold ${getCategoryStyle(getCategory(item))}`}>
              CATEGORY: {getCategory(item)}
            </span>
            <span className={`text-[11px] border px-2.5 py-0.5 font-mono uppercase font-semibold flex items-center gap-1.5 ${getStatusStyle(getScheduleStatus(item))}`}>
              {getScheduleStatus(item) === 'Active' && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping shrink-0" />}
              STATUS: {getScheduleStatus(item)}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 font-mono uppercase font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              {item.region} Focus
            </span>
            <span className={`text-[11px] border px-2.5 py-0.5 font-mono uppercase font-semibold ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-700/80 text-gray-300'}`}>
              {item.type} Access
            </span>
          </div>
        </div>

        {/* SMART CLOSED EVENT PORTAL SUGGESTION BOX */}
        {(item.isConcluded || item.scheduleStatus === 'Closed' || (item.daysLeft !== undefined && item.daysLeft <= 0)) && (
          <div className="p-4 border-2 border-yellow-500/50 bg-yellow-950/20 text-xs font-mono space-y-2.5 rounded-none">
            <div className="flex items-center justify-between text-yellow-300 font-bold uppercase">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Registration Closed for this {getCategory(item)}</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Auto-delists from archive in {Math.max(1, 15 - (item.concludedDaysAgo || Math.abs(item.daysLeft || 0) || 1))} days
              </span>
            </div>

            <p className="text-zinc-300 font-sans text-xs">
              Registration for <strong>"{item.title}"</strong> is currently closed. Explore live upcoming {getCategory(item)}s on official platforms:
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a href="https://devpost.com/hackathons" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:bg-white hover:text-black text-white font-bold transition flex items-center gap-1.5 cursor-pointer">
                <span>Devpost</span> <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://unstop.com/hackathons" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:bg-white hover:text-black text-white font-bold transition flex items-center gap-1.5 cursor-pointer">
                <span>Unstop (India)</span> <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://devfolio.co/hackathons" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:bg-white hover:text-black text-white font-bold transition flex items-center gap-1.5 cursor-pointer">
                <span>Devfolio</span> <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://mlh.io/seasons/2026/events" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:bg-white hover:text-black text-white font-bold transition flex items-center gap-1.5 cursor-pointer">
                <span>MLH</span> <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.hackerearth.com/challenges/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:bg-white hover:text-black text-white font-bold transition flex items-center gap-1.5 cursor-pointer">
                <span>HackerEarth</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Location Banner */}
        <div className={`flex items-start gap-2.5 text-xs font-mono border p-3 ${isLight ? 'bg-slate-50 border-gray-200 text-slate-800 font-medium' : 'bg-black/40 border-[#1e2e54]/40 text-slate-300'}`}>
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400 animate-pulse" />
          <div className="space-y-0.5">
            <span className="text-[9px] text-gray-500 uppercase block font-bold leading-none">EVENT COORDINATES & LOCATION</span>
            <strong className={`font-sans font-semibold text-[13px] ${isLight ? 'text-slate-850' : 'text-white'}`}>{item.location}</strong>
          </div>
        </div>

        {/* Core Description Panel */}
        <div className={`p-4 font-mono text-xs border space-y-2 ${isLight ? 'bg-gray-50 border-gray-200 text-slate-800' : 'bg-[#050810] border-[#1e2e54]/50 text-slate-300'}`}>
          <span className="font-bold block uppercase text-[10px] text-emerald-400">
            ✔ OVERVIEW & OBJECTIVES
          </span>
          <p className={`leading-relaxed font-sans font-normal text-[12.5px] normal-case ${isLight ? 'text-slate-705' : 'text-slate-200'}`}>
            {item.description}
          </p>
        </div>

        {/* Target Audience & Career Growth Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 font-mono text-xs">
          <div className="space-y-1.5">
            <span className="text-slate-500 uppercase text-[9px] block">TARGET DEMOGRAPHICS:</span>
            <div className={`leading-relaxed font-sans border-l-2 border-indigo-500 pl-2.5 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}`}>
              {item.targetAudience}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-slate-500 uppercase text-[9px] block">CAREER ADVANCEMENT & SKILLS:</span>
            <div className={`leading-relaxed font-sans border-l-2 border-[#10b981] pl-2.5 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-200'}`}>
              {item.careerBenefit}
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
                {item.prizes}
              </strong>
            </div>
          </div>

          <div className="p-3 bg-indigo-950/10 border border-indigo-900/35 flex items-start gap-2.5">
            <Tag className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] text-indigo-400 uppercase block font-bold leading-none mb-1">THEMATIC SKILL MATRICES</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.themes.map(t => (
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
      {item.daysLeft <= 0 || item.isConcluded ? (
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
              {item.momUrl && (
                <a
                  href={item.momUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-center flex items-center justify-center gap-1.5 rounded-none shadow-[2px_2px_0px_#091d3e] transition-all cursor-pointer"
                >
                  📄 {item.momTitle || 'View Event MOM'} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {item.replayUrl && (
                <a
                  href={item.replayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-red-650 hover:bg-red-600 text-white font-bold text-center flex items-center justify-center gap-1.5 rounded-none shadow-[2px_2px_0px_#4c0505] transition-all cursor-pointer"
                >
                  🎥 {item.replayTitle || 'Watch Event Replay'} <ArrowUpRight className="w-3.5 h-3.5" />
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
                {getCountdownString(item.id, item.daysLeft)}
              </strong>
            </span>
          </div>

          <div className="flex flex-col items-end gap-1.5 w-full sm:w-auto">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-black font-bold uppercase transition flex items-center justify-center gap-2 rounded-none shadow-[3px_3px_0px_#064e3b] text-xs cursor-pointer tracking-wider"
            >
              <span>REGISTER / GO TO OFFICIAL PORTAL</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 border-2 shadow-lg font-mono text-xs ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-400' 
                : toastMessage.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500 text-amber-400'
                : 'bg-indigo-950/90 border-indigo-500 text-indigo-450'
            }`}
          >
            <span className="text-sm">🔔</span>
            <span className="font-semibold">{toastMessage.text}</span>
            <button 
              onClick={() => setToastMessage(null)} 
              className="ml-2 hover:text-white transition font-bold"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
      
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

      {/* PROMINENT UNSTOP INDIA & GLOBAL CATEGORY STREAM TABS */}
      {/* MOBILE STREAMS SELECT DROPDOWN */}
      <div className="block md:hidden w-full font-mono mb-2">
        <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
          Select Stream Category:
        </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-2.5 bg-white text-slate-900 border-2 border-slate-300 font-bold text-xs uppercase focus:outline-none cursor-pointer shadow-xs"
        >
          {[
            { id: 'All', label: 'All Streams 🌐' },
            { id: 'Hackathon', label: 'Hackathons 🏆' },
            { id: 'Quiz', label: 'Competitions & Quizzes ⚔️' },
            { id: 'College Fest', label: 'College Fests & Cultural 🚀' },
            { id: 'Scholarship', label: 'Scholarships & Grants 🎓' },
            { id: 'Workshop', label: 'Workshops & Masterclasses 🛠️' },
            { id: 'Conference', label: 'Conferences & Summits 🎙️' },
            { id: 'Hiring Challenge', label: 'Hiring Challenges 💼' },
            { id: 'Bootcamp', label: 'Bootcamps ⚡' },
            { id: 'CFP', label: 'CFP Trackers 📝' },
          ].map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* DESKTOP STREAM & FILTERS BUTTON TABS (Collapsible Right-Slide Bars) */}
      <div className="hidden md:flex flex-wrap items-center gap-3 font-mono my-2 overflow-hidden">
        {/* STREAMS TAB BUTTON */}
        <div className="flex items-center gap-2 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsStreamsOpen(!isStreamsOpen)}
            className={`px-2.5 py-1.5 font-black text-xs uppercase border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isStreamsOpen
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-[2px_2px_0px_0px_#ffffff]'
                : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 shadow-xs'
            }`}
            title={isStreamsOpen ? "Collapse stream categories" : "Expand stream categories"}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isStreamsOpen ? 'rotate-90 md:rotate-0' : ''}`} />
          </button>

          <AnimatePresence>
            {isStreamsOpen && (
              <motion.div
                ref={streamsSliderRef}
                onMouseDown={handleStreamsMouseDown}
                onMouseLeave={handleStreamsMouseLeave}
                onMouseUp={handleStreamsMouseUp}
                onMouseMove={handleStreamsMouseMove}
                onWheel={handleStreamsWheel}
                initial={{ opacity: 0, x: -30, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -30, width: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-x-auto scrollbar-none flex items-center gap-1.5 p-1 bg-white border-2 border-emerald-400/80 shadow-md rounded-xs shrink-0 whitespace-nowrap cursor-grab active:cursor-grabbing max-w-[calc(100vw-350px)]"
              >
                {[
                  { id: 'All', label: 'All', icon: '🌐' },
                  { id: 'Hackathon', label: 'Hackathons', icon: '🏆' },
                  { id: 'Quiz', label: 'Quizzes', icon: '⚔️' },
                  { id: 'College Fest', label: 'College Fests', icon: '🚀' },
                  { id: 'Scholarship', label: 'Scholarships', icon: '🎓' },
                  { id: 'Workshop', label: 'Workshops', icon: '🛠️' },
                  { id: 'Conference', label: 'Conferences', icon: '🎙️' },
                  { id: 'Hiring Challenge', label: 'Hiring', icon: '💼' },
                  { id: 'Bootcamp', label: 'Bootcamps', icon: '⚡' },
                  { id: 'CFP', label: 'CFP', icon: '📝' },
                ].map(cat => {
                  const isSelected = categoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-2 py-1 text-[9.5px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 rounded-xs shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-extrabold shadow-xs'
                          : 'bg-white text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950 border border-emerald-200/70'
                      }`}
                    >
                      <span className="text-[10px]">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FILTERS TAB BUTTON */}
        <div className="flex items-center gap-2 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`px-2.5 py-1.5 font-black text-xs uppercase border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isFiltersOpen
                ? 'bg-red-500 text-white border-red-400 font-extrabold shadow-[2px_2px_0px_0px_#ffffff]'
                : 'bg-white text-red-600 border-red-300 hover:bg-red-50 shadow-xs'
            }`}
            title={isFiltersOpen ? "Collapse filter options" : "Expand filter options"}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isFiltersOpen ? 'rotate-90 md:rotate-0' : ''}`} />
          </button>

          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, x: -30, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -30, width: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-x-auto scrollbar-none flex items-center gap-2 p-1.5 bg-white border-2 border-red-400/80 shadow-md rounded-xs shrink-0 whitespace-nowrap"
              >
                {/* Region selector */}
                <div className="flex items-center gap-1 border px-2 py-1 bg-gray-50 border-gray-200 text-slate-800 text-xs">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">REGION:</span>
                  <select 
                    value={regionFilter} 
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 text-slate-900 *:bg-white *:text-slate-800"
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
                <div className="flex items-center gap-1 border px-2 py-1 bg-gray-50 border-gray-200 text-slate-800 text-xs">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">DOMAINS:</span>
                  <select 
                    value={domainFilter} 
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 text-slate-900 *:bg-white *:text-slate-800 max-w-[160px] truncate"
                  >
                    {ALL_DOMAINS.map(domain => (
                      <option key={domain} value={domain}>{domain === 'All' ? 'All Domains' : domain}</option>
                    ))}
                  </select>
                </div>

                {/* Status selector */}
                <div className="flex items-center gap-1 border px-2 py-1 bg-gray-50 border-gray-200 text-slate-800 text-xs">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">STATUS:</span>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent font-bold text-xs uppercase outline-none cursor-pointer pr-1 text-slate-900 *:bg-white *:text-slate-800"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. MAIN LAYOUT: DESKTOP SPLIT VIEW vs MOBILE SINGLE VIEW */}
      
      {/* DESKTOP VIEW (lg: grid split view) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-5 items-stretch">
        {/* Left list: Master list of matches */}
        <div className="lg:col-span-5 flex flex-col gap-2 max-h-[650px] overflow-y-auto pr-1">
          {filteredItems.map((item) => {
            const isSelected = selectedItemId ? selectedItemId === item.id : selectedItemDesktop?.id === item.id;
            const isNew = item.isNewAddition || item.autoIngested;

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItemId(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItemId(item.id);
                  }
                }}
                style={{
                  borderColor: isSelected ? '#10b981' : (isNew ? '#f59e0b' : (isLight ? '#cbd5e1' : '#121c38')),
                  boxShadow: isSelected ? '3px 3px 0px 0px #10b981' : (isNew ? '3px 3px 0px 0px #f59e0b' : 'none')
                }}
                className={`w-full p-4 text-left border-2 transition-all relative rounded-none flex flex-col gap-2 font-mono text-xs cursor-pointer ${
                  isSelected 
                    ? (isLight ? 'bg-slate-100 text-slate-900 border-emerald-500' : 'bg-[#0f2c20]/40 text-white border-emerald-500') 
                    : isNew
                      ? (isLight ? 'bg-[#fffbeb] text-slate-850' : 'bg-[#261d09]/70 text-gray-200')
                      : (isLight ? 'bg-white hover:bg-slate-50 text-slate-700' : 'bg-[#090f1e] hover:bg-[#0c162b] text-gray-400')
                }`}
              >
                <div className="flex justify-between items-start gap-2 w-full">
                  <span className="text-[10px] text-gray-500 uppercase font-sans font-bold block truncate">
                    {item.organizer}
                  </span>
                  
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    {isNew && (
                      <span className="px-1.5 py-0.5 text-[8px] border border-amber-400 bg-amber-400/20 text-amber-300 font-bold rounded-none uppercase animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block animate-ping" />
                        NEW
                      </span>
                    )}
                    
                    <span className={`px-1.5 py-0.5 text-[8.2px] border font-bold uppercase rounded-none font-mono ${getCategoryStyle(getCategory(item))}`}>
                      {getCategory(item)}
                    </span>

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
                  </div>
                </div>

                <h3 className={`font-sans font-bold text-sm block tracking-tight leading-snug uppercase ${
                  isSelected ? 'text-emerald-400 font-extrabold' : (isLight ? 'text-slate-800' : 'text-slate-200')
                }`}>
                  {item.title}
                </h3>

                <div className={`flex items-center justify-between text-[11px] pt-1 border-t mt-1 select-none w-full gap-2 ${isLight ? 'border-gray-200' : 'border-[#121c38]/50'}`}>
                  <span className="text-gray-500 flex items-center gap-1 min-w-0 flex-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate" title={`${item.region} • ${item.location}`}>{item.region} • {item.location}</span>
                  </span>
                  
                  <span className={`${item.daysLeft <= 0 ? 'text-gray-500' : 'text-amber-400'} font-semibold flex items-center gap-1 font-mono shrink-0`}>
                    <Calendar className="w-3" />
                    {getCountdownString(item.id, item.daysLeft)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
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
            <div className="border-2 border-dashed border-amber-500/30 bg-amber-950/10 p-8 text-center text-amber-400 font-mono text-xs my-2">
              <p className="font-bold uppercase mb-2">No hackathons or events matched "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 bg-amber-500/10 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold uppercase transition cursor-pointer"
              >
                Clear Search Query
              </button>
            </div>
          )}
        </div>

        {/* Right panel: Detail breakdown */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedItemDesktop ? (
              renderDetailCard(selectedItemDesktop, false)
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed border-slate-800 p-8 text-center text-gray-500 font-mono text-xs">
                Select an item from the left registry panel to view full specifications.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE VIEW (lg:hidden single detail card view or primary list view) */}
      <div className="block lg:hidden">
        {selectedItemMobile ? (
          /* Dedicated Mobile Detail Card View */
          renderDetailCard(selectedItemMobile, true)
        ) : (
          /* Primary Mobile Listings View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.slice(0, showAllHackathons ? undefined : 4).map((item) => {
              const isNew = item.isNewAddition || item.autoIngested;
              
              return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItemId(item.id)}
                className={`w-full p-4 text-left border-2 transition-all relative rounded-none flex flex-col justify-between gap-3 font-mono text-xs cursor-pointer group ${
                  isNew
                    ? (isLight ? 'bg-[#fffbeb] text-slate-850' : 'bg-[#261d09]/70 text-gray-200')
                    : (isLight ? 'bg-white hover:bg-slate-50 text-slate-700 hover:border-emerald-500/60' : 'bg-[#090f1e] hover:bg-[#0c162b] text-gray-400 hover:border-emerald-500/60')
                }`}
                style={{
                  borderColor: isNew ? '#f59e0b' : (isLight ? '#cbd5e1' : '#121c38'),
                  boxShadow: isNew ? '3px 3px 0px 0px #f59e0b' : 'none'
                }}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2 w-full">
                    <span className="text-[10px] text-gray-400 uppercase font-sans font-bold block truncate">
                      {item.organizer}
                    </span>
                    
                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                      {isNew && (
                        <span className="px-1.5 py-0.5 text-[8px] border border-amber-400 bg-amber-400/20 text-amber-300 font-bold rounded-none uppercase animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block animate-ping" />
                          NEW
                        </span>
                      )}
                      
                      <span className={`px-1.5 py-0.5 text-[8.2px] border font-bold uppercase rounded-none font-mono ${getCategoryStyle(getCategory(item))}`}>
                        {getCategory(item)}
                      </span>

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
                    </div>
                  </div>

                  <h3 className={`font-sans font-bold text-sm block tracking-tight leading-snug uppercase group-hover:text-emerald-400 transition-colors ${
                    isLight ? 'text-slate-850' : 'text-slate-100'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-[11px] font-sans line-clamp-2 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-gray-500/20">
                  <div className="flex items-center justify-between text-[11px] select-none w-full gap-2">
                    <span className="text-gray-400 flex items-center gap-1 min-w-0 flex-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate" title={`${item.region} • ${item.location}`}>{item.region} • {item.location}</span>
                    </span>
                    
                    <span className={`${item.daysLeft <= 0 ? 'text-gray-500' : 'text-amber-400'} font-semibold flex items-center gap-1 font-mono shrink-0`}>
                      <Calendar className="w-3" />
                      {getCountdownString(item.id, item.daysLeft)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.themes.map(t => (
                      <span key={t} className="text-[8.5px] bg-white text-black border border-gray-300 font-bold uppercase px-1.5 py-0.5">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(item.id);
                    }}
                    className={`w-full py-1.5 px-3 border text-center text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                      isLight 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-500 hover:text-black hover:border-emerald-500' 
                        : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:border-emerald-500'
                    }`}
                  >
                    <span>View Event Specs & Apply</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>
            );
          })}

            {filteredItems.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-red-500/20 bg-red-950/10 p-10 text-center text-red-400 font-mono text-xs">
                ⚠️ No entry matched the active search filters and keywords.
              </div>
            )}

            {filteredItems.length > 4 && (
              <div className="col-span-full mt-2 flex justify-center">
                <button
                  onClick={() => setShowAllHackathons(!showAllHackathons)}
                  className="w-full py-2.5 bg-slate-950 hover:bg-[#121c38] border border-[#1e2e54] hover:border-[#10b981] text-[#10b981] font-mono text-xs font-bold uppercase transition focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{showAllHackathons ? '▲ Show Fewer Hackathons' : `▼ Show All Hackathons (${filteredItems.length})`}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
