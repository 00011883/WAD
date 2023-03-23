import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isAuth = false;
  isAdmin = false;
  nav = [
    {
      title: 'Home',
      link: '/home'
    },
    {
      title: 'Games',
      link: '/games'
    }
  ];
  guestNav = [
    {
      title: 'Login',
      link: '/auth'
    },
    {
      title: 'Register',
      link: '/auth'
    }
  ];
  authNav = [
    {
      title: 'Profile',
      link: '/profile'
    },
    {
      title: 'Admin',
      link: '/admin'
    }
  ];

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.isAuth = this.cookieService.check('user');
    const user = this.cookieService.get('user');
    if (user) this.isAdmin = JSON.parse(user)?.email === 'admin@admin.admin';
  }
}
