import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Linkedin, 
  Building2, 
  Users, 
  Briefcase, 
  Filter, 
  Sparkles,
  Bookmark,
  Check,
  Compass,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TOP_50_COMPANIES, CompanyInfo } from '../data/topCompaniesData';

export interface JobsReferralsProps {
  bookmarks?: Array<{ id: string; name: string; type: string; subtext?: string; url?: string }>;
  toggleBookmark?: (item: { id: string; name: string; type: any; subtext?: string; url?: string }) => void;
  isBookmarked?: (id: string, type: any) => boolean;
  theme?: 'light' | 'dark';
  isLight?: boolean;
}

// 14 Major Global & Indian Job Portals with Official SVGs
const JOB_PORTALS = [
  {
    name: 'LinkedIn Jobs',
    getSearchUrl: (role: string) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
      </svg>
    )
  },
  {
    name: 'Naukri.com (India #1)',
    getSearchUrl: (role: string) => `https://www.naukri.com/jobs-in-india?k=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2.2l-3.3-5.2v5.2H5.5V7.5h2.2l3.3 5.2V7.5h2v9zm5.5 0h-2V7.5h2v9z"/>
      </svg>
    )
  },
  {
    name: 'Hirist (India Tech Jobs)',
    getSearchUrl: (role: string) => `https://www.hirist.tech/search?keyword=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4 4h4v6h8V4h4v16h-4v-6H8v6H4V4z"/>
      </svg>
    )
  },
  {
    name: 'Instahyre (India Premium Tech)',
    getSearchUrl: (role: string) => `https://www.instahyre.com/search-jobs/?query=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5v7.4l-7 3.5-7-3.5V8.3l7-3.5zM11 9v6h2V9h-2z"/>
      </svg>
    )
  },
  {
    name: 'IITjobs (Premium Engineering Jobs)',
    getSearchUrl: (role: string) => `https://www.iitjobs.com/search?q=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M5 4h3v16H5V4zm5 0h3v16h-3V4zm5 0h4v3h-4V4zm0 5h4v11h-4V9z"/>
      </svg>
    )
  },
  {
    name: 'Dice (Global Tech Jobs)',
    getSearchUrl: (role: string) => `https://www.dice.com/jobs?q=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h2V7H7zm8 0v2h2V7h-2zm-4 4v2h2v-2h-2zm-4 4v2h2v-2H7zm8 0v2h2v-2h-2z"/>
      </svg>
    )
  },
  {
    name: 'Indeed',
    getSearchUrl: (role: string) => `https://www.indeed.com/jobs?q=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12.24 3.75c-4.66 0-8.44 3.78-8.44 8.44 0 4.66 3.78 8.44 8.44 8.44 4.66 0 8.44-3.78 8.44-8.44 0-4.66-3.78-8.44-8.44-8.44zm.2 2.82a1.46 1.46 0 1 1 0 2.92 1.46 1.46 0 0 1 0-2.92zm2.08 10.9h-4.42v-6.9h4.42v6.9z"/>
      </svg>
    )
  },
  {
    name: 'Glassdoor Jobs',
    getSearchUrl: (role: string) => `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M5 3h14v18H5V3zm2 2v14h10V5H7zm2 2h6v2H9V7zm0 4h6v2H9v-2zm0 4h4v2H9v-2z"/>
      </svg>
    )
  },
  {
    name: 'Google Jobs',
    getSearchUrl: (role: string) => `https://www.google.com/search?q=${encodeURIComponent(role)}+jobs&ibp=htl;jobs`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
      </svg>
    )
  },
  {
    name: 'Foundit / Monster India',
    getSearchUrl: (role: string) => `https://www.foundit.in/srp/results?query=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
      </svg>
    )
  },
  {
    name: 'Wellfound (AngelList Startups)',
    getSearchUrl: (role: string) => `https://wellfound.com/jobs?q=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2L1 21h22L12 2zm0 5.5l6.5 11.5h-13L12 7.5z"/>
      </svg>
    )
  },
  {
    name: 'ZipRecruiter',
    getSearchUrl: (role: string) => `https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2L2 22h20L12 2zm0 5.8l5.2 10.2H6.8L12 7.8z"/>
      </svg>
    )
  },
  {
    name: 'SimplyHired',
    getSearchUrl: (role: string) => `https://www.simplyhired.com/search?q=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h8v2H8V9zm0 4h6v2H8v-2z"/>
      </svg>
    )
  },
  {
    name: 'FlexJobs (Remote Work)',
    getSearchUrl: (role: string) => `https://www.flexjobs.com/search?search=${encodeURIComponent(role)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    )
  }
];

export const JobsReferrals: React.FC<JobsReferralsProps> = ({
  toggleBookmark,
  isBookmarked,
  theme = 'dark',
  isLight = false
}) => {
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('Site Reliability Engineer');
  const [customRoleInput, setCustomRoleInput] = useState<string>('');
  const [companySearchQuery, setCompanySearchQuery] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [mobilePage, setMobilePage] = useState<number>(1);
  const [expandedCompanies, setExpandedCompanies] = useState<Record<string, boolean>>({});

  const toggleCompanyExpand = (compName: string) => {
    setExpandedCompanies(prev => ({ ...prev, [compName]: !prev[compName] }));
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [localBookmarkedIds, setLocalBookmarkedIds] = useState<Record<string, boolean>>({});

  // Active role keyword used for embedding into portals & referrals
  const activeRoleKeyword = useMemo(() => {
    if (customRoleInput.trim()) return customRoleInput.trim();
    return selectedRoleTitle.trim();
  }, [selectedRoleTitle, customRoleInput]);

  // Extract all unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    TOP_50_COMPANIES.forEach(c => {
      if (c.category) set.add(c.category);
    });
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered companies based on search query, category & letter index
  const filteredCompanies = useMemo(() => {
    return TOP_50_COMPANIES.filter(comp => {
      const matchesSearch = companySearchQuery === '' || 
        comp.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
        comp.category?.toLowerCase().includes(companySearchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;

      const firstChar = comp.name.charAt(0).toUpperCase();
      const matchesLetter = selectedLetter === 'ALL' || firstChar === selectedLetter;

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [companySearchQuery, selectedCategory, selectedLetter]);

  const itemsPerPageMobile = 10;
  const totalMobilePages = Math.ceil(filteredCompanies.length / itemsPerPageMobile) || 1;
  const paginatedMobileCompanies = useMemo(() => {
    const start = (mobilePage - 1) * itemsPerPageMobile;
    return filteredCompanies.slice(start, start + itemsPerPageMobile);
  }, [filteredCompanies, mobilePage]);

  const handleBookmarkToggle = (comp: CompanyInfo) => {
    if (toggleBookmark) {
      toggleBookmark({
        id: `comp-${comp.name}`,
        name: comp.name,
        type: 'company',
        subtext: `${comp.category || 'Tech'} • Official Portal & LinkedIn Referral`,
        url: comp.careerUrl
      });
    } else {
      setLocalBookmarkedIds(prev => ({ ...prev, [comp.name]: !prev[comp.name] }));
    }
  };

  const checkIsBookmarked = (compName: string) => {
    if (isBookmarked) {
      return isBookmarked(`comp-${compName}`, 'company');
    }
    return !!localBookmarkedIds[compName];
  };

  // Pre-configured popular role options for dropdown
  const roleOptions = [
    'DevOps Engineer',
    'Site Reliability Engineer',
    'Platform Engineer',
    'Backend Engineer',
    'Software Engineer',
    'Full Stack Engineer',
    'Frontend Engineer',
    'Data Engineer',
    'Cloud Architect',
    'Cybersecurity Engineer',
    'AI / ML Engineer',
    'Product Manager',
    'System Administrator'
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-mono">
      {/* Header Section - Monochrome B&W with Beta Tag */}
      <header className="max-w-7xl mx-auto mb-8 border-2 border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2 uppercase ${isLight ? "text-slate-900" : "text-white"}`}>
                <Briefcase className="w-8 h-8 text-white" />
                Jobs &amp; Referrals
              </h1>
              <span className="bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-xs tracking-wide shrink-0 font-mono">
                beta
              </span>
            </div>
            <p className={`text-sm md:text-base max-w-3xl font-sans ${isLight ? "text-slate-600" : "text-zinc-400"}`}>
              Discover {TOP_50_COMPANIES.length}+ technology employers, search global &amp; Indian job portals with role-embedded filters, and request LinkedIn employee referrals.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400 bg-zinc-900 px-4 py-3 border border-zinc-700 shrink-0 font-mono">
            <Linkedin className="w-6 h-6 text-white shrink-0" />
            <div>
              <div className="font-bold text-white uppercase">LinkedIn Network Directory</div>
              <div className="text-[10px] text-zinc-400">{TOP_50_COMPANIES.length}+ Employers • Direct Career Portals</div>
            </div>
          </div>
        </div>

        {/* Role & Keyword Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Preset Role Selector */}
          <div className="md:col-span-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-white" />
                Target Role Profile
              </label>
              {selectedRoleTitle && (
                <button
                  type="button"
                  onClick={() => setSelectedRoleTitle('')}
                  className="text-[10px] text-yellow-400 hover:text-yellow-300 uppercase font-bold flex items-center gap-1 cursor-pointer"
                  title="Clear selected role"
                >
                  <XCircle className="w-3 h-3" /> Clear Role
                </button>
              )}
            </div>
            <select
              value={selectedRoleTitle}
              onChange={(e) => {
                setSelectedRoleTitle(e.target.value);
                setCustomRoleInput('');
              }}
              className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-white transition-all font-mono"
            >
              <option value="">-- Clear / All Roles (Explore Company Only) --</option>
              {roleOptions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Custom Role Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              Or Custom Keyword
            </label>
            <input
              type="text"
              placeholder=""
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
            />
          </div>

          {/* Filter Company Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              Search Company
            </label>
            <input
              type="text"
              placeholder=""
              value={companySearchQuery}
              onChange={(e) => setCompanySearchQuery(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
            />
          </div>
        </div>

        {/* DIRECT JOB PORTAL SEARCH ICONS (ROLE EMBEDDED) */}
        {activeRoleKeyword && (
          <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 font-mono">
                <ExternalLink className="w-4 h-4 text-white" />
                Global &amp; India Job Portals (Role: <span className="text-yellow-400 font-mono">"{activeRoleKeyword}"</span>)
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Hover over icons for portal name • Click to view live role search results
              </span>
            </div>

            {/* 12 Small Official Logo Icons Bar (2 Symmetric Rows) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {JOB_PORTALS.map((portal) => {
                const searchUrl = portal.getSearchUrl(activeRoleKeyword);
                return (
                  <a
                    key={portal.name}
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Search "${activeRoleKeyword}" on ${portal.name}`}
                    className="w-10 h-10 border border-zinc-700 bg-zinc-900 hover:bg-white text-zinc-200 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow-[3px_3px_0px_0px_#ffffff] shrink-0"
                  >
                    {portal.icon}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Pills & Active Keyword Badge */}
        <div className="mt-5 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-none text-xs font-bold uppercase border transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-zinc-400 flex items-center gap-2 bg-zinc-900 px-3 py-1.5 border border-zinc-800">
            <span>Embedded Search Keyword:</span>
            <span className="text-white font-bold font-sans">
              {activeRoleKeyword ? `"${activeRoleKeyword}"` : '<None - Company Info Mode>'}
            </span>
          </div>
        </div>

        {/* Alphabetical Letter Index Bar for Instant Predictable Searching */}
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
              Alphabetical Company Index:
            </span>
            {selectedLetter !== 'ALL' && (
              <button
                type="button"
                onClick={() => { setSelectedLetter('ALL'); setMobilePage(1); }}
                className="text-[10px] text-yellow-400 hover:text-yellow-300 uppercase font-bold flex items-center gap-1 cursor-pointer font-mono"
              >
                Show All Companies
              </button>
            )}
          </div>

          <div className="flex overflow-x-auto space-x-1.5 scrollbar-none pb-1">
            {['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map(letter => (
              <button
                key={letter}
                type="button"
                onClick={() => { setSelectedLetter(letter); setMobilePage(1); }}
                className={`px-2.5 py-1 text-xs font-mono font-bold border transition-all cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-white text-black border-white shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Companies Section */}
      <main className="max-w-7xl mx-auto">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white md:bg-zinc-950 border-2 border-slate-300 md:border-zinc-800 rounded-none p-8">
            <Building2 className="w-12 h-12 text-slate-400 md:text-zinc-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-900 md:text-zinc-200 mb-2 uppercase">No matching companies found</h2>
            <p className="text-slate-600 md:text-zinc-400 text-sm max-w-md mx-auto mb-6 font-sans">
              Try adjusting your search query or clearing category filters to view all {TOP_50_COMPANIES.length} technology employers.
            </p>
            <button
              onClick={() => {
                setCompanySearchQuery('');
                setSelectedCategory('All');
                setSelectedLetter('ALL');
                setMobilePage(1);
              }}
              className="px-4 py-2 bg-slate-900 text-white md:bg-white md:text-black border border-slate-900 md:border-white text-xs font-bold uppercase transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            {/* MOBILE ACCORDION VIEW (Company Name ONLY on Label, Light Theme, Paginated) */}
            <div className="block md:hidden space-y-3 mb-6">
              {paginatedMobileCompanies.map((comp) => {
                const bookmarked = checkIsBookmarked(comp.name);
                const isExpanded = !!expandedCompanies[comp.name];

                const careersUrlWithKeyword = activeRoleKeyword
                  ? `${comp.careerUrl}${comp.careerUrl.includes('?') ? '&' : '?'}q=${encodeURIComponent(activeRoleKeyword)}`
                  : comp.careerUrl;

                const linkedinCompanyJobsUrl = comp.jobsSectionLink || comp.companyChannelLink || `https://www.linkedin.com/company/${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/jobs/`;

                const linkedinSearchUrlWithRole = activeRoleKeyword
                  ? `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(comp.name + " " + activeRoleKeyword)}`
                  : comp.indiaJobsSearchLink || comp.companyChannelLink || `https://www.linkedin.com/company/${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/`;

                return (
                  <div
                    key={comp.name}
                    className="bg-white border-2 border-slate-300 text-slate-900 p-3.5 text-left relative shadow-xs"
                  >
                    {/* Collapsed Header: Company Name ONLY */}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => toggleCompanyExpand(comp.name)}
                        className="flex-1 text-left flex items-center justify-between font-black text-base text-slate-900 tracking-tight cursor-pointer py-1"
                      >
                        <span className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-700" />
                          <span>{comp.name}</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookmarkToggle(comp)}
                        title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
                        className={`p-1.5 border cursor-pointer ${
                          bookmarked
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Expanded Content Drawer */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-3 font-sans text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                          <span>Category: <strong className="text-slate-900">{comp.category || 'Technology'}</strong></span>
                          <span>Target Role: <strong className="text-amber-600">{activeRoleKeyword || 'All Roles'}</strong></span>
                        </div>

                        <div className="space-y-2 border-t border-slate-200 pt-3 font-mono text-xs">
                          <a
                            href={careersUrlWithKeyword}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 border border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 font-bold flex items-center justify-between uppercase transition-all cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-slate-700" />
                              <span>Official Careers Portal</span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>

                          <a
                            href={linkedinCompanyJobsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 border border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 font-bold flex items-center justify-between uppercase transition-all cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-slate-700" />
                              <span>LinkedIn Company Jobs</span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>

                          <a
                            href={linkedinSearchUrlWithRole}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 border border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 font-bold flex items-center justify-between uppercase transition-all cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-slate-700" />
                              <span>Search Employee Referrals</span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Pagination Bar */}
              {totalMobilePages > 1 && (
                <div className="border-2 border-slate-300 bg-white p-3 flex items-center justify-between text-xs font-mono text-slate-900 shadow-xs">
                  <button
                    type="button"
                    disabled={mobilePage === 1}
                    onClick={() => { setMobilePage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-1.5 border border-slate-300 bg-slate-100 text-slate-900 disabled:opacity-40 font-bold uppercase cursor-pointer"
                  >
                    ◀ Prev Page
                  </button>

                  <span className="font-bold">
                    Page {mobilePage} of {totalMobilePages}
                  </span>

                  <button
                    type="button"
                    disabled={mobilePage >= totalMobilePages}
                    onClick={() => { setMobilePage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-1.5 border border-slate-300 bg-slate-100 text-slate-900 disabled:opacity-40 font-bold uppercase cursor-pointer"
                  >
                    Next Page ▶
                  </button>
                </div>
              )}
            </div>

            {/* DESKTOP GRID VIEW (Original Dark Grid View 100% Untouched) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp) => {
              const bookmarked = checkIsBookmarked(comp.name);
              
              // Dynamic URLs with embedded role keyword
              const careersUrlWithKeyword = activeRoleKeyword
                ? `${comp.careerUrl}${comp.careerUrl.includes('?') ? '&' : '?'}q=${encodeURIComponent(activeRoleKeyword)}`
                : comp.careerUrl;

              const linkedinCompanyJobsUrl = comp.jobsSectionLink || comp.companyChannelLink || `https://www.linkedin.com/company/${comp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/jobs/`;

              const linkedinSearchUrlWithRole = activeRoleKeyword
                ? `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(comp.name + " " + activeRoleKeyword)}`
                : `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(comp.name)}`;

              return (
                <article
                  key={comp.name}
                  className={`border-2 transition-all p-5 rounded-none text-left flex flex-col justify-between relative group ${
                    isLight 
                      ? 'bg-white border-slate-300 text-slate-900 shadow-xs hover:border-slate-500 hover:shadow-[4px_4px_0px_0px_#0f172a]' 
                      : 'bg-zinc-950 border-zinc-800 text-white hover:border-zinc-500 hover:shadow-[6px_6px_0px_0px_#ffffff]'
                  }`}
                >
                  {/* Top Bar with Category & Bookmark */}
                  <div className="flex items-start justify-between gap-3 mb-4 border-b border-zinc-800 pb-3">
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border ${isLight ? "bg-slate-100 text-slate-800 border-slate-300" : "bg-zinc-900 text-zinc-300 border-zinc-700"}`}>
                        {comp.category || 'Technology'}
                      </span>
                      <h3 className={`text-xl font-black tracking-tight mt-2 flex items-center gap-2 ${isLight ? "text-slate-900" : "text-white"}`}>
                        <span>{comp.name}</span>
                      </h3>
                    </div>

                    <button
                      onClick={() => handleBookmarkToggle(comp)}
                      title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
                      className={`p-2 border transition-all cursor-pointer ${
                        bookmarked
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-white hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-3 mb-6 font-sans text-xs">
                    <div className={`flex items-center justify-between border-b pb-1.5 ${isLight ? "border-slate-200 text-slate-600" : "border-zinc-900 text-zinc-400"}`}>
                      <span className="font-mono text-[10px] uppercase text-zinc-500">Target Role</span>
                      <span className="text-yellow-400 font-mono font-bold">
                        {activeRoleKeyword ? `"${activeRoleKeyword}"` : 'All Roles'}
                      </span>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="space-y-2 border-t border-zinc-800 pt-4 font-mono text-xs">
                    {/* Official Careers Portal Link */}
                    <a
                      href={careersUrlWithKeyword}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 border font-bold flex items-center justify-between uppercase transition-all cursor-pointer ${isLight ? "border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900" : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white"}`}
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-zinc-400 group-hover:text-black" />
                        <span>Official Careers Portal</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    {/* LinkedIn Company Jobs Link */}
                    <a
                      href={linkedinCompanyJobsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 border font-bold flex items-center justify-between uppercase transition-all cursor-pointer ${isLight ? "border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900" : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white"}`}
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-zinc-400 group-hover:text-black" />
                        <span>LinkedIn Company Jobs</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    {/* LinkedIn Referral Search Link */}
                    <a
                      href={linkedinSearchUrlWithRole}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 border font-bold flex items-center justify-between uppercase transition-all cursor-pointer ${isLight ? "border-slate-300 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900" : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white"}`}
                    >
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-400 group-hover:text-black" />
                        <span>LOOK FOR REFERRALS</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsReferrals;
