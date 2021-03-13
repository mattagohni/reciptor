import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ToolsActions from './tools.actions';
import { ToolsEntity } from './tools.models';

export const TOOLS_FEATURE_KEY = 'tools';

export interface State extends EntityState<ToolsEntity> {
  selectedId?: string | number; // which Tools record has been selected
  loaded: boolean; // has the Tools list been loaded
  error?: string | null; // last known error (if any)
}

export interface ToolsPartialState {
  readonly [TOOLS_FEATURE_KEY]: State;
}

export const toolsAdapter: EntityAdapter<ToolsEntity> = createEntityAdapter<ToolsEntity>();

export const initialState: State = toolsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const toolsReducer = createReducer(
  initialState,
  on(ToolsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(ToolsActions.loadToolsSuccess, (state, { tools }) =>
    toolsAdapter.setAll(tools, { ...state, loaded: true })
  ),
  on(ToolsActions.loadToolsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return toolsReducer(state, action);
}
