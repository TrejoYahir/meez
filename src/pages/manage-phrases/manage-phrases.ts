import { ManagePhraseListPage } from './../manage-phrase-list/manage-phrase-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPhrasePage } from '../add-phrase/add-phrase';

/**
 * Generated class for the ManagePhrasesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-phrases',
  templateUrl: 'manage-phrases.html',
})
export class ManagePhrasesPage {

  addPhrasePage = AddPhrasePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  deletePhrases() {
    this.navCtrl.push(ManagePhraseListPage, {delete: true});
  }

  editPhrases() {
    this.navCtrl.push(ManagePhraseListPage, {edit: true});
  }

}
