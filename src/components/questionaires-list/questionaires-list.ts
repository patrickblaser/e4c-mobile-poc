import { Component } from '@angular/core';
import { Questionaire } from "../../shared/model/questionaire";
import { QuestionairesService } from '../../shared/model/questionaires.service';

/**
 * Generated class for the QuestionairesListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'questionaires-list',
  templateUrl: 'questionaires-list.html'
})
export class QuestionairesListComponent {

  questionaires: Questionaire[];

  constructor(private questionairesService: QuestionairesService) {  }

  ngInit() {
    this.questionairesService.findAllQuestionaires().subscribe(
      questionaires => this.questionaires = questionaires
    )
  }
}
