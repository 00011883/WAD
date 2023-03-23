import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  chunk: Game[][] = [];
  isLoading = true;
  sub!: Subscription;

  constructor(
    private gamesService: GamesService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const data = sessionStorage.getItem('games');
    console.log(data);

    if (data) {
      this.games = JSON.parse(data);
      this.makeChunks();
      this.isLoading = false;
    } else {
      this.getGames();
    }
  }

  getGames(): void {
    this.isLoading = true;
    this.sub = this.gamesService.getGames().subscribe((games) => {
      this.games = games;
      this.makeChunks();
      sessionStorage.setItem('games', JSON.stringify(games));
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  makeChunks(): void {
    for (let i = 0; i < this.games.length; i += 5) {
      this.chunk.push(this.games.slice(i, i + 5));
    }
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
