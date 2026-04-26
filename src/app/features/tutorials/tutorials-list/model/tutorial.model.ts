export interface Tutorial {
  id: string;

  title: string;

  description: string;

  category: 'AWS' | 'Java' | 'Arquitetura';

  readingTime: string;

  icon: string;

  route: string;
}
