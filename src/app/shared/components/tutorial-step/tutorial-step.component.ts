import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tutorial-step',
  standalone: true,
  imports: [],
  templateUrl: './tutorial-step.component.html',
  styleUrl: './tutorial-step.component.css',
})
export class TutorialStepComponent {

  @Input()
  currentStep!: string;


}
