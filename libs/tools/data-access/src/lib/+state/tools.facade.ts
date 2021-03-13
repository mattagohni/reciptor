import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as ToolsActions from './tools.actions';
import * as ToolsFeature from './tools.reducer';
import * as ToolsSelectors from './tools.selectors';

@Injectable()
export class ToolsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ToolsSelectors.getToolsLoaded));
  allTools$ = this.store.pipe(select(ToolsSelectors.getAllTools));
  selectedTools$ = this.store.pipe(select(ToolsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ToolsActions.init());
  }
}
