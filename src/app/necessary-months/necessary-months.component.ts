import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface FormValue {
  preConsultation: number;
  firstVaccination: number;
  secondVaccination: number;
  vaccinatedPersons: number;
  vaccinatingPersons: number;
  hoursPerMonth: number;
}

@Component({
  selector: 'app-necessary-months',
  templateUrl: './necessary-months.component.html',
  styleUrls: ['./necessary-months.component.scss']
})
export class NecessaryMonthsComponent {

  form: FormGroup;
  monthCount$: Observable<number | null>;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      preConsultation: [15, [Validators.required, Validators.min(0)]],
      firstVaccination: [15, [Validators.required, Validators.min(1)]],
      secondVaccination: [15, [Validators.required, Validators.min(1)]],
      vaccinatedPersons: [40000000, [Validators.required, Validators.min(1)]],
      vaccinatingPersons: [19231, [Validators.required, Validators.min(1)]],
      hoursPerMonth: [130, [Validators.required, Validators.min(1), Validators.max(200)]]
    });

    this.monthCount$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((value: FormValue) => {
        if (this.form.invalid) {
          return null;
        } else {
          const availableMinutesPerMonth = value.hoursPerMonth * 60 * value.vaccinatingPersons;
          const neededMonths =
            (value.preConsultation + value.firstVaccination + value.secondVaccination) *
            (value.vaccinatedPersons / availableMinutesPerMonth);
          return neededMonths;
        }
      })
    );
  }

  endDate(monthCount: number): Date {
    const result = new Date(2021, 1, 1);
    result.setMonth(Math.ceil(monthCount));
    return result;
  }
}
