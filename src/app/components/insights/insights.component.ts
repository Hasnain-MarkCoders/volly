import { InsightsService } from './../../services/insights.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart, { ChartDataset } from 'chart.js/auto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent implements OnInit, OnDestroy {
  title = 'ng-chart';
  chart: any = null;
  lineChart: any = null;
  lineChartDollarVolume: any = null;
  selectedFilter: string = 'brand';
  brandDatasets: ChartDataset<'line'>[] = [];
  brandDatasetsDollarVolume: ChartDataset<'line'>[] = [];
  stateDatasets: ChartDataset<'line'>[] = [];
  stateDatasetsDollarVolume: ChartDataset<'line'>[] = [];
  retailerDatasets: ChartDataset<'line'>[] = [];
  retailerDatasetsDollarVolume: ChartDataset<'line'>[] = [];

  constructor(private insightService: InsightsService) {}

  ngOnInit() {
    // Use forkJoin for simultaneous API calls
    forkJoin({
      count: this.insightService.getInsights({ type: 'count', year: '2023' }),
      amount: this.insightService.getInsights({ type: 'amount', year: '2023' })
    }).subscribe({
      next: ({ count, amount }) => {
        // Handle missing or malformed data gracefully
        if (count && count.datasets) {
          this.retailerDatasets = count.datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data || [],
            backgroundColor: dataset.backgroundColor,
            borderRadius: dataset.borderRadius,
            fill: false,
          }));
        }
        if (amount && amount.datasets) {
          this.retailerDatasetsDollarVolume = amount.datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data || [],
            backgroundColor: dataset.backgroundColor,
            borderRadius: dataset.borderRadius,
            fill: false,
          }));
        }
        this.createCharts();
      },
      error: (err) => {
        console.error('Error fetching insights:', err);
      },
    });
  }

  createCharts() {
    // Avoid creating charts if they already exist
    if (!this.chart) {
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.getMonthLabels(),
          datasets: this.retailerDatasets,
        },
        options: {
          scales: { y: { beginAtZero: true } },
          plugins: { title: { display: true, text: 'Brands Performance Over Months' } },
        },
      });
    }

    if (!this.lineChart) {
      this.lineChart = new Chart('lineChartCanvas', {
        type: 'line',
        data: {
          labels: this.getMonthLabels(),
          datasets: this.retailerDatasets,
        },
        options: this.getLineChartOptions('Number of Orders: Retailers Performance Over Months'),
      });
    }

    if (!this.lineChartDollarVolume) {
      this.lineChartDollarVolume = new Chart('lineChartCanvasDollarVolume', {
        type: 'line',
        data: {
          labels: this.getMonthLabels(),
          datasets: this.retailerDatasetsDollarVolume,
        },
        options: this.getLineChartOptions('Dollar Volume: Retailers Performance Over Months'),
      });
    }
  }

  ngOnDestroy(): void {
    // Clean up charts on component destroy
    this.destroyChart(this.chart);
    this.destroyChart(this.lineChart);
    this.destroyChart(this.lineChartDollarVolume);
  }

  destroyChart(chart: any) {
    if (chart) {
      chart.destroy();
    }
  }

  updateChart(event: any): void {
    this.selectedFilter = event.target.value;
    this.updateChartData();
  }

  updateChartDollarVolume(event: any): void {
    this.selectedFilter = event.target.value;
    this.updateChartData(true);
  }

  updateChartData(isDollarVolume: boolean = false) {
    const datasets = this.getDatasetsByFilter(this.selectedFilter, isDollarVolume);
    if (isDollarVolume && this.lineChartDollarVolume) {
      this.lineChartDollarVolume.data.datasets = datasets;
      this.lineChartDollarVolume.update();
    } else if (this.lineChart) {
      this.lineChart.data.datasets = datasets;
      this.lineChart.update();
    }
  }

  getDatasetsByFilter(filter: string, isDollarVolume: boolean = false): ChartDataset<'line'>[] {
    const datasets = {
      brand: isDollarVolume ? this.brandDatasetsDollarVolume : this.brandDatasets,
      state: isDollarVolume ? this.stateDatasetsDollarVolume : this.stateDatasets,
      retailer: isDollarVolume ? this.retailerDatasetsDollarVolume : this.retailerDatasets,
    };
    return datasets[filter] || [];
  }

  getLineChartOptions(title: string) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      stacked: false,
      plugins: { title: { display: true, text: title } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Sales' } },
        x: { title: { display: true, text: 'Months' } },
      },
    };
  }

  getMonthLabels() {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}
