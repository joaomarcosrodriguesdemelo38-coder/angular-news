import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Route guard used on Favorites and Profile routes: redirects to the login
 * screen (keeping the originally requested URL) when there is no valid
 * session.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login'], { queryParams: { redirectTo: state.url } });
  return false;
};
