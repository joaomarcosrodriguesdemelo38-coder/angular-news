import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'noticias', pathMatch: 'full' },
  {
    path: 'noticias',
    loadChildren: () => import('./news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favorites/favorites.module').then((m) => m.FavoritesModule),
    canActivate: [authGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'noticias' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
