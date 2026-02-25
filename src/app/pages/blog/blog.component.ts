import { Component, computed, signal } from '@angular/core';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [
    CommonModule,
    BlogCardComponent,
    ReactiveFormsModule,
    MultiSelectModule
  ]
})
export class BlogComponent {
  posts;
  selectedTagsControl = new FormControl<string[]>([], { nonNullable: true });
  selectedTags = toSignal(
    this.selectedTagsControl.valueChanges.pipe(
      startWith(this.selectedTagsControl.value)
    ),
    { initialValue: [] }
  );
  tags = computed(() => {
    const all = new Set<string>();
    for (const post of this.posts()) {
      (post.skills ?? []).forEach((skill) => all.add(skill));
      (post.tags ?? []).forEach((tag) => all.add(tag));
    }
    return Array.from(all).sort((a, b) => a.localeCompare(b));
  });
  tagOptions = computed(() =>
    this.tags().map((tag) => ({ label: tag, value: tag }))
  );
  filteredPosts = computed(() => {
    const selected = this.selectedTags();
    const allPosts = this.posts();
    if (!selected.length) return allPosts;
    return allPosts.filter((post) => {
      const skills = post.skills ?? [];
      const tags = post.tags ?? [];
      return selected.some((tag) => skills.includes(tag) || tags.includes(tag));
    });
  });

  constructor(private blogService: BlogService) {
    this.posts = this.blogService.posts;
    this.blogService.loadPosts().subscribe();
  }
}
