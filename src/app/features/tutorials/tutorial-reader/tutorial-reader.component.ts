import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { CONTENT_TYPE_LABELS, ContentDocument } from '../../../core/content/content.models';
import { ContentService } from '../../../core/content/content.service';

@Component({
  selector: 'app-tutorial-reader',
  imports: [MarkdownComponent, RouterLink],
  templateUrl: './tutorial-reader.component.html',
  styleUrl: './tutorial-reader.component.css',
})
export class TutorialReaderComponent implements OnInit, OnDestroy {
  @ViewChild('articleContainer') articleContainer?: ElementRef<HTMLElement>;

  readonly typeLabels = CONTENT_TYPE_LABELS;
  documentData: ContentDocument | null = null;
  isLoading = true;
  hasError = false;
  activeFragment: string | null = null;
  lightbox = { open: false, src: '', alt: '' };

  private listenerCleanups: Array<() => void> = [];
  private scrollContainer: HTMLElement | null = null;
  private removeScrollListener?: () => void;
  private previousBodyOverflow = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly contentService: ContentService,
    private readonly title: Title,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    @Inject(DOCUMENT) private readonly dom: Document,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('slug') ?? ''),
        distinctUntilChanged(),
        switchMap((slug) => {
          this.isLoading = true;
          this.hasError = false;
          this.documentData = null;
          this.activeFragment = null;
          this.teardownEnhancements();

          return this.contentService.load(slug).pipe(
            catchError((error: unknown) => {
              this.hasError = true;
              this.isLoading = false;
              if (!(error instanceof HttpErrorResponse && error.status === 404)) {
                console.error('Falha ao carregar conteúdo:', error);
              }
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((documentData) => {
        if (!documentData) return;
        this.documentData = documentData;
        this.isLoading = false;
        this.title.setTitle(`${documentData.entry.title} | Portal de Aulas`);
        this.cdr.detectChanges();
      });

    this.route.fragment.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((fragment) => {
      if (fragment) this.activeFragment = fragment;
      this.scrollToFragment(fragment);
    });
  }

  ngOnDestroy(): void {
    this.teardownEnhancements();
    this.closeLightbox();
  }

  onMarkdownReady(): void {
    setTimeout(() => {
      this.assignHeadingIds();
      this.wireEnhancements();
      this.setupScrollListener();
      this.updateActiveSection();
      this.scrollToFragment(this.route.snapshot.fragment);
    });
  }

  openLightbox(src: string, alt: string): void {
    this.previousBodyOverflow = this.dom.body.style.overflow;
    this.dom.body.style.overflow = 'hidden';
    this.lightbox = { open: true, src, alt };
    this.cdr.detectChanges();
  }

  closeLightbox(): void {
    if (!this.lightbox.open) return;
    this.dom.body.style.overflow = this.previousBodyOverflow;
    this.lightbox = { ...this.lightbox, open: false };
    this.cdr.detectChanges();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }

  private assignHeadingIds(): void {
    if (!this.articleContainer || !this.documentData) return;
    const headings = Array.from(
      this.articleContainer.nativeElement.querySelectorAll<HTMLElement>('h2, h3'),
    );
    headings.forEach((heading, index) => {
      const item = this.documentData?.tableOfContents[index];
      if (item) heading.id = item.id;
    });
  }

  private wireEnhancements(): void {
    this.teardownEnhancements();
    if (!this.articleContainer) return;
    const article = this.articleContainer.nativeElement;

    article.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Ampliar imagem: ${image.alt || 'ilustração do tutorial'}`);
      const open = () => this.openLightbox(image.currentSrc || image.src, image.alt);
      const keydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      };
      image.addEventListener('click', open);
      image.addEventListener('keydown', keydown);
      this.listenerCleanups.push(() => {
        image.removeEventListener('click', open);
        image.removeEventListener('keydown', keydown);
      });
    });

    article.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
      if (pre.querySelector('[data-copy-code]')) return;
      const button = this.dom.createElement('button');
      button.type = 'button';
      button.dataset['copyCode'] = 'true';
      button.className = 'copy-code-button';
      button.setAttribute('aria-label', 'Copiar código');
      button.innerHTML = '<i class="far fa-copy" aria-hidden="true"></i><span>Copiar</span>';
      const copy = async () => {
        const code = pre.querySelector('code')?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(code);
          button.classList.add('copied');
          button.querySelector('span')!.textContent = 'Copiado';
          setTimeout(() => {
            button.classList.remove('copied');
            const label = button.querySelector('span');
            if (label) label.textContent = 'Copiar';
          }, 1800);
        } catch {
          button.querySelector('span')!.textContent = 'Selecione e copie';
        }
      };
      button.addEventListener('click', copy);
      pre.appendChild(button);
      this.listenerCleanups.push(() => button.removeEventListener('click', copy));
    });

    article.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
      if (/^https?:\/\//.test(anchor.href)) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
    });
  }

  private setupScrollListener(): void {
    this.removeScrollListener?.();
    this.scrollContainer =
      this.dom.querySelector<HTMLElement>('[data-page-scroll]') ??
      (this.dom.scrollingElement as HTMLElement);
    const handler = () => this.updateActiveSection();
    this.scrollContainer?.addEventListener('scroll', handler, { passive: true });
    this.removeScrollListener = () => this.scrollContainer?.removeEventListener('scroll', handler);
  }

  private updateActiveSection(): void {
    if (!this.articleContainer || !this.documentData?.tableOfContents.length) return;
    const headings = Array.from(
      this.articleContainer.nativeElement.querySelectorAll<HTMLElement>('h2, h3'),
    );
    let current = headings[0]?.id ?? null;
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 150) current = heading.id;
      else break;
    }
    if (current !== this.activeFragment) {
      this.activeFragment = current;
      this.cdr.detectChanges();
    }
  }

  private scrollToFragment(fragment: string | null): void {
    if (!fragment) return;
    setTimeout(() =>
      this.dom.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  }

  private teardownEnhancements(): void {
    this.listenerCleanups.forEach((cleanup) => cleanup());
    this.listenerCleanups = [];
    this.removeScrollListener?.();
    this.removeScrollListener = undefined;
  }
}
