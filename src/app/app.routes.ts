import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'order-history',
    loadComponent: () => import('./order-history/order-history.component'),
  },
  {
    path: '',
    redirectTo: 'order-history',
    pathMatch: 'full',
  },
];
