import { Component, signal } from '@angular/core';

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

@Component({
  standalone: true,
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
