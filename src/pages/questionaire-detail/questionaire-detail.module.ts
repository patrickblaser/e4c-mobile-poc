import { QuestionairesService } from './../../shared/model/questionaires.service';
import { QuestionaireFormComponent } from './../../components/questionaire-form/questionaire-form';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionaireDetailPage } from './questionaire-detail';

@NgModule({
  declarations: [
    QuestionaireDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionaireDetailPage),
    QuestionaireFormComponent,
    QuestionairesService
  ],
})
export class QuestionaireDetailPageModule {}
