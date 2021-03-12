import {TestBed} from '@angular/core/testing';

import {Observable, of} from 'rxjs';

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
    getAll: jest.fn()
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
});
