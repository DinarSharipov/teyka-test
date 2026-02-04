import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './AuthService';

@Injectable({ providedIn: 'root' })
export class BaseService {
  private authService = inject(AuthService);
  protected http = inject(HttpClient);
  protected readonly BASE_URL = 'https://api.teyca.ru/v1';

  protected get baseURLWithToken() {
    return this.BASE_URL + '/' + this.token;
  }

  protected get token() {
    return this.authService.getToken();
  }
}
