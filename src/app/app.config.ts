import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { appRoutingProviders } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth } from './core/auth/auth.provider';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), appRoutingProviders, provideAnimationsAsync(), provideAuth(), provideHttpClient()
  ],
};
