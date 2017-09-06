import { UserProvider } from './../providers/user/user';
import { Storage } from '@ionic/storage';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild('content') nav: NavController;

  registerPage:any = RegisterPage;
  loginPage:any = LoginPage;
  loggedIn:boolean = false;
  user: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private storage: Storage, private userProvider: UserProvider, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      userProvider.isLoggedIn()
        .asObservable()
        .subscribe(state => {
          this.loggedIn = state;     
        });
      
      userProvider.getUser()
        .asObservable()
        .subscribe(user => {
          this.user = user;     
        });
        
      storage.get('loggedIn').then(status => {
        let logged = status ? true : false;
        userProvider.setLoggedIn(logged);
        if(logged) {
          this.storage.get('user').then((user)=>{
            userProvider.setUser(user);
          })
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page);
    this.menuCtrl.close();
  }

  askLogout() {
    let prompt = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cerrar sesión',
          handler: this.logout
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    prompt.present();
  }

  logout() {
    this.storage.clear();
    this.userProvider.setLoggedIn(false);
    this.userProvider.setUser(null);
    this.menuCtrl.close();    
    this.nav.popToRoot();
    this.showToast('Se ha cerrado la sesión');
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}

