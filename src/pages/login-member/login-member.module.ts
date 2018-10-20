import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginMemberPage } from './login-member';

@NgModule({
  declarations: [
    LoginMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginMemberPage),
  ],
})
export class LoginMemberPageModule {}
