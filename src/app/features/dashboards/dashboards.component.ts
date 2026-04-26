import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Category} from './models/category.model';
import {Activity} from './models/activity.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importante para o [routerLink] e diretivas funcionarem
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'] // ou .scss dependendo do seu projeto
})
export class DashboardsComponent {

  weekActivity: Activity = {
    badge: 'Laboratório da Semana',
    title: 'Missão: Event-Driven Architecture',
    description: 'Sua missão desta semana é transformar a aplicação síncrona em assíncrona. Crie seu Consumer SQS e valide o processamento dos pedidos.',
    route: '/tutoriais/aws-sqs'
  };

  categories: Category[] = [
    {
      id: 1,
      title: 'Tutoriais',
      description: 'Manuais passo a passo',
      icon: 'fas fa-book-open',
      backgroundColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      route: '/tutoriais'
    },
    {
      id: 2,
      title: 'Laboratórios',
      description: 'Exercícios práticos',
      icon: 'fas fa-vial',
      backgroundColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      route: '/labs'
    },
    {
      id: 3,
      title: 'Materiais',
      description: 'Slides e repositórios',
      icon: 'fas fa-folder-open',
      backgroundColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      route: '/materiais'
    },
    {
      id: 4,
      title: 'FAQ',
      description: 'Dúvidas comuns',
      icon: 'fas fa-question-circle',
      backgroundColor: 'bg-slate-100',
      textColor: 'text-slate-600',
      route: '/faq'
    }
  ];


  recentCategories = [
    {
      titulo: 'Mensageria e EDA na AWS',
      descricao: 'TutorialModel completo para configuração orientada a eventos.',
      icone: 'fab fa-aws',
      corFundoIcone: 'bg-orange-50',
      corTextoIcone: 'text-orange-600',
      link: '/tutorial-aws'
    },
    {
      titulo: 'Configurando um Consumidor SQS',
      descricao: 'TutorialModel para configuração do seu consumidor SQS no Spring Boot.',
      icone: 'fas fa-stream',
      corFundoIcone: 'bg-orange-50',
      corTextoIcone: 'text-orange-600',
      link: '/tutorial-sqs-consumer'
    },
    {
      titulo: 'Variáveis de Ambiente',
      descricao: 'TutorialModel para configurar chaves na IDE e evitar subir credenciais no GitHub.',
      icone: 'fas fa-key',
      corFundoIcone: 'bg-red-50',
      corTextoIcone: 'text-red-600',
      link: '/tutorial-env-vars'
    }
  ];

}
