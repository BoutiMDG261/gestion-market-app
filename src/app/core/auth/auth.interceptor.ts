import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
import { AuthUtils } from '@app/core/auth/auth.utils';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
    const snackBar = inject(MatSnackBar);

    // Clone the request object
    let newReq = req.clone();

    // Request
    if (authService.accessToken && !AuthUtils.isTokenExpired(authService.accessToken)) {
        newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
        });
    }

    // Response
    return next(newReq).pipe(
        tap((event: any) => {
            if (event instanceof HttpResponse) {
                if (event?.body?.message !== '' && event?.body?.message != null) {
                    snackBar.open(event?.body?.message, 'Fermer', {
                        duration: 3000,
                        panelClass: ['success-snackbar', 'snackbar-top']
                    });
                }
            }
        }),
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.status === 401) {
                // Sign out
                authService.signOut();
                // Reload the app
                location.reload();
            }

            if (error instanceof HttpErrorResponse && (error.status === 403 || error.status === 404 || error.status === 500)) {
                if (error?.error?.message !== '' && error?.error?.message != null) {
                    snackBar.open(error?.error?.message, 'Fermer', {
                        duration: 3000,
                        panelClass: ['error-snackbar', 'snackbar-top']
                    });
                }
            }

            if (error instanceof HttpErrorResponse && error.status === 422) {
                if (error?.error?.message !== '' && error?.error?.message != null) {
                    let errors = '';
                    Object.keys(error?.error?.errors).map((key) => {
                        error?.error?.errors[key]?.forEach((err: any) => {
                            errors += `${err}\n`;
                        });
                    });

                    snackBar.open(`${error?.error?.message}\n${errors}`, 'Fermer', {
                        duration: 5000,
                        panelClass: ['error-snackbar', 'snackbar-top']
                    });
                }
            }

            return throwError(error);
        }),
    );
};
