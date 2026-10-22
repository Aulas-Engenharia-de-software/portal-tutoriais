import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideMarkdown } from 'ngx-markdown';
import { vi } from 'vitest';
import { routes } from './app.routes';
import { ContentService } from './core/content/content.service';

describe('Unavailable content routes', () => {
  let harness: RouterTestingHarness;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMarkdown(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    harness = await RouterTestingHarness.create();
  });

  afterEach(() => {
    http.verify();
    vi.restoreAllMocks();
  });

  it('keeps unknown URLs and refreshes the excuse when navigating between them', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    await harness.navigateByUrl('/pagina-em-preparo');
    const firstMessage = harness.routeNativeElement?.querySelector('.excuse')?.textContent;
    expect(firstMessage).toBeTruthy();
    expect(TestBed.inject(Router).url).toBe('/pagina-em-preparo');

    await harness.navigateByUrl('/outra-pagina-em-preparo');
    expect(harness.routeNativeElement?.querySelector('.excuse')?.textContent).not.toBe(
      firstMessage,
    );
    expect(TestBed.inject(Router).url).toBe('/outra-pagina-em-preparo');
  });

  it('returns missing tutorials and materials to their own catalog without fetching unknown files', async () => {
    for (const catalog of ['tutoriais', 'materiais']) {
      await harness.navigateByUrl(`/${catalog}/conteudo-em-preparo`);
      expect(harness.routeNativeElement?.querySelector('app-coming-soon')).toBeTruthy();
      expect(harness.routeNativeElement?.querySelector('.return-link')?.getAttribute('href')).toBe(
        `/${catalog}`,
      );
    }
    http.expectNone(() => true);
  });

  it('distinguishes missing content files from temporary loading failures', async () => {
    const contentService = TestBed.inject(ContentService);
    await harness.navigateByUrl('/tutoriais/aws-eda');
    http
      .expectOne(contentService.findBySlug('aws-eda')!.assetPath)
      .flush('', { status: 404, statusText: 'Not Found' });
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('app-coming-soon')).toBeTruthy();

    vi.spyOn(console, 'error').mockImplementation(() => {});
    await harness.navigateByUrl('/tutoriais/dlq');
    http
      .expectOne(contentService.findBySlug('dlq')!.assetPath)
      .flush('', { status: 500, statusText: 'Server Error' });
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('app-coming-soon')).toBeNull();
    expect(harness.routeNativeElement?.textContent).toContain(
      'Não foi possível carregar o conteúdo',
    );
  });
});
