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
    expect(component.filteredEntries.map((entry) => entry.slug)).toContain('env-vars');

    component.selectedType = 'atividade';
    expect(component.filteredEntries).toHaveLength(0);

    component.clearFilters();
    expect(component.filteredEntries.length).toBe(component.entries.length);
  });
});
