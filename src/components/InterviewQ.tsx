import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Layers, 
  Copy, 
  Check, 
  Bookmark, 
  ChevronRight, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Grid,
  RotateCcw
} from 'lucide-react';
import { interviewQDatabase, InterviewQItem } from '../data/interviewQDatabase';

export interface InterviewQProps {
  bookmarks?: Array<{ id: string; name: string; type: string; subtext?: string; url?: string }>;
  toggleBookmark?: (item: { id: string; name: string; type: any; subtext?: string; url?: string }) => void;
  isBookmarked?: (id: string, type: any) => boolean;
}

const ROLE_CATEGORY_METADATA: Record<string, { label: string; icon: string; description: string }> = {
  all: {
    label: 'All Role Categories',
    icon: '🌐',
    description: 'Comprehensive question bank across all IT engineering disciplines'
  },
  'devops-engineer': {
    label: 'DevOps & SRE',
    icon: '⚡',
    description: 'CI/CD, Kubernetes, Docker, Terraform, Ansible, Linux & Observability'
  },
  'backend-developer': {
    label: 'Backend Developer',
    icon: '⚙️',
    description: 'APIs, Databases, Microservices, Node.js, Python, Java, Go & System Design'
  },
  'frontend-developer': {
    label: 'Frontend Developer',
    icon: '🎨',
    description: 'React, State Management, DOM, Web Performance & Modern UI Architecture'
  },
  'cybersecurity-analyst': {
    label: 'Cybersecurity & DevSecOps',
    icon: '🛡️',
    description: 'Network Security, Threat Modelling, Secret Management & OWASP'
  },
  'prompt-engineer': {
    label: 'AI & Prompt Engineering',
    icon: '🤖',
    description: 'LLM Engineering, Model Deployment, MLOps & Data Pipelines'
  },
  'software-development-engineer': {
    label: 'Software Development & Engineering (SDE)',
    icon: '💻',
    description: 'SDE Foundations, OOD, Algorithms, Clean Code, Concurrency, System Design & Delivery'
  }
};

export const InterviewQ: React.FC<InterviewQProps> = ({
  toggleBookmark,
  isBookmarked
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [localBookmarkedIds, setLocalBookmarkedIds] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileTab, setMobileTab] = useState<'categories' | 'questions'>('categories');

  const itemsPerPage = 10;

  // 1. Available Role Categories
  const availableRoleSlugs = useMemo(() => {
    const roles = Array.from(new Set(interviewQDatabase.map(item => item.role_slug)));
    return ['all', ...roles.sort()];
  }, []);

  // 2. Cascading available Domains for active Role Category
  const availableDomains = useMemo(() => {
    const pool = selectedRole === 'all' 
      ? interviewQDatabase 
      : interviewQDatabase.filter(item => item.role_slug === selectedRole);
    const domains = Array.from(new Set(pool.map(item => item.domain)));
    return domains.sort();
  }, [selectedRole]);

  // 3. Available Question Types
  const availableTypes = useMemo(() => {
    const pool = interviewQDatabase.filter(item => {
      const matchRole = selectedRole === 'all' || item.role_slug === selectedRole;
      const matchDomain = selectedDomains.length === 0 || selectedDomains.includes(item.domain);
      return matchRole && matchDomain;
    });
    const types = Array.from(new Set(pool.map(item => item.question_type)));
    return types.sort();
  }, [selectedRole, selectedDomains]);

  // 4. Available Difficulties
  const availableDifficulties = useMemo(() => {
    const pool = interviewQDatabase.filter(item => {
      const matchRole = selectedRole === 'all' || item.role_slug === selectedRole;
      const matchDomain = selectedDomains.length === 0 || selectedDomains.includes(item.domain);
      const matchType = selectedType === 'all' || item.question_type === selectedType;
      return matchRole && matchDomain && matchType;
    });
    return Array.from(new Set(pool.map(item => item.difficulty)));
  }, [selectedRole, selectedDomains, selectedType]);

  // Role Category change handler (resets sub-domains)
  const handleRoleSelect = (roleSlug: string) => {
    setSelectedRole(roleSlug);
    setSelectedDomains([]);
    setSelectedType('all');
    setSelectedDifficulty('all');
    setCurrentPage(1);
    setMobileTab('questions');
  };

  // Toggle multi-select sub-domains
  const toggleDomainSelect = (domain: string) => {
    if (domain === 'all') {
      setSelectedDomains([]);
    } else {
      setSelectedDomains(prev => {
        const exists = prev.includes(domain);
        if (exists) {
          return prev.filter(d => d !== domain);
        } else {
          return [...prev, domain];
        }
      });
    }
    setCurrentPage(1);
  };

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return interviewQDatabase.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q === '' || 
        item.prompt.toLowerCase().includes(q) ||
        item.preferred_answer.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.domain.toLowerCase().includes(q);
      
      const matchesRole = selectedRole === 'all' || item.role_slug === selectedRole;
      const matchesDomain = selectedDomains.length === 0 || selectedDomains.includes(item.domain);
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      const matchesType = selectedType === 'all' || item.question_type === selectedType;

      return matchesSearch && matchesRole && matchesDomain && matchesDifficulty && matchesType;
    });
  }, [searchQuery, selectedRole, selectedDomains, selectedDifficulty, selectedType]);

  // Paginated Questions
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(start, start + itemsPerPage);
  }, [filteredQuestions, currentPage]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookmarkToggle = (item: InterviewQItem) => {
    if (toggleBookmark) {
      toggleBookmark({
        id: item.id,
        name: `[${item.id}] ${item.prompt}`,
        type: 'interviewQ',
        subtext: `${item.domain} • ${item.difficulty.toUpperCase()} (${item.question_type})`,
        url: item.resolution_url
      });
    } else {
      setLocalBookmarkedIds(prev => ({ ...prev, [item.id]: !prev[item.id] }));
    }
  };

  const checkIsBookmarked = (id: string) => {
    if (isBookmarked) {
      return isBookmarked(id, 'interviewQ');
    }
    return !!localBookmarkedIds[id];
  };

  const handleCopy = (item: InterviewQItem) => {
    const textToCopy = `Question [${item.id}]: ${item.prompt}\n\nPreferred Answer: ${item.preferred_answer}\n\nSource: ${item.resolution_title} (${item.resolution_url})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isAllDomainsActive = selectedDomains.length === 0;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-mono">
      {/* Top Header Banner - Black & White Work in Progress Edition with Beta Tag */}
      <header className="max-w-7xl mx-auto mb-8 border-2 border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-2 uppercase">
                <BookOpen className="w-8 h-8 text-white" />
                MapIT InterviewQ
              </h1>
              <span className="bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-xs tracking-wide shrink-0 font-mono">
                beta
              </span>
            </div>
            <p className="text-zinc-400 text-sm md:text-base max-w-3xl font-sans">
              Role-mapped technical interview questions &amp; practical assessment labs with preferred answers, evaluator checkpoints, and direct links to official documentation.
            </p>
          </div>
        </div>

        {/* Global Search and Counter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-black border border-zinc-700 rounded-none pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-white font-bold">
              TOTAL QUESTION BANK: {interviewQDatabase.length} ITEMS
            </span>
            <span className="px-3 py-1 bg-white text-black font-bold uppercase">
              MATCHES: {filteredQuestions.length}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Tab Switcher */}
      <div className="flex md:hidden max-w-7xl mx-auto mb-4 border-2 border-zinc-800 bg-zinc-950 p-1">
        <button
          onClick={() => setMobileTab('categories')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
            mobileTab === 'categories' ? 'bg-white text-black' : 'bg-black text-zinc-400'
          }`}
        >
          📂 Role Categories ({availableRoleSlugs.length - 1})
        </button>
        <button
          onClick={() => setMobileTab('questions')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
            mobileTab === 'questions' ? 'bg-white text-black' : 'bg-black text-zinc-400'
          }`}
        >
          ⚡ Questions List ({filteredQuestions.length})
        </button>
      </div>

      {/* Main Two-Column Layout (Master-Detail Domain & Category View) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* LEFT COLUMN: Role Categories & Customizable Sub-Domains Sidebar (1/3 Width on Desktop) */}
        <aside className={`${mobileTab === 'questions' ? 'hidden md:block' : 'block'} w-full md:w-1/3 shrink-0 space-y-4`}>
          
          {/* Role Categories Panel */}
          <div className="border-2 border-zinc-800 bg-zinc-950 p-4">
            <h2 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
              <Grid className="w-4 h-4 text-white" />
              Role Categories
            </h2>

            <div className="space-y-3">
              {availableRoleSlugs.map((slug) => {
                const meta = ROLE_CATEGORY_METADATA[slug] || {
                  label: slug.replace(/-/g, ' ').toUpperCase(),
                  icon: '📌',
                  description: 'Technical questions and practical labs'
                };

                const count = slug === 'all'
                  ? interviewQDatabase.length
                  : interviewQDatabase.filter(item => item.role_slug === slug).length;

                const isSelected = selectedRole === slug;

                return (
                  <div
                    key={slug}
                    onClick={() => handleRoleSelect(slug)}
                    className={`p-4 border-2 transition-all cursor-pointer relative group text-left ${
                      isSelected
                        ? 'border-white bg-zinc-900 shadow-[4px_4px_0px_0px_#ffffff]'
                        : 'border-zinc-800 bg-black hover:border-zinc-500 hover:bg-zinc-950'
                    }`}
                  >
                    {/* Left Accent Bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSelected ? 'bg-white' : 'bg-zinc-800 group-hover:bg-zinc-500'}`} />

                    <div className="pl-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-sm text-white flex items-center gap-2">
                          <span>{meta.icon}</span>
                          <span>{meta.label}</span>
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
                          isSelected ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                        }`}>
                          {count} {count === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-400 font-sans line-clamp-2">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customizable Multi-Select Sub-Domains Panel */}
          {availableDomains.length > 0 && (
            <div className="border-2 border-zinc-800 bg-zinc-950 p-4 space-y-3">
              <div className="border-b border-zinc-800 pb-2">
                <Layers className="w-4 h-4 text-white" />
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {/* All Sub-Domains Option */}
                <button
                  type="button"
                  onClick={() => toggleDomainSelect('all')}
                  className={`w-full py-2 px-3 text-xs font-mono text-left border flex items-center justify-between transition-all cursor-pointer ${
                    isAllDomainsActive
                      ? 'bg-white text-black border-white font-bold shadow-[2px_2px_0px_0px_#ffffff]'
                      : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isAllDomainsActive && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                    <span>All Sub-Domains</span>
                  </span>
                  <span className="text-[10px] opacity-80">({availableDomains.length})</span>
                </button>

                {/* Individual Customizable Sub-Domain Options */}
                {availableDomains.map(d => {
                  const isChecked = !isAllDomainsActive && selectedDomains.includes(d);
                  const dCount = interviewQDatabase.filter(i => (selectedRole === 'all' || i.role_slug === selectedRole) && i.domain === d).length;
                  
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDomainSelect(d)}
                      className={`w-full py-2 px-3 text-xs font-mono text-left border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white text-black border-white font-bold shadow-[2px_2px_0px_0px_#ffffff]'
                          : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate pr-2">
                        {isChecked ? (
                          <Check className="w-3.5 h-3.5 text-black stroke-[3] shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 border border-zinc-700 inline-block shrink-0" />
                        )}
                        <span className="truncate">{d}</span>
                      </span>
                      <span className="text-[10px] opacity-80 shrink-0">({dCount})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN: Questions & Practical Labs List (2/3 Width on Desktop) */}
        <main className={`${mobileTab === 'categories' ? 'hidden md:block' : 'block'} w-full md:w-2/3 space-y-4`}>
          
          {/* Sub-Filters Ribbon: Question Type & Difficulty */}
          <div className="border-2 border-zinc-800 bg-zinc-950 p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider shrink-0">Difficulty:</span>
                {['all', 'foundation', 'intermediate', 'advanced', 'scenario'].map((diff) => {
                  const isAvailable = diff === 'all' || availableDifficulties.includes(diff as any);
                  return (
                    <button
                      key={diff}
                      disabled={!isAvailable}
                      onClick={() => { setSelectedDifficulty(diff); setCurrentPage(1); }}
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase border transition-all shrink-0 ${
                        selectedDifficulty === diff
                          ? 'bg-white text-black border-white'
                          : isAvailable
                          ? 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-white hover:text-white'
                          : 'bg-black text-zinc-700 border-zinc-900 cursor-not-allowed opacity-40'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>

              {/* Type Select */}
              <div className="shrink-0">
                <select
                  value={selectedType}
                  onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                  className="bg-black border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-white font-mono uppercase"
                >
                  <option value="all">All Question Types</option>
                  {availableTypes.map(t => (
                    <option key={t} value={t} className="capitalize">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span>Category:</span>
                <span className="font-bold text-white uppercase">
                  {ROLE_CATEGORY_METADATA[selectedRole]?.label || selectedRole}
                </span>
                <span>•</span>
                <span>Sub-Domains:</span>
                <span className="font-bold text-white uppercase">
                  {isAllDomainsActive ? 'All Sub-Domains' : `${selectedDomains.length} Selected (${selectedDomains.join(', ')})`}
                </span>
              </div>

              {totalPages > 1 && (
                <span className="text-[11px] shrink-0">
                  Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                </span>
              )}
            </div>
          </div>

          {/* Question Cards List */}
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-16 bg-zinc-950 border-2 border-zinc-800 p-8">
              <HelpCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-zinc-200 mb-2 uppercase">No matching questions found</h3>
              <p className="text-zinc-400 text-xs max-w-md mx-auto font-sans mb-4">
                No items match your selected sub-domain or difficulty filters. Try clearing sub-domains or adjusting your search keyword.
              </p>
              <button
                onClick={() => {
                  setSelectedRole('all');
                  setSelectedDomains([]);
                  setSelectedDifficulty('all');
                  setSelectedType('all');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-white text-black border border-white text-xs font-bold uppercase hover:bg-zinc-200 transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedQuestions.map((item) => {
                const isExpanded = !!expandedIds[item.id];
                const bookmarked = checkIsBookmarked(item.id);
                const isCopied = copiedId === item.id;
                const isPractical = item.question_type === 'practical' || item.prompt.startsWith('[PRACTICAL LAB]');

                return (
                  <article
                    key={item.id}
                    className={`border-2 transition-all p-5 text-left relative ${
                      isPractical
                        ? 'bg-zinc-950 border-zinc-600 hover:border-white shadow-[4px_4px_0px_0px_#ffffff]'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-500'
                    }`}
                  >
                    {/* Item Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-black px-2 py-0.5 bg-white text-black uppercase">
                          {item.id}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700">
                          {item.difficulty}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700">
                          {item.question_type}
                        </span>
                        {item.source_tier && (
                          <span className="text-[10px] font-mono text-zinc-400">
                            Tier-{item.source_tier}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Copy Action */}
                        <button
                          onClick={() => handleCopy(item)}
                          title="Copy Question & Answer"
                          className="p-1.5 border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 transition cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        {/* Bookmark Action */}
                        <button
                          onClick={() => handleBookmarkToggle(item)}
                          title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
                          className={`p-1.5 border transition cursor-pointer ${
                            bookmarked
                              ? 'bg-white text-black border-white'
                              : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-white hover:text-white'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="mb-4">
                      <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                        {item.domain}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug font-sans">
                        {item.prompt}
                      </h3>
                    </div>

                    {/* Expandable Preferred Answer & Evaluator Checkpoints */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="w-full py-2 px-3 border border-zinc-800 bg-black hover:bg-zinc-900 text-xs text-white font-bold flex items-center justify-between uppercase transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>{isExpanded ? 'Hide Preferred Answer & Checkpoints' : 'View Preferred Answer & Checkpoints'}</span>
                        </span>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 border border-zinc-700 bg-zinc-900/90 space-y-4 text-xs font-sans">
                          {/* Preferred Answer */}
                          <div>
                            <span className="text-[10px] font-mono font-bold text-white uppercase block mb-1">
                              PREFERRED ANSWER GUIDE
                            </span>
                            <p className="text-zinc-200 leading-relaxed">
                              {item.preferred_answer}
                            </p>
                          </div>

                          {/* Evaluator Checkpoints */}
                          {item.evaluation_points && item.evaluation_points.length > 0 && (
                            <div className="pt-3 border-t border-zinc-800">
                              <span className="text-[10px] font-mono font-bold text-white uppercase block mb-2">
                                EVALUATOR CHECKPOINTS &amp; RUBRIC
                              </span>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 font-mono text-[11px]">
                                {item.evaluation_points.map((pt, idx) => (
                                  <li key={idx} className="flex items-start gap-2 bg-black p-2 border border-zinc-800">
                                    <span className="text-white font-bold">•</span>
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Source Link */}
                          {item.resolution_title && (
                            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono">
                              <span className="text-zinc-400">Verified Reference:</span>
                              <a
                                href={item.resolution_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:underline font-bold flex items-center gap-1.5"
                              >
                                <span>{item.resolution_title}</span>
                                <ExternalLink className="w-3 h-3 text-zinc-400" />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="border-2 border-zinc-800 bg-zinc-950 p-4 flex items-center justify-between text-xs font-mono">
              <button
                disabled={currentPage === 1}
                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2 border border-zinc-700 bg-black text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white hover:text-black font-bold uppercase transition cursor-pointer"
              >
                ◀ Previous Page
              </button>

              <span className="text-zinc-400">
                Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2 border border-zinc-700 bg-black text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white hover:text-black font-bold uppercase transition cursor-pointer"
              >
                Next Page ▶
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InterviewQ;
