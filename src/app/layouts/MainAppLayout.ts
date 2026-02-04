// layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Header } from '../components/header/header';

@Component({
  selector: 'main-app-layout',
  templateUrl: './MainAppLayout.html',
  imports: [RouterOutlet, ButtonModule, Header],
})
export class MainAppLayout {}
