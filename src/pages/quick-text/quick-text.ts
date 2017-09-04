import { TextViewPage } from './../text-view/text-view';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuickTextPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quick-text',
  templateUrl: 'quick-text.html',
})
export class QuickTextPage {

  private text: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickTextPage');
  }

  showText(form) {
    if(form.valid) {
      this.navCtrl.push(TextViewPage, {
        'text': this.text
      });
    }   
  }

}
