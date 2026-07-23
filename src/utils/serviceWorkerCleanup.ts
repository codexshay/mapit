/**
 * Service Worker & PWA Cache Cleanup Utility
 * Ensures stale service worker registrations and outdated HTTP caches from older deployments
 * are cleanly purged without causing reload loops.
 */

const SW_CLEANUP_FLAG = 'mapit:sw_cleanup_v3_done';

export async function cleanupStaleServiceWorkers(): Promise<void> {
  if (typeof window === 'undefined') return;

  // Run cleanup once per browser session or until flagged complete
  if (sessionStorage.getItem(SW_CLEANUP_FLAG)) return;

  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length > 0) {
        console.log(`[MapIT SW] Found ${registrations.length} registered service worker(s). Unregistering for clean updates...`);
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
    }

    if ('caches' in window) {
      const cacheNames = await caches.keys();
      if (cacheNames.length > 0) {
        console.log(`[MapIT SW] Purging ${cacheNames.length} legacy cache storage entry/entries...`);
        for (const cacheName of cacheNames) {
          await caches.delete(cacheName);
        }
      }
    }

    sessionStorage.setItem(SW_CLEANUP_FLAG, 'true');
  } catch (err) {
    console.warn('[MapIT SW] Non-blocking service worker cleanup notice:', err);
  }
}
