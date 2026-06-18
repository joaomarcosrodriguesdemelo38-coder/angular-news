import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Article, NewsCategory, NewsResponse } from '../models/article.model';
import { base64UrlDecode, base64UrlEncode } from '../utils/base64-url.util';
import { CacheService } from './cache.service';
import { MOCK_NEWS, searchMockArticles } from '../utils/mock-news';

const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes - fresh enough, avoids burning the daily quota
const ARTICLE_INDEX_KEY = 'article_index';
const ARTICLE_INDEX_MAX_SIZE = 200;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly baseUrl = environment.newsApiBaseUrl;
  private readonly apiKey = environment.newsApiKey;

  constructor(
    private http: HttpClient,
    private cache: CacheService,
  ) {}

  /** Resolves the API Key dynamically, checking localStorage for custom user key first. */
  private getApiKey(): string {
    if (typeof window !== 'undefined') {
      const customKey = localStorage.getItem('angularnews_custom_api_key');
      if (customKey && customKey.trim().length > 0) {
        return customKey.trim();
      }
    }
    return this.apiKey;
  }

  /**
   * Top headlines for a given category. Results are cached locally; if the
   * request fails (offline, quota exceeded, etc.) the last cached response
   * is returned, or if that is empty, it falls back to rich mock data.
   */
  getTopHeadlines(category: NewsCategory, country = 'us'): Observable<NewsResponse> {
    const cacheKey = `top_${country}_${category}`;
    const fresh = this.cache.get<NewsResponse>(cacheKey, CACHE_TTL_MS);
    if (fresh) {
      return of(fresh);
    }

    const params = new HttpParams()
      .set('category', category)
      .set('country', country)
      .set('pageSize', '24')
      .set('apiKey', this.getApiKey());

    return this.http.get<NewsResponse>(`${this.baseUrl}/top-headlines`, { params }).pipe(
      tap((response) => {
        if (response.status === 'error') {
          throw new Error('API returned error status');
        }
        this.cache.set(cacheKey, response);
        this.indexArticles(response.articles);
      }),
      catchError(() => this.fallbackToMock(category, cacheKey)),
    );
  }

  /** Full-text search across recent articles ("everything" endpoint). */
  searchNews(query: string): Observable<NewsResponse> {
    const cacheKey = `search_${query.trim().toLowerCase()}`;
    const fresh = this.cache.get<NewsResponse>(cacheKey, CACHE_TTL_MS);
    if (fresh) {
      return of(fresh);
    }

    const params = new HttpParams()
      .set('q', query)
      .set('language', 'pt')
      .set('sortBy', 'publishedAt')
      .set('pageSize', '24')
      .set('apiKey', this.getApiKey());

    return this.http.get<NewsResponse>(`${this.baseUrl}/everything`, { params }).pipe(
      tap((response) => {
        if (response.status === 'error') {
          throw new Error('API returned error status');
        }
        this.cache.set(cacheKey, response);
        this.indexArticles(response.articles);
      }),
      catchError(() => this.fallbackToSearchMock(query, cacheKey)),
    );
  }

  /** Builds a route-safe id for an article (used in `/noticias/:id`). */
  getArticleId(article: Article): string {
    return base64UrlEncode(article.url);
  }

  /** Looks up a previously-seen article by its route id. Survives page refresh. */
  getArticleById(id: string): Article | null {
    const index = this.cache.get<Record<string, Article>>(ARTICLE_INDEX_KEY, Infinity) ?? {};
    if (index[id]) {
      return index[id];
    }
    try {
      const url = base64UrlDecode(id);
      const match = Object.values(index).find((a) => a.url === url);
      return match ?? null;
    } catch {
      return null;
    }
  }

  private indexArticles(articles: Article[]): void {
    const index = this.cache.get<Record<string, Article>>(ARTICLE_INDEX_KEY, Infinity) ?? {};
    for (const article of articles) {
      index[this.getArticleId(article)] = article;
    }
    const keys = Object.keys(index);
    if (keys.length > ARTICLE_INDEX_MAX_SIZE) {
      for (const staleKey of keys.slice(0, keys.length - ARTICLE_INDEX_MAX_SIZE)) {
        delete index[staleKey];
      }
    }
    this.cache.set(ARTICLE_INDEX_KEY, index);
  }

  /** Whether the last response for this category came from cache rather than a live request. */
  isCacheKeyFresh(category: NewsCategory, country = 'us', maxAgeMs = CACHE_TTL_MS): boolean {
    return this.cache.get(`top_${country}_${category}`, maxAgeMs) !== null;
  }

  getCacheTimestamp(category: NewsCategory, country = 'us'): number | null {
    return this.cache.getTimestamp(`top_${country}_${category}`);
  }

  private fallbackToMock(category: NewsCategory, cacheKey: string): Observable<NewsResponse> {
    const stale = this.cache.get<NewsResponse>(cacheKey, Infinity);
    if (stale && stale.articles && stale.articles.length > 0) {
      return of(stale);
    }
    const mockArticles = MOCK_NEWS[category] || [];
    const mockResponse: NewsResponse = {
      status: 'ok',
      totalResults: mockArticles.length,
      articles: mockArticles,
    };
    this.indexArticles(mockArticles);
    return of(mockResponse);
  }

  private fallbackToSearchMock(query: string, cacheKey: string): Observable<NewsResponse> {
    const stale = this.cache.get<NewsResponse>(cacheKey, Infinity);
    if (stale && stale.articles && stale.articles.length > 0) {
      return of(stale);
    }
    const mockArticles = searchMockArticles(query);
    const mockResponse: NewsResponse = {
      status: 'ok',
      totalResults: mockArticles.length,
      articles: mockArticles,
    };
    this.indexArticles(mockArticles);
    return of(mockResponse);
  }
}
