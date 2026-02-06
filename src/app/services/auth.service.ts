import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSignal = signal(false);

  isLoggedIn = this.isLoggedInSignal.asReadonly();

  login(username: string, password: string): boolean {
    // tijdelijke admin login
    if (username === 'admin' && password === 'admin') {
      this.isLoggedInSignal.set(true);
      return true;
    }

    return false;
  }

  logout() {
    this.isLoggedInSignal.set(false);
  }
}
