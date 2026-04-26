import {Routes} from '@angular/router';

export const TUTORIAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Tutoriais | LabPortal',
    loadComponent: () => import('./tutorials-list/tutorials-list.component').then(c => c.TutorialsListComponent)
  },
  {
    path: 'aws-sqs',
    title: 'AWS SQS | TutorialModel',
    loadComponent: () => import('./tutorial-eda/tutorial-eda.component').then(c => c.TutorialEdaComponent)
  },
  {
    path: 'env-vars',
    title: 'Variáveis de Ambiente | TutorialModel',
    loadComponent: () => import('./tutorial-env-vars/tutorial-env-vars.component').then(c => c.TutorialEnvVarsComponent)
  }
];
