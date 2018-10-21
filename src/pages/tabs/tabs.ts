import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmployeesPage } from '../employees/employees';
import { GraphUserPage } from '../graph-user/graph-user';
import { Tabs } from 'ionic-angular/umd/navigation/nav-interfaces';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    @ViewChild('myTabs') tabRef: Tabs;

    tab1Root = EmployeesPage;
    tab2Root = GraphUserPage;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
    }

    ionViewDidEnter() {
        this.tabRef.select(2, {}, false);
    }

}
