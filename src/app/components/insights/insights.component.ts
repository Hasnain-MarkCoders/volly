import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
 
 
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent   {
  title = 'ng-chart';
  chart: any = [];
   DATA_COUNT = 7;
   NUMBER_CFG = {count: this.DATA_COUNT, min: 0, max: 1000};
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
      },
    });
  }
}