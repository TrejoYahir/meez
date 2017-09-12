import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePhraseListPage } from './manage-phrase-list';

@NgModule({
  declarations: [
    ManagePhraseListPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePhraseListPage),
  ],
})
export class ManagePhraseListPageModule {}
