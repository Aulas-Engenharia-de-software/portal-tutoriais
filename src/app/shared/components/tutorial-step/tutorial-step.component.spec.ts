import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialStepComponent } from './tutorial-step.component';

describe('TutorialStepComponent', () => {
  let component: TutorialStepComponent;
  let fixture: ComponentFixture<TutorialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
