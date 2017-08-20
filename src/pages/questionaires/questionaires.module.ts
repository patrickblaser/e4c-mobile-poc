import { QuestionairesListComponent } from './../../components/questionaires-list/questionaires-list';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionairesPage } from './questionaires';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    QuestionairesPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionairesPage),
    FormsModule
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class QuestionairesPageModule {}
