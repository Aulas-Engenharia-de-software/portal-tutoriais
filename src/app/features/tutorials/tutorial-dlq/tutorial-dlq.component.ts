import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TutorialSidebarComponent} from '../../../shared/components/tutorial-sidebar/tutorial-sidebar.component';
import {TutorialStepComponent} from '../../../shared/components/tutorial-step/tutorial-step.component';
import {ZoomableImageComponent} from '../../../shared/components/zoomable-image/zoomable-image.component';
import {CodeSnippetComponent} from '../../../shared/components/code-snippet/code-snippet.component';
import {DlqImages} from './images/dlq-images';
import {PhaseHeaderComponent} from '../../../shared/components/phase-header/phase-header.component';

@Component({
  selector: 'app-tutorial-dlq',
  standalone: true,
  imports: [
    CommonModule,
    TutorialSidebarComponent,
    TutorialStepComponent,
    ZoomableImageComponent,
    CodeSnippetComponent,
    PhaseHeaderComponent
  ],
  templateUrl: './tutorial-dlq.component.html',
  styleUrls: ['./tutorial-dlq.component.css']
})
export class TutorialDlqComponent {


  phases = [
    {id: 'intro', label: 'Introdução à DLQ'},
    {id: 'fase1', label: 'Fase 1: Criando a DLQ'},
    {id: 'fase2', label: 'Fase 2: Redrive Policy'},
    {id: 'fase3', label: 'Fase 3: DLQ Redrive (Retorno)'}
  ];

  constructor(public dlqImages: DlqImages) {
  }
}
