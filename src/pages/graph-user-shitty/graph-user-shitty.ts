import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';


@Component({
    selector: 'page-graph-user-shitty',
    templateUrl: 'graph-user-shitty.html'
})
export class GraphUserShittyPage {
    @ViewChild('barCanvas')
    lineCanvas;

    lineChart: any;
    shitNumber: any;
    quotesArray: any[] = [];
    randomQuote: string;
    shittyKudos: any;
    employeeId: any;
    employee: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider
    ) {
        this.employeeId = this.navParams.data.employeeId;
        this.getShitKudos();
        this.quotesArray.push('I just had bad month.');
        this.quotesArray.push('I had to much work, you know hard projects ...');
        this.quotesArray.push('At least I am a good person!');
        this.quotesArray.push('IT WAS NOT A BUG, IT WAS A FEATURE!!!');
        this.quotesArray.push('I want to thank Stack overflow for my degree.');
        this.quotesArray.push('But I !FIXED his problem.');

        // immediately show one random quote;
        this.quotesArray[Math.floor(Math.random() * this.quotesArray.length)];

        setInterval(() => {
            this.randomQuote = this.quotesArray[
                Math.floor(Math.random() * this.quotesArray.length)
            ]; // this'll get the quote depending on your array length
        }, 5000); // needs to be in milliseconds
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GraphUserShittyPage');
        this.getShitNumber();
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

    public getShitNumber() {
        this.getShitKudos();
        this.shitNumber = new Array(5); //First value is number of shitty emoji for one person.
        console.log(this.shitNumber);
    }

    getEmployees = () => {
        this.dataServiceProvider
            .getCollection('employees')
            .subscribe(data => {
                if (data.docs !== undefined) {
                    this.shittyKudos = data;
                }
            });
    }

    getShitKudos = () => {
        this.dataServiceProvider
            .getCollection(
                'employees/' + this.employeeId + '/shit'
            )
            .subscribe(data => {
                if (data !== undefined) {
                    this.shittyKudos = data;
                    this.shitNumber = new Array(this.shittyKudos.length);
                } else {
                    this.shittyKudos = null;
                }
            });
    }

    getIconForValue = (value) => {
        switch (value) {
            case 1:
                return 'ios-nutrition-outline';
            case 2:
                return 'ios-pizza-outline';
            case 3:
                return 'ios-trophy-outline';
        }
    }
}
