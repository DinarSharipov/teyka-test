import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface AuthResponse {
  auth_token: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private readonly http = inject(HttpClient);

  private readonly AUTH_URL = 'https://api.teyca.ru/test-auth-only';
  private readonly TOKEN_KEY = 'teyka_token';

  public isAuth = signal<boolean>(!!localStorage.getItem(this.TOKEN_KEY));

  public login(login: string, password: string): Observable<string> {
    return this.http.post<AuthResponse>(this.AUTH_URL, { login, password }).pipe(
      tap((response) => {
        if (response.auth_token) {
          localStorage.setItem(this.TOKEN_KEY, response.auth_token);
          this.isAuth.set(true);
        }

        if (response.error) {
          console.log('THWOR', response);

          throw new Error(response.error);
        }
      }),
      map((response) => response.auth_token),
    );
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuth.set(false);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
