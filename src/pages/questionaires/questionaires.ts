import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { QuestionaireDetailPage } from './../questionaire-detail/questionaire-detail';
import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Questionaire } from './../../shared/model/questionaire';
import { QuestionPage } from './../question/question';

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
export class QuestionairesPage implements OnInit {

  questionaires: Questionaire[] = [];
  searchFilter: string = '';
  searchBarEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private questionairesService: QuestionairesService) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    console.log('ionViewDidLoad QuestionairesPage');
    this.questionairesService.login();
    
    this.questionairesService.getAllQuestionaires()
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

  generateForUser(event, questionaire) {
    let key = this.questionairesService.generateQuestionaireForUser(questionaire, 'user123');
    event.stopPropagation();
  }

  duplicateQuestionaire(event, questionaire) {
    let newQuestionaire = new Questionaire(null, questionaire.name + ' (Copy)', questionaire.description, Questionaire.QuestionaireStatus.PENDING);
    let questionairesService = this.questionairesService;
    let questionaireIdFrom = questionaire.$key;

    delete newQuestionaire['$key'];
    this.questionairesService.saveQuestionaire(null, newQuestionaire)
    .then(
      resolve => questionairesService.copyQuestionsFromQuestionaire(questionaireIdFrom, resolve.key)
    )
    .then(resolve => console.log(resolve));
  }

  deleteQuestionaire(event, questionaire) {
    let toastCtrl = this.toastCtrl;

    let promises = [];
    //urm: client should not have to know about the data dependencies. The questionaireService should handle this.
    promises.push(this.questionairesService.deleteQuestionaire(questionaire.$key));
    promises.push(this.questionairesService.removeAllAssignedQuestionsFromQuestionaire(questionaire.$key));

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
