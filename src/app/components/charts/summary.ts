import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../dashboard/header.component';
import { ChartController } from '../../controller/chart.controller';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @ViewChild('summaryCanvas') private chartRef!: ElementRef;
  private chart: any;
  
  constructor(private chartController: ChartController) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  private async loadChartData(): Promise<void> {
    try {
      const data = await this.chartController.getSummaryData().toPromise();
      this.create(data);
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  }

  private create(data: any): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data[0].label==="Categories"?data[0].data:data[1].data,
        datasets: [
        {
            label: 'Projected Growth (2024)',
            data: data[0].label==="Renewable Energy Growth"?data[0].data:data[1].data,
            backgroundColor: ['#FFB400', '#00C1FF', '#66CC66', '#FF6666', '#9999FF'],
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
            text: 'Renewable Energy Adoption and Innovations (2024)'
          }
        }
      }
    });
  }
}