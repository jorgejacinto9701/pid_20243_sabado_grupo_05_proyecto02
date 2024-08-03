import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi, HTTP_INTERCEPTORS, withInterceptors  } from '@angular/common/http';
//import { AuthInterceptor } from '../app/core/guards/basic-auth.interceptor';
//import { ErrorInterceptor } from '../app/core/guards/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(),
      //withInterceptorsFromDi(),
    ),
    //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    //{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
};
