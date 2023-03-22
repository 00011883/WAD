import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
    private gamesService: GamesService,
    private cookieService: CookieService
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
    this.startCounter();
    this.cdRef.detectChanges();
  }

  setContent(id: number): void {
    if (id === this.currentSlide) return;
    this.timer = this.timerDuration;
    this.currentSlide = id;
  }
  startCounter(): void {
    this.stopCounter();
    this.intervalId = setInterval(() => {
      if (this.timer === 0) {
        this.timer = this.timerDuration;
        this.moveSlide();
        this.startCounter();
      } else {
        this.timer--;
      }
    }, 1000);
  }
  stopCounter(): void {
    this.intervalId && clearInterval(this.intervalId);
  }
  moveSlide(): void {
    if (this.isLastSlide) {
      this.currentSlide = 1;
    } else {
      this.currentSlide += 1;
    }
    this.cdRef.detectChanges();
  }
  get isLastSlide(): boolean {
    return this.currentSlide === this.games.length - 1;
  }

  ngOnDestroy(): void {
    this.stopCounter();
    this.sub && this.sub.unsubscribe();
  }
}
