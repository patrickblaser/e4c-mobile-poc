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
  assignedQuestions: Question[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
    this.questionaire = navParams.get('item');
    this.newItem = navParams.get('newItem');
    this.editEnabled = this.newItem;

    if (!this.questionaire) {
      this.questionaire = new Questionaire(null, '', '', Questionaire.QuestionaireStatus.PENDING);
    }

    this.questionairesService.getAllQuestions()
      .subscribe(
        questions => this.questions = questions
      );

      this.questionairesService.getAssignedQuestionIds(this.questionaire.$key)
      .subscribe(
        ids => this.assignedQuestionIds = ids
      );

      this.questionairesService.getAssignedQuestions(this.questionaire.$key)
      .do( questions => console.log('assignedQuestions', questions))
      .subscribe(
        questions => this.assignedQuestions = questions
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
    this.questionairesService.assignQuestionToQuestionaire(this.questionaire.$key, questionId);
  }

  unassignQuestion(questionId) {
    this.questionairesService.removeQuestionFromQuestionaire(this.questionaire.$key, questionId);
  }

  cancel() {
    this.navCtrl.pop();
  }
}
