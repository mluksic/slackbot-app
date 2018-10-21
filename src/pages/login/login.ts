import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginMemberPage } from '../login-member/login-member';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    teams: any;
    selectedTeam: any;
    empty = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider,
        public menuCtrl: MenuController
    ) { }

    ionViewDidLoad = () => {
        this.getTeams();
    }

    ionViewWillEnter = () => {
        this.menuCtrl.enable(false);
    }

    ionViewWillLeave = () => {
        this.menuCtrl.enable(true);
    }

    getTeams = () => {
        this.dataServiceProvider
            .getCollection('teams')
            .subscribe(data => {
                if (data !== undefined) {
                    this.teams = data;
                    this.empty = false;
                } else {
                    this.teams = null;
                    this.empty = true;
                }
            });
    }

    itemSelected = (team) => {
        this.navCtrl.push(LoginMemberPage, { team: team });
    }

    compareFn(e1, e2): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }
}
