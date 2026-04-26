import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Tutorial} from './model/tutorial.model';

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tutorials-list.component.html'
})
export class TutorialsListComponent {

  searchQuery: string = '';

  categoriaSelecionada: string = 'Todos';

  categorias = ['Todos', 'AWS', 'Java', 'Arquitetura'];

  tutoriais: Tutorial[] = [
    {
      id: '1',
      title: 'Configuração de SQS FIFO',
      description: 'Aprenda a garantir a ordem das mensagens na AWS.',
      category: 'AWS',
      readingTime: '10 min',
      icon: 'fab fa-aws',
      route: '/tutoriais/aws-sqs'
    },
    {
      id: '2',
      title: 'Arquitetura Hexagonal',
      description: 'Desacoplando o domínio da infraestrutura com Ports e Adapters.',
      category: 'Arquitetura',
      readingTime: '15 min',
      icon: 'fas fa-project-diagram',
      route: '/tutoriais/hexagonal'
    },
    {
      id: '3',
      title: 'Variáveis de Ambiente no Spring',
      description: 'Protegendo suas credenciais de forma profissional.',
      category: 'Java',
      readingTime: '5 min',
      icon: 'fas fa-key',
      route: '/tutoriais/env-vars'
    },
  ];

  get tutoriaisFiltrados() {
    return this.tutoriais.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCat = this.categoriaSelecionada === 'Todos' || t.category === this.categoriaSelecionada;
      return matchesSearch && matchesCat;
    });
  }
}
