import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface FormValue {
  preConsultation: number;
  firstVaccination: number;
  secondVaccination: number;
  vaccinatedPersons: number;
  months: number;
  hoursPerMonth: number;
}

@Component({
  selector: 'app-necessary-persons',
  templateUrl: './necessary-persons.component.html',
  styleUrls: ['./necessary-persons.component.scss']
})
export class NecessaryPersonsComponent {
  form: FormGroup;
  personCount$: Observable<number | null>;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      preConsultation: [15, [Validators.required, Validators.min(0)]],
      firstVaccination: [15, [Validators.required, Validators.min(1)]],
      secondVaccination: [15, [Validators.required, Validators.min(1)]],
      vaccinatedPersons: [40000000, [Validators.required, Validators.min(1)]],
      months: [12, [Validators.required, Validators.min(1)]],
      hoursPerMonth: [130, [Validators.required, Validators.min(1), Validators.max(200)]]
    });

    this.personCount$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((value: FormValue) => {
        if (this.form.invalid) {
          return null;
        } else {
          const minutesPerMonthPerPerson = value.hoursPerMonth * 60;
          const availableMinutesPerPerson = minutesPerMonthPerPerson * value.months;
          const neededPersons = Math.ceil(
            (value.preConsultation + value.firstVaccination + value.secondVaccination) * (value.vaccinatedPersons / availableMinutesPerPerson)
          );
          return neededPersons;
        }
      })
    );
  }
}
