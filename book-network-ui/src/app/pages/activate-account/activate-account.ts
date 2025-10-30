import { Component, signal } from '@angular/core';
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
  message = signal<string>('');
  isOkay = signal(true);
  submitted = signal(false);

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
        this.message.set(
          'Your account has been activated successfully.\n Now you can proceed to login.'
        );
        this.submitted.set(true);
      })
      .catch((err) => {
        console.error(err);
        this.message.set('Token has been expired or invalid');
        this.submitted.set(true);
        this.isOkay.set(false);
      });
  }

  resetForm(): void {
    this.submitted.set(false);
    this.isOkay.set(true);
    this.message.set('');
  }
}
