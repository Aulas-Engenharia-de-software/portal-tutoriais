import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsComponent } from './dashboards.component';
import { provideRouter } from '@angular/router';

describe('DashboardsComponent', () => {
  let component: DashboardsComponent;
  let fixture: ComponentFixture<DashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose a direct link to the materials area from the title panel', () => {
    const materialsLink = fixture.nativeElement.querySelector('.portal-shortcut.materials');
    expect(materialsLink).toBeTruthy();
    expect(materialsLink.getAttribute('href')).toBe('/materiais');
  });
});
