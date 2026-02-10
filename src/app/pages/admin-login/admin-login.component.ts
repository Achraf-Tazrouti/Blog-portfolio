import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  username = signal('');
  password = signal('');
  error = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.error.set(false);

    this.authService
      .login(this.username(), this.password())
      .subscribe({
        next: (res) => {
          this.authService.handleLoginSuccess(res.token);
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.error.set(true);
        }
      });
  }
}
