import { QuestionaireDetailPage } from './../questionaire-detail/questionaire-detail';
import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Questionaire } from './../../shared/model/questionaire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestionairesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionaires',
  templateUrl: 'questionaires.html',
})
export class QuestionairesPage {

  questionaires: Questionaire[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionairesPage');
 
    this.questionairesService.findAllQuestionaires()
    .do(console.log)
    .subscribe(
      questionaires => this.questionaires = questionaires
    )
  }

  ngInit() {
    console.log('ngInit QuestionairesPage');
    this.questionairesService.findAllQuestionaires()
    .do(console.log)
    .subscribe(
      questionaires => this.questionaires = questionaires
    )
  }

  addQuestionaire() {
    this.navCtrl.push(QuestionaireDetailPage);
  }

 editSelected(event, item) {
  this.navCtrl.push(QuestionaireDetailPage, {
   item: item
 });
}

  duplicateSelected(event, item) {
    let questionaire = new Questionaire(null, item.name + ' (Copy)', item.description);
    delete questionaire['$key'];
    this.questionairesService.saveQuestionaire(null, questionaire);
  }

  deleteSelected(event, item) {
    this.questionairesService.deleteQuestionaire(item);
  }

}
