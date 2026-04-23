import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';

import { TutorialConsumerSqsComponent } from './tutorial-consumer-sqs.component';

function makeEvent(target: HTMLElement): Event {
  return { currentTarget: target } as unknown as Event;
}

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

  it('should copy to clipboard and show "Copiado!" text for mobile-like button', fakeAsync(() => {
    (navigator as any).clipboard = { writeText: () => Promise.resolve() };

    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-copy"></i> <span class="hidden sm:inline">Copiar</span>';
    const original = btn.innerHTML;

    component.copyToClipboard('abc', makeEvent(btn));
    flushMicrotasks();

    expect(btn.innerHTML).toContain('Copiado!');

    tick(2000);
    expect(btn.innerHTML).toBe(original);
  }));

  it('should copy to clipboard and show only check icon for default button (no span)', fakeAsync(() => {
    (navigator as any).clipboard = { writeText: () => Promise.resolve() };

    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-copy"></i>';
    const original = btn.innerHTML;

    component.copyToClipboard('abc', makeEvent(btn));
    flushMicrotasks();

    expect(btn.innerHTML).toContain('fa-check');
    expect(btn.innerHTML).toContain('text-emerald-500');

    tick(2000);
    expect(btn.innerHTML).toBe(original);
  }));
});
