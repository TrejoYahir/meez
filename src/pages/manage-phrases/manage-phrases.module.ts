import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePhrasesPage } from './manage-phrases';

@NgModule({
  declarations: [
    ManagePhrasesPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePhrasesPage),
  ],
})
export class ManagePhrasesPageModule {}
