import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  chunk: Game[][] = [];

  ngOnInit() {
    const data = sessionStorage.getItem('games');
    this.games = data ? JSON.parse(data) : [];
    for (let i = 0; i < this.games.length; i += 5) {
      this.chunk.push(this.games.slice(i, i + 5));
    }
  }
}
