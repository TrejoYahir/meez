import { Service } from './../data/service.interface';
import { ComplainFormPage } from './../pages/complain-form/complain-form';
import { ManageServicesPage } from './../pages/manage-services/manage-services';
import { ManagePhrasesPage } from './../pages/manage-phrases/manage-phrases';
import { ServicesProvider } from './../providers/services/services';
import { AddPhrasePage } from './../pages/add-phrase/add-phrase';
import { AddServicePage } from './../pages/add-service/add-service';
import { UserProvider } from './../providers/user/user';
import { Storage } from '@ionic/storage';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import services from '../data/services';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild('content') nav: NavController;

  registerPage:any = RegisterPage;
  loginPage:any = LoginPage;
  addService:any = AddServicePage;
  addPhrase: any = AddPhrasePage;
  manageServices:any = ManageServicesPage;
  managePhrases:any = ManagePhrasesPage;
  complainPage: any = ComplainFormPage;

  loggedIn:boolean = false;
  user: any;
  serviceList: Service[];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private storage: Storage, private userProvider: UserProvider, private toastCtrl: ToastController, private alertCtrl: AlertController, private servicesProvider: ServicesProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      //check if user is logged in
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

      servicesProvider.getServices()
        .asObservable()
        .subscribe(serviceList => {
          this.serviceList = serviceList;     
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

      //check if user has custom services
      this.storage.get('services').then((serviceList)=>{
        if(serviceList != null && serviceList.length > 0) {
          this.storage.get('services').then((serviceList)=>{
            this.servicesProvider.setServices(serviceList);
          });
        }
        else {
          this.servicesProvider.setServices(services);
        }
      })

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
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.servicesProvider.setServices(services);            
            this.storage.clear();
            this.userProvider.setLoggedIn(false);
            this.userProvider.setUser(null);
            this.menuCtrl.close();    
            this.showToast('Ha cerrado sesión');            
            this.nav.popToRoot();
          }
        }
      ]
    });
    prompt.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  saveOnline() {
    let data = {
      correo: this.user.correo,
      contenido: JSON.stringify(this.serviceList)
    };
    console.log(data);    
    this.userProvider.saveOnline(data).subscribe((data)=>{
      console.log(data);      
      this.showToast("Tus frases y servicios se han guardado en linea");
    }, (error)=>{
      console.log(error);      
      this.showToast("No hay conexión a internet");
    });
    this.menuCtrl.close();
  }

}

