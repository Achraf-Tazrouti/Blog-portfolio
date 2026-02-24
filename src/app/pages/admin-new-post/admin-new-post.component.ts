import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  templateUrl: './admin-new-post.component.html',
  styleUrl: './admin-new-post.component.scss',
  imports: [CommonModule, RouterLink]
})
export class AdminNewPostComponent {
  title = signal('');
  content = signal('');

  // Nieuwe velden voor home
  focus = signal('');
  goal = signal('');
  status = signal('');
  skillsText = signal(''); // comma-separated
  editingId = signal<string | null>(null);

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.editingId.set(id);
    this.blogService.loadPosts().subscribe(() => {
      const post = this.blogService.getPostById(id);
      if (!post) return;

      this.title.set(post.title || '');
      this.content.set(post.content || '');
      this.focus.set(post.focus || '');
      this.goal.set(post.goal || '');
      this.status.set(post.status || '');
      this.skillsText.set((post.skills || []).join(', '));
    });
  }

  save() {
    if (!this.title() || !this.content()) return;

    const token = this.authService.getToken();
    if (!token) return;

    const skills = this.skillsText()
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title: this.title(),
      content: this.content(),
      focus: this.focus() || undefined,
      goal: this.goal() || undefined,
      status: this.status() || undefined,
      skills: skills.length ? skills : undefined
    };

    if (this.editingId()) {
      this.blogService
        .updatePost(this.editingId() as string, payload, token)
        .subscribe(() => this.router.navigate(['/admin']));
      return;
    }

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
