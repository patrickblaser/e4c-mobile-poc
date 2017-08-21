import { QuestionsService } from './../../shared/model/questions.service';
import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Questionaire } from './../../shared/model/questionaire';
import { Question } from './../../shared/model/question';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestionaireDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionaire-detail',
  templateUrl: 'questionaire-detail.html',
})
export class QuestionaireDetailPage {

  questionaire: Questionaire;
  editEnabled: boolean = false;
  newItem: boolean = false;

  questions: Question[] = [];
  assignedQuestionIds: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService, private questionsService: QuestionsService) {
    this.questionaire = navParams.get('item');
    this.newItem = navParams.get('newItem');
    this.editEnabled = this.newItem;

    if (!this.questionaire) {
      this.questionaire = new Questionaire(null, '', '', Questionaire.QuestionaireStatus.PENDING);
    }

    this.questionsService.findAllQuestions()
      .do(console.log)
      .subscribe(
        questions => this.questions = questions
      );

    this.questionsService.findAssignedQuestionIds(this.questionaire.$key)
      .do(console.log)
      .subscribe(
        ids => this.assignedQuestionIds = ids
      );

  }

  ionViewDidLoad() {
  }

  edit() {
    this.editEnabled = true;
  }

  save(questionaire) {
    this.questionairesService.saveQuestionaire(this.questionaire.$key, questionaire);
/*      .subscribe(
      () => {
        alert("lesson saved succesfully.");
      },
      err => alert(`error saving lesson ${err}`)
      );
*/
      this.navCtrl.pop();
  }

  assignQuestion(questionId) {
    this.questionsService.assignQuestionToQuestionaire(this.questionaire.$key, questionId);
  }

  unassignQuestion(questionId) {
    this.questionsService.removeQuestionFromQuestionaire(this.questionaire.$key, questionId);
  }

  cancel() {
    this.navCtrl.pop();
  }
}
