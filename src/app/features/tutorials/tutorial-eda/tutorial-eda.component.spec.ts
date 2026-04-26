import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialEdaComponent } from './tutorial-eda.component';

describe('TutorialEdaComponent', () => {
  let component: TutorialEdaComponent;
  let fixture: ComponentFixture<TutorialEdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialEdaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialEdaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
