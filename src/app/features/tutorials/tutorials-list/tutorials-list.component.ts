import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CONTENT_INDEX } from '../../../core/content/generated-content-index';
import { ContentEntry, ContentType } from '../../../core/content/content.models';
import { ComingSoonComponent } from '../../../shared/components/coming-soon/coming-soon.component';

@Component({
  selector: 'app-tutorials-list',
  imports: [FormsModule, RouterLink, ComingSoonComponent],
  templateUrl: './tutorials-list.component.html',
  styleUrl: './tutorials-list.component.css',
})
export class TutorialsListComponent {
  readonly entries = CONTENT_INDEX.filter((entry) => entry.type !== 'material');

  searchQuery = '';
  selectedDiscipline = 'Todas';
  selectedType: 'Todos' | ContentType = 'Todos';

  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedDiscipline = params.get('disciplina') || 'Todas';
      const type = params.get('tipo');
      this.selectedType = type === 'tutorial' || type === 'atividade' ? type : 'Todos';
    });
  }

  get pageTitle(): string {
    if (this.selectedType === 'atividade') return 'Atividades';
    if (this.selectedType === 'tutorial') return 'Tutoriais';
    return 'Conteúdos';
  }

  get contextLabel(): string {
    return this.selectedDiscipline === 'Todas' ? 'Todas as disciplinas' : this.selectedDiscipline;
  }

  get filteredEntries(): readonly ContentEntry[] {
    const query = this.normalize(this.searchQuery.trim());
    return this.entries.filter((entry) => {
      const haystack = this.normalize(
        [entry.title, entry.description, entry.discipline, entry.module, entry.category, ...entry.tags].join(' '),
      );
      return (
        (!query || haystack.includes(query)) &&
        (this.selectedDiscipline === 'Todas' || entry.discipline === this.selectedDiscipline) &&
        (this.selectedType === 'Todos' || entry.type === this.selectedType)
      );
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedDiscipline = 'Todas';
    this.selectedType = 'Todos';
  }

  private normalize(value: string): string {
    return value
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
