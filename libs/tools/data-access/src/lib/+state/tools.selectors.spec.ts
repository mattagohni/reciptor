import {Tool} from './tools.models';
import {initialState, toolsAdapter} from './tools.reducer';
import * as ToolsSelectors from './tools.selectors';

describe('Tools Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getToolsId = (it) => it['id'];
  const createToolsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Tool);

  let state;

  beforeEach(() => {
    state = {
      tools: toolsAdapter.setAll(
        [
          createToolsEntity('PRODUCT-AAA'),
          createToolsEntity('PRODUCT-BBB'),
          createToolsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Tools Selectors', () => {
    it('getAllTools() should return the list of Tools', () => {
      const results = ToolsSelectors.getAllTools(state);
      const selId = getToolsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ToolsSelectors.getSelected(state);
      const selId = getToolsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getToolsLoaded() should return the current \'loaded\' status', () => {
      const result = ToolsSelectors.getToolsLoaded(state);

      expect(result).toBe(true);
    });

    it('getToolsError() should return the current \'error\' state', () => {
      const result = ToolsSelectors.getToolsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
