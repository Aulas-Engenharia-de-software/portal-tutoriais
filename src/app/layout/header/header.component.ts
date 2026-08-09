import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() readonly menuToggle = new EventEmitter<void>();

  readonly currentYear = new Date().getFullYear();
  readonly currentSemester = new Date().getMonth() <= 6 ? 1 : 2;
}
