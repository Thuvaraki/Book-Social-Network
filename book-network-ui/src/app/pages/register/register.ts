import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  };
  errorMsg: Array<string> = [];

  constructor(private router: Router, private authService: AuthenticationService) {}

  register(): void {
    this.errorMsg = [];
    this.authService
      .register({
        body: this.registerRequest,
      })
      .then((res) => {
        this.router.navigate(['activate-account']);
      })
      .catch((err) => {
        console.error(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      });
  }

  login(): void {
    this.router.navigate(['login']);
  }
}
