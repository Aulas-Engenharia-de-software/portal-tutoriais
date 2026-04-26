import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseHeaderComponent } from './phase-header.component';

describe('PhaseHeaderComponent', () => {
  let component: PhaseHeaderComponent;
  let fixture: ComponentFixture<PhaseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhaseHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
