import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromTools from './+state/tools.reducer';
import {ToolsEffects} from './+state/tools.effects';
import {ToolsFacade} from './+state/tools.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTools.TOOLS_FEATURE_KEY, fromTools.reducer),
    EffectsModule.forFeature([ToolsEffects]),
  ],
  providers: [ToolsFacade],
})
export class ToolsDataAccessModule {
}
