import { PropsFilterPipe } from './../shared/filter/propsFilterPipe';
import { NotExistsFilterPipe } from './../shared/filter/notExistsFilterPipe';
import { ExistsFilterPipe } from './../shared/filter/existsFilterPipe';
import { QuestionFormComponent } from './../components/question-form/question-form';
import { QuestionDetailPage } from './../pages/question-detail/question-detail';
import { QuestionPage } from './../pages/question/question';
import { QuestionsPage } from './../pages/questions/questions';
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
import { QuestionairesPage } from './../pages/questionaires/questionaires';
import { QuestionaireDetailPage } from './../pages/questionaire-detail/questionaire-detail';
import { UserQuestionairesPage } from './../pages/user-questionaires/user-questionaires';
import { UserReportPage } from './../pages/user-report/user-report';

import { QuestionaireFormComponent } from './../components/questionaire-form/questionaire-form';
import { QuestionairesListComponent } from './../components/questionaires-list/questionaires-list';
import { QuestionairesService } from './../shared/model/questionaires.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    QuestionPage,
    QuestionsPage,
    QuestionDetailPage,
    QuestionairesPage,
    UserQuestionairesPage,
    UserReportPage,
    QuestionaireDetailPage,
    QuestionaireFormComponent,
    QuestionFormComponent,
    ExistsFilterPipe,
    NotExistsFilterPipe,
    PropsFilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
],
  bootstrap: [IonicApp],
  //urm: use lazy loading instead
  entryComponents: [
    MyApp,
    QuestionPage,
    QuestionsPage,
    QuestionDetailPage,
    QuestionairesPage,
    UserQuestionairesPage,
    UserReportPage,
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
