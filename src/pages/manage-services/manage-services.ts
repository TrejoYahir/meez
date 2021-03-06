import { ServicesProvider } from './../../providers/services/services';
import { Service } from './../../data/service.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ManageServicesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-services',
  templateUrl: 'manage-services.html',
})
export class ManageServicesPage {

  services: Service[];
  
  constructor(public navCtrl: NavController, private servicesProvider: ServicesProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {   
    servicesProvider.getServices()
    .asObservable()
    .subscribe(serviceList => {
      this.services = serviceList;     
    });
  }

  deleteService(service) {
    let prompt = this.alertCtrl.create({
      title: '¿Está seguro que desea eliminar el servicio?',
      message: 'Se eliminará el servicio "' + service.name + '" y todas sus frases',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Eliminar",
          handler: ()=> {                       
            this.servicesProvider.deleteService(service.id).then(()=>{
              this.showToast("El servicio fue eliminado");
            }).catch(()=>{
              this.showToast("Error interno (Conexión de BBDD)");
            });            
          }
        }
      ]
    });

    prompt.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
