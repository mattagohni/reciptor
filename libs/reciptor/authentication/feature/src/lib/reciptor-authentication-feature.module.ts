import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '@reciptor/authentication/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LoginComponent},
    ]),
  ],
})
export class ReciptorAuthenticationFeatureModule {
}
