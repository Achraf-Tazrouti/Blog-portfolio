import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/blog-post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  standalone: true,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
  imports: [CommonModule, RouterLink]
})
export class BlogDetailComponent {
  post = signal<BlogPost | null>(null);

  constructor(
    route: ActivatedRoute,
    blogService: BlogService
  ) {
    const id = route.snapshot.paramMap.get('id');

    blogService.loadPosts().subscribe(() => {
      const found = id ? blogService.getPostById(id) : undefined;
      this.post.set(found ?? null);
    });
  }

  formatDate(value?: string) {
    if (!value) return '';
    return new Intl.DateTimeFormat('nl-BE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(value));
  }
}
