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
  Phone
} from 'lucide-react';
import { ALL_ROLES_DATA, RoleDetail } from '../data/rolesData';
import { interviewQDatabase, InterviewQItem } from '../data/interviewQDatabase';
import { TOP_50_COMPANIES, CompanyInfo, getLinkedInSearchUrl } from '../data/topCompaniesData';
import { RAW_DIRECTORY_DATABASE, HRContact } from './HRContacts';
import { CERTIFICATIONS_LIBRARY, CertLibraryItem } from '../data/librariesData';

interface SearchResultsViewProps {
  query: string;
  onNavigateTab: (tabId: string, params?: any) => void;
  onSelectRole: (roleId: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  onNavigateTab,
  onSelectRole
}) => {
  const cleanQuery = (query || '').trim().toLowerCase();

  // 1. Matched Job Roles
  const matchedRoles = useMemo(() => {
    if (!cleanQuery) return [];
    return Object.values(ALL_ROLES_DATA).filter((role: RoleDetail) => 
      role.title.toLowerCase().includes(cleanQuery) ||
      role.domain.toLowerCase().includes(cleanQuery) ||
      (role.roleAsk && role.roleAsk.explanation && role.roleAsk.explanation.toLowerCase().includes(cleanQuery)) ||
      (role.mustHaves && role.mustHaves.tech && role.mustHaves.tech.some(s => s.toLowerCase().includes(cleanQuery))) ||
      (role.toolsToLearn && role.toolsToLearn.some(t => t.toLowerCase().includes(cleanQuery)))
    ).slice(0, 12);
  }, [cleanQuery]);

  // 2. Matched Interview Questions & Labs
  const matchedInterviewQ = useMemo(() => {
    if (!cleanQuery) return [];
    return interviewQDatabase.filter((q: InterviewQItem) => 
      q.prompt.toLowerCase().includes(cleanQuery) ||
      q.preferred_answer.toLowerCase().includes(cleanQuery) ||
      q.domain.toLowerCase().includes(cleanQuery) ||
      q.id.toLowerCase().includes(cleanQuery)
    ).slice(0, 12);
  }, [cleanQuery]);

  // 3. Matched Companies (Jobs & Referrals)
  const matchedCompanies = useMemo(() => {
    if (!cleanQuery) return [];
    return TOP_50_COMPANIES.filter((comp: CompanyInfo) => 
      comp.name.toLowerCase().includes(cleanQuery) ||
      comp.category.toLowerCase().includes(cleanQuery)
    ).slice(0, 12);
  }, [cleanQuery]);

  // 4. Matched HR Contacts
  const matchedHRContacts = useMemo(() => {
    if (!cleanQuery) return [];
    const results: Array<{ country: string; city: string; contact: HRContact }> = [];
    
    for (const [countryCode, cities] of Object.entries(RAW_DIRECTORY_DATABASE)) {
      for (const [cityName, contacts] of Object.entries(cities)) {
        for (const c of contacts) {
          if (
            c.companyName.toLowerCase().includes(cleanQuery) ||
            c.category.toLowerCase().includes(cleanQuery) ||
            cityName.toLowerCase().includes(cleanQuery)
          ) {
            results.push({
              country: countryCode === 'IN' ? 'India' : 'Philippines',
              city: cityName,
              contact: c
            });
            if (results.length >= 10) break;
          }
        }
        if (results.length >= 10) break;
      }
      if (results.length >= 10) break;
    }
    return results;
  }, [cleanQuery]);

  // 5. Matched Certifications & Resources
  const matchedResources = useMemo(() => {
    if (!cleanQuery) return [];
    return CERTIFICATIONS_LIBRARY.filter((item: CertLibraryItem) => 
      item.name.toLowerCase().includes(cleanQuery) ||
      item.provider.toLowerCase().includes(cleanQuery) ||
      (item.description && item.description.toLowerCase().includes(cleanQuery))
    ).slice(0, 10);
  }, [cleanQuery]);

  const totalResultsCount = matchedRoles.length + matchedInterviewQ.length + matchedCompanies.length + matchedHRContacts.length + matchedResources.length;

  if (!cleanQuery) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-mono flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center mb-4 text-zinc-400">
          <Search className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black uppercase text-white mb-2">Global Search Console</h2>
        <p className="text-zinc-400 text-sm max-w-md font-sans mb-6">
          Type any keyword, role, company, certification, question topic, or HR directory location into the search bar above to query all sections simultaneously.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-mono">
      {/* Search Header Banner */}
      <header className="max-w-7xl mx-auto mb-8 border-2 border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-2 uppercase">
                <Search className="w-8 h-8 text-white" />
                Global Search Results
              </h1>
              <span className="bg-white text-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
                {totalResultsCount} RESULTS FOUND
              </span>
            </div>
            <p className="text-zinc-400 text-sm md:text-base font-sans">
              Displaying filtered search results for <span className="text-white font-bold font-mono">"{cleanQuery}"</span> across all MapIT sections with direct navigation links.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-4 py-3 border border-zinc-700 shrink-0">
            <span className="text-white font-bold block uppercase">Index Coverage</span>
            <span className="text-[10px] text-zinc-400">Job Roles • InterviewQ • Companies • HR • Resources</span>
          </div>
        </div>

        {/* Category Breakdown Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-200">
            💼 Roles ({matchedRoles.length})
          </span>
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-200">
            ⚡ InterviewQ ({matchedInterviewQ.length})
          </span>
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-200">
            🏢 Companies ({matchedCompanies.length})
          </span>
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-200">
            👥 HR Contacts ({matchedHRContacts.length})
          </span>
          <span className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-200">
            📖 Resources ({matchedResources.length})
          </span>
        </div>
      </header>

      {/* Main Results Container */}
      <main className="max-w-7xl mx-auto space-y-10">
        {totalResultsCount === 0 ? (
          <div className="text-center py-16 bg-zinc-950 border-2 border-zinc-800 p-8">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-zinc-200 mb-2 uppercase">No matching results found</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto font-sans">
              No direct matches found for "{cleanQuery}". Try checking for spelling errors or searching for broader terms like "DevOps", "Java", "Delhi", "Security", or "AWS".
            </p>
          </div>
        ) : (
          <>
            {/* 1. MATCHED JOB ROLES SECTION */}
            {matchedRoles.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-white" />
                    Job Roles ({matchedRoles.length})
                  </h2>
                  <span className="text-xs text-zinc-400">Click role to open in Career Map</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedRoles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => {
                        onSelectRole(role.id);
                        onNavigateTab('map');
                      }}
                      className="bg-zinc-950 border-2 border-zinc-800 hover:border-white p-5 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700">
                            {role.domain}
                          </span>
                          <span className="text-[10px] text-zinc-400">{role.level || 'Mid-Level'}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:underline font-sans mb-1">
                          {role.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">
                          {role.roleAsk?.explanation || 'Comprehensive career role details and roadmap in MapIT.'}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-white font-bold uppercase">
                        <span>View Role Roadmap</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 2. MATCHED INTERVIEW QUESTIONS & LABS */}
            {matchedInterviewQ.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-white" />
                    Interview Questions &amp; Practical Labs ({matchedInterviewQ.length})
                  </h2>
                  <span className="text-xs text-zinc-400">Click to open in InterviewQ</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedInterviewQ.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onNavigateTab('interviewq')}
                      className="bg-zinc-950 border-2 border-zinc-800 hover:border-white p-5 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white text-black">
                            {item.id}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700">
                            {item.difficulty}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white font-sans line-clamp-2 mb-2 group-hover:underline">
                          {item.prompt}
                        </h3>
                        <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">
                          {item.preferred_answer}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-white font-bold uppercase">
                        <span className="text-zinc-400 font-mono text-[10px]">{item.domain}</span>
                        <span className="flex items-center gap-1">
                          View Answer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. MATCHED JOBS & REFERRALS COMPANIES */}
            {matchedCompanies.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-white" />
                    Companies &amp; LinkedIn Portals ({matchedCompanies.length})
                  </h2>
                  <span className="text-xs text-zinc-400">Click to open in Jobs section</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedCompanies.map((comp) => {
                    const linkedInJobsUrl = comp.jobsSectionLink || (comp.companySlug ? `https://www.linkedin.com/company/${comp.companySlug}/jobs/` : comp.careerUrl);
                    const referralUrl = getLinkedInSearchUrl(comp.name, '', 'referral');

                    return (
                      <div
                        key={comp.name}
                        className="bg-zinc-950 border-2 border-zinc-800 hover:border-zinc-500 p-5 transition-all flex flex-col justify-between space-y-4"
                      >
                        <div>
                          <span className="text-[10px] px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700 font-medium">
                            {comp.category}
                          </span>
                          <h3 className="text-lg font-bold text-white uppercase font-sans mt-2">
                            {comp.name}
                          </h3>
                        </div>

                        <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs">
                          <a
                            href={linkedInJobsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 flex items-center justify-between font-bold uppercase transition-all"
                          >
                            <span>LinkedIn Jobs Tab</span>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                          </a>
                          <a
                            href={referralUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 bg-white hover:bg-zinc-200 text-black border border-white flex items-center justify-between font-bold uppercase transition-all"
                          >
                            <span>Find Referrals</span>
                            <Users className="w-3.5 h-3.5 text-black" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 4. MATCHED HR CONTACTS */}
            {matchedHRContacts.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    HR Contacts &amp; Directories ({matchedHRContacts.length})
                  </h2>
                  <span className="text-xs text-zinc-400">Click to open HR Contacts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedHRContacts.map(({ country, city, contact }) => (
                    <div
                      key={contact.companyName}
                      onClick={() => onNavigateTab('hr-contacts')}
                      className="bg-zinc-950 border-2 border-zinc-800 hover:border-white p-4 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 text-[10px] text-zinc-400 mb-1">
                          <span>{country} • {city}</span>
                          <span>★ {contact.rating.toFixed(1)}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase font-sans mb-1">
                          {contact.companyName}
                        </h3>
                        <div className="text-xs text-zinc-400 font-sans flex items-center gap-2">
                          <Phone className="w-3 h-3 text-zinc-500" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-white font-bold uppercase">
                        <span>{contact.category}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. MATCHED RESOURCES & COURSES */}
            {matchedResources.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-2">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-white" />
                    Resources, Courses &amp; Certifications ({matchedResources.length})
                  </h2>
                  <span className="text-xs text-zinc-400">Click to open in Resources tab</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedResources.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onNavigateTab('libraries')}
                      className="bg-zinc-950 border-2 border-zinc-800 hover:border-white p-5 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700">
                            {item.difficulty}
                          </span>
                          {item.provider && (
                            <span className="text-[10px] text-zinc-400">{item.provider}</span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white font-sans mb-1 group-hover:underline">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-white font-bold uppercase">
                        <span>Open Resource</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SearchResultsView;
