import { PhraseListPage } from './../phrase-list/phrase-list';
import { Service } from './../../data/service.interface';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import services from '../../data/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  services: Service[];

  constructor(public navCtrl: NavController) {
    this.services = services;
    console.log(this.services);    
  }

  goToQuickText() {
    this.navCtrl.push('QuickTextPage');
  }

  showPhrases(service) {
    this.navCtrl.push(PhraseListPage, {'phrases': service.phrases, 'title': service.name});
  }

}
