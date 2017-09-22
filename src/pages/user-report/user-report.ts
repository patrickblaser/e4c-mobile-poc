import { QuestionairesService } from './../../shared/model/questionaires.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-user-report',
  templateUrl: 'user-report.html',
})
export class UserReportPage {

  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  barChartOptions: any; 
  barChartLabels: any[] = [];
  barChartData: any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private questionairesService: QuestionairesService) {
    console.log('navParams', navParams);

    let questionaireId = navParams.get('questionaireId');
    let questionaireVersion = navParams.get('questionaireVersion');
    let userId = navParams.get('userId');


    this.questionairesService.getUserQuestions(userId, questionaireId , questionaireVersion)
      .subscribe(
        questions => {
          let i = 1;
          questions.forEach(question => {
            console.log(question);
            this.barChartLabels.push('Q' + i++);
//            this.barChartLabels.push(question.value);
            this.barChartData.push(question.answer);
          });
          this.barChart.update();
        }
      );
  }

  ionViewDidLoad() {

    this.barChartOptions = {
      
            type: 'bar',
            data: {
              labels: this.barChartLabels,
              datasets: [{
                label: 'Answers',
                data: this.barChartData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
      
          };

    this.barChart = new Chart(this.barCanvas.nativeElement, this.barChartOptions);
  }
}
