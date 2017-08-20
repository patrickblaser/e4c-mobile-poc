import { QuestionDetailPage } from './../question-detail/question-detail';
import { QuestionsService } from './../../shared/model/questions.service';
import { Question } from './../../shared/model/question';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the QuestionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  questions: Question[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private questionsService: QuestionsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');

    this.questionsService.findAllQuestions()
      .do(console.log)
      .subscribe(
      questions => this.questions = questions
      )
  }

  ngInit() {
    console.log('ngInit QuestionsPage');
    this.questionsService.findAllQuestions()
      .do(console.log)
      .subscribe(
      questions => this.questions = questions
      )
  }

  addQuestion() {
    this.navCtrl.push(QuestionDetailPage, {
      newItem: true});
  }

  editSelected(event, item) {
    this.navCtrl.push(QuestionDetailPage, {
      newItem: false,
      item: item
    });
  }

  deleteSelected(event, item) {
    this.questionsService.deleteQuestion(item)
    .subscribe(firebaseUser => {
      console.log('remove:succcess');
      let toast = this.toastCtrl.create({
        message: 'Question has been removed',
        duration: 3000,
        position: 'top',
        cssClass: 'green'
      });
      toast.present();
    },
      error => {}/* Handle error here */);
  }

}
