import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolListComponent } from './tool-list/tool-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ToolListComponent}])
  ],
  declarations: [ToolListComponent],
})
export class ToolsUiModule {}
