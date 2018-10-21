import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';
import { EmployeesPage } from '../employees/employees';
import { TeamPage } from '../team/team';

@Component({
    selector: 'page-graph-user',
    templateUrl: 'graph-user.html'
})
export class GraphUserPage {
    @ViewChild('barCanvas')
    barCanvas;

    tab1Root = EmployeesPage;

    lineChart: any;
    barChart: any;
    member: any;
    currentRole: any;
    teams: any;
    teamScores: any;
    teamScoresPlain: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider
    ) {
        this.member = this.navParams.data.member;
        this.getRoleForCurrentMember(this.member);
    }

    ionViewDidLoad() {
        this.getTeams();
    }

    getTeams = () => {
        this.dataServiceProvider
            .getCollection('teams')
            .subscribe(data => {
                if (data.docs !== undefined) {
                    this.teams = data.docs.map((team) => {
                        return team.name;
                    });
                    this.getTeamsScore();
                } else {
                    this.teams = null;
                }
            });
    }

    getTeamsScore = () => {
        this.dataServiceProvider
            .getCollection('scoring/teams')
            .subscribe(data => {
                if (data !== undefined) {
                    this.teamScores = data;
                    this.teamScoresPlain = data.map((team) => {
                        return team.totalValue;
                    });
                    this.getTeamsGraph();
                } else {
                    this.teams = null;
                }
            });
    }

    getTeamsGraph = () => {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: this.teams,
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

    getRoleForCurrentMember = (member) => {
        if (member !== undefined) {
            this.dataServiceProvider
                .getItem('roles', member.role)
                .subscribe(data => {
                    if (data.name !== undefined) {
                        this.currentRole = data.name;
                        this.setLocalStorage(
                            this.currentRole,
                            this.member.email,
                            this.member.team
                        );
                    }
                });
        }
    }

    setLocalStorage = (role, username, team) => {
        window.localStorage.setItem('role', role);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('team', team);
    }

    goToTeam = (team) => {
        this.navCtrl.push(TeamPage, {
            team: team
        });
    }
}
