import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialsListComponent } from './tutorials-list.component';
import { provideRouter } from '@angular/router';

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialsListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter content ignoring accents and reset filters', () => {
    component.searchQuery = 'variaveis';
    expect(component.filteredEntries.map((entry) => entry.slug)).toContain('consumer-sqs');

    component.selectedType = 'atividade';
    expect(component.filteredEntries).toHaveLength(0);

    component.clearFilters();
    expect(component.filteredEntries.length).toBe(component.entries.length);
  });

  it('shows the five EDA steps together and keeps DLQ outside the required sequence', () => {
    const section = component.sections.find((item) => item.id === 'trabalho-pratico-eda');
    expect(section?.title).toBe('Trabalho Prático — Arquitetura Orientada a Eventos');
    expect(section?.entries.map((entry) => entry.slug)).toEqual([
      'criando-iam',
      'criando-sns',
      'criando-sqs',
      'assinando-sqs-sns',
      'consumer-sqs',
    ]);
    expect(fixture.nativeElement.querySelectorAll('#trabalho-pratico-eda-title')).toHaveLength(1);
    expect(
      component.sections.find((item) => !item.ordered)?.entries.map((entry) => entry.slug),
    ).toContain('dlq');
  });

  it('combines sequence, search and discipline filters without renumbering matching steps', () => {
    component.selectedSequence = 'trabalho-pratico-eda';
    expect(component.filteredEntries).toHaveLength(5);
    component.searchQuery = 'variaveis';
    expect(component.sections[0].entries.map((entry) => entry.step)).toEqual([5]);
    component.selectedDiscipline = 'Mineração de Dados';
    expect(component.sections).toHaveLength(0);
    component.clearFilters();
    expect(component.filteredEntries.map((entry) => entry.slug)).toContain('dlq');
  });
});
