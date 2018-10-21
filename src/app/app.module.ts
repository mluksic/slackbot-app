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
import { GraphUserShittyPage } from '../pages/graph-user-shitty/graph-user-shitty';
import { KudoPage } from '../pages/kudo/kudo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GraphPage,
    LoginPage,
    LoginMemberPage,
    GraphUserPage,
    GraphUserShittyPage,
    KudoPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GraphPage,
    LoginPage,
    LoginMemberPage,
    GraphUserPage,
    GraphUserShittyPage,
    KudoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
