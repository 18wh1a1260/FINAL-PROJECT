import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../dashboard/header.component';
import { ChartController } from '../../controller/chart.controller';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('reportsCanvas') private chartRef!: ElementRef;
  private chart: any;

  constructor(private chartController: ChartController) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  private async loadChartData(): Promise<void> {
    try {
      const data = await this.chartController.getReportsData().toPromise();
      this.create(data);
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  }

  private create(data: any): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data[0].label==="Regions"?data[0].data:data[1].data,
          datasets: [
            {
              data: data[0].label==="Growth by Region"?data[0].data:data[1].data,
              backgroundColor: ['#FFD700', '#00BFFF', '#32CD32', '#FF4500'],
            },
          ],
        },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Renewable Energy Growth by Region (2024)'
          }
        }
      }
    });
  }
}