import { Component } from '@angular/core';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';

@Component({
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [
    CommonModule,
    BlogCardComponent
  ]
})
export class BlogComponent {
  posts;

  constructor(private blogService: BlogService) {
    this.posts = this.blogService.posts;
    this.blogService.loadPosts().subscribe();
  }
}
