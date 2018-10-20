import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-member',
  templateUrl: 'login-member.html'
})
export class LoginMemberPage {
  members: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginMemberPage');
    this.getMembers();
  }
  public getMembers() {
    //API GET/teams/id/members
    this.members = ['Janez Novek', 'Marjana Novek'];
  }
}
