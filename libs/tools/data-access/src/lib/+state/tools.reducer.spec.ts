/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tool } from './tools.models';
import * as ToolsActions from './tools.actions';
import { State, initialState, reducer } from './tools.reducer';

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
      const action = ToolsActions.loadToolsSuccess({ tools });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
