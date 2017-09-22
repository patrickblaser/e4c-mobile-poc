import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserQuestionairesPage } from './user-questionaires';

@NgModule({
  declarations: [
    UserQuestionairesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserQuestionairesPage),
  ],
})
export class UserQuestionairesPageModule {}
