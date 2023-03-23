import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { canActivateUser } from 'src/app/guards/auth.guard';
import { gameResolver } from './game.service';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GamesComponent,
        data: { animation: 'gamesPage' },
        canActivate: [canActivateUser]
      },
      {
        path: ':id',
        component: GameComponent,
        data: { animation: 'gamePage' },
        resolve: { game: gameResolver },
        canActivate: [canActivateUser]
      }
    ])
  ]
})
export default class GamesModule {}
