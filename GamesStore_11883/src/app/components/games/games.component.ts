import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent {}
