import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainFormPage } from './complain-form';

@NgModule({
  declarations: [
    ComplainFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainFormPage),
  ],
})
export class ComplainFormPageModule {}
