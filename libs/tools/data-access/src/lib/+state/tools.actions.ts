/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAction, props} from '@ngrx/store';
import {ToolsEntity} from './tools.models';

export const init = createAction('[Tools Page] Init');

export const loadToolsSuccess = createAction(
  '[Tools/API] Load Tools Success',
  props<{ tools: ToolsEntity[] }>()
);

export const loadToolsFailure = createAction(
  '[Tools/API] Load Tools Failure',
  props<{ error: any }>()
);
