import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Router } from '@angular/router';
import { Token } from '../../services/token/token';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule], // FormsModule necessary to use ngModel
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  authRequest: AuthenticationRequest = {
    email: '',
    password: '',
  };
  errorMsg = signal<string[]>([]);

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: Token
  ) {}

  login(): void {
    this.errorMsg.set([]); // reset errors

    this.authService
      .authenticate({ body: this.authRequest })
      .then((res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      })
      .catch((err) => {
        console.error(err);

        if (err.error?.validationErrors) {
          this.errorMsg.set(err.error.validationErrors);
        } else if (err.error?.error) {
          this.errorMsg.set([err.error.error]);
        }
      });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
