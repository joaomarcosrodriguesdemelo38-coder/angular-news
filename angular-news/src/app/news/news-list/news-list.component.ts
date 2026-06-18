import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article, NEWS_CATEGORIES, NewsCategory } from '../../core/models/article.model';
import { NewsService } from '../../core/services/news.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-news-list',
  standalone: false,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  loading = true;
  errorMessage = '';
  selectedCategory: NewsCategory = 'general';
  searchQuery = '';
  isOffline = !navigator.onLine;
  lastUpdated: number | null = null;

  private subscription?: Subscription;

  constructor(
    private newsService: NewsService,
    private notifications: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      const categoria = params.get('categoria') as NewsCategory | null;

      this.searchQuery = q ?? '';
      this.selectedCategory = categoria ?? 'general';
      this.fetchArticles();
    });

    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  onCategoryChange(category: NewsCategory): void {
    this.router.navigate(['/noticias'], { queryParams: { categoria: category } });
  }

  clearSearch(): void {
    this.router.navigate(['/noticias'], { queryParams: { categoria: this.selectedCategory } });
  }

  retry(): void {
    this.fetchArticles();
  }

  get categoryLabel(): string {
    return NEWS_CATEGORIES.find((c) => c.value === this.selectedCategory)?.label ?? 'Geral';
  }

  private fetchArticles(): void {
    this.loading = true;
    this.errorMessage = '';

    const request$ = this.searchQuery
      ? this.newsService.searchNews(this.searchQuery)
      : this.newsService.getTopHeadlines(this.selectedCategory);

    request$.subscribe({
      next: (response) => {
        this.loading = false;
        this.articles = response.articles ?? [];
        this.lastUpdated = this.searchQuery
          ? Date.now()
          : this.newsService.getCacheTimestamp(this.selectedCategory);

        if (this.articles.length === 0) {
          this.errorMessage = this.searchQuery
            ? 'Nenhuma notícia encontrada para essa busca.'
            : 'Não foi possível carregar notícias agora. Verifique sua chave de API ou conexão.';
        } else if (!this.searchQuery) {
          this.notifications.notifyNewHeadlines(this.categoryLabel, this.articles.length);
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Ocorreu um erro ao buscar as notícias.';
      },
    });
  }

  private updateOnlineStatus = (): void => {
    this.isOffline = !navigator.onLine;
  };
}
