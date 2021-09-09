import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from '@reciptor/registration/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: RegistrationComponent }
    ]),
  ],
})
export class ReciptorRegistrationFeatureModule {}
