import { Component } from '@angular/core';

@Component({
  selector: 'app-professor-badge',
  imports: [],
  templateUrl: './professor-badge.component.html',
  styleUrl: './professor-badge.component.css',
})
export class ProfessorBadgeComponent {

  nomeProfessor = 'Lucas Martins';

  githubLink = 'https://github.com/lucasmartins007';
  instagramLink = 'https://www.instagram.com/lucas__martinso';
  linkedinLink = 'https://www.linkedin.com/in/lucas-m-1816b5207/?locale=en-US'

}
