import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailsComponent {}
