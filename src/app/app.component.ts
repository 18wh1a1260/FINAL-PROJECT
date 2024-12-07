import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthController } from './controller/auth.controller';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  constructor(private authController: AuthController) {}

  get isLoggedIn(): boolean {
    return this.authController.isLoggedIn();
  }

  logout(): void {
    this.authController.logout();
  }
}