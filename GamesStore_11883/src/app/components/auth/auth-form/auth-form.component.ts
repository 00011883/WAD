import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/constants/mat.const';
import { Errors } from 'src/app/types/error.type';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  @Input() title = '';
  confirm = '';

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [
        Validators.email,
        Validators.maxLength(30),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ])
    },
    { updateOn: 'change' }
  );

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  submit(): void {
    if (
      !this.form.valid ||
      (this.confirm !== this.form.value.password && this.title === 'Register')
    ) {
      this.checkValidation();
    } else if (this.form.valid) {
      if (this.title === 'Login') {
        this._authService.auth(this.form.value);
      } else if (this.title === 'Register') {
        this._authService.auth(this.form.value);
      }
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
        const { required, email, minlength, maxlength }: Errors =
          JSON.parse(error);

        if (required) {
          setTimeout(() => {
            this.openSnackBar(keys[val] + ' field is required', 'OK');
          }, 3000 * val);
        } else if (email) {
          setTimeout(() => {
            this.openSnackBar('Enter correct email address', 'OK');
          }, 3000 * val);
        } else if (minlength) {
          setTimeout(() => {
            this.openSnackBar(
              keys[val] + ' should not be less than 6 characters',
              'OK'
            );
          }, 3000 * val);
        } else if (maxlength) {
          setTimeout(() => {
            this.openSnackBar(
              keys[val] + ' can not be more than 30 characters',
              'OK'
            );
          }, 3000 * val);
        }
      }
    });

    if (this.title === 'Register') {
      if (this.confirm === '') {
        setTimeout(() => {
          this.openSnackBar('Confirm field is required', 'OK');
        }, 0);
      } else if (
        this.confirm !== '' &&
        this.confirm !== this.form.value.password
      ) {
        setTimeout(() => {
          this.openSnackBar('Passwords should match', 'OK');
        }, 0);
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig as MatSnackBarConfig);
  }
}
