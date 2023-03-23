import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

export type AuthResponseData = unknown;
export type AuthRequestData = {
  email: string;
  password: string;
  register?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _user = new BehaviorSubject<{
    user: AuthResponseData;
  } | null>(null);
  readonly user = this._user.asObservable();
  get userData() {
    return this._user.getValue();
  }
  constructor(
    private http: HttpService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  setUserData(data: { user: AuthResponseData } | null) {
    this._user.next(data);
  }

  auth({
    email,
    password,
    register = false
  }: AuthRequestData): Observable<AuthResponseData> | null {
    const path = register ? '/auth/register' : '/auth';
    this.setCookie({ email, password } as AuthResponseData);
    return null;

    // return this.http
    //   .post<AuthResponseData, AuthRequestData>(path, {
    //     email,
    //     password,
    //     register
    //   })
    //   .pipe(
    //     take(1),
    //     catchError(this.handleError),
    //     tap((res) => {
    //       if (res) {
    //         this.setCookie(res);
    //       }
    //     })
    //   );
  }

  setCookie(res: AuthResponseData): void {
    const date = new Date();
    const expires = date.setDate(date.getDate() + 7);

    this.cookieService.set('user', JSON.stringify(res), {
      expires: new Date(expires),
      path: '/',
      secure: true,
      sameSite: 'Strict'
    });

    this.router.navigate(['/']);
  }

  logout(): void {
    this.setUserData(null);
    this.cookieService.delete('user');
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errMsg = 'An unknown error occurred! Please try again later.';
  //   if (!errorRes.error || !errorRes.error.code) {
  //     return throwError(() => new Error(errMsg));
  //   }
  //   // ! do this only for auth service related errors
  //   // TODO: if error list will be identified, populate this switch
  //   switch (errorRes.message) {
  //     case 'Other':
  //       errMsg = 'This username exists already!';
  //       break;
  //   }
  //   return throwError(() => new Error(errMsg));
  // }
}
