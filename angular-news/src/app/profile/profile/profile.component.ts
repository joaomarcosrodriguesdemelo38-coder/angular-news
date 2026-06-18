import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null;
  customApiKey = '';

  constructor(
    private auth: AuthService,
    private favorites: FavoritesService,
    public notifications: NotificationService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.user = this.auth.getCurrentUser();
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.customApiKey = localStorage.getItem('angularnews_custom_api_key') || '';
    }
  }

  get favoritesCount(): number {
    return this.favorites.getFavorites().length;
  }

  get notificationStatusLabel(): string {
    if (!this.notifications.isSupported) return 'Não suportado neste navegador';
    if (this.notifications.permission === 'granted') return 'Ativadas';
    if (this.notifications.permission === 'denied') return 'Bloqueadas pelo navegador';
    return 'Não solicitadas ainda';
  }

  enableNotifications(): void {
    this.notifications.requestPermission();
  }

  saveApiKey(): void {
    if (typeof window !== 'undefined') {
      const trimmedKey = this.customApiKey.trim();
      if (trimmedKey) {
        localStorage.setItem('angularnews_custom_api_key', trimmedKey);
        this.snackBar.open('Chave de API salva com sucesso! O feed agora usará sua chave.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      } else {
        this.clearApiKey();
      }
    }
  }

  clearApiKey(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('angularnews_custom_api_key');
      this.customApiKey = '';
      this.snackBar.open('Chave de API redefinida para o padrão de demonstração.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/noticias']);
  }
}
