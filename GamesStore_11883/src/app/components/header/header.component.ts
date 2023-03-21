import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isAuth = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.isAuth = this.cookieService.check('user');
  }
}
