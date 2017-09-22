import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Question } from './../../shared/model/question';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserReportPage} from '../user-report/user-report';

/**
 * Generated class for the QuestionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  index: number = 0;
  questions: any[];
  currentQuestion: Question;
  answer: number;

  questionaireId: string;
  questionaireVersion: string;
  userId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
    console.log('navParams', navParams);

    this.questionaireId = navParams.get('questionaireId');
    this.questionaireVersion = navParams.get('questionaireVersion');
    this.userId = navParams.get('userId');

    this.questionairesService.getUserQuestions(this.userId, this.questionaireId , this.questionaireVersion)
      .do(console.log)
      .subscribe(
        questions => {
          this.questions = questions;
          questions.forEach(question => {
            console.log(question);
            if (!question.hasOwnProperty('answer')
            && !this.currentQuestion) {
              this.index = questions.indexOf(question);
              this.currentQuestion = question;
            }
          })
        }
      );
  }

  valueChanged() {
    if (this.answer == null) {
      return;
    }
    this.questionairesService.saveUserAnswer(this.userId, this.questionaireId, this.questionaireVersion, this.currentQuestion.$key, this.answer);
    this.index++;

    if (this.index == this.questions.length) {
      this.questionairesService.saveUserQuestionaire(this.userId, this.questionaireId, this.questionaireVersion);
      this.navCtrl.pop();
      this.navCtrl.push(UserReportPage, { questionaireId: this.questionaireId, questionaireVersion: this.questionaireVersion, userId: 'user123'});
    } else {
      this.currentQuestion = this.questions[this.index];
      this.answer = null;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

}
