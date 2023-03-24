import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Game } from '../models/game.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private http: HttpService) {}

  getGames(): Observable<Game[]> {
    return this.http
      .get<Game[]>('/Game')
      .pipe(take(1), catchError(this.handleError));
  }

  getGame(id: number): Observable<Game> {
    return this.http
      .get<Game>(`/Game/${id}`)
      .pipe(take(1), catchError(this.handleError));
  }

  addGame(game: Game): Observable<Game> {
    console.log(game);
    return this.http
      .post<Game, Game>('/Game', game)
      .pipe(take(1), catchError(this.handleError));
  }

  updateGame(game: Game) {
    this.http
      .put<any, Game>(`/Game/${game.id}`, game)
      .pipe(take(1), catchError(this.handleError));
  }

  deleteGame(id: number) {
    this.http
      .delete<any>(`/Game/${id}`)
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
