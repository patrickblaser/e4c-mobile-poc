import { Directive } from '@angular/core';

/**
 * Generated class for the SliderDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[slider]' // Attribute selector
})
export class SliderDirective {

  constructor() {
    console.log('Hello SliderDirective Directive');
  }

}
