import { Routes } from '@angular/router';

export const MATERIALS_ROUTES: Routes = [
  {
    path: '',
    title: 'Materiais | Portal de Aulas',
    loadComponent: () =>
      import('./materials.component').then((component) => component.MaterialsComponent),
  },
  { path: 'aws-eda', redirectTo: '/tutoriais/criando-iam', pathMatch: 'full' },
  { path: 'consumer-sqs', redirectTo: '/tutoriais/consumer-sqs' },
  { path: 'env-vars', redirectTo: '/tutoriais/consumer-sqs', pathMatch: 'full' },
  { path: 'dlq', redirectTo: '/tutoriais/dlq' },
  {
    path: ':slug',
    loadComponent: () =>
      import('../tutorials/tutorial-reader/tutorial-reader.component').then(
        (component) => component.TutorialReaderComponent,
      ),
  },
];
