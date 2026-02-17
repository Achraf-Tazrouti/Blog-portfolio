import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,  // Moderne Angular - geen NgModule nodig
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports:[BlogCardComponent, RouterLink] 
})
export class HomeComponent {
  // Constructor = wordt uitgevoerd bij creatie van component
  constructor(private blogService: BlogService) {
    // BlogService wordt geïnjecteerd (Dependency Injection)
    
    // loadPosts() returned een Observable (van RxJS)
    // .subscribe() = start de HTTP request ECHT (zonder subscribe gebeurt er NIETS!)
    this.blogService.loadPosts().subscribe();
    // Flow: HTTP GET → backend stuurt data → tap() update signal → posts() heeft nu data
  }

  // posts is GEEN variabele, maar een FUNCTIE (getter):
  get posts() {
    // Elke keer als je posts() aanroept, gebeurt dit:
    return this.blogService.posts;  // En ik geef dat terug
  }

  get latestPost() {
    return this.posts()[0] ?? null;
  }

  excerpt(content: string, max = 140) {
    const clean = content.replace(/\s+/g, ' ').trim();
    return clean.length > max ? `${clean.slice(0, max)}…` : clean;
  }

  formatDate(date?: string) {
    if (!date) return 'Onbekende datum';
    return new Date(date).toLocaleDateString('nl-BE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
