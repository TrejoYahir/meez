import { QuickTextPage } from './../quick-text/quick-text';
import { ServicesProvider } from './../../providers/services/services';
import { PhraseListPage } from './../phrase-list/phrase-list';
import { Service } from './../../data/service.interface';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  services: Service[];

  constructor(public navCtrl: NavController, private servicesProvider: ServicesProvider) {    
    servicesProvider.getServices()
    .asObservable()
    .subscribe(serviceList => {
      this.services = serviceList;     
    });
  }

  goToQuickText() {
    this.navCtrl.push(QuickTextPage);
  }

  showPhrases(service) {
    this.navCtrl.push(PhraseListPage, {'phrases': service.phrases, 'title': service.name});
  }

}
