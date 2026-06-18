import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

@NgModule({
  declarations: [FavoritesListComponent],
  imports: [CommonModule, SharedModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
