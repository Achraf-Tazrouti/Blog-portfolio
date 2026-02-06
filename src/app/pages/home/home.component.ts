import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {
  title = signal('Welkom op mijn stage blog');
}