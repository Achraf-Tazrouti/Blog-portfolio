import { Component, input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  post = input<BlogPost>();

  constructor(private router: Router) {}

  openPost() {
    this.router.navigate(['/blog', this.post()?._id]);
  }
}
