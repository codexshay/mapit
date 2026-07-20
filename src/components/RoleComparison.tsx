import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ALL_ROLES_DATA, RoleDetail } from '../data/rolesData';
import { Columns, Scale, ChevronRight, HelpCircle, Code, Award, Zap, Heart, Search } from 'lucide-react';
import { IT_TAXONOMY_DATA } from './ITTaxonomyExplorer';

interface SearchableRoleSelectProps {
  label: string;
  value: string;
  onChange: (id: string) => void;
  accentColorClass: string;
  accentTextClass: string;
  accentBgClass: string;
  ringColorClass: string;
  placeholder: string;
  groupedRoles: Record<string, { id: string; title: string }[]>;
  getTaxonomyCategoryForRole: (title: string) => string;
}

function SearchableRoleSelect({
  label,
  value,
  onChange,
  accentColorClass,
  accentTextClass,
  accentBgClass,
  ringColorClass,
  placeholder,
  groupedRoles,
  getTaxonomyCategoryForRole
}: SearchableRoleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupedRoles;
    const term = searchQuery.toLowerCase().trim();
    const filtered: Record<string, { id: string; title: string }[]> = {};

    Object.entries(ALL_ROLES_DATA).forEach(([id, role]) => {
      const matchTitle = role.title.toLowerCase().includes(term);
      const matchDesc = role.roleAsk.explanation.toLowerCase().includes(term);
      const matchTech = role.mustHaves.tech.some(t => t.toLowerCase().includes(term));
      const matchTools = role.toolsToLearn.some(t => t.toLowerCase().includes(term));
      const matchCerts = role.recommendedCertifications.some(c => c.name.toLowerCase().includes(term));

      if (matchTitle || matchDesc || matchTech || matchTools || matchCerts) {
        const catName = getTaxonomyCategoryForRole(role.title);
        if (!filtered[catName]) {
          filtered[catName] = [];
        }
        filtered[catName].push({ id, title: role.title });
      }
    });
    return filtered;
  }, [searchQuery, groupedRoles, getTaxonomyCategoryForRole]);

  const selectedRole = value ? ALL_ROLES_DATA[value] : null;

  return (
    <div ref={containerRef} className="relative w-full font-mono">
      <label className="block text-xs text-gray-400 mb-1.5 uppercase font-bold">{label}</label>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#05070c] border-2 ${isOpen ? ringColorClass : 'border-[#121c38]'} hover:border-slate-500 text-xs text-left p-2.5 flex items-center justify-between cursor-pointer font-bold select-none transition-all duration-150`}
      >
        <span className={selectedRole ? 'text-white' : 'text-gray-500'}>
          {selectedRole ? selectedRole.title : placeholder}
        </span>
        <span className={`transition-transform duration-200 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-[99] bg-[#070b13] border-2 border-[#121c38] shadow-2xl animate-fade-in flex flex-col max-h-80">
          
          {/* Embedded Search Input */}
          <div className="p-2 border-b border-[#121c38] bg-[#05070c] flex items-center relative">
            <Search className="absolute left-4.5 top-4 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search by keyword, tool, role, cert..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#03060c] border border-[#1e2e54] pl-8.5 pr-8 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-slate-400 rounded-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-gray-500 hover:text-white font-bold cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* List of categories & roles */}
          <div className="overflow-y-auto max-h-56 divide-y divide-slate-800/40 custom-scrollbar">
            {Object.keys(filteredGroups).length === 0 ? (
              <div className="p-3 text-center text-xs text-gray-500 italic">No roles match search terms.</div>
            ) : (
              (Object.entries(filteredGroups) as [string, { id: string; title: string }[]][]).map(([category, roles]) => (
                <div key={category} className="p-1 bg-[#0a0f1d]/50">
                  {/* Category Header */}
                  <div className="px-2 py-1 text-[9px] uppercase font-bold tracking-wider text-gray-500 bg-[#04070e]/80 select-none border-b border-[#121c38]/30 mb-1">
                    📂 {category}
                  </div>
                  
                  {/* Category Roles */}
                  <div className="space-y-0.5">
                    {roles.map(role => {
                      const isSelected = value === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => {
                            onChange(role.id);
                            setIsOpen(false);
                            setSearchQuery('');
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-[11px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? `${accentBgClass} ${accentTextClass} border-l-2 ${ringColorClass}` 
                              : 'text-gray-300 hover:bg-slate-900 hover:text-white'
                          }`}
                        >
                          <span>{role.title}</span>
                          {isSelected && <span className="text-xs">✔</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface RoleComparisonProps {
  isHighlighted?: boolean;
  marketRegion?: 'india' | 'global';
  onSelectRole?: (roleId: string) => void;
  isEmbedded?: boolean;
  presetRoleAId?: string | null;
  setPresetRoleAId?: (roleId: string | null) => void;
  presetRoleBId?: string | null;
  setPresetRoleBId?: (roleId: string | null) => void;
}

export default function RoleComparison({ 
  isHighlighted = false, 
  marketRegion = 'india', 
  onSelectRole, 
  isEmbedded = false,
  presetRoleAId = null,
  setPresetRoleAId,
  presetRoleBId = null,
  setPresetRoleBId
}: RoleComparisonProps) {
  const [roleAId, setRoleAId] = useState<string>(() => {
    return localStorage.getItem('comparator_roleAId') || '';
  });
  const [roleBId, setRoleBId] = useState<string>(() => {
    return localStorage.getItem('comparator_roleBId') || '';
  });

  const [comparatorSearch, setComparatorSearch] = useState<string>('');

  useEffect(() => {
    if (presetRoleAId) {
      setRoleAId(presetRoleAId);
      if (setPresetRoleAId) {
        setPresetRoleAId(null);
      }
    }
  }, [presetRoleAId, setPresetRoleAId]);

  useEffect(() => {
    if (presetRoleBId) {
      setRoleBId(presetRoleBId);
      if (setPresetRoleBId) {
        setPresetRoleBId(null);
      }
    }
  }, [presetRoleBId, setPresetRoleBId]);

  useEffect(() => {
    localStorage.setItem('comparator_roleAId', roleAId);
  }, [roleAId]);

  useEffect(() => {
    localStorage.setItem('comparator_roleBId', roleBId);
  }, [roleBId]);

  const roleA = roleAId ? ALL_ROLES_DATA[roleAId] : null;
  const roleB = roleBId ? ALL_ROLES_DATA[roleBId] : null;

  // Helper to find which taxonomy category owns this role
  const getTaxonomyCategoryForRole = (roleTitle: string): string => {
    const foundCategory = IT_TAXONOMY_DATA.find(cat => 
      Object.values(cat.rolesByLevel).some(roleList => 
        roleList.some(rName => rName.toLowerCase() === roleTitle.toLowerCase() || rName.toLowerCase().includes(roleTitle.toLowerCase()) || roleTitle.toLowerCase().includes(rName.toLowerCase()))
      )
    );
    return foundCategory ? foundCategory.name : "Other Technical Roles";
  };

  // Group roles by taxonomy category
  const groupedRoles: Record<string, { id: string; title: string }[]> = useMemo(() => {
    const groups: Record<string, { id: string; title: string }[]> = {};
    
    Object.entries(ALL_ROLES_DATA).forEach(([id, role]) => {
      const catName = getTaxonomyCategoryForRole(role.title);
      if (!groups[catName]) {
        groups[catName] = [];
      }
      groups[catName].push({ id, title: role.title });
    });
    
    return groups;
  }, []);

  // Filter grouped roles by comparator search keyword
  const filteredGroupedRoles = useMemo(() => {
    if (!comparatorSearch.trim()) return groupedRoles;
    const term = comparatorSearch.toLowerCase().trim();
    const filtered: Record<string, { id: string; title: string }[]> = {};
    
    Object.entries(ALL_ROLES_DATA).forEach(([id, role]) => {
      const matchTitle = role.title.toLowerCase().includes(term);
      const matchDesc = role.roleAsk.explanation.toLowerCase().includes(term);
      const matchTech = role.mustHaves.tech.some(t => t.toLowerCase().includes(term));
      const matchTools = role.toolsToLearn.some(t => t.toLowerCase().includes(term));
      const matchCerts = role.recommendedCertifications.some(c => c.name.toLowerCase().includes(term));
      
      if (matchTitle || matchDesc || matchTech || matchTools || matchCerts) {
        const catName = getTaxonomyCategoryForRole(role.title);
        if (!filtered[catName]) {
          filtered[catName] = [];
        }
        filtered[catName].push({ id, title: role.title });
      }
    });
    return filtered;
  }, [groupedRoles, comparatorSearch]);

  return (
    <div 
      className={`w-full relative transition-all duration-300 ${
        isEmbedded 
          ? 'bg-transparent border-0 p-0 shadow-none' 
          : `bg-[#070b13] border-2 p-5 md:p-6 rounded-none ${
              isHighlighted 
                ? '!border-white border-blink z-30 shadow-[0_0_20px_#fff]' 
                : 'border-[#121c38] shadow-[4px_4px_0px_0px_#1e2e54]'
            }`
      }`} 
      id="role-comparison-block"
    >
      {/* Role Selection Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-mono">
        {/* Role A selector */}
        <div className="bg-[#0a0f1d] border-2 border-[#121c38] p-3 flex flex-col justify-between">
          <div className="relative">
            <SearchableRoleSelect
              label="Select Role A:"
              value={roleAId}
              onChange={(id) => setRoleAId(id)}
              accentColorClass="text-[#8b5cf6] focus:border-[#8b5cf6]"
              accentTextClass="text-[#8b5cf6]"
              accentBgClass="bg-[#8b5cf6]/10"
              ringColorClass="border-[#8b5cf6]"
              placeholder="-- Choose Role A --"
              groupedRoles={groupedRoles}
              getTaxonomyCategoryForRole={getTaxonomyCategoryForRole}
            />
          </div>
          {onSelectRole && roleA && (
            <button
              onClick={() => onSelectRole(roleAId)}
              className="w-full mt-3 py-1.5 bg-[#8b5cf6]/10 hover:bg-[#8b5cf6]/25 border border-[#8b5cf6]/40 hover:border-[#8b5cf6] text-white text-[11px] font-bold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
            >
              Profile
            </button>
          )}
        </div>

        {/* Role B selector */}
        <div className="bg-[#0a0f1d] border-2 border-[#121c38] p-3 flex flex-col justify-between">
          <div className="relative">
            <SearchableRoleSelect
              label="Select Role B:"
              value={roleBId}
              onChange={(id) => setRoleBId(id)}
              accentColorClass="text-[#10b981] focus:border-[#10b981]"
              accentTextClass="text-[#10b981]"
              accentBgClass="bg-[#10b981]/10"
              ringColorClass="border-[#10b981]"
              placeholder="-- Choose Role B --"
              groupedRoles={groupedRoles}
              getTaxonomyCategoryForRole={getTaxonomyCategoryForRole}
            />
          </div>
          {onSelectRole && roleB && (
            <button
              onClick={() => onSelectRole(roleBId)}
              className="w-full mt-3 py-1.5 bg-[#10b981]/15 hover:bg-[#10b981]/35 border border-[#10b981]/40 hover:border-[#10b981] text-white text-[11px] font-bold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
            >
              Profile
            </button>
          )}
        </div>
      </div>

      {/* Side-by-Side Table Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse border-2 border-[#121c38]">
          <thead>
            <tr className="bg-black/80 border-b-2 border-[#121c38]">
              <th className="p-3 w-1/4 text-gray-500 uppercase border-r border-[#121c38] hidden md:table-cell">Comparison Dimension</th>
              <th className="p-3 w-1/2 md:w-3/8 text-[#8b5cf6] uppercase border-r border-[#121c38]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="truncate max-w-[120px] sm:max-w-none">{roleA ? roleA.title : 'Role A (Not Selected)'}</span>
                  {onSelectRole && roleA && (
                    <button
                      onClick={() => onSelectRole(roleAId)}
                      className="px-2 py-0.5 bg-[#8b5cf6]/15 hover:bg-[#8b5cf6]/30 border border-[#8b5cf6]/30 hover:border-[#8b5cf6] text-[9px] text-[#8b5cf6] uppercase font-bold tracking-wider select-none shrink-0 transition cursor-pointer"
                    >
                      Profile
                    </button>
                  )}
                </div>
              </th>
              <th className="p-3 w-1/2 md:w-3/8 text-[#10b981] uppercase font-bold text-[#10b981]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="truncate max-w-[120px] sm:max-w-none">{roleB ? roleB.title : 'Role B (Not Selected)'}</span>
                  {onSelectRole && roleB && (
                    <button
                      onClick={() => onSelectRole(roleBId)}
                      className="px-2 py-0.5 bg-[#10b981]/15 hover:bg-[#10b981]/30 border border-[#10b981]/30 hover:border-[#10b981] text-[9px] text-[#10b981] uppercase font-bold tracking-wider select-none shrink-0 transition cursor-pointer"
                    >
                      Profile
                    </button>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#121c38] bg-[#03060c]">
            {/* Domain */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">IT Domain Group</td>
              <td className="p-3 border-r border-[#121c38] text-white font-bold">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">IT Domain Group</div>
                {roleA ? roleA.domain : '—'}
              </td>
              <td className="p-3 text-white font-bold">{roleB ? roleB.domain : '—'}</td>
            </tr>

            {/* Level */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Difficulty Level</td>
              <td className="p-3 border-r border-[#121c38]">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Difficulty Level</div>
                {roleA ? (
                  <span className="bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/30 px-2 py-0.5 font-bold uppercase text-[10px]">
                    {roleA.level}
                  </span>
                ) : '—'}
              </td>
              <td className="p-3">
                {roleB ? (
                  <span className="bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 px-2 py-0.5 font-bold uppercase text-[10px]">
                    {roleB.level}
                  </span>
                ) : '—'}
              </td>
            </tr>

            {/* Coding requirement */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Coding requirement</td>
              <td className="p-3 border-r border-[#121c38] text-gray-300">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Coding requirement</div>
                {roleA ? (roleA.isCoding ? (
                  <span className="text-red-400 font-bold text-[10px] sm:text-xs">⚠️ Yes, Programming</span>
                ) : (
                  <span className="text-green-400 text-[10px] sm:text-xs">🛡️ No programming</span>
                )) : '—'}
              </td>
              <td className="p-3 text-gray-300">
                {roleB ? (roleB.isCoding ? (
                  <span className="text-red-400 font-bold text-[10px] sm:text-xs">⚠️ Yes, Programming</span>
                ) : (
                  <span className="text-green-400 text-[10px] sm:text-xs">🛡️ No programming</span>
                )) : '—'}
              </td>
            </tr>

            {/* India Salary */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Salary Potential (India)</td>
              <td className="p-3 border-r border-[#121c38] text-[#10b981] font-bold">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Salary Potential (India)</div>
                {roleA ? `${roleA.indiaSalary} / yr` : '—'}
              </td>
              <td className="p-3 text-[#10b981] font-bold">{roleB ? `${roleB.indiaSalary} / yr` : '—'}</td>
            </tr>

            {/* Global Salary */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Salary Potential (Global)</td>
              <td className="p-3 border-r border-[#121c38] text-amber-400 font-bold">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Salary Potential (Global)</div>
                {roleA ? `${roleA.globalSalary} / yr` : '—'}
              </td>
              <td className="p-3 text-amber-400 font-bold">{roleB ? `${roleB.globalSalary} / yr` : '—'}</td>
            </tr>

            {/* Required Skills */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Must-Have Tech Skills</td>
              <td className="p-3 border-r border-[#121c38] text-gray-300 space-y-1">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Must-Have Tech Skills</div>
                {roleA ? roleA.mustHaves.tech.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1 h-1 bg-[#8b5cf6] inline-block shrink-0" />
                    <span>{s}</span>
                  </div>
                )) : '—'}
              </td>
              <td className="p-3 text-gray-300 space-y-1">
                {roleB ? roleB.mustHaves.tech.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-1 h-1 bg-[#10b981] inline-block shrink-0" />
                    <span>{s}</span>
                  </div>
                )) : '—'}
              </td>
            </tr>

            {/* Certifications */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Primary Certifications</td>
              <td className="p-3 border-r border-[#121c38] text-gray-300 space-y-2">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Primary Certifications</div>
                {roleA ? roleA.recommendedCertifications.map((c, idx) => (
                  <div key={idx} className="text-[11px] leading-tight">
                    <strong className="text-white font-normal">{c.name}</strong>{' '}
                    <span className="text-[9px] text-gray-500">({c.status})</span>
                  </div>
                )) : '—'}
              </td>
              <td className="p-3 text-gray-300 space-y-2">
                {roleB ? roleB.recommendedCertifications.map((c, idx) => (
                  <div key={idx} className="text-[11px] leading-tight">
                    <strong className="text-white font-normal">{c.name}</strong>{' '}
                    <span className="text-[9px] text-gray-500">({c.status})</span>
                  </div>
                )) : '—'}
              </td>
            </tr>

            {/* Software/Hardware Tools */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Tools of the Trade</td>
              <td className="p-3 border-r border-[#121c38] text-gray-300">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tools of the Trade</div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {roleA ? roleA.toolsToLearn.map((tool, idx) => (
                    <span key={idx} className="bg-white px-1.5 py-0.5 border border-slate-300 text-black font-bold">{tool}</span>
                  )) : '—'}
                </div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {roleB ? roleB.toolsToLearn.map((tool, idx) => (
                    <span key={idx} className="bg-white px-1.5 py-0.5 border border-slate-300 text-black font-bold">{tool}</span>
                  )) : '—'}
                </div>
              </td>
            </tr>

            {/* Interview Prep assessment */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Interview Complexity</td>
              <td className="p-3 border-r border-[#121c38] text-gray-300">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Interview Complexity</div>
                {roleA ? (
                  <>
                    <div className="text-[11px] font-bold text-white mb-1">Scenario focus:</div>
                    <p className="text-gray-400 leading-normal text-[10px] italic">
                      "{roleA.interviewTopics.scenario[0] || 'Troubleshooting user locks.'}"
                    </p>
                  </>
                ) : '—'}
              </td>
              <td className="p-3 text-gray-300">
                {roleB ? (
                  <>
                    <div className="text-[11px] font-bold text-white mb-1">Scenario focus:</div>
                    <p className="text-gray-400 leading-normal text-[10px] italic">
                      "{roleB.interviewTopics.scenario[0] || 'VPC subnet failure.'}"
                    </p>
                  </>
                ) : '—'}
              </td>
            </tr>

            {/* Next Moves/Future Potential */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Future Career Moves</td>
              <td className="p-3 border-r border-[#121c38] text-gray-300">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Future Career Moves</div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {roleA ? roleA.nextCareerMoves.map((mov, i) => (
                    <span key={i} className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/40 text-[#8b5cf6] px-2 py-0.5">{mov}</span>
                  )) : '—'}
                </div>
              </td>
              <td className="p-3 text-gray-300">
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {roleB ? roleB.nextCareerMoves.map((mov, i) => (
                    <span key={i} className="bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] px-2 py-0.5">{mov}</span>
                  )) : '—'}
                </div>
              </td>
            </tr>

            {/* Market indicators */}
            <tr>
              <td className="p-3 font-bold text-slate-400 border-r border-[#121c38] bg-black/40 hidden md:table-cell">Growth & Market Demand</td>
              <td className="p-3 border-r border-[#121c38] text-[#10b981] font-bold uppercase">
                <div className="block md:hidden text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Growth & Market Demand</div>
                {roleA ? roleA.marketDemandSignal.index : '—'}
              </td>
              <td className="p-3 text-[#10b981] font-bold uppercase">{roleB ? roleB.marketDemandSignal.index : '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
