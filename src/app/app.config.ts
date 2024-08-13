import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { appRoutingProviders } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth } from './core/auth/auth.provider';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), appRoutingProviders, provideAnimationsAsync(), provideAuth(), provideHttpClient(),importProvidersFrom([BrowserModule, BrowserAnimationsModule])
  ],
};
