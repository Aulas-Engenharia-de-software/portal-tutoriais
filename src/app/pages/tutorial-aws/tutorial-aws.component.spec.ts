import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';

import { TutorialAwsComponent } from './tutorial-aws.component';

// Helper para simular evento com currentTarget
function makeEvent(target: HTMLElement): Event {
  return { currentTarget: target } as unknown as Event;
}

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

  it('should open and close lightbox updating body overflow', () => {
    expect(component.isLightboxOpen).toBeFalsy();
    expect(component.currentImageSrc).toBe('');

    component.openLightbox('img-src');
    expect(component.isLightboxOpen).toBeTruthy();
    expect(component.currentImageSrc).toBe('img-src');
    expect(document.body.style.overflow).toBe('hidden');

    component.closeLightbox();
    expect(component.isLightboxOpen).toBeFalsy();
    expect(component.currentImageSrc).toBe('');
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should copy to clipboard and temporarily change button content (mobile button)', fakeAsync(() => {
    // Mock clipboard
    (navigator as any).clipboard = {
      writeText: () => Promise.resolve()
    };

    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-copy"></i> <span class="sm:hidden">Copiar</span>';

    const original = btn.innerHTML;

    component.copyToClipboard('hello', makeEvent(btn));
    // resolve clipboard promise
    flushMicrotasks();

    expect(btn.innerHTML).toContain('Copiado!');

    // after 2s, restore
    tick(2000);
    expect(btn.innerHTML).toBe(original);
  }));
});
