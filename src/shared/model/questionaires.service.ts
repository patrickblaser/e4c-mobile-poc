import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { AngularFireDatabase } from "angularfire2/database";
import { Question } from "./question";
import { Questionaire } from './questionaire';
import { Promise } from "firebase/app";
import Moment from "Moment";

@Injectable()
export class QuestionairesService {

    constructor(private db: AngularFireDatabase) {
    }

    getAllQuestions(): Observable<Question[]> {
        return this.db.list('questions')
            .map(Question.fromJsonList);  //TODO: actually not necessary - works anyway - by chance ???
    }

    saveQuestion(key: string, question: Question): void {
        if (key == null) {
            const newQuestionKey = this.db.database.ref('questions').push(question).key;
            console.log('key generated', newQuestionKey);
        } else {
            this.db.database.ref(`questions/${key}`).set(question);
        }
    }

    deleteQuestion(question: Question): any {
        return Observable.fromPromise(this.db.database.ref(`questions/${question.$key}`).set(null));
    }

    getAssignedQuestionIds(questionaireId:string): Observable<String[]> {
        return this.db.list(`questionaire/questions/${questionaireId}`);
    }

    getAssignedQuestions(questionaireId:string): Observable<any[]> {
        return this.db.list(`questionaire/questions/${questionaireId}`,{
            query:
            {
              orderByChild: 'position'
            }
          }).map(questions => questions.map(question => this.db.object(`questions/${question.$key}`)))
          .flatMap(fbojs => Observable.combineLatest(fbojs))
          .do(result => console.log('getAssignedQuestions', result));
    }


    getUserQuestions(userId:string, questionaireId:string, questionaireVersion:string): Observable<any[]> {
        console.log(userId, questionaireId, questionaireVersion);
        return this.db.list(`user/answers/${userId}/${questionaireId}/${questionaireVersion}/questions`,{
            query:
            {
              orderByChild: 'position'
            }
          });
    }

    getUserQuestionaires(userId:string): Observable<any[]> {
        return this.db.list(`user/answers/${userId}`)
        .map(questionaires => questionaires.map( questionaire => {
            let result = [];
            for(var propt in questionaire){
                result.push({
                    questionaireId: questionaire.$key,
                    questionaireVersion: propt,
                    name: questionaire[propt].properties.name,
                    status: questionaire[propt].properties.status,
                    startDate: Moment(questionaire[propt].properties.startDate).format('DD.MM.YYYY'),
                    finishedDate: (questionaire[propt].properties.finishedDate ? Moment(questionaire[propt].properties.finishedDate).format('DD.MM.YYYY') : ''),
            });
        }
            return result;
        })
        )
    }

    saveUserAnswer(userId:string, questionaireId:string, questionaireVersion:string, questionId:string, answer:number) {
        this.db.database.ref(`user/answers/${userId}/${questionaireId}/${questionaireVersion}/questions/${questionId}`).update({answer});
    }

    saveUserQuestionaire(userId:string, questionaireId:string, questionaireVersion:string) {
        this.db.database.ref(`user/answers/${userId}/${questionaireId}/${questionaireVersion}/properties`).update({finishedDate: Moment.now(), status: 'finished'});
    }

    assignQuestionToQuestionaire (questionaireId:string, questionId: string) {
        this.db.database.ref(`questionaire/questions/${questionaireId}/${questionId}`).update({position: -1});
    }

    removeQuestionFromQuestionaire (questionaireId:string, questionId: string) {
        this.db.database.ref(`questionaire/questions/${questionaireId}/${questionId}`).set(null);
    }

    copyQuestionsFromQuestionaire(questionaireIdFrom: string, questionaireIdTo: string): Promise<any> {
        console.log('copyQuestionsFromQuestionaire', questionaireIdFrom, questionaireIdTo);
        let fromRef = this.db.database.ref(`questionaire/questions/${questionaireIdFrom}`);
        let toRef = this.db.database.ref(`questionaire/questions/${questionaireIdTo}`);

        return this.copyFbRecord(fromRef, toRef);
    }

    generateQuestionaireForUser(questionaire: Questionaire, userId: string): string {
        console.log('generateQuestionaireForUser', questionaire, userId);
        const key = (this.db.database.ref(`user/answers/${userId}/${questionaire.$key}`).push({properties: {name:  questionaire.name, startDate:  Moment.now(), status: 'open'}})).key;

        //pab: not sure if should be done like this => let's discuss
        var subscription = this.getAssignedQuestions(questionaire.$key).subscribe(
            questions => {
                let i = 0;
                questions.forEach( question => {
                    question.position = i++;
                    this.db.database.ref(`user/answers/${userId}/${questionaire.$key}/${key}/questions/${question.$key}`).set(question);
                });
                subscription.unsubscribe();
            }
          );

          return key;
    }

    removeAllAssignedQuestionsFromQuestionaire (questionaireId:string): Promise<any> {
        return this.db.database.ref(`questionionaire/questions/${questionaireId}`).set(null);
    }

    getAllQuestionaires(): Observable<Questionaire[]> {
        return this.db.list('questionaires')
            .map(Questionaire.fromJsonList);
    }

    saveQuestionaire(key: string, questionaire: Questionaire): Promise<any> {
        if (key == null) {
            return this.db.database.ref('questionaires').push(questionaire);
        } else {
            return this.db.database.ref(`questionaires/${key}`).set(questionaire);
        }
    }

    deleteQuestionaire(questionaireId: string): Promise<any> {    
        return this.db.database.ref(`questionaires/${questionaireId}`).set(null).then( response => {
            return this.removeAllAssignedQuestionsFromQuestionaire(questionaireId);
        });
    }

    copyFbRecord(oldRef: any, newRef: any): Promise<any> {    
        return new Promise((resolve, reject) => {
             oldRef.once('value').then(snap => {
                  return newRef.set(snap.val());
             }).then(() => {
                  resolve({});
             }).catch(err => {
                  console.error(err);
                  reject(err);
             });
        });
   }
}
