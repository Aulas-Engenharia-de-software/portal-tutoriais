import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTENT_INDEX } from '../../core/content/generated-content-index';
import { ProfessorBadgeComponent } from '../../shared/components/professor-badge/professor-badge.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ProfessorBadgeComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Output() readonly navigation = new EventEmitter<void>();

  isCourseOpen = true;
  readonly highlightedEntries = CONTENT_INDEX.filter((entry) => entry.type !== 'material').slice(0, 4);
  readonly currentCourse = this.highlightedEntries[0]?.course ?? 'Engenharia de Software';
  readonly currentDiscipline = this.highlightedEntries[0]?.discipline ?? 'Arquitetura de Software';
  readonly currentModule = this.highlightedEntries[0]?.module ?? 'Arquitetura Orientada a Eventos';

  toggleCourse(): void {
    this.isCourseOpen = !this.isCourseOpen;
  }
}
