import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../models/blog-post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  standalone: true,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
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
}
