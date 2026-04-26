import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ComingSoonComponent } from './shared/components/coming-soon/coming-soon.component';
import { APP_ROUTES } from './core/constants/routes.constants';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: APP_ROUTES.DASHBOARD,
        pathMatch: 'full'
      },
      {
        path: APP_ROUTES.DASHBOARD,
        title: 'Dashboard | LabPortal',
        loadComponent: () => import('./features/dashboards/dashboards.component').then(c => c.DashboardsComponent)
      },
      {
        path: APP_ROUTES.TUTORIALS.BASE,
        loadChildren: () => import('./features/tutorials/tutorials.routes').then(r => r.TUTORIAL_ROUTES)
      },
      {
        path: APP_ROUTES.ERROR_COMING_SOON,
        component: ComingSoonComponent
      }
    ]
  }
];
