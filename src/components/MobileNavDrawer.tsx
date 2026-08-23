import React, { useEffect, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  Network, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  Scale, 
  Briefcase, 
  Users, 
  Bookmark, 
  Sun, 
  Moon, 
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  bookmarksCount?: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  appVersion?: string;
  catalogVersion?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isBeta?: boolean;
  showCount?: boolean;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupTitle: 'MapIT',
    items: [
      { id: 'about', label: 'Dash', icon: ChevronRight }
    ]
  },
  {
    groupTitle: 'Explore',
    items: [
      { id: 'map', label: 'Career Domains', icon: Network },
      { id: 'libraries', label: 'Resources', icon: BookOpen },
      { id: 'interviewq', label: 'InterviewQ', icon: HelpCircle }
    ]
  },
  {
    groupTitle: 'Plan',
    items: [
      { id: 'pathfinder', label: 'Path Planner', icon: Compass },
      { id: 'comparison', label: 'Comparator', icon: Scale }
    ]
  },
  {
    groupTitle: 'Opportunities',
    items: [
      { id: 'jobs', label: 'Jobs & Referrals', icon: Briefcase, isBeta: true },
      { id: 'hr-contacts', label: 'HR Contacts', icon: Users, isBeta: true }
    ]
  },
  {
    groupTitle: 'Personal',
    items: [
      { id: 'saved', label: 'Bookmarks', icon: Bookmark, showCount: true }
    ]
  }
];

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  bookmarksCount = 0,
  theme,
  onToggleTheme,
  appVersion = '1.4.3',
  catalogVersion = '2026'
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[190] md:hidden" aria-modal="true" role="dialog" aria-label="Navigation Menu">
          {/* Translucent dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Off-canvas Left Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`fixed top-0 bottom-0 left-0 w-[82vw] max-w-[316px] z-[200] flex flex-col font-mono shadow-[12px_0_32px_rgba(0,0,0,0.85)] border-r ${
              theme === 'light'
                ? 'bg-[#f8fafc] text-slate-900 border-slate-300'
                : 'bg-[#070b13] text-slate-100 border-[#121c38]'
            }`}
          >
            {/* Drawer Header */}
            <div className={`p-4 border-b flex flex-col gap-2 shrink-0 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#090e1a] border-[#121c38]'
            }`}>
              <div className="flex items-center justify-between">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation drawer"
                  className={`w-11 h-11 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>

                <div 
                  onClick={() => {
                    onSelectTab('about');
                    onClose();
                  }}
                  className="flex items-center gap-1.5 cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectTab('about');
                      onClose();
                    }
                  }}
                >
                  <span className="font-black text-lg tracking-tight font-sans">
                    <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>MAP</span>
                    <span className="text-[#10b981]">IT</span>
                  </span>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                  theme === 'light'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                }`}>
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  v{appVersion}
                </span>
              </div>

              <p className={`text-[10px] font-sans tracking-tight px-1 ${
                theme === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                IT Career Mind-Map &amp; InterviewQ Bank
              </p>
            </div>

            {/* Scrollable Navigation Groups */}
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 custom-scrollbar" aria-label="Main Navigation">
              {NAV_GROUPS.map((group) => (
                <div key={group.groupTitle} className="space-y-1">
                  {/* Group Header */}
                  <div className={`px-3 py-1 text-[9.5px] uppercase font-bold tracking-widest ${
                    theme === 'light' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {group.groupTitle}
                  </div>

                  {/* Group Items */}
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = activeTab === item.id || (item.id === 'jobs' && activeTab === 'jobs-referrals');
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectTab(item.id);
                            onClose();
                          }}
                          aria-current={isActive ? 'page' : undefined}
                          className={`w-full min-h-[44px] px-3 py-2.5 rounded-md flex items-center justify-between text-xs font-mono transition-all duration-150 cursor-pointer ${
                            isActive
                              ? theme === 'light'
                                ? 'bg-emerald-500/15 text-emerald-700 font-extrabold border-l-4 border-emerald-500 shadow-sm'
                                : 'bg-emerald-500/15 text-emerald-400 font-extrabold border-l-4 border-emerald-400 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]'
                              : theme === 'light'
                                ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-l-4 border-transparent'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border-l-4 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate">
                            <Icon className={`w-4 h-4 shrink-0 ${
                              isActive
                                ? 'text-emerald-400'
                                : theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                            }`} />
                            <span className="truncate">{item.label}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {item.isBeta && (
                              <span className="text-[8px] bg-amber-400 text-black font-extrabold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                                beta
                              </span>
                            )}
                            {item.showCount && bookmarksCount > 0 && (
                              <span className="text-[9px] bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded-full font-mono">
                                {bookmarksCount}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* End-of-scroll / Pinned Footer */}
            <div className={`p-3 border-t text-[10px] shrink-0 space-y-2.5 ${
              theme === 'light'
                ? 'bg-white border-slate-200 text-slate-600'
                : 'bg-[#090e1a] border-[#121c38] text-slate-400'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-bold text-emerald-400">Catalog v{catalogVersion}</span>
                </div>
                <span className="font-mono text-[9.5px]">
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`w-full min-h-[40px] py-2 px-3 border rounded-md font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                    : 'bg-[#111827] hover:bg-slate-800 border-slate-700/80 text-slate-200'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>Switch to Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Switch to Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavDrawer;
