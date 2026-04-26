import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialEnvVarsComponent } from './tutorial-env-vars.component';

describe('TutorialEnvVarsComponent', () => {
  let component: TutorialEnvVarsComponent;
  let fixture: ComponentFixture<TutorialEnvVarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialEnvVarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialEnvVarsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
