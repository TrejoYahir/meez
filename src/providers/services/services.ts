import { Storage } from '@ionic/storage';
import { Service } from './../../data/service.interface';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import serviceList from '../../data/services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  private services = new BehaviorSubject<Service[]>(null);
  

  constructor(private storage: Storage) {
  }

  getServices() {
    return this.services;
  }

  setServices(serviceList) {
    console.log("servicelist changed", serviceList);
    
    this.services.next(serviceList);
  }

  saveLocal(serviceList: Service[]) {
    return this.storage.set('services', serviceList);
  }

  addService(service: Service) {
    let list = this.services.value;
    list.push(service);
    return this.saveLocal(list);
  }

  deleteService(id) {
    let serviceList = this.services.value.filter(x => x.id != id);
    this.setServices(serviceList);
    return this.saveLocal(serviceList);    
  }

  getLastId(){
    return (this.services.value.length > 0) ? Math.max.apply(Math, this.services.value.map((x) => {return x.id})) : 0;    
  }

  addPhrase(categoryId, phrase) {
    let serviceList = this.services.value;
    let category = serviceList.find(x => x.id == categoryId); 
    let phraseList = category.phrases;
    let id = (phraseList.length > 0) ? (Math.max.apply(Math, phraseList.map((x) => {return x.id})) + 1) : 1;
    phrase.id = id;
    phraseList.push(phrase);
    category.phrases = phraseList;
    serviceList = serviceList.map((x) => x.id == categoryId ? category : x);
    this.setServices(serviceList);
    return this.saveLocal(serviceList);
  }

  editPhrase(priorId, categoryId, phrase) {   

    let serviceList = this.services.value;
    let category = serviceList.find(x => x.id == categoryId); 
    let phraseList = category.phrases;

    let priorCategory;
    let priorList;    

    if(priorId != categoryId) {
      priorCategory = serviceList.find(x => x.id == priorId); 
      priorList = priorCategory.phrases;
      priorList = priorList.filter(x => x.id != phrase.id);
      priorCategory.phrases = priorList;
      serviceList = serviceList.map((x) => x.id == priorId ? priorCategory : x);

      delete phrase.id;
      return this.addPhrase(categoryId, phrase);
    }    
    else {
      phraseList = phraseList.map((x)=>x.id == phrase.id ? phrase : x);  
      category.phrases = phraseList;    
      serviceList = serviceList.map((x) => x.id == categoryId ? category : x);
      this.setServices(serviceList);
      return this.saveLocal(serviceList);
    }
    
  }

  deletePhrase(categoryId, phrase) {
    let serviceList = this.services.value;
    let category = serviceList.find(x => x.id == categoryId); 
    let phraseList = category.phrases;

    phraseList = phraseList.filter(x => x.id != phrase.id);
    category.phrases = phraseList;
    serviceList = serviceList.map((x) => x.id == categoryId ? category : x);
    this.setServices(serviceList);
    return this.saveLocal(serviceList);
  }

}
