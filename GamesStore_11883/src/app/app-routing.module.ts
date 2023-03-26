import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module')
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module')
  },
  {
    path: 'games',
    loadChildren: () => import('./views/games/games.module')
  },
  {
    path: 'authors',
    loadChildren: () => import('./views/authors/authors.module')
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module')
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/admin/admin.module')
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
