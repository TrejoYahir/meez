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
  private playing: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tts: TextToSpeech) {
    this.speech = {
      locale: 'es-MX',
      text: this.navParams.get('text')
    };
  }

  ionViewWillUnload(){
    if(this.playing) {
      this.stopPhrase();
    }
  }

  playPhrase() {
    this.playing = true;
    this.tts.speak(this.speech)
      .then(() => {
        this.playing = false;
        console.log('he hablado')
      })
      .catch((reason )=> {
        this.playing = false;        
        console.log('oh no, he fallados', reason)
      });
  }

  stopPhrase() {
    this.tts.speak('')
    .then(() => {
      this.playing = false;        
    })
    .catch((reason)=>{
      console.log('oh no, he fallados', reason)          
    });
  }

  speak() {
    if(!this.playing) {
      this.playPhrase();
    }
    else {
      this.stopPhrase();
    }
  }

}
