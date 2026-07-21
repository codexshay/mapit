import React, { useState, useEffect, useRef } from 'react';
import CareerMap from './components/CareerMap';
import RoleDetailPanel from './components/RoleDetailPanel';
import PathFinder from './components/PathFinder';
import RoleComparison from './components/RoleComparison';
import LibrariesDashboard from './components/LibrariesDashboard';
import ITTaxonomyExplorer from './components/ITTaxonomyExplorer';
import AntCrossingGame from './components/AntCrossingGame';
import SidebarAnt from './components/SidebarAnt';
import ErrorBoundary from './components/ErrorBoundary';
import YoutubeTeachers, { TEACHERS_DIRECTORY } from './components/YoutubeTeachers';
import Hackathons, { GLOBAL_HACKATHONS, GLOBAL_FESTS, Hackathon } from './components/Hackathons';
import { AnalogClock } from './components/AnalogClock';
import AICareerAssistant from './components/AICareerAssistant';
import HRContacts from './components/HRContacts';
import { ALL_ROLES_DATA, IT_DOMAINS } from './data/rolesData';
import { CORNER_TIPS, CERTIFICATIONS_LIBRARY } from './data/librariesData';
import { RECOMMENDED_BOOKS } from './components/LibrariesDashboard';
import CustomBookmarkIcon from './components/CustomBookmarkIcon';
import { 
  Network, Compass, Scale, BookOpen, Clock, Gamepad2, Info, ChevronRight, 
  Terminal, ArrowUpRight, Award, HelpCircle, UserCheck, Flame, ExternalLink,
  Layers, Video, Trophy, Menu, ChevronLeft, Trash2, Sun, Moon,
  ArrowLeft, ArrowRight, Search, ChevronDown, ChevronUp, Book, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TAB_DETAILS: Record<string, { label: string; activeStyle: string; hoverStyle: string }> = {
  about: {
    label: '[About]',
    activeStyle: 'text-white font-bold bg-[#121c38] border-gray-600/50 shadow-[0_0_10px_rgba(255,255,255,0.1)]',
    hoverStyle: 'hover:text-white hover:bg-slate-900 border border-transparent'
  },
  map: {
    label: '🕹️ Career Domains',
    activeStyle: 'text-[#eab308] font-bold bg-[#121c38] border-yellow-600/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]',
    hoverStyle: 'hover:text-[#eab308] hover:bg-slate-900 border border-transparent'
  },
  taxonomy: {
    label: '📡 Taxonomy Mind Map',
    activeStyle: 'text-[#ec4899] font-bold bg-[#121c38] border-pink-700/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
    hoverStyle: 'hover:text-[#ec4899] hover:bg-slate-900 border border-transparent'
  },
  pathfinder: {
    label: '🧭 Ambition Path Planner',
    activeStyle: 'text-[#10b981] font-bold bg-[#121c38] border-[#10b981]/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]',
    hoverStyle: 'hover:text-[#10b981] hover:bg-[#10b981]/5 border border-transparent'
  },
  comparison: {
    label: '⚖️ Side-by-Side Comparator',
    activeStyle: 'text-[#8b5cf6] font-bold bg-[#121c38] border-[#8b5cf6]/30 shadow-[0_0_10px_rgba(139,92,246,0.25)]',
    hoverStyle: 'hover:text-[#8b5cf6] hover:bg-[#8b5cf6]/5 border border-transparent'
  },
  libraries: {
    label: '📖 Resources',
    activeStyle: 'text-cyan-400 font-bold bg-[#121c38] border-cyan-800/30 shadow-[0_0_10px_rgba(6,182,212,0.25)]',
    hoverStyle: 'hover:text-cyan-400 hover:bg-cyan-950/20 border border-transparent'
  },
  saved: {
    label: '🔖 Bookmarks',
    activeStyle: 'text-yellow-400 font-bold bg-[#121c38] border-yellow-600/30 shadow-[0_0_10px_rgba(250,204,21,0.25)]',
    hoverStyle: 'hover:text-yellow-400 hover:bg-yellow-950/20 border border-transparent'
  },
  'hr-contacts': {
    label: '👥 HR CONTACTS',
    activeStyle: 'text-slate-200 font-bold bg-[#121c38] border-slate-700/40 shadow-[0_0_10px_rgba(255,255,255,0.05)]',
    hoverStyle: 'hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
  }
};

const TAB_METADATA: Record<string, { label: string; icon: React.ComponentType<any>; colorClass: string; activeStyle: string }> = {
  about: {
    label: 'About',
    icon: Info,
    colorClass: 'text-white',
    activeStyle: 'text-white border-white bg-slate-900/80 shadow-[0_0_12px_rgba(255,255,255,0.1)] font-bold'
  },
  map: {
    label: 'Career Domains',
    icon: Network,
    colorClass: 'text-yellow-400',
    activeStyle: 'text-[#eab308] border-[#eab308] bg-yellow-950/20 shadow-[0_0_12px_rgba(234,179,8,0.15)] font-bold'
  },
  pathfinder: {
    label: 'Path Planner',
    icon: Compass,
    colorClass: 'text-emerald-400',
    activeStyle: 'text-[#10b981] border-[#10b981] bg-emerald-950/20 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-bold'
  },
  comparison: {
    label: 'Comparator',
    icon: Scale,
    colorClass: 'text-purple-400',
    activeStyle: 'text-[#8b5cf6] border-[#8b5cf6] bg-purple-950/20 shadow-[0_0_12px_rgba(139,92,246,0.15)] font-bold'
  },
  libraries: {
    label: 'Resources',
    icon: BookOpen,
    colorClass: 'text-cyan-400',
    activeStyle: 'text-cyan-400 border-cyan-400 bg-cyan-950/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-bold'
  },
  saved: {
    label: 'Bookmarks',
    icon: CustomBookmarkIcon,
    colorClass: 'text-yellow-400',
    activeStyle: 'text-yellow-400 border-yellow-400 bg-yellow-950/25 shadow-[0_0_12px_rgba(250,204,21,0.2)] font-bold'
  },
  'hr-contacts': {
    label: 'HR CONTACTS',
    icon: UserCheck,
    colorClass: 'text-slate-300',
    activeStyle: 'text-slate-200 border-slate-700 bg-slate-900/40 shadow-[0_0_12px_rgba(255,255,255,0.05)] font-bold'
  }
};

export interface BookmarkItem {
  id: string;
  name: string;
  type: 'role' | 'domain' | 'division' | 'youtubeTeacher' | 'hackathon' | 'certification' | 'studyPortal' | 'skill' | 'tool' | 'jobCategory';
  subtext?: string;
  url?: string;
}

export default function App() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [lastGlobalSearchQuery, setLastGlobalSearchQuery] = useState<string>('');
  const [isFloatingSearchOpen, setIsFloatingSearchOpen] = useState<boolean>(false);
  const floatingSearchRef = useRef<HTMLDivElement>(null);
  const floatingTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        floatingSearchRef.current &&
        !floatingSearchRef.current.contains(event.target as Node) &&
        floatingTriggerRef.current &&
        !floatingTriggerRef.current.contains(event.target as Node)
      ) {
        setIsFloatingSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [presetRoleAId, setPresetRoleAId] = useState<string | null>(null);
  const [presetRoleBId, setPresetRoleBId] = useState<string | null>(null);
  const [savedPathways, setSavedPathways] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('mapit_saved_pathways_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [restoredPathway, setRestoredPathway] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('mapit_bookmarks_v3');
      if (saved) {
        return JSON.parse(saved);
      }
      // Migrate legacy savedRoleIds if they exist
      const legacySaved = localStorage.getItem('mapit_saved_roles');
      if (legacySaved) {
        const legacyIds = JSON.parse(legacySaved);
        if (Array.isArray(legacyIds)) {
          return legacyIds.map(id => {
            const roleItem = ALL_ROLES_DATA[id];
            return {
              id,
              name: roleItem ? roleItem.title : id,
              type: 'role' as const,
              subtext: roleItem ? roleItem.domain : 'Career Path'
            };
          });
        }
      }
    } catch (e) {
      console.error('Error loading bookmarks', e);
    }
    return [];
  });

  const toggleBookmark = (item: BookmarkItem) => {
    setBookmarks((prev) => {
      let next;
      const exists = prev.some(b => b.id === item.id && b.type === item.type);
      if (exists) {
        next = prev.filter(b => !(b.id === item.id && b.type === item.type));
      } else {
        next = [...prev, item];
      }
      localStorage.setItem('mapit_bookmarks_v3', JSON.stringify(next));
      // Keep legacy item in sync for backward compatibility
      const roleIds = next.filter(b => b.type === 'role').map(b => b.id);
      localStorage.setItem('mapit_saved_roles', JSON.stringify(roleIds));
      return next;
    });
  };

  const isBookmarked = (id: string, type: BookmarkItem['type']) => {
    return bookmarks.some(b => b.id === id && b.type === type);
  };

  const savedRoleIds = bookmarks.filter(b => b.type === 'role').map(b => b.id);

  const handleToggleBookmark = (roleId: string) => {
    const roleItem = ALL_ROLES_DATA[roleId];
    toggleBookmark({
      id: roleId,
      name: roleItem ? roleItem.title : roleId,
      type: 'role',
      subtext: roleItem ? roleItem.domain : 'Career Path'
    });
  };

  const handleCompareRoleDirectly = (roleId: string) => {
    localStorage.setItem('comparator_roleAId', roleId);
    setPresetRoleAId(roleId);
    setActiveTab('comparison');
    setGlobalSearchQuery('');
  };

  const handleCompareRoles = (roleAId: string, roleBId: string) => {
    localStorage.setItem('comparator_roleAId', roleAId);
    localStorage.setItem('comparator_roleBId', roleBId);
    setPresetRoleAId(roleAId);
    setPresetRoleBId(roleBId);
    setActiveTab('comparison');
    setGlobalSearchQuery('');
  };

  const handleNavigateToSection = (
    sectionType: 'certs' | 'tools-skills' | 'channels' | 'bookshelf' | 'hackathons' | 'youtubeTeachers' | 'map' | 'taxonomy' | 'libraries',
    queryText: string
  ) => {
    const qLower = queryText.toLowerCase().trim();

    // Helper for matching query text to core domains, categories, and role slugs
    const matchITDomainAndCategory = (q: string) => {
      // Default fallback
      let dId = 'green-computing';
      let cId = 'green-computing';
      let rSlug: string | null = null;

      if (q.includes('sysadmin') || q.includes('system admin') || q.includes('system administrator') || q.includes('linux') || q.includes('windows') || q.includes('server') || q.includes('infra') || q.includes('systems') || q.includes('virtualization')) {
        dId = 'systems-infra';
        cId = 'systems-infra';
        if (q.includes('linux')) {
          rSlug = 'linux-system-administrator';
        } else if (q.includes('windows')) {
          rSlug = 'windows-system-administrator';
        } else {
          rSlug = 'system-administrator';
        }
      } else if (q.includes('devops') || q.includes('sre') || q.includes('platform') || q.includes('pipeline') || q.includes('ci/cd') || q.includes('ansible') || q.includes('kubernetes') || q.includes('docker') || q.includes('ci-cd')) {
        dId = 'devops-sre';
        cId = 'devops-sre';
        if (q.includes('sre')) {
          rSlug = 'site-reliability-engineer';
        } else {
          rSlug = 'devops-engineer';
        }
      } else if (q.includes('database') || q.includes('dba') || q.includes('oracle') || q.includes('sql admin')) {
        dId = 'data-analytics';
        cId = 'db-admin';
        rSlug = 'database-administrator';
      } else if (q.includes('cyber') || q.includes('security') || q.includes('pentest') || q.includes('ethical') || q.includes('offensive') || q.includes('soc') || q.includes('grc') || q.includes('audit')) {
        dId = 'cybersecurity';
        cId = 'cybersecurity';
        if (q.includes('grc') || q.includes('audit')) {
          rSlug = 'grc-analyst';
        } else if (q.includes('tester') || q.includes('pen')) {
          rSlug = 'penetration-tester';
        } else {
          rSlug = 'cybersecurity-analyst';
        }
      } else if (q.includes('cloud') || q.includes('aws') || q.includes('azure') || q.includes('gcp') || q.includes('saas') || q.includes('cloud architect')) {
        dId = 'cloud';
        cId = 'cloud';
        if (q.includes('aws')) {
          rSlug = 'aws-administrator';
        } else if (q.includes('azure')) {
          rSlug = 'azure-administrator';
        } else {
          rSlug = 'cloud-systems-engineer';
        }
      } else if (q.includes('network') || q.includes('noc') || q.includes('router') || q.includes('switch') || q.includes('cisco')) {
        dId = 'networking';
        cId = 'networking';
        rSlug = 'network-engineer';
      } else if (q.includes('voice') || q.includes('telecom') || q.includes('voip')) {
        dId = 'networking';
        cId = 'telecom-voice';
        rSlug = 'voice-engineer';
      } else if (q.includes('data science') || q.includes('ai') || q.includes('ml') || q.includes('machine learning') || q.includes('deep learning')) {
        dId = 'data-analytics';
        cId = 'data-science-ai';
        if (q.includes('ml') || q.includes('machine')) {
          rSlug = 'machine-learning-engineer';
        } else if (q.includes('ai')) {
          rSlug = 'ai-engineer';
        } else {
          rSlug = 'data-scientist';
        }
      } else if (q.includes('analytics') || q.includes('report') || q.includes('dashboard') || q.includes('bi ') || q.includes('business intelligence') || q.includes('sql')) {
        dId = 'data-analytics';
        cId = 'data-analytics';
        rSlug = 'data-analyst';
      } else if (q.includes('qa') || q.includes('test') || q.includes('automation') || q.includes('sdet')) {
        dId = 'qa-testing';
        cId = 'qa-testing';
        rSlug = 'qa-automation-tester';
      } else if (q.includes('design') || q.includes('ux') || q.includes('ui') || q.includes('figma')) {
        dId = 'software-dev';
        cId = 'uiux-design';
        rSlug = 'ux-designer';
      } else if (q.includes('coding') || q.includes('developer') || q.includes('programming') || q.includes('software') || q.includes('frontend') || q.includes('backend') || q.includes('fullstack') || q.includes('full-stack') || q.includes('full stack') || q.includes('java') || q.includes('python')) {
        dId = 'software-dev';
        cId = 'software-dev';
        if (q.includes('frontend')) {
          rSlug = 'frontend-developer';
        } else if (q.includes('backend')) {
          rSlug = 'backend-developer';
        } else if (q.includes('full')) {
          rSlug = 'full-stack-developer';
        } else {
          rSlug = 'software-developer';
        }
      } else if (q.includes('project') || q.includes('product') || q.includes('scrum') || q.includes('agile')) {
        dId = 'software-dev';
        cId = 'erp-crm';
        if (q.includes('product')) {
          rSlug = 'product-manager';
        } else {
          rSlug = 'it-project-manager';
        }
      } else if (q.includes('salesforce') || q.includes('crm') || q.includes('servicenow')) {
        dId = 'software-dev';
        cId = 'erp-crm';
        if (q.includes('salesforce')) {
          rSlug = 'salesforce-administrator';
        } else {
          rSlug = 'servicenow-developer';
        }
      } else if (q.includes('support') || q.includes('helpdesk') || q.includes('desktop') || q.includes('service desk') || q.includes('ticketing')) {
        dId = 'it-support';
        cId = 'it-support';
        rSlug = 'it-support-analyst';
      }

      return { dId, cId, rSlug };
    };

    const mapping = matchITDomainAndCategory(qLower);

    if (sectionType === 'map') {
      setCareerMapDomainId(mapping.dId);
      if (mapping.rSlug) {
        setSelectedRoleId(mapping.rSlug);
      }
      setActiveTab('map');
    } else if (sectionType === 'taxonomy') {
      setCareerMapDomainId(mapping.dId);
      if (mapping.rSlug) {
        setSelectedRoleId(mapping.rSlug);
      }
      setCareerMapViewMode('mindmap');
      setActiveTab('map');
    } else if (sectionType === 'libraries') {
      setLibrariesQuery(queryText);
      setActiveTab('libraries');
    } else if (sectionType === 'certs') {
      setLibrariesActiveTab('certs');
      setLibrariesQuery(queryText);
      setActiveTab('libraries');
    } else if (sectionType === 'tools-skills') {
      setLibrariesActiveTab('tools-skills');
      setLibrariesQuery(queryText);
      setActiveTab('libraries');
    } else if (sectionType === 'channels') {
      setLibrariesActiveTab('channels');
      setLibrariesQuery(queryText);
      setActiveTab('libraries');
    } else if (sectionType === 'bookshelf') {
      setLibrariesActiveTab('bookshelf');
      setLibrariesQuery(queryText);
      setActiveTab('libraries');
    } else if (sectionType === 'youtubeTeachers') {
      const parentCat = TEACHERS_DIRECTORY.find(cat =>
        cat.subcategories.some(sub =>
          sub.teachers.some(t => t.name.toLowerCase() === qLower || qLower.includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(qLower)) ||
          sub.skillArea.toLowerCase() === qLower ||
          sub.skillArea.toLowerCase().includes(qLower) ||
          qLower.includes(sub.skillArea.toLowerCase())
        )
      );
      if (parentCat) {
        setYoutubeCategoryId(parentCat.id);
      }
      setYoutubeSearchQuery(queryText);
      setLibrariesActiveTab('youtubeTeachers');
      setActiveTab('libraries');
    } else if (sectionType === 'hackathons') {
      setHackathonsSearchQuery(queryText);
      setLibrariesActiveTab('hackathons');
      setActiveTab('libraries');
    }

    // Set immediate layout reset to top then perform smart smooth alignment
    window.scrollTo({ top: 0, behavior: 'auto' as any });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      let targetId = '';
      if (sectionType === 'map' || sectionType === 'taxonomy') {
        targetId = selectedRoleId ? 'selected-role-focus-anchor' : 'section-map';
      } else if (['certs', 'tools-skills', 'channels', 'bookshelf', 'libraries', 'youtubeTeachers', 'hackathons'].includes(sectionType)) {
        targetId = 'section-libraries';
      }

      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const fallback = document.getElementById('selected-role-focus-anchor') ||
                         document.getElementById('libraries-dashboard-block') || 
                         document.getElementById('library-search') || 
                         document.getElementById('youtube-teachers-block') ||
                         document.getElementById('hackathons-radar-block') ||
                         document.getElementById('main-content-area');
        if (fallback) {
          fallback.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 150);
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState({
    beginnerFriendly: false,
    noCoding: false,
    highPaying: false,
    remoteFriendly: false,
    marketRegion: 'india' as 'global' | 'india',
    difficultyLevel: 'all' as 'all' | 'Entry-level' | 'Mid-level' | 'Advanced',
    sortBySalary: 'default' as 'default' | 'high-to-low' | 'low-to-high'
  });

  // Section highlight state for nav tab triggers
  const [blinkSectionId, setBlinkSectionId] = useState<string | null>(null);
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);

  // Persistent visual theme state (Dark / Light)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('mapit_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    return 'dark'; // Keep dark mode as default for the whole webpage
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('mapit_theme', nextTheme);
    } catch (e) {}
  };

  // Clock state to show live UTC time
  const [showMobileClocksRibbon, setShowMobileClocksRibbon] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [worldTimes, setWorldTimes] = useState<{
    ny: string;
    delhi: string;
    tokyo: string;
    london: string;
  }>({ ny: '', delhi: '', tokyo: '', london: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const istString = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' IST';
      setCurrentTime(istString);

      // Use Intl.DateTimeFormat with correct locales and timezones
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      try {
        const nyTime = new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'America/New_York' }).format(now);
        const delhiTime = new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'Asia/Kolkata' }).format(now);
        const tokyoTime = new Intl.DateTimeFormat('ja-JP', { ...options, timeZone: 'Asia/Tokyo' }).format(now);
        const londonTime = new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'Europe/London' }).format(now);

        setWorldTimes({
          ny: nyTime,
          delhi: delhiTime,
          tokyo: tokyoTime,
          london: londonTime
        });
      } catch (err) {
        console.error('Timezone formatting error', err);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Carousel of advice tips inside corners of the app
  const [tipIndex, setTipIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % CORNER_TIPS.length);
    }, 10000); // changes every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const [appHackathons, setAppHackathons] = useState<Hackathon[]>([]);
  const [isLoadingHackathons, setIsLoadingHackathons] = useState<boolean>(true);

  useEffect(() => {
    let initial: Hackathon[] = [...GLOBAL_HACKATHONS, ...GLOBAL_FESTS];
    try {
      const stored = localStorage.getItem('pathfinder_synced_hackathons');
      if (stored) {
        initial = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading hackathons from storage:", e);
    }
    
    // Filter initial state to remove expired/concluded/closed events immediately
    const activeInitial = initial.filter(item => {
      const hasDaysLeft = item.daysLeft !== undefined && item.daysLeft > 0;
      const isNotClosed = item.scheduleStatus !== 'Closed';
      return hasDaysLeft && isNotClosed;
    });
    setAppHackathons(activeInitial);
    setIsLoadingHackathons(true);

    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/hackathons/update-events");
        if (res.ok) {
          const data = await res.json();
          if (data.events && Array.isArray(data.events)) {
            // Keep only active/upcoming
            const filtered = data.events.filter((item: any) => {
              const hasDaysLeft = item.daysLeft !== undefined && item.daysLeft > 0;
              const isNotClosed = item.scheduleStatus !== 'Closed';
              return hasDaysLeft && isNotClosed;
            });
            setAppHackathons(filtered);
            localStorage.setItem('pathfinder_synced_hackathons', JSON.stringify(filtered));
          }
        }
      } catch (err) {
        console.warn("Could not sync latest hackathons:", err);
      } finally {
        setIsLoadingHackathons(false);
      }
    };
    fetchLatest();
  }, []);

  const selectedRole = selectedRoleId ? ALL_ROLES_DATA[selectedRoleId] : null;

  // Filter domains, roles, and resources for global search results
  const globalSearchResults = React.useMemo(() => {
    if (!globalSearchQuery.trim()) return { domains: [], roles: [], certs: [], books: [], teachers: [], hackathons: [] };
    const query = globalSearchQuery.toLowerCase().trim();
    
    // 1. Search domains
    const matchedDomains = IT_DOMAINS.filter(domain => {
      const nameMatch = domain.name ? domain.name.toLowerCase().includes(query) : false;
      const descMatch = domain.description ? domain.description.toLowerCase().includes(query) : false;
      return nameMatch || descMatch;
    });
    
    // 2. Search roles
    const matchedRoles = Object.values(ALL_ROLES_DATA).filter(role => {
      const titleMatch = role.title ? role.title.toLowerCase().includes(query) : false;
      const descMatch = (role.roleAsk && role.roleAsk.explanation) ? role.roleAsk.explanation.toLowerCase().includes(query) : false;
      const techMatch = Array.isArray(role.mustHaves?.tech) ? role.mustHaves.tech.some(t => t && t.toLowerCase().includes(query)) : false;
      const processMatch = Array.isArray(role.mustHaves?.process) ? role.mustHaves.process.some(p => p && p.toLowerCase().includes(query)) : false;
      const toolsMatch = Array.isArray(role.toolsToLearn) ? role.toolsToLearn.some(t => t && t.toLowerCase().includes(query)) : false;
      const certsMatch = Array.isArray(role.recommendedCertifications) ? role.recommendedCertifications.some(c => c && c.name && c.name.toLowerCase().includes(query)) : false;
      const pathMatch = Array.isArray(role.upskillingPath) ? role.upskillingPath.some(step => step && step.toLowerCase().includes(query)) : false;
      
      return titleMatch || descMatch || techMatch || processMatch || toolsMatch || certsMatch || pathMatch;
    });

    // 3. Search Certifications
    const matchedCerts = CERTIFICATIONS_LIBRARY.filter(cert => {
      const nameMatch = cert.name ? cert.name.toLowerCase().includes(query) : false;
      const providerMatch = cert.provider ? cert.provider.toLowerCase().includes(query) : false;
      const descMatch = cert.description ? cert.description.toLowerCase().includes(query) : false;
      const rolesMatch = Array.isArray(cert.relatedRoles) ? cert.relatedRoles.some(r => r && r.toLowerCase().includes(query)) : false;
      return nameMatch || providerMatch || descMatch || rolesMatch;
    });

    // 4. Search Books
    const matchedBooks = RECOMMENDED_BOOKS.filter(book => {
      const titleMatch = book.title ? book.title.toLowerCase().includes(query) : false;
      const authorMatch = book.author ? book.author.toLowerCase().includes(query) : false;
      const bestForMatch = book.bestFor ? book.bestFor.toLowerCase().includes(query) : false;
      const summaryMatch = book.summary ? book.summary.toLowerCase().includes(query) : false;
      return titleMatch || authorMatch || bestForMatch || summaryMatch;
    });

    // 5. Search YouTube study channels / Teachers
    const matchedTeachers: any[] = [];
    const seenTeacherNames = new Set<string>();
    try {
      if (Array.isArray(TEACHERS_DIRECTORY)) {
        TEACHERS_DIRECTORY.forEach(cat => {
          if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
              if (sub.teachers) {
                sub.teachers.forEach((t: any) => {
                  if (!t || !t.name || seenTeacherNames.has(t.name)) return;
                  const nameMatch = t.name ? t.name.toLowerCase().includes(query) : false;
                  const areaMatch = sub?.skillArea ? sub.skillArea.toLowerCase().includes(query) : false;
                  const reasonMatch = t?.reason ? t.reason.toLowerCase().includes(query) : false;
                  if (nameMatch || areaMatch || reasonMatch) {
                    seenTeacherNames.add(t.name);
                    matchedTeachers.push({
                      name: t.name,
                      url: t.url,
                      skillArea: sub.skillArea,
                      reason: t.reason,
                      catId: cat.id
                    });
                  }
                });
              }
            });
          }
        });
      }
    } catch (e) {}

    // 6. Search Hackathons & Events
    const matchedHackathons = appHackathons.filter(item => {
      if (!item) return false;
      const titleMatch = item.title ? item.title.toLowerCase().includes(query) : false;
      const orgMatch = item.organizer ? item.organizer.toLowerCase().includes(query) : false;
      const descMatch = item.description ? item.description.toLowerCase().includes(query) : false;
      const prizesMatch = item.prizes ? item.prizes.toLowerCase().includes(query) : false;
      const categoryMatch = item.category ? item.category.toLowerCase().includes(query) : false;
      const themesMatch = Array.isArray(item.themes) ? item.themes.some(t => t && t.toLowerCase().includes(query)) : false;
      return titleMatch || orgMatch || descMatch || prizesMatch || categoryMatch || themesMatch;
    });
    
    return { 
      domains: matchedDomains, 
      roles: matchedRoles,
      certs: matchedCerts,
      books: matchedBooks,
      teachers: matchedTeachers,
      hackathons: matchedHackathons
    };
  }, [globalSearchQuery, appHackathons]);

  // Controlled sub-state variables to communicate selections across sections
  const [careerMapDomainId, setCareerMapDomainId] = useState<string | null>('green-computing');
  const [librariesActiveTab, setLibrariesActiveTab] = useState<'youtubeTeachers' | 'hackathons' | 'channels' | 'tools-skills' | 'certs' | 'bookshelf'>('hackathons');
  const [librariesQuery, setLibrariesQuery] = useState<string>('');
  const [librariesRoleFamily, setLibrariesRoleFamily] = useState<string>('green-computing');
  const [youtubeSearchQuery, setYoutubeSearchQuery] = useState<string>('');
  const [youtubeCategoryId, setYoutubeCategoryId] = useState<string>('green-computing');
  const [hackathonsSelectedItemId, setHackathonsSelectedItemId] = useState<string | null>(null);
  const [hackathonsSearchQuery, setHackathonsSearchQuery] = useState<string>('');

  // Tab states to isolate sections independently
  const [activeTab, setActiveTab] = useState<string>('about');
  const [careerMapViewMode, setCareerMapViewMode] = useState<'mindmap' | 'comparison'>('mindmap');
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState<boolean>(false);

  // Mobile navigation and search states
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Intro splash screen states: 'blank' -> 'centered' -> 'floating' -> 'done'
  const [introStage, setIntroStage] = useState<'blank' | 'centered' | 'floating' | 'done'>('blank');

  useEffect(() => {
    // Disable body overflow to prevent scroll during the intro stages
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    // 1. Show centered logo after brief blank pause
    const timer1 = setTimeout(() => {
      setIntroStage('centered');
    }, 250);

    // 2. Start floating and fade out background
    const timer2 = setTimeout(() => {
      setIntroStage('floating');
    }, 1600);

    // 3. Complete float hand-off and restore scrolling
    const timer3 = setTimeout(() => {
      setIntroStage('done');
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, []);

  useEffect(() => {
    if (introStage === 'done') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [introStage]);

  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Bookmarks pagination states for mobile
  const [bookmarksRolePage, setBookmarksRolePage] = useState<number>(1);
  const [bookmarksHackathonPage, setBookmarksHackathonPage] = useState<number>(1);
  const [bookmarksTeacherPage, setBookmarksTeacherPage] = useState<number>(1);
  const [bookmarksResourcePage, setBookmarksResourcePage] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const searchableIndex = React.useMemo(() => {
    const items: { 
      id: string; 
      name: string; 
      subtext: string; 
      category: 'role' | 'domain' | 'cert' | 'book' | 'youtubeTeacher';
      meta?: any;
    }[] = [];

    // 1. Roles
    Object.entries(ALL_ROLES_DATA).forEach(([roleId, detail]) => {
      items.push({
        id: roleId,
        name: detail.title,
        subtext: `Role under ${detail.domain}`,
        category: 'role',
        meta: { domain: detail.domain }
      });
    });

    // 2. Domains
    IT_DOMAINS.forEach(dom => {
      items.push({
        id: dom.id,
        name: dom.name,
        subtext: `Career Category Domain`,
        category: 'domain'
      });
    });

    // 3. Certifications
    try {
      if (Array.isArray(CERTIFICATIONS_LIBRARY)) {
        CERTIFICATIONS_LIBRARY.forEach(cert => {
          items.push({
            id: cert.id,
            name: cert.name,
            subtext: `Certification by ${cert.provider}`,
            category: 'cert',
            meta: { link: cert.officialLink }
          });
        });
      }
    } catch (e) {}

    // 4. Books
    try {
      if (Array.isArray(RECOMMENDED_BOOKS)) {
        RECOMMENDED_BOOKS.forEach(b => {
          items.push({
            id: b.title,
            name: b.title,
            subtext: `Recommended Book by ${b.author}`,
            category: 'book',
            meta: { url: b.url }
          });
        });
      }
    } catch (e) {}

    // 5. YouTube teachers
    try {
      if (Array.isArray(TEACHERS_DIRECTORY)) {
        TEACHERS_DIRECTORY.forEach(cat => {
          if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
              if (sub.teachers) {
                sub.teachers.forEach(teacher => {
                  items.push({
                    id: teacher.name,
                    name: teacher.name,
                    subtext: `Study Channel under ${sub.skillArea}`,
                    category: 'youtubeTeacher',
                    meta: { url: teacher.url, skillArea: sub.skillArea, catId: cat.id }
                  });
                });
              }
            });
          }
        });
      }
    } catch (e) {}

    return items;
  }, []);

  const mobileSearchResults = React.useMemo(() => {
    if (!mobileSearchQuery.trim()) return [];
    const q = mobileSearchQuery.toLowerCase();
    return searchableIndex.filter(item => 
      (item?.name && item.name.toLowerCase().includes(q)) || 
      (item?.subtext && item.subtext.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [mobileSearchQuery, searchableIndex]);

  const handleSelectSearchItem = (item: typeof searchableIndex[0]) => {
    setMobileSearchQuery('');
    setIsSearchFocused(false);

    if (item.category === 'role') {
      setSelectedRoleId(item.id);
      const foundDomain = IT_DOMAINS.find(d => d.roles.includes(item.id));
      if (foundDomain) {
        setCareerMapDomainId(foundDomain.id);
      }
      setActiveTab('map');
      setTimeout(() => {
        const elem = document.getElementById('selected-role-focus-anchor');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else if (item.category === 'domain') {
      setCareerMapDomainId(item.id);
      setActiveTab('map');
    } else if (item.category === 'cert') {
      setActiveTab('libraries');
      setLibrariesActiveTab('certs');
      setLibrariesQuery(item.name);
    } else if (item.category === 'book') {
      setActiveTab('libraries');
      setLibrariesActiveTab('bookshelf');
      setLibrariesQuery(item.name);
    } else if (item.category === 'youtubeTeacher') {
      setActiveTab('libraries');
      setLibrariesActiveTab('youtubeTeachers');
      setYoutubeSearchQuery(item.name);
      if (item.meta && item.meta.catId) {
        setYoutubeCategoryId(item.meta.catId);
      }
    }
  };

  // Lifted Taxonomy Explorer State
  const [taxonomyCategoryId, setTaxonomyCategoryId] = useState<string | null>(null);
  const [taxonomyRoleSlug, setTaxonomyRoleSlug] = useState<string | null>(null);

  // Retro Browser History Manager state synced with HTML5 Browser History
  const [navHistory, setNavHistory] = useState<{ 
    tab: string; 
    roleId: string | null;
    careerMapDomainId: string | null;
    librariesActiveTab: 'youtubeTeachers' | 'hackathons' | 'channels' | 'tools-skills' | 'certs' | 'bookshelf';
    librariesQuery: string;
    youtubeCategoryId: string;
    youtubeSearchQuery: string;
    hackathonsSearchQuery: string;
    taxonomyCategoryId: string | null;
    taxonomyRoleSlug: string | null;
    globalSearchQuery: string;
  }[]>([]);
  const [navHistoryIndex, setNavHistoryIndex] = useState<number>(-1);
  const [isNavigatingHistory, setIsNavigatingHistory] = useState<boolean>(false);

  // Sync React navigation state with native browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state) {
        setIsNavigatingHistory(true);
        if (state.tab !== undefined) setActiveTab(state.tab);
        if (state.roleId !== undefined) setSelectedRoleId(state.roleId);
        if (state.careerMapDomainId !== undefined) setCareerMapDomainId(state.careerMapDomainId);
        if (state.librariesActiveTab !== undefined) setLibrariesActiveTab(state.librariesActiveTab);
        if (state.librariesQuery !== undefined) setLibrariesQuery(state.librariesQuery);
        if (state.youtubeCategoryId !== undefined) setYoutubeCategoryId(state.youtubeCategoryId);
        if (state.youtubeSearchQuery !== undefined) setYoutubeSearchQuery(state.youtubeSearchQuery);
        if (state.hackathonsSearchQuery !== undefined) setHackathonsSearchQuery(state.hackathonsSearchQuery);
        if (state.taxonomyCategoryId !== undefined) setTaxonomyCategoryId(state.taxonomyCategoryId);
        if (state.taxonomyRoleSlug !== undefined) setTaxonomyRoleSlug(state.taxonomyRoleSlug);
        if (state.globalSearchQuery !== undefined) setGlobalSearchQuery(state.globalSearchQuery);
        
        if (state.historyIndex !== undefined) {
          setNavHistoryIndex(state.historyIndex);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);

    // Seed the initial history state on application mount
    const initialEntry = {
      tab: activeTab,
      roleId: selectedRoleId,
      careerMapDomainId,
      librariesActiveTab,
      librariesQuery,
      youtubeCategoryId,
      youtubeSearchQuery,
      hackathonsSearchQuery,
      taxonomyCategoryId,
      taxonomyRoleSlug,
      globalSearchQuery,
      historyIndex: 0
    };
    window.history.replaceState(initialEntry, '', '');
    setNavHistory([initialEntry]);
    setNavHistoryIndex(0);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Prevent duplicate entries during back/forward actions
    if (isNavigatingHistory) {
      setIsNavigatingHistory(false);
      return;
    }

    const currentEntry = { 
      tab: activeTab, 
      roleId: selectedRoleId,
      careerMapDomainId,
      librariesActiveTab,
      librariesQuery,
      youtubeCategoryId,
      youtubeSearchQuery,
      hackathonsSearchQuery,
      taxonomyCategoryId,
      taxonomyRoleSlug,
      globalSearchQuery
    };
    const lastEntry = navHistory[navHistoryIndex];

    if (
      lastEntry && 
      lastEntry.tab === currentEntry.tab && 
      lastEntry.roleId === currentEntry.roleId &&
      lastEntry.careerMapDomainId === currentEntry.careerMapDomainId &&
      lastEntry.librariesActiveTab === currentEntry.librariesActiveTab &&
      lastEntry.librariesQuery === currentEntry.librariesQuery &&
      lastEntry.youtubeCategoryId === currentEntry.youtubeCategoryId &&
      lastEntry.youtubeSearchQuery === currentEntry.youtubeSearchQuery &&
      lastEntry.hackathonsSearchQuery === currentEntry.hackathonsSearchQuery &&
      lastEntry.taxonomyCategoryId === currentEntry.taxonomyCategoryId &&
      lastEntry.taxonomyRoleSlug === currentEntry.taxonomyRoleSlug &&
      lastEntry.globalSearchQuery === currentEntry.globalSearchQuery
    ) {
      return;
    }

    // Optimization: If only search query changed, replace the current history state to avoid flooding browser back button stack
    const onlySearchQueryChanged = lastEntry &&
      lastEntry.tab === currentEntry.tab && 
      lastEntry.roleId === currentEntry.roleId &&
      lastEntry.careerMapDomainId === currentEntry.careerMapDomainId &&
      lastEntry.librariesActiveTab === currentEntry.librariesActiveTab &&
      lastEntry.librariesQuery === currentEntry.librariesQuery &&
      lastEntry.youtubeCategoryId === currentEntry.youtubeCategoryId &&
      lastEntry.youtubeSearchQuery === currentEntry.youtubeSearchQuery &&
      lastEntry.hackathonsSearchQuery === currentEntry.hackathonsSearchQuery &&
      lastEntry.taxonomyCategoryId === currentEntry.taxonomyCategoryId &&
      lastEntry.taxonomyRoleSlug === currentEntry.taxonomyRoleSlug &&
      lastEntry.globalSearchQuery !== currentEntry.globalSearchQuery;

    if (onlySearchQueryChanged) {
      const updatedHistory = [...navHistory];
      updatedHistory[navHistoryIndex] = currentEntry;
      setNavHistory(updatedHistory);
      window.history.replaceState({ ...currentEntry, historyIndex: navHistoryIndex }, '', '');
      return;
    }

    const newHistory = navHistory.slice(0, navHistoryIndex + 1);
    newHistory.push(currentEntry);
    setNavHistory(newHistory);
    
    const nextIndex = newHistory.length - 1;
    setNavHistoryIndex(nextIndex);
    
    // Smoothly push the newly created state to HTML5 browser history
    window.history.pushState({ ...currentEntry, historyIndex: nextIndex }, '', '');
  }, [
    activeTab, 
    selectedRoleId, 
    careerMapDomainId, 
    librariesActiveTab, 
    librariesQuery, 
    youtubeCategoryId, 
    youtubeSearchQuery, 
    hackathonsSearchQuery, 
    taxonomyCategoryId, 
    taxonomyRoleSlug,
    globalSearchQuery
  ]);

  const canGoBack = navHistoryIndex > 0;
  const canGoForward = navHistoryIndex < navHistory.length - 1;

  const navigateBack = () => {
    if (canGoBack) {
      window.history.back();
    }
  };

  const navigateForward = () => {
    if (canGoForward) {
      window.history.forward();
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear taxonomy popups when user manually switches tabs to prevent stale popups when returning to categories
  useEffect(() => {
    if (!isNavigatingHistory) {
      setTaxonomyCategoryId(null);
      setTaxonomyRoleSlug(null);
    }
  }, [activeTab]);

  const renderHistoryNavigationArrows = (className: string = "", isCompact: boolean = false) => {
    return (
      <div className={`flex items-center gap-1.5 font-mono ${className}`}>
        <button
          onClick={navigateBack}
          disabled={!canGoBack}
          style={{ cursor: canGoBack ? 'pointer' : 'not-allowed' }}
          className={`p-1.5 border-2 rounded-none transition flex items-center justify-center ${
            canGoBack 
              ? 'border-[#1e2e54] bg-[#0c1224]/80 text-[#10b981] hover:border-[#10b981] hover:bg-[#10b981]/15 hover:text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
              : 'border-slate-800/60 bg-[#04070e]/80 text-slate-700'
          } ${isCompact ? 'scale-90 p-1' : ''}`}
          title="Go Back to Previous Section or Role Details"
        >
          <ArrowLeft className={isCompact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        </button>
        <button
          onClick={navigateForward}
          disabled={!canGoForward}
          style={{ cursor: canGoForward ? 'pointer' : 'not-allowed' }}
          className={`p-1.5 border-2 rounded-none transition flex items-center justify-center ${
            canGoForward 
              ? 'border-[#1e2e54] bg-[#0c1224]/80 text-[#10b981] hover:border-[#10b981] hover:bg-[#10b981]/15 hover:text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
              : 'border-slate-800/60 bg-[#04070e]/80 text-slate-700'
          } ${isCompact ? 'scale-90 p-1' : ''}`}
          title="Go Forward"
        >
          <ArrowRight className={isCompact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        </button>
      </div>
    );
  };

  const [isSidebarMinimized, setIsSidebarMinimized] = useState<boolean>(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);
  const [isHoveringBottomArea, setIsHoveringBottomArea] = useState<boolean>(false);
  const isSidebarExpanded = !isSidebarMinimized || (isSidebarHovered && !isHoveringBottomArea);

  useEffect(() => {
    if (isSidebarExpanded) {
      setIsFloatingSearchOpen(false);
    }
  }, [isSidebarExpanded]);

  const prevTabRef = useRef<string>(activeTab);

  useEffect(() => {
    // Determine the target element ID to scroll to if focusing on details
    let targetId: string | null = null;

    if (activeTab === 'map' && selectedRoleId) {
      targetId = 'selected-role-focus-anchor';
    } else if (activeTab === 'pathfinder' && document.getElementById('pathfinder-role-detail-anchor')) {
      targetId = 'pathfinder-role-detail-anchor';
    } else if (activeTab === 'saved' && document.getElementById('saved-role-detail-anchor')) {
      targetId = 'saved-role-detail-anchor';
    } else if (activeTab === 'comparison') {
      if (prevTabRef.current !== 'comparison') {
        if (selectedRoleId) {
          // Pre-encode the active selected role as Role A
          setPresetRoleAId(selectedRoleId);
          localStorage.setItem('comparator_roleAId', selectedRoleId);
        }
        setSelectedRoleId(null);
        targetId = 'section-comparison';
      } else if (selectedRoleId) {
        targetId = 'comparison-role-detail-anchor';
      }
    }

    // Scroll to the resolved target element or just to the absolute top of the viewport
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);

    prevTabRef.current = activeTab;
  }, [activeTab, selectedRoleId]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Dynamic order of tabs - Sorted alphabetically by their visible section labels
  const [tabOrder, setTabOrder] = useState<string[]>(['about', 'saved', 'map', 'comparison', 'pathfinder', 'libraries', 'hr-contacts']);

  const [draggedTabId, setDraggedTabId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTabId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedTabId && draggedTabId !== id) {
      const fromIndex = tabOrder.indexOf(draggedTabId);
      const toIndex = tabOrder.indexOf(id);
      const newOrder = [...tabOrder];
      newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, draggedTabId);
      setTabOrder(newOrder);
      localStorage.setItem('mapit_tab_sequence', JSON.stringify(newOrder));
    }
  };

  const handleDragEnd = () => {
    setDraggedTabId(null);
  };

  const moveTabLeft = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === 0) return;
    const newOrder = [...tabOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    setTabOrder(newOrder);
    localStorage.setItem('mapit_tab_sequence', JSON.stringify(newOrder));
  };

  const moveTabRight = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === tabOrder.length - 1) return;
    const newOrder = [...tabOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    setTabOrder(newOrder);
    localStorage.setItem('mapit_tab_sequence', JSON.stringify(newOrder));
  };

  // Viewport scrolling helpers
  const handleScrollToSection = (elementId: string) => {
    // If we're on a tab and want to inspect selected role, scroll to bottom anchor quickly and responsively
    const el = document.getElementById(elementId);
    if (el) {
      const offset = 100; // Offset in pixels to leave elegant margin above and fit sticky headers
      const targetElementY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
      const startY = window.scrollY;
      const distance = targetElementY - startY;
      const duration = 450; // Responsive, snappy glide duration
      let startTime: number | null = null;

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setBlinkSectionId(tabId);
    setTimeout(() => {
      setBlinkSectionId((curr) => curr === tabId ? null : curr);
    }, 1200);
  };

  const handleOpenEventInResources = (eventId: string) => {
    setHackathonsSelectedItemId(eventId);
    setHackathonsSearchQuery('');
    setLibrariesActiveTab('hackathons');
    setActiveTab('libraries');
    setTimeout(() => {
      const el = document.getElementById('section-libraries');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleGoToAllEvents = () => {
    setHackathonsSearchQuery('');
    setLibrariesActiveTab('hackathons');
    setActiveTab('libraries');
    setTimeout(() => {
      const el = document.getElementById('section-libraries');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'light-theme' : 'bg-[#03060c]'} text-slate-100 font-sans relative flex flex-col md:flex-row overflow-x-hidden`}>
      
      {/* Decorative Outer Screen Bezel border styling */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ef4444] via-[#eab308] to-[#10b981] z-50 pointer-events-none" />

      {/* Retro scanline effect mask layer */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015] z-50 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* INTRO SPLASH OVERLAY & FLOATING LOGO */}
      {introStage !== 'done' && (
        <>
          {/* Shutter Layer that fades to transparent */}
          <div 
            className={`fixed inset-0 z-[99990] flex flex-col items-center justify-center transition-all duration-[1000ms] ease-in-out select-none pointer-events-none ${
              introStage === 'floating' 
                ? 'bg-transparent opacity-0' 
                : (theme === 'light' ? 'bg-white' : 'bg-[#03060c]')
            }`}
          >
            {/* Soft radial glow in the center behind the logo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.07)_0%,transparent_75%)]" />
            
            {/* Loader indicator subtitle */}
            <div className={`absolute bottom-16 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500/70 transition-opacity duration-500 ${
              introStage === 'centered' ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}>
              ⚡ INITIALIZING MAPIT ENGINE ⚡
            </div>
          </div>

          {/* Floating Branding Component */}
          <motion.div
            initial={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              scale: 2.8,
              zIndex: 99995,
              opacity: 0,
            }}
            animate={
              introStage === 'blank' || introStage === 'centered'
                ? {
                    left: '50%',
                    top: '50%',
                    x: '-50%',
                    y: '-50%',
                    scale: 2.8,
                    opacity: introStage === 'blank' ? 0 : 1,
                  }
                : {
                    left: isMobile ? '10px' : (isSidebarMinimized ? '20px' : '16px'),
                    top: isMobile ? '14px' : (isSidebarMinimized ? '16px' : '20px'),
                    x: '0%',
                    y: '0%',
                    scale: 1.0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1], // ultra-smooth ease-out (exponential decay)
            }}
            className="pointer-events-none select-none font-sans font-black flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {introStage === 'blank' || introStage === 'centered' || (!isMobile && !isSidebarMinimized) ? (
                <motion.h1
                  key="full-logo"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl font-black font-sans leading-none flex items-center tracking-tighter"
                >
                  <span className="preserve-logo">Map</span>
                  <span className="preserve-logo-green">IT</span>
                </motion.h1>
              ) : isMobile ? (
                <motion.div
                  key="mobile-logo"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="w-10 h-8 rounded-md bg-[#10b981] text-[#070b13] flex items-center justify-center font-sans font-black text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                >
                  MI
                </motion.div>
              ) : (
                <motion.div
                  key="minimized-logo"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="text-md font-black font-sans preserve-logo-bg border border-slate-800 w-8 h-8 flex items-center justify-center rounded-sm"
                >
                  <span className="preserve-logo">M</span>
                  <span className="preserve-logo-green">I</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Backdrop overlay for mobile expanded sidebar */}
      {isScrolled && (
        <div className={`fixed top-3 z-[9990] flex items-center justify-center font-mono pointer-events-auto transition-all duration-[700ms] ease-in-out ${
          isChatOpen 
            ? (isSidebarMinimized ? 'left-4 md:left-[88px]' : 'left-4 md:left-[276px]') 
            : 'right-4'
        }`}>
          <div className="bg-[#070b13]/85 border-2 border-emerald-500/80 p-1 px-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md flex items-center gap-2">
            {renderHistoryNavigationArrows("scale-100", false)}
          </div>
        </div>
      )}

      {/* LEFT SIDE PANEL - Locked & Frozen on scroll, hidden completely on mobile */}
      <aside 
        className={`hidden md:flex md:border-r-2 border-[#121c38]/80 flex-col justify-between transition-all duration-[300ms] ease-in-out z-50 shrink-0 select-none pb-4 h-screen fixed left-0 top-0 ${
          isSidebarExpanded 
            ? 'w-[260px] bg-[#070b13]/20 backdrop-blur-md sidebar-expanded' 
            : 'w-[72px] bg-[#070b13] sidebar-collapsed'
        } ${introStage === 'blank' || introStage === 'centered' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onMouseEnter={() => {
          setIsSidebarHovered(true);
        }}
        onMouseLeave={() => {
          setIsSidebarHovered(false);
          setIsSidebarMinimized(true);
        }}
      >
        {/* Friendly scrolling ant guest inside side panel */}
        {activeTab !== 'about' && <SidebarAnt theme={theme} />}

        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Logo / branding block */}
          <div className="p-4 border-b border-[#121c38]/60 flex items-center justify-between min-h-[64px]">
            <div className={`w-full flex items-center justify-between ${introStage !== 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {isSidebarExpanded ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 justify-between w-full">
                    <h1 className="text-2xl font-black font-sans leading-none flex items-center tracking-tighter">
                      <span className="preserve-logo">Map</span>
                      <span className="preserve-logo-green">IT</span>
                    </h1>
                    
                    {/* Dedicated Close Arrow inside mobile drawer */}
                    <button 
                      onClick={() => setIsSidebarMinimized(true)}
                      className="md:hidden p-1.5 bg-[#04070e] hover:bg-slate-950 border border-[#1e2e54] text-gray-400 hover:text-white rounded-xs focus:outline-none transition cursor-pointer"
                      title="Close navigation panel"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="hidden md:block">
                    {!isScrolled && renderHistoryNavigationArrows("", true)}
                  </div>
                </div>
              ) : (
                <div className="mx-auto block w-full">
                  <div className="flex items-center justify-between md:justify-center w-full">
                    <span className="text-md font-black font-sans preserve-logo-bg border border-slate-800 w-8 h-8 flex items-center justify-center">
                      <span className="preserve-logo">M</span>
                      <span className="preserve-logo-green">I</span>
                    </span>
                    
                    {/* Drawer toggle for small screens */}
                    <button 
                      onClick={() => setIsSidebarMinimized(true)}
                      className="md:hidden p-1.5 bg-[#04070e] hover:bg-slate-950 border border-[#1e2e54] text-gray-400 hover:text-white rounded-xs focus:outline-none transition cursor-pointer"
                      title="Close navigation panel"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vertical Menu navigation lists */}
          <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto">
            {tabOrder.map((tabId, index) => {
              const tabDetails = TAB_METADATA[tabId];
              if (!tabDetails) return null;
              const isActive = activeTab === tabId;
              const isDraggedThis = draggedTabId === tabId;
              const Icon = tabDetails.icon;

              return (
                <div key={tabId} className="flex flex-col">
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, tabId)}
                    onDragOver={(e) => handleDragOver(e, tabId)}
                    onDragEnd={handleDragEnd}
                    className={`relative group flex items-center justify-between border border-transparent transition-all duration-200 rounded-sm cursor-grab active:cursor-grabbing ${
                      isActive 
                        ? tabDetails.activeStyle 
                        : 'text-gray-400 hover:text-slate-200 hover:bg-slate-900/60'
                    } ${isDraggedThis ? 'opacity-30 border-dashed border-gray-600 bg-slate-950' : ''}`}
                    title={!isSidebarExpanded ? `${tabDetails.label} (Drag to reorder)` : "Drag up/down or click arrows to reorder!"}
                  >
                    <button
                      onClick={() => {
                        handleTabClick(tabId);
                      }}
                      className="flex-1 flex items-center py-1.5 px-2 text-left transition-colors duration-150 relative cursor-pointer"
                    >
                      {/* Icon section with transition width */}
                      <div 
                        className="flex items-center justify-center shrink-0 w-5 mr-2.5"
                      >
                        <Icon 
                          className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                            isActive 
                              ? `${tabDetails.colorClass} animate-pulse` 
                              : 'text-slate-400 group-hover:text-slate-300'
                          }`} 
                          style={isActive ? { animationDuration: '2s' } : {}}
                        />
                      </div>

                      {/* Text block width transition section */}
                      <div 
                        className={`overflow-hidden transition-all duration-[300ms] ease-in-out whitespace-nowrap flex-1 ${
                          isSidebarExpanded 
                            ? 'max-w-[200px] opacity-100' 
                            : 'max-w-0 opacity-0 pointer-events-none'
                        }`}
                      >
                        <span className="text-[11px] font-mono font-bold tracking-tight uppercase flex items-center gap-1.5">
                          {tabId === 'hr-contacts' && (
                            <span className="bg-yellow-400 text-black px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase rounded-xs tracking-wide">
                              beta
                            </span>
                          )}
                          {tabDetails.label}
                        </span>
                      </div>

                      {/* Active indicator badge when minimized */}
                      {!isSidebarExpanded && isActive && (
                        <span className={`absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${tabDetails.colorClass} shadow-lg`} />
                      )}
                    </button>

                    {/* Move Up/Down Arrow utilities inside sidebar hover */}
                    {isSidebarExpanded && (
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 pr-1 transition-all duration-150 shrink-0">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={(e) => moveTabLeft(index, e)}
                            className="p-0.5 bg-slate-950 hover:bg-[#121c38] border border-slate-800 text-[8px] text-gray-400 hover:text-[#10b981] rounded-xs cursor-pointer select-none font-bold"
                            title="Move Up"
                          >
                            ▲
                          </button>
                        )}
                        {index < tabOrder.length - 1 && (
                          <button
                            type="button"
                            onClick={(e) => moveTabRight(index, e)}
                            className="p-0.5 bg-slate-950 hover:bg-[#121c38] border border-slate-800 text-[8px] text-gray-400 hover:text-[#10b981] rounded-xs cursor-pointer select-none font-bold"
                            title="Move Down"
                          >
                            ▼
                          </button>
                        )}
                      </div>
                    )}

                     {/* Chevron toggle button for Resources tab dropdown */}
                    {isSidebarExpanded && tabId === 'libraries' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
                        }}
                        className="p-1 mr-1 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded transition cursor-pointer shrink-0"
                        title={isResourcesDropdownOpen ? "Collapse Resources sub-options" : "Expand Resources sub-options"}
                      >
                        {isResourcesDropdownOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>
                    )}

                    {/* Popover text tooltips for minimized state */}
                    {!isSidebarExpanded && (
                      <div className="absolute left-[76px] bg-[#070b13] border border-[#1e2e54] text-[9.5px] tracking-wider px-2.5 py-1.5 whitespace-nowrap hidden group-hover:block transition-all z-50 pointer-events-none font-mono font-bold rounded-xs shadow-[3px_3px_0px_#121c38]">
                        <span className={`${tabDetails.colorClass} mr-1.5 font-bold`}>►</span> {tabDetails.label.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Dropdown sub-menu if tabId is 'libraries' and expanded */}
                  {tabId === 'libraries' && isSidebarExpanded && isResourcesDropdownOpen && (
                    <div className="mt-0.5 ml-3 pl-2 border-l border-cyan-800/40 space-y-0.5 flex flex-col">
                      {[
                        { id: 'hackathons', label: 'Hackathons & Events', icon: Trophy },
                        { id: 'youtubeTeachers', label: 'YouTube Teachers', icon: Video },
                        { id: 'channels', label: 'Study Portals', icon: BookOpen },
                        { id: 'tools-skills', label: 'Skills & Tools Pool', icon: Terminal },
                        { id: 'certs', label: 'Certifications', icon: Award },
                        { id: 'bookshelf', label: 'Bookshelf', icon: Book },
                      ].map((sub) => {
                        const isSubActive = activeTab === 'libraries' && librariesActiveTab === sub.id;
                        const SubIcon = sub.icon;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setLibrariesActiveTab(sub.id as any);
                              handleTabClick('libraries');
                            }}
                            className={`w-full flex items-center py-1 px-1.5 text-left text-[10px] font-mono font-bold tracking-tight rounded-xs transition-all cursor-pointer ${
                              isSubActive
                                ? 'text-cyan-400 bg-cyan-950/20 border-l border-cyan-400 pl-2'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                            }`}
                          >
                            <SubIcon className={`w-3 h-3 mr-1.5 shrink-0 ${isSubActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                            <span className="truncate">{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Global Search Box - Styled beautifully */}
            {isSidebarExpanded && (
              <div className="px-2 py-3 border-t border-[#121c38]/40 mt-3 font-mono">
                <div className="relative">
                  <input
                    type="text"
                    placeholder=""
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    className={`w-full text-xs font-mono p-2 pl-8 pr-8 rounded-none border focus:outline-none focus:border-[#10b981] ${
                      theme === 'light'
                        ? 'bg-slate-50 border-gray-300 text-slate-900 placeholder-gray-500'
                        : 'bg-[#05070c] border-[#1e2e54] text-white placeholder-gray-600'
                    }`}
                  />
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-500 animate-pulse" />
                  {globalSearchQuery && (
                    <button
                      onClick={() => setGlobalSearchQuery('')}
                      className="absolute right-2 top-1.5 text-gray-400 hover:text-white text-sm font-bold cursor-pointer px-1"
                      title="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>
                {lastGlobalSearchQuery && !globalSearchQuery && (
                  <button
                    onClick={() => {
                      setGlobalSearchQuery(lastGlobalSearchQuery);
                      setLastGlobalSearchQuery('');
                    }}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 mt-1.5 font-bold font-mono hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-0 p-0 text-left"
                  >
                    ↩ Go back to results
                  </button>
                )}
              </div>
            )}

            {!isSidebarExpanded && (
              <div className="px-2 py-3 border-t border-[#121c38]/40 mt-3 font-mono flex justify-center relative">
                <button
                  ref={floatingTriggerRef}
                  type="button"
                  onMouseEnter={() => setIsFloatingSearchOpen(true)}
                  onClick={() => setIsFloatingSearchOpen(!isFloatingSearchOpen)}
                  className={`p-2 hover:bg-slate-900 text-[#10b981] hover:text-white transition rounded-sm border ${
                    isFloatingSearchOpen 
                      ? 'bg-emerald-950/40 border-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                      : 'border-[#1e2e54]/50'
                  } cursor-pointer flex items-center justify-center relative group`}
                  title="Search Portal"
                >
                  <Search className="w-4 h-4 animate-pulse" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-[54px] bg-[#070b13] border border-[#1e2e54] text-[9.5px] tracking-wider px-2.5 py-1.5 whitespace-nowrap hidden group-hover:block transition-all z-50 pointer-events-none font-mono font-bold rounded-xs shadow-[3px_3px_0px_#121c38]">
                    <span className="text-[#10b981] mr-1.5 font-bold">►</span> SEARCH KEYWORDS
                  </div>
                </button>
              </div>
            )}
          </nav>

          {/* FLOATING HOVER SEARCH BOX FOR MINIMIZED SIDEBAR */}
          {!isSidebarExpanded && isFloatingSearchOpen && (
            <div 
              ref={floatingSearchRef}
              className={`fixed left-[72px] bottom-[140px] sm:bottom-[180px] md:bottom-auto md:top-[180px] z-[999] p-3 border-2 shadow-[6px_6px_0px_0px_rgba(16,185,129,0.25)] rounded-none w-72 ${
                theme === 'light'
                  ? 'bg-white border-emerald-500 text-slate-800'
                  : 'bg-[#060b14] border-[#10b981] text-white shadow-[6px_6px_0px_0px_#121c38]'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-[10px] font-mono font-bold text-[#10b981] uppercase tracking-wider flex items-center">
                  <Search className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="relative font-mono">
                <input
                  autoFocus
                  type="text"
                  placeholder=""
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  className={`w-full text-xs font-mono p-2 pl-2 pr-8 rounded-none border focus:outline-none focus:border-[#10b981] ${
                    theme === 'light'
                      ? 'bg-slate-50 border-gray-300 text-slate-900'
                      : 'bg-[#05070c] border-[#1e2e54] text-white'
                  }`}
                />
                {globalSearchQuery && (
                  <button
                    onClick={() => setGlobalSearchQuery('')}
                    className="absolute right-2 top-1.5 text-gray-400 hover:text-white text-sm font-bold cursor-pointer px-1"
                  >
                    ×
                  </button>
                )}
              </div>
              {lastGlobalSearchQuery && !globalSearchQuery && (
                <button
                  onClick={() => {
                    setGlobalSearchQuery(lastGlobalSearchQuery);
                    setLastGlobalSearchQuery('');
                  }}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 mt-1.5 font-bold font-mono hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-0 p-0 text-left"
                >
                  ↩ Go back to results
                </button>
              )}
              {/* Text helper removed per user request */}
            </div>
          )}

          {/* Sidebar Bottom Sync Diagnostics & Theme */}
          <div 
            onMouseEnter={() => setIsHoveringBottomArea(true)}
            onMouseLeave={() => setIsHoveringBottomArea(false)}
            className="p-2 border-t border-[#121c38]/50 space-y-1.5 mt-auto bg-[#04070e]/80"
          >
            {/* Visual Theme Selector */}
            {isSidebarExpanded ? (
              <div className="pb-1.5 border-b border-[#121c38]/40 mb-1">
                <button
                  onClick={toggleTheme}
                  data-theme-switch="true"
                  className="mt-1 w-full py-1 px-2 bg-slate-950 hover:bg-[#121c38]/40 border border-slate-800 text-[10px] font-mono font-bold flex items-center justify-between transition cursor-pointer text-slate-300"
                  title="Toggle Visual theme of website"
                >
                  <span className="flex items-center gap-1.5">
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </span>

                </button>
              </div>
            ) : (
              <button
                onClick={toggleTheme}
                onDoubleClick={() => {
                  setIsSidebarMinimized(false);
                }}
                data-theme-switch="true"
                className="w-full flex items-center justify-center p-2 mb-1.5 hover:bg-slate-900 text-gray-400 hover:text-white transition rounded-sm border border-[#1e2e54]/50 cursor-pointer"
                title={theme === 'dark' ? "Switch to Light Theme (Double click to expand)" : "Switch to Dark Theme (Double click to expand)"}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-500" />}
              </button>
            )}

            {/* World clocks section */}
            {isSidebarExpanded ? (
              <div className="space-y-1 pt-1.5 border-t border-[#121c38]/40">
                <div className="grid grid-cols-2 gap-1.5 justify-center justify-items-center w-full px-1 animate-fade-in">
                  <AnalogClock timeZone="Asia/Kolkata" label="India" countryCode="IN" flag="🇮🇳" isMinimized={true} theme={theme} />
                  <AnalogClock timeZone="America/New_York" label="USA" countryCode="US" flag="🇺🇸" isMinimized={true} theme={theme} />
                  <AnalogClock timeZone="Asia/Tokyo" label="Japan" countryCode="JP" flag="🇯🇵" isMinimized={true} theme={theme} />
                  <AnalogClock timeZone="Europe/London" label="United Kingdom" countryCode="GB" flag="🇬🇧" isMinimized={true} theme={theme} />
                </div>
              </div>
            ) : (
              <div 
                onClick={() => {
                  setIsSidebarMinimized(false);
                }}
                className="flex flex-col items-center gap-1 pt-1.5 border-t border-[#121c38]/30 cursor-pointer w-full group/clocks"
                title="Click to expand side panel"
              >
                {/* Minimized round clocks in a 2x2 grid to save space and prevent scrolling */}
                <div className="grid grid-cols-2 gap-1.5 justify-center justify-items-center w-full px-1 group-hover/clocks:scale-105 transition-transform duration-200">
                  <AnalogClock timeZone="Asia/Kolkata" label="India" countryCode="IN" flag="🇮🇳" isMinimized={true} theme={theme} />
                  <AnalogClock timeZone="America/New_York" label="USA" countryCode="US" flag="🇺🇸" isMinimized={true} theme={theme} />
                  <AnalogClock timeZone="Asia/Tokyo" label="Japan" countryCode="JP" flag="🇯🇵" isMinimized={true} theme={theme} />
                  <AnalogClock timeZone="Europe/London" label="United Kingdom" countryCode="GB" flag="🇬🇧" isMinimized={true} theme={theme} />
                </div>

                <div className="flex justify-center py-0.5 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* CORE PAGE AREA CONTAINER */}
      <div className={`flex-1 min-w-0 flex flex-col min-h-screen relative transition-all duration-[300ms] ease-in-out checker-pattern md:pl-[72px] ${
        introStage === 'blank' || introStage === 'centered' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        
        {/* NEW FLOATING HEADER DOCK - DESKTOP ONLY */}
        <header className={`hidden md:flex transition-all duration-[700ms] ease-in-out p-3 items-center justify-between sticky top-0 z-30 backdrop-blur-md ${
          isScrolled 
            ? 'bg-transparent border-b-0' 
            : 'bg-transparent border-b-2 border-[#121c38]/40'
        }`}>
          <div className="flex items-center gap-3">
            {/* Mobile Navigation Drawer Activation Trigger */}
            <button
              onClick={() => setIsSidebarMinimized(false)}
              className="md:hidden p-2 bg-[#121c38]/60 hover:bg-[#121c38] border border-[#1e2e54] text-white hover:text-[#10b981] rounded-xs cursor-pointer focus:outline-none flex items-center justify-center shrink-0 transition duration-150"
              title="Open navigation drawers"
            >
              <Menu className="w-4 h-4 text-[#10b981]" />
            </button>

            {/* Path indicator - Removed Active Registry label */}
          </div>

          <div className="flex items-center gap-3 select-none text-[10px] font-mono text-gray-400">
            {isSidebarMinimized && !isScrolled && (
              <div className="flex items-center font-mono z-40">
                {renderHistoryNavigationArrows("scale-90", false)}
              </div>
            )}
          </div>
        </header>

        {/* MOBILE COHESIVE UNIFIED SEARCH HEADER (LinkedIn App Standard) */}
        <header className="flex md:hidden sticky top-0 z-40 backdrop-blur-md bg-[#070b13]/90 border-b border-[#121c38]/60 p-2.5 flex-col gap-2">
          <div className="flex items-center justify-between gap-2.5">
            {/* Tiny brand logo showing the initials "MI" */}
            <div className={`${introStage !== 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <button 
                type="button"
                onClick={() => setShowMobileClocksRibbon(!showMobileClocksRibbon)}
                className="w-10 h-8 rounded-md bg-[#10b981] text-[#070b13] flex items-center justify-center font-sans font-black text-sm shrink-0 cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition focus:outline-none border-0"
                title="Click to view live world clocks and theme toggle!"
              >
                MI
              </button>
            </div>

            {/* Unified Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={mobileSearchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search roles, skills, books, certs..."
                className="w-full pl-8.5 pr-2.5 py-1.5 text-xs font-sans rounded-md border text-slate-100 placeholder-slate-400 bg-[#111827]/80 border-slate-700/60 focus:outline-none transition-all focus:bg-[#0f172a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/50"
              />
              {mobileSearchQuery && (
                <button
                  type="button"
                  onClick={() => setMobileSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* About Info Trigger Beside Search Bar */}
            <button
              onClick={() => setActiveTab('about')}
              className={`p-2 rounded-full flex items-center justify-center border transition shrink-0 cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-[#10b981]/15 border-[#10b981] text-[#10b981]'
                  : 'bg-[#111827]/80 border-slate-700/60 text-gray-300 hover:text-white'
              }`}
              title="About Information View"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Animated horizontal clocks & theme ribbon */}
          <AnimatePresence>
            {showMobileClocksRibbon && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden bg-[#070b13] border border-[#1e2e54]/80 p-2 flex items-center justify-between gap-1"
              >
                {/* 4 live clocks with labels but horizontal, small, minimized layout */}
                <div className="flex-1 flex items-center justify-around gap-1 overflow-x-auto py-0.5 scrollbar-none">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-[7px] text-gray-400 font-mono font-bold leading-none uppercase mb-1">IND</span>
                    <AnalogClock timeZone="Asia/Kolkata" label="IN" countryCode="IN" flag="🇮🇳" isMinimized={true} theme={theme} />
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-[7px] text-gray-400 font-mono font-bold leading-none uppercase mb-1">USA</span>
                    <AnalogClock timeZone="America/New_York" label="NY" countryCode="US" flag="🇺🇸" isMinimized={true} theme={theme} />
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-[7px] text-gray-400 font-mono font-bold leading-none uppercase mb-1">JPN</span>
                    <AnalogClock timeZone="Asia/Tokyo" label="TY" countryCode="JP" flag="🇯🇵" isMinimized={true} theme={theme} />
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-[7px] text-gray-400 font-mono font-bold leading-none uppercase mb-1">GBR</span>
                    <AnalogClock timeZone="Europe/London" label="UK" countryCode="GB" flag="🇬🇧" isMinimized={true} theme={theme} />
                  </div>
                </div>

                <div className="h-8 w-px bg-[#1e2e54]/50 mx-1" />

                {/* Dark mode / Light mode toggle icon with no label */}
                <button
                  type="button"
                  data-theme-switch="true"
                  onClick={toggleTheme}
                  className="p-2 cursor-pointer bg-[#0c1324] border border-[#1e2e54] hover:border-[#10b981] text-gray-300 hover:text-white rounded-md shrink-0 flex items-center justify-center transition"
                  title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Autocomplete Droplist Overlay */}
          <AnimatePresence>
            {isSearchFocused && (
              <>
                <div 
                  className="fixed inset-0 bg-transparent z-[39]" 
                  onClick={() => setIsSearchFocused(false)} 
                />
                
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-0 right-0 top-12 max-h-[280px] overflow-y-auto bg-[#070b13] border border-[#1e2e54] shadow-2xl rounded-md z-40 p-1 divide-y divide-slate-800/60 custom-scrollbar text-left"
                >
                  {mobileSearchResults.length > 0 ? (
                    mobileSearchResults.map((item) => (
                      <div
                        key={`${item.category}-${item.id}`}
                        onClick={() => handleSelectSearchItem(item)}
                        className="p-2.5 hover:bg-[#10b981]/15 font-sans cursor-pointer flex flex-col transition text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-100 text-xs">{item.name}</span>
                          <span className={`text-[9px] uppercase px-1.5 py-0.5 border font-semibold ${
                            item.category === 'role' ? 'border-[#10b981]/30 text-[#10b981] bg-[#10b981]/5' :
                            item.category === 'domain' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                            item.category === 'cert' ? 'border-purple-500/30 text-purple-400 bg-purple-500/5' :
                            item.category === 'book' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5' :
                            'border-pink-500/30 text-pink-400 bg-pink-500/5'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5">{item.subtext}</span>
                      </div>
                    ))
                  ) : mobileSearchQuery.trim() ? (
                    <div className="p-4 text-center text-slate-400 text-xs font-mono">
                      No results matched "{mobileSearchQuery}"
                    </div>
                  ) : (
                    <div className="p-3 text-left space-y-2">
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider px-1">Suggested Searches</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['AWS', 'Cybersecurity', 'DevOps', 'Penetration Tester', 'Cloud Systems Engineer', 'Python'].map(keyword => (
                          <button
                            key={keyword}
                            type="button"
                            onClick={() => setMobileSearchQuery(keyword)}
                            className="bg-[#111827] border border-slate-800 hover:border-slate-700 text-slate-300 text-[10px] px-2 py-1 cursor-pointer transition"
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </header>

        {/* MAIN APPLICATION WINDOW WITH FLUID FRAMER-MOTION ENTRY TRANSITIONS */}
        <main className="w-full max-w-full px-4 sm:px-6 md:px-8 mt-2 min-h-[500px] flex-1 relative">
          {/* Mobile-only Ant companion box */}
          {isMobile && (
            <div className="relative w-full h-11 bg-[#081121] border border-[#1e2e54] overflow-hidden mb-3.5 px-3 flex items-center justify-between rounded-none shadow-[2px_2px_0px_rgba(30,46,84,0.4)]">
              <div className="z-10 flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                </span>
              </div>
              <div className="absolute inset-0 pointer-events-auto">
                <SidebarAnt theme={theme} />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={globalSearchQuery.trim() !== '' ? 'search-results' : activeTab}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full h-full"
            >
              {globalSearchQuery.trim() !== '' ? (
                <div className="w-full space-y-6">
                  <div className={`p-6 border-2 rounded-none relative transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white border-gray-200 text-slate-800 shadow-[4px_4px_0px_0px_#cbd5e1]'
                      : 'bg-[#070b13] border-[#121c38] text-white shadow-[4px_4px_0px_0px_#1e2e54]'
                  }`}>
                    <div className="flex items-center justify-between border-b-2 border-slate-700/30 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <Search className="w-7 h-7 text-[#10b981] animate-pulse" />
                        <div>
                          <h2 className={`text-xl font-mono font-bold uppercase tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Global Knowledge Search</h2>
                          <p className="text-xs text-gray-400 font-mono">Results matching: <span className="text-[#10b981] font-bold">"{globalSearchQuery}"</span></p>
                        </div>
                      </div>
                      <button
                        onClick={() => setGlobalSearchQuery('')}
                        className="px-3 py-1.5 border border-red-500/50 text-red-400 text-xs font-mono font-bold hover:bg-red-500/10 transition cursor-pointer flex items-center gap-1.5"
                      >
                        Close Search
                      </button>
                    </div>

                    {globalSearchResults.domains.length === 0 && 
                     globalSearchResults.roles.length === 0 &&
                     globalSearchResults.certs.length === 0 &&
                     globalSearchResults.books.length === 0 &&
                     globalSearchResults.teachers.length === 0 &&
                     globalSearchResults.hackathons.length === 0 ? (
                      <div className="py-12 text-center font-mono space-y-3">
                        <div className="text-gray-500 text-sm">No exact career domains, roles, certifications, books, instructors, or tech events matched your keyword.</div>
                        <div className="text-xs text-gray-600">Try searching for other terms like "AWS", "SQL", "Cybersecurity", "Python", "SRE", or "Hackathon".</div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Matching Domains */}
                        {globalSearchResults.domains.length > 0 && (
                          <div className="space-y-3">
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#eab308] border-b border-yellow-500/20 pb-1 flex items-center gap-2">
                              📂 Matching Career Domains ({globalSearchResults.domains.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {globalSearchResults.domains.map(domain => (
                                <div 
                                  key={domain.id}
                                  className={`border-2 p-4 flex flex-col justify-between rounded-none transition-all duration-300 hover:translate-y-[-2px] ${
                                    theme === 'light'
                                      ? 'bg-slate-50 border-gray-200 hover:border-[#eab308] text-slate-800'
                                      : 'bg-[#0a101f] border-[#1e2e54] hover:border-[#eab308] text-white'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xl">{(domain as any).icon || '📂'}</span>
                                      <h4 className="font-mono font-bold text-sm tracking-tight">{domain.name}</h4>
                                    </div>
                                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-4">{domain.description}</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setLastGlobalSearchQuery(globalSearchQuery);
                                      setCareerMapDomainId(domain.id);
                                      setActiveTab('map');
                                      setGlobalSearchQuery('');
                                      
                                      window.scrollTo({ top: 0, behavior: 'auto' as any });
                                      setTimeout(() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        const el = document.getElementById('section-map');
                                        if (el) {
                                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                      }, 150);
                                    }}
                                    className="w-full py-1.5 px-2.5 bg-[#eab308] hover:bg-yellow-600 text-black text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer text-center"
                                  >
                                    Explore Domain Map
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matching Roles */}
                        {globalSearchResults.roles.length > 0 && (
                          <div className="space-y-3">
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#8b5cf6] border-b border-purple-500/20 pb-1 flex items-center gap-2">
                              📋 Matching Career Roles ({globalSearchResults.roles.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                              {globalSearchResults.roles.slice(0, 3).map(role => {
                                const foundDomainName = IT_DOMAINS.find(d => d.roles.includes(role.id))?.name || role.domain;
                                return (
                                  <div 
                                    key={role.id}
                                    className={`border-2 p-4 flex flex-col justify-between rounded-none transition-all duration-300 hover:translate-y-[-2px] ${
                                      theme === 'light'
                                        ? 'bg-slate-50 border-gray-200 hover:border-purple-500 text-slate-800'
                                        : 'bg-[#0a101f] border-[#1e2e54] hover:border-[#8b5cf6] text-white'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-mono uppercase bg-emerald-500/10 text-[#10b981] px-1.5 py-0.5 border border-emerald-500/20">
                                          {role.level}
                                        </span>
                                        <span className="text-[10px] font-mono text-gray-500 truncate max-w-[150px]" title={foundDomainName}>
                                          {foundDomainName}
                                        </span>
                                      </div>
                                      <h4 className="font-mono font-bold text-sm tracking-tight mb-1 uppercase truncate" title={role.title}>{role.title}</h4>
                                      <p className="text-[10px] text-gray-500 font-mono mb-2">Est. Salary: <strong className="text-emerald-400">{activeFilters.marketRegion === 'global' ? role.globalSalary : role.indiaSalary}</strong></p>
                                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-4">{role.roleAsk.explanation}</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setLastGlobalSearchQuery(globalSearchQuery);
                                        setSelectedRoleId(role.id);
                                        const foundDomain = IT_DOMAINS.find(d => d.roles.includes(role.id));
                                        if (foundDomain) {
                                          setCareerMapDomainId(foundDomain.id);
                                        }
                                        setActiveTab('map');
                                        setGlobalSearchQuery('');
                                        
                                        window.scrollTo({ top: 0, behavior: 'auto' as any });
                                        setTimeout(() => {
                                          window.scrollTo({ top: 0, behavior: 'smooth' });
                                          const el = document.getElementById('selected-role-focus-anchor') || document.getElementById(`role-detail-panel-${role.id}`);
                                          if (el) {
                                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                          }
                                        }, 150);
                                      }}
                                      className="w-full py-1.5 px-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer text-center"
                                    >
                                      View Profiling
                                    </button>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Redirect user to career domains with the keyword filter preencoded */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-[#1e2e54]/30 bg-[#0c1328]/30 mt-4 rounded-none">
                              <div className="text-xs text-gray-400 font-mono">
                                Showing {Math.min(3, globalSearchResults.roles.length)} of {globalSearchResults.roles.length} matching career roles. You can view all of them on our Interactive Career Domains card deck!
                              </div>
                              <button
                                onClick={() => {
                                  setLastGlobalSearchQuery(globalSearchQuery);
                                  setSearchQuery(globalSearchQuery);
                                  setActiveTab('map');
                                  setGlobalSearchQuery('');
                                  
                                  window.scrollTo({ top: 0, behavior: 'auto' as any });
                                  setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    const el = document.getElementById('section-map');
                                    if (el) {
                                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                  }, 150);
                                }}
                                className="px-4 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer flex items-center gap-1.5 shrink-0 shadow-[3px_3px_0px_#1e2e54]"
                              >
                                See More Related Roles &rarr;
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Matching Hackathons & Tech Events */}
                        {globalSearchResults.hackathons.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-gray-800/20">
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-orange-500 border-b border-orange-500/20 pb-1 flex items-center gap-2">
                              🏆 Matching Hackathons & Tech Events ({globalSearchResults.hackathons.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {globalSearchResults.hackathons.slice(0, 3).map(item => (
                                <div 
                                  key={item.id}
                                  className={`border-2 p-4 flex flex-col justify-between rounded-none transition-all duration-300 hover:translate-y-[-2px] ${
                                    theme === 'light'
                                      ? 'bg-slate-50 border-gray-200 hover:border-orange-500 text-slate-800'
                                      : 'bg-[#0a101f] border-[#1e2e54] hover:border-orange-500 text-white'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1.5 mb-2">
                                      <div className="flex items-center gap-1.5">
                                        <Trophy className="w-4 h-4 text-orange-500 shrink-0" />
                                        <span className="text-[10px] font-mono text-orange-500 uppercase font-bold tracking-wider">Tech Event</span>
                                      </div>
                                      {item.daysLeft !== undefined && item.daysLeft > 0 && (
                                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border border-orange-500/20 bg-orange-500/10 text-orange-500">
                                          {item.daysLeft}d left
                                        </span>
                                      )}
                                    </div>
                                    <h4 className="font-mono font-bold text-xs tracking-tight uppercase truncate" title={item.title}>{item.title}</h4>
                                    <p className="text-[9px] text-gray-500 font-mono mb-2">Organizer: {item.organizer} | Region: {item.region}</p>
                                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-4">{item.description}</p>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setLastGlobalSearchQuery(globalSearchQuery);
                                      setHackathonsSelectedItemId(item.id);
                                      setLibrariesActiveTab('hackathons');
                                      setActiveTab('libraries');
                                      setGlobalSearchQuery('');
                                      
                                      window.scrollTo({ top: 0, behavior: 'auto' as any });
                                      setTimeout(() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        const el = document.getElementById('section-libraries');
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                      }, 150);
                                    }}
                                    className="w-full py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-500 text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer text-center block"
                                  >
                                    Inspect Event &rarr;
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matching YouTube Channels & Teachers */}
                        {globalSearchResults.teachers.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-gray-800/20">
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-red-500 border-b border-red-500/20 pb-1 flex items-center gap-2">
                              🎥 YouTube Study Channels & Teachers ({globalSearchResults.teachers.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {globalSearchResults.teachers.slice(0, 3).map(teacher => (
                                <div 
                                  key={teacher.name}
                                  className={`border-2 p-4 flex flex-col justify-between rounded-none transition-all duration-300 hover:translate-y-[-2px] ${
                                    theme === 'light'
                                      ? 'bg-slate-50 border-gray-200 hover:border-red-500 text-slate-800'
                                      : 'bg-[#0a101f] border-[#1e2e54] hover:border-[#ef4444] text-white'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <Video className="w-4 h-4 text-red-500 shrink-0" />
                                      <span className="text-[10px] font-mono text-red-500 uppercase font-bold tracking-wider">YouTube Instructor</span>
                                    </div>
                                    <h4 className="font-mono font-bold text-xs tracking-tight uppercase truncate" title={teacher.name}>{teacher.name}</h4>
                                    <p className="text-[9px] text-gray-500 font-mono mb-2">Specialty: {teacher.skillArea}</p>
                                    {teacher.reason && (
                                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-4">{teacher.reason}</p>
                                    )}
                                  </div>
                                  <a 
                                    href={teacher.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer text-center block"
                                  >
                                    Visit Channel &rarr;
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matching Certifications */}
                        {globalSearchResults.certs.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-gray-800/20">
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-500 border-b border-amber-500/20 pb-1 flex items-center gap-2">
                              🎓 Matching Industry Certifications ({globalSearchResults.certs.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {globalSearchResults.certs.slice(0, 3).map(cert => (
                                <div 
                                  key={cert.id}
                                  className={`border-2 p-4 flex flex-col justify-between rounded-none transition-all duration-300 hover:translate-y-[-2px] ${
                                    theme === 'light'
                                      ? 'bg-slate-50 border-gray-200 hover:border-amber-500 text-slate-800'
                                      : 'bg-[#0a101f] border-[#1e2e54] hover:border-amber-500 text-white'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                                      <span className="text-[10px] font-mono text-amber-500 uppercase font-bold tracking-wider">Certification</span>
                                    </div>
                                    <h4 className="font-mono font-bold text-xs tracking-tight uppercase truncate" title={cert.name}>{cert.name}</h4>
                                    <p className="text-[9px] text-gray-500 font-mono mb-2">Provider: {cert.provider} | Level: {cert.difficulty}</p>
                                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-4">{cert.description}</p>
                                  </div>
                                  <a 
                                    href={cert.officialLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer text-center block animate-pulse"
                                  >
                                    Official Page &rarr;
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matching Books */}
                        {globalSearchResults.books.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-gray-800/20">
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#8b4513] dark:text-[#d2691e] border-b border-[#8b4513]/20 pb-1 flex items-center gap-2">
                              📖 Matching Edtech Bookshelf ({globalSearchResults.books.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {globalSearchResults.books.slice(0, 3).map(book => (
                                <div 
                                  key={book.title}
                                  className={`border-2 p-4 flex flex-col justify-between rounded-none transition-all duration-300 hover:translate-y-[-2px] ${
                                    theme === 'light'
                                      ? 'bg-slate-50 border-gray-200 hover:border-[#8b4513] text-slate-800'
                                      : 'bg-[#0a101f] border-[#1e2e54] hover:border-[#d2691e] text-white'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <BookOpen className="w-4 h-4 text-[#8b4513] dark:text-[#d2691e] shrink-0" />
                                      <span className="text-[10px] font-mono text-[#8b4513] dark:text-[#d2691e] uppercase font-bold tracking-wider">Recommended Book</span>
                                    </div>
                                    <h4 className="font-mono font-bold text-xs tracking-tight uppercase truncate" title={book.title}>{book.title}</h4>
                                    <p className="text-[9px] text-gray-500 font-mono mb-2">Author: {book.author}</p>
                                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 mb-4">{book.summary}</p>
                                  </div>
                                  <a 
                                    href={book.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-1.5 bg-[#8b4513]/10 hover:bg-[#8b4513]/20 border border-[#8b4513]/30 text-[#8b4513] dark:text-[#d2691e] text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer text-center block"
                                  >
                                    Explore Book &rarr;
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Option to explore more and use the resync engine */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-[#1e2e54]/30 bg-[#0c1328]/30 mt-4 rounded-none">
                          <div className="text-xs text-gray-400 font-mono">
                            Want custom recommendations or more guides? Visit our Resources and use the Google-grounded **Live Search Sync** engine!
                          </div>
                          <button
                            onClick={() => {
                              setLastGlobalSearchQuery(globalSearchQuery);
                              setLibrariesQuery(globalSearchQuery);
                              setYoutubeSearchQuery(globalSearchQuery);
                              setActiveTab('libraries');
                              setGlobalSearchQuery('');
                              
                              window.scrollTo({ top: 0, behavior: 'auto' as any });
                              setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                const el = document.getElementById('section-libraries');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 150);
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-none cursor-pointer flex items-center gap-1.5 shrink-0 shadow-[3px_3px_0px_#121c38]"
                          >
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Explore Resources & Sync &rarr;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedRole && (
                    <div id={`role-detail-panel-${selectedRole.id}`} className="fade-in mt-6">
                      <RoleDetailPanel 
                        role={selectedRole}
                        onClose={() => setSelectedRoleId(null)}
                        marketRegion={activeFilters.marketRegion}
                        isBookmarked={savedRoleIds.includes(selectedRole.id)}
                        onToggleBookmark={() => handleToggleBookmark(selectedRole.id)}
                        onNavigateToSection={handleNavigateToSection}
                        onCompareRole={handleCompareRoleDirectly}
                        isLight={theme === 'light'}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <>

        {/* 1. ABOUT VIEW - THE DEFAULT LANDING PAGE */}
        <div id="section-about" className={activeTab === 'about' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-6">
            
            {/* Split specifications & Cached Diagnostics Control Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Welcome (lg:col-span-6) */}
              <div className="lg:col-span-6 bg-[#070b13] border-2 border-[#121c38] p-8 relative overflow-hidden shadow-[4px_4px_0px_0px_#1e2e54] flex items-center justify-center min-h-[300px]">
                {activeTab === 'about' && <SidebarAnt theme={theme} />}
                <div className="flex flex-col items-center justify-center space-y-1 md:space-y-2 z-10 text-center select-none">
                  <span className="text-xs md:text-sm lg:text-base font-mono font-bold tracking-widest text-slate-400 uppercase">
                    WELCOME TO
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                    <span className="preserve-logo">MAP</span><span className="preserve-logo-green">IT</span>
                  </h1>
                </div>
              </div>

              {/* Right Column: Hackathons & Events Box (lg:col-span-6) */}
              <div className="lg:col-span-6 bg-[#070b13] border-2 border-[#121c38] p-6 relative overflow-hidden shadow-[4px_4px_0px_0px_#1e2e54] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
                      <h3 className="text-xl font-sans text-white font-extrabold tracking-tight">Hackathons & Tech Events</h3>
                    </div>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-mono px-2 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Live Synced
                    </span>
                  </div>

                  {isLoadingHackathons ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-2 font-mono text-xs text-gray-400">
                      <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
                      <span>Retrieving live directories...</span>
                    </div>
                  ) : appHackathons.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-500 font-mono">
                      No events currently retrieved.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appHackathons.slice(0, 3).map((item) => {
                        const isConcluded = item.daysLeft <= 0 || item.scheduleStatus === 'Closed';
                        return (
                          <div 
                            key={item.id} 
                            className="bg-[#0b1329] border border-[#1b2b54] p-3 rounded hover:border-[#2b3f7a]/80 transition-all flex flex-col justify-between space-y-2 group"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <h4 
                                onClick={() => handleOpenEventInResources(item.id)}
                                className="text-sm font-bold text-white hover:text-cyan-400 cursor-pointer transition-colors line-clamp-1 flex-1 font-sans flex items-center gap-1.5"
                                title="Click to inspect full details in Resources tab"
                              >
                                {item.title}
                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </h4>
                              <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                                isConcluded 
                                  ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                                  : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                              }`}>
                                {isConcluded ? 'Closed' : `${item.daysLeft}d left`}
                              </span>
                            </div>

                            <p className="text-xs text-gray-400 font-sans line-clamp-1">
                              {item.description || `${item.category} by ${item.organizer}`}
                            </p>

                            <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                              <span className="text-gray-500 truncate max-w-[140px]">{item.organizer} • {item.region}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <button 
                                  onClick={() => handleOpenEventInResources(item.id)}
                                  className="text-cyan-400 hover:text-cyan-300 font-semibold underline flex items-center gap-0.5"
                                >
                                  Open details
                                </button>
                                <span className="text-gray-600">|</span>
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  referrerPolicy="no-referrer"
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 flex items-center gap-0.5 font-semibold"
                                >
                                  Official site <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!isLoadingHackathons && appHackathons.length > 3 && (
                    <div className="pt-2 text-center">
                      <button 
                        onClick={handleGoToAllEvents}
                        className="w-full bg-white hover:bg-gray-100 border border-gray-300 text-slate-900 font-mono text-xs py-2 rounded transition-colors flex items-center justify-center font-bold"
                      >
                        &gt;
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* FOOTER CREDIT INFO CARD (Swapped from page bottom) */}
            <div className="border-t border-[#121c38]/40 pt-6 text-center text-xs font-mono text-gray-600 space-y-2">
              <div className="flex items-center justify-center gap-1.5 select-none text-slate-500 mb-3">
                <Award className="w-4 h-4 text-cyan-500/80" />
                <span>2026 | MAPIT FRAMEWORK</span>
              </div>
            </div>

            {/* ARCADE GAME SANDBOX (Visible below the actual footer) */}
            <div className="border-t border-[#121c38]/60 pt-6">
              <AntCrossingGame theme={theme} />
            </div>

          </section>
        </div>

        {/* 2. INTERACTIVE MAP VIEW */}
        <div id="section-map" className={activeTab === 'map' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-6">
            
            {/* Left: Dynamic Career Map (Full Width) */}
            <div className="w-full">
              <CareerMap 
                theme={theme}
                onSelectRole={(id) => {
                  setSelectedRoleId(id);
                  setTimeout(() => handleScrollToSection('selected-role-focus-anchor'), 100);
                }}
                selectedRoleId={selectedRoleId}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                isHighlighted={blinkSectionId === 'map'}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                isBookmarked={isBookmarked}
                activeDomainId={careerMapDomainId}
                setActiveDomainId={setCareerMapDomainId}
                onNavigateToSection={handleNavigateToSection}
                taxonomyCategoryId={taxonomyCategoryId}
                setTaxonomyCategoryId={setTaxonomyCategoryId}
                taxonomyRoleSlug={taxonomyRoleSlug}
                setTaxonomyRoleSlug={setTaxonomyRoleSlug}
                viewMode={careerMapViewMode}
                setViewMode={setCareerMapViewMode}
              />
            </div>

            {/* Selected Role Focus Anchor */}
            <div id="selected-role-focus-anchor" className="scroll-mt-6 pt-2" />

            {/* Display Full Role Detail view at the bottom of the map page */}
            {selectedRole && (
              <div className="w-full fade-in">
                <RoleDetailPanel 
                  role={selectedRole}
                  onClose={() => setSelectedRoleId(null)}
                  marketRegion={activeFilters.marketRegion}
                  isBookmarked={savedRoleIds.includes(selectedRole.id)}
                  onToggleBookmark={() => handleToggleBookmark(selectedRole.id)}
                  onNavigateToSection={handleNavigateToSection}
                  onCompareRole={handleCompareRoleDirectly}
                />
              </div>
            )}

          </section>
        </div>

        {/* 3. PATH PLANNED VIEW */}
        <div id="section-pathfinder" className={activeTab === 'pathfinder' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-5">
            
            {/* The main inputs panel (Full Width) */}
            <div className="w-full">
              <PathFinder 
                theme={theme}
                onSelectRole={(id) => {
                  setSelectedRoleId(id);
                  setTimeout(() => handleScrollToSection('pathfinder-role-detail-anchor'), 100);
                }} 
                isHighlighted={blinkSectionId === 'pathfinder'}
                onScrollToSection={(sectionId) => {
                  // Direct tab switcher bridges! Redirects users seamlessly to respective tabs
                  if (sectionId === 'libraries-section') setActiveTab('libraries');
                  else if (sectionId === 'interactive-map-section') { setCareerMapViewMode('mindmap'); setActiveTab('map'); }
                  else if (sectionId === 'it-taxonomy-explorer-section') { setCareerMapViewMode('mindmap'); setActiveTab('map'); }
                  else if (sectionId === 'comparison-section') setActiveTab('comparison');
                }}
                savedPathways={savedPathways}
                setSavedPathways={setSavedPathways}
                restoredPathway={restoredPathway}
              />
            </div>

            {/* Active targeted details (placed below the main Career Finder panel) */}
            <div className="w-full">
              <div className="bg-[#070b13] border-[#121c38] border-2 p-4 font-mono text-xs text-gray-500 shadow-[3px_3px_0px_#121c38]">
                <h4 className="text-white font-bold uppercase tracking-wider mb-2 border-b border-[#121c38] pb-1.5">
                  🧭 ADVICE METADATA PANEL
                </h4>
                <p className="leading-relaxed text-gray-400 text-[11px] mb-2">
                  The Ambition Path Planner automatically identifies systemic technology gaps. If it recommends a course or documentation hub, you can tap the <span className="text-[#ec4899] font-bold">"View on Page"</span> buttons to immediately open that section of our portal.
                </p>
                <p className="leading-relaxed text-[11px]">
                  All certifications referenced are cross-compiled inside the <strong className="text-white font-normal hover:underline cursor-pointer" onClick={() => setActiveTab('libraries')}>Resourcing Libraries tab</strong>.
                </p>
              </div>
            </div>

            <div id="pathfinder-role-detail-anchor" className="scroll-mt-6" />

            {selectedRole && (
              <div className="fade-in">
                <RoleDetailPanel 
                  role={selectedRole}
                  onClose={() => setSelectedRoleId(null)}
                  marketRegion={activeFilters.marketRegion}
                  isBookmarked={savedRoleIds.includes(selectedRole.id)}
                  onToggleBookmark={() => handleToggleBookmark(selectedRole.id)}
                  onNavigateToSection={handleNavigateToSection}
                  onCompareRole={handleCompareRoleDirectly}
                />
              </div>
            )}

          </section>
        </div>

        {/* 5. COMPARATOR VIEW */}
        <div id="section-comparison" className={activeTab === 'comparison' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-6">
            <RoleComparison 
              isHighlighted={blinkSectionId === 'comparison'} 
              marketRegion={activeFilters.marketRegion} 
              onSelectRole={(id) => {
                setSelectedRoleId(id);
                setTimeout(() => handleScrollToSection('comparison-role-detail-anchor'), 100);
              }}
              presetRoleAId={presetRoleAId}
              setPresetRoleAId={setPresetRoleAId}
              presetRoleBId={presetRoleBId}
              setPresetRoleBId={setPresetRoleBId}
            />

            <div id="comparison-role-detail-anchor" className="scroll-mt-6 pt-2" />

            {selectedRole && (
              <div className="fade-in">
                <RoleDetailPanel 
                  role={selectedRole}
                  onClose={() => setSelectedRoleId(null)}
                  marketRegion={activeFilters.marketRegion}
                  isBookmarked={savedRoleIds.includes(selectedRole.id)}
                  onToggleBookmark={() => handleToggleBookmark(selectedRole.id)}
                  onNavigateToSection={handleNavigateToSection}
                  onCompareRole={handleCompareRoleDirectly}
                />
              </div>
            )}
          </section>
        </div>

        {/* 6. LIBRARIES VIEW */}
        <div id="section-libraries" className={activeTab === 'libraries' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-6">
            <ErrorBoundary 
              fallbackTitle="Resources Directory View Error"
              onReset={() => {
                setLibrariesQuery('');
                setYoutubeSearchQuery('');
                setHackathonsSearchQuery('');
              }}
            >
              <LibrariesDashboard 
                theme={theme}
                isHighlighted={blinkSectionId === 'libraries'} 
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
                isBookmarked={isBookmarked}
                activeTab={librariesActiveTab}
                setActiveTab={setLibrariesActiveTab}
                query={librariesQuery}
                setQuery={setLibrariesQuery}
                selectedRoleFamily={librariesRoleFamily}
                setSelectedRoleFamily={setLibrariesRoleFamily}
                youtubeSearchQuery={youtubeSearchQuery}
                setYoutubeSearchQuery={setYoutubeSearchQuery}
                youtubeCategoryId={youtubeCategoryId}
                setSelectedCategoryId={setYoutubeCategoryId}
                hackathonsSelectedItemId={hackathonsSelectedItemId}
                setHackathonsSelectedItemId={setHackathonsSelectedItemId}
                hackathonsSearchQuery={hackathonsSearchQuery}
                setHackathonsSearchQuery={setHackathonsSearchQuery}
                tipIndex={tipIndex}
                globalActiveTab={activeTab}
              />
            </ErrorBoundary>
          </section>
        </div>

        {/* 9. SAVED VIEWS & PERSISTED CAREER PATHS */}
        <div id="section-saved" className={activeTab === 'saved' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-6">
            {(() => {
              const bookmarkedRoles = bookmarks.filter(b => b.type === 'role');
              const bookmarkedDomains = bookmarks.filter(b => b.type === 'domain' || b.type === 'jobCategory');
              const bookmarkedYoutube = bookmarks.filter(b => b.type === 'youtubeTeacher' || b.type === 'division');
              const bookmarkedHackathons = bookmarks.filter(b => b.type === 'hackathon');
              const bookmarkedResources = bookmarks.filter(b => b.type === 'certification' || b.type === 'studyPortal' || b.type === 'skill' || b.type === 'tool');

              return (
                <>
                  {bookmarks.length === 0 && savedPathways.length === 0 ? (
                    <div className="border-2 border-dashed border-[#121c38] bg-[#070b13] py-16 px-12 text-center rounded-none font-mono space-y-4 min-h-[224px] flex flex-col items-center justify-center">
                      <p className="text-gray-400 text-sm">No bookmarks or saved pathways found.</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('map')}
                        className="px-4 py-2 border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/15 uppercase text-xs font-bold bg-[#0a0f1d] cursor-pointer"
                      >
                        Explore Now
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* 0. Saved Career Pathways (Ambition Path Advisor) */}
                      {savedPathways.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-[#06b6d4] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            🛣️ SAVED CAREER PATHWAYS (AMBITION PATH ADVISOR) ({savedPathways.length})
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedPathways.map((savedPath) => {
                              const sLabel = savedPath.start === 'career-switcher' 
                                ? 'Student' 
                                : (ALL_ROLES_DATA[savedPath.start]?.title || 'Alternative');
                              const tLabel = ALL_ROLES_DATA[savedPath.target]?.title || 'Unknown Target';
                              
                              return (
                                <div
                                  key={savedPath.id}
                                  className="bg-[#070b13] border-2 border-[#121c38] hover:border-cyan-500/50 transition-all p-4 duration-150 flex flex-col justify-between space-y-4 shadow-[3px_3px_0px_#121c38]"
                                >
                                  <div className="space-y-2 font-mono text-xs">
                                    <div className="flex items-center justify-between text-[10px]">
                                      <span className="px-1.5 py-0.5 bg-slate-900 text-slate-400 border border-slate-800 uppercase font-bold text-[9px]">
                                        {savedPath.route} route
                                      </span>
                                      <span className="text-gray-500">
                                        Saved: {savedPath.createdAt || 'N/A'}
                                      </span>
                                    </div>
                                    <h4 className="text-md font-bold text-cyan-400 uppercase font-sans line-clamp-1">
                                      {tLabel}
                                    </h4>
                                    <div className="text-[11px] text-gray-300 space-y-1">
                                      <p><span className="text-gray-500">From:</span> {sLabel}</p>
                                      <p><span className="text-gray-500">Initial Match:</span> <span className="text-emerald-400 font-bold">{savedPath.match}%</span></p>
                                      <p><span className="text-gray-500">Prep Est:</span> {savedPath.duration}</p>
                                    </div>
                                  </div>
                                  <div className="pt-3 border-t border-[#121c38]/60 flex gap-2 font-mono text-[10px]">
                                    <button
                                      onClick={() => {
                                        setRestoredPathway(null); // Reset trigger first
                                        setTimeout(() => {
                                          setRestoredPathway(savedPath);
                                          setActiveTab('pathfinder');
                                        }, 50);
                                      }}
                                      className="flex-1 py-1.5 bg-[#06b6d4]/10 text-[#22d3ee] hover:bg-[#06b6d4]/20 border border-[#06b6d4]/30 uppercase text-center font-bold cursor-pointer transition"
                                      title="Load and view this pathway in the Ambition Path Advisor"
                                    >
                                      Restore Path
                                    </button>
                                    <button
                                      onClick={() => {
                                        const updated = savedPathways.filter(p => p.id !== savedPath.id);
                                        setSavedPathways(updated);
                                        localStorage.setItem('mapit_saved_pathways_v3', JSON.stringify(updated));
                                      }}
                                      className="px-2.5 py-1.5 bg-red-950/20 text-[#ef4444] hover:bg-red-900/20 border border-red-900/40 uppercase font-bold cursor-pointer transition"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 1. Career Roles & Profiles */}
                      {bookmarkedRoles.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-[#10b981] font-bold uppercase tracking-wider">📁 Career Roles & Profiles ({bookmarkedRoles.length})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookmarkedRoles.slice(isMobile ? (bookmarksRolePage - 1) * 3 : 0, isMobile ? bookmarksRolePage * 3 : undefined).map((item) => {
                              const roleItem = ALL_ROLES_DATA[item.id];
                              return (
                                <div
                                  key={`${item.type}-${item.id}`}
                                  className="bg-[#070b13] border-2 border-[#121c38] hover:border-yellow-500/50 transition-all p-4 duration-150 flex flex-col justify-between space-y-4 shadow-[3px_3px_0px_#121c38]"
                                >
                                  <div className="space-y-2 font-mono text-xs">
                                    <div className="flex items-center justify-between text-[10px]">
                                      <span className="px-1.5 py-0.5 bg-slate-900 text-slate-400 border border-slate-800 uppercase font-bold text-[9px]">
                                        {roleItem ? roleItem.domain : item.subtext}
                                      </span>
                                      <div className="flex items-center gap-1.5">
                                        {roleItem && <span className="text-gray-500 mr-1">{roleItem.level}</span>}
                                        <a 
                                          href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(item.name)}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          referrerPolicy="no-referrer"
                                          className="text-[#10b981] hover:text-[#22c55e] transition"
                                          title="Search Jobs"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                      </div>
                                    </div>
                                    <h4 className="text-md font-bold text-white uppercase font-sans line-clamp-1">{item.name}</h4>
                                    {roleItem && (
                                      <p className="text-[11px] text-gray-400 font-mono line-clamp-2 leading-relaxed">
                                        {roleItem.roleAsk?.explanation}
                                      </p>
                                    )}
                                  </div>
                                  <div className="pt-3 border-t border-[#121c38]/60 flex gap-2 font-mono text-[10px]">
                                    <button
                                      onClick={() => {
                                        setSelectedRoleId(item.id);
                                        const foundDomain = IT_DOMAINS.find(d => d.roles.includes(item.id));
                                        if (foundDomain) {
                                          setCareerMapDomainId(foundDomain.id);
                                        }
                                        setActiveTab('map');
                                        setTimeout(() => {
                                          handleScrollToSection('selected-role-focus-anchor');
                                        }, 150);
                                      }}
                                      className="flex-1 py-1.5 bg-[#10b981]/15 text-[#10b981] hover:bg-[#10b981]/25 border border-[#10b981]/30 uppercase text-center font-bold cursor-pointer transition"
                                    >
                                      Inspect Path
                                    </button>
                                    <button
                                      onClick={() => toggleBookmark(item)}
                                      className="px-2.5 py-1.5 bg-red-950/20 text-[#ef4444] hover:bg-red-900/20 border border-red-900/40 uppercase font-bold cursor-pointer transition"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {isMobile && bookmarkedRoles.length > 3 && (
                            <div className="flex items-center justify-between pt-1 bg-[#121c38]/10 border border-[#121c38]/40 p-2 text-[10px] font-mono text-slate-300">
                              <button
                                disabled={bookmarksRolePage === 1}
                                onClick={() => setBookmarksRolePage(p => Math.max(1, p - 1))}
                                className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#10b981] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                              >
                                ◀ Prev
                              </button>
                              <span>PAGE {bookmarksRolePage} OF {Math.ceil(bookmarkedRoles.length / 3)}</span>
                              <button
                                disabled={bookmarksRolePage >= Math.ceil(bookmarkedRoles.length / 3)}
                                onClick={() => setBookmarksRolePage(p => p + 1)}
                                className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#10b981] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                              >
                                Next ▶
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 2. Hackathons, Fests & Events */}
                      {bookmarkedHackathons.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-[#f59e0b] font-bold uppercase tracking-wider">🏆 Hackathons, Fests & Events ({bookmarkedHackathons.length})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookmarkedHackathons.slice(isMobile ? (bookmarksHackathonPage - 1) * 3 : 0, isMobile ? bookmarksHackathonPage * 3 : undefined).map((item) => (
                              <div
                                key={`${item.type}-${item.id}`}
                                className="bg-[#070b13] border border-[#1e2e54]/80 p-4 flex flex-col justify-between space-y-4 font-mono text-xs shadow-[3px_3px_0px_#121c38]"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] bg-amber-955/40 text-amber-400 border border-amber-900/40 px-1.5 py-0.5 uppercase font-bold block w-fit">
                                      Event Sync Global
                                    </span>
                                    <a 
                                      href={item.url || `https://www.google.com/search?q=${encodeURIComponent(item.name + ' hackathon event details 2026')}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      referrerPolicy="no-referrer"
                                      className="text-[#f59e0b] hover:text-amber-400 transition"
                                      title="Visit Event"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                  <h5 className="text-white text-sm font-bold block normal-case leading-snug">{item.name}</h5>
                                  {item.subtext && <p className="text-gray-400 text-[11px] leading-relaxed italic">{item.subtext}</p>}
                                </div>
                                <div className="pt-3 border-t border-[#121c38]/60 flex gap-2">
                                  <button
                                    onClick={() => {
                                      setHackathonsSelectedItemId(item.id);
                                      setHackathonsSearchQuery('');
                                      setLibrariesActiveTab('hackathons');
                                      setActiveTab('libraries');
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="flex-grow py-1.5 px-2 bg-black hover:bg-[#eab308]/15 hover:text-[#eab308] border border-slate-800 text-[10px] text-gray-300 flex items-center justify-center gap-0.5 transition uppercase font-bold"
                                  >
                                    Inspect Event
                                  </button>
                                  {item.url && (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="py-1.5 px-2 bg-black hover:bg-blue-950/20 hover:text-blue-400 border border-slate-800 text-[10px] text-gray-300 flex items-center justify-center gap-0.5 transition uppercase font-bold"
                                      title="Open Official Portal"
                                    >
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                  <button
                                    onClick={() => toggleBookmark(item)}
                                    className="px-2.5 py-1.5 bg-red-950/20 text-[#ef4444] hover:bg-red-900/20 border border-red-900/40 uppercase font-bold cursor-pointer transition"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          {isMobile && bookmarkedHackathons.length > 3 && (
                            <div className="flex items-center justify-between pt-1 bg-[#121c38]/10 border border-[#121c38]/40 p-2 text-[10px] font-mono text-slate-300">
                              <button
                                disabled={bookmarksHackathonPage === 1}
                                onClick={() => setBookmarksHackathonPage(p => Math.max(1, p - 1))}
                                className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#f59e0b] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                              >
                                ◀ Prev
                              </button>
                              <span>PAGE {bookmarksHackathonPage} OF {Math.ceil(bookmarkedHackathons.length / 3)}</span>
                              <button
                                disabled={bookmarksHackathonPage >= Math.ceil(bookmarkedHackathons.length / 3)}
                                onClick={() => setBookmarksHackathonPage(p => p + 1)}
                                className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#f59e0b] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                              >
                                Next ▶
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 3. YouTube Instructors & Domains */}
                      {bookmarkedYoutube.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono text-[#f43f5e] font-bold uppercase tracking-wider">📺 YouTube Instructors & Directories ({bookmarkedYoutube.length})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookmarkedYoutube.slice(isMobile ? (bookmarksTeacherPage - 1) * 3 : 0, isMobile ? bookmarksTeacherPage * 3 : undefined).map((item) => (
                              <div
                                key={`${item.type}-${item.id}`}
                                className="bg-[#070b13] border border-[#1e2e54]/80 p-4 flex flex-col justify-between space-y-4 font-mono text-xs shadow-[3px_3px_0px_#121c38]"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] bg-red-950/40 text-red-400 border border-red-900/40 px-1.5 py-0.5 uppercase font-bold block w-fit">
                                      {item.type === 'division' ? 'YouTube Division' : 'YouTube Instructor'}
                                    </span>
                                    <a
                                      href={item.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(item.name)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      referrerPolicy="no-referrer"
                                      className="text-red-400 hover:text-red-300 transition"
                                      title="Visit Channel"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                    </a>
                                  </div>
                                  <h5 className="text-white text-sm font-bold block leading-snug">{item.name}</h5>
                                  {item.subtext && <p className="text-gray-500 text-[10px]">{item.subtext}</p>}
                                </div>
                                <div className="pt-3 border-t border-[#121c38]/60 flex gap-2">
                                  {item.type === 'division' ? (
                                    <button
                                      onClick={() => {
                                        const parentCat = TEACHERS_DIRECTORY.find(cat =>
                                          cat.subcategories.some(sub => sub.skillArea === item.name)
                                        );
                                        if (parentCat) {
                                          setYoutubeCategoryId(parentCat.id);
                                        }
                                        setYoutubeSearchQuery(item.name);
                                        setLibrariesActiveTab('youtubeTeachers');
                                        setActiveTab('libraries');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }}
                                      className="flex-1 py-1.5 px-2 bg-black hover:bg-purple-950/20 hover:text-purple-400 border border-slate-800 text-[10px] text-gray-300 flex items-center justify-center gap-0.5 transition uppercase font-bold"
                                    >
                                      View Division
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        const parentCat = TEACHERS_DIRECTORY.find(cat =>
                                          cat.subcategories.some(sub => 
                                            sub.teachers.some(t => t.name === item.name)
                                          )
                                        );
                                        if (parentCat) {
                                          setYoutubeCategoryId(parentCat.id);
                                        }
                                        setYoutubeSearchQuery(item.name);
                                        setLibrariesActiveTab('youtubeTeachers');
                                        setActiveTab('libraries');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }}
                                      className="flex-1 py-1.5 px-2 bg-black hover:bg-red-950/20 hover:text-red-400 border border-slate-800 text-[10px] text-gray-300 flex items-center justify-center gap-0.5 transition uppercase font-bold"
                                    >
                                      View Teacher
                                    </button>
                                  )}
                                  {item.url && (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="py-1.5 px-2 bg-black hover:bg-red-950/20 hover:text-red-400 border border-slate-800 text-[10px] text-gray-300 flex items-center justify-center gap-0.5 transition uppercase font-bold"
                                      title="Open YouTube Channel"
                                    >
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                  <button
                                    onClick={() => toggleBookmark(item)}
                                    className="px-2.5 py-1.5 bg-red-950/20 text-[#ef4444] hover:bg-red-900/20 border border-red-900/40 uppercase font-bold cursor-pointer transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          {isMobile && bookmarkedYoutube.length > 3 && (
                            <div className="flex items-center justify-between pt-1 bg-[#121c38]/10 border border-[#121c38]/40 p-2 text-[10px] font-mono text-slate-300">
                              <button
                                disabled={bookmarksTeacherPage === 1}
                                onClick={() => setBookmarksTeacherPage(p => Math.max(1, p - 1))}
                                className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#f43f5e] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                              >
                                ◀ Prev
                              </button>
                              <span>PAGE {bookmarksTeacherPage} OF {Math.ceil(bookmarkedYoutube.length / 3)}</span>
                              <button
                                disabled={bookmarksTeacherPage >= Math.ceil(bookmarkedYoutube.length / 3)}
                                onClick={() => setBookmarksTeacherPage(p => p + 1)}
                                className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#f43f5e] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                              >
                                Next ▶
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 4. Resourcing Libraries, Portals & Tools */}
                      {(bookmarkedResources.length > 0 || bookmarkedDomains.length > 0) && (() => {
                        const fullResources = [...bookmarkedDomains, ...bookmarkedResources];
                        return (
                          <div className="space-y-3">
                            <h4 className="text-xs font-mono text-[#06b6d4] font-bold uppercase tracking-wider">🛠️ Resourcing Libraries, Tech Families & Portals ({fullResources.length})</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {fullResources.slice(isMobile ? (bookmarksResourcePage - 1) * 3 : 0, isMobile ? bookmarksResourcePage * 3 : undefined).map((item) => (
                                <div
                                  key={`${item.type}-${item.id}`}
                                  className="bg-[#070b13] border border-[#1e2e54]/80 p-4 flex flex-col justify-between space-y-4 font-mono text-xs shadow-[3px_3px_0px_#121c38]"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] bg-cyan-950/40 text-cyan-400 border border-cyan-900/40 px-1.5 py-0.5 uppercase font-bold block w-fit">
                                        {item.type === 'domain' ? 'Career Domain' : item.type === 'jobCategory' ? 'Technology Family' : item.type}
                                      </span>
                                      <a
                                        href={item.url || `https://www.google.com/search?q=${encodeURIComponent(item.name + ' IT learning resources certifications')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        referrerPolicy="no-referrer"
                                        className="text-[#06b6d4] hover:text-cyan-300 transition"
                                        title="Visit Resource"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                      </a>
                                    </div>
                                    <h5 className="text-white text-sm font-bold block leading-snug truncate">{item.name}</h5>
                                    {item.subtext && <p className="text-gray-500 text-[10px]">{item.subtext}</p>}
                                  </div>
                                  <div className="pt-3 border-t border-[#121c38]/60 flex gap-2">
                                    <button
                                      onClick={() => {
                                        if (item.type === 'domain') {
                                          setCareerMapDomainId(item.id);
                                          setActiveTab('map');
                                        } else if (item.type === 'certification') {
                                          setLibrariesActiveTab('certs');
                                          setLibrariesQuery(item.name);
                                          setActiveTab('libraries');
                                        } else if (item.type === 'studyPortal') {
                                          setLibrariesActiveTab('channels');
                                          setLibrariesQuery(item.name);
                                          setActiveTab('libraries');
                                        } else if (item.type === 'skill' || item.type === 'tool') {
                                          setLibrariesActiveTab('tools-skills');
                                          setLibrariesQuery(item.name);
                                          const dashIdx = item.id.indexOf('-');
                                          if (dashIdx !== -1) {
                                            const familyId = item.id.substring(0, dashIdx);
                                            setLibrariesRoleFamily(familyId);
                                          }
                                          setActiveTab('libraries');
                                        } else {
                                          setLibrariesActiveTab('tools-skills');
                                          setLibrariesRoleFamily(item.id);
                                          setLibrariesQuery('');
                                          setActiveTab('libraries');
                                        }
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }}
                                      className="flex-1 py-1.5 px-2 bg-black hover:bg-cyan-500/15 hover:text-cyan-400 border border-slate-800 text-[10px] text-gray-300 flex items-center justify-center gap-0.5 transition uppercase font-bold"
                                    >
                                      Explore Section
                                    </button>
                                    <button
                                      onClick={() => toggleBookmark(item)}
                                      className="px-2.5 py-1.5 bg-red-950/20 text-[#ef4444] hover:bg-red-900/20 border border-red-900/40 uppercase font-bold cursor-pointer transition-colors"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {isMobile && fullResources.length > 3 && (
                              <div className="flex items-center justify-between pt-1 bg-[#121c38]/10 border border-[#121c38]/40 p-2 text-[10px] font-mono text-slate-300">
                                <button
                                  disabled={bookmarksResourcePage === 1}
                                  onClick={() => setBookmarksResourcePage(p => Math.max(1, p - 1))}
                                  className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#06b6d4] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                                >
                                  ◀ Prev
                                </button>
                                <span>PAGE {bookmarksResourcePage} OF {Math.ceil(fullResources.length / 3)}</span>
                                <button
                                  disabled={bookmarksResourcePage >= Math.ceil(fullResources.length / 3)}
                                  onClick={() => setBookmarksResourcePage(p => p + 1)}
                                  className="px-2.5 py-1 bg-[#121c38] hover:bg-[#1e2e54] text-[#06b6d4] disabled:opacity-30 disabled:pointer-events-none cursor-pointer uppercase font-bold text-[9px]"
                                >
                                  Next ▶
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Display selected role details inline in Saved tab */}
                  <div id="saved-role-detail-anchor" className="scroll-mt-6 pt-2" />
                </>
              );
            })()}
          </section>
        </div>

        {/* HR CONTACTS VIEW */}
        <div id="section-hr-contacts" className={activeTab === 'hr-contacts' ? 'block' : 'hidden'}>
          <section className="fade-in space-y-6">
            <HRContacts theme={theme} />
          </section>
        </div>

              </>
            )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="w-full max-w-full px-4 sm:px-6 md:px-8 border-t border-[#121c38]/40 pt-6 pb-24 md:pb-12 mt-12 text-center text-xs font-mono text-gray-600">
          <p className="leading-relaxed">
            MapIT
          </p>
        </footer>

      </div>

      {/* AI Career Coach Companion */}
      <AICareerAssistant 
        onNavigateToSection={handleNavigateToSection}
        setActiveTab={setActiveTab}
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        isLight={theme === 'light'}
        onCompareRoles={handleCompareRoles}
      />

      {/* Floating ladder climber ant - jump back to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-36 md:bottom-24 right-5 md:right-6 z-[8500] bg-[#070b13]/95 border-2 border-cyan-500/80 hover:border-cyan-400 p-2 text-cyan-400 shadow-[2px_2px_0px_rgba(34,211,238,0.4)] hover:shadow-[4px_4px_0px_#22d3ee] active:translate-y-0.5 hover:bg-cyan-950/20 transition-all duration-300 cursor-pointer group flex items-center justify-center rounded-none"
          title="Climb back to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-y-1 transition-transform duration-300">
            {/* Ladder rails */}
            <line x1="6" y1="2" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="2" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Ladder rungs */}
            <line x1="6" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.2" />
            <line x1="6" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.2" />
            <line x1="6" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.2" />
            <line x1="6" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.2" />
            
            {/* Tiny climbing ant */}
            {/* Abdomen */}
            <ellipse cx="12" cy="14" rx="1.6" ry="2.4" fill="#0891b2" stroke="#22d3ee" strokeWidth="0.5" />
            {/* Thorax */}
            <ellipse cx="12" cy="9.8" rx="1.2" ry="1.6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="0.5" />
            {/* Head */}
            <circle cx="12" cy="6.6" r="1.0" fill="#22d3ee" />
            
            {/* Antennae */}
            <path d="M11.5 5.8 Q10.5 4.1 9.5 4.8 M12.5 5.8 Q13.5 4.1 14.5 4.8" stroke="#22d3ee" strokeWidth="0.5" fill="none" />
            {/* Mini legs holding onto ladder */}
            <path d="M10.8 9.2 C9.5 8.7 8.0 9.2 6.5 9.7 M13.2 9.2 C14.5 8.7 16.0 9.2 17.5 9.7" stroke="#06b6d4" strokeWidth="0.6" fill="none" />
            <path d="M10.5 13.5 C9.0 13.5 8.0 14.0 6.5 14.5 M13.5 13.5 C15.0 13.5 16.0 14.0 17.5 14.5" stroke="#06b6d4" strokeWidth="0.6" fill="none" />
          </svg>
        </button>
      )}

      {/* MOBILE BOTTOM NAVIGATION RIBBON (LinkedIn App Standards) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#070b13]/95 border-t border-[#121c38]/70 backdrop-blur-md px-1 py-1.5 flex items-center justify-around h-16 shadow-[0_-4px_16px_rgba(0,0,0,0.6)]">
          {[
            { id: 'saved', label: 'Bookmarks', icon: TAB_METADATA.saved.icon, activeColor: 'text-yellow-400 border-yellow-400' },
            { id: 'map', label: 'Career Domains', icon: TAB_METADATA.map.icon, activeColor: 'text-yellow-500 border-yellow-500' },
            { id: 'pathfinder', label: 'Path Planner', icon: TAB_METADATA.pathfinder.icon, activeColor: 'text-[#10b981] border-[#10b981]' },
            { id: 'libraries', label: 'Resources', icon: TAB_METADATA.libraries.icon, activeColor: 'text-cyan-400 border-cyan-400' }
          ].map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1 select-none transition-all duration-150 relative cursor-pointer ${
                  isActive 
                    ? `${item.activeColor.split(' ')[0]} font-semibold` 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active top line indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="mobileActiveTabIndicator"
                    className="absolute top-[-6px] left-1/4 right-1/4 h-0.5 rounded-full"
                    style={{ backgroundColor: isActive ? (item.id === 'saved' ? '#facc15' : item.id === 'libraries' ? '#22d3ee' : item.id === 'pathfinder' ? '#10b981' : '#eab308') : 'transparent' }}
                  />
                )}
                <div className={`p-1 ${isActive ? 'scale-105 transition-transform animate-pulse' : ''}`} style={isActive ? { animationDuration: '2s' } : {}}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] mt-0.5 tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
