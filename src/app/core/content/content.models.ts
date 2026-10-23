export type ContentType = 'tutorial' | 'atividade' | 'material';
export type MaterialResourceType = 'slides' | 'site' | 'pdf' | 'livro' | 'repositorio';

export interface ContentEntry {
  slug: string;
  title: string;
  description: string;
  course: string;
  discipline: string;
  module: string;
  category: string;
  type: ContentType;
  tags: string[];
  icon: string;
  readingMinutes: number;
  updatedAt: string;
  featured: boolean;
  order: number;
  assetPath: string;
  resourceType?: MaterialResourceType;
  externalUrl?: string;
  provider?: string;
  sequence?: string;
  sequenceTitle?: string;
  step?: number;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ContentDocument {
  entry: ContentEntry;
  markdown: string;
  tableOfContents: TableOfContentsItem[];
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  tutorial: 'Tutorial',
  atividade: 'Atividade',
  material: 'Material',
};

export const RESOURCE_TYPE_LABELS: Record<MaterialResourceType, string> = {
  slides: 'Slides',
  site: 'Sites de referência',
  pdf: 'PDFs',
  livro: 'Livros',
  repositorio: 'Repositórios',
};
