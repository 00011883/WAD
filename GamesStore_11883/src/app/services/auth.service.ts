import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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
  constructor(private router: Router, private cookieService: CookieService) {}

  auth({
    email,
    password
  }: AuthRequestData): Observable<AuthResponseData> | null {
    this.setCookie({ email, password } as AuthResponseData);
    return null;
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
    this.cookieService.delete('user');
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }
}
