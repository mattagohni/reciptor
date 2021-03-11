import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ToolsEntity } from './tools.models';
import { ToolsEffects } from './tools.effects';
import { ToolsFacade } from './tools.facade';

import * as ToolsSelectors from './tools.selectors';
import * as ToolsActions from './tools.actions';
import {
  TOOLS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './tools.reducer';

interface TestSchema {
  tools: State;
}

describe('ToolsFacade', () => {
  let facade: ToolsFacade;
  let store: Store<TestSchema>;
  const createToolsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ToolsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TOOLS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ToolsEffects]),
        ],
        providers: [ToolsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ToolsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allTools$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allTools$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadToolsSuccess` to manually update list
     */
    it('allTools$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allTools$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          ToolsActions.loadToolsSuccess({
            tools: [createToolsEntity('AAA'), createToolsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allTools$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
