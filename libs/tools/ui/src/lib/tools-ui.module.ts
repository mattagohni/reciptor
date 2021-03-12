import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolListComponent } from './tool-list/tool-list.component';
import {RouterModule} from '@angular/router';
import {ToolsDataAccessModule} from '@reciptor/tools/data-access';
import {SharedMaterialModule} from '@reciptor/shared/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ToolListComponent}]),
    ToolsDataAccessModule,
    SharedMaterialModule
  ],
  declarations: [ToolListComponent],
})
export class ToolsUiModule {}
