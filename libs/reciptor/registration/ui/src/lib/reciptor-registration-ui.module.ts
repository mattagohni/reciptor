import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from "./registration/registration.component";
import { FormComponent } from './registration/form/form.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedMaterialModule} from "@reciptor/shared/material";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, TranslateModule, SharedMaterialModule, FormsModule],
  declarations: [
    RegistrationComponent,
    FormComponent
  ],
})
export class ReciptorRegistrationUiModule {}
