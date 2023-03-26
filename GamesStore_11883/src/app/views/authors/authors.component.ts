import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsComponent implements OnInit, OnDestroy {
  data: Author[] = [];
  chunk: Author[][] = [];
  isLoading = true;
  sub!: Subscription;

  constructor(
    private authorService: AuthorService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const data = sessionStorage.getItem('authors');
    if (data) {
      this.data = JSON.parse(data);
      this.makeChunks();
      this.isLoading = false;
    } else {
      this.getGames();
    }
  }

  getGames(): void {
    this.isLoading = true;
    this.sub = this.authorService.getAuthors().subscribe((authors) => {
      this.data = authors;
      this.makeChunks();
      sessionStorage.setItem('authors', JSON.stringify(authors));
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  makeChunks(): void {
    for (let i = 0; i < this.data.length; i += 5) {
      this.chunk.push(this.data.slice(i, i + 5));
    }
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
