import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading and two tutorial cards', () => {
    const el: HTMLElement = fixture.nativeElement as HTMLElement;
    const heading = el.querySelector('h2')?.textContent || '';
    expect(heading).toContain('Portal do Aluno');

    // Deve haver dois elementos com a diretiva RouterLink
    const debugEls = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(debugEls.length).toBe(2);

    // Títulos dos cartões
    const titles = Array.from(el.querySelectorAll('h3')).map(h => h.textContent?.trim());
    expect(titles).toContain('Mensageria e EDA na AWS');
    expect(titles).toContain('Configurando um Consumidor SQS');
  });
});
