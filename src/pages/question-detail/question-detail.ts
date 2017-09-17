import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Question } from './../../shared/model/question';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-detail',
  templateUrl: 'question-detail.html',
})
export class QuestionDetailPage {

  question: Question;
  editEnabled: boolean = false;
  newItem: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
    this.question = navParams.get('item');
    this.newItem = navParams.get('newItem');
    this.editEnabled = this.newItem;

    if (!this.question) {
      this.question = new Question(null, '');
    }
  }

  ionViewDidLoad() {
  }

  edit() {
    this.editEnabled = true;
  }

  save(question) {
    this.questionairesService.saveQuestion(this.question.$key, question);
/*      .subscribe(
      () => {
        alert("lesson saved succesfully.");
      },
      err => alert(`error saving lesson ${err}`)
      );
*/
      this.navCtrl.pop();
  }

  cancel() {
    this.navCtrl.pop();
  }
}
