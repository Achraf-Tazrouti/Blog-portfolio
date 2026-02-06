import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = signal('Welkom op mijn stage blog');
}