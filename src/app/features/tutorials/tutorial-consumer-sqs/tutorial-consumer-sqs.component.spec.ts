import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialConsumerSqsComponent } from './tutorial-consumer-sqs.component';

describe('TutorialConsumerSqsComponent', () => {
  let component: TutorialConsumerSqsComponent;
  let fixture: ComponentFixture<TutorialConsumerSqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialConsumerSqsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialConsumerSqsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
