import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'GamesStore_11883';
  sub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.sub = this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          sessionStorage.clear();
        }
      });
  }

  get isAuth(): boolean {
    return this.router.url !== '/auth';
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
