import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { ComponentsModule } from './../components/components.module';
import { AuthComponent } from './auth/auth.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, GamesComponent, AuthComponent],
  imports: [ComponentsModule, MaterialModule]
})
export class ViewsModule {}
