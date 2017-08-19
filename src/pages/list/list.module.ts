import { ListPage } from './list';
import { QuestionairesListComponent } from './../../components/questionaires-list/questionaires-list';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    QuestionairesListComponent
  ],
})
export class ListPageModule {}
