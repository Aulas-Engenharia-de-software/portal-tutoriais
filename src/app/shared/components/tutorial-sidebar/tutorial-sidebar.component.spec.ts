import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSidebar } from './tutorial-sidebar.component';

describe('TutorialSidebar', () => {
  let component: TutorialSidebar;
  let fixture: ComponentFixture<TutorialSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
