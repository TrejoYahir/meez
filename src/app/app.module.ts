import { QuickTextPage } from './../pages/quick-text/quick-text';
import { ManagePhraseListPage } from './../pages/manage-phrase-list/manage-phrase-list';
import { ManageServicesPage } from './../pages/manage-services/manage-services';
import { ManagePhrasesPage } from './../pages/manage-phrases/manage-phrases';
import { AddServicePage } from './../pages/add-service/add-service';
import { AddPhrasePage } from './../pages/add-phrase/add-phrase';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { PhraseListPage } from './../pages/phrase-list/phrase-list';
import { TextToSpeech } from '@ionic-native/text-to-speech'
import { TextViewPage } from './../pages/text-view/text-view';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { ServerProvider } from '../providers/server/server';
import { ServicesProvider } from '../providers/services/services';
import { PhrasesProvider } from '../providers/phrases/phrases';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TextViewPage,
    PhraseListPage,
    RegisterPage,
    LoginPage,
    AddPhrasePage,
    AddServicePage,
    ManageServicesPage,
    ManagePhrasesPage,
    ManagePhraseListPage,
    QuickTextPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TextViewPage,
    PhraseListPage, 
    RegisterPage,
    LoginPage,
    AddPhrasePage,
    AddServicePage,
    ManageServicesPage,
    ManagePhrasesPage,
    ManagePhraseListPage,
    QuickTextPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextToSpeech,
    UserProvider,
    ServerProvider,
    ServicesProvider,
    PhrasesProvider
  ]
})
export class AppModule {}
