import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { AngularFireDatabase } from "angularfire2/database";
import { Question } from "./question";
import { Promise } from "firebase/app";

@Injectable()
export class QuestionsService {

    constructor(private db: AngularFireDatabase) {
    }

    findAllQuestions(): Observable<Question[]> {
        return this.db.list('questions')
            .map(Question.fromJsonList);  //TODO: actually not necessary - works anyway - by chance ???
    }

    saveQuestion(key: string, question: Question): void {
        if (key == null) {
            const newQuestionKey = this.db.database.ref('questions').push(question).key;
            console.log('key generated', newQuestionKey);
        } else {
            this.db.database.ref('questions/' + key).set(question);
        }
    }

    deleteQuestion(question: Question): any {
        return Observable.fromPromise(this.db.database.ref('questions/' + question.$key).set(null));
//        return Observable.fromPromise(this.db.database.ref('questions/' + question.$key).remove());
    }



    findAssignedQuestionIds(questionaireId:string): Observable<String[]> {
        return this.db.list('questionionaire/questions/' + questionaireId);
    }


    assignQuestionToQuestionaire (questionaireId:string, questionId: string) {
        this.db.database.ref('questionionaire/questions/' + questionaireId + '/' + questionId).update({position: -1});
    }

    removeQuestionFromQuestionaire (questionaireId:string, questionId: string) {
        this.db.database.ref('questionionaire/questions/' + questionaireId + '/' + questionId).set(null);
    }

    copyQuestionsFromQuestionaire(questionaireIdFrom: string, questionaireIdTo: string): Promise<any> {
        console.log('copyQuestionsFromQuestionaire', questionaireIdFrom, questionaireIdTo);
        let fromRef = this.db.database.ref('questionionaire/questions/' + questionaireIdFrom);
        let toRef = this.db.database.ref('questionionaire/questions/' + questionaireIdTo);

        return this.copyFbRecord(fromRef, toRef);
    }

    removeAllAssignedQuestionsFromQuestionaire (questionaireId:string) {
        this.db.database.ref('questionionaire/questions/' + questionaireId).set(null);
    }

    copyFbRecord(oldRef: any, newRef: any): Promise<any> {    
        return new Promise((resolve, reject) => {
             oldRef.once('value').then(snap => {
                  return newRef.set(snap.val());
             }).then(() => {
                  console.log('Done!');
                  resolve({});
             }).catch(err => {
                  console.log(err.message);
                  reject(err);
             });
        });
   }
}
