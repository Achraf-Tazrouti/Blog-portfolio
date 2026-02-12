import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogService.loadPosts().subscribe();
  }

  get posts() {
    return this.blogService.posts;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goToNewPost() {
    this.router.navigate(['/admin/new']);
  }

  deletePost(id: string) {
    const token = this.authService.getToken();
    if (!token) return;

    this.blogService.deletePost(id, token).subscribe();
  }
}
