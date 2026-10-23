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

  it('should keep materials and activities without a separate tutorials tab', () => {
    expect(fixture.nativeElement.querySelectorAll('.discipline-item')).toHaveLength(3);
    expect(
      fixture.nativeElement.querySelectorAll('.discipline-links a:not(.sequence-link)'),
    ).toHaveLength(6);
    expect(fixture.nativeElement.textContent).not.toContain('Tutoriais');
    const materialLinks = fixture.nativeElement.querySelectorAll(
      '.discipline-links .materials-link',
    );
    expect(materialLinks).toHaveLength(3);
    expect(
      [...materialLinks].every((link: Element) =>
        link.getAttribute('href')?.startsWith('/materiais'),
      ),
    ).toBe(true);
  });

  it('links to sequences supplied by the content metadata', () => {
    const link = fixture.nativeElement.querySelector('.sequence-link');
    expect(link.textContent).toContain('Trabalho Prático — Arquitetura Orientada a Eventos');
    expect(link.getAttribute('href')).toContain('sequencia=trabalho-pratico-eda');
  });
});
