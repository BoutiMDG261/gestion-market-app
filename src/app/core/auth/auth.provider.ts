import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {APP_INITIALIZER, ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider} from '@angular/core';
import { AuthService } from './auth.service';
import { authInterceptor } from './auth.interceptor';

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
      provideHttpClient(withInterceptors([authInterceptor])),
      {
        provide: APP_INITIALIZER,
        useFactory: (authService: AuthService) => () => authService.initialize(),
        deps: [AuthService],
        multi: true,
      },
    ];
};
