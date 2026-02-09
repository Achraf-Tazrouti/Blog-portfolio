import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink:'/'
      },
      {
        label: 'Blog',
        routerLink: '/blog',
        icon: 'pi pi-envelope',
      },
      {
        label: 'Over mij',
      routerLink: '/about'
      }
    ];
  }
}
