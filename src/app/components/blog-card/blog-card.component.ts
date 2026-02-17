import { Component, input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  post = input<BlogPost>();

  constructor(private router: Router) {}

  openPost() {
    this.router.navigate(['/blog', this.post()?._id]);
  }

  getPreview(): string {
  const raw = this.post()?.content || '';

  // verwijder alle HTML tags
  const withoutHtml = raw.replace(/<[^>]*>/g, '');

  return withoutHtml.slice(0, 150);
}
}
