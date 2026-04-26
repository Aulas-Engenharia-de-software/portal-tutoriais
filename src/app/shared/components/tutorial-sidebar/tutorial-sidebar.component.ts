import { Component, Input, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialPhase } from '../../models/tutorial-phase.model'; // Ajuste o caminho

@Component({
  selector: 'app-tutorial-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-sidebar.component.html',
  styleUrl: './tutorial-sidebar.component.css'
})
export class TutorialSidebarComponent implements AfterViewInit, OnDestroy {
  // Recebe a lista de fases do componente pai
  @Input() phases: TutorialPhase[] = [];
  // Recebe o título customizado (opcional, com valor padrão)
  @Input() title: string = 'Neste Tutorial';

  activePhase: string = '';
  private observer: IntersectionObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Pequeno atraso para garantir que o DOM do pai já foi renderizado
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 100);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  private setupIntersectionObserver() {
    if (this.phases.length === 0) return;
    this.activePhase = this.phases[0].id;
    const options = {
      root: null,
      rootMargin: '-15% 0px -60% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      let hasChanges = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activePhase = entry.target.id;
          hasChanges = true;
        }
      });

      if (hasChanges) {
        this.cdr.detectChanges();
      }
    }, options);

    this.phases.forEach((phase) => {
      const element = document.getElementById(phase.id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  scrollTo(id: string) {
    this.activePhase = id;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
