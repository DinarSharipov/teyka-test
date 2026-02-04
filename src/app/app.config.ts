import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Material from '@primeuix/themes/nora';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: 'none',
        },
      },
    }),
  ],
};
