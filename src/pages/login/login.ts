import { Storage } from '@ionic/storage';
import { RegisterPage } from './../register/register';
import { UserProvider } from './../../providers/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userForm: FormGroup;
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private storage: Storage) {
    this.createForm();
    console.log(this.userForm);    
  }

  private createForm() {
    this.userForm = new FormGroup({
      correo: new FormControl(null, Validators.compose([Validators.required, Validators.email])),      
      contra: new FormControl(null, Validators.compose([Validators.required]))     
    });
  }

  login() {
    this.submitAttempt = true;
    console.log("form", this.userForm);
    if(this.userForm.valid) {
      let loader = this.loadingCtrl.create({
        content: "Iniciando sesión"
      });
      loader.present();
      let data = this.userForm.value;
      this.userProvider.login(data).subscribe((response) => {
        console.log("login", response);
        
        loader.dismiss();
        this.showToast(response.Mensaje);
        if(response.Success!=null && response.Success == false)
          this.loginError(response);
        else
          this.loginSuccess(response);
      }, (error) => {
        loader.dismiss(); 
        this.showToast("Ocurrió un error en el servidor, intenta más tarde");        
        console.log("error", error);        
      });
    }  
  }

  loginSuccess(response) {    

    let user = {
      nombre: response.Nombre,
      apellidos: response.Apellidos,
      correo: this.userForm.value.correo
    }
    
    this.showToast("Bienvenido, " + user.nombre);    
    
    this.storage.set('loggedIn', true);
    this.userProvider.setLoggedIn(true);

    this.userProvider.setUser(user);
    this.storage.set('user', user)
      .then((data)=>{
        this.userForm.reset();
        this.navCtrl.popToRoot();
      })
      .catch((error)=>{
        console.log(error);      
      });
  }

  loginError(response) {
    
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  goToHome() {
    this.navCtrl.popToRoot();
  }

}
