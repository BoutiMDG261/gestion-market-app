import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./modules/auth/sign-in/sign-in.component').then(m => m.SignInComponent)
}];
