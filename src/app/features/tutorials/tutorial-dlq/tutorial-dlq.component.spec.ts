import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDlqComponent } from './tutorial-dlq.component';

describe('TutorialDlqComponent', () => {
  let component: TutorialDlqComponent;
  let fixture: ComponentFixture<TutorialDlqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialDlqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialDlqComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
