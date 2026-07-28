import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Search, 
  Linkedin, 
  Building2, 
  Sparkles, 
  Users, 
  UserCheck, 
  Compass,
  ArrowUpRight,
  XCircle
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

  const activeRoleKeyword = customRoleInput.trim() || selectedRoleTitle.trim();

  // Filtered Company List
  const filteredCompanies = useMemo(() => {
    return TOP_50_COMPANIES.filter(comp => {
      const matchesSearch = companySearchQuery === '' || 
        comp.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(companySearchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
        comp.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [companySearchQuery, selectedCategory]);

  const categories = ['All', 'IT services', 'SaaS', 'Big Tech', 'Cybersecurity', 'Fintech', 'Digital'];

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-mono">
      {/* Top Banner Header */}
      <header className="max-w-7xl mx-auto mb-8 border-2 border-zinc-800 bg-zinc-950 rounded-none p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-2 uppercase">
                <Briefcase className="w-8 h-8 text-white" />
                MapIT Jobs &amp; LinkedIn Referrals
              </h1>
              <span className="bg-yellow-400 text-black px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-xs tracking-wide shrink-0 font-mono">
                beta
              </span>
            </div>
            <p className="text-zinc-400 text-sm md:text-base max-w-3xl font-sans">
              Discover {TOP_50_COMPANIES.length}+ curated technology employers, explore official LinkedIn career portals, and connect with employees directly on LinkedIn for referral requests.
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
              placeholder="e.g. Site Reliability Engineer, AI Researcher..."
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
              placeholder="Search among 250+ companies (e.g. TCS, Google, NVIDIA)..."
              value={companySearchQuery}
              onChange={(e) => setCompanySearchQuery(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-none px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white transition-all font-mono"
            />
          </div>
        </div>

        {/* Category Pills & Active Keyword Badge */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
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
      </header>

      {/* Main Companies Grid */}
      <main className="max-w-7xl mx-auto">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950 border-2 border-zinc-800 rounded-none p-8">
            <Building2 className="w-12 h-12 text-zinc-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-bold text-zinc-200 mb-2 uppercase">No matching companies found</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6 font-sans">
              Try adjusting your search query or clearing category filters to view all {TOP_50_COMPANIES.length} technology employers.
            </p>
            <button
              onClick={() => {
                setCompanySearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase border border-zinc-700 text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp, idx) => {
              const careerSearchUrl = getCompanyCareerSearchUrl(comp, activeRoleKeyword);
              const linkedInEmployeeUrl = getLinkedInSearchUrl(comp.name, activeRoleKeyword, 'referral');
              const linkedInRecruiterUrl = getLinkedInSearchUrl(comp.name, activeRoleKeyword, 'recruiter');
              const linkedInJobsUrl = comp.jobsSectionLink || (comp.companySlug ? `https://www.linkedin.com/company/${comp.companySlug}/jobs/` : careerSearchUrl);
              const linkedInChannelUrl = comp.companyChannelLink || (comp.companySlug ? `https://www.linkedin.com/company/${comp.companySlug}/` : careerSearchUrl);

              return (
                <div
                  key={`${comp.name}-${idx}`}
                  className="bg-zinc-950 border-2 border-zinc-800 hover:border-zinc-600 rounded-none p-6 transition-all duration-200 shadow-xl flex flex-col justify-between space-y-5"
                >
                  <div>
                    {/* Top Header Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3 font-mono">
                      <span className="text-xs px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700 font-medium">
                        {comp.category}
                      </span>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 uppercase font-sans">
                      <Building2 className="w-5 h-5 text-zinc-400 shrink-0" />
                      {comp.name}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-4 border-t border-zinc-800 font-mono text-xs">
                    {/* LinkedIn Company Jobs Listing Tab */}
                    <a
                      href={linkedInJobsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-none flex items-center justify-between font-mono font-bold uppercase transition-all group"
                      title={`Open official LinkedIn Jobs section for ${comp.name}`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span className="truncate">Official LinkedIn Jobs Tab</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>

                    {/* LinkedIn Referral Search */}
                    <a
                      href={linkedInEmployeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-white hover:bg-zinc-200 text-black border border-white rounded-none flex items-center justify-between font-mono font-bold uppercase transition-all group"
                      title={`Find current ${comp.name} employees on LinkedIn for referral`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Users className="w-4 h-4 text-black shrink-0" />
                        <span className="truncate">⚡ Find Referrals on LinkedIn</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>

                    {/* LinkedIn Recruiter Search */}
                    <a
                      href={linkedInRecruiterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-none flex items-center justify-between font-mono font-medium transition-all group"
                      title={`Find recruiters at ${comp.name} on LinkedIn`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <UserCheck className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="truncate">👔 Find Recruiters on LinkedIn</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </a>

                    {/* LinkedIn Channel Page Link */}
                    {comp.companyChannelLink && (
                      <a
                        href={linkedInChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-4 text-zinc-400 hover:text-white flex items-center justify-between text-[11px] transition-colors"
                        title={`Open ${comp.name} main company page on LinkedIn`}
                      >
                        <span className="truncate">Official Company Channel</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
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
