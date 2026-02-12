import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  templateUrl: './admin-new-post.component.html',
  styleUrl: './admin-new-post.component.css'
})
export class AdminNewPostComponent {
  title = signal('');
  content = signal('');

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  save() {
    if (!this.title() || !this.content()) return;

    const token = this.authService.getToken();
    if (!token) return;

    this.blogService
      .createPost(this.title(), this.content(), token)
      .subscribe(() => this.router.navigate(['/blog']));
  }
}
