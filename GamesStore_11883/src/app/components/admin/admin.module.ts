import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { AdminGamesComponent } from './admin-games/admin-games.component';

@NgModule({
  declarations: [AdminAuthorComponent, AdminGamesComponent],
  imports: [SharedModule, MaterialModule],
  exports: [AdminAuthorComponent, AdminGamesComponent]
})
export class AdminModule {}
