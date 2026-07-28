import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  HelpCircle,
  Copy,
  Check,
  Bookmark,
  ChevronRight,
  ChevronDown,
  Info
} from 'lucide-react';
import { interviewQDatabase, InterviewQItem } from '../data/interviewQDatabase';

export interface InterviewQProps {
  bookmarks?: Array<{ id: string; name: string; type: string; subtext?: string; url?: string }>;
  toggleBookmark?: (item: { id: string; name: string; type: any; subtext?: string; url?: string }) => void;
  isBookmarked?: (id: string, type: any) => boolean;
}

export const InterviewQ: React.FC<InterviewQProps> = ({
  toggleBookmark,
  isBookmarked
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [localBookmarkedIds, setLocalBookmarkedIds] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 1. Cascading available Roles (all roles in DB)
  const availableRoles = useMemo(() => {
    const roles = Array.from(new Set(interviewQDatabase.map(item => item.role_slug)));
    return roles.sort();
  }, []);

  // 2. Cascading available Domains (dynamically scoped to selectedRole)
  const availableDomains = useMemo(() => {
    const pool = selectedRole === 'all' 
      ? interviewQDatabase 
      : interviewQDatabase.filter(item => item.role_slug === selectedRole);
    const domains = Array.from(new Set(pool.map(item => item.domain)));
    return domains.sort();
  }, [selectedRole]);

  // 3. Cascading available Question Types (dynamically scoped to selectedRole & selectedDomain)
  const availableTypes = useMemo(() => {
    const pool = interviewQDatabase.filter(item => {
      const matchRole = selectedRole === 'all' || item.role_slug === selectedRole;
      const matchDomain = selectedDomain === 'all' || item.domain === selectedDomain;
      return matchRole && matchDomain;
    });
    const types = Array.from(new Set(pool.map(item => item.question_type)));
    return types.sort();
  }, [selectedRole, selectedDomain]);

  // 4. Cascading available Difficulties (dynamically scoped to selectedRole & selectedDomain & selectedType)
  const availableDifficulties = useMemo(() => {
    const pool = interviewQDatabase.filter(item => {
      const matchRole = selectedRole === 'all' || item.role_slug === selectedRole;
      const matchDomain = selectedDomain === 'all' || item.domain === selectedDomain;
      const matchType = selectedType === 'all' || item.question_type === selectedType;
      return matchRole && matchDomain && matchType;
    });
    const diffs = Array.from(new Set(pool.map(item => item.difficulty)));
    return diffs;
  }, [selectedRole, selectedDomain, selectedType]);

  // Handlers for cascading dropdown resets
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setSelectedDomain('all');
    setSelectedType('all');
    setSelectedDifficulty('all');
    setCurrentPage(1);
  };

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedType('all');
    setSelectedDifficulty('all');
    setCurrentPage(1);
  };

  const handleTypeChange = (typeStr: string) => {
    setSelectedType(typeStr);
    setSelectedDifficulty('all');
    setCurrentPage(1);
  };

  // Filter items based on criteria
  const filteredQuestions = useMemo(() => {
    return interviewQDatabase.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.preferred_answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = selectedRole === 'all' || item.role_slug === selectedRole;
      const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      const matchesType = selectedType === 'all' || item.question_type === selectedType;

      return matchesSearch && matchesRole && matchesDomain && matchesDifficulty && matchesType;
    });
  }, [searchQuery, selectedRole, selectedDomain, selectedDifficulty, selectedType]);

  // Paginated slice
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

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'foundation':
        return 'bg-zinc-900 text-zinc-200 border-zinc-700';
      case 'intermediate':
        return 'bg-zinc-800 text-zinc-100 border-zinc-600';
      case 'advanced':
        return 'bg-zinc-950 text-zinc-300 border-zinc-700';
      case 'scenario':
        return 'bg-zinc-900 text-zinc-200 border-zinc-700 font-mono';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-mono">
      {/* Top Header Banner - Black & White Work in Progress Edition */}
      <header className="max-w-7xl mx-auto mb-8 border-2 border-zinc-800 bg-zinc-950 rounded-none p-6 md:p-8 shadow-2xl">
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
              Role-mapped technical interview questions &amp; practical assessment labs with concise preferred answers, evaluator checkpoints, and direct links to official documentation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-4 py-3 border border-zinc-700 shrink-0 font-mono">
            <ShieldCheck className="w-5 h-5 text-white shrink-0" />
            <div>
              <div className="font-bold text-white uppercase">MapIT Editorial Standard</div>
              <div className="text-[10px] text-zinc-400">100% Verified Tier-A/B Documentation</div>
            </div>
          </div>
        </div>

        {/* Dynamic Cascading Multi-Filter Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search prompts, answers, IDs (e.g. DVO-001, LAB-001)..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-black border border-zinc-700 rounded-none pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
              />
            </div>

            {/* Role Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-white transition-all font-mono"
              >
                <option value="all">All Roles ({interviewQDatabase.length} Items)</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>
                    {role.replace(/-/g, ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Cascading Domain Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDomain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-white transition-all font-mono"
              >
                <option value="all">
                  {selectedRole === 'all' ? 'All Domains' : `Domains for ${selectedRole.replace(/-/g, ' ')} (${availableDomains.length})`}
                </option>
                {availableDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            {/* Cascading Question Type Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-white transition-all font-mono"
              >
                <option value="all">All Types</option>
                {availableTypes.map(t => (
                  <option key={t} value={t} className="capitalize">{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Difficulty Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-2">Difficulty:</span>
              {['all', 'foundation', 'intermediate', 'advanced', 'scenario'].map((diff) => {
                const isAvailable = diff === 'all' || availableDifficulties.includes(diff as any);
                return (
                  <button
                    key={diff}
                    disabled={!isAvailable}
                    onClick={() => { setSelectedDifficulty(diff); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-none text-xs font-bold uppercase border transition-all ${
                      selectedDifficulty === diff
                        ? 'bg-white text-black border-white'
                        : isAvailable
                        ? 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                        : 'bg-black text-zinc-700 border-zinc-900 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-zinc-400 font-mono">
              Showing <span className="font-bold text-white">{filteredQuestions.length}</span> matching items
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950 border-2 border-zinc-800 rounded-none p-8">
            <HelpCircle className="w-12 h-12 text-zinc-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-zinc-200 mb-2 uppercase">No matching questions found</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6 font-sans">
              Try adjusting your search terms or clearing role/domain filters to explore the rest of the question bank.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('all');
                setSelectedDomain('all');
                setSelectedDifficulty('all');
                setSelectedType('all');
              }}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase border border-zinc-700 text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedQuestions.map((item) => {
              const isExpanded = !!expandedIds[item.id];
              const isSaved = checkIsBookmarked(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-zinc-950 border-2 border-zinc-800 hover:border-zinc-600 rounded-none p-6 transition-all duration-200 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Item Metadata Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white text-black border border-white">
                          {item.id}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 border font-mono font-bold uppercase ${getDifficultyBadge(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase tracking-wider font-mono">
                          {item.question_type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(item)}
                          title="Copy question text"
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          {copiedId === item.id ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleBookmarkToggle(item)}
                          title={isSaved ? "Remove from global Bookmarks" : "Save to global Bookmarks"}
                          className={`p-1.5 transition-colors ${
                            isSaved ? 'text-white bg-zinc-800 border border-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Domain Label */}
                    <div className="text-xs text-zinc-400 font-bold mb-2 flex items-center gap-1.5 uppercase">
                      <Layers className="w-3.5 h-3.5 text-zinc-500" />
                      {item.domain}
                    </div>

                    {/* Question Prompt */}
                    <h2 className="text-base md:text-lg font-bold text-zinc-100 leading-snug mb-4 font-sans">
                      {item.prompt}
                    </h2>

                    {/* Expandable Preferred Answer & Checkpoints */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-zinc-800 space-y-4">
                        {/* Preferred Answer */}
                        <div className="bg-black p-4 border border-zinc-800">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5 font-mono">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                            Preferred Answer Guide / Rubric
                          </h3>
                          <p className="text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-line">
                            {item.preferred_answer}
                          </p>
                        </div>

                        {/* Evaluator Checkpoints */}
                        {item.evaluation_points && item.evaluation_points.length > 0 && (
                          <div className="bg-zinc-900/60 p-4 border border-zinc-800">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5 font-mono">
                              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                              Evaluator Checkpoints
                            </h3>
                            <ul className="space-y-1.5 font-sans">
                              {item.evaluation_points.map((pt, idx) => (
                                <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2">
                                  <span className="text-white font-bold">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3 font-mono">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-xs font-bold text-white hover:text-zinc-300 flex items-center gap-1 transition-colors uppercase"
                    >
                      {isExpanded ? (
                        <>Hide Answer <ChevronDown className="w-4 h-4" /></>
                      ) : (
                        <>View Preferred Answer <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>

                    {/* Resolution Link */}
                    {item.resolution_url && (
                      <a
                        href={item.resolution_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 border border-zinc-700 transition-all truncate max-w-[200px]"
                        title={`${item.resolution_title} (Verified: ${item.last_verified_at})`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{item.resolution_title}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t-2 border-zinc-800 mt-8 pt-6 font-mono">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-none text-xs font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              Previous Page
            </button>

            <span className="text-xs text-zinc-400">
              Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-none text-xs font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              Next Page
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default InterviewQ;
