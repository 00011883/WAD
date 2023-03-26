import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorEditComponent implements OnInit {
  isLoading = true;
  author!: Author;
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadAuthor();
  }

  loadAuthor(): void {
    this.isLoading = true;
    this.sub = this.route.data.subscribe(({ author }) => {
      this.author = author;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }
}
