import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Questionaire} from '../../shared/model/questionaire';
import { QuestionPage} from '../question/question';
import { UserReportPage} from '../user-report/user-report';
import { QuestionairesService } from '../../shared/model/questionaires.service';
import _ from 'lodash';


/**
 * Generated class for the UserQuestionairesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-questionaires',
  templateUrl: 'user-questionaires.html',
})
export class UserQuestionairesPage {

  questionaires: any[];
  userId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
    this.userId = navParams.get('userId');
    questionairesService.getUserQuestionaires(this.userId).subscribe(
      questionaires => {
        this.questionaires = [];
        for ( let i = 0; i < questionaires.length; i++) {
          questionaires[i].forEach(element => {
            this.questionaires.push(element);
          });
        }
        console.log(this.questionaires);
      }
    );
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserQuestionairesPage');
  }

  view(questionaire: any) {
    if (questionaire.status == 'open') {
      this.navCtrl.push(QuestionPage, { questionaireId: questionaire.questionaireId, questionaireVersion: questionaire.questionaireVersion, userId: 'user123'});
    } else {
      this.navCtrl.push(UserReportPage, { questionaireId: questionaire.questionaireId, questionaireVersion: questionaire.questionaireVersion, userId: 'user123'});
    }
  }
}
