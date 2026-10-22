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

  readonly disciplines = [
    {
      title: 'Arquitetura de Software',
      description: 'Decisões arquiteturais, integração, mensageria e sistemas distribuídos.',
      icon: 'fas fa-cubes',
      active: true,
    },
    {
      title: 'Mineração de Dados',
      description: 'Preparação, exploração e descoberta de padrões em dados.',
      icon: 'fas fa-chart-column',
      active: false,
    },
    {
      title: 'LLM Projects',
      description: 'Aplicações com modelos de linguagem, RAG, agentes e avaliação.',
      icon: 'fas fa-robot',
      active: false,
    },
  ];
}
