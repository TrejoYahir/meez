import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TextViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-text-view',
  templateUrl: 'text-view.html',
})
export class TextViewPage {

  private speech: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tts: TextToSpeech) {
    this.speech = {
      locale: 'es-MX',
      text: this.navParams.get('text')
    };
  }

  speak() {
    this.tts.speak(this.speech)
      .then(()=>console.log('he hablado'))
      .catch((reason)=>console.log('oh no, he fallados', reason));
  }

}
