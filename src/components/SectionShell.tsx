import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ChevronRight, 
  X, 
  Sparkles,
  Filter,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SubViewItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number | string;
  isBeta?: boolean;
}

export interface FilterChipItem {
  id: string;
  label: string;
  value: string;
  onRemove?: () => void;
}

export interface SectionShellProps {
  sectionTitle: string;
  parentLabel?: string;
  currentViewLabel: string;
  subViews?: SubViewItem[];
  activeSubViewId?: string;
  onSelectSubView?: (id: string) => void;
  onNavigateParent?: () => void;
  badge?: string;
  filterChips?: FilterChipItem[];
  onOpenFilterSheet?: () => void;
  actionsNode?: React.ReactNode;
  theme?: 'light' | 'dark';
  isLight?: boolean;
  children: React.ReactNode;
}

export const SectionShell: React.FC<SectionShellProps> = ({
  sectionTitle,
  parentLabel,
  currentViewLabel,
  subViews,
  activeSubViewId,
  onSelectSubView,
  onNavigateParent,
  badge,
  filterChips,
  onOpenFilterSheet,
  actionsNode,
  theme = 'dark',
  isLight: isLightProp,
  children
}) => {
  const isLight = isLightProp !== undefined ? isLightProp : theme === 'light';
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const hasSubViews = subViews && subViews.length > 1;
  const parent = parentLabel || sectionTitle;

  // Lock body scroll when section sub-navigator is open on mobile
  useEffect(() => {
    if (isNavigatorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavigatorOpen]);

  return (
    <div className="w-full space-y-4">
      {/* SECTION PATH & BREADCRUMB BAR (Google Cloud Section Shell Standard) */}
      <div 
        className={`w-full px-3 py-2 border rounded-lg flex items-center justify-between gap-2 select-none font-mono text-xs shadow-xs transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#070b13] border-[#121c38] text-slate-200'
        }`}
      >
        {/* Left: Section Navigator trigger & Breadcrumbs */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Sub-Navigator Trigger (shown only if module has multiple views) */}
          {hasSubViews && (
            <button
              type="button"
              onClick={() => setIsNavigatorOpen(true)}
              aria-label={`Open ${sectionTitle} navigator`}
              aria-expanded={isNavigatorOpen}
              className={`min-w-[36px] h-9 px-2 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 border ${
                isLight
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900/60'
              }`}
              title={`Switch ${sectionTitle} view`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase hidden xs:inline">Views</span>
            </button>
          )}

          {/* Breadcrumbs Path */}
          <nav aria-label="Section breadcrumb" className="flex items-center gap-1.5 truncate text-[11px]">
            <button
              type="button"
              onClick={onNavigateParent}
              className={`font-bold hover:underline truncate cursor-pointer transition-colors ${
                isLight ? 'text-slate-900 hover:text-emerald-700' : 'text-white hover:text-emerald-400'
              }`}
              title={`Back to ${parent}`}
            >
              {parent}
            </button>

            <span className="text-slate-500 shrink-0 font-sans">/</span>

            <span className={`font-semibold truncate ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}>
              {currentViewLabel}
            </span>

            {badge && (
              <span className="text-[8px] bg-amber-400 text-black font-extrabold px-1.5 py-0.5 rounded-xs uppercase tracking-wider shrink-0 ml-1">
                {badge}
              </span>
            )}
          </nav>
        </div>

        {/* Right: Actions slot */}
        {actionsNode && (
          <div className="flex items-center gap-1.5 shrink-0">
            {actionsNode}
          </div>
        )}
      </div>

      {/* FILTER BAR & ACTIVE FILTER CHIPS (If present) */}
      {(filterChips && filterChips.length > 0) && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 custom-scrollbar text-[10.5px] font-mono">
          <div className="flex items-center gap-1 text-slate-400 shrink-0 text-[10px] font-bold uppercase px-1">
            <Filter className="w-3 h-3" />
            <span>Filters:</span>
          </div>

          {filterChips.map((chip) => (
            <span
              key={chip.id}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-[#0b1329] border-[#1e2e54] text-slate-200'
              }`}
            >
              <span className="text-slate-400">{chip.label}:</span>
              <strong className="font-bold text-emerald-400">{chip.value}</strong>
              {chip.onRemove && (
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Remove filter ${chip.label}`}
                  className="hover:text-red-400 cursor-pointer ml-0.5 text-slate-400"
                >
                  ✕
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* SECTION NAVIGATOR DRAWER / SHEET */}
      <AnimatePresence>
        {isNavigatorOpen && hasSubViews && (
          <div 
            className="fixed inset-0 z-[190] md:hidden" 
            role="dialog" 
            aria-modal="true" 
            aria-label={`${sectionTitle} Navigator`}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsNavigatorOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
            />

            {/* Sub-Navigator Off-Canvas / Sheet */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className={`fixed top-0 bottom-0 left-0 w-[80vw] max-w-[300px] z-[200] flex flex-col font-mono shadow-2xl border-r ${
                isLight
                  ? 'bg-white text-slate-900 border-slate-300'
                  : 'bg-[#070b13] text-slate-100 border-[#121c38]'
              }`}
            >
              {/* Header */}
              <div className={`p-3.5 border-b flex items-center justify-between shrink-0 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090e1a] border-[#121c38]'
              }`}>
                <div className="flex items-center gap-2 truncate">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-wide truncate">
                    {sectionTitle} Views
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNavigatorOpen(false)}
                  aria-label="Close section navigator"
                  className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer ${
                    isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Views List */}
              <nav className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {subViews.map((sub) => {
                  const isActive = activeSubViewId === sub.id;
                  const Icon = sub.icon;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        onSelectSubView?.(sub.id);
                        setIsNavigatorOpen(false);
                      }}
                      className={`w-full min-h-[44px] px-3 py-2.5 rounded-md flex items-center justify-between text-xs font-mono transition-colors cursor-pointer ${
                        isActive
                          ? isLight
                            ? 'bg-emerald-500/15 text-emerald-700 font-extrabold border-l-4 border-emerald-500 shadow-xs'
                            : 'bg-emerald-500/15 text-emerald-400 font-extrabold border-l-4 border-emerald-400 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]'
                          : isLight
                            ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-l-4 border-transparent'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {Icon && (
                          <Icon className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-emerald-400' : 'text-slate-400'
                          }`} />
                        )}
                        <span className="truncate">{sub.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {sub.isBeta && (
                          <span className="text-[8px] bg-amber-400 text-black font-extrabold px-1 py-0.5 rounded-xs uppercase">
                            beta
                          </span>
                        )}
                        {sub.count !== undefined && (
                          <span className="text-[9px] bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded">
                            {sub.count}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Section Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default SectionShell;
