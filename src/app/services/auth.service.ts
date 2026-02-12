import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSignal = signal<boolean>(
    !!localStorage.getItem('token')
  );

  isLoggedIn = this.isLoggedInSignal.asReadonly();

  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.API_URL}/login`,
      { username, password }
    );
  }

  handleLoginSuccess(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSignal.set(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSignal.set(false);
  }
}
