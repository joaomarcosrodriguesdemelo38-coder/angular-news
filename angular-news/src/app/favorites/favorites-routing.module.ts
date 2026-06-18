import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

const routes: Routes = [
  { path: '', component: FavoritesListComponent, title: 'Favoritos - AngularNews' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
