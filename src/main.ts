import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { SummaryComponent } from './app/components/charts/summary';
import { ReportsComponent } from './app/components/charts/report';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthController } from './app/controller/auth.controller';


const authorized = () => {
  const authController = inject(AuthController)
  const router = inject(Router);

  if (!authController.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authorized] },
      { path: 'summary', component: SummaryComponent, canActivate: [authorized] },
      { path: 'reports', component: ReportsComponent, canActivate: [authorized] }
    ]),
    provideHttpClient()
  ]
}).catch(err => console.error(err));