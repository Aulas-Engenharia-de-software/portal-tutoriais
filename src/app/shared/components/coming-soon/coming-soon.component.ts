import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit, OnDestroy {

  desculpas = [
    "O professor esqueceu de fazer o 'git push' dessa feature 😬",
    "Aguardando a AWS provisionar os servidores (mentira, não codei ainda mesmo).",
    "O cachorro comeu o código fonte dessa página 🐶",
    "Acabou o café caraí, o dev ta indo comprar mais ☕",
    "Erro 418: Faltou café no sangue do dev ☕",
    "Estamos resolvendo um conflito tenso de merge no Git...",
    "O deploy falhou na sexta-feira à tarde. Só volto a mexer na segunda!",
    "Ainda estou lendo a documentação do Angular para terminar isso aqui 📖",
    "O estagiário dropou o banco de dados. Estamos recuperando o backup...",
    "Compilando... (Essa desculpa funciona pra tudo)"
  ];

  desculpaAtual = '';

  private routerSubscription!: Subscription;

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    this.sortearDesculpa();
    this.listenRouteChange();
  }

  listenRouteChange() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.sortearDesculpa();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  sortearDesculpa() {
    let novaDesculpa = this.desculpaAtual;
    while (novaDesculpa === this.desculpaAtual) {
      const indiceAleatorio = Math.floor(Math.random() * this.desculpas.length);
      novaDesculpa = this.desculpas[indiceAleatorio];
    }
    this.desculpaAtual = novaDesculpa;
  }
}
