import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-over-mij',
  imports: [CommonModule, RouterLink],
  templateUrl: './over-mij.component.html',
  styleUrl: './over-mij.component.scss'
})
export class OverMijComponent {}
