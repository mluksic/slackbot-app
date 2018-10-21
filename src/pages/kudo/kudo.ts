import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KudoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kudo',
  templateUrl: 'kudo.html'
})
export class KudoPage {
  kudo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KudoPage');
    this.getKudos();
  }
  getKudos = () => {
    this.kudo = {
      _id: 1,
      sender: '@alojz',
      receiver: '@marjana',
      message: '',
      createdAt: '21. 10. 2018, 12:30',
      value: this.getKudosIcon(0)
    };
  };

  getKudosIcon = value => {
    switch (value) {
      case 0:
        return 'shit';
      case 1:
        return 'ios-nutrition-outline';
      case 2:
        return 'ios-pizza-outline';
      case 3:
        return 'ios-trophy-outline';
    }
  };
}
