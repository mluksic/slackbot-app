import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KudoPage } from './kudo';

@NgModule({
  declarations: [
    KudoPage,
  ],
  imports: [
    IonicPageModule.forChild(KudoPage),
  ],
})
export class KudoPageModule {}
