import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';
import { Chart } from 'chart.js';

@Component({
    selector: 'page-team',
    templateUrl: 'team.html',
})
export class TeamPage {
    @ViewChild('barCanvas')
    barCanvas;

    team: any;
    teamMembers: any;
    teamScores: any;
    teamScoresPlain = [];
    barChart: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider
    ) {
        this.team = window.localStorage.getItem('team');
        if (this.team !== undefined) {
            this.getTeamMembers();
        }
    }

    getTeamMembers = () => {
        this.dataServiceProvider
            .getItem(
                'teams',
                this.team + '/members'
            )
            .subscribe(data => {
                if (data !== undefined) {
                    console.log(data);
                    this.teamMembers = data.map((member) => {
                        return member.firstName + ' ' + member.lastName;
                    });
                    this.getTeamScores();
                } else {
                    this.teamMembers = null;
                }
            });
    }

    getTeamScores = () => {
        this.dataServiceProvider
            .getCollection(
                'scoring/employees?team=' + this.team
            )
            .subscribe(data => {
                if (data !== undefined) {
                    console.log(data);
                    this.teamScores = data;
                    console.log(this.teamScores, 'team-scores');
                    this.teamScoresPlain = data.map((member) => {
                        return member.totalValue;
                    });
                    console.log(this.teamScoresPlain, 'before');

                    console.log(this.teamScoresPlain, 'plain team');
                    this.getTeamsGraph();
                } else {
                    this.teamScores = null;
                }
            });
    }

    getTeamsGraph = () => {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: this.teamMembers,
                datasets: [
                    {
                        label: '# of Kudos',
                        data: this.teamScoresPlain,
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
