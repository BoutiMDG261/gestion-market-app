import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false

  private readonly _httpClient = inject(HttpClient)
  private readonly _cookieService = inject(CookieService)

  get accessToken(): string {
    let token = ""
    const cookieExists = this._cookieService.check('appToken')

    if (cookieExists && this._cookieService.get('appToken') !== 'undefined') {
      token = <string>JSON.parse(this._cookieService.get('appToken') || '')
    }
    return token
  }

  set accessToken(token: string | null) {
    this._cookieService.set('appToken', JSON.stringify(token), 30, '/', environment.cookies.domain, true, 'None')
  }

  initialize(): void {
    const token = this.accessToken;
    if (token && token !== 'undefined') {
      this._authenticated = true;
    }
  }

  signIn(credentials: { username: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('You are already connected.')
    }

    return this._httpClient.post(`${environment.api}/login`, credentials).pipe(
      switchMap((res: any) => {

        this.accessToken = res.token

        this._authenticated = true

        return of(res)
      })
    )
  }

  signOut(): Observable<any> {
    this._httpClient.post(`${environment.api}/logout`,{}).subscribe({
      next: () => {
        this._cookieService.delete('accessToken');
        this._cookieService.delete('appToken');
        this.accessToken = null;
        this._authenticated = false;
      },
      complete: () => {
      }
    })

    return of(true);
  }

  check(): Observable<boolean> {
    //if user is logged in
    if (this._authenticated && this.accessToken !== 'undefined' && this.accessToken !== '') {
      return of(true)
    } else {
      return of(false)
    }
  }
}
