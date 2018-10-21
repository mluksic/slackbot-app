import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../app/providers/data-service/data-service';

@Component({
    selector: 'page-employee',
    templateUrl: 'employee.html',
})
export class EmployeePage {

    employeeId: any;
    memberKudos: any;
    kudosNumber: any;
    employee: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public dataServiceProvider: DataServiceProvider
    ) {
        this.employeeId = this.navParams.data.employeeId;
        this.getKudosNumber();
    }

    getKudosNumber = () => {
        this.dataServiceProvider
            .getCollection(
                'employees/' + this.employeeId + '/kudos'
            )
            .subscribe(data => {
                if (data !== undefined) {
                    this.memberKudos = data;
                    this.getEmployee();
                } else {
                    this.memberKudos = null;
                }
            });
    }

    getEmployee = () => {
        this.dataServiceProvider
            .getCollection(
                'employees/' + this.employeeId
            )
            .subscribe(data => {
                if (data !== undefined) {
                    this.employee = data;
                } else {
                    this.employee = null;
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

}
