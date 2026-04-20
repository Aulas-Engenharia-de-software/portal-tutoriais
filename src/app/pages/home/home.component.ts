import { Component } from '@angular/core';

import { RouterModule } from '@angular/router'; // Adicione esta linha

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // Certifique-se de que está aqui
  templateUrl: './home.component.html'
})
export class HomeComponent { }
