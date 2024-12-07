import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartController {
  private readonly API_URL = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getSummaryData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/summary-chart`, {headers:headers});
  }

  getReportsData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/report-chart`, {headers:headers});
  }
}