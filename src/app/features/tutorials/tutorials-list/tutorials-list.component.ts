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
      title: 'Event-Driven Arch na AWS',
      description: 'Aprenda a garantir a ordem das mensagens na AWS.',
      category: 'AWS',
      readingTime: '10 min',
      icon: 'fab fa-aws',
      route: '/tutoriais/aws-eda'
    },
    {
      id: '2',
      title: 'Consumer SQS',
      description: 'Crie um consumidor eficiente para suas filas SQS.',
      category: 'Java',
      readingTime: '10 min',
      icon: 'fas fa-project-diagram',
      route: '/tutoriais/consumer-sqs'
    },
    {
      id: '3',
      title: 'Variáveis de Ambiente',
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
