import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedMaterialModule } from '@reciptor/shared/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, TranslateModule.forChild()],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedUiHeaderModule {}
