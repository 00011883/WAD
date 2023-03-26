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
import { Game } from 'src/app/models/game.model';
import { AuthorService } from 'src/app/services/author.service';
import { Errors } from 'src/app/types/error.type';
import { GamesService } from './../../../services/games.service';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGamesComponent implements OnInit {
  @Input() edit = false;
  @Input() game!: Game;
  authors: Author[] = [];
  defaultAuthor = 'Select Author';
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
        id: new FormControl(this.defaultAuthor, [Validators.required])
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
      authors && (this.authors = authors);
    });
    if (this.edit) {
      this.form.patchValue(this.game);
    }
  }

  submit() {
    if (!this.form.valid) {
      this.checkValidation();
    } else if (this.form.value.author.id === this.defaultAuthor) {
      this._snackBar.open('Please select an author', 'OK');
    } else if (this.form.valid) {
      this.form.patchValue({
        price: Number(this.form.value.price),
        author: {
          id: Number(this.form.value.author.id)
        }
      });
      if (this.edit) {
        this.updateGame();
      } else {
        this.addGame();
      }
    }
  }

  updateGame() {
    const sub = this.gamesService
      .updateGame({ ...this.form.value, id: this.game.id })
      .subscribe((res) => {
        if (res) {
          this._snackBar.open('Game updated successfully', 'OK');
          sessionStorage.removeItem('games');
        }
      });
    setTimeout(() => {
      sub && sub.unsubscribe();
    }, 5000);
  }

  addGame() {
    const sub = this.gamesService.addGame(this.form.value).subscribe((res) => {
      if (res) {
        this._snackBar.open('Game added successfully', 'OK');
        this.form.reset();
        sessionStorage.removeItem('games');
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
