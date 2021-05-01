import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';

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
  on(ToolsActions.loadToolFailure, (state, {error}) => ({...state, error})),

  // deleting a specific tool
  on(ToolsActions.deleteToolById, (state) => ({...state, loaded: false, error: null})),
  on(ToolsActions.deleteToolByIdSuccess, (state, {id}) => (toolsAdapter.removeOne(id.toString(), {
    ...state,
    loaded: true,
  }))),
  on(ToolsActions.deleteToolByIdFailure, (state, {error}) => ({...state, error})),

  on(ToolsActions.updateTool, (state) => ({...state, loaded: false, error: null})),
  on(ToolsActions.updateToolSuccess, (state, {tool}) => (toolsAdapter.updateOne({
    id: tool.id,
    changes: {...tool} as Partial<Tool>
  } as Update<Tool>, {...state, loaded: true, selectedId: tool.id}))),
  on(ToolsActions.updateToolFailure, (state, {error}) => ({...state, error})),

  on(ToolsActions.saveTool, (state) => ({...state, loaded: false, error: null})),
  on(ToolsActions.saveToolSuccess, (state, {tool}) => (toolsAdapter.addOne(
    tool,
    {
      ...state,
      loaded: true,
      selectedId: tool.id
    }
  ))),
  on(ToolsActions.saveToolFailure, (state, {error}) => ({...state, error}))
);

export function reducer(state: State | undefined, action: Action) {
  return toolsReducer(state, action);
}
