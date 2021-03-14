import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ToolDetailComponent} from '@reciptor/tools/ui';
import {ToolListComponent} from '@reciptor/tools/ui';
import {ToolsDataAccessModule} from '@reciptor/tools/data-access';

@NgModule({
  imports: [
    CommonModule,
    ToolsDataAccessModule,
    RouterModule.forChild([
      {path: '', component: ToolListComponent },
      {path: ':id', component: ToolDetailComponent}
    ]),
  ],
})
export class ToolsFeatureModule {}