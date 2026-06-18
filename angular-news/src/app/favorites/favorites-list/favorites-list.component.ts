import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../core/models/article.model';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  standalone: false,
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss',
})
export class FavoritesListComponent {
  favorites$: Observable<Article[]>;

  constructor(private favorites: FavoritesService) {
    this.favorites$ = this.favorites.favorites$;
  }
}
