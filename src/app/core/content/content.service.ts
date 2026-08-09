import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { marked } from 'marked';
import { CONTENT_INDEX } from './generated-content-index';
import { ContentDocument, ContentEntry, TableOfContentsItem } from './content.models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly entries = CONTENT_INDEX;

  constructor(private readonly http: HttpClient) {}

  findBySlug(slug: string): ContentEntry | undefined {
    return this.entries.find((entry) => entry.slug === slug);
  }

  load(slug: string): Observable<ContentDocument> {
    const entry = this.findBySlug(slug);
    if (!entry) return throwError(() => new Error('Conteúdo não encontrado.'));

    return this.http.get(entry.assetPath, { responseType: 'text' }).pipe(
      map((source) => {
        const markdown = this.removeFrontmatter(source);
        return { entry, markdown, tableOfContents: this.buildTableOfContents(markdown) };
      }),
    );
  }

  private removeFrontmatter(source: string): string {
    return source
      .replace(/^\uFEFF/, '')
      .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
      .trim();
  }

  private buildTableOfContents(markdown: string): TableOfContentsItem[] {
    const headings = marked
      .lexer(markdown)
      .filter((token) => token.type === 'heading' && (token.depth === 2 || token.depth === 3));
    const occurrences = new Map<string, number>();

    return headings.map((token) => {
      if (token.type !== 'heading') throw new Error('Token de título inválido.');
      const title = token.text.replace(/[*_`~[\]]/g, '').trim();
      const baseId = this.slugify(title) || 'secao';
      const occurrence = (occurrences.get(baseId) ?? 0) + 1;
      occurrences.set(baseId, occurrence);
      return {
        id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
        title,
        level: token.depth as 2 | 3,
      };
    });
  }

  private slugify(value: string): string {
    return value
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
