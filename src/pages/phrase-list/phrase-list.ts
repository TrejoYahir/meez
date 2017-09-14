import { QuickTextPage } from './../quick-text/quick-text';
import { TextViewPage } from './../text-view/text-view';
import { Phrase } from './../../data/phrase.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhraseListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phrase-list',
  templateUrl: 'phrase-list.html',
})
export class PhraseListPage {

  private phrases: Phrase[];
  private title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.phrases = this.navParams.get('phrases');
    this.title = this.navParams.get('title');
    console.log(this.phrases);    
  }

  goToQuickText() {
    this.navCtrl.push(QuickTextPage);
  }

  showText(phrase) {
    this.navCtrl.push(TextViewPage, {
      'text': phrase.content
    }); 
  }
  

}
