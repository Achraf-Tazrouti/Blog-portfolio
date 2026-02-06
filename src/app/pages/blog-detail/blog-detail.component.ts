import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  standalone: true,
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  post = signal<BlogPost | null>(null);

  private allPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Eerste stagedag',
      content: 'Vandaag ben ik gestart aan mijn stage...'
    },
    {
      id: 2,
      title: 'Wat ik geleerd heb over Angular',
      content: 'Standalone components en signals zijn 🔥'
    }
  ];

  constructor(route: ActivatedRoute) {
    const id = Number(route.snapshot.paramMap.get('id'));
    const found = this.allPosts.find(p => p.id === id);
    this.post.set(found ?? null);
  }
}
