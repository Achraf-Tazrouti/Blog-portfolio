import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
  path: 'blog/:id',
  loadComponent: () =>
    import('./pages/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
  path: 'admin/login',
  loadComponent: () =>
    import('./pages/admin-login/admin-login.component')
      .then(m => m.AdminLoginComponent)
  },
  {
  path: 'admin',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/admin/admin.component')
      .then(m => m.AdminComponent)
}
];