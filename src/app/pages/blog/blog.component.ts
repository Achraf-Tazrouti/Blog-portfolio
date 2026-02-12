import { Component } from '@angular/core';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogService } from '../../services/blog.service';

@Component({
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  posts;

  constructor(private blogService: BlogService) {
    this.posts = this.blogService.posts;
    this.blogService.loadPosts().subscribe();
  }
}
