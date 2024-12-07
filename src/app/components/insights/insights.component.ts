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
      label: 'Nike',
      data: [356, 728, 649, 888, 911, 400, 598, 505, 781, 654, 548, 802],
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Adidas',
      data: [773, 583, 224, 497, 369, 791, 900, 642, 805, 513, 735, 844],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'Sony',
      data: [625, 934, 495, 813, 251, 912, 653, 701, 823, 457, 609, 957],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Microsoft',
      data: [682, 772, 553, 728, 489, 395, 983, 605, 749, 808, 598, 667],
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
    {
      label: 'Amazon',
      data: [817, 474, 538, 1000, 613, 798, 804, 653, 573, 902, 623, 738],
      borderColor: 'rgba(199, 199, 199, 1)',
      fill: false
    },
    {
      label: 'Tesla',
      data: [592, 643, 378, 567, 958, 887, 435, 781, 623, 813, 705, 827],
      borderColor: 'rgba(83, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Coca-Cola',
      data: [535, 783, 453, 883, 659, 724, 907, 494, 584, 765, 898, 665],
      borderColor: 'rgba(255, 99, 255, 1)',
      fill: false
    },
    {
      label: 'Pepsi',
      data: [803, 726, 556, 701, 926, 617, 764, 854, 673, 595, 803, 638],
      borderColor: 'rgba(99, 255, 132, 1)',
      fill: false
    },
    {
      label: 'Google',
      data: [674, 567, 745, 884, 649, 798, 815, 607, 793, 705, 914, 775],
      borderColor: 'rgba(255, 99, 71, 1)',
      fill: false
    },
    {
      label: 'Intel',
      data: [895, 727, 556, 792, 669, 549, 908, 684, 795, 659, 774, 624],
      borderColor: 'rgba(54, 255, 235, 1)',
      fill: false
    }
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
      label: 'Nike',
      data: [300, 320, 310, 330, 340, 350, 360, 340, 350, 360, 370, 380], // Starts at 300, ends at 380
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Adidas',
      data: [400, 420, 410, 430, 440, 450, 460, 440, 450, 460, 470, 480], // Starts at 400, ends at 480
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'Sony',
      data: [350, 360, 355, 365, 370, 380, 375, 385, 390, 400, 395, 405], // Starts at 350, ends at 405
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Microsoft',
      data: [400, 390, 395, 405, 410, 420, 415, 425, 430, 440, 435, 445], // Starts at 400, ends at 445
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
    {
      label: 'Amazon',
      data: [480, 470, 475, 485, 490, 500, 495, 505, 510, 520, 515, 525], // Starts at 480, ends at 525
      borderColor: 'rgba(199, 199, 199, 1)',
      fill: false
    },
    {
      label: 'Tesla',
      data: [420, 430, 425, 435, 440, 450, 445, 455, 460, 470, 465, 475], // Starts at 420, ends at 475
      borderColor: 'rgba(83, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Coca-Cola',
      data: [370, 380, 375, 385, 390, 400, 395, 405, 410, 420, 415, 425], // Starts at 370, ends at 425
      borderColor: 'rgba(255, 99, 255, 1)',
      fill: false
    },
    {
      label: 'Pepsi',
      data: [390, 400, 395, 405, 410, 420, 415, 425, 430, 440, 435, 445], // Starts at 390, ends at 445
      borderColor: 'rgba(99, 255, 132, 1)',
      fill: false
    },
    {
      label: 'Google',
      data: [410, 420, 415, 425, 430, 440, 435, 445, 450, 460, 455, 465], // Starts at 410, ends at 465
      borderColor: 'rgba(255, 99, 71, 1)',
      fill: false
    },
    {
      label: 'Intel',
      data: [430, 440, 435, 445, 450, 460, 455, 465, 470, 480, 475, 485], // Starts at 430, ends at 485
      borderColor: 'rgba(54, 255, 235, 1)',
      fill: false
    }
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
    {
      label: 'Florida',
      data: [350, 450, 400, 550, 500, 650, 600, 700, 750, 850, 800, 950],
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Illinois',
      data: [320, 420, 370, 520, 470, 620, 570, 670, 720, 820, 770, 920],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Pennsylvania',
      data: [310, 410, 360, 510, 460, 610, 560, 660, 710, 810, 760, 910],
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    },
    {
      label: 'Ohio',
      data: [330, 430, 380, 530, 480, 630, 580, 680, 730, 830, 780, 930],
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Georgia',
      data: [340, 440, 390, 540, 490, 640, 590, 690, 740, 840, 790, 940],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'North Carolina',
      data: [360, 460, 410, 560, 510, 660, 610, 710, 760, 860, 810, 960],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Michigan',
      data: [370, 470, 420, 570, 520, 670, 620, 720, 770, 870, 820, 970],
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
    {
      label: 'New Jersey',
      data: [380, 480, 430, 580, 530, 680, 630, 730, 780, 880, 830, 980],
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Virginia',
      data: [390, 490, 440, 590, 540, 690, 640, 740, 790, 890, 840, 990],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    }
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
    {
      label: 'Florida',
      data: [800, 820, 810, 830, 840, 850, 845, 855, 860, 870, 865, 875], // Starts at 800, ends at 875
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Illinois',
      data: [900, 920, 910, 930, 940, 950, 945, 955, 960, 970, 965, 975], // Starts at 900, ends at 975
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Pennsylvania',
      data: [1000, 1020, 1010, 1030, 1040, 1050, 1045, 1055, 1060, 1070, 1065, 1075], // Starts at 1000, ends at 1075
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    },
    {
      label: 'Ohio',
      data: [1100, 1120, 1110, 1130, 1140, 1150, 1145, 1155, 1160, 1170, 1165, 1175], // Starts at 1100, ends at 1175
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Georgia',
      data: [1200, 1220, 1210, 1230, 1240, 1250, 1245, 1255, 1260, 1270, 1265, 1275], // Starts at 1200, ends at 1275
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'North Carolina',
      data: [1300, 1320, 1310, 1330, 1340, 1350, 1345, 1355, 1360, 1370, 1365, 1375], // Starts at 1300, ends at 1375
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Michigan',
      data: [1400, 1420, 1410, 1430, 1440, 1450, 1445, 1455, 1460, 1470, 1465, 1475], // Starts at 1400, ends at 1475
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
    {
      label: 'New Jersey',
      data: [1500, 1520, 1510, 1530, 1540, 1550, 1545, 1555, 1560, 1570, 1565, 1575], // Starts at 1500, ends at 1575
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false
    },
    {
      label: 'Virginia',
      data: [1600, 1620, 1610, 1630, 1640, 1650, 1645, 1655, 1660, 1670, 1665, 1675], // Starts at 1600, ends at 1675
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    }
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
    {
      label: 'Retailer D',
      data: [260, 360, 310, 460, 410, 560, 510, 610, 660, 760, 710, 860],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'Retailer E',
      data: [280, 380, 330, 480, 430, 580, 530, 630, 680, 780, 730, 880],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Retailer F',
      data: [300, 400, 350, 500, 450, 600, 550, 650, 700, 800, 750, 900],
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
    {
      label: 'Retailer G',
      data: [320, 420, 370, 520, 470, 620, 570, 670, 720, 820, 770, 920],
      borderColor: 'rgba(199, 199, 199, 1)',
      fill: false
    },
    {
      label: 'Retailer H',
      data: [340, 440, 390, 540, 490, 640, 590, 690, 740, 840, 790, 940],
      borderColor: 'rgba(83, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Retailer I',
      data: [360, 460, 410, 560, 510, 660, 610, 710, 760, 860, 810, 960],
      borderColor: 'rgba(255, 99, 71, 1)',
      fill: false
    },
    {
      label: 'Retailer J',
      data: [380, 480, 430, 580, 530, 680, 630, 730, 780, 880, 830, 980],
      borderColor: 'rgba(54, 255, 235, 1)',
      fill: false
    },
    {
      label: 'Retailer K',
      data: [400, 500, 450, 600, 550, 700, 650, 750, 800, 900, 850, 1000],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Retailer L',
      data: [420, 520, 470, 620, 570, 720, 690, 790, 840, 940, 890, 1020],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    }
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
    {
      label: 'Retailer D',
      data: [500, 520, 510, 530, 540, 550, 545, 555, 560, 570, 565, 575], // Starts at 500, ends at 575
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    },
    {
      label: 'Retailer E',
      data: [600, 620, 610, 630, 640, 650, 645, 655, 660, 670, 665, 675], // Starts at 600, ends at 675
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Retailer F',
      data: [700, 720, 710, 730, 740, 750, 745, 755, 760, 770, 765, 775], // Starts at 700, ends at 775
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    },
    {
      label: 'Retailer G',
      data: [800, 820, 810, 830, 840, 850, 845, 855, 860, 870, 865, 875], // Starts at 800, ends at 875
      borderColor: 'rgba(199, 199, 199, 1)',
      fill: false
    },
    {
      label: 'Retailer H',
      data: [900, 920, 910, 930, 940, 950, 945, 955, 960, 970, 965, 975], // Starts at 900, ends at 975
      borderColor: 'rgba(83, 102, 255, 1)',
      fill: false
    },
    {
      label: 'Retailer I',
      data: [1000, 1020, 1010, 1030, 1040, 1050, 1045, 1055, 1060, 1070, 1065, 1075], // Starts at 1000, ends at 1075
      borderColor: 'rgba(255, 99, 71, 1)',
      fill: false
    },
    {
      label: 'Retailer J',
      data: [1100, 1120, 1110, 1130, 1140, 1150, 1145, 1155, 1160, 1170, 1165, 1175], // Starts at 1100, ends at 1175
      borderColor: 'rgba(54, 255, 235, 1)',
      fill: false
    },
    {
      label: 'Retailer K',
      data: [1200, 1220, 1210, 1230, 1240, 1250, 1245, 1255, 1260, 1270, 1265, 1275], // Starts at 1200, ends at 1275
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    },
    {
      label: 'Retailer L',
      data: [1300, 1320, 1310, 1330, 1340, 1350, 1345, 1355, 1360, 1370, 1365, 1375], // Starts at 1300, ends at 1375
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    }
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
            label: 'Nike',
            data: [356, 728, 649, 888, 911, 400, 598, 505, 781, 654, 548, 802],
          },
          {
            label: 'Adidas',
            data: [773, 583, 224, 497, 369, 791, 900, 642, 805, 513, 735, 844],
          },
          {
            label: 'Sony',
            data: [625, 934, 495, 813, 251, 912, 653, 701, 823, 457, 609, 957],
          },
          {
            label: 'Microsoft',
            data: [682, 772, 553, 728, 489, 395, 983, 605, 749, 808, 598, 667],
          },
          {
            label: 'Amazon',
            data: [817, 474, 538, 1000, 613, 798, 804, 653, 573, 902, 623, 738],
          },
          {
            label: 'Tesla',
            data: [592, 643, 378, 567, 958, 887, 435, 781, 623, 813, 705, 827],
          },
          {
            label: 'Coca-Cola',
            data: [535, 783, 453, 883, 659, 724, 907, 494, 584, 765, 898, 665],
          },
          {
            label: 'Pepsi',
            data: [803, 726, 556, 701, 926, 617, 764, 854, 673, 595, 803, 638],
          },
          {
            label: 'Google',
            data: [674, 567, 745, 884, 649, 798, 815, 607, 793, 705, 914, 775],
          },
          {
            label: 'Intel',
            data: [895, 727, 556, 792, 669, 549, 908, 684, 795, 659, 774, 624],
          }
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