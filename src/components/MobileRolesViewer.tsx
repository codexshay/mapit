import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Code, MapPin, Award, CheckCircle, ChevronLeft, ChevronRight, Layers, FileText, ExternalLink } from 'lucide-react';
import CustomBookmarkIcon from './CustomBookmarkIcon';
import { motion, AnimatePresence } from 'motion/react';

interface MobileRolesViewerProps {
  roles: any[];
  currentDomain: any;
  activeFilters: any;
  selectedRoleId: string | null;
  onSelectRole: (roleId: string) => void;
  toggleBookmark?: (item: any) => void;
  isBookmarked?: (id: string, type: string) => boolean;
  onResetFilters: () => void;
  isLight?: boolean;
}

export default function MobileRolesViewer({
  roles,
  currentDomain,
  activeFilters,
  selectedRoleId,
  onSelectRole,
  toggleBookmark,
  isBookmarked,
  onResetFilters,
  isLight = false,
}: MobileRolesViewerProps) {
  // Local state for Mobile-specific controls
  const [levelFilter, setLevelFilter] = useState<'all' | 'entry' | 'mid' | 'advanced'>('all');
  const [viewStyle, setViewStyle] = useState<'swiper' | 'list'>('swiper');
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  // Swipe support state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Filter local roles based on experience level
  const filteredLevelRoles = roles.filter((role) => {
    if (levelFilter === 'all') return true;
    if (levelFilter === 'entry' && role.level === 'Entry-level') return true;
    if (levelFilter === 'mid' && role.level === 'Mid-level') return true;
    if (levelFilter === 'advanced' && role.level === 'Advanced') return true;
    return false;
  });

  // Keep index within bounds
  useEffect(() => {
    setSwiperIndex(0);
  }, [levelFilter, currentDomain.id, roles.length]);

  const activeIndex = Math.max(0, Math.min(swiperIndex, filteredLevelRoles.length - 1));
  const activeRole = filteredLevelRoles[activeIndex];

  const handleNext = () => {
    if (activeIndex < filteredLevelRoles.length - 1) {
      setSwiperIndex(prev => prev + 1);
    } else {
      setSwiperIndex(0); // Wrap around
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setSwiperIndex(prev => prev - 1);
    } else {
      setSwiperIndex(filteredLevelRoles.length - 1); // Wrap around
    }
  };

  const isRoleBookmarked = (roleId: string) => {
    return isBookmarked ? isBookmarked(roleId, 'role') : false;
  };

  const currentSalary = (role: any) => {
    return activeFilters.marketRegion === 'global' ? role.globalSalary : role.indiaSalary;
  };

  return (
    <div className="w-full flex flex-col gap-4" id="mobile-roles-viewer-block">
      {/* 1. EXPERIENCE LEVEL FILTER - Generous Touch Targets */}
      <div className={`flex flex-col gap-1 w-full p-2 border ${
        isLight ? 'bg-slate-100/90 border-slate-300' : 'bg-[#050810]/80 border-[#121c38]'
      }`}>
        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider mb-1 px-1 block ${
          isLight ? 'text-slate-600' : 'text-gray-500'
        }`}>
          ⚡ Filter by level to reduce list size:
        </span>
        <div className="grid grid-cols-4 gap-1">
          {(['all', 'entry', 'mid', 'advanced'] as const).map((lvl) => {
            const isActive = levelFilter === lvl;
            const labels = {
              all: 'ALL',
              entry: 'JUNIOR',
              mid: 'MID-LVL',
              advanced: 'SENIOR'
            };
            const counts = roles.filter(r => {
              if (lvl === 'all') return true;
              if (lvl === 'entry') return r.level === 'Entry-level';
              if (lvl === 'mid') return r.level === 'Mid-level';
              if (lvl === 'advanced') return r.level === 'Advanced';
              return false;
            }).length;

            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevelFilter(lvl)}
                className={`py-2 px-1 text-center font-mono text-[10px] font-bold transition-all border ${
                  isActive
                    ? isLight
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-800 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                      : 'border-[#10b981] bg-[#10b981]/20 text-white shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    : isLight
                      ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400'
                      : 'border-[#121c38] bg-[#070b14] text-gray-400 hover:border-gray-600'
                }`}
              >
                <div>{labels[lvl]}</div>
                <div className={`text-[8px] ${isActive ? 'text-emerald-700 font-bold' : isLight ? 'text-slate-400' : 'text-gray-500'}`}>({counts})</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. VIEW STYLE TOGGLE: Focused Swipe Card Deck vs list in-place expansion */}
      <div className={`flex items-center justify-between p-1 border font-mono text-xs ${
        isLight ? 'bg-slate-100/50 border-slate-300/60' : 'bg-[#050810]/40 border-[#121c38]/60'
      }`}>
        <span className={`text-[10px] font-bold tracking-tight pl-2 ${
          isLight ? 'text-slate-600' : 'text-gray-400'
        }`}>
          View format:
        </span>
        <div className={`flex p-0.5 border ${
          isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#03060c] border-[#1e2e54]/50'
        }`}>
          <button
            type="button"
            onClick={() => setViewStyle('swiper')}
            className={`px-2.5 py-1 text-[10px] font-bold transition-all ${
              viewStyle === 'swiper'
                ? isLight
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-[#10b981]/25 text-[#10b981]'
                : isLight
                  ? 'text-slate-500 hover:text-slate-700'
                  : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            🗂️ Card Swiper
          </button>
          <button
            type="button"
            onClick={() => setViewStyle('list')}
            className={`px-2.5 py-1 text-[10px] font-bold transition-all ${
              viewStyle === 'list'
                ? isLight
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-[#10b981]/25 text-[#10b981]'
                : isLight
                  ? 'text-slate-500 hover:text-slate-700'
                  : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            📋 Accordion List
          </button>
        </div>
      </div>

      {/* Empty State warning */}
      {filteredLevelRoles.length === 0 && (
        <div className={`flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed font-mono text-xs ${
          isLight ? 'border-slate-300 bg-slate-50 text-slate-600' : 'border-[#1e2e54] bg-[#070b13] text-gray-500'
        }`}>
          <HelpCircle className={`w-10 h-10 mb-2 ${isLight ? 'text-slate-300' : 'text-gray-600'}`} />
          <p className="font-bold">No {levelFilter} roles match active search filters.</p>
          <button 
            type="button"
            onClick={onResetFilters}
            className={`mt-3 px-3 py-1 text-[10px] uppercase font-bold border ${
              isLight
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-[#10b981]/15 text-[#10b981] border-[#10b981] hover:bg-[#10b981]/25'
            }`}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 3. SWIPER VIEW MODE (Carousel) - Absolute zero-scroll focus */}
      {filteredLevelRoles.length > 0 && viewStyle === 'swiper' && activeRole && (
        <div className="flex flex-col gap-3">
          {/* Main Swiper card element */}
          <div 
            style={{ borderColor: currentDomain.color }}
            className={`relative border-2 p-4 shadow-xl select-none transition-all ${
              isLight ? 'bg-gradient-to-b from-slate-50 to-white' : 'bg-gradient-to-b from-[#090f1e] to-[#040810]'
            }`}
            id={`mobile-swiper-card-${activeRole.id}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Corner classification / bookmark info header */}
            <div className={`flex items-center justify-between border-b pb-2 mb-3 ${
              isLight ? 'border-slate-200' : 'border-[#121c38]'
            }`}>
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                isLight ? 'text-emerald-700' : 'text-[#10b981]'
              }`}>
                🏷️ {activeRole.level}
              </span>
              <div className="flex items-center gap-2">
                {/* Index marker */}
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-300' : 'bg-[#04070d] text-gray-500 border-[#121c38]'
                }`}>
                  ROLE {activeIndex + 1} OF {filteredLevelRoles.length}
                </span>

                 <a
                  href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(activeRole.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border transition-all ${
                    isLight 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-emerald-950/30 text-[#10b981] border-[#10b981]/30 hover:border-[#10b981] hover:bg-emerald-900/20'
                  }`}
                  title={`Search ${activeRole.title} Jobs on LinkedIn`}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Jobs</span>
                </a>

                {toggleBookmark && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark({
                        id: activeRole.id,
                        name: activeRole.title,
                        type: 'role',
                        subtext: activeRole.domain
                      });
                    }}
                    className={`p-1 transition ${
                      isLight ? 'text-slate-400 hover:text-yellow-600' : 'text-gray-500 hover:text-yellow-400'
                    }`}
                  >
                    <CustomBookmarkIcon className={`w-4 h-4 ${isRoleBookmarked(activeRole.id) ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                  </button>
                )}
              </div>
            </div>

            {/* Core Role Title & Specs */}
            <div className="mb-3">
              <h4 className={`text-base font-mono font-black uppercase tracking-tight flex items-center gap-1.5 flex-wrap ${
                isLight ? 'text-slate-800' : 'text-white'
              }`}>
                {activeRole.title}
                {activeRole.isCoding && (
                  <span className={`text-[8px] border px-1 py-0.5 font-sans uppercase ${
                    isLight ? 'bg-red-50 text-red-700 border-red-200' : 'bg-red-950/60 text-red-400 border border-red-900/40'
                  }`}>Coding</span>
                )}
                {activeRole.isRemote && (
                  <span className={`text-[8px] border px-1 py-0.5 font-sans uppercase ${
                    isLight ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-sky-950/60 text-sky-400 border border-sky-900/40'
                  }`}>Remote</span>
                )}
              </h4>
              
              {/* High impact salary block */}
              <div className={`mt-1.5 p-2 border flex justify-between items-center ${
                isLight ? 'bg-slate-100/50 border-slate-200' : 'bg-[#03060c] border-[#1e2e54]/50'
              }`}>
                <span className={`text-[9px] font-mono font-bold uppercase ${
                  isLight ? 'text-slate-500' : 'text-gray-500'
                }`}>Estimated Income:</span>
                <span className={`text-xs font-mono font-bold border px-2 py-0.5 ${
                  isLight 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20'
                }`}>
                  {currentSalary(activeRole)}
                </span>
              </div>
            </div>

            {/* Requirements Accordion Data (Certs and Skills) */}
            <div className={`space-y-3 pt-2 border-t text-[11px] font-sans ${
              isLight ? 'border-slate-200' : 'border-[#121c38]'
            }`}>
              
              {/* MUST-HAVE SKILLS */}
              <div>
                <span className={`font-mono text-[9px] font-bold tracking-wider uppercase block mb-1 ${
                  isLight ? 'text-amber-700' : 'text-amber-500'
                }`}>
                  ⚡ MUST-HAVE SKILLS & TOOLS:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeRole.mustHaves?.tech?.slice(0, 5).map((tech: string, i: number) => (
                    <span key={i} className={`border px-1.5 py-0.5 text-[9px] font-mono rounded-none ${
                      isLight 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/25'
                    }`}>
                      {tech}
                    </span>
                  ))}
                  {activeRole.toolsToLearn?.slice(0, 4).map((tool: string, i: number) => (
                    <span key={i} className={`border px-1.5 py-0.5 text-[9px] font-mono rounded-none ${
                      isLight 
                        ? 'bg-sky-50 text-sky-800 border-sky-200' 
                        : 'bg-sky-950/30 text-sky-400 border-sky-900/30'
                    }`}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* HIGH ACCESSIBLE CERT LIST */}
              <div>
                <span className={`font-mono text-[9px] font-bold tracking-wider uppercase block mb-1 ${
                  isLight ? 'text-cyan-800' : 'text-cyan-400'
                }`}>
                  🏆 RECOMMENDED CERTIFICATIONS:
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {activeRole.recommendedCertifications && activeRole.recommendedCertifications.length > 0 ? (
                    activeRole.recommendedCertifications.slice(0, 3).map((cert: any, i: number) => (
                      <div 
                        key={i} 
                        className={`border p-1.5 flex items-center justify-between text-[10px] ${
                          isLight ? 'bg-slate-100/50 border-slate-200' : 'bg-[#03060d] border-[#121c38]'
                        }`}
                      >
                        <div className={`flex items-center gap-1.5 uppercase font-mono font-bold text-[9px] leading-tight truncate ${
                          isLight ? 'text-slate-700' : 'text-gray-300'
                        }`}>
                          <CheckCircle className={`w-3 h-3 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-500'}`} />
                          <span className="truncate">{cert.name}</span>
                        </div>
                        <span className={`text-[8px] font-mono whitespace-nowrap px-1 ml-1 border ${
                          isLight ? 'bg-slate-50 text-slate-600 border-slate-300' : 'bg-[#090f1a] text-gray-500 border-[#1e2e54]/50'
                        }`}>
                          {cert.costEstimate || 'Free'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500 text-[9px] italic">No specific certifications listed.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Pagination indicator dots overlay */}
            <div className="flex justify-center gap-1 mt-4 pt-1">
              {filteredLevelRoles.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSwiperIndex(idx)}
                  className={`h-1 cursor-pointer transition-all ${
                    idx === activeIndex 
                      ? isLight ? 'w-4 h-1.5 bg-emerald-600' : 'w-4 h-1.5 bg-[#10b981]' 
                      : isLight ? 'w-1 bg-slate-300 hover:bg-slate-400' : 'w-1 bg-[#121c38] hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Large tactile next / prev navigation touch blocks (Height at least 48px) */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className={`py-3 px-2 active:bg-[#10b981]/20 border flex items-center justify-center gap-1 font-mono text-xs font-bold tracking-tight cursor-pointer ${
                isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-[#081121] border-[#1e2e54] text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <ChevronLeft className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-[#10b981]'}`} />
              PREV
            </button>

            <button
              type="button"
              onClick={() => onSelectRole(activeRole.id)}
              className={`py-3 px-1 border text-center font-mono text-[10px] font-bold tracking-wider flex items-center justify-center uppercase truncate cursor-pointer ${
                selectedRoleId === activeRole.id 
                  ? isLight
                    ? 'bg-emerald-100 border-emerald-500 text-slate-800 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                    : 'bg-[#10b981]/30 border-[#10b981] text-amber-300 shadow-[0_0_8px_rgba(234,179,8,0.2)]'
                  : isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-[#10b981]/15 border-[#10b981]/50 text-[#10b981]'
              }`}
              style={{ minHeight: '48px' }}
            >
              {selectedRoleId === activeRole.id ? '📍 PROFILE' : '👤 PROFILE'}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`py-3 px-2 active:bg-[#10b981]/20 border flex items-center justify-center gap-1 font-mono text-xs font-bold tracking-tight cursor-pointer ${
                isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-[#081121] border-[#1e2e54] text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              NEXT
              <ChevronRight className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-[#10b981]'}`} />
            </button>
          </div>
        </div>
      )}

      {/* 4. LIST/ACCORDION VIEW MODE (In-place tap toggle) */}
      {filteredLevelRoles.length > 0 && viewStyle === 'list' && (
        <div className="flex flex-col gap-2">
          {filteredLevelRoles.map((role) => {
            const isExpanded = expandedRoleId === role.id;
            const isSelected = selectedRoleId === role.id;

            return (
              <div 
                key={role.id}
                style={{ borderColor: isSelected ? '#10b981' : isLight ? '#cbd5e1' : '#1e2e54' }}
                className={`border transition-all rounded-none ${
                  isSelected ? 'border-[#10b981]' : ''
                } ${
                  isLight ? 'bg-slate-50 hover:bg-slate-100/50' : 'bg-[#050810]/90 text-gray-300'
                }`}
              >
                {/* Header line - triggers expansion */}
                <div 
                  onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                  className={`p-3 flex items-center justify-between cursor-pointer ${
                    isLight ? 'active:bg-slate-100' : 'active:bg-[#081022]'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className={`font-mono text-xs font-bold uppercase tracking-tight truncate ${
                        isLight ? 'text-slate-800' : 'text-white'
                      }`}>
                        {role.title}
                      </span>
                      {role.isCoding && (
                        <span className={`text-[8px] border px-1 py-0.2 ${
                          isLight ? 'bg-red-50 text-red-700 border-red-200' : 'bg-red-950/60 text-red-400 border border-red-900/40'
                        }`}>C</span>
                      )}
                      {role.isRemote && (
                        <span className={`text-[8px] border px-1 py-0.2 ${
                          isLight ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-sky-950/60 text-sky-400 border border-sky-900/40'
                        }`}>R</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono">
                      <span className={isLight ? 'text-slate-500' : 'text-gray-500'}>{role.level}</span>
                      <span className={isLight ? 'text-slate-300' : 'text-gray-500'}>•</span>
                      <span className={isLight ? 'text-emerald-700 font-bold' : 'text-[#10b981]'}>{currentSalary(role)}</span>
                    </div>
                  </div>

                  {/* Right side indicators */}
                  <div className="flex items-center gap-2">
                    {/* Bookmark Star */}
                    {toggleBookmark && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark({
                            id: role.id,
                            name: role.title,
                            type: 'role',
                            subtext: role.domain
                          });
                        }}
                        className={`p-1 transition ${
                          isLight ? 'text-slate-400 hover:text-yellow-600' : 'text-gray-500 hover:text-yellow-400'
                        }`}
                      >
                        <CustomBookmarkIcon className={`w-3.5 h-3.5 ${isRoleBookmarked(role.id) ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                      </button>
                    )}
                    {isExpanded ? (
                      <ChevronUp className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-[#10b981]'}`} />
                    ) : (
                      <ChevronDown className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-gray-400'}`} />
                    )}
                  </div>
                </div>

                {/* Expanded specs list block */}
                {isExpanded && (
                  <div className={`p-3 border-t text-[11px] font-mono text-left space-y-3 font-sans ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#03060c] border-[#121c38]'
                  }`}>
                    {/* Technical requirements */}
                    <div>
                      <span className={`font-mono text-[8px] font-bold uppercase tracking-widest block mb-1 ${
                        isLight ? 'text-amber-800' : 'text-amber-500'
                      }`}>
                        ⚡ Technical Must-Haves:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {role.mustHaves?.tech?.slice(0, 4).map((tech: string, i: number) => (
                          <span key={i} className={`border px-1.5 py-0.5 text-[8.5px] font-mono ${
                            isLight 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/25'
                          }`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certs */}
                    <div>
                      <span className={`font-mono text-[8px] font-bold uppercase tracking-widest block mb-1 ${
                        isLight ? 'text-cyan-800' : 'text-cyan-400'
                      }`}>
                        🏆 Commended Credentials:
                      </span>
                      <ul className="space-y-1">
                        {role.recommendedCertifications && role.recommendedCertifications.length > 0 ? (
                          role.recommendedCertifications.slice(0, 2).map((cert: any, i: number) => (
                            <li key={i} className={`flex items-center justify-between text-[10px] font-mono ${
                              isLight ? 'text-slate-700' : 'text-gray-300'
                            }`}>
                              <span className="truncate">▪ {cert.name}</span>
                              <span className={`text-[8px] whitespace-nowrap px-1 py-0.2 select-none font-bold border ${
                                isLight ? 'bg-slate-50 text-slate-600 border-slate-300' : 'bg-[#081022] text-gray-500 border-current/20'
                              }`}>
                                {cert.costEstimate || 'Free'}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500 text-[9px] italic">No certificates listed.</li>
                        )}
                      </ul>
                    </div>

                    {/* Action button */}
                    <div className={`pt-2 border-t flex justify-between items-center gap-2 ${
                      isLight ? 'border-slate-200' : 'border-[#121c38]/50'
                    }`}>
                      <span className={`text-[10px] font-mono ${
                        isLight ? 'text-slate-500' : 'text-gray-500'
                      }`}>
                        <strong className={isLight ? 'text-slate-800' : 'text-gray-300'}>{role.level}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectRole(role.id)}
                        className={`px-3 py-1.5 text-[10px] font-bold font-mono tracking-wider border rounded-none uppercase cursor-pointer ${
                          isSelected
                            ? isLight
                              ? 'bg-emerald-100 border-emerald-500 text-slate-800'
                              : 'bg-[#10b981]/30 border-[#10b981] text-amber-300'
                            : isLight
                              ? 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                              : 'bg-[#10b981]/10 border-[#10b981]/40 text-[#10b981] hover:bg-[#10b981]/20'
                        }`}
                      >
                        {isSelected ? '📍 PROFILE' : '👤 PROFILE'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
