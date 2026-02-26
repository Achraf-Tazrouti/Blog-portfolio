import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';
import { environment } from '../../environments/environment';

// @Injectable maakt deze service beschikbaar in hele app
// providedIn: 'root' = singleton pattern (1 instantie voor hele app)
@Injectable({ providedIn: 'root' })
export class BlogService {
  // Backend API URL - waar je Express server draait
  private readonly apiUrl = `${environment.apiBaseUrl}/posts`;
  // PRIVATE signal - alleen BlogService kan dit updaten
  private postsSignal = signal<BlogPost[]>([]);
  
  // PUBLIC readonly versie - andere componenten kunnen enkel LEZEN
  // .asReadonly() = bescherming zodat niemand anders de signal kan wijzigen
  readonly posts = this.postsSignal.asReadonly();

  // HttpClient wordt geïnjecteerd - gebruikt voor API calls naar backend
  constructor(private http: HttpClient) {}

  loadPosts() {
    return this.http
      .get<BlogPost[]>(this.apiUrl) 
      .pipe(
        tap((posts) => this.postsSignal.set(posts))  // tap = side effect: update signal met data van backend
      );
  }

  getPostById(id: string) {
    return this.posts().find((p) => p._id === id);  // posts() = roep signal aan als functie
  }

  // Maakt nieuwe post aan (POST request naar backend)
  createPost(
  title: string,
  content: string,
  token: string,
  focus?: string,
  goal?: string,
  status?: string,
  skills?: string[]
) {
  return this.http
    .post<BlogPost>(
      this.apiUrl,
      {
        title,
        content,
        focus,
        goal,
        status,
        skills
      },
      { headers: this.authHeaders(token) }
    )
    .pipe(
      tap((newPost) =>
        this.postsSignal.update((posts) => [newPost, ...posts])
      )
    );
}

  // Verwijdert post (DELETE request naar backend)
  deletePost(id: string, token: string) {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, { headers: this.authHeaders(token) })
      .pipe(
        tap(() => 
          this.postsSignal.update((posts) => posts.filter((p) => p._id !== id))  // Filter de verwijderde post uit array
        )
      );
  }

  // Past bestaande post aan (PUT request naar backend)
  updatePost(
    id: string,
    data: {
      title: string;
      content: string;
      focus?: string;
      goal?: string;
      status?: string;
      skills?: string[];
    },
    token: string
  ) {
    return this.http
      .put<BlogPost>(`${this.apiUrl}/${id}`, data, { headers: this.authHeaders(token) })
      .pipe(
        tap((updated) =>
          this.postsSignal.update((posts) =>
            posts.map((p) => (p._id === updated._id ? updated : p))
          )
        )
      );
  }

  // Helper functie voor authentication headers (JWT token)
  private authHeaders(token: string) {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
