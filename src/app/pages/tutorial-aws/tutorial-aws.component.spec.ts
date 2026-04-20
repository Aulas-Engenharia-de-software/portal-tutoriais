import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialAwsComponent } from './tutorial-aws.component';

describe('TutorialAwsComponent', () => {
  let component: TutorialAwsComponent;
  let fixture: ComponentFixture<TutorialAwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialAwsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialAwsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
