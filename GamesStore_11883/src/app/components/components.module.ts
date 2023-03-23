import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [MaterialModule, GamesModule, AuthModule, SharedModule, AdminModule],
  exports: [GamesModule, AuthModule, SharedModule, AdminModule, HeaderComponent]
})
export class ComponentsModule {}
