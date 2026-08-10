import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should expose the three requested disciplines', () => {
    expect(component.disciplines.map((item) => item.title)).toEqual([
      'Arquitetura de Software',
      'Mineração de Dados',
      'LLM Projects',
    ]);
  });

  it('should toggle each discipline independently', () => {
    expect(component.isOpen('arquitetura-software')).toBe(true);
    expect(component.isOpen('mineracao-dados')).toBe(false);

    component.toggleDiscipline('mineracao-dados');
    expect(component.isOpen('mineracao-dados')).toBe(true);
    expect(component.isOpen('arquitetura-software')).toBe(true);
  });

  it('should provide tutorials, materials and activities for every discipline', () => {
    expect(fixture.nativeElement.querySelectorAll('.discipline-item')).toHaveLength(3);
    expect(fixture.nativeElement.querySelectorAll('.discipline-links a')).toHaveLength(9);
  });
});
