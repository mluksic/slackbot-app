import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html'
})
export class GraphPage {
  @ViewChild('barCanvas')
  barCanvas;
  @ViewChild('doughnutCanvas')
  doughnutCanvas;
  @ViewChild('lineCanvas')
  lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  lastKudos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.getLastKudos();
  }

  getLastKudos = () => {
    //API GET {URL}/kudos
    this.lastKudos = [];
    for (let i = 1; i < 10; i++) {
      const kudos = {
        _id: i,
        sender: '@sender' + i,
        receiver: '@receiver' + i,
        message: 'traalala',
        approved: 0,
        createdAt: '2018-10-20 23:47:17.58',
        value: this.getKudosIcon(1)
      };
      this.lastKudos.push(kudos);
    }
  };
  getKudosIcon = value => {
    switch (value) {
      case 1:
        return 'ios-nutrition-outline';
      case 2:
        return 'ios-pizza-outline';
      case 3:
        return 'ios-trophy-outline';
    }
  };
}
