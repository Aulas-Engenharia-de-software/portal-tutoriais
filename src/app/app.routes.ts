import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TutorialAwsComponent} from './pages/tutorial-aws/tutorial-aws.component';
import {TutorialConsumerSqsComponent} from './pages/tutorial-consumer-sqs/tutorial-consumer-sqs.component';
import {TutorialEnvVarsComponent} from './pages/tutorial-env-vars/tutorial-env-vars.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tutorial-aws', component: TutorialAwsComponent },
  { path: 'tutorial-consumer-sqs', component: TutorialConsumerSqsComponent },
  { path: 'tutorial-env-vars', component: TutorialEnvVarsComponent }
];
