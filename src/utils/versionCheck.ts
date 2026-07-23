import { APP_VERSION, CATALOG_VERSION, ApplicationVersionInfo } from '../data/version';

const CHUNK_RELOAD_KEY = 'mapit:chunk_reload_attempted';

export interface VersionMismatchState {
  hasUpdate: boolean;
  serverInfo: ApplicationVersionInfo | null;
}

/**
 * Global handler for chunk loading and asset 404 errors.
 * If a new deployment replaced old hashed JS chunks, old open tabs will fail to fetch old chunks.
 * We attempt a single controlled reload to load the latest index.html and assets.
 */
export function registerChunkErrorRecovery(onUpdateAvailable?: () => void): void {
  if (typeof window === 'undefined') return;

  const handleChunkError = (message: string) => {
    const isChunkOrImportError = 
      /chunk|loading chunk|failed to fetch dynamically imported module|script error|css file failed to load|404/i.test(message);

    if (isChunkOrImportError) {
      const alreadyAttempted = sessionStorage.getItem(CHUNK_RELOAD_KEY);
      if (!alreadyAttempted) {
        console.warn('[MapIT Version] Chunk/Import error detected following deployment. Triggering single controlled reload...');
        sessionStorage.setItem(CHUNK_RELOAD_KEY, 'true');
        window.location.reload();
      } else {
        console.warn('[MapIT Version] Chunk error persisted after reload. Prompting user for update...');
        if (onUpdateAvailable) {
          onUpdateAvailable();
        }
      }
    }
  };

  window.addEventListener('error', (event) => {
    if (event.message) {
      handleChunkError(event.message);
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = typeof reason === 'string' ? reason : (reason?.message || '');
    if (msg) {
      handleChunkError(msg);
    }
  });
}

/**
 * Poll server /api/version to check if a newer catalog or app version is published.
 */
export async function checkForAppUpdates(): Promise<VersionMismatchState> {
  if (typeof window === 'undefined') {
    return { hasUpdate: false, serverInfo: null };
  }

  try {
    const response = await fetch('/api/version', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      return { hasUpdate: false, serverInfo: null };
    }

    const serverInfo: ApplicationVersionInfo = await response.json();
    const isCatalogMismatch = serverInfo.catalogVersion !== CATALOG_VERSION;
    const isAppMismatch = serverInfo.applicationVersion !== APP_VERSION;

    const hasUpdate = isCatalogMismatch || isAppMismatch;
    return {
      hasUpdate,
      serverInfo,
    };
  } catch {
    return { hasUpdate: false, serverInfo: null };
  }
}
