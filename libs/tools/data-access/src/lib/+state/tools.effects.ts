import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ToolsFeature from './tools.reducer';
import * as ToolsActions from './tools.actions';

@Injectable()
export class ToolsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ToolsActions.loadToolsSuccess({ tools: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ToolsActions.loadToolsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}