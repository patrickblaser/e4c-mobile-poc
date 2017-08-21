import { Promise } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { AngularFireDatabase } from "angularfire2/database";
import { Questionaire } from "./questionaire";

@Injectable()
export class QuestionairesService {

    constructor(private db: AngularFireDatabase) {
    }

    findAllQuestionaires(): Observable<Questionaire[]> {
        return this.db.list('questionaires')
            .map(Questionaire.fromJsonList);  //TODO: actually not necessary - works anyway - by chance ???
    }

    saveQuestionaire(key: string, questionaire: Questionaire): any {
        if (key == null) {
            return this.db.database.ref('questionaires').push(questionaire);
        } else {
            return this.db.database.ref('questionaires/' + key).set(questionaire);
        }
    }

    deleteQuestionaire(questionaireId: string): Promise<any> {
        return this.db.database.ref('questionaires/' + questionaireId).set(null);
//        return Observable.fromPromise(this.db.database.ref('questionaires/' + questionaire.$key).remove());
    }
}
