import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface FormValue {
  preConsultation: number;
  firstVaccination: number;
  secondVaccination: number;
  vaccinatingPersons: number;
  months: number;
  hoursPerMonth: number;
}

@Component({
  selector: 'app-vaccinated-persons',
  templateUrl: './vaccinated-persons.component.html',
  styleUrls: ['./vaccinated-persons.component.scss']
})
export class VaccinatedPersonsComponent {

  form: FormGroup;
  personCount$: Observable<number | null>;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      preConsultation: [15, [Validators.required, Validators.min(0)]],
      firstVaccination: [15, [Validators.required, Validators.min(1)]],
      secondVaccination: [15, [Validators.required, Validators.min(1)]],
      vaccinatingPersons: [19231, [Validators.required, Validators.min(1)]],
      months: [12, [Validators.required, Validators.min(1)]],
      hoursPerMonth: [130, [Validators.required, Validators.min(1), Validators.max(200)]]
    });

    this.personCount$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      map((value: FormValue) => {
        if (this.form.invalid) {
          return null;
        } else {
          const neededMinutesPerPerson = value.preConsultation + value.firstVaccination + value.secondVaccination;
          const vaccinatedPersonCount = value.vaccinatingPersons * value.months * value.hoursPerMonth * 60 / neededMinutesPerPerson;
          return vaccinatedPersonCount;
        }
      })
    );
  }

  personsPerMonth(persons: number): number {
    return persons / this.form.value.months;
  }
}
