import { Component, inject } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../../services/AuthService/AuthService';
import { ButtonComponent } from '../ui/button/button';

@Component({
  selector: 'app-header',
  imports: [PopoverModule, ButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);

  public logout() {
    this.authService.logout();
  }
}
