import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTENT_INDEX } from '../../core/content/generated-content-index';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css',
})
export class DashboardsComponent {
  readonly learningContent = CONTENT_INDEX.filter((entry) => entry.type !== 'material');
  readonly featured = this.learningContent.filter((entry) => entry.featured).slice(0, 3);
  readonly current = this.learningContent[0];
  readonly materialsCount = CONTENT_INDEX.filter((entry) => entry.type === 'material').length;
  readonly coursesCount = new Set(CONTENT_INDEX.map((entry) => entry.course)).size;
  readonly modulesCount = new Set(CONTENT_INDEX.map((entry) => `${entry.discipline}/${entry.module}`)).size;

  readonly disciplines = [
    {
      title: 'Arquitetura de Software',
      course: 'Engenharia de Software',
      description: 'Decisões arquiteturais, integração, mensageria e sistemas distribuídos.',
      icon: 'fas fa-cubes',
      status: 'Conteúdo disponível',
      active: true,
    },
    {
      title: 'Projetos com LLMs',
      course: 'Inteligência Artificial Aplicada',
      description: 'Aplicações com modelos de linguagem, RAG, agentes e avaliação.',
      icon: 'fas fa-robot',
      status: 'Em desenvolvimento',
      active: false,
    },
    {
      title: 'Mineração de Dados',
      course: 'Dados e Inteligência',
      description: 'Preparação, exploração e descoberta de padrões em dados.',
      icon: 'fas fa-chart-column',
      status: 'Em desenvolvimento',
      active: false,
    },
  ];
}
