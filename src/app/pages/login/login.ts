import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/AuthService/AuthService';

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputText, FloatLabel, ToastModule],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  login = '';
  password = '';
  loading = signal(false);

  submit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.loading.set(true);

    this.authService
      .login(this.login.trim(), this.password.trim())
      .subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: error,
            life: 5000,
          });
        },
      })
      .add(() => this.loading.set(false));
  }
}
