import { UserProvider } from './../../providers/user/user';
import { PasswordValidation } from './../../validators/password';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  private userForm: FormGroup;
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.createForm();
    console.log(this.userForm);
    
  }

  private createForm() {
    this.userForm = new FormGroup({
      nombre: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zñáéíóúüÑÁÉÍÓÚÜ\s]+$/i), this.NoWhitespaceValidator])),
      apellidos: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zñáéíóúüÑÁÉÍÓÚÜ\s]+$/i), this.NoWhitespaceValidator])),
      correo: new FormControl(null, Validators.compose([Validators.required, Validators.email])),      
      contra: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(4)])),
      confirm: new FormControl(null, Validators.compose([Validators.required]))      
    }, PasswordValidation.MatchPassword);
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  public NoWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  register() {
    this.submitAttempt = true;
    console.log("form", this.userForm);
    if(this.userForm.valid) {
      let loader = this.loadingCtrl.create({
        content: "Registrando usuario"
      });
      loader.present();
      let data = this.userForm.value;
      delete data.confirm;
      this.userProvider.registerUser(data).subscribe((response) => {
        loader.dismiss();
        console.log("success", response);
        this.showToast(response.Mensaje);
        if(response.Success)
          this.registerSuccess(response);
        else
          this.registerError(response);
      }, (error) => {
        loader.dismiss(); 
        this.showToast("Ocurrió un error en el servidor, intenta más tarde");        
        console.log("error", error);        
      });
    }  
  }

  registerSuccess(response) {    
    let data = {
      correo: this.userForm.value.correo,
      contra: this.userForm.value.contra     
    }
    const loader = this.loadingCtrl.create({
      content: "Iniciando sesión"
    });
    loader.present();
    this.userProvider.login(data).subscribe((response)=>{
      console.log("login", response);      
      loader.dismiss();
      this.showToast(response.Mensaje);
    }, (error)=>{
      loader.dismiss();      
      this.showToast("Ocurrió un error en el servidor");              
    });
  }

  registerError(response) {
    
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
