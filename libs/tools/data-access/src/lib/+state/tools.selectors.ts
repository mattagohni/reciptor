import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, TOOLS_FEATURE_KEY, toolsAdapter, ToolsPartialState,} from './tools.reducer';

// Lookup the 'Tools' feature state managed by NgRx
export const getToolsState = createFeatureSelector<ToolsPartialState, State>(
  TOOLS_FEATURE_KEY
);

const {selectAll, selectEntities} = toolsAdapter.getSelectors();

export const getToolsLoaded = createSelector(
  getToolsState,
  (state: State) => state.loaded
);

export const getToolsError = createSelector(
  getToolsState,
  (state: State) => state.error
);

export const getAllTools = createSelector(getToolsState, (state: State) =>
  selectAll(state)
);

export const getToolsEntities = createSelector(getToolsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getToolsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getToolsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
