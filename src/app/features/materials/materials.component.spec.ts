import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsComponent } from './materials.component';

describe('MaterialsComponent', () => {
  let component: MaterialsComponent;
  let fixture: ComponentFixture<MaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MaterialsComponent] }).compileComponents();
    fixture = TestBed.createComponent(MaterialsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should expose the supported material formats', () => {
    expect(component.resourceTypes).toHaveLength(5);
    expect(component.resources.length).toBeGreaterThan(0);
  });

  it('should filter by resource type and clear filters', () => {
    component.selectType('repositorio');
    expect(component.filteredResources.every((entry) => entry.resourceType === 'repositorio')).toBe(true);

    component.searchQuery = 'nao-existe';
    expect(component.filteredResources).toHaveLength(0);

    component.clearFilters();
    expect(component.filteredResources.length).toBe(component.resources.length);
  });

  it('should expose the ordered presentation track and filter by module', () => {
    expect(component.presentationResources).toHaveLength(6);

    component.selectedModule = 'Microsserviços';
    expect(component.filteredResources.every((entry) => entry.module === 'Microsserviços')).toBe(true);
  });
});
