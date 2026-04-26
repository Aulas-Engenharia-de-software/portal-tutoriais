import { Routes } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/routes.constants';

export const TUTORIAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Tutoriais | LabPortal',
    loadComponent: () => import('./tutorials-list/tutorials-list.component').then(c => c.TutorialsListComponent)
  },
  {
    path: APP_ROUTES.TUTORIALS.PATHS.EVENT_DRIVEN_ARCH,
    title: 'Tutorial | Integração AWS',
    loadComponent: () => import('./tutorial-eda/tutorial-eda.component').then(c => c.TutorialEdaComponent)
  },
  {
    path: APP_ROUTES.TUTORIALS.PATHS.ENV_VARS,
    title: 'Tutorial | Variáveis de Ambiente',
    loadComponent: () => import('./tutorial-env-vars/tutorial-env-vars.component').then(c => c.TutorialEnvVarsComponent)
  },
  {
    path: APP_ROUTES.TUTORIALS.PATHS.CONSUMER_SQS,
    title: 'Tutorial | Consumer SQS',
    loadComponent: () => import('./tutorial-consumer-sqs/tutorial-consumer-sqs.component').then(c => c.TutorialConsumerSqsComponent)
  },
  {
    path: APP_ROUTES.TUTORIALS.PATHS.DLQ,
    title: 'Tutorial | Dead Letter Queue',
    loadComponent: () => import('./tutorial-dlq/tutorial-dlq.component').then(c => c.TutorialDlqComponent)
  }
];
