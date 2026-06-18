import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const THEME_KEY = 'angularnews_theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  readonly isDarkMode$ = this.darkModeSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) {
        this.setDarkMode(savedTheme === 'dark');
      } else {
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setDarkMode(prefersDark);
      }
    }
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode());
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    if (this.isBrowser) {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }
}
