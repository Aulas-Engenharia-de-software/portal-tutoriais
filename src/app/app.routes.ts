import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        title: 'Dashboard | LabPortal',
        loadComponent: () => import('./features/dashboards/dashboards.component').then(c => c.DashboardsComponent)
      },
      {
        path: 'tutoriais',
        loadChildren: () => import('./features/tutorials/tutorials.routes').then(r => r.TUTORIAL_ROUTES)
      },
      /*{
        path: 'labs',
        loadChildren: () => import('./features/labs/labs.routes').then(r => r.LAB_ROUTES)
      }*/
    ]
  }
];
