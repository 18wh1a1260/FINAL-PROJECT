import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthController } from '../../controller/auth.controller';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authController: AuthController,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authController.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (error) => console.error('Login failed:', error)
      });
    }
  }
}