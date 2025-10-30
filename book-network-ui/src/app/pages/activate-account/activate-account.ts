import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [FormsModule, CommonModule, CodeInputModule],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) {}

  onCodeCompleted(token: string): void {
    this.confirmAccount(token);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string): void {
    this.authService
      .confirm({
        token,
      })
      .then((res) => {
        this.message =
          'Your account has been activated successfully.\n Now you can proceed to login.';
        this.submitted = true;
      })
      .catch((err) => {
        console.error(err);
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      });
  }
}
