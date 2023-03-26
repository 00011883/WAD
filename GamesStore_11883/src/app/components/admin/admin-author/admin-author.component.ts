import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/constants/mat.const';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { Errors } from 'src/app/types/error.type';

@Component({
  selector: 'app-admin-author',
  templateUrl: './admin-author.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAuthorComponent implements OnInit {
  @Input() edit = false;
  @Input() author!: Author;
  form: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.minLength(5), Validators.required]),
      description: new FormControl('', [Validators.required]),
      posterUrl: new FormControl('', [Validators.required])
    },
    { updateOn: 'change' }
  );
  constructor(
    private authorService: AuthorService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.edit) {
      this.form.patchValue(this.author);
    }
  }

  submit() {
    if (!this.form.valid) {
      this.checkValidation();
    } else if (this.form.valid) {
      if (this.edit) {
        this.updateAuthor();
      } else {
        this.addAuthor();
      }
    }
  }

  updateAuthor(): void {
    const sub = this.authorService
      .updateAuthor({ ...this.form.value, id: this.author.id })
      .subscribe((res) => {
        if (res) {
          this.openSnackBar('Author updated successfully', 'OK');
          sessionStorage.removeItem('authors');
        }
      });
    setTimeout(() => {
      sub && sub.unsubscribe();
    }, 5000);
  }

  addAuthor(): void {
    const sub = this.authorService
      .addAuthor(this.form.value)
      .subscribe((res) => {
        if (res) {
          this.openSnackBar('Author added successfully', 'OK');
          this.form.reset();
          sessionStorage.removeItem('authors');
        }
      });
    setTimeout(() => {
      sub && sub.unsubscribe();
    }, 5000);
  }

  checkValidation() {
    const keys = Object.keys(this.form.controls);
    const values = Object.values(this.form.controls);
    keys.forEach((key, index) => {
      keys[index] = key[0].toUpperCase() + key.slice(1);
    });
    values.forEach((key, val) => {
      const error = JSON.stringify(key.errors);
      if (error !== 'null') {
        const { required, minlength, maxlength }: Errors = JSON.parse(error);

        if (required) {
          setTimeout(() => {
            this.openSnackBar(keys[val] + ' field is required', 'OK');
          }, 3000 * val);
        } else if (minlength) {
          setTimeout(() => {
            this.openSnackBar(
              keys[val] + ' should not be less than 5 characters',
              'OK'
            );
          }, 3000 * val);
        } else if (maxlength) {
          setTimeout(() => {
            this.openSnackBar(
              keys[val] + ' can not be more than 20 characters',
              'OK'
            );
          }, 3000 * val);
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig as MatSnackBarConfig);
  }
}
