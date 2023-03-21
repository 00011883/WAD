import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [SharedModule, MaterialModule],
  exports: [AuthFormComponent]
})
export class AuthModule {}
