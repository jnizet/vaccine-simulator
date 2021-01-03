import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NecessaryPersonsComponent } from './necessary-persons/necessary-persons.component';
import { NecessaryMonthsComponent } from './necessary-months/necessary-months.component';
import { VaccinatedPersonsComponent } from './vaccinated-persons/vaccinated-persons.component';
import '@angular/common/locales/global/fr';

@NgModule({
  declarations: [
    AppComponent,
    NecessaryPersonsComponent,
    NecessaryMonthsComponent,
    VaccinatedPersonsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
