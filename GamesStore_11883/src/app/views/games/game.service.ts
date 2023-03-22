import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

export const gameResolver: ResolveFn<Game | null> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.paramMap.get('id');
  if (id === null) {
    return null;
  }
  return inject(GamesService).getGame(Number.parseInt(id));
};
