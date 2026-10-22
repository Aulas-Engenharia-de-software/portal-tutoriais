import { Routes } from '@angular/router';
import { APP_ROUTES } from './core/constants/routes.constants';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' },
      {
        path: APP_ROUTES.DASHBOARD,
        title: 'Início | Portal de Aulas',
        loadComponent: () =>
          import('./features/dashboards/dashboards.component').then((c) => c.DashboardsComponent),
      },
      {
        path: APP_ROUTES.TUTORIALS.BASE,
        loadChildren: () =>
          import('./features/tutorials/tutorials.routes').then((r) => r.TUTORIAL_ROUTES),
      },
      { path: APP_ROUTES.LIBRARY, redirectTo: APP_ROUTES.TUTORIALS.BASE, pathMatch: 'full' },
      {
        path: APP_ROUTES.MATERIALS,
        loadChildren: () =>
          import('./features/materials/materials.routes').then((routes) => routes.MATERIALS_ROUTES),
      },
      {
        path: APP_ROUTES.ERROR,
        title: 'Página em preparação | Portal de Aulas',
        loadComponent: () =>
          import('./shared/components/coming-soon/coming-soon.component').then(
            (component) => component.ComingSoonComponent,
          ),
      },
    ],
  },
];
