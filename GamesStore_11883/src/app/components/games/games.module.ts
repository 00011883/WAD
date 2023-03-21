import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent, GameDetailsComponent],
  imports: [SharedModule, MaterialModule],
  exports: [GamesComponent]
})
export class GamesModule {}
