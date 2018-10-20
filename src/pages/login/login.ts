import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginMemberPage } from '../login-member/login-member';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  teams: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.getTeams();
  }

  public getTeams() {
    //API GET {URL}/teams
    this.teams = [];
    for (let i = 1; i < 10; i++) {
      const team = {
        _id: i,
        name: 'test' + i
      };
      this.teams.push(team);
    }
  }
  public itemSelected(team) {
    this.navCtrl.push(LoginMemberPage, { team: team });
  }
}
