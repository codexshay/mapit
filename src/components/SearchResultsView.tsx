import React, { useMemo } from 'react';
import { 
  Search, 
  Briefcase, 
  HelpCircle, 
  Building2, 
  Users, 
  BookOpen, 
  ExternalLink, 
  ArrowRight,
  Phone,
  Wrench,
  Award,
  Youtube,
  Trophy,
  Layers,
  Sparkles
} from 'lucide-react';
import { ALL_ROLES_DATA, RoleDetail } from '../data/rolesData';
import { interviewQDatabase, InterviewQItem } from '../data/interviewQDatabase';
import { TOP_50_COMPANIES, CompanyInfo, getLinkedInSearchUrl } from '../data/topCompaniesData';
import { RAW_DIRECTORY_DATABASE, HRContact } from './HRContacts';
import { CERTIFICATIONS_LIBRARY, SKILLS_LIBRARY, TOOLS_LIBRARY, CertLibraryItem, SkillLibraryItem, ToolLibraryItem } from '../data/librariesData';
import { CHANNELS_POOL, YouTubeChannel } from '../data/youtubeDatabase';
import { GLOBAL_HACKATHONS, Hackathon } from './Hackathons';
import { getOfferedStudyPortals } from '../utils/studyPortalLookup';
import { expandQueryViaKnowledgeGraph, calculateItemRelevanceScore } from '../utils/knowledgeGraphEngine';

export interface SearchResultsViewProps {
  query: string;
  onNavigateTab: (tabId: string, params?: any) => void;
  onSelectRole: (roleId: string) => void;
  theme?: 'light' | 'dark';
  isLight?: boolean;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  onNavigateTab,
  onSelectRole,
  theme = 'light',
  isLight: isLightProp
}) => {
  const isLight = isLightProp !== undefined ? isLightProp : theme === 'light';
  const cleanQuery = (query || '').trim().toLowerCase();

  // Knowledge Graph Expanded Concept Vector
  const knowledgeGraph = useMemo(() => expandQueryViaKnowledgeGraph(cleanQuery), [cleanQuery]);
  const searchTerms = knowledgeGraph.queryTerms;

  const matchesTerm = (text: string | undefined): boolean => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return searchTerms.some(term => lower.includes(term) || term.includes(lower));
  };

  // Helper score wrapper
  const getScore = (title: string, category: string = '', desc: string = '') => 
    calculateItemRelevanceScore(title, category, desc, cleanQuery, knowledgeGraph);

  // 1. Matched Job Roles (Sorted by Relevance Score)
  const matchedRoles = useMemo(() => {
    if (!cleanQuery) return [];
    const filtered = Object.values(ALL_ROLES_DATA).filter((role: RoleDetail) => 
      matchesTerm(role.title) ||
      matchesTerm(role.domain) ||
      matchesTerm(role.id) ||
      (knowledgeGraph.associatedRoleSlugs.some(slug => role.id.toLowerCase().includes(slug) || slug.includes(role.id.toLowerCase()))) ||
      (role.roleAsk && matchesTerm(role.roleAsk.explanation)) ||
      (role.mustHaves && role.mustHaves.tech && role.mustHaves.tech.some(s => matchesTerm(s))) ||
      (role.toolsToLearn && role.toolsToLearn.some(t => matchesTerm(t)))
    );

    return filtered.sort((a, b) => {
      const scoreA = getScore(a.title, a.domain, a.roleAsk?.explanation || '');
      const scoreB = getScore(b.title, b.domain, b.roleAsk?.explanation || '');
      return scoreB - scoreA;
    }).slice(0, 12);
  }, [cleanQuery, searchTerms, knowledgeGraph]);

  // 2. Matched Interview Questions & Practical Labs (Sorted by Relevance Score)
  const matchedInterviewQ = useMemo(() => {
    if (!cleanQuery) return [];
    const filtered = interviewQDatabase.filter((q: InterviewQItem) => 
      matchesTerm(q.prompt) ||
      matchesTerm(q.preferred_answer) ||
      matchesTerm(q.domain) ||
      matchesTerm(q.id) ||
      matchesTerm(q.role_slug) ||
      (knowledgeGraph.associatedRoleSlugs.some(slug => q.role_slug.toLowerCase().includes(slug) || slug.includes(q.role_slug.toLowerCase()))) ||
      matchesTerm(q.resolution_title)
    );

    return filtered.sort((a, b) => {
      const scoreA = getScore(a.prompt, a.domain, a.preferred_answer);
      const scoreB = getScore(b.prompt, b.domain, b.preferred_answer);
      return scoreB - scoreA;
    }).slice(0, 18);
  }, [cleanQuery, searchTerms, knowledgeGraph]);

  // 3. Matched Tools Library (Sorted by Relevance Score)
  const matchedTools = useMemo(() => {
    if (!cleanQuery) return [];
    const filtered = TOOLS_LIBRARY.filter((tool: ToolLibraryItem) => 
      matchesTerm(tool.name) ||
      matchesTerm(tool.category) ||
      matchesTerm(tool.description) ||
      matchesTerm(tool.howToPractice) ||
      (knowledgeGraph.associatedTools.some(at => tool.name.toLowerCase().includes(at) || at.includes(tool.name.toLowerCase())))
    );

    return filtered.sort((a, b) => {
      const scoreA = getScore(a.name, a.category, a.description);
      const scoreB = getScore(b.name, b.category, b.description);
      return scoreB - scoreA;
    }).slice(0, 12);
  }, [cleanQuery, searchTerms, knowledgeGraph]);

  // 4. Matched Skills Library (Sorted by Relevance Score)
  const matchedSkills = useMemo(() => {
    if (!cleanQuery) return [];
    const filtered = SKILLS_LIBRARY.filter((skill: SkillLibraryItem) => 
      matchesTerm(skill.name) ||
      matchesTerm(skill.category) ||
      matchesTerm(skill.description) ||
      (skill.associatedTools && skill.associatedTools.some(t => matchesTerm(t))) ||
      (knowledgeGraph.associatedTools.some(at => skill.name.toLowerCase().includes(at) || at.includes(skill.name.toLowerCase())))
    );

    return filtered.sort((a, b) => {
      const scoreA = getScore(a.name, a.category, a.description);
      const scoreB = getScore(b.name, b.category, b.description);
      return scoreB - scoreA;
    }).slice(0, 12);
  }, [cleanQuery, searchTerms, knowledgeGraph]);

  // 5. Matched Certifications Library (Sorted by Relevance Score)
  const matchedCertifications = useMemo(() => {
    if (!cleanQuery) return [];
    const filtered = CERTIFICATIONS_LIBRARY.filter((item: CertLibraryItem) => 
      matchesTerm(item.name) ||
      matchesTerm(item.provider) ||
      matchesTerm(item.description) ||
      (item.relatedRoles && item.relatedRoles.some(r => matchesTerm(r)))
    );

    return filtered.sort((a, b) => {
      const scoreA = getScore(a.name, a.provider, a.description);
      const scoreB = getScore(b.name, b.provider, b.description);
      return scoreB - scoreA;
    }).slice(0, 12);
  }, [cleanQuery, searchTerms, knowledgeGraph]);

  // 6. Matched IT Companies (Sorted by Relevance Score)
  const matchedCompanies = useMemo(() => {
    if (!cleanQuery) return [];
    const filtered = TOP_50_COMPANIES.filter((comp: CompanyInfo) => 
      matchesTerm(comp.name) ||
      matchesTerm(comp.category)
    );

    return filtered.sort((a, b) => {
      const scoreA = getScore(a.name, a.category, '');
      const scoreB = getScore(b.name, b.category, '');
      return scoreB - scoreA;
    }).slice(0, 12);
  }, [cleanQuery, searchTerms, knowledgeGraph]);

  // 7. Matched HR Contacts Directory
  const matchedHRContacts = useMemo(() => {
    if (!cleanQuery) return [];
    const results: Array<{ country: string; city: string; contact: HRContact }> = [];
    
    for (const [countryCode, cities] of Object.entries(RAW_DIRECTORY_DATABASE)) {
      for (const [cityName, contacts] of Object.entries(cities)) {
        for (const c of contacts) {
          if (
            matchesTerm(c.companyName) ||
            matchesTerm(c.category) ||
            matchesTerm(cityName)
          ) {
            results.push({
              country: countryCode === 'IN' ? 'India 🇮🇳' : countryCode === 'US' ? 'United States 🇺🇸' : 'Philippines 🇵🇭',
              city: cityName,
              contact: c
            });
            if (results.length >= 12) break;
          }
        }
        if (results.length >= 12) break;
      }
      if (results.length >= 12) break;
    }
    return results;
  }, [cleanQuery, searchTerms]);

  // 8. Matched YouTube Tech Educators
  const matchedYouTubeChannels = useMemo(() => {
    if (!cleanQuery) return [];
    return CHANNELS_POOL.filter((ch: YouTubeChannel) => 
      matchesTerm(ch.name) ||
      matchesTerm(ch.domain) ||
      matchesTerm(ch.bestFor)
    ).slice(0, 12);
  }, [cleanQuery, searchTerms]);

  // 9. Matched Global Hackathons & Events
  const matchedHackathons = useMemo(() => {
    if (!cleanQuery) return [];
    return GLOBAL_HACKATHONS.filter((h: Hackathon) => 
      matchesTerm(h.title) ||
      matchesTerm(h.organizer) ||
      matchesTerm(h.description) ||
      matchesTerm(h.category) ||
      (h.themes && h.themes.some(t => matchesTerm(t)))
    ).slice(0, 8);
  }, [cleanQuery, searchTerms]);

  const totalResultsCount = 
    matchedRoles.length + 
    matchedInterviewQ.length + 
    matchedTools.length + 
    matchedSkills.length + 
    matchedCertifications.length + 
    matchedCompanies.length + 
    matchedHRContacts.length + 
    matchedYouTubeChannels.length + 
    matchedHackathons.length;

  if (!cleanQuery) {
    return (
      <div className={`min-h-screen p-6 md:p-12 font-mono flex flex-col items-center justify-center text-center ${
        isLight ? 'bg-white text-slate-900' : 'bg-[#03060c] text-zinc-100'
      }`}>
        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 ${
          isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-zinc-900 border-zinc-700 text-zinc-400'
        }`}>
          <Search className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className={`text-2xl font-black uppercase mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Global Search Console
        </h2>
        <p className={`text-sm max-w-md font-sans mb-6 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
          Type any tool (SCCM, Active Directory, Intune, Terraform), role, company, certification, question, or HR directory into the search bar above to query all sections simultaneously.
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 font-mono transition-colors duration-300 ${
      isLight ? 'bg-white text-slate-900' : 'bg-[#03060c] text-zinc-100'
    }`}>
      {/* Search Header Banner */}
      <header className={`max-w-7xl mx-auto mb-8 border-2 p-6 md:p-8 shadow-md rounded-sm ${
        isLight ? 'border-slate-200 bg-slate-50 text-slate-900' : 'border-zinc-800 bg-zinc-950 text-white'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 pb-6 mb-6 border-slate-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className={`text-2xl md:text-4xl font-black tracking-tight flex items-center gap-2 uppercase ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <Search className={`w-8 h-8 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                Global Search Results
              </h1>
              <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-xs ${
                isLight ? 'bg-emerald-600 text-white' : 'bg-white text-black'
              }`}>
                {totalResultsCount} RESULTS FOUND
              </span>
            </div>
            <p className={`text-sm md:text-base font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Displaying indexed search matches for <span className={`font-bold font-mono ${isLight ? 'text-emerald-700' : 'text-white'}`}>"{cleanQuery}"</span> across all MapIT databases with direct navigation links.
            </p>
          </div>

          <div className={`text-xs font-mono px-4 py-3 border rounded-xs shrink-0 ${
            isLight ? 'bg-white border-slate-300 text-slate-700' : 'bg-zinc-900 border-zinc-700 text-zinc-400'
          }`}>
            <span className={`font-bold block uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>FULL INDEX COVERAGE</span>
            <span className="text-[10px] text-slate-600 dark:text-zinc-400">Roles • InterviewQs • Tools &amp; Skills • Certs • Companies • HR • YouTube • Hackathons</span>
          </div>
        </div>

        {/* Category Breakdown Pills - Clickable Navigation Buttons */}
        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
          <button
            onClick={() => {
              const el = document.getElementById('search-sec-roles');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('map');
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedRoles.length > 0 
                ? (isLight ? 'bg-emerald-50 border-emerald-400 text-emerald-900 hover:bg-emerald-100 font-bold' : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>💼 Roles</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedRoles.length > 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedRoles.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-interviewq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('interviewq');
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedInterviewQ.length > 0 
                ? (isLight ? 'bg-indigo-50 border-indigo-400 text-indigo-900 hover:bg-indigo-100 font-bold' : 'bg-indigo-950/60 border-indigo-500/60 text-indigo-300 hover:bg-indigo-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>⚡ InterviewQ</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedInterviewQ.length > 0 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedInterviewQ.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-tools');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('libraries', { tab: 'tools-skills' });
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              (matchedTools.length + matchedSkills.length) > 0 
                ? (isLight ? 'bg-sky-50 border-sky-400 text-sky-900 hover:bg-sky-100 font-bold' : 'bg-sky-950/60 border-sky-500/60 text-sky-300 hover:bg-sky-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>🛠️ Tools &amp; Skills</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${(matchedTools.length + matchedSkills.length) > 0 ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedTools.length + matchedSkills.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-certs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('libraries', { tab: 'certs' });
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedCertifications.length > 0 
                ? (isLight ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 font-bold' : 'bg-amber-950/60 border-amber-500/60 text-amber-300 hover:bg-amber-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>📜 Certifications</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedCertifications.length > 0 ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedCertifications.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-companies');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('jobs');
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedCompanies.length > 0 
                ? (isLight ? 'bg-sky-50 border-sky-400 text-sky-900 hover:bg-sky-100 font-bold' : 'bg-sky-950/60 border-sky-500/60 text-sky-300 hover:bg-sky-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>🏢 Companies</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedCompanies.length > 0 ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedCompanies.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-hr');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('hr');
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedHRContacts.length > 0 
                ? (isLight ? 'bg-indigo-50 border-indigo-400 text-indigo-900 hover:bg-indigo-100 font-bold' : 'bg-indigo-950/60 border-indigo-500/60 text-indigo-300 hover:bg-indigo-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>👥 HR Directory</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedHRContacts.length > 0 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedHRContacts.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-youtube');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('libraries', { tab: 'youtubeTeachers' });
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedYouTubeChannels.length > 0 
                ? (isLight ? 'bg-red-50 border-red-400 text-red-900 hover:bg-red-100 font-bold' : 'bg-red-950/60 border-red-500/60 text-red-300 hover:bg-red-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>📺 YouTube</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedYouTubeChannels.length > 0 ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedYouTubeChannels.length}
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('search-sec-hackathons');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onNavigateTab('hackathons');
            }}
            className={`px-3 py-1.5 border rounded-xs transition cursor-pointer flex items-center gap-1.5 ${
              matchedHackathons.length > 0 
                ? (isLight ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 font-bold' : 'bg-amber-950/60 border-amber-500/60 text-amber-300 hover:bg-amber-900')
                : (isLight ? 'bg-white border-slate-300 text-slate-400' : 'bg-zinc-900 border-zinc-700 text-zinc-500')
            }`}
          >
            <span>🏆 Hackathons</span>
            <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${matchedHackathons.length > 0 ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-zinc-800 text-slate-500'}`}>
              {matchedHackathons.length}
            </span>
          </button>
        </div>
      </header>

      {/* Main Results Content Container */}
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Knowledge Graph Concept Cluster Banner */}
        {knowledgeGraph.matchedClusters.length > 0 && (
          <div className={`p-4 border-2 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
            isLight ? 'bg-indigo-50/90 border-indigo-300 text-indigo-900 shadow-xs' : 'bg-[#090e1e] border-indigo-500/50 text-indigo-200'
          }`}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold uppercase text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>MapIT Knowledge Graph Concept Resolved:</span>
                <span className="underline font-extrabold text-sm">{knowledgeGraph.matchedClusters[0].primaryTitle}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px] items-center">
                <span className="text-slate-500 font-bold uppercase">Associated Synonyms &amp; Roles:</span>
                {knowledgeGraph.matchedClusters[0].synonymRoles.slice(0, 7).map(r => (
                  <span key={r} className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase font-bold">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 1: MATCHED JOB ROLES */}
        {matchedRoles.length > 0 && (
          <section id="search-sec-roles" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Briefcase className="w-5 h-5 text-emerald-500" />
                Matched IT Job Roles ({matchedRoles.length})
              </h2>
              <button
                onClick={() => onNavigateTab('map')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 uppercase"
              >
                View Full IT Map <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedRoles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => onSelectRole(role.id)}
                  className={`p-5 border-2 transition cursor-pointer flex flex-col justify-between space-y-4 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900 hover:border-emerald-500 hover:shadow-md' 
                      : 'bg-zinc-950 border-zinc-800 text-white hover:border-emerald-500'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 uppercase">
                        {role.domain}
                      </span>
                    </div>
                    <h3 className="text-base font-black font-sans leading-snug">{role.title}</h3>
                    {role.roleAsk && (
                      <p className={`text-xs font-sans line-clamp-2 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                        {role.roleAsk.explanation}
                      </p>
                    )}
                    {/* Offered Study Portals for Role */}
                    {(() => {
                      const portals = getOfferedStudyPortals(role.title, role.domain);
                      return (
                        <div className="pt-2 border-t border-slate-100 dark:border-zinc-900 space-y-1">
                          <span className="text-[9px] font-mono font-bold uppercase text-slate-500 block">🎓 Verified Study Portals:</span>
                          <div className="flex flex-wrap gap-1">
                            {portals.map((p, pIdx) => (
                              <a
                                key={pIdx}
                                href={p.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`px-2 py-0.5 text-[9.5px] font-mono border rounded-xs transition flex items-center gap-1 font-bold ${
                                  isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900'
                                }`}
                              >
                                {p.portal} <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-900 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Explore Career Map</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: MATCHED TOOLS & SKILLS LIBRARY */}
        {(matchedTools.length > 0 || matchedSkills.length > 0) && (
          <section id="search-sec-tools" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Wrench className="w-5 h-5 text-sky-500" />
                Tools &amp; Skills Library ({matchedTools.length + matchedSkills.length})
              </h2>
              <button
                onClick={() => onNavigateTab('libraries')}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 uppercase"
              >
                View Resources Hub <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedTools.map((tool, idx) => (
                <div
                  key={`tool-${idx}`}
                  className={`p-5 border-2 space-y-3 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-sky-100 text-sky-800 uppercase">
                      {tool.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{tool.costModel}</span>
                  </div>
                  <h3 className="text-sm font-black font-mono text-sky-700 dark:text-sky-400">{tool.name}</h3>
                  <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {tool.description}
                  </p>
                  
                  {/* Offered Study Portals for Tool */}
                  {(() => {
                    const portals = getOfferedStudyPortals(tool.name, tool.category);
                    return (
                      <div className="pt-2 border-t border-slate-100 dark:border-zinc-900 space-y-1">
                        <span className="text-[9px] font-mono font-bold uppercase text-slate-500 block">🎓 Verified Study Portals:</span>
                        <div className="flex flex-wrap gap-1">
                          {portals.map((p, pIdx) => (
                            <a
                              key={pIdx}
                              href={p.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`px-2 py-0.5 text-[9.5px] font-mono border rounded-xs transition flex items-center gap-1 font-bold ${
                                isLight ? 'bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100' : 'bg-sky-950/40 text-sky-300 border-sky-800/50 hover:bg-sky-900'
                              }`}
                            >
                              {p.portal} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="pt-2">
                    <a
                      href={tool.freeResourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline"
                    >
                      Official Docs / Practice Link <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}

              {matchedSkills.map((skill, idx) => (
                <div
                  key={`skill-${idx}`}
                  className={`p-5 border-2 space-y-3 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-teal-100 text-teal-800 uppercase">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-black font-mono text-teal-700 dark:text-teal-400">{skill.name}</h3>
                  <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {skill.description}
                  </p>
                  {skill.associatedTools && (
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                      {skill.associatedTools.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Offered Study Portals for Skill */}
                  {(() => {
                    const portals = getOfferedStudyPortals(skill.name, skill.category);
                    return (
                      <div className="pt-2 border-t border-slate-100 dark:border-zinc-900 space-y-1">
                        <span className="text-[9px] font-mono font-bold uppercase text-slate-500 block">🎓 Verified Study Portals:</span>
                        <div className="flex flex-wrap gap-1">
                          {portals.map((p, pIdx) => (
                            <a
                              key={pIdx}
                              href={p.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`px-2 py-0.5 text-[9.5px] font-mono border rounded-xs transition flex items-center gap-1 font-bold ${
                                isLight ? 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100' : 'bg-teal-950/40 text-teal-300 border-teal-800/50 hover:bg-teal-900'
                              }`}
                            >
                              {p.portal} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: MATCHED INTERVIEW QUESTIONS & LABS */}
        {matchedInterviewQ.length > 0 && (
          <section id="search-sec-interviewq" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                Matched Technical InterviewQs &amp; Scenario Labs ({matchedInterviewQ.length})
              </h2>
              <button
                onClick={() => onNavigateTab('interviewq')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 uppercase"
              >
                View InterviewQ Bank <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedInterviewQ.map((q) => (
                <div
                  key={q.id}
                  className={`p-5 border-2 space-y-3 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 uppercase">
                      {q.domain}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{q.id}</span>
                  </div>
                  <h3 className="text-sm font-bold font-sans">{q.prompt}</h3>
                  <div className={`p-3 text-xs font-sans border-l-4 border-indigo-500 rounded-xs ${
                    isLight ? 'bg-slate-50 text-slate-700' : 'bg-zinc-900 text-zinc-300'
                  }`}>
                    <strong>Preferred Answer / Solution:</strong>
                    <p className="mt-1 line-clamp-3">{q.preferred_answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: MATCHED CERTIFICATIONS LIBRARY */}
        {matchedCertifications.length > 0 && (
          <section id="search-sec-certs" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Award className="w-5 h-5 text-amber-500" />
                Matched Industry Certifications ({matchedCertifications.length})
              </h2>
              <button
                onClick={() => onNavigateTab('libraries')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 uppercase"
              >
                View All Certifications <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-5 border-2 space-y-3 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-900 uppercase">
                      {cert.provider}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{cert.difficulty}</span>
                  </div>
                  <h3 className="text-sm font-black font-sans text-slate-900 dark:text-white">{cert.name}</h3>
                  <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {cert.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold">
                    <a href={cert.officialLink} target="_blank" rel="noreferrer" className="text-amber-600 hover:underline flex items-center gap-1">
                      Official Cert Page <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: MATCHED IT COMPANIES & REFERRALS */}
        {matchedCompanies.length > 0 && (
          <section id="search-sec-companies" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Building2 className="w-5 h-5 text-sky-600" />
                Matched IT Companies &amp; Referrals ({matchedCompanies.length})
              </h2>
              <button
                onClick={() => onNavigateTab('jobs')}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 uppercase"
              >
                View Jobs &amp; Referrals <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedCompanies.map((comp, idx) => (
                <div
                  key={`comp-${idx}`}
                  className={`p-4 border-2 flex items-center justify-between rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-sky-100 text-sky-800 uppercase">
                      {comp.category}
                    </span>
                    <h3 className="text-sm font-bold font-sans">{comp.name}</h3>
                  </div>
                  <a
                    href={getLinkedInSearchUrl(comp.name, cleanQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#0077b5] text-white font-mono text-xs font-bold uppercase rounded-xs hover:bg-[#005885] transition"
                  >
                    Jobs Link
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: MATCHED HR CONTACTS DIRECTORY */}
        {matchedHRContacts.length > 0 && (
          <section id="search-sec-hr" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Users className="w-5 h-5 text-indigo-600" />
                Matched HR Contacts Directory ({matchedHRContacts.length})
              </h2>
              <button
                onClick={() => onNavigateTab('hr')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 uppercase"
              >
                View HR Directory [BETA] <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedHRContacts.map((item, idx) => (
                <div
                  key={`hr-${idx}`}
                  className={`p-4 border-2 flex items-center justify-between rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-600">{item.country}</span>
                      <span className="text-xs text-slate-500">• {item.city}</span>
                    </div>
                    <h3 className="text-sm font-bold font-sans">{item.contact.companyName}</h3>
                    <span className="text-[10px] font-mono text-slate-500">{item.contact.category}</span>
                  </div>
                  {item.contact.phone && (
                    <a
                      href={`tel:${item.contact.phone}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white font-mono text-xs font-bold rounded-xs hover:bg-emerald-700 transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{item.contact.phone}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 7: MATCHED YOUTUBE TECH EDUCATORS */}
        {matchedYouTubeChannels.length > 0 && (
          <section id="search-sec-youtube" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Youtube className="w-5 h-5 text-red-600" />
                Matched YouTube Tech Educators ({matchedYouTubeChannels.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchedYouTubeChannels.map((ch, idx) => (
                <div
                  key={`yt-${idx}`}
                  className={`p-4 border-2 space-y-2 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-red-100 text-red-800 uppercase">
                      {ch.domain}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold font-sans flex items-center gap-1.5">
                    <Youtube className="w-4 h-4 text-red-600 fill-current" />
                    {ch.name}
                  </h3>
                  <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {ch.bestFor}
                  </p>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline pt-1"
                  >
                    Open YouTube Channel <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 8: MATCHED GLOBAL HACKATHONS & EVENTS */}
        {matchedHackathons.length > 0 && (
          <section id="search-sec-hackathons" className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-zinc-800">
              <h2 className={`text-xl font-black uppercase flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Trophy className="w-5 h-5 text-amber-500" />
                Matched Hackathons &amp; Events ({matchedHackathons.length})
              </h2>
              <button
                onClick={() => onNavigateTab('hackathons')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 uppercase"
              >
                View Hackathons Hub <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedHackathons.map((h) => (
                <div
                  key={h.id}
                  className={`p-4 border-2 space-y-2 rounded-sm shadow-xs ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-900' 
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-amber-100 text-amber-900 uppercase">
                      {h.category || 'Hackathon'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">{h.prizes}</span>
                  </div>
                  <h3 className="text-sm font-bold font-sans">{h.title}</h3>
                  <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {h.organizer} • {h.location}
                  </p>
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline pt-1"
                  >
                    Apply / Official Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default SearchResultsView;
