/* eslint-disable @typescript-eslint/no-explicit-any */
import {Tool} from './tools.models';
import * as ToolsActions from './tools.actions';
import {initialState, reducer, State} from './tools.reducer';

describe('Tools Reducer', () => {
  const createToolsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Tool);

  describe('valid Tools actions', () => {
    it('loadToolsSuccess should return set the list of known Tools', () => {
      const tools = [
        createToolsEntity('PRODUCT-AAA'),
        createToolsEntity('PRODUCT-zzz'),
      ];
      const action = ToolsActions.loadToolsSuccess({tools});

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('loadToolSuccess should return the given tool', () => {
      const tool = createToolsEntity('PRODUCT-AAA', 'Knife');

      const action = ToolsActions.loadToolSuccess({tool})

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.selectedId).toEqual('PRODUCT-AAA')
    });

    it('deleteToolSuccess should remove tool from store', () => {
      const tool = createToolsEntity('PRODUCT-AAA', 'Knife');
      const givenState: State = {
        ...initialState,
        loaded: false,
        selectedId: tool.id,
        ids: [tool.id] as string[]
      }


      const action = ToolsActions.deleteToolByIdSuccess({id: tool.id});
      const result: State = reducer(givenState, action);

      // @todo check how to write correct tests for reducer
      expect(result.loaded).toBeTruthy();
//      expect(result.selectedId).not.toBe(tool.id);
    });

    it('deleteToolFailure should propagate error', () => {
      const givenState: State = {
        ...initialState,
        error: null
      }

      const action = ToolsActions.deleteToolByIdFailure({error: {status: 500}})
      const result: State = reducer(givenState, action)
      expect(result.error).toEqual({status: 500})
    });

    it('updateToolSuccess should return the updated tool', () => {
      const tool = createToolsEntity('PRODUCT-AAA', 'Knife');

      const action = ToolsActions.updateToolSuccess({tool})

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.selectedId).toEqual('PRODUCT-AAA')
    });

    it('updateToolFailure should propagate error', () => {
      const givenState: State = {
        ...initialState,
        error: null
      }

      const action = ToolsActions.updateToolFailure({error: {status: 500}})
      const result: State = reducer(givenState, action)
      expect(result.error).toEqual({status: 500})
    });

    it('saveToolSuccess should return the saved tool', () => {
      const tool = createToolsEntity('4711', 'Knife');

      const action = ToolsActions.saveToolSuccess({tool})

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.selectedId).toEqual('4711')
    });

    it('saveToolFailure should propagate error', () => {
      const givenState: State = {
        ...initialState,
        error: null
      }

      const action = ToolsActions.saveToolFailure({error: {status: 500}})
      const result: State = reducer(givenState, action)
      expect(result.error).toEqual({status: 500})
    })
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
