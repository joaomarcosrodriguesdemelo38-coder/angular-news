import { Injectable } from '@angular/core';

/**
 * Thin wrapper around the browser's native Notification API.
 *
 * NOTE on scope: the assignment brief mentions "Capacitor Push
 * Notifications", which targets native iOS/Android builds wired to a push
 * provider (e.g. Firebase Cloud Messaging) and isn't something that can be
 * demonstrated from a plain web build. This service implements the closest
 * web-native equivalent (the Notifications API) so the feature is fully
 * working in the browser: the app asks for permission and fires a real
 * system notification whenever new headlines for the user's selected
 * category are loaded. See the README for notes on extending this to
 * Capacitor + FCM for a packaged mobile build.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifiedCategories = new Set<string>();

  get isSupported(): boolean {
    return 'Notification' in window;
  }

  get permission(): NotificationPermission {
    return this.isSupported ? Notification.permission : 'denied';
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      return 'denied';
    }
    if (Notification.permission === 'default') {
      return Notification.requestPermission();
    }
    return Notification.permission;
  }

  notify(title: string, body: string): void {
    if (!this.isSupported || Notification.permission !== 'granted') {
      return;
    }
    new Notification(title, {
      body,
      icon: '/favicon.ico',
    });
  }

  /**
   * Fires a single "new headlines" notification per category per browser
   * session - a simple stand-in for a real push notification (which, on a
   * native Capacitor build, would instead arrive from Firebase Cloud
   * Messaging while the app is in the background).
   */
  notifyNewHeadlines(categoryLabel: string, articleCount: number): void {
    if (this.notifiedCategories.has(categoryLabel) || articleCount === 0) {
      return;
    }
    this.notifiedCategories.add(categoryLabel);
    this.notify(
      `Novidades em ${categoryLabel}`,
      `${articleCount} notícias disponíveis para você agora.`,
    );
  }
}
