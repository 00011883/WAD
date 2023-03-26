import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent implements OnInit, OnDestroy {
  isLoading = true;
  author!: Author;
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAuthor();
  }

  loadAuthor(): void {
    this.isLoading = true;
    this.sub = this.route.data.subscribe(({ author }) => {
      this.author = author;
      this.isLoading = false;
    });
  }

  deleteAuthor(): void {
    this.authorService.deleteAuthor(this.author.id).subscribe((res) => {
      if (res.status === 204) {
        sessionStorage.removeItem('authors');
        this.router.navigate(['/authors']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
