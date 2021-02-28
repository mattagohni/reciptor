import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SharedMaterialModule} from '@reciptor/shared/material';

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedUiHeaderModule {}
