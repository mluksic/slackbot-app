import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';
import { GraphUserPage } from '../graph-user/graph-user';

@Component({
    selector: 'page-login-member',
    templateUrl: 'login-member.html'
})
export class LoginMemberPage {
    members: any;
    team: any;
    empty = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public dataServiceProvider: DataServiceProvider
    ) {
        this.team = this.navParams.data.team;
    }

    ionViewDidLoad = () => {
        this.getTeamMembers(this.team);
    }

    ionViewWillEnter = () => {
        this.menuCtrl.enable(false);
    }

    ionViewWillLeave = () => {
        this.menuCtrl.enable(true);
    }

    getTeamMembers = (team) => {
        this.dataServiceProvider
            .getCollection('teams/' + team._id + '/members')
            .subscribe(data => {
                if (data !== undefined) {
                    this.members = data;
                    this.empty = false;
                } else {
                    this.members = null;
                    this.empty = true;
                }
            });
    }

    goToHomePage = (member) => {
        this.navCtrl.setRoot(GraphUserPage, {
            member: member
        });
    }
}
