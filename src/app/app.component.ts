import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GraphPage } from '../pages/graph/graph';
import { LoginPage } from '../pages/login/login';
import { LoginMemberPage } from '../pages/login-member/login-member';
import { GraphUserPage } from '../pages/graph-user/graph-user';
import { GraphUserShittyPage } from '../pages/graph-user-shitty/graph-user-shitty';
import { KudoPage } from '../pages/kudo/kudo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = KudoPage;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
