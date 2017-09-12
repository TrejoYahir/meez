import { AddPhrasePage } from './../add-phrase/add-phrase';
import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Service } from "../../data/service.interface";

/**
 * Generated class for the PhraseListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'manage-page-phrase-list',
  templateUrl: 'manage-phrase-list.html',
})
export class ManagePhraseListPage {

  private editMode:boolean = false;
  private deleteMode:boolean = false;
  private title: string;
  private serviceList: Service[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicesProvider: ServicesProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.deleteMode = this.navParams.get('delete');
    this.editMode = this.navParams.get('edit');
    this.title = this.deleteMode ? "Eliminar" : "Editar";
    this.servicesProvider.getServices().asObservable().subscribe(serviceList => {
      this.serviceList = serviceList;
    });
  }

  editPhrase(phrase, categoryId) {
    phrase.categoryId = categoryId;
    this.navCtrl.push(AddPhrasePage, {edit: true, phrase: phrase});
  }

  deletePhrase(phrase, categoryId) {
    let alert = this.alertCtrl.create({
      title: "Eliminar servicio",
      message: "¿Seguro que deseas eliminar la frase '" + phrase.name + "'?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Eliminar",
          handler: ()=> {
            this.servicesProvider.deletePhrase(categoryId, phrase).then(()=>{
              this.showToast("La frase fue eliminada.");
            }).catch(()=>{
              this.showToast("Error interno (Conexión a BBDD)");
            }); 
          }
        }
      ]
    });
    alert.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
