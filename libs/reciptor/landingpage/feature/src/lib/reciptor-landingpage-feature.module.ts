import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {SharedMaterialModule} from "@reciptor/shared/material";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LandingpageComponent}
    ]),
    MatGridListModule,
    SharedMaterialModule,
  ],
  declarations: [
    LandingpageComponent
  ],
})
export class ReciptorLandingpageFeatureModule {}
