/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAction, props} from '@ngrx/store';
import {Tool} from './tools.models';

export const init = createAction('[Tools Page] Init');

export const loadToolsSuccess = createAction(
  '[Tools/API] Load Tools Success',
  props<{ tools: Tool[] }>()
);

export const loadToolsFailure = createAction(
  '[Tools/API] Load Tools Failure',
  props<{ error: any }>()
);

export const loadToolById = createAction(
  '[Tools/API] Load Tool by ID',
  props<{ id: number | string }>()
)

export const loadToolSuccess = createAction(
  '[Tools/API] Load Tool Success',
  props<{ tool: Tool }>()
)

export const loadToolFailure = createAction(
  '[Tools/API] Load Tool Failure',
  props<{ error: any }>()
)

export const deleteToolById = createAction(
  '[Tools/API] Delete Tool by ID',
  props<{ id: number | string }>()
)

export const deleteToolByIdSuccess = createAction(
  '[Tools/API] Delete Tool Success',
  props<{ id: number | string }>()
)

export const deleteToolByIdFailure = createAction(
  '[Tools/API] Delete Tool Failure',
  props<{ error: any }>()
)

export const updateTool = createAction(
  '[Tools/API] Update Tool',
  props<{ tool: Tool }>()
)

export const updateToolSuccess = createAction(
  '[Tools/API] Update Tool Success',
  props<{ tool: Tool }>()
)

export const updateToolFailure = createAction(
  '[Tools/API] Update Tool Failure',
  props<{ error: any }>()
)

export const saveTool = createAction(
  '[Tools/API] Save Tool',
  props<{ tool: Tool }>()
)

export const saveToolSuccess = createAction(
  '[Tools/API] Save Tool Success',
  props<{ tool: Tool }>()
)

export const saveToolFailure = createAction(
  '[Tools/API] Save Tool Failure',
  props<{ error: any }>()
)
