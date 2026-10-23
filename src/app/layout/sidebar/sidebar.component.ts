import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  DISCIPLINE_NAVIGATION,
  DisciplineNavigation,
} from '../../core/navigation/discipline-navigation';
import { ProfessorBadgeComponent } from '../../shared/components/professor-badge/professor-badge.component';
import { CONTENT_INDEX } from '../../core/content/generated-content-index';
import { getContentSequences } from '../../core/content/content-sequences';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ProfessorBadgeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() readonly navigation = new EventEmitter<void>();

  readonly disciplines = DISCIPLINE_NAVIGATION;
  readonly sequences = getContentSequences(CONTENT_INDEX);
  private readonly expandedDisciplines = new Set<DisciplineNavigation['id']>(['arquitetura-software']);

  isOpen(disciplineId: DisciplineNavigation['id']): boolean {
    return this.expandedDisciplines.has(disciplineId);
  }

  toggleDiscipline(disciplineId: DisciplineNavigation['id']): void {
    if (this.expandedDisciplines.has(disciplineId)) this.expandedDisciplines.delete(disciplineId);
    else this.expandedDisciplines.add(disciplineId);
  }
}
