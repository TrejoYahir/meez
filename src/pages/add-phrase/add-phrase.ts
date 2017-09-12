import { Phrase } from './../../data/phrase.interface';
import { ServicesProvider } from './../../providers/services/services';
import { Service } from './../../data/service.interface';
import { Storage } from '@ionic/storage';
import { UserProvider } from './../../providers/user/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the AddPhrasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-phrase',
  templateUrl: 'add-phrase.html',
})
export class AddPhrasePage {

  private userForm: FormGroup;
  private submitAttempt: boolean = false;
  private services: Service[];
  private editMode: boolean = false;
  private phrase: any;
  private title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private storage: Storage, private servicesProvider: ServicesProvider) {
    this.createForm();

    this.editMode = this.navParams.get('edit') ? true : false;    
    this.phrase = this.navParams.get('phrase');
    this.title = this.editMode ? "Editar" : "Añadir";

    if(this.editMode) {
      this.userForm.patchValue({name: this.phrase.name, content: this.phrase.content, category: this.phrase.categoryId});
    }

    this.servicesProvider.getServices()
      .asObservable()
      .subscribe(serviceList => {
        this.services = serviceList;
      });
    
  }

  private createForm() {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required, this.NoWhitespaceValidator])),
      content: new FormControl(null, Validators.compose([Validators.required, this.NoWhitespaceValidator])),
      category: new FormControl(null, Validators.compose([Validators.required]))      
    });
  }

  public NoWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  savePhrase() {
    if(this.editMode) {
      this.editPhrase();
    }
    else {
      this.addPhrase();
    }
  }

  addPhrase() {
    this.submitAttempt = true;
    if(this.userForm.valid) {
      let loader = this.loadingCtrl.create({
        content: "Guardando frase"
      });
      loader.present();
      let data = this.userForm.value;
      let categoryId = this.userForm.value.category;
      delete data.category;
      this.servicesProvider.addPhrase(categoryId, data).then(data => {
        loader.dismiss();
        this.showToast("Frase agregada exitosamente");
        this.navCtrl.popToRoot();
      }).catch(error=>{
        this.showToast("Error al guardar frase (almacenamiento insuficiente)");
      });
    }  
  }

  editPhrase() {
    this.submitAttempt = true;
    if(this.userForm.valid) {
      let loader = this.loadingCtrl.create({
        content: "Guardando cambios"
      });
      loader.present();
      let data = this.userForm.value;
      let categoryId = this.userForm.value.category;
      data.id = this.phrase.id;
      delete data.category;
      this.servicesProvider.editPhrase(this.phrase.categoryId, categoryId, data).then(data => {
        loader.dismiss();
        this.showToast("Frase editada exitosamente");
        this.navCtrl.pop();
      }).catch(error=>{
        this.showToast("Error al guardar frase (almacenamiento insuficiente)");
      });
    }
  }

  addSuccess(response) {    

  }

  addError(response) {
    
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
