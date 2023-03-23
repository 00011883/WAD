import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/constants/mat.const';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { Errors } from 'src/app/types/error.type';
import { GamesService } from './../../../services/games.service';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGamesComponent implements OnInit {
  authors: Author[] = [];
  form: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.minLength(5), Validators.required]),
      description: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      shortDescription: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      posterUrl: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      imgUrl: new FormControl('', [
        Validators.minLength(5),
        Validators.required
      ]),
      logo: new FormControl('', [Validators.minLength(5), Validators.required]),
      price: new FormControl(0, [Validators.required]),
      author: new FormGroup({
        id: new FormControl(0, [Validators.required])
      })
    },
    { updateOn: 'change' }
  );
  constructor(
    private authorService: AuthorService,
    private gamesService: GamesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((authors) => {
      console.log(authors);
      this.authors = authors;
    });
  }

  submit() {
    if (!this.form.valid) {
      this.checkValidation();
    } else if (this.form.valid) {
      console.log(this.form.value);
      console.log(Number(this.form.value.price));
      this.form.patchValue({
        price: Number(this.form.value.price),
        author: {
          id: Number(this.form.value.author.id)
        }
      });
      this.gamesService.createGame(this.form.value).subscribe((res) => {
        console.log(res);
      });
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
