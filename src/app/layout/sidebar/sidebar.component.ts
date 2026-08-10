import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTENT_INDEX } from '../../core/content/generated-content-index';
import { ProfessorBadgeComponent } from '../../shared/components/professor-badge/professor-badge.component';

type MenuSection = 'course' | 'discipline' | 'tutorials' | 'materials' | 'slides' | 'references';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ProfessorBadgeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() readonly navigation = new EventEmitter<void>();

  readonly tutorialEntries = CONTENT_INDEX.filter((entry) => entry.type !== 'material');
  readonly materialEntries = CONTENT_INDEX.filter((entry) => entry.type === 'material');
  readonly slideEntries = this.materialEntries.filter((entry) => entry.resourceType === 'slides');
  readonly referenceEntries = this.materialEntries.filter((entry) => entry.resourceType !== 'slides');
  readonly highlightedEntries = this.tutorialEntries.slice(0, 4);
  readonly currentCourse = this.tutorialEntries[0]?.course ?? 'Engenharia de Software';
  readonly currentDiscipline = this.tutorialEntries[0]?.discipline ?? 'Arquitetura de Software';

  private readonly expandedSections = new Set<MenuSection>(['course', 'discipline', 'tutorials']);

  get isCourseOpen(): boolean {
    return this.isOpen('course');
  }

  isOpen(section: MenuSection): boolean {
    return this.expandedSections.has(section);
  }

  toggleSection(section: MenuSection): void {
    if (this.expandedSections.has(section)) this.expandedSections.delete(section);
    else this.expandedSections.add(section);
  }

  toggleCourse(): void {
    this.toggleSection('course');
  }
}
