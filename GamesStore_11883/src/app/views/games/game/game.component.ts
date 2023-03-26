import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
  isLoading = true;
  game!: Game;
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private router: Router
  ) {}

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

  deleteGame(): void {
    this.gamesService.deleteGame(this.game.id).subscribe((res) => {
      if (res.status === 204) {
        sessionStorage.removeItem('games');
        this.router.navigate(['/games']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
