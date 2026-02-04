import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './guards/authGuard';
import { MainAppLayout } from './layouts/MainAppLayout';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    component: MainAppLayout,
    children: [
      {
        path: 'clients',
        loadComponent: () => import('./pages/clients/clients').then((c) => c.Clients),
        canActivate: [authGuard],
      },
    ],
  },
];
