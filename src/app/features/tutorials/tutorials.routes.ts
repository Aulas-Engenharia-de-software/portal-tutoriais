import { Routes } from '@angular/router';

export const TUTORIAL_ROUTES: Routes = [
  { path: 'aws-eda', redirectTo: 'criando-iam', pathMatch: 'full' },
  { path: 'env-vars', redirectTo: 'consumer-sqs', pathMatch: 'full' },
  {
    path: '',
    title: 'Biblioteca | Portal de Aulas',
    loadComponent: () =>
      import('./tutorials-list/tutorials-list.component').then((c) => c.TutorialsListComponent),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./tutorial-reader/tutorial-reader.component').then((c) => c.TutorialReaderComponent),
  },
];
