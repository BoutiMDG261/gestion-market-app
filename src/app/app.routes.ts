import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthGuard } from '@app/core/auth/guards/auth.guard';
import { NoAuthGuard } from '@app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from '@app/layout/layout.component';
import { ProductManagamentComponent } from '@app/modules/admin/apps/product-managament/product-management.component';


export const routes: Routes = [
  // Auth routes for guest
  {
    path: '',
    title: 'EPi | Login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('@app/modules/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
  {
    path: 'app',
    component: LayoutComponent,
    title: 'EPi | Gestion epi',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@app/modules/admin/apps/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'user',
        loadComponent: () => import('@app/modules/admin/apps/user-management/user-management.component')
          .then(m => m.UserManagementComponent)
      },
      {
        path: 'product',
        component: ProductManagamentComponent,
        children: [{
          path: 'list',
          loadComponent: () => import('@app/modules/admin/apps/product-managament/pages/list/list.component')
            .then(m => m.ListComponent)
        },
        {
          path: 'create',
          loadComponent: () => import('@app/modules/admin/apps/product-managament/pages/create/create.component')
            .then(m => m.CreateComponent)
        }]
      },
      {
        path: 'history',
        loadComponent: () => import('@app/modules/admin/apps/history/history.component')
          .then(m => m.HistoryComponent)
      }
    ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

export const appRoutingProviders = [
  provideRouter(routes)
];
