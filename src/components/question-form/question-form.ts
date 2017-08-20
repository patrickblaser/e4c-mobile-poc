import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the QuestionFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'question-form',
  templateUrl: 'question-form.html'
})
export class QuestionFormComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input()
  initialValue: any;

  @Input()
  editEnabled: boolean = false;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      value: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue);
    }
    if (changes['editEnabled']) {
      this.editEnabled = changes['editEnabled'].currentValue;
    }
  }

  ngOnInit() {

  }

  isErrorVisible(field: string, error: string) {

    return this.form.controls[field].dirty
      && this.form.controls[field].errors &&
      this.form.controls[field].errors[error];

  }

  reset() {
    this.form.reset();
  }


  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }
}