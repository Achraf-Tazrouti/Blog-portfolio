import { Component, signal } from '@angular/core';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogPost } from '../../models/blog-post.model';


@Component({
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  posts = signal<BlogPost[]>([
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
  ]);
}
