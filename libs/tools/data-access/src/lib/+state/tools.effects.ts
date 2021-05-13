import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ToolsActions from './tools.actions';
import {ToolsService} from '../tools.service';
import {map, mergeMap} from 'rxjs/operators';
import {Tool} from './tools.models';

@Injectable()
export class ToolsEffects {
  init$ = createEffect(
    () => this.actions$.pipe(
      ofType(ToolsActions.init),
      mergeMap(() => {
        return this.toolsService.getAll()
          .pipe(
            map(tools => ToolsActions.loadToolsSuccess({tools}))
          );
      }),
    ));

  loadTool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.loadToolById),
      mergeMap((action) => {
        return this.toolsService.getTool(action.id).pipe(
          map(tool => ToolsActions.loadToolSuccess({tool}))
        )
      })
    ));

  deleteTool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.deleteToolById),
      mergeMap((action) => {
        return this.toolsService.deleteTool(action.id).pipe(
          map(() => ToolsActions.deleteToolByIdSuccess({id: action.id}))
        )
      })
    ));

  updateTool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.updateTool),
      mergeMap((action) => {
        return this.toolsService.updateTool(action.tool).pipe(
          map((tool: Tool) => ToolsActions.updateToolSuccess({tool}))
        )
      })
    ));

  saveTool$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.saveTool),
      mergeMap((action) => {
        return this.toolsService.saveTool(action.tool).pipe(
          map((tool: Tool) => ToolsActions.saveToolSuccess({tool}))
        )
      })
    ));

  constructor(private actions$: Actions, private toolsService: ToolsService) {
  }
}
