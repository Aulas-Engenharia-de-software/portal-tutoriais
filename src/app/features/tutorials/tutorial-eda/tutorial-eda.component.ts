import {Component} from "@angular/core";
import {CommonModule} from '@angular/common'; // Necessário para *ngIf
import {IamImages} from './images/iam-images';
import {SqsImages} from './images/sqs-images';
import {AccessPolicyImages} from './images/access-policy-images';
import {SnsSigningImages} from './images/sns-signing-images';
import {SnsRawMessageImages} from './images/sns-raw-message-images';
import {TutorialSidebarComponent} from '../../../shared/components/tutorial-sidebar/tutorial-sidebar.component';
import {Phase} from './models/phases.model';
import {ZoomableImageComponent} from '../../../shared/components/zoomable-image/zoomable-image.component';
import {CodeSnippetComponent} from '../../../shared/components/code-snippet/code-snippet.component';
import {TutorialStepComponent} from '../../../shared/components/tutorial-step/tutorial-step.component';
import {PhaseHeaderComponent} from '../../../shared/components/phase-header/phase-header.component';

@Component({
  selector: 'app-tutorial-eda',
  standalone: true,
  imports: [CommonModule, TutorialSidebarComponent, ZoomableImageComponent, CodeSnippetComponent, TutorialStepComponent, PhaseHeaderComponent],
  templateUrl: './tutorial-eda.component.html',
  styleUrl: './tutorial-eda.component.css',
})
export class TutorialEdaComponent {

  constructor(
    public iamImages: IamImages,
    public sqsImages: SqsImages,
    public accessPolicyImages: AccessPolicyImages,
    public snsSigningImages: SnsSigningImages,
    public snsRawMessageImage: SnsRawMessageImages
  ) {
  }

  arnSnsProf = 'arn:aws:sns:us-east-1:630147069531:SNS-PEDIDO-EFETUADO.fifo'

  phases: Phase[] = [
    {
      id: 'intro',
      label: 'Introdução',
      description: ''
    },
    {
      id: 'fase1',
      label: 'Fase 1: IAM',
      description: 'Segurança em Primeiro Lugar (IAM)'
    },
    {
      id: 'fase2',
      label: 'Fase 2: SQS',
      description: 'Criando a fila SQS'
    },
    {
      id: 'fase3',
      label: 'Fase 3: Policy',
      description: 'Configurando a Access Policy da fila SQS'
    },
    {
      id: 'fase4',
      label: 'Fase 4: SNS',
      description: 'Criando o SNS do Professor'
    },
    {
      id: 'fase5',
      label: 'Fase 5: Raw Message',
      description: 'Habilitando recebimento de mensagem bruta'
    }
  ];
  json = `
{
  "Version": "2012-10-17",
  "Id": "AllowSNSPublish",
  "Statement": [
    {
      "Sid": "Allow-SNS-SendMessage",
      "Effect": "Allow",
      "Principal": {
        "Service": "sns.amazonaws.com"
      },
      "Action": "sqs:SendMessage",
      "Resource": "ARN_DA_SUA_FILA_SQS_QUE_VOCE_COPIOU",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "arn:aws:sns:us-east-1:630147069531:SNS-PEDIDO-EFETUADO.fifo"
        }
      }
    }
  ]
}`
}
