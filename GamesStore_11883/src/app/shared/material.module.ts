import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  exports: [MatTabsModule, MatSnackBarModule]
})
export class MaterialModule {}
