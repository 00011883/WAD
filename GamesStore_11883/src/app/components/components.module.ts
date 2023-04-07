import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { HeaderComponent } from './header/header.component';

const arr = [GamesModule, AuthModule, SharedModule, AdminModule];

@NgModule({
  declarations: [HeaderComponent],
  imports: [MaterialModule, ...arr],
  exports: [HeaderComponent, ...arr]
})
export class ComponentsModule {}
