import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Questionaire } from './../../shared/model/questionaire';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
    this.questionaire = navParams.get('item');

    if (!this.questionaire) {
      this.questionaire = new Questionaire(null, '', '');
    }
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

  cancel() {
    this.navCtrl.pop();
  }
}
