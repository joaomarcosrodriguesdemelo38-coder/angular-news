import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NewsCardComponent } from './components/news-card/news-card.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatTooltipModule,
  MatBadgeModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsCardComponent,
    LoadingSpinnerComponent,
    CategoryFilterComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ...MATERIAL_MODULES],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ...MATERIAL_MODULES,
    HeaderComponent,
    FooterComponent,
    NewsCardComponent,
    LoadingSpinnerComponent,
    CategoryFilterComponent,
  ],
})
export class SharedModule {}
