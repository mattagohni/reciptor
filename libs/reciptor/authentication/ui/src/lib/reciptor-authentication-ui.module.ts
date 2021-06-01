import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {TranslateModule} from '@ngx-translate/core';
import {FormComponent} from './login/form/form.component';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, FormsModule, TranslateModule],
  declarations: [LoginComponent, FormComponent],
})
export class ReciptorAuthenticationUiModule {
}
