import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Author } from '../models/author.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpService) {}

  getAuthors(): Observable<Author[]> {
    return this.http
      .get<Author[]>('/Author')
      .pipe(take(1), catchError(this.handleError));
  }

  getAuthor(id: number): Observable<Author> {
    return this.http
      .get<Author>(`/Author/${id}`)
      .pipe(take(1), catchError(this.handleError));
  }

  createAuthor(author: Author) {
    this.http
      .post<any, Author>('/Author', author)
      .pipe(take(1), catchError(this.handleError));
  }

  updateAuthor(author: Author) {
    this.http
      .put<any, Author>(`/Author/${author.id}`, author)
      .pipe(take(1), catchError(this.handleError));
  }

  deleteAuthor(id: number) {
    this.http
      .delete<any>(`/Author/${id}`)
      .pipe(take(1), catchError(this.handleError));
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
