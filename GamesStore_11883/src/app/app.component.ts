import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'GamesStore_11883';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.router.url);
  }

  get isAuth(): boolean {
    return !this.router.url.includes('auth');
  }
}
