import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowLeft, 
  Briefcase, 
  HelpCircle, 
  BookOpen, 
  Users, 
  Building2, 
  Award, 
  ChevronRight, 
  Compass, 
  Scale, 
  Bookmark,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_ROLES_DATA } from '../data/rolesData';
import { interviewQDatabase } from '../data/interviewQDatabase';
import { CERTIFICATIONS_LIBRARY, SKILLS_LIBRARY, TOOLS_LIBRARY } from '../data/librariesData';
import { TOP_50_COMPANIES } from '../data/topCompaniesData';
import { RAW_DIRECTORY_DATABASE } from './HRContacts';

export interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onNavigateTab: (tabId: string, params?: any) => void;
  onSelectRole: (roleId: string) => void;
  onFullSearchSubmit: (query: string) => void;
  theme: 'light' | 'dark';
}

const QUICK_CATEGORIES = [
  { id: 'map', label: 'Career Domains', icon: Briefcase, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'interviewq', label: 'InterviewQ', icon: HelpCircle, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'libraries', label: 'Resources', icon: BookOpen, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  { id: 'pathfinder', label: 'Path Planner', icon: Compass, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'comparison', label: 'Comparator', icon: Scale, color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' },
  { id: 'jobs', label: 'Jobs & Referrals', icon: Building2, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { id: 'hr-contacts', label: 'HR Contacts', icon: Users, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
  { id: 'saved', label: 'Bookmarks', icon: Bookmark, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
];

export const MobileSearchOverlay: React.FC<MobileSearchOverlayProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onNavigateTab,
  onSelectRole,
  onFullSearchSubmit,
  theme
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialQuery]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const cleanQuery = query.trim().toLowerCase();
  const searchTerms = useMemo(() => {
    return cleanQuery ? cleanQuery.split(/\s+/).filter(Boolean) : [];
  }, [cleanQuery]);

  const matchesTerm = (text: string | undefined): boolean => {
    if (!text || searchTerms.length === 0) return false;
    const lower = text.toLowerCase();
    return searchTerms.some(term => lower.includes(term));
  };

  // Grouped search results
  const allRolesList = useMemo(() => Object.values(ALL_ROLES_DATA), []);

  const matchedRoles = useMemo(() => {
    if (!cleanQuery) return [];
    return allRolesList
      .filter(r => matchesTerm(r.title) || matchesTerm(r.domain) || matchesTerm(r.level))
      .slice(0, 4);
  }, [cleanQuery, allRolesList]);

  const matchedInterviewQ = useMemo(() => {
    if (!cleanQuery) return [];
    return interviewQDatabase
      .filter(q => matchesTerm(q.prompt) || matchesTerm(q.domain) || matchesTerm(q.difficulty) || matchesTerm(q.role_slug))
      .slice(0, 4);
  }, [cleanQuery]);

  const matchedResources = useMemo(() => {
    if (!cleanQuery) return [];
    const results: Array<{ id: string; name: string; type: string; category: string }> = [];

    CERTIFICATIONS_LIBRARY.forEach(c => {
      if (matchesTerm(c.name) || matchesTerm(c.provider) || matchesTerm(c.description)) {
        results.push({ id: c.id, name: c.name, type: 'Certification', category: c.provider });
      }
    });

    TOOLS_LIBRARY.forEach(t => {
      if (matchesTerm(t.name) || matchesTerm(t.category)) {
        results.push({ id: t.name, name: t.name, type: 'Tool', category: t.category });
      }
    });

    SKILLS_LIBRARY.forEach(s => {
      if (matchesTerm(s.name) || matchesTerm(s.category)) {
        results.push({ id: s.name, name: s.name, type: 'Skill', category: s.category });
      }
    });

    return results.slice(0, 4);
  }, [cleanQuery]);

  const matchedCompanies = useMemo(() => {
    if (!cleanQuery) return [];
    return TOP_50_COMPANIES
      .filter(c => matchesTerm(c.name) || matchesTerm(c.category))
      .slice(0, 3);
  }, [cleanQuery]);

  const matchedHR = useMemo(() => {
    if (!cleanQuery) return [];
    const results: Array<{ name: string; city: string; country: string }> = [];
    for (const [countryCode, cities] of Object.entries(RAW_DIRECTORY_DATABASE)) {
      for (const [city, contacts] of Object.entries(cities)) {
        for (const c of contacts) {
          if (matchesTerm(c.companyName) || matchesTerm(c.category) || matchesTerm(city)) {
            results.push({
              name: c.companyName,
              city,
              country: countryCode === 'IN' ? 'India' : countryCode === 'US' ? 'USA' : 'Philippines'
            });
            if (results.length >= 3) break;
          }
        }
        if (results.length >= 3) break;
      }
      if (results.length >= 3) break;
    }
    return results;
  }, [cleanQuery]);

  const totalResults = matchedRoles.length + matchedInterviewQ.length + matchedResources.length + matchedCompanies.length + matchedHR.length;

  const handleExecuteSearch = () => {
    if (!cleanQuery) return;
    onFullSearchSubmit(cleanQuery);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[190] md:hidden" role="dialog" aria-modal="true" aria-label="Global Search">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Search Sheet Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed inset-x-0 top-0 max-h-[92vh] flex flex-col z-[200] font-mono shadow-2xl rounded-b-2xl border-b overflow-hidden ${
              theme === 'light'
                ? 'bg-white text-slate-900 border-slate-300'
                : 'bg-[#070b13] text-slate-100 border-[#121c38]'
            }`}
          >
            {/* Top Search Input Row */}
            <div className={`p-3 border-b flex items-center gap-2 shrink-0 ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#090e1a] border-[#121c38]'
            }`}>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search overlay"
                className={`w-11 h-11 flex items-center justify-center rounded-md shrink-0 cursor-pointer ${
                  theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative flex-1">
                <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleExecuteSearch();
                    }
                  }}
                  placeholder="Search all sections..."
                  className={`w-full pl-9 pr-9 py-2.5 text-xs font-sans rounded-md border focus:outline-none transition-all ${
                    theme === 'light'
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                      : 'bg-[#111827] border-slate-700/80 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                  }`}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleExecuteSearch}
                disabled={!cleanQuery}
                className={`px-3 py-2 text-xs font-bold font-mono rounded-md shrink-0 transition-colors cursor-pointer ${
                  cleanQuery
                    ? 'bg-[#10b981] text-[#070b13] hover:bg-emerald-400 font-extrabold'
                    : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                }`}
              >
                Go
              </button>
            </div>

            {/* Search Results / Category Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar min-h-[220px]">
              {!cleanQuery ? (
                /* Quick Shortcuts when no query is typed */
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">
                    <span>Jump to Section</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            onNavigateTab(cat.id);
                            onClose();
                          }}
                          className={`p-2.5 rounded-md border flex items-center gap-2 text-left transition-all cursor-pointer ${
                            theme === 'light'
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                              : 'bg-[#0b1329] hover:bg-slate-800/80 border-[#1e2e54] text-slate-200'
                          }`}
                        >
                          <div className={`p-1.5 rounded ${cat.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[11px] font-bold truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : totalResults === 0 ? (
                /* No quick results */
                <div className="text-center py-8 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    No quick preview items for &quot;{query}&quot;
                  </p>
                  <button
                    type="button"
                    onClick={handleExecuteSearch}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-black text-xs font-bold font-mono rounded cursor-pointer hover:bg-emerald-400"
                  >
                    <span>Search Full Knowledge Base</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Grouped live results */
                <div className="space-y-4">
                  {/* View All Button Banner */}
                  <button
                    type="button"
                    onClick={handleExecuteSearch}
                    className="w-full p-2.5 bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 rounded-md text-emerald-400 flex items-center justify-between text-xs font-bold font-mono transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      View all results for &quot;{query}&quot;
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {/* 1. Career Domains */}
                  {matchedRoles.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 px-1">
                        <Briefcase className="w-3 h-3" />
                        <span>Career Domains ({matchedRoles.length})</span>
                      </div>
                      <div className="space-y-1">
                        {matchedRoles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => {
                              onSelectRole(role.id);
                              onClose();
                            }}
                            className={`p-2 rounded-md border flex items-center justify-between transition cursor-pointer ${
                              theme === 'light'
                                ? 'bg-slate-50 hover:bg-amber-50 border-slate-200'
                                : 'bg-[#0b1329] hover:bg-slate-800/80 border-[#1e2e54]'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="text-xs font-bold text-white truncate font-sans">{role.title}</div>
                              <div className="text-[9.5px] text-amber-400/90 truncate font-mono">{role.domain} • {role.level}</div>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">Open Role →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. InterviewQ */}
                  {matchedInterviewQ.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1 px-1">
                        <HelpCircle className="w-3 h-3" />
                        <span>InterviewQ ({matchedInterviewQ.length})</span>
                      </div>
                      <div className="space-y-1">
                        {matchedInterviewQ.map((q) => (
                          <div
                            key={q.id}
                            onClick={() => {
                              onNavigateTab('interviewq', { query: q.prompt });
                              onClose();
                            }}
                            className={`p-2 rounded-md border flex items-center justify-between transition cursor-pointer ${
                              theme === 'light'
                                ? 'bg-slate-50 hover:bg-purple-50 border-slate-200'
                                : 'bg-[#0b1329] hover:bg-slate-800/80 border-[#1e2e54]'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="text-xs font-bold text-white line-clamp-1 font-sans">{q.prompt}</div>
                              <div className="text-[9.5px] text-purple-400/90 truncate font-mono">{q.domain} • {q.difficulty}</div>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">View Q →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Resources */}
                  {matchedResources.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1 px-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Resources ({matchedResources.length})</span>
                      </div>
                      <div className="space-y-1">
                        {matchedResources.map((res, i) => (
                          <div
                            key={`${res.id}-${i}`}
                            onClick={() => {
                              onNavigateTab('libraries', { 
                                tab: res.type === 'Certification' ? 'certs' : 'tools-skills', 
                                query: res.name 
                              });
                              onClose();
                            }}
                            className={`p-2 rounded-md border flex items-center justify-between transition cursor-pointer ${
                              theme === 'light'
                                ? 'bg-slate-50 hover:bg-cyan-50 border-slate-200'
                                : 'bg-[#0b1329] hover:bg-slate-800/80 border-[#1e2e54]'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="text-xs font-bold text-white truncate font-sans">{res.name}</div>
                              <div className="text-[9.5px] text-cyan-400/90 truncate font-mono">{res.type} • {res.category}</div>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">Explore →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Jobs & Referrals */}
                  {matchedCompanies.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1 px-1">
                        <Building2 className="w-3 h-3" />
                        <span>Jobs &amp; Companies ({matchedCompanies.length})</span>
                      </div>
                      <div className="space-y-1">
                        {matchedCompanies.map((c) => (
                          <div
                            key={c.name}
                            onClick={() => {
                              onNavigateTab('jobs', { companyQuery: c.name });
                              onClose();
                            }}
                            className={`p-2 rounded-md border flex items-center justify-between transition cursor-pointer ${
                              theme === 'light'
                                ? 'bg-slate-50 hover:bg-blue-50 border-slate-200'
                                : 'bg-[#0b1329] hover:bg-slate-800/80 border-[#1e2e54]'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="text-xs font-bold text-white truncate font-sans">{c.name}</div>
                              <div className="text-[9.5px] text-blue-400/90 truncate font-mono">{c.category}</div>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">View Jobs →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. HR Contacts */}
                  {matchedHR.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1 px-1">
                        <Users className="w-3 h-3" />
                        <span>HR Contacts ({matchedHR.length})</span>
                      </div>
                      <div className="space-y-1">
                        {matchedHR.map((hr, idx) => (
                          <div
                            key={`${hr.name}-${idx}`}
                            onClick={() => {
                              onNavigateTab('hr-contacts', { query: hr.name });
                              onClose();
                            }}
                            className={`p-2 rounded-md border flex items-center justify-between transition cursor-pointer ${
                              theme === 'light'
                                ? 'bg-slate-50 hover:bg-teal-50 border-slate-200'
                                : 'bg-[#0b1329] hover:bg-slate-800/80 border-[#1e2e54]'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="text-xs font-bold text-white truncate font-sans">{hr.name}</div>
                              <div className="text-[9.5px] text-teal-400/90 truncate font-mono">{hr.city} • {hr.country}</div>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">View Directory →</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
