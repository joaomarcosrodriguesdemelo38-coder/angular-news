import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../core/models/article.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { NewsService } from '../../core/services/news.service';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">' +
      '<rect width="100%" height="100%" fill="%23e3e6ee"/>' +
      '<text x="50%" y="50%" font-size="22" fill="%238a90a6" text-anchor="middle" dy=".3em" font-family="sans-serif">Sem imagem</text>' +
      '</svg>',
  );

@Component({
  selector: 'app-news-detail',
  standalone: false,
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent implements OnInit {
  article: Article | null = null;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private favorites: FavoritesService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.article = id ? this.newsService.getArticleById(id) : null;
    this.notFound = !this.article;
  }

  get image(): string {
    return this.article?.urlToImage || PLACEHOLDER_IMAGE;
  }

  get isFavorite(): boolean {
    return this.article ? this.favorites.isFavorite(this.article.url) : false;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
  }

  toggleFavorite(): void {
    if (this.article) {
      this.favorites.toggle(this.article);
    }
  }
}
