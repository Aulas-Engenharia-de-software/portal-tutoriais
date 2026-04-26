import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TutorialSidebarComponent} from '../../../shared/components/tutorial-sidebar/tutorial-sidebar.component';
import {ZoomableImageComponent} from '../../../shared/components/zoomable-image/zoomable-image.component';
import {CodeSnippetComponent} from '../../../shared/components/code-snippet/code-snippet.component';
import {TutorialStepComponent} from '../../../shared/components/tutorial-step/tutorial-step.component';
import {PhaseHeaderComponent} from '../../../shared/components/phase-header/phase-header.component';
import {IntellijImages} from './images/intellij-images';
import {VsCodeImages} from './images/vs-code-images.service';
import {TutorialPhase} from '../../../shared/models/tutorial-phase.model';

@Component({
  selector: 'app-tutorial-env-vars',
  standalone: true,
  imports: [CommonModule, TutorialSidebarComponent, ZoomableImageComponent, CodeSnippetComponent, TutorialStepComponent, PhaseHeaderComponent],
  templateUrl: './tutorial-env-vars.component.html',
  styleUrl: './tutorial-env-vars.component.css',
})
export class TutorialEnvVarsComponent {

  constructor(
    public intellijImages: IntellijImages,
    public vsCodeImages: VsCodeImages
  ) {
  }

  sideBarTitle = 'Variáveis de Ambiente'
  phases: TutorialPhase[] = [
    {
      id: 'intro',
      label: 'Introdução',
    },
    {
      id: 'application-properties',
      label: 'Application Properties',
    },
    {
      id: 'intellij',
      label: 'Intellij IDEA',
    },
    {
      id: 'VSCode',
      label: 'VSCode IDE',
    },
  ]

  awsKeys = 'AWS_ACCESS_KEY_ID=sua_access_key;AWS_SECRET_ACCESS_KEY=sua_secret_key'

  applicationPropertiesCode = `
# Credenciais AWS Dinâmicas
spring.cloud.aws.credentials.access-key=$\{AWS_ACCESS_KEY_ID}
spring.cloud.aws.credentials.secret-key=$\{AWS_SECRET_ACCESS_KEY}
spring.cloud.aws.region.static=us-east-1

# Filas
queue.order-events=T0XN_SEU_NOME_PEDIDOS.fifo`;

  vsCodeLaunchConfig = `
"configurations": [
  {
    "type": "java",
    "name": "ArquiteturaHexagonalApplication",
    "request": "launch",
    "mainClass": "com.fag.lucasmartins.arquitetura_software.ArquiteturaHexagonalApplication",
    "projectName": "t02n-arquitetura-software",
    "env": {
        "AWS_ACCESS_KEY_ID": "COLE_SUA_ACCESS_KEY_AQUI",
        "AWS_SECRET_ACCESS_KEY": "COLE_SUA_SECRET_KEY_AQUI"
    }
  }
]
  `
}
