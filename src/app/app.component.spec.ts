import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle mobile sidebar and set body overflow accordingly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.isMobileSidebarOpen).toBeFalsy();
    expect(document.body.style.overflow).toBe('');

    app.toggleMobileSidebar();
    expect(app.isMobileSidebarOpen).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');

    app.toggleMobileSidebar();
    expect(app.isMobileSidebarOpen).toBeFalsy();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should close mobile sidebar only on small screens', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.toggleMobileSidebar();
    expect(app.isMobileSidebarOpen).toBeTruthy();

    const originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    app.closeMobileSidebar();
    expect(app.isMobileSidebarOpen).toBeFalsy();
    expect(document.body.style.overflow).toBe('auto');

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalInnerWidth });
  });

  it('should toggle AWS and SQS menus independently', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.isAwsMenuOpen).toBeFalsy();
    expect(app.isSqsMenuOpen).toBeFalsy();

    app.toggleMenu('aws');
    expect(app.isAwsMenuOpen).toBeTruthy();
    expect(app.isSqsMenuOpen).toBeFalsy();

    app.toggleMenu('sqs');
    expect(app.isAwsMenuOpen).toBeTruthy();
    expect(app.isSqsMenuOpen).toBeTruthy();

    app.toggleMenu('aws');
    expect(app.isAwsMenuOpen).toBeFalsy();
    expect(app.isSqsMenuOpen).toBeTruthy();
  });
});
