import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputText, FloatLabel],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  password = '';
  loading = false;
  error: string | null = null;

  submit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.loading = true;
    this.error = null;

    this.authService.login(this.login.trim(), this.password.trim()).subscribe({
      next: () => {
        this.router.navigate(['/clients']);
      },
      error: () => {
        this.error = 'Ошибка авторизации';
        this.loading = false;
      },
    });
  }
}
