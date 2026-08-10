import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { provideRouter } from '@angular/router';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the academic hierarchy and toggle the course', () => {
    expect(component.highlightedEntries.length).toBeGreaterThan(0);
    expect(component.currentCourse).toBe('Engenharia de Software');
    component.toggleCourse();
    expect(component.isCourseOpen).toBe(false);
  });

  it('should group tutorials, presentations and references in collapsible menus', () => {
    expect(component.tutorialEntries).toHaveLength(4);
    expect(component.slideEntries).toHaveLength(6);
    expect(component.referenceEntries).toHaveLength(2);

    expect(component.isOpen('materials')).toBe(false);
    component.toggleSection('materials');
    expect(component.isOpen('materials')).toBe(true);
  });
});
