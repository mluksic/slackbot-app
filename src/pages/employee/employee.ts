import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-employee',
    templateUrl: 'employee.html',
})
export class EmployeePage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EmployeePage');
    }

}
