import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';

@Component({
    selector: 'page-employees',
    templateUrl: 'employees.html',
})
export class EmployeesPage {
    @ViewChild('barCanvas')
    barCanvas;

    employees: any;
    employeeScore: any;
    barChart: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider
    ) {
    }

    switchTabs() {
        this.navCtrl.parent.select(2);
    }

    ionViewDidLoad = () => {
        this.getEmployees();
    }

    getEmployeeScores = () => {
        this.dataServiceProvider
            .getCollection('scoring/employees')
            .subscribe(data => {
                if (data !== undefined) {
                    this.employeeScore = data;
                    this.getEmployeesGraph();
                } else {
                    this.employeeScore = null;
                }
            });
    }

    getEmployees = () => {
        this.dataServiceProvider
            .getCollection('employees')
            .subscribe(data => {
                if (data !== undefined) {
                    this.employees = data;
                    this.getEmployeeScores();
                } else {
                    this.employeeScore = null;
                }
            });
    }

    getEmployeesGraph = () => {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: this.employees,
                datasets: [
                    {
                        label: '# of Kudos',
                        data: [12, 19],
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
    }

}
