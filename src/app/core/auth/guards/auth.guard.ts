import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthService).check().pipe(
    switchMap((authenticated) => {
      // If the user is not authenticated...
      if (!authenticated) {
        // Redirect to the root URL
        const urlTree = router.parseUrl(`/`);

        return of(urlTree);
      }

      // Allow the access
      return of(true);
    }),
  );
};
