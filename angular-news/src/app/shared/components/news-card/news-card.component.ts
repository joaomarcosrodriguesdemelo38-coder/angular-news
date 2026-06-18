import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';
import { base64UrlEncode } from '../../../core/utils/base64-url.util';
import { FavoritesService } from '../../../core/services/favorites.service';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220">' +
      '<rect width="100%" height="100%" fill="%23e3e6ee"/>' +
      '<text x="50%" y="50%" font-size="18" fill="%238a90a6" text-anchor="middle" dy=".3em" font-family="sans-serif">Sem imagem</text>' +
      '</svg>',
  );

@Component({
  selector: 'app-news-card',
  standalone: false,
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  @Input({ required: true }) article!: Article;

  constructor(private favorites: FavoritesService) {}

  get image(): string {
    return this.article.urlToImage || PLACEHOLDER_IMAGE;
  }

  get detailLink(): string {
    return base64UrlEncode(this.article.url);
  }

  get isFavorite(): boolean {
    return this.favorites.isFavorite(this.article.url);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(this.article);
  }
}
