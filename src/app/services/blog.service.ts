import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly apiUrl = 'http://localhost:3000/api/posts';

  private postsSignal = signal<BlogPost[]>([]);
  readonly posts = this.postsSignal.asReadonly();

  constructor(private http: HttpClient) {}

  loadPosts() {
    return this.http
      .get<BlogPost[]>(this.apiUrl)
      .pipe(tap((posts) => this.postsSignal.set(posts)));
  }

  getPostById(id: string) {
    return this.posts().find((p) => p._id === id);
  }

  createPost(title: string, content: string, token: string) {
    return this.http
      .post<BlogPost>(this.apiUrl, { title, content }, { headers: this.authHeaders(token) })
      .pipe(tap((newPost) => this.postsSignal.update((posts) => [newPost, ...posts])));
  }

  deletePost(id: string, token: string) {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, { headers: this.authHeaders(token) })
      .pipe(tap(() => this.postsSignal.update((posts) => posts.filter((p) => p._id !== id))));
  }

  private authHeaders(token: string) {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
