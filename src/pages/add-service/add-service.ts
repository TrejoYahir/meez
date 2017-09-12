import { Service } from './../../data/service.interface';
import { ServicesProvider } from './../../providers/services/services';
import { Storage } from '@ionic/storage';
import { UserProvider } from './../../providers/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the AddServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {

  private userForm: FormGroup;
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private storage: Storage, private servicesProvider: ServicesProvider) {
    this.createForm();
  }

  private createForm() {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required, this.NoWhitespaceValidator])),     
    });
  }

  public NoWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  addService() {
    this.submitAttempt = true;
    console.log("form", this.userForm);
    if(this.userForm.valid) {
      let loader = this.loadingCtrl.create({
        content: "Guardando servicio"
      });
      loader.present();
      let id = this.servicesProvider.getLastId() + 1;
      let service: Service = {
        id: id,
        name: this.userForm.value.name,
        phrases: []
      }
      this.servicesProvider.addService(service).then((data) => {
        console.log(this.servicesProvider.getServices()); 
        loader.dismiss();
        this.navCtrl.popToRoot();       
        this.showToast("Servicio guardado correctamente");
      }).catch(error=>{
        loader.dismiss();        
        this.showToast("Error interno (almacenamiento insuficiente)");
      });
    }  
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
