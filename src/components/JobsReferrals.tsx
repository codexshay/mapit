import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Search, 
  Linkedin, 
  Building2, 
  Filter, 
  Sparkles, 
  Users, 
  UserCheck, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { TOP_50_COMPANIES, CompanyInfo, getCompanyCareerSearchUrl, getLinkedInSearchUrl } from '../data/topCompaniesData';
import { ALL_ROLES_DATA } from '../data/rolesData';

export const JobsReferrals: React.FC = () => {
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('DevOps Engineer');
  const [customRoleInput, setCustomRoleInput] = useState<string>('');
  const [companySearchQuery, setCompanySearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // List of MapIT Role Titles
  const roleOptions = useMemo(() => {
    const list = Object.values(ALL_ROLES_DATA).map(r => r.title);
    return Array.from(new Set(list)).sort();
  }, []);

  const activeRoleKeyword = customRoleInput.trim() || selectedRoleTitle;

  // Filtered Company List
  const filteredCompanies = useMemo(() => {
    return TOP_50_COMPANIES.filter(comp => {
      const matchesSearch = companySearchQuery === '' || 
        comp.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
        comp.rank.toString().includes(companySearchQuery);
      
      const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [companySearchQuery, selectedCategory]);

  const categories = ['All', 'Big Tech', 'IT Services', 'SaaS & Cloud', 'CyberSecurity', 'FinTech & Consumer'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-8 font-sans">
      {/* Top Banner Header */}
      <header className="max-w-7xl mx-auto mb-8 border border-slate-800 bg-gradient-to-r from-slate-900/90 via-[#0d1527] to-slate-900/90 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <Briefcase className="w-8 h-8 text-emerald-400" />
                MapIT Jobs &amp; LinkedIn Referrals
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                TOP 50 TECH COMPANIES
              </span>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-3xl">
              Search for open career opportunities across official tech portals with embedded role keywords and connect with employees directly on LinkedIn for referral requests.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-800/60 px-4 py-3 rounded-xl border border-slate-700/60 shrink-0">
            <Linkedin className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <div className="font-semibold text-slate-200">LinkedIn Network Sync</div>
              <div>Direct Employee &amp; Recruiter Search</div>
            </div>
          </div>
        </div>

        {/* Role & Keyword Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Preset Role Selector */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Target Role Profile
            </label>
            <select
              value={selectedRoleTitle}
              onChange={(e) => {
                setSelectedRoleTitle(e.target.value);
                setCustomRoleInput('');
              }}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-all font-sans"
            >
              {roleOptions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Custom Role Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Or Custom Keyword
            </label>
            <input
              type="text"
              placeholder="e.g. Site Reliability Engineer, AI Researcher..."
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
            />
          </div>

          {/* Filter Company Input */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Search Company
            </label>
            <input
              type="text"
              placeholder="Filter company (e.g. Google, NVIDIA)..."
              value={companySearchQuery}
              onChange={(e) => setCompanySearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
            />
          </div>
        </div>

        {/* Category Pills & Active Keyword Badge */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Embedded Search Keyword:</span>
            <span className="text-emerald-400 font-bold font-sans">"{activeRoleKeyword}"</span>
          </div>
        </div>
      </header>

      {/* Main Companies Grid */}
      <main className="max-w-7xl mx-auto">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-slate-200 mb-2">No matching companies found</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Try adjusting your search query or clearing category filters to view the rest of the Top 50 Tech Employers.
            </p>
            <button
              onClick={() => {
                setCompanySearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium border border-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp) => {
              const careerSearchUrl = getCompanyCareerSearchUrl(comp, activeRoleKeyword);
              const linkedInEmployeeUrl = getLinkedInSearchUrl(comp.name, activeRoleKeyword, 'referral');
              const linkedInRecruiterUrl = getLinkedInSearchUrl(comp.name, activeRoleKeyword, 'recruiter');

              return (
                <div
                  key={comp.rank}
                  className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-200 shadow-xl flex flex-col justify-between space-y-5"
                >
                  <div>
                    {/* Top Header info */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                        RANK #{comp.rank}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">
                        {comp.category}
                      </span>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-slate-400 shrink-0" />
                      {comp.name}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80 font-mono text-xs">
                    {/* Official Career Portal Search */}
                    <a
                      href={careerSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl flex items-center justify-between font-sans font-semibold transition-all group"
                      title={`Open official ${comp.name} career portal with keyword "${activeRoleKeyword}"`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">Official Career Portal</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>

                    {/* LinkedIn Referral Search */}
                    <a
                      href={linkedInEmployeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-xl flex items-center justify-between font-sans font-semibold transition-all group"
                      title={`Find current ${comp.name} employees on LinkedIn for referral`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Users className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="truncate">⚡ Find Referrals on LinkedIn</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>

                    {/* LinkedIn Recruiter Search */}
                    <a
                      href={linkedInRecruiterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-xl flex items-center justify-between font-sans font-medium transition-all group"
                      title={`Find recruiters at ${comp.name} on LinkedIn`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">👔 Find Recruiters on LinkedIn</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsReferrals;
