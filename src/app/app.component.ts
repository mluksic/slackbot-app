import { Component, ViewChild } from '@angular/core';
import { Platform, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DataServiceProvider } from './providers/data-service/data-service';
import { LoginMemberPage } from '../pages/login-member/login-member';
import { GraphUserPage } from '../pages/graph-user/graph-user';
import { TeamPage } from '../pages/team/team';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = LoginPage;

    managerPages: Array<{ title: any, component: any, icon: any }>;
    teamLeadPages: Array<{ title: any, component: any, icon: any }>;
    userPages: Array<{ title: any, component: any, icon: any }>;

    constructor(
        public events: Events,
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        public dataService: DataServiceProvider
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            if (this.dataService.isLoggedIn()) {
                let role = this.dataService.getCurrentRole();
                this.events.publish('user:login', role);
            } else {
                this.events.publish('user:logout');
            }
        });

        this.listenToEvents();

        this.managerPages = [
            { title: "Leaderboards", component: LoginMemberPage, icon: 'paper' },
            // { title: "Teams", component: TeamsPage, icon: 'bicycle' },
        ];

        this.teamLeadPages = [
            { title: "Leaderboards", component: GraphUserPage, icon: 'paper' },
            { title: "Teams", component: TeamPage, icon: 'bicycle' },
        ];

        this.userPages = [
            { title: "Leaderboards", component: GraphUserPage, icon: 'paper' },
            { title: "Team", component: TeamPage, icon: 'bicycle' },
        ];
    }

    listenToEvents = () => {
        this.events.subscribe('user:login', (role) => {
            if (role !== undefined) {
                this.nav.setRoot(GraphUserPage);
            } else {
                this.nav.setRoot(LoginMemberPage);
            }
        });

        this.events.subscribe('user:logout', () => {
            window.localStorage.clear();
            this.nav.setRoot(LoginPage);
        });
    }

    openPage = page => {
        this.nav.setRoot(page.component);
    }
}
