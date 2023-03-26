import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { Game } from 'src/app/models/game.model';
import { AuthorService } from 'src/app/services/author.service';
import { GamesService } from './../../services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  games: Game[] = [];
  authors: Author[] = [];
  intervalId!: NodeJS.Timer;
  timer = 9;
  timerDuration = 9;
  currentSlide = 1;
  sub!: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private gamesService: GamesService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    const games = sessionStorage.getItem('games');
    const authors = sessionStorage.getItem('authors');
    if (games && authors) {
      this.games = JSON.parse(games);
      this.authors = JSON.parse(authors);
      this.stopLoading();
      return;
    } else {
      this.getGames();
      this.getAuthors();
    }
  }

  getGames(): void {
    this.isLoading = true;
    this.sub = this.gamesService.getGames().subscribe((games) => {
      this.games = games;
      sessionStorage.setItem('games', JSON.stringify(games));
      this.stopLoading();
    });
  }

  getAuthors(): void {
    this.isLoading = true;
    this.sub = this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
      sessionStorage.setItem('authors', JSON.stringify(authors));
      this.stopLoading();
    });
  }

  stopLoading(): void {
    this.isLoading = false;
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
