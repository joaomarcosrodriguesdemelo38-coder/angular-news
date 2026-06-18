import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ThemeService } from '../../../core/services/theme.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isDarkMode$: Observable<boolean>;
  mobileMenuOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notifications: NotificationService,
    private theme: ThemeService,
  ) {
    this.currentUser$ = this.auth.currentUser$;
    this.isDarkMode$ = this.theme.isDarkMode$;
  }

  ngOnInit(): void {
    // Ask for notification permission once, right after the shell loads -
    // this powers the "novas notícias" push-style alerts in NewsListComponent.
    if (this.notifications.isSupported && this.notifications.permission === 'default') {
      this.notifications.requestPermission();
    }
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  search(query: string): void {
    const trimmed = query.trim();
    this.mobileMenuOpen = false;
    if (trimmed) {
      this.router.navigate(['/noticias'], { queryParams: { q: trimmed } });
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    this.auth.logout();
    this.closeMobileMenu();
    this.router.navigate(['/noticias']);
  }
}
