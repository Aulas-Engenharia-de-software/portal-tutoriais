import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorBadgeComponent } from './professor-badge.component';

describe('ProfessorBadgeComponent', () => {
  let component: ProfessorBadgeComponent;
  let fixture: ComponentFixture<ProfessorBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessorBadgeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
