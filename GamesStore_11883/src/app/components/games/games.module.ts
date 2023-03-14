import { NgModule } from '@angular/core';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent, GameDetailsComponent],
  imports: [SharedModule, PrimengModule],
  exports: [GamesComponent]
})
export class GamesModule {}
