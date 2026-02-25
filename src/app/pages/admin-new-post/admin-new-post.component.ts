import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  templateUrl: './admin-new-post.component.html',
  styleUrl: './admin-new-post.component.scss',
  imports: [CommonModule, RouterLink, ToastModule],
  providers: [MessageService]
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
    private route: ActivatedRoute,
    private messageService: MessageService
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
    if (!this.title() || !this.content()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Verplicht',
        detail: 'Titel en inhoud zijn verplicht.'
      });
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Niet ingelogd',
        detail: 'Log in om wijzigingen op te slaan.'
      });
      return;
    }

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
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Opgeslagen',
              detail: 'Blogpost is bijgewerkt.'
            });
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1200);
          },
          error: (err) => this.handleSaveError(err)
        });
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
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Opgeslagen',
            detail: 'Nieuwe blogpost is aangemaakt.'
          });
          this.router.navigate(['/blog']);
        },
        error: (err) => this.handleSaveError(err)
      });
  }

  private handleSaveError(err: unknown) {
    let detail = 'Controleer je login of backend.';
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) detail = 'Backend niet bereikbaar (server uit?).';
      if (err.status === 401) detail = 'Niet ingelogd of token verlopen.';
      if (err.status === 403) detail = 'Geen admin rechten of token ongeldig.';
      if (err.status === 404) detail = 'Update-route niet gevonden op backend.';
      if (err.status >= 500) detail = 'Serverfout in de backend.';
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Opslaan mislukt',
      detail
    });
    console.error('Save failed', err);
  }

}
