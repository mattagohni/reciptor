import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from "./registration/registration.component";
import { FormComponent } from './registration/form/form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RegistrationComponent,
    FormComponent
  ],
})
export class ReciptorRegistrationUiModule {}
