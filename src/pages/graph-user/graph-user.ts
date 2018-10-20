import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the GraphUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graph-user',
  templateUrl: 'graph-user.html'
})
export class GraphUserPage {
  @ViewChild('barCanvas')
  lineCanvas;

  lineChart: any;
  kudosNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraphUserPage');
    this.getUserGraph();
    this.getKudosNumber();
    //console.log();
  }

  public getUserGraph() {
    // API GET /member/kudos
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: '',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false
          }
        ]
      }
    });
  }

  public getKudosNumber() {
    //
    this.kudosNumber = {
      carrotNumber: 1,
      pizzaNumber: 2,
      trophyNumber: 3,
      shitNumber: 1
    };
    console.log(this.kudosNumber.shitNumber);
  }
}
