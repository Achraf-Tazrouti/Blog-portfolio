import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  templateUrl: './admin-new-post.component.html',
  styleUrl: './admin-new-post.component.scss'
})
export class AdminNewPostComponent {
  title = signal('');
  content = signal('');

  // Nieuwe velden voor home
  focus = signal('');
  goal = signal('');
  status = signal('');
  skillsText = signal(''); // comma-separated

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  save() {
    if (!this.title() || !this.content()) return;

    const token = this.authService.getToken();
    if (!token) return;

    const skills = this.skillsText()
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    this.blogService
      .createPost(
        this.title(),
        this.content(),
        token,
        this.focus() || undefined,
        this.goal() || undefined,
        this.status() || undefined,
        skills.length ? skills : undefined
      )
      .subscribe(() => this.router.navigate(['/blog']));
  }
}