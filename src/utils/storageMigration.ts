/**
 * Storage Migration & State Management Utility for MapIT
 * Version-controlled storage keys with safe migration and key cleanup.
 * NEVER calls localStorage.clear() so user data outside or inside MapIT is strictly preserved.
 */

export const STORAGE_KEYS = {
  SCHEMA_VERSION: 'mapit:schema_version',
  BOOKMARKS: 'mapit:bookmarks:v3',
  PREFERENCES: 'mapit:preferences:v2',
  SEARCH_HISTORY: 'mapit:search-history:v2',
  PATHWAYS: 'mapit:pathways:v3',
  SYNCED_CERTS: 'mapit:synced-certifications:v3',
  SYNCED_BOOKS: 'mapit:synced-books:v3',
  SYNCED_HACKATHONS: 'mapit:synced-hackathons:v3',
  COMPARATOR: 'mapit:comparator:v2',
};

const LEGACY_KEYS_TO_MIGRATE = [
  'mapit_bookmarks',
  'mapit_bookmarks_v3',
  'mapit_saved_roles',
  'mapit_saved_pathways_v3',
  'mapit_theme',
  'mapit_sidebar_pinned',
  'mapit_tab_sequence',
  'pathfinder_synced_certifications',
  'pathfinder_synced_books',
  'pathfinder_synced_hackathons',
  'comparator_roleAId',
  'comparator_roleBId',
];

export interface UserPreferences {
  theme: 'dark' | 'light';
  isSidebarPinned: boolean;
  tabSequence?: string[];
  preferredIndustry?: string;
  countryMarket?: string;
}

export function runStorageMigrations(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    const currentSchema = localStorage.getItem(STORAGE_KEYS.SCHEMA_VERSION);
    if (currentSchema === 'v3') {
      // Already on current schema
      return;
    }

    console.log('[MapIT Storage] Running safe storage migrations to schema v3...');

    // 1. Migrate Bookmarks
    const existingVersionedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!existingVersionedBookmarks) {
      const legacyBookmarksStr = localStorage.getItem('mapit_bookmarks_v3') || localStorage.getItem('mapit_bookmarks');
      const legacySavedRolesStr = localStorage.getItem('mapit_saved_roles');
      let bookmarksList: any[] = [];

      if (legacyBookmarksStr) {
        try {
          const parsed = JSON.parse(legacyBookmarksStr);
          if (Array.isArray(parsed)) bookmarksList = parsed;
        } catch {
          /* ignore JSON parse error */
        }
      }

      if (legacySavedRolesStr && bookmarksList.length === 0) {
        try {
          const parsedRoles = JSON.parse(legacySavedRolesStr);
          if (Array.isArray(parsedRoles)) {
            bookmarksList = parsedRoles.map((rId: string) => ({
              id: rId,
              name: rId,
              type: 'role',
              subtext: 'Role Bookmark',
            }));
          }
        } catch {
          /* ignore JSON parse error */
        }
      }

      if (bookmarksList.length > 0) {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarksList));
      }
    }

    // 2. Migrate Preferences
    const existingPrefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!existingPrefs) {
      const savedTheme = (localStorage.getItem('mapit_theme') as 'dark' | 'light') || 'dark';
      const savedPinned = localStorage.getItem('mapit_sidebar_pinned') === 'true';
      let savedTabSeq: string[] | undefined;
      const rawSeq = localStorage.getItem('mapit_tab_sequence');
      if (rawSeq) {
        try {
          savedTabSeq = JSON.parse(rawSeq);
        } catch {
          /* ignore */
        }
      }

      const prefObj: UserPreferences = {
        theme: savedTheme,
        isSidebarPinned: savedPinned,
        tabSequence: savedTabSeq,
      };
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefObj));
    }

    // 3. Migrate Synced Certifications
    if (!localStorage.getItem(STORAGE_KEYS.SYNCED_CERTS)) {
      const legacyCerts = localStorage.getItem('pathfinder_synced_certifications');
      if (legacyCerts) {
        localStorage.setItem(STORAGE_KEYS.SYNCED_CERTS, legacyCerts);
      }
    }

    // 4. Migrate Synced Books
    if (!localStorage.getItem(STORAGE_KEYS.SYNCED_BOOKS)) {
      const legacyBooks = localStorage.getItem('pathfinder_synced_books');
      if (legacyBooks) {
        localStorage.setItem(STORAGE_KEYS.SYNCED_BOOKS, legacyBooks);
      }
    }

    // 5. Migrate Synced Hackathons
    if (!localStorage.getItem(STORAGE_KEYS.SYNCED_HACKATHONS)) {
      const legacyHacks = localStorage.getItem('pathfinder_synced_hackathons');
      if (legacyHacks) {
        localStorage.setItem(STORAGE_KEYS.SYNCED_HACKATHONS, legacyHacks);
      }
    }

    // 6. Migrate Saved Pathways
    if (!localStorage.getItem(STORAGE_KEYS.PATHWAYS)) {
      const legacyPathways = localStorage.getItem('mapit_saved_pathways_v3');
      if (legacyPathways) {
        localStorage.setItem(STORAGE_KEYS.PATHWAYS, legacyPathways);
      }
    }

    // Safely remove only obsolete legacy keys owned by MapIT
    LEGACY_KEYS_TO_MIGRATE.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    });

    // Mark current schema version
    localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, 'v3');
    console.log('[MapIT Storage] Migration to schema v3 completed successfully.');
  } catch (err) {
    console.warn('[MapIT Storage] Non-blocking storage migration warning:', err);
  }
}

/**
 * Safely get an item from versioned localStorage
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely set an item in versioned localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[MapIT Storage] Failed to set storage item for key ${key}:`, err);
  }
}
