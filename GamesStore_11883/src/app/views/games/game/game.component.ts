import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
  isLoading = true;
  game!: Game;
  sub!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadGame();
  }

  loadGame(): void {
    this.isLoading = true;
    this.sub = this.route.data.subscribe(({ game }) => {
      this.game = game;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
