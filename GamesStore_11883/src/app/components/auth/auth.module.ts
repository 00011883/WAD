import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [SharedModule],
  exports: [AuthFormComponent]
})
export class AuthModule {}
