import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from './../../services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  games: Game[] = [];
  intervalId!: NodeJS.Timer;
  timer = 9;
  timerDuration = 9;
  currentSlide = 1;
  sub!: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    const games = sessionStorage.getItem('games');
    if (games) {
      this.games = JSON.parse(games);
      this.stopLoading();
      return;
    } else this.getGames();
  }

  getGames(): void {
    this.isLoading = true;
    this.sub = this.gamesService.getGames().subscribe((games) => {
      this.games = games;
      sessionStorage.setItem('games', JSON.stringify(games));
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
