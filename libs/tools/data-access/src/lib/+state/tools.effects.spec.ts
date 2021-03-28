/* eslint-disable @typescript-eslint/no-explicit-any */
import {TestBed} from '@angular/core/testing';

import {Observable, of, throwError} from 'rxjs';

import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';

import {DataPersistence, NxModule} from '@nrwl/angular';
import {hot} from '@nrwl/angular/testing';

import {ToolsEffects} from './tools.effects';
import * as ToolsActions from './tools.actions';
import {ToolsService} from '../tools.service';

describe('ToolsEffects', () => {
  let actions: Observable<any>;
  let effects: ToolsEffects;
  const toolsService = {
    getAll: jest.fn(),
    getTool: jest.fn(),
    deleteTool: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ToolsEffects,
        DataPersistence,
        {provide: ToolsService, useValue: toolsService},
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ToolsEffects);
  });

  describe('init$', () => {
    it('it loads all existing tools', () => {
      toolsService.getAll.mockReturnValue(of([{id: 1, name: 'knife'}, {id: 2, name: 'spoon'}]))
      actions = hot('-a-|', {a: ToolsActions.init()});

      const expected = hot('-a-|', {
        a: ToolsActions.loadToolsSuccess({tools: [{id: 1, name: 'knife'}, {id: 2, name: 'spoon'}]}),
      });

      expect(effects.init$).toBeObservable(expected);
      expect(toolsService.getAll).toHaveBeenCalledTimes(1)
    });
  });

  describe('loading tool$', () => {
    it('it loads a given tool by id', () => {
      toolsService.getTool.mockReturnValue(of({id: 1, name: 'knife'}));
      actions = hot('-a-|', {a: ToolsActions.loadToolById({id: 1})});

      const expected = hot('-a-|', {
        a: ToolsActions.loadToolSuccess({tool: {id: 1, name: 'knife'}})
      });

      expect(effects.loadTool$).toBeObservable(expected);
      expect(toolsService.getTool).toHaveBeenNthCalledWith(1, 1)
    });

    it('should receive an error, when loading fails', function () {
      toolsService.getTool.mockReturnValue(throwError({status: 404}));
      actions = hot('-a-|', {a: ToolsActions.loadToolById({id: 1})});

      const expected = hot('-a-|', {
        a: ToolsActions.loadToolFailure({error: {status: 404}})
      });

      expect(effects.loadTool$).toBeObservable(expected);
      expect(toolsService.getTool).toHaveBeenNthCalledWith(1, 1)
    });
  })

  describe('deleting tool$', () => {
    it('it deletes a given tool by id', () => {
      toolsService.deleteTool.mockReturnValue(of({status: 200}));
      actions = hot('-a-|', {a: ToolsActions.deleteToolById({id: 1})});

      const expected = hot('-a-|', {
        a: ToolsActions.deleteToolByIdSuccess({id: 1})
      });

      expect(effects.deleteTool$).toBeObservable(expected);
      expect(toolsService.deleteTool).toHaveBeenNthCalledWith(1, 1)
    });

    it('it fires failure action if tool cannot be deleted', () => {
      toolsService.deleteTool.mockReturnValue(throwError({status: 404}));
      actions = hot('-a-|', {a: ToolsActions.deleteToolById({id: 1})});

      const expected = hot('-a-|', {
        a: ToolsActions.deleteToolByIdFailure({error: {status: 404}})
      });

      expect(effects.deleteTool$).toBeObservable(expected);
      expect(toolsService.deleteTool).toHaveBeenNthCalledWith(1, 1)
    });
  });
});
