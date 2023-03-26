import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { canActivateUser } from 'src/app/guards/auth.guard';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors.component';
import { authorResolver } from './authors.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthorsComponent,
        data: { animation: 'authorsPage' },
        canActivate: [canActivateUser]
      },
      {
        path: ':id',
        component: AuthorComponent,
        data: { animation: 'authorPage' },
        resolve: { author: authorResolver },
        canActivate: [canActivateUser]
      },
      {
        path: ':id/edit',
        component: AuthorEditComponent,
        data: { animation: 'authorEditPage' },
        resolve: { author: authorResolver },
        canActivate: [canActivateUser]
      }
    ])
  ]
})
export default class AuthorsModule {}
