import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CONTENT_INDEX } from '../../../core/content/generated-content-index';
import {
  CONTENT_TYPE_LABELS,
  ContentEntry,
  ContentType,
} from '../../../core/content/content.models';

@Component({
  selector: 'app-tutorials-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './tutorials-list.component.html',
  styleUrl: './tutorials-list.component.css',
})
export class TutorialsListComponent {
  readonly entries = CONTENT_INDEX.filter((entry) => entry.type !== 'material');
  readonly typeLabels = CONTENT_TYPE_LABELS;
  readonly courses = ['Todos os cursos', ...new Set(this.entries.map((entry) => entry.course))];
  readonly disciplines = ['Todas', ...new Set(this.entries.map((entry) => entry.discipline))];
  readonly modules = ['Todos os módulos', ...new Set(this.entries.map((entry) => entry.module))];
  readonly types: Array<'Todos' | ContentType> = ['Todos', 'tutorial', 'atividade'];

  searchQuery = '';
  selectedCourse = 'Todos os cursos';
  selectedDiscipline = 'Todas';
  selectedModule = 'Todos os módulos';
  selectedType: 'Todos' | ContentType = 'Todos';

  get filteredEntries(): readonly ContentEntry[] {
    const query = this.normalize(this.searchQuery.trim());
    return this.entries.filter((entry) => {
      const haystack = this.normalize(
        [entry.title, entry.description, entry.course, entry.discipline, entry.module, entry.category, ...entry.tags].join(' '),
      );
      return (
        (!query || haystack.includes(query)) &&
        (this.selectedCourse === 'Todos os cursos' || entry.course === this.selectedCourse) &&
        (this.selectedDiscipline === 'Todas' || entry.discipline === this.selectedDiscipline) &&
        (this.selectedModule === 'Todos os módulos' || entry.module === this.selectedModule) &&
        (this.selectedType === 'Todos' || entry.type === this.selectedType)
      );
    });
  }

  typeLabel(type: 'Todos' | ContentType): string {
    return type === 'Todos' ? 'Todos' : CONTENT_TYPE_LABELS[type];
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCourse = 'Todos os cursos';
    this.selectedDiscipline = 'Todas';
    this.selectedModule = 'Todos os módulos';
    this.selectedType = 'Todos';
  }

  private normalize(value: string): string {
    return value
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
