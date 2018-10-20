import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphUserPage } from './graph-user';

@NgModule({
  declarations: [
    GraphUserPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphUserPage),
  ],
})
export class GraphUserPageModule {}
