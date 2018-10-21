import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GraphPage } from '../pages/graph/graph';
import { LoginPage } from '../pages/login/login';
import { LoginMemberPage } from '../pages/login-member/login-member';
import { GraphUserPage } from '../pages/graph-user/graph-user';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceProvider } from './providers/data-service/data-service';
import { HttpModule } from '@angular/http';
import { EmployeesPage } from '../pages/employees/employees';
import { TeamPage } from '../pages/team/team';
import { EmployeePage } from '../pages/employee/employee';
import { GraphUserShittyPage } from '../pages/graph-user-shitty/graph-user-shitty';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        GraphPage,
        LoginPage,
        LoginMemberPage,
        GraphUserPage,
        EmployeesPage,
        TeamPage,
        EmployeePage,
        GraphUserShittyPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        GraphPage,
        LoginPage,
        LoginMemberPage,
        GraphUserPage,
        EmployeesPage,
        TeamPage,
        EmployeePage,
        GraphUserShittyPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        DataServiceProvider,
    ]
})
export class AppModule { }
