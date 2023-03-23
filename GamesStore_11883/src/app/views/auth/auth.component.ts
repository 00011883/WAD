import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  remember = false;

  constructor(private CookieService: CookieService, private router: Router) {
    this.CookieService.get('user') && this.router.navigate(['/']);
  }
}
