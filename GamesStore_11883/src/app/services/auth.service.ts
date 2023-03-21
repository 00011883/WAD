import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  BehaviorSubject,
  catchError,
  Observable,
  take,
  tap,
  throwError
} from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // SignInResponseData
  private readonly _user = new BehaviorSubject<{ user: any } | null>(null);
  readonly user = this._user.asObservable();
  get userData() {
    return this._user.getValue();
  }
  constructor(
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  setUserData(data: { user: any } | null) {
    //SignInResponseData
    this._user.next(data);
  }

  register({ username, password }: any): Observable<any> {
    return this.http
      .post<any, any>('/auth', {
        username,
        password,
        register: true
      })
      .pipe(
        take(1),
        catchError(this.handleError),
        tap((res) => {
          if (res && res.success) {
            const date = new Date();
            const expires = date.setDate(date.getDate() + 7);

            this.cookieService.set(
              'user',
              JSON.stringify({
                ...res.result.data,
                success: res.success
              }),
              {
                expires: new Date(expires),
                path: '/',
                secure: true,
                sameSite: 'Strict'
              }
            );

            this.router.navigate(['/']);
          }
        })
      );
  }

  login({ username, password }: any): Observable<any> {
    //SignInResponse, SignInRequest
    return this.http
      .post<any, any>('/auth', {
        username,
        password
      })
      .pipe(
        take(1),
        catchError(this.handleError),
        tap((res) => {
          if (res && res.success) {
            const date = new Date();
            const expires = date.setDate(date.getDate() + 7);

            this.cookieService.set(
              'user',
              JSON.stringify({
                ...res.result.data,
                success: res.success
              }),
              {
                expires: new Date(expires),
                path: '/',
                secure: true,
                sameSite: 'Strict'
              }
            );

            this.router.navigate(['/']);
          }
        })
      );
  }

  logout(): void {
    this.setUserData(null);
    this.cookieService.delete('user');
    this.router.navigate(['/auth']);
  }

  autoLogin(): void {
    if (this.cookieService.check('user')) {
      const data: { user: any } = JSON.parse(
        // SignInResponseData
        this.cookieService.get('user')
      );
      data && this.setUserData(data);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errMsg = 'An unknown error occurred! Please try again later.';
    if (!errorRes.error || !errorRes.error.code) {
      return throwError(() => new Error(errMsg));
    }
    // ! do this only for auth service related errors
    // TODO: if error list will be identified, populate this switch
    switch (errorRes.message) {
      case 'Other':
        errMsg = 'This username exists already!';
        break;
    }
    return throwError(() => new Error(errMsg));
  }
}
