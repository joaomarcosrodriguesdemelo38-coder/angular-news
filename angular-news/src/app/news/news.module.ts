import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [NewsListComponent, NewsDetailComponent],
  imports: [CommonModule, SharedModule, NewsRoutingModule],
})
export class NewsModule {}
