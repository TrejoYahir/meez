import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageServicesPage } from './manage-services';

@NgModule({
  declarations: [
    ManageServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageServicesPage),
  ],
})
export class ManageServicesPageModule {}
