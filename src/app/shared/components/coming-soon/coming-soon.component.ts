import { Component, Input, OnChanges, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { COMING_SOON_MESSAGES } from './coming-soon.messages';

@Component({
  selector: 'app-coming-soon',
  imports: [RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css',
})
export class ComingSoonComponent implements OnInit, OnChanges {
  @Input() title = 'Opa! Essa página ainda não chegou';
  @Input() embedded = false;
  @Input() actionLink: string | null = '/dashboard';
  @Input() actionLabel = 'Voltar para o início';
  readonly actionRequested = output<void>();

  readonly message = signal('');

  constructor(router: Router) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.shuffleMessage());
  }

  ngOnInit(): void {
    if (!this.message()) this.shuffleMessage();
  }

  ngOnChanges(): void {
    this.shuffleMessage();
  }

  shuffleMessage(): void {
    const candidates = COMING_SOON_MESSAGES.filter((message) => message !== this.message());
    this.message.set(candidates[Math.floor(Math.random() * candidates.length)]);
  }
}
