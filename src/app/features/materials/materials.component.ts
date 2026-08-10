import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CONTENT_INDEX } from '../../core/content/generated-content-index';
import {
  ContentEntry,
  MaterialResourceType,
  RESOURCE_TYPE_LABELS,
} from '../../core/content/content.models';

interface ResourceTypeCard {
  type: MaterialResourceType;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-materials',
  imports: [FormsModule, RouterLink],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css',
})
export class MaterialsComponent {
  readonly resources = CONTENT_INDEX.filter((entry) => entry.type === 'material');
  readonly presentationResources = this.resources.filter((entry) => entry.resourceType === 'slides');
  readonly courses = ['Todos os cursos', ...new Set(this.resources.map((entry) => entry.course))];
  readonly disciplines = ['Todas as disciplinas', ...new Set(this.resources.map((entry) => entry.discipline))];
  readonly modules = ['Todos os módulos', ...new Set(this.resources.map((entry) => entry.module))];
  readonly resourceTypes: readonly ResourceTypeCard[] = [
    { type: 'slides', icon: 'fas fa-display', description: 'Apresentações utilizadas durante as aulas.' },
    { type: 'site', icon: 'fas fa-globe', description: 'Documentações e referências selecionadas.' },
    { type: 'pdf', icon: 'fas fa-file-pdf', description: 'Artigos, guias e leituras complementares.' },
    { type: 'livro', icon: 'fas fa-book', description: 'Bibliografia recomendada por disciplina.' },
    { type: 'repositorio', icon: 'fab fa-github', description: 'Código de apoio e projetos de exemplo.' },
  ];

  searchQuery = '';
  selectedCourse = 'Todos os cursos';
  selectedDiscipline = 'Todas as disciplinas';
  selectedModule = 'Todos os módulos';
  selectedResourceType: 'todos' | MaterialResourceType = 'todos';

  constructor(private readonly route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedDiscipline = params.get('disciplina') || 'Todas as disciplinas';
    });
  }

  get visiblePresentationResources(): readonly ContentEntry[] {
    return this.presentationResources.filter((entry) =>
      this.selectedDiscipline === 'Todas as disciplinas' || entry.discipline === this.selectedDiscipline,
    );
  }

  get contextLabel(): string {
    return this.selectedDiscipline === 'Todas as disciplinas' ? 'Todas as disciplinas' : this.selectedDiscipline;
  }

  get filteredResources(): readonly ContentEntry[] {
    const query = this.normalize(this.searchQuery);
    return this.resources.filter((entry) => {
      const searchable = this.normalize([
        entry.title,
        entry.description,
        entry.course,
        entry.discipline,
        entry.module,
        entry.provider ?? '',
        ...entry.tags,
      ].join(' '));
      return (!query || searchable.includes(query)) &&
        (this.selectedCourse === 'Todos os cursos' || entry.course === this.selectedCourse) &&
        (this.selectedDiscipline === 'Todas as disciplinas' || entry.discipline === this.selectedDiscipline) &&
        (this.selectedModule === 'Todos os módulos' || entry.module === this.selectedModule) &&
        (this.selectedResourceType === 'todos' || entry.resourceType === this.selectedResourceType);
    });
  }

  countByType(type: MaterialResourceType): number {
    return this.resources.filter((entry) => entry.resourceType === type).length;
  }

  resourceTypeLabel(type?: MaterialResourceType): string {
    return type ? RESOURCE_TYPE_LABELS[type] : 'Material';
  }

  resourceUrl(entry: ContentEntry): string {
    return `/materiais/${entry.slug}`;
  }

  selectType(type: MaterialResourceType): void {
    this.selectedResourceType = this.selectedResourceType === type ? 'todos' : type;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCourse = 'Todos os cursos';
    this.selectedDiscipline = 'Todas as disciplinas';
    this.selectedModule = 'Todos os módulos';
    this.selectedResourceType = 'todos';
  }

  private normalize(value: string): string {
    return value.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
