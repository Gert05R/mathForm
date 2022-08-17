import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution= 0;

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
    [MathValidators.addition('answer', 'a','b')]
  );

  constructor() { }

  get a () {
    return this.mathForm.value.a;
  }
  get b () {
    return this.mathForm.value.b;
  }
  get  answer () {
    return this.mathForm.value.answer;
  }

  ngOnInit(): void {

    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(250),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved +1,
          startTime: acc.startTime
        }
      }, { numberSolved: 0, startTime: new Date() })
    )

      .subscribe(( { numberSolved, startTime} ) => {

        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000;

      //handles the case the result is correct and a reset needs to occur instantly
      //First codeline, but is not repeatbale
      //this.mathForm.controls.a.setValue(this.randomNumber());
      //this.mathForm.controls.b.setValue(this.randomNumber());
      //this.mathForm.controls.answer.setValue('');
      //In case only one of the properties needs to be updated use patchValue instead os setvalue()
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      });
    });
  }

  randomNumber() {
    return Math.floor(Math.random()*10);
  }

}
