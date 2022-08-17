import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators'

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {
  constructor(private  el:  ElementRef, private controlname: NgControl) {
  }
  //valuechanges is an RXJS subject that is used as an observable
  //to monitor changes that are being made to the form
  // https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/18043541#questions
  //Map takes the value that is going through the pipe and transforms the data on it
  ngOnInit() {
    this.controlname.control.parent.valueChanges.pipe(
      map(({ a, b, answer}) =>  Math.abs((a + b - answer) / (a+b))),

    )
    // https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/18043545#questions
    .subscribe((value) => {
      if (value < 0.2) {
        this.el.nativeElement.classList.add('close');
      } else {
        this.el.nativeElement.classList.remove('close');
      }
    })
  }
}
