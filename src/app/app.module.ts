import { QuestionaireFormComponent } from './../components/questionaire-form/questionaire-form';
import { QuestionairesPage } from './../pages/questionaires/questionaires';
import { ComponentsModule } from './../components/components.module';
import { QuestionairesListComponent } from './../components/questionaires-list/questionaires-list';
import { QuestionaireDetailPage } from './../pages/questionaire-detail/questionaire-detail';
import { QuestionairesService } from './../shared/model/questionaires.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";

import {firebaseConfig} from "../environments/firebase.config";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    QuestionairesPage,
    QuestionaireDetailPage,
    QuestionaireFormComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    QuestionairesPage,
    QuestionaireDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestionairesService
  ]
})
export class AppModule {}
