import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
  ],
  bootstrap: [App],
})
export class AppModule {}
