import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuestionairesListComponent } from './questionaires-list/questionaires-list';
import { QuestionaireFormComponent } from './questionaire-form/questionaire-form';
import { QuestionFormComponent } from './question-form/question-form';
@NgModule({
	declarations: [QuestionairesListComponent,
    QuestionaireFormComponent,
    QuestionFormComponent],
	imports: [],
	exports: [QuestionairesListComponent,
    QuestionaireFormComponent,
    QuestionFormComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
