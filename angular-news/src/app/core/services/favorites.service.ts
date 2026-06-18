import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.model';
import { AuthService } from './auth.service';

/**
 * Persists favorite articles in localStorage, scoped per logged-in user
 * (falls back to a shared "guest" bucket when nobody is logged in).
 */
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Article[]>([]);
  readonly favorites$ = this.favoritesSubject.asObservable();

  constructor(private auth: AuthService) {
    this.favoritesSubject.next(this.loadFavorites());
    this.auth.currentUser$.subscribe(() => {
      this.favoritesSubject.next(this.loadFavorites());
    });
  }

  getFavorites(): Article[] {
    return this.favoritesSubject.value;
  }

  isFavorite(url: string): boolean {
    return this.favoritesSubject.value.some((article) => article.url === url);
  }

  toggle(article: Article): void {
    const current = this.favoritesSubject.value;
    const exists = current.some((a) => a.url === article.url);
    const updated = exists
      ? current.filter((a) => a.url !== article.url)
      : [article, ...current];

    this.favoritesSubject.next(updated);
    localStorage.setItem(this.storageKey(), JSON.stringify(updated));
  }

  remove(url: string): void {
    const updated = this.favoritesSubject.value.filter((a) => a.url !== url);
    this.favoritesSubject.next(updated);
    localStorage.setItem(this.storageKey(), JSON.stringify(updated));
  }

  private loadFavorites(): Article[] {
    const raw = localStorage.getItem(this.storageKey());
    return raw ? JSON.parse(raw) : [];
  }

  private storageKey(): string {
    const user = this.auth.getCurrentUser();
    return `angularnews_favorites_${user ? user.id : 'guest'}`;
  }
}
