import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ssrm',
  },
  {
    path: 'csrm',
    loadComponent: () => import('./csrm/csrm').then((c) => c.Csrm),
  },
  {
    path: 'ssrm',
    loadComponent: () => import('./ssrm/ssrm').then((c) => c.Ssrm),
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
