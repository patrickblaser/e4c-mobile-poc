import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {AngularFireDatabase} from "angularfire2/database";
import {Questionaire} from "./questionaire";

@Injectable()
export class QuestionairesService {

  constructor(private db:AngularFireDatabase) {
  }

  findAllQuestionaires(): Observable<Questionaire[]> {
    return  this.db.list('questionaires')
        .map(Questionaire.fromJsonList);  //TODO: actually not necessary - works anyway - by chance ???
  }

  saveQuestionaire(key: string, questionaire: Questionaire): void {
      if (questionaire) {
        if (key == null) {
            const newQuestionaireKey = this.db.database.ref('questionaires').push(questionaire).key;
            console.log('key generated', newQuestionaireKey);
//            questionaire.$key = newQuestionaireKey;
        } else {
            this.db.database.ref('questionaires/' + key).set(questionaire);
        }
        console.log('questionaire', questionaire);
//        this.db.database.ref('questionaires').set(questionaire);
    } 

  }

  deleteQuestionaire(questionaire: Questionaire): void {
    this.db.database.ref('questionaires/' + questionaire.$key).remove();
  }
}
