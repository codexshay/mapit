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

export const InterviewQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique roles and domains
  const availableRoles = useMemo(() => {
    const roles = Array.from(new Set(interviewQDatabase.map(item => item.role_slug)));
    return roles.sort();
  }, []);

  const availableDomains = useMemo(() => {
    const domains = Array.from(new Set(interviewQDatabase.map(item => item.domain)));
    return domains.sort();
  }, []);

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

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
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
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50';
      case 'intermediate':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/50';
      case 'advanced':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/50';
      case 'scenario':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-8 font-sans">
      {/* Top Header Banner */}
      <header className="max-w-7xl mx-auto mb-8 border border-slate-800 bg-gradient-to-r from-slate-900/90 via-[#0d1527] to-slate-900/90 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-emerald-400" />
                MapIT InterviewQ
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider animate-pulse">
                BETA
              </span>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-3xl">
              Source-linked, role-mapped technical question bank with concise preferred answers, evaluator checkpoints, and direct links to official project and vendor documentation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-4 py-3 rounded-xl border border-slate-700/60 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-slate-200">MapIT Editorial Standard</div>
              <div>100% Verified Tier-A/B Documentation</div>
            </div>
          </div>
        </div>

        {/* Multi-Filter Control Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions, topics, ID (e.g. DVO-001)..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Role Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedRole}
                onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-all"
              >
                <option value="all">All Roles ({interviewQDatabase.length} Questions)</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>
                    {role.replace(/-/g, ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Domain Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDomain}
                onChange={(e) => { setSelectedDomain(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-all"
              >
                <option value="all">All Domains</option>
                {availableDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            {/* Question Type Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-all"
              >
                <option value="all">All Types</option>
                <option value="concept">Concept</option>
                <option value="operations">Operations</option>
                <option value="troubleshooting">Troubleshooting</option>
                <option value="design">Design</option>
                <option value="security">Security</option>
                <option value="measurement">Measurement</option>
                <option value="recovery">Recovery</option>
              </select>
            </div>
          </div>

          {/* Difficulty Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Difficulty:</span>
              {['all', 'foundation', 'intermediate', 'advanced', 'scenario'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => { setSelectedDifficulty(diff); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400">
              Showing <span className="font-semibold text-emerald-400">{filteredQuestions.length}</span> verified questions
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-200 mb-2">No matching questions found</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Try adjusting your search terms or clearing role/difficulty filters to explore the rest of the question bank.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('all');
                setSelectedDomain('all');
                setSelectedDifficulty('all');
                setSelectedType('all');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium border border-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedQuestions.map((item) => {
              const isExpanded = !!expandedIds[item.id];
              const isBookmarked = !!bookmarkedIds[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Item Metadata Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                          {item.id}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold capitalize ${getDifficultyBadge(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60 uppercase tracking-wider font-mono">
                          {item.question_type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(item)}
                          title="Copy question text"
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => toggleBookmark(item.id)}
                          title="Save to bookmarks"
                          className={`p-1.5 rounded-lg transition-colors ${
                            isBookmarked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Domain Label */}
                    <div className="text-xs text-slate-400 font-medium mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      {item.domain}
                    </div>

                    {/* Question Prompt */}
                    <h2 className="text-base md:text-lg font-semibold text-slate-100 leading-snug mb-4">
                      {item.prompt}
                    </h2>

                    {/* Expandable Preferred Answer & Checkpoints */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                        {/* Preferred Answer */}
                        <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Preferred Answer
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed font-sans">
                            {item.preferred_answer}
                          </p>
                        </div>

                        {/* Evaluator Checkpoints */}
                        {item.evaluation_points && item.evaluation_points.length > 0 && (
                          <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/60">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Evaluator Checkpoints
                            </h3>
                            <ul className="space-y-1.5">
                              {item.evaluation_points.map((pt, idx) => (
                                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <span className="text-blue-400 font-bold">•</span>
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
                  <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
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
                        className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-all truncate max-w-[200px]"
                        title={`${item.resolution_title} (Verified: ${item.last_verified_at})`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
          <div className="flex items-center justify-between border-t border-slate-800 mt-8 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              Previous Page
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Page <span className="text-emerald-400 font-bold">{currentPage}</span> of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
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
