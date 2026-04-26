import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {APP_ROUTES} from '../../core/constants/routes.constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  isTutorialsMenuOpen = false;

  nomeProfessor = 'Lucas Martins';
  disciplina = 'Arquitetura de Software';
  githubLink = 'https://github.com/lucasmartins007';
  githubLabel = 'github.com/lucasmartins007';

  tutoriaisList = [
    { title: 'Event-Driven Arch na AWS', route: APP_ROUTES.TUTORIALS.LINKS.EVENT_DRIVEN_ARCH },
    { title: 'Variáveis de Ambiente', route: APP_ROUTES.TUTORIALS.LINKS.ENV_VARS },
    { title: 'Consumer SQS', route: APP_ROUTES.TUTORIALS.LINKS.CONSUMER_SQS },
    { title: 'DLQ (Dead Letter Queue)', route: APP_ROUTES.TUTORIALS.LINKS.DLQ },
  ];

  toggleTutorialsMenu() {
    this.isTutorialsMenuOpen = !this.isTutorialsMenuOpen;
  }

}
