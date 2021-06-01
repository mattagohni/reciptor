import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    TranslateModule.forChild(),
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class ReciptorHeaderUiModule {
}
