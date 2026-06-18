import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  { path: '', component: NewsListComponent, title: 'Notícias - AngularNews' },
  { path: 'detalhe/:id', component: NewsDetailComponent, title: 'Detalhe da notícia - AngularNews' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
