import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthResponse, StoredUser, User } from '../models/user.model';
import { base64UrlDecode, base64UrlEncode } from '../utils/base64-url.util';

const USERS_KEY = 'angularnews_users';
const TOKEN_KEY = 'angularnews_token';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 4; // 4 hours

/**
 * AuthService - simulated JWT authentication.
 *
 * This project does not require a real backend (the assignment lists
 * Firebase/JWT as an option and a backend service as optional), so
 * authentication is fully simulated on the client:
 *
 *  - Users "register" into a small table persisted in localStorage.
 *  - Passwords are never stored in plain text (a simple SHA-256-like
 *    digest via the Web Crypto API is used) - this is NOT production
 *    grade security, just a demonstration that credentials aren't kept
 *    as plain text.
 *  - On login, a real JWT-SHAPED token (header.payload.signature, all
 *    base64url encoded) is generated and stored in localStorage. The
 *    token carries an expiration (`exp`) claim and is validated on
 *    every check, exactly like a real JWT would be.
 *
 * Swapping this service for a real Firebase Auth or REST/JWT backend
 * later only requires changing the implementation below - every
 * component talks to AuthService through the same public API.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.restoreSession());
  readonly currentUser$ = this.currentUserSubject.asObservable();

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const users = this.getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      return throwError(() => new Error('Já existe uma conta com este e-mail.'));
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: this.hash(password),
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return this.login(normalizedEmail, password);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const found = users.find((u) => u.email === normalizedEmail);

    if (!found || found.passwordHash !== this.hash(password)) {
      return throwError(() => new Error('E-mail ou senha inválidos.'));
    }

    const user: User = { id: found.id, name: found.name, email: found.email };
    const token = this.generateToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    this.currentUserSubject.next(user);

    // `delay` simulates network latency so loading states are visible, just like a real API call.
    return of({ token, user }).pipe(delay(400));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.getValidPayload() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.getValidPayload() ? localStorage.getItem(TOKEN_KEY) : null;
  }

  // ---- internal helpers -------------------------------------------------

  private restoreSession(): User | null {
    const payload = this.getValidPayload();
    return payload ? { id: payload.sub, name: payload.name, email: payload.email } : null;
  }

  private getValidPayload(): { sub: string; name: string; email: string; exp: number } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    try {
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      if (!payload.exp || Date.now() / 1000 > payload.exp) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      return payload;
    } catch {
      return null;
    }
  }

  private generateToken(user: User): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      iat: now,
      exp: now + TOKEN_TTL_MS / 1000,
    };
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    // Demo-only "signature": not cryptographically verifiable server-side
    // since there is no server. Real deployments must sign this with a
    // server-held secret (or replace this service with Firebase/JWT backend).
    const signature = this.hash(`${encodedHeader}.${encodedPayload}`).slice(0, 32);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private getUsers(): StoredUser[] {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private hash(value: string): string {
    // Small, dependency-free string digest (FNV-1a) used only to avoid
    // storing passwords/signatures as plain text in this demo project.
    let h = 0x811c9dc5;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16);
  }
}
