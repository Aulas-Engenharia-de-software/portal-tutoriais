export interface DisciplineNavigation {
  readonly id: 'arquitetura-software' | 'mineracao-dados' | 'llm-projects';
  readonly title: string;
  readonly icon: string;
}

export const DISCIPLINE_NAVIGATION: readonly DisciplineNavigation[] = [
  { id: 'arquitetura-software', title: 'Arquitetura de Software', icon: 'fas fa-cubes' },
  { id: 'mineracao-dados', title: 'Mineração de Dados', icon: 'fas fa-chart-column' },
  { id: 'llm-projects', title: 'LLM Projects', icon: 'fas fa-robot' },
];
