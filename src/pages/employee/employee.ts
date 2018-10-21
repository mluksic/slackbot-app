import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';

@Component({
    selector: 'page-employee',
    templateUrl: 'employee.html',
})
export class EmployeePage {

    employee: any;
    memberKudos: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider
    ) {
        this.employee = this.navParams.data.employee;
        this.getKudosForUser();
    }

    getKudosForUser = () => {
        this.dataServiceProvider
            .getCollection(
                'employees/' + this.employee._id + '/kudos'
            )
            .subscribe(data => {
                if (data !== undefined) {
                    this.memberKudos = data;
                    console.log(this.memberKudos, 'kudos for member');
                } else {
                    this.memberKudos = null;
                }
            });
    }

}
