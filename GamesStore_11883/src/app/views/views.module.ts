import { NgModule } from '@angular/core';
import { ComponentsModule } from './../components/components.module';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, GamesComponent],
  imports: [ComponentsModule]
})
export class ViewsModule {}
