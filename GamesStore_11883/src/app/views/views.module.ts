import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { ComponentsModule } from './../components/components.module';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorComponent } from './authors/author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameComponent } from './games/game/game.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    GamesComponent,
    GameComponent,
    AuthComponent,
    ProfileComponent,
    AdminComponent,
    GameEditComponent,
    AuthorsComponent,
    AuthorComponent,
    AuthorEditComponent
  ],
  imports: [ComponentsModule, MaterialModule]
})
export class ViewsModule {}
