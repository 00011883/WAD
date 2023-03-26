import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

export const authorResolver: ResolveFn<Author | null> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.paramMap.get('id');
  if (id === null) {
    return null;
  }
  return inject(AuthorService).getAuthor(Number.parseInt(id));
};
