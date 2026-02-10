import { Injectable, signal } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private postsSignal = signal<BlogPost[]>([
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

  posts = this.postsSignal.asReadonly();

  getPostById(id: number) {
    return this.posts().find(p => p.id === id);
  }
  addPost(title: string, content: string) {
  const newPost = {
    id: Date.now(), // tijdelijk id
    title,
    content
  };

  this.postsSignal.update(posts => [newPost, ...posts]);
}

}
