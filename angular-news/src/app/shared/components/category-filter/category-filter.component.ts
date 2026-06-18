import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NEWS_CATEGORIES, NewsCategory } from '../../../core/models/article.model';

@Component({
  selector: 'app-category-filter',
  standalone: false,
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  @Input() selected: NewsCategory = 'general';
  @Output() selectedChange = new EventEmitter<NewsCategory>();

  readonly categories = NEWS_CATEGORIES;

  select(category: NewsCategory): void {
    if (category !== this.selected) {
      this.selected = category;
      this.selectedChange.emit(category);
    }
  }
}
