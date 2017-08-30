import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickTextPage } from './quick-text';

@NgModule({
  declarations: [
    QuickTextPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickTextPage),
  ],
})
export class QuickTextPageModule {}
