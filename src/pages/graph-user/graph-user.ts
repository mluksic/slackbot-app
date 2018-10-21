import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';
import { TeamPage } from '../team/team';

@Component({
    selector: 'page-graph-user',
    templateUrl: 'graph-user.html'
})
export class GraphUserPage {
    @ViewChild('barCanvas')
    barCanvas;

    lineChart: any;
    barChart: any;
    member: any;
    currentRole: any;
    teams: any;
    teamScores: any;
    teamScoresPlain: any;
    lastKudos: any;

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

    getTeamsScore = (params = '') => {
        this.dataServiceProvider
            .getCollection('scoring/teams')
            .subscribe(data => {
                if (data !== undefined) {
                    this.teamScores = data;
                    this.teamScoresPlain = data.map((team) => {
                        return team.totalValue;
                    });
                    this.getTeamsGraph();
                    this.getLastTenKudos();
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

    getLastTenKudos = () => {
        this.dataServiceProvider
            .getCollection('scoring/lastKudos')
            .subscribe(data => {
                if (data !== undefined) {
                    this.lastKudos = data;
                    console.log(this.lastKudos);
                } else {
                    this.lastKudos = null;
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

    getTeamsScoreWithParams = (params) => {
        this.dataServiceProvider
            .getCollection('scoring/teams?' + params)
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
}
