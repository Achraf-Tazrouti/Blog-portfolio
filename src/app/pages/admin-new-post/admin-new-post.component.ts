import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

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
    private router: Router
  ) {}

  save() {
    if (!this.title() || !this.content()) return;

    this.blogService.addPost(this.title(), this.content());
    this.router.navigate(['/blog']);
  }
}
