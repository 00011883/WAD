import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const canActivateUser: CanActivateFn = () => {
  return inject(CookieService).check('user');
};
