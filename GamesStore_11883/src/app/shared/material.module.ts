import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
