import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { canActivateUser } from 'src/app/guards/auth.guard';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        data: { animation: 'profilePage' },
        canActivate: [canActivateUser]
      }
    ])
  ]
})
export default class ProfileModule {}
