import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamesService } from './../../../services/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailsComponent {
  constructor(private gamesService: GamesService) {}
}
