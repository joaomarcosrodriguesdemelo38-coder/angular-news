import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

/**
 * Lightweight cache built on top of localStorage.
 *
 * Used by NewsService to avoid hammering the NewsAPI on every navigation
 * and to provide a "best effort" offline experience: when the network
 * request fails (or the browser is offline) the last successful response
 * for that key is served instead, even if it's stale.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly prefix = 'angularnews_cache_';

  set<T>(key: string, value: T): void {
    const entry: CacheEntry<T> = { value, timestamp: Date.now() };
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch {
      // Storage might be full or unavailable (e.g. private browsing) - fail silently.
    }
  }

  /**
   * Returns the cached value if present and not older than `maxAgeMs`.
   * Pass `Infinity` to always return the cached value regardless of age
   * (useful for the offline fallback path).
   */
  get<T>(key: string, maxAgeMs: number): T | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) {
      return null;
    }
    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      const age = Date.now() - entry.timestamp;
      if (age > maxAgeMs) {
        return null;
      }
      return entry.value;
    } catch {
      return null;
    }
  }

  getTimestamp(key: string): number | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) {
      return null;
    }
    try {
      const entry: CacheEntry<unknown> = JSON.parse(raw);
      return entry.timestamp;
    } catch {
      return null;
    }
  }

  clear(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
