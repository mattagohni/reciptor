import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: LandingpageComponent}
    ]),
  ],
  declarations: [
    LandingpageComponent
  ],
})
export class ReciptorLandingpageFeatureModule {}
