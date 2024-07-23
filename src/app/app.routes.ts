import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then(
        (m) => m.HomeComponent,
      ),
      canActivate: [AuthGuard]
  },
];
