import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import * as ToolsActions from './tools.actions';
import {Tool} from './tools.models';

export const TOOLS_FEATURE_KEY = 'tools';

export interface State extends EntityState<Tool> {
  selectedId?: string | number; // which Tools record has been selected
  loaded: boolean; // has the Tools list been loaded
  error?: string | null; // last known error (if any)
}

export interface ToolsPartialState {
  readonly [TOOLS_FEATURE_KEY]: State;
}

export const toolsAdapter: EntityAdapter<Tool> = createEntityAdapter<Tool>();

export const initialState: State = toolsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const toolsReducer = createReducer(
  initialState,
  on(ToolsActions.init, (state) => ({...state, loaded: false, error: null})),
  on(ToolsActions.loadToolsSuccess, (state, {tools}) =>
    toolsAdapter.setAll(tools, {...state, loaded: true})
  ),
  on(ToolsActions.loadToolsFailure, (state, {error}) => ({...state, error})),

  // loading one specific tool
  on(ToolsActions.loadToolById, (state) => ({...state, loaded: false, error: null})),
  on(ToolsActions.loadToolSuccess, (state, {tool}) => toolsAdapter.setOne(tool, {
    ...state,
    selectedId: tool.id,
    loaded: true
  })),
  on(ToolsActions.loadToolFailure, (state, {error}) => ({...state, error}))
);

export function reducer(state: State | undefined, action: Action) {
  return toolsReducer(state, action);
}
