import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolListComponent } from './tool-list/tool-list.component';
import {RouterModule} from '@angular/router';
import {ToolsDataAccessModule} from '@reciptor/tools/data-access';
import {SharedMaterialModule} from '@reciptor/shared/material';
import { ToolDetailComponent } from './tool-detail/tool-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ToolListComponent}]),
    ToolsDataAccessModule,
    SharedMaterialModule
  ],
  declarations: [ToolListComponent, ToolDetailComponent],
})
export class ToolsUiModule {}
