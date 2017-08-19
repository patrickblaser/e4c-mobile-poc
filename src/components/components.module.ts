import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuestionairesListComponent } from './questionaires-list/questionaires-list';
import { QuestionaireFormComponent } from './questionaire-form/questionaire-form';
@NgModule({
	declarations: [QuestionairesListComponent,
    QuestionaireFormComponent],
	imports: [],
	exports: [QuestionairesListComponent,
    QuestionaireFormComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
