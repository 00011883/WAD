import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  public get<T>(
    url: string,
    headers: { [key: string]: string } = {},
  ): Observable<T> {
    return this.http.get<T>(this.requestFullPath(url), {
      headers: new HttpHeaders({ ...this.getHeader, ...headers }),
    });
  }

  public post<T, K>(
    url: string,
    body: K,
    headers: { [key: string]: string } = {},
  ): Observable<T> {
    return this.http.post<T>(this.requestFullPath(url), body, {
      headers: new HttpHeaders({ ...this.getHeader, ...headers }),
    });
  }

  public delete<T>(
    url: string,
    headers: { [key: string]: string } = {},
  ): Observable<T> {
    return this.http.delete<T>(this.requestFullPath(url), {
      headers: new HttpHeaders({ ...this.getHeader, ...headers }),
    });
  }

  private requestFullPath(path: string): string {
    return this.API_URL + path;
  }

  get authToken(): string {
    // if (this.cookieService.check('user')) {
    //   const data: SignInResponseData = JSON.parse(
    //     this.cookieService.get('user'),
    //   );
    //   if (data && data.access && data.access.accessToken) {
    //     return data.access.accessToken;
    //   }
    // }

    return '';
  }

  get getHeader() {
    return {
      'Content-Type': 'application/json',
    };
  }
}
