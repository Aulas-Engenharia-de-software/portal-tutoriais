import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should parse markdown and create unique ids for nested headings', () => {
    const entry = service.findBySlug('criando-iam');
    expect(entry).toBeTruthy();

    let result: ReturnType<typeof service.load> extends import('rxjs').Observable<infer T>
      ? T
      : never;
    service.load('criando-iam').subscribe((document) => (result = document));
    http
      .expectOne(entry!.assetPath)
      .flush(`---\ntitle: ignorado\n---\n# Título\n## Visão Geral\n### Detalhes\n## Visão Geral`);

    expect(result!.markdown).not.toContain('title: ignorado');
    expect(result!.tableOfContents.map((item) => item.id)).toEqual([
      'visao-geral',
      'detalhes',
      'visao-geral-2',
    ]);
  });

  it('should reject unknown slugs without issuing a request', () => {
    service.load('inexistente').subscribe({
      error: (error: Error) => expect(error.message).toContain('não encontrado'),
    });
    http.expectNone(() => true);
  });
});
