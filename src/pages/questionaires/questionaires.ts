import { QuestionaireDetailPage } from './../questionaire-detail/questionaire-detail';
import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Questionaire } from './../../shared/model/questionaire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  showSearchBar: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private questionairesService: QuestionairesService) {
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

  editSelected(event, item) {
    this.navCtrl.push(QuestionaireDetailPage, {
      newItem: false,
      item: item
    });
  }

  duplicateSelected(event, item) {
    let questionaire = new Questionaire(null, item.name + ' (Copy)', item.description);
    delete questionaire['$key'];
    this.questionairesService.saveQuestionaire(null, questionaire);
  }

  deleteSelected(event, item) {
    this.questionairesService.deleteQuestionaire(item)
    .subscribe(firebaseUser => {
      console.log('remove:succcess');
      let toast = this.toastCtrl.create({
        message: 'Questionaire has been removed',
        duration: 3000,
        position: 'top',
        cssClass: 'green'
      });
      toast.present();
    },
      error => {}/* Handle error here */);
  }

  showSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  onInput(event) {
    console.log(event);
  }

  onCancel(event) {
    this.showSearchBar = false;
    this.searchFilter = '';
    console.log(event);
  }

}
