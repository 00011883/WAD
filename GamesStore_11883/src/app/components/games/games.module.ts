import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesCarouselComponent } from './games-carousel/games-carousel.component';
import { GamesComponent } from './games-row/games-row.component';

@NgModule({
  declarations: [GamesComponent, GamesCarouselComponent],
  imports: [SharedModule],
  exports: [GamesComponent, GamesCarouselComponent]
})
export class GamesModule {}
