import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/constants/mat.const';
import { Errors } from 'src/app/types/error.type';
import { AuthorService } from './../../../services/author.service';

@Component({
  selector: 'app-admin-author',
  templateUrl: './admin-author.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAuthorComponent {
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

  submit() {
    if (!this.form.valid) {
      this.checkValidation();
    } else if (this.form.valid) {
      this.authorService.createAuthor(this.form.value);
    }
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
