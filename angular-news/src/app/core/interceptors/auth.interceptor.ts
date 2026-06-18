import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Attaches the simulated JWT as a Bearer token on outgoing requests.
 *
 * The NewsAPI itself doesn't need (or accept) this header, so requests to
 * it are deliberately skipped - this interceptor exists to demonstrate the
 * standard pattern used once a real authenticated backend is plugged in
 * (e.g. a Firebase callable function, or your own JWT-protected API).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (!token || req.url.includes('newsapi.org')) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
