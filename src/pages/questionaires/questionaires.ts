import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { QuestionaireDetailPage } from './../questionaire-detail/questionaire-detail';
import { QuestionairesService } from './../../shared/model/questionaires.service';
import { QuestionsService } from './../../shared/model/questions.service';
import { Questionaire } from './../../shared/model/questionaire';

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

  questionaires: Questionaire[] = [];
  searchFilter: string = '';
  searchBarEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private questionairesService: QuestionairesService, private questionsService: QuestionsService) {
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
    this.navCtrl.push(QuestionaireDetailPage, {
      newItem: true});
  }

  editQuestionaire(event, item) {
    this.navCtrl.push(QuestionaireDetailPage, {
      newItem: false,
      item: item
    });
  }

  duplicateQuestionaire(event, questionaire) {
    let newQuestionaire = new Questionaire(null, questionaire.name + ' (Copy)', questionaire.description, Questionaire.QuestionaireStatus.PENDING);
    let questionsService = this.questionsService;
    let questionaireIdFrom = questionaire.$key;

    delete newQuestionaire['$key'];
    this.questionairesService.saveQuestionaire(null, newQuestionaire).then(function(result) {
      return questionsService.copyQuestionsFromQuestionaire(questionaireIdFrom, result.key);
    })
    .then(function() {
      console.log
    });
  }

  deleteQuestionaire(event, questionaire) {
    let questionsService = this.questionsService;
    let toastCtrl = this.toastCtrl;

    let promises = [];
    promises.push(this.questionairesService.deleteQuestionaire(questionaire.$key));
    promises.push(this.questionsService.removeAllAssignedQuestionsFromQuestionaire(questionaire.$key));

    Promise.all(promises).then(function(data) {
      console.log('remove:succcess');
      console.log('remove:succcess');
      let toast = toastCtrl.create({
        message: 'Questionaire has been removed',
        duration: 3000,
        position: 'top',
        cssClass: 'green'
      });
      toast.present();
    });
  }

  toggleSearchBar() {
    this.searchBarEnabled = !this.searchBarEnabled;
  }

  onInput(event) {
    console.log(event);
  }

  onCancel(event) {
    this.searchBarEnabled = false;
    this.searchFilter = '';
    console.log(event);
  }

}
