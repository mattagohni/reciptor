import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';
import * as ToolsActions from './tools.actions';
import {ToolsService} from '../tools.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ToolsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.init),
      fetch({
        // @todo remove this suppression when the variable is used
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        run: (action) => {
          return this.toolsService.getAll()
            .pipe(
              map(tools => ToolsActions.loadToolsSuccess({tools}))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ToolsActions.loadToolsFailure({error});
        },
      })
    )
  );

  loadTool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.loadToolById),
      fetch({
        run: (action) => {
          return this.toolsService.getTool(action.id).pipe(
            map(tool => ToolsActions.loadToolSuccess({tool}))
          )
        },
        onError: (action, error) => {
          return ToolsActions.loadToolFailure({error});
        }
      })
    )
  );

  deleteTool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.deleteToolById),
      fetch({
        run: (action) => {
          return this.toolsService.deleteTool(action.id).pipe(
            map(() => ToolsActions.deleteToolByIdSuccess({id: action.id}))
          )
        },
        onError: (action, error) => {
          return ToolsActions.deleteToolByIdFailure({error})
        }
      })
    )
  );

  constructor(private actions$: Actions, private toolsService: ToolsService) {
  }
}
