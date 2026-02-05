import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './AuthService';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  return next(
    !token
      ? req
      : req.clone({
          setHeaders: {
            Authorization: token,
          },
        }),
  );
};
