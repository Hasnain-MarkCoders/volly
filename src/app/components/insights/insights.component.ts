import { Component, OnInit } from '@angular/core';
import Chart, { ChartDataset } from 'chart.js/auto';
 
 
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent   {
  title = 'ng-chart';
  chart: any = [];
  lineChart: any = [];
  lineChartDollarVolume:any=[]
  selectedFilter: string = 'brand';

  public brandDatasets: ChartDataset<'line'>[] = [
    {
      label: 'Apple',
      data: [478, 356, 492, 345, 763, 883, 672, 654, 439, 888, 991, 567],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Samsung',
      data: [530, 843, 672, 934, 411, 556, 692, 772, 493, 605, 859, 726],
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    },
    {
      label: 'Sony',
      data: [625, 934, 495, 813, 251, 912, 653, 701, 823, 457, 609, 957],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
 
    
  ];
  public brandDatasetsDollarVolume: ChartDataset<'line'>[] =  [
    {
      label: 'Apple',
      data: [500, 480, 520, 500, 550, 530, 560, 580, 600, 620, 610, 630], // Starts at 500, ends at 630
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Samsung',
      data: [450, 470, 460, 480, 490, 500, 510, 500, 520, 530, 540, 550], // Starts at 450, ends at 550
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    },
    {
      label: 'Sony',
      data: [350, 360, 355, 365, 370, 380, 375, 385, 390, 400, 395, 405], // Starts at 350, ends at 405
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
  ];
  // Define State Datasets
  public stateDatasets: ChartDataset<'line'>[] = [
    {
      label: 'California',
      data: [300, 400, 350, 500, 450, 600, 550, 650, 700, 800, 750, 900],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'Texas',
      data: [500, 600, 550, 700, 650, 800, 750, 850, 900, 1000, 950, 1100],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'New York',
      data: [400, 500, 450, 600, 550, 700, 650, 750, 800, 900, 850, 1000],
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
  ];
  public stateDatasetsDollarVolume: ChartDataset<'line'>[] =[
    {
      label: 'California',
      data: [500, 520, 510, 530, 540, 550, 545, 555, 560, 570, 565, 575], // Starts at 500, ends at 575
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'Texas',
      data: [600, 620, 610, 630, 640, 650, 645, 655, 660, 670, 665, 675], // Starts at 600, ends at 675
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'New York',
      data: [700, 720, 710, 730, 740, 750, 745, 755, 760, 770, 765, 775], // Starts at 700, ends at 775
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
   
  ];
  

  public retailerDatasets: ChartDataset<'line'>[] = [
    {
      label: 'Retailer A',
      data: [200, 300, 250, 400, 350, 500, 450, 550, 600, 700, 650, 800],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Retailer B',
      data: [220, 320, 270, 420, 370, 520, 470, 570, 620, 720, 670, 820],
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    },
    {
      label: 'Retailer C',
      data: [240, 340, 290, 440, 390, 540, 490, 590, 640, 740, 690, 840],
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    
  ];
  public retailerDatasetsDollarVolume: ChartDataset<'line'>[] = [
    {
      label: 'Retailer A',
      data: [200, 220, 210, 230, 240, 250, 245, 255, 260, 270, 265, 275], // Starts at 200, ends at 275
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Retailer B',
      data: [300, 320, 310, 330, 340, 350, 345, 355, 360, 370, 365, 375], // Starts at 300, ends at 375
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    },
    {
      label: 'Retailer C',
      data: [400, 420, 410, 430, 440, 450, 445, 455, 460, 470, 465, 475], // Starts at 400, ends at 475
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
  ];
  constructor() {}

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [
          {
            label: 'Apple',
            data: [478, 356, 492, 345, 763, 883, 672, 654, 439, 888, 991, 567],
          },
          {
            label: 'Samsung',
            data: [530, 843, 672, 934, 411, 556, 692, 772, 493, 605, 859, 726],
          },
          {
            label: 'Sony',
            data: [625, 934, 495, 813, 251, 912, 653, 701, 823, 457, 609, 957],
          },
         
        ]
        
        
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Brands Performance Over Months'
          }
        },
      },
    });

    this.lineChart = new Chart('lineChartCanvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: this.brandDatasets
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Number of Orders : Brand Performance Over Months'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Months'
            }
          }
        },
      }
    });


    this.lineChartDollarVolume = new Chart('lineChartCanvasDollarVolume', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: this.brandDatasetsDollarVolume
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Number of Dollars : Brand Performance Over Months'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Months'
            }
          }
        },
      }
    });

  }
  updateChart(event:any): void {
    this.selectedFilter=event.target.value
    if (this.lineChart) {
      // Clear existing datasets
      this.lineChart.data.datasets = [];

      // Assign new datasets based on the selected filter
      if (this.selectedFilter === 'brand') {
        this.lineChart.data.datasets = this.brandDatasets;
        this.lineChart.options.plugins!.title!.text = 'Number of Orders : Brand Performance Over Months';
      } else if (this.selectedFilter === 'state') {
        this.lineChart.data.datasets = this.stateDatasets;
        this.lineChart.options.plugins!.title!.text = 'Number of Orders : State Performance Over Months';
      }
      else if (this.selectedFilter === 'retailer') {
        this.lineChart.data.datasets = this.retailerDatasets;
        this.lineChart.options.plugins!.title!.text = 'Number of Orders : Retailer Performance Over Months';
      }

      // Update the chart to reflect changes
      this.lineChart.update();
    }
  }
  updateChartDollarVolume(event:any): void {
    this.selectedFilter=event.target.value
    if (this.lineChartDollarVolume) {
      // Clear existing datasets
      this.lineChartDollarVolume.data.datasets = [];

      // Assign new datasets based on the selected filter
      if (this.selectedFilter === 'brand') {
        this.lineChartDollarVolume.data.datasets = this.brandDatasetsDollarVolume;
        this.lineChartDollarVolume.options.plugins!.title!.text = 'Dollar Volume : Brand Performance Over Months';
      } else if (this.selectedFilter === 'state') {
        this.lineChartDollarVolume.data.datasets = this.stateDatasetsDollarVolume;
        this.lineChartDollarVolume.options.plugins!.title!.text = 'Dollar Volume : State Performance Over Months';
      }
      else if (this.selectedFilter === 'retailer') {
        this.lineChartDollarVolume.data.datasets = this.retailerDatasetsDollarVolume;
        this.lineChartDollarVolume.options.plugins!.title!.text = 'Dollar Volume : Retailer Performance Over Months';
      }

      // Update the chart to reflect changes
      this.lineChartDollarVolume.update();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    if (this.lineChartDollarVolume) {
      this.lineChartDollarVolume.destroy();
    }
  }
}