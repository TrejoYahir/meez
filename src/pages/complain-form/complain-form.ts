import { Service } from './../../data/service.interface';
import { ServicesProvider } from './../../providers/services/services';
import { UserProvider } from './../../providers/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ComplainFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-form',
  templateUrl: 'complain-form.html',
})
export class ComplainFormPage {

  
  private userForm: FormGroup;
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private servicesProvider: ServicesProvider, private alertCtrl: AlertController) {
    this.createForm();
  }

  private createForm() {
    this.userForm = new FormGroup({
      complain: new FormControl(null, Validators.compose([Validators.required, this.NoWhitespaceValidator, Validators.maxLength(140)])),     
    });
  }

  public NoWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  addComplain() {
    this.submitAttempt = true;
    console.log("form", this.userForm);
    if(this.userForm.valid) {
      let alert = this.alertCtrl.create({
        title: "Enviar queja o sugerencia",
        message: "¿Está seguro que desea enviarlo?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Enviar",
            handler: ()=>{
              let loader = this.loadingCtrl.create({
                content: "Enviando..."
              });
              loader.present();
              this.userProvider.sendComplain(this.userForm.value.complain).subscribe(data=>{
                console.log(data);                
                loader.dismiss();
                this.showToast("Enviado con éxito, gracias por su opinión");
                this.navCtrl.popToRoot();
              }, (error)=>{
                console.log(error);                
                loader.dismiss();
                this.showToast("No hay conexión a internet");
              });
            }
          }
        ]
      });
      alert.present();
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
