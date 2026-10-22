import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { provideRouter } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle and close the mobile menu', () => {
    component.toggleMenu();
    expect(component.isMobileMenuOpen).toBe(true);
    component.closeMenu();
    expect(component.isMobileMenuOpen).toBe(false);
  });
});
