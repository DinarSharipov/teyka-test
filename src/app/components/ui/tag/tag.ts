import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonVariant = 'grey' | 'black';

@Component({
  selector: 'app-tag',
  standalone: true,
  templateUrl: './tag.html',
  imports: [NgClass],
})
export class TagComponent {
  @Input() active: boolean = false;

  get classes() {
    return {
      'bg-[#f2f2f2] text-black': this.active,
      'bg-none text-[#999999]': !this.active,
    };
  }
}
