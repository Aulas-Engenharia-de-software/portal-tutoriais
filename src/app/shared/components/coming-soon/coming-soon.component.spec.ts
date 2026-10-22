import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ComingSoonComponent } from './coming-soon.component';

describe('ComingSoonComponent', () => {
  afterEach(() => vi.restoreAllMocks());

  it('changes the excuse on request without consecutive repeats or automatic changes', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    TestBed.configureTestingModule({
      imports: [ComingSoonComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ComingSoonComponent);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const firstMessage = element.querySelector('.excuse')?.textContent;

    element.querySelector<HTMLButtonElement>('.another-excuse')!.click();
    fixture.detectChanges();
    const nextMessage = element.querySelector('.excuse')?.textContent;
    expect(nextMessage).toBeTruthy();
    expect(nextMessage).not.toBe(firstMessage);

    fixture.detectChanges();
    expect(element.querySelector('.excuse')?.textContent).toBe(nextMessage);
  });
});
