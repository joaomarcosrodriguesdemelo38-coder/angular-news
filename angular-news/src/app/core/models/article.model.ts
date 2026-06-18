export interface ArticleSource {
  id: string | null;
  name: string;
}

export interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type NewsCategory =
  | 'general'
  | 'business'
  | 'technology'
  | 'entertainment'
  | 'sports'
  | 'science'
  | 'health';

export const NEWS_CATEGORIES: { value: NewsCategory; label: string; icon: string }[] = [
  { value: 'general', label: 'Geral', icon: 'public' },
  { value: 'technology', label: 'Tecnologia', icon: 'memory' },
  { value: 'business', label: 'Negócios', icon: 'business_center' },
  { value: 'entertainment', label: 'Entretenimento', icon: 'theaters' },
  { value: 'sports', label: 'Esportes', icon: 'sports_soccer' },
  { value: 'science', label: 'Ciência', icon: 'science' },
  { value: 'health', label: 'Saúde', icon: 'health_and_safety' },
];
