import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games-row',
  templateUrl: './games-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent {
  @Input() title!: string;
  @Input() games!: Game[];
}
