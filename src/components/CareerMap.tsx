import React, { useState, useEffect, useRef } from 'react';
import { IT_DOMAINS, ALL_ROLES_DATA, Domain, RoleDetail } from '../data/rolesData';
import { Search, Filter, HelpCircle, Network, Flame, Sparkles, BookOpen, Layers, ChevronDown, ChevronUp, ArrowRight, Scale, ExternalLink } from 'lucide-react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import { motion, AnimatePresence } from 'motion/react';
import ITTaxonomyExplorer from './ITTaxonomyExplorer';
import RoleComparison from './RoleComparison';
import MobileRolesViewer from './MobileRolesViewer';

export function getNumericSalary(role: any, region: 'global' | 'india'): number {
  if (!role) return 0;
  if (region === 'india') {
    // e.g. "₹3.5L - ₹6.5L" or "₹14L - ₹25L"
    const str = role.indiaSalary || '';
    const matches = str.match(/[\d.]+/g);
    if (matches && matches.length > 0) {
      const vals = matches.map(Number);
      // return average for sorting
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    }
    return 0;
  } else {
    // e.g. "$48,000 - $72,000"
    const str = role.globalSalary || '';
    const cleanStr = str.replace(/,/g, '');
    const matches = cleanStr.match(/[\d.]+/g);
    if (matches && matches.length > 0) {
      const vals = matches.map(Number);
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    }
    return 0;
  }
}

interface CareerMapProps {
  theme?: 'dark' | 'light';
  onSelectRole: (roleId: string) => void;
  selectedRoleId: string | null;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilters: {
    beginnerFriendly: boolean;
    noCoding: boolean;
    highPaying: boolean;
    remoteFriendly: boolean;
    marketRegion: 'global' | 'india';
    difficultyLevel: 'all' | 'Entry-level' | 'Mid-level' | 'Advanced';
    sortBySalary: 'default' | 'high-to-low' | 'low-to-high';
  };
  setActiveFilters: any;
  isHighlighted?: boolean;
  bookmarks?: any[];
  toggleBookmark?: (item: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  activeDomainId?: string | null;
  setActiveDomainId?: (id: string | null) => void;
  onNavigateToSection?: (
    sectionType: 'certs' | 'tools-skills' | 'channels' | 'bookshelf' | 'hackathons' | 'youtubeTeachers' | 'map' | 'taxonomy' | 'libraries',
    queryText: string
  ) => void;
  taxonomyCategoryId?: string | null;
  setTaxonomyCategoryId?: (id: string | null) => void;
  taxonomyRoleSlug?: string | null;
  setTaxonomyRoleSlug?: (slug: string | null) => void;
  viewMode?: 'mindmap' | 'taxonomy' | 'comparison';
  setViewMode?: (mode: 'mindmap' | 'taxonomy' | 'comparison') => void;
}

export default function CareerMap({
  theme = 'dark',
  onSelectRole,
  selectedRoleId,
  searchQuery,
  setSearchQuery,
  activeFilters,
  setActiveFilters,
  isHighlighted = false,
  bookmarks = [],
  toggleBookmark,
  isBookmarked,
  activeDomainId: activeDomainIdProp,
  setActiveDomainId: setActiveDomainIdProp,
  onNavigateToSection,
  taxonomyCategoryId,
  setTaxonomyCategoryId,
  taxonomyRoleSlug,
  setTaxonomyRoleSlug,
  viewMode: viewModeProp,
  setViewMode: setViewModeProp
}: CareerMapProps) {
  const isLight = theme === 'light';
  const [localActiveDomainId, setLocalActiveDomainId] = useState<string | null>('green-computing');
  const activeDomainId = activeDomainIdProp !== undefined ? activeDomainIdProp : localActiveDomainId;
  const setActiveDomainId = setActiveDomainIdProp || setLocalActiveDomainId;
  const [localViewMode, setLocalViewMode] = useState<'mindmap' | 'taxonomy' | 'comparison'>('mindmap');
  const viewMode = viewModeProp !== undefined ? viewModeProp : localViewMode;
  const setViewMode = setViewModeProp || setLocalViewMode;
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [tooltipDirection, setTooltipDirection] = useState<'up' | 'down'>('up');
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'categories' | 'roles'>('categories');
  const [showAllDomains, setShowAllDomains] = useState<boolean>(false);
  const [showAllRoles, setShowAllRoles] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (viewMode !== 'taxonomy') {
      setTaxonomyCategoryId?.(null);
      setTaxonomyRoleSlug?.(null);
    }
  }, [viewMode, setTaxonomyCategoryId, setTaxonomyRoleSlug]);

  useEffect(() => {
    setShowAllDomains(false);
    setShowAllRoles(false);
  }, [activeDomainId]);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains(prev => ({
      ...prev,
      [domainId]: prev[domainId] === undefined ? false : !prev[domainId]
    }));
  };

  const isDomainExpanded = (domainId: string, domainRoles: any[]) => {
    if (expandedDomains[domainId] !== undefined) {
      return expandedDomains[domainId];
    }
    if (searchQuery.trim().length > 0) return true;
    if (selectedRoleId && domainRoles.some(r => r && r.id === selectedRoleId)) return true;
    return false;
  };

  // Filter computation for roles in each domain
  const getFilteredRolesForDomain = (domain: Domain) => {
    const matched = domain.roles
      .map(id => ALL_ROLES_DATA[id])
      .filter(role => {
        if (!role) return false;
        
        // Search match
        const matchesSearch = searchQuery.trim() === '' || 
          role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role.mustHaves.tech.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
          role.toolsToLearn.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          role.recommendedCertifications.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        // Beginner friendly (Entry-level)
        if (activeFilters.beginnerFriendly && role.level !== 'Entry-level') return false;

        // No coding
        if (activeFilters.noCoding && role.isCoding) return false;

        // High paying
        if (activeFilters.highPaying && !role.isHighPaying) return false;

        // Remote friendly
        if (activeFilters.remoteFriendly && !role.isRemote) return false;

        // Difficulty level
        if (activeFilters.difficultyLevel !== 'all' && role.level !== activeFilters.difficultyLevel) return false;

        return true;
      });

    // Sort salaries by current country/market selections
    if (activeFilters.sortBySalary === 'high-to-low') {
      matched.sort((a, b) => getNumericSalary(b, activeFilters.marketRegion) - getNumericSalary(a, activeFilters.marketRegion));
    } else if (activeFilters.sortBySalary === 'low-to-high') {
      matched.sort((a, b) => getNumericSalary(a, activeFilters.marketRegion) - getNumericSalary(b, activeFilters.marketRegion));
    }

    return matched;
  };

  // Reset search & filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilters({
      beginnerFriendly: false,
      noCoding: false,
      highPaying: false,
      remoteFriendly: false,
      marketRegion: 'india',
      difficultyLevel: 'all',
      sortBySalary: 'default'
    });
  };

  // Adjust activeDomainId if the active selection has 0 matches
  useEffect(() => {
    const isFiltered = searchQuery.trim() !== '' || 
      activeFilters.beginnerFriendly || 
      activeFilters.noCoding || 
      activeFilters.highPaying || 
      activeFilters.remoteFriendly || 
      activeFilters.difficultyLevel !== 'all';

    if (isFiltered) {
      if (activeDomainId) {
        const activeDomain = IT_DOMAINS.find(d => d.id === activeDomainId);
        if (activeDomain) {
          const matchesCount = getFilteredRolesForDomain(activeDomain).length;
          if (matchesCount === 0) {
            const firstDomainWithMatches = IT_DOMAINS.find(d => getFilteredRolesForDomain(d).length > 0);
            if (firstDomainWithMatches) {
              setActiveDomainId(firstDomainWithMatches.id);
            } else {
              setActiveDomainId(null);
            }
          }
        } else {
          const firstDomainWithMatches = IT_DOMAINS.find(d => getFilteredRolesForDomain(d).length > 0);
          if (firstDomainWithMatches) {
            setActiveDomainId(firstDomainWithMatches.id);
          }
        }
      } else {
        const firstDomainWithMatches = IT_DOMAINS.find(d => getFilteredRolesForDomain(d).length > 0);
        if (firstDomainWithMatches) {
          setActiveDomainId(firstDomainWithMatches.id);
        }
      }
    } else {
      if (!activeDomainId) {
        setActiveDomainId('green-computing');
      }
    }
  }, [searchQuery, activeFilters]);

  // Total matching count
  const totalMatching = IT_DOMAINS.reduce((sum, d) => sum + getFilteredRolesForDomain(d).length, 0);

  return (
    <div 
      className={`w-full rounded-none relative overflow-hidden transition-all duration-300 ${
        isLight ? 'bg-white text-slate-800' : 'bg-[#070b13] text-white'
      } ${
        isMobile 
          ? 'border-0 px-0 py-1 md:p-6 shadow-none' 
          : `border-2 p-2 sm:p-4 md:p-6 ${
              isHighlighted 
                ? '!border-white border-blink z-30 shadow-[0_0_20px_#fff]' 
                : (isLight 
                    ? 'border-gray-200 shadow-[4px_4px_0px_0px_#cbd5e1]' 
                    : 'border-[#121c38] shadow-[4px_4px_0px_0px_#1e2e54]')
            }`
      }`} 
      id="career-map-block"
    >
      {/* Dynamic Grid Background/Retro Scanlines effect */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: isLight ? 'none' : `
            radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0),
            linear-gradient(rgba(18, 28, 56, 0.5) 2px, transparent 2px),
            linear-gradient(90deg, rgba(18, 28, 56, 0.5) 2px, transparent 2px)
          `,
          backgroundSize: '24px 24px, 100% 4px, 4px 100%',
          opacity: isLight ? 0 : 0.03
        }}
      />

      {/* Control Header */}
      <div className={`relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b-2 ${isLight ? 'border-gray-200' : 'border-[#121c38]'} pb-4 sm:pb-6 mb-4 sm:mb-6 flex-wrap`}>
        <div>
          <h2 className="text-xl sm:text-2xl font-mono tracking-tight flex items-center gap-2">
          </h2>
        </div>

        {/* View Switch / Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            id="btn-view-mindmap"
            onClick={() => setViewMode('mindmap')}
            className={`px-3 py-1.5 font-mono text-xs border-2 uppercase transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'mindmap' 
                ? 'bg-[#10b981] text-black border-[#10b981] font-bold shadow-[2px_2px_0px_#05402a]'
                : (isLight ? 'text-gray-600 border-gray-300 hover:text-[#10b981] hover:border-[#10b981] bg-white' : 'text-gray-400 border-[#121c38] hover:text-[#10b981] hover:border-[#10b981]')
            }`}
            title="Mind-Map Nodes"
          >
            <Network className="w-4 h-4 shrink-0" />
          </button>
          
          <button 
            id="btn-view-taxonomy"
            onClick={() => setViewMode('taxonomy')}
            className={`px-3 py-1.5 font-mono text-xs border-2 uppercase transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'taxonomy' 
                ? 'bg-[#10b981] text-black border-[#10b981] font-bold shadow-[2px_2px_0px_#05402a]'
                : (isLight ? 'text-gray-600 border-gray-300 hover:text-[#10b981] hover:border-[#10b981] bg-white' : 'text-gray-400 border-[#121c38] hover:text-[#10b981] hover:border-[#10b981]')
            }`}
            title="Taxonomy Map"
          >
            <Layers className="w-4 h-4 shrink-0" />
          </button>

          <button 
            id="btn-view-comparison"
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1.5 font-mono text-xs border-2 uppercase transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'comparison' 
                ? 'bg-[#10b981] text-black border-[#10b981] font-bold shadow-[2px_2px_0px_#05402a]'
                : (isLight ? 'text-gray-600 border-gray-300 hover:text-[#10b981] hover:border-[#10b981] bg-white' : 'text-gray-400 border-[#121c38] hover:text-[#10b981] hover:border-[#10b981]')
            }`}
            title="Comparator"
          >
            <Scale className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Live Search and Filter Controls */}
      <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6 border-y border-x-0 sm:border-2 p-2.5 sm:p-4 ${
        isLight 
          ? 'bg-slate-50 border-gray-200 text-slate-800' 
          : 'bg-[#080b14] border-[#1e2e54] text-white'
      }`}>
        {/* Search Input */}
        <div className="lg:col-span-5 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            id="search-input"
            type="text"
            placeholder="Search roles, certs, or tools (e.g. 'CCNA', 'SQL', 'Intune')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border-2 pl-10 pr-4 py-2 text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-[#10b981] rounded-none ${
              isLight 
                ? 'bg-white border-gray-300 text-slate-900' 
                : 'bg-[#05070a] border-[#121c38] text-white'
            }`}
          />
        </div>

        {/* Level Selector */}
        <div className={`lg:col-span-3 flex items-center border-2 px-2 ${
          isLight ? 'bg-white border-gray-300' : 'bg-[#05070a] border-[#121c38]'
        }`}>
          <span className="font-mono text-xs text-gray-500 mr-2 whitespace-nowrap">Tier:</span>
          <select
            id="select-tier"
            value={activeFilters.difficultyLevel}
            onChange={(e) => setActiveFilters({ ...activeFilters, difficultyLevel: e.target.value })}
            className={`w-full bg-transparent text-xs font-mono focus:outline-none border-none py-1.5 cursor-pointer ${
              isLight ? 'text-emerald-700' : 'text-[#10b981]'
            }`}
          >
            <option value="all" className={isLight ? 'bg-white text-slate-900' : 'bg-[#05070a] text-white'}>All Classifications</option>
            <option value="Entry-level" className={isLight ? 'bg-white text-slate-900' : 'bg-[#05070a] text-white'}>Entry-level (Students/Switchers)</option>
            <option value="Mid-level" className={isLight ? 'bg-white text-slate-900' : 'bg-[#05070a] text-white'}>Mid-level (Professionals)</option>
            <option value="Advanced" className={isLight ? 'bg-white text-slate-900' : 'bg-[#05070a] text-white'}>Advanced (Architects/SREs)</option>
          </select>
        </div>

        {/* Filter Quick Toggles */}
        <div className="lg:col-span-4 flex flex-wrap gap-2 items-center justify-between">
          <button 
            id="toggle-filters-box"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 border-2 font-mono text-xs rounded-none flex items-center gap-1.5 transition-all ${
              showFilters || Object.values(activeFilters).some(v => v === true)
                ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10'
                : 'border-[#1e2e54] text-gray-400 hover:border-gray-500'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {showFilters ? 'Hide Fine Controls' : 'Show Advanced Filters'}
          </button>

          {(searchQuery || Object.values(activeFilters).some(v => v === true || v === 'Entry-level' || v === 'Mid-level' || v === 'Advanced')) && (
            <button
              id="clear-all-filters"
              onClick={handleResetFilters}
              className="text-[#ef4444] font-mono text-xs underline hover:text-[#ff6b6b] transition"
            >
              Reset All ({totalMatching} found)
            </button>
          )}
        </div>

        {/* Expanding Advanced Filters Box */}
        {showFilters && (
          <div id="career-map-advanced-filters" className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#121c38]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="filter-beginner"
                type="checkbox"
                checked={activeFilters.beginnerFriendly}
                onChange={(e) => setActiveFilters({ ...activeFilters, beginnerFriendly: e.target.checked })}
                className="w-4 h-4 rounded-none accent-[#10b981] bg-[#05070a] border-2 border-[#121c38]"
              />
              <span className="font-mono text-xs text-white">Beginner friendly (Entry)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="filter-nocoding"
                type="checkbox"
                checked={activeFilters.noCoding}
                onChange={(e) => setActiveFilters({ ...activeFilters, noCoding: e.target.checked })}
                className="w-4 h-4 rounded-none accent-[#10b981] bg-[#05070a] border-2 border-[#121c38]"
              />
              <span className="font-mono text-xs text-white">Zero Coding roles</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="filter-highpaying"
                type="checkbox"
                checked={activeFilters.highPaying}
                onChange={(e) => setActiveFilters({ ...activeFilters, highPaying: e.target.checked })}
                className="w-4 h-4 rounded-none accent-[#10b981] bg-[#05070a] border-2 border-[#121c38]"
              />
              <span className="font-mono text-xs text-white">High Paying tiers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="filter-remote"
                type="checkbox"
                checked={activeFilters.remoteFriendly}
                onChange={(e) => setActiveFilters({ ...activeFilters, remoteFriendly: e.target.checked })}
                className="w-4 h-4 rounded-none accent-[#10b981] bg-[#05070a] border-2 border-[#121c38]"
              />
              <span className="font-mono text-xs text-white">Remote friendly</span>
            </label>

            <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0c1224] p-2 border border-[#1e2e54] text-xs font-mono text-gray-400">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-white font-bold">Market Mode:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="market-group"
                    checked={activeFilters.marketRegion === 'global'}
                    onChange={() => setActiveFilters({ ...activeFilters, marketRegion: 'global' })}
                    className="accent-[#10b981]"
                  />
                  Global ($ USD)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="market-group"
                    checked={activeFilters.marketRegion === 'india'}
                    onChange={() => setActiveFilters({ ...activeFilters, marketRegion: 'india' })}
                    className="accent-[#10b981]"
                  />
                  Indian Market (₹ Lakhs)
                </label>
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-[#121c38]">
                <span className="text-white font-bold whitespace-nowrap">Sort Salary:</span>
                <select
                  id="salary-sorting-dropdown"
                  value={activeFilters.sortBySalary}
                  onChange={(e) => setActiveFilters({ ...activeFilters, sortBySalary: e.target.value })}
                  className="bg-[#05070a] border border-[#1e2e54] text-[#10b981] px-1.5 py-0.5 text-xs focus:outline-none focus:border-[#10b981] font-mono cursor-pointer"
                >
                  <option value="default">Default (No sort)</option>
                  <option value="high-to-low">Highest First 📈</option>
                  <option value="low-to-high">Lowest First 📉</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Map Presentation */}
      {viewMode === 'mindmap' && isMobile && (
        <div className="flex border-2 border-[#121c38]/80 bg-[#05070a] mb-4 font-mono text-xs z-20 relative">
          <button
            type="button"
            onClick={() => setMobileTab('categories')}
            className={`flex-1 py-3 text-center font-bold border-r border-[#121c38]/80 transition-all cursor-pointer ${
              mobileTab === 'categories' 
                ? 'bg-[#10b981]/15 text-[#10b981] border-b-2 border-[#10b981]' 
                : 'text-gray-400'
            }`}
          >
            📂 Domains ({IT_DOMAINS.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('roles')}
            className={`flex-1 py-3 text-center font-bold transition-all cursor-pointer ${
              mobileTab === 'roles' 
                ? 'bg-[#10b981]/15 text-[#10b981] border-b-2 border-[#10b981]' 
                : 'text-gray-400'
            }`}
          >
            📋 Roles List ({activeDomainId ? getFilteredRolesForDomain(IT_DOMAINS.find(d => d.id === activeDomainId)!).length : 0})
          </button>
        </div>
      )}

      {viewMode === 'mindmap' ? (
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 min-h-[500px]">
          
          {/* LEFT COLUMN: The 10 IT Domains (Interactive Nodes) */}
          <div className={`${isMobile && mobileTab !== 'categories' ? 'hidden' : 'flex'} w-full lg:w-1/3 flex-col gap-3 pr-0 lg:pr-2 lg:border-r lg:border-[#121c38] lg:border-dashed`}>
            {(() => {
              const visibleDomains = IT_DOMAINS.filter((domain) => {
                const matchesCount = getFilteredRolesForDomain(domain).length;
                return matchesCount > 0;
              });

              if (visibleDomains.length === 0) {
                return (
                  <div className="p-8 text-center border-y border-dashed border-[#ef4444]/30 bg-[#0c0810] font-mono text-xs text-red-400/80 rounded-sm col-span-full">
                    ⚠️ No categories match your current search/filters. Try resetting or adjusting criteria.
                  </div>
                );
              }

              const slicedDomains = visibleDomains;

              return (
                <div className="flex flex-col gap-2.5 w-full">
                  <div 
                    className={`flex flex-col gap-2.5 w-full transition-all duration-300 pr-1 ${
                      showAllDomains 
                        ? 'max-h-none overflow-y-visible' 
                        : 'max-h-[820px] overflow-y-auto'
                    }`}
                    style={{ scrollbarWidth: 'thin' }}
                  >
                    {slicedDomains.map((domain) => {
                      const isActive = activeDomainId === domain.id;
                      const matchesCount = getFilteredRolesForDomain(domain).length;
                      
                      return (
                        <button
                          key={domain.id}
                          id={`domain-node-${domain.id}`}
                          onClick={() => {
                            setActiveDomainId(domain.id);
                            if (isMobile) {
                              setMobileTab('roles');
                              setTimeout(() => {
                                document.getElementById('career-map-roles-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 80);
                            }
                          }}
                          style={{ 
                            borderColor: isActive ? domain.color : '#121c38',
                            boxShadow: isActive ? `3px 3px 0px 0px ${domain.color}` : 'none'
                          }}
                          className={`p-4 sm:p-3 text-left border-y sm:border-2 border-x-0 sm:border-[#121c38] bg-[#081121] transition-all relative group rounded-none cursor-pointer ${
                            isActive ? 'bg-[#0f1d3a]' : 'hover:bg-[#0c162b]'
                          } w-full`}
                        >
                          {/* Domain custom identifier bar for styling */}
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-1.5" 
                            style={{ backgroundColor: domain.color }}
                          />
                          
                          <div className="pl-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                {domain.name}
                              </span>
                              
                              <span 
                                style={{ color: domain.color, backgroundColor: `${domain.color}15` }}
                                className="px-2 py-0.5 text-[10px] font-mono border"
                              >
                                {matchesCount} {matchesCount === 1 ? 'role' : 'roles'}
                              </span>
                            </div>
                          </div>

                          {/* Visual Connector Dot */}
                          {isActive && (
                            <div 
                              style={{ backgroundColor: domain.color }} 
                              className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border border-black z-20"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {visibleDomains.length > 12 && (
                    <button
                      onClick={() => setShowAllDomains(!showAllDomains)}
                      className="w-full mt-1 py-2 px-3 border border-[#1e2e54] hover:border-cyan-500/80 bg-[#070c18] hover:bg-[#0c162b] text-cyan-400 hover:text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 transition-all duration-200 rounded-none cursor-pointer group shadow-[1px_1px_0px_rgba(6,182,212,0.15)] hover:shadow-[3px_3px_0px_rgba(6,182,212,0.3)] select-none"
                    >
                      <span>{showAllDomains ? 'COLLAPSE CATEGORIES' : 'PULL DOWN WHOLE LIST'}</span>
                      {showAllDomains ? (
                        <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      ) : (
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          {/* RIGHT COLUMN: Interactive Sub-Branch Job Roles */}
          <div 
            id="career-map-roles-panel"
            style={activeDomainId ? {
              borderColor: IT_DOMAINS.find(d => d.id === activeDomainId)?.color || '#121c38',
              boxShadow: isMobile ? 'none' : `0 8px 32px -4px ${IT_DOMAINS.find(d => d.id === activeDomainId)?.color || '#10b981'}25, 0 0 0 1px ${IT_DOMAINS.find(d => d.id === activeDomainId)?.color || '#10b981'}30`
            } : {}}
            className={`${isMobile && mobileTab !== 'roles' ? 'hidden' : 'flex'} w-full lg:w-2/3 bg-[#080d1a] border-y border-x-0 sm:border-2 border-[#121c38] p-2.5 sm:p-4 relative flex-col min-h-[300px] sm:min-h-[400px] transition-all duration-300 scroll-mt-20`}
          >
            <AnimatePresence mode="wait">
              {activeDomainId ? (
                (() => {
                  const currentDomain = IT_DOMAINS.find(d => d.id === activeDomainId);
                  if (!currentDomain) return null;
                  const filteredRoles = getFilteredRolesForDomain(currentDomain);
                  
                  return (
                    <motion.div 
                      key={currentDomain.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="flex flex-col h-full"
                    >
                      {/* Mobile back navigation tool */}
                      {isMobile && (
                        <button
                          type="button"
                          onClick={() => setMobileTab('categories')}
                          className="flex items-center gap-1.5 text-xs text-[#10b981] hover:text-white transition font-mono uppercase font-bold mb-3 self-start cursor-pointer border border-[#10b981]/30 px-2 py-1 bg-[#10b981]/5 hover:bg-[#10b981]/15"
                        >
                          ← Back to domains
                        </button>
                      )}

                      {/* Domain Title Header banner styling */}
                      <div className="flex items-center justify-between border-b-2 border-[#121c38] pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span 
                              style={{ backgroundColor: currentDomain.color }} 
                              className="w-3 h-3 block"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-mono text-white font-bold">{currentDomain.name}</h3>
                            {toggleBookmark && isBookmarked && (
                              <button
                                onClick={() => toggleBookmark({
                                  id: currentDomain.id,
                                  name: currentDomain.name,
                                  type: 'domain',
                                  subtext: `Career Domain`
                                })}
                                className="p-1 text-gray-400 hover:text-yellow-400 transition cursor-pointer flex items-center justify-center relative z-20"
                                title={isBookmarked(currentDomain.id, 'domain') ? 'Remove domain bookmark' : 'Bookmark this domain'}
                              >
                                <CustomBookmarkIcon className={`w-4 h-4 ${isBookmarked(currentDomain.id, 'domain') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <span className="text-xs font-mono text-gray-500 whitespace-nowrap ml-2">
                          {filteredRoles.length} branches
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 italic mb-4">
                        {currentDomain.description}
                      </p>

                      {/* Roles Branch Tree display/geometry with connectors */}
                      <div className="flex-1 flex flex-col gap-3 relative">
                        {isMobile ? (
                          <MobileRolesViewer
                            roles={filteredRoles}
                            currentDomain={currentDomain}
                            activeFilters={activeFilters}
                            selectedRoleId={selectedRoleId}
                            onSelectRole={onSelectRole}
                            toggleBookmark={toggleBookmark}
                            isBookmarked={isBookmarked}
                            onResetFilters={handleResetFilters}
                            isLight={isLight}
                          />
                        ) : (
                          <>
                            {/* Connection trace stem background */}
                            <div className="absolute left-[34px] top-4 bottom-4 w-1 bg-gradient-to-b from-[#121c38] via-gray-800 to-[#121c38] pointer-events-none opacity-50" />

                            {filteredRoles.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 font-mono text-xs">
                                <HelpCircle className="w-10 h-10 mb-2 text-gray-600" />
                                <p>No job roles fit the active filters or search parameters currently.</p>
                                <button 
                                  onClick={handleResetFilters}
                                  className="mt-4 px-3 py-1.5 border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-black transition uppercase text-[10px]"
                                >
                                  Clear criteria
                                </button>
                              </div>
                            ) : (
                              (() => {
                                const slicedRoles = filteredRoles;
                                return (
                                  <>
                                    {slicedRoles.map((role, idx) => {
                                      const isSelected = selectedRoleId === role.id;
                                      const isHovered = hoveredRoleId === role.id;
                                      return (
                                        <div 
                                          key={role.id}
                                          className="flex items-center relative group gap-4"
                                          onMouseEnter={() => setHoveredRoleId(role.id)}
                                          onMouseLeave={() => setHoveredRoleId(null)}
                                        >
                                          {/* Horizontal branch line connection */}
                                          <div className="w-8 h-0.5 border-t-2 border-dashed border-[#1e2e54] absolute left-[34px] top-1/2 -translate-y-1/2 pointer-events-none" />

                                          {/* Simple bullet branch code node */}
                                          <div 
                                            style={{ 
                                              backgroundColor: isSelected ? currentDomain.color : (isLight ? '#ffffff' : '#070c18'),
                                              borderColor: isSelected ? '#ffffff' : (isLight ? '#cbd5e1' : '#1e2e54'),
                                              color: isSelected ? '#ffffff' : (isLight ? '#0f172a' : '#ffffff')
                                            }}
                                            className="w-[30px] h-[30px] border-2 flex items-center justify-center font-mono text-xs shrink-0 z-10 transition-colors"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" stroke="current" />
                                          </div>

                                          {/* Dynamic Certifications & Skills Hover Preview Card */}
                                          <AnimatePresence>
                                            {isHovered && (
                                              <motion.div
                                                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                style={{
                                                  borderColor: currentDomain.color,
                                                  boxShadow: `0 10px 30px -10px rgba(0,0,0,0.15), 0 0 15px rgba(0,0,0,0.1)`
                                                }}
                                                className="absolute right-full mr-4 top-0 z-50 w-[290px] xl:w-[330px] bg-white border-2 p-3.5 uppercase font-mono hidden lg:flex flex-col gap-3 rounded-none text-left text-slate-800"
                                              >
                                                <div className="border-b border-gray-200 pb-1.5 flex items-center justify-between">
                                                  <span className="text-[10px] text-emerald-600 font-bold tracking-wider">✔ REQUIREMENT SPECS</span>
                                                  <span className="text-[9px] text-gray-500">LVL: {role.level}</span>
                                                </div>

                                                <div>
                                                  <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Recommended Certs:</h5>
                                                  <ul className="space-y-1 text-[11px] text-gray-700 normal-case font-sans">
                                                    {role.recommendedCertifications && role.recommendedCertifications.length > 0 ? (
                                                      role.recommendedCertifications.slice(0, 3).map((cert: any, i: number) => (
                                                        <li key={i} className="flex gap-1.5 items-start">
                                                          <span className="text-emerald-500 shrink-0 text-xs">▪</span>
                                                          <span className="leading-tight text-gray-800 font-mono uppercase text-[10px]">{cert.name}</span>
                                                        </li>
                                                      ))
                                                    ) : (
                                                      <li className="text-gray-400 text-[10px] italic">No specific certifications listed.</li>
                                                    )}
                                                  </ul>
                                                </div>

                                                <div className="border-t border-gray-200 pt-2">
                                                  <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Must-Have Skills & Tools:</h5>
                                                  <div className="flex flex-wrap gap-1">
                                                    {role.mustHaves?.tech?.slice(0, 3).map((tech: string, i: number) => (
                                                      <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 text-[9px] rounded-none font-bold">
                                                        {tech}
                                                      </span>
                                                    ))}
                                                    {role.toolsToLearn?.slice(0, 3).map((tool: string, i: number) => (
                                                      <span key={i} className="bg-[#f0fdf4] text-emerald-800 border border-emerald-200 px-1.5 py-0.5 text-[9px] rounded-none">
                                                        {tool}
                                                      </span>
                                                    ))}
                                                  </div>
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>

                                          {/* Interactive clickable Role card node */}
                                          <button
                                            id={`role-node-${role.id}`}
                                            onClick={() => onSelectRole(role.id)}
                                            className={`flex-1 p-4 sm:p-3 text-left border-y sm:border-2 border-x-0 transition-all rounded-none cursor-pointer flex justify-between items-center ${
                                              isSelected 
                                                ? 'bg-[#10b981]/25 text-white border-[#10b981] shadow-[3px_3px_0px_#10b981]' 
                                                : isLight
                                                  ? 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-800'
                                                  : 'bg-[#060b13] border-[#121c38] hover:border-gray-500 text-gray-300'
                                            }`}
                                          >
                                            <div>
                                              <div className="flex items-center gap-2 mb-0.5">
                                                <span className={`font-bold text-sm tracking-tight ${isSelected ? (isLight ? 'text-emerald-800' : 'text-white') : ''}`}>{role.title}</span>
                                                {role.isCoding && (
                                                  <span className={`text-[9px] px-1 py-0.5 ${
                                                    isLight 
                                                      ? 'bg-red-50 text-red-700 border border-red-200' 
                                                      : 'bg-red-950/40 text-red-400 border border-red-900/60'
                                                  }`}>Coding</span>
                                                )}
                                                {role.isRemote && (
                                                  <span className={`text-[9px] px-1 py-0.5 ${
                                                    isLight
                                                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                                      : 'bg-sky-950/40 text-sky-400 border border-sky-900/60'
                                                  }`}>Remote</span>
                                                )}
                                              </div>
                                              
                                              <div className="text-[11px] text-gray-500 flex items-center gap-3">
                                                <span><strong className={isLight ? 'text-amber-700 font-semibold' : 'text-amber-400 font-normal'}>{role.level}</strong></span>
                                                <span>•</span>
                                                <span>Est. Salary: <strong className={isLight ? 'text-emerald-700 font-bold' : 'text-[#10b981] font-normal'}>{activeFilters.marketRegion === 'global' ? role.globalSalary : role.indiaSalary}</strong></span>
                                              </div>
                                            </div>

                                            <div className="flex items-center gap-2 font-bold text-xs text-gray-500">
                                              <a
                                                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role.title)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                referrerPolicy="no-referrer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                                className="flex items-center gap-1.5 text-[11px] text-[#10b981] hover:text-[#090f1e] hover:bg-[#10b981] px-2.5 py-1 border border-[#10b981]/30 hover:border-[#10b981] font-mono transition-all uppercase tracking-wider h-7 relative z-20"
                                                title={`Search ${role.title} Jobs on LinkedIn`}
                                              >
                                                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                                <span>Jobs</span>
                                              </a>

                                              {toggleBookmark && isBookmarked && (
                                                <span
                                                  role="button"
                                                  tabIndex={0}
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleBookmark({
                                                      id: role.id,
                                                      name: role.title,
                                                      type: 'role',
                                                      subtext: role.domain
                                                    });
                                                  }}
                                                  onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      toggleBookmark({
                                                        id: role.id,
                                                        name: role.title,
                                                        type: 'role',
                                                        subtext: role.domain
                                                     });
                                                    }
                                                  }}
                                                  className="p-1 px-1.5 border border-transparent hover:border-[#1e2e54] text-gray-500 hover:text-yellow-400 cursor-pointer flex items-center justify-center relative z-20 transition"
                                                  title={isBookmarked(role.id, 'role') ? 'Remove role bookmark' : 'Bookmark this role'}
                                                >
                                                  <CustomBookmarkIcon className={`w-4 h-4 ${isBookmarked(role.id, 'role') ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                                </span>
                                              )}
                                              <div className="group-hover:text-amber-400 transition-colors">
                                                {isSelected ? 'INSPECTING 🔍' : 'PROFILE'}
                                              </div>
                                            </div>
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </>
                                );
                              })()
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-20 font-mono text-xs">
                  <Layers className="w-12 h-12 mb-3 text-gray-600 animate-pulse" />
                  <p>Hover over or click any Domain Category to reveal the IT career role nodes and paths.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : viewMode === 'taxonomy' ? (
        <div className="relative z-10 animate-fade-in">
          <ITTaxonomyExplorer 
            onSelectRole={onSelectRole}
            marketRegion={activeFilters.marketRegion}
            onNavigateToSection={onNavigateToSection}
            activeCategoryId={taxonomyCategoryId}
            selectedRoleSlug={taxonomyRoleSlug}
            onActiveCategoryChange={setTaxonomyCategoryId}
            onSelectedRoleSlugChange={setTaxonomyRoleSlug}
            isEmbedded={true}
          />
        </div>
      ) : (
        <div className="relative z-10 animate-fade-in">
          <RoleComparison 
            marketRegion={activeFilters.marketRegion}
            onSelectRole={onSelectRole}
            isEmbedded={true}
          />
        </div>
      )}
    </div>
  );
}
