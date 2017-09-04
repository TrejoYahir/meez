import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhraseListPage } from './phrase-list';

@NgModule({
  declarations: [
    PhraseListPage,
  ],
  imports: [
    IonicPageModule.forChild(PhraseListPage),
  ],
})
export class PhraseListPageModule {}
