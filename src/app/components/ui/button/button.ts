import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonVariant = 'grey' | 'black';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  imports: [NgClass],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'grey';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  get classes() {
    return {
      'bg-[#1F1F1F] text-white': this.variant === 'black',
      'bg-gray-200 text-black': this.variant === 'grey',
      'opacity-50 pointer-events-none cursor-not-allowed hover:none': this.disabled || this.loading,
    };
  }
}
