import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-phase-header',
  imports: [],
  templateUrl: './phase-header.component.html',
  styleUrl: './phase-header.component.css',
})
export class PhaseHeaderComponent {

  @Input()
  phaseTitle!: string;

  @Input()
  phaseDescription!: string;

}
