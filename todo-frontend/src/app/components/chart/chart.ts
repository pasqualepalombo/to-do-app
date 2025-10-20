import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Todo } from '../../services/todo';


@Component({
  selector: 'app-chart',
  imports: [ChartModule, CommonModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart implements OnChanges {
  @Input() todos: Todo[] = [];
  chartData: any;
  chartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todos']) {
      this.updateChart();
    }
  }

  updateChart(): void {
    const completati = this.todos.filter(t => t.completato).length;
    const nonCompletati = this.todos.filter(t => !t.completato).length;

    this.chartData = {
      labels: ['Completati', 'Non Completati'],
      datasets: [
        {
          data: [completati, nonCompletati],
          backgroundColor: ['#4CAF50', '#FF6B6B'],
          hoverBackgroundColor: ['#45a049', '#ff5252']
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      responsive: true,
      maintainAspectRatio: true
    };
  }
}