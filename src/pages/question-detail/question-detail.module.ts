import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { QuestionDetailPage } from './question-detail';
import { QuestionFormComponent } from '../../components/question-form/question-form';

@NgModule({
  declarations: [
    QuestionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionDetailPage),
    QuestionFormComponent
  ],
})
export class QuestionDetailPageModule {}
