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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TextViewPage,
    PhraseListPage,
    RegisterPage,
    LoginPage
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
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextToSpeech,
    UserProvider,
    ServerProvider
  ]
})
export class AppModule {}
