import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {readFirst} from '@nrwl/angular/testing';

import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';

import {NxModule} from '@nrwl/angular';

import {Tool} from './tools.models';
import {ToolsEffects} from './tools.effects';
import {ToolsFacade} from './tools.facade';
import * as ToolsActions from './tools.actions';
import {reducer, State, TOOLS_FEATURE_KEY,} from './tools.reducer';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolsService} from '../tools.service';
import {of} from 'rxjs';

interface TestSchema {
  tools: State;
}

describe('ToolsFacade', () => {
  let facade: ToolsFacade;
  let store: Store<TestSchema>;
  const toolsServiceMock = {
    getAll: jest.fn(),
    getTool: jest.fn(),
    deleteTool: jest.fn()
  }

  const createToolsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Tool);

  describe('used in NgModule', () => {
    afterEach(() => {
      jest.clearAllMocks();
    })
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TOOLS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ToolsEffects]),
          HttpClientTestingModule
        ],
        providers: [ToolsFacade],
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
        providers: [
          {provide: ToolsService, useValue: toolsServiceMock}
        ]
      })
      class RootModule {
      }

      TestBed.configureTestingModule({imports: [RootModule]});

      store = TestBed.inject(Store);
      facade = TestBed.inject(ToolsFacade);
    });

    describe('init store', () => {
      it('loadAll() should return list of tools with loaded == true', async (done) => {
        try {
          toolsServiceMock.getAll.mockReturnValue(of([createToolsEntity('AAA', 'knife'), createToolsEntity('BBB', 'spoon')]));
          let list = await readFirst(facade.allTools$);
          let isLoaded = await readFirst(facade.loaded$);

          expect(list.length).toBe(0);
          expect(isLoaded).toBe(false);

          facade.init();

          list = await readFirst(facade.allTools$);
          isLoaded = await readFirst(facade.loaded$);

          expect(list.length).toBe(2);
          expect(isLoaded).toBe(true);

          done();
        } catch (err) {
          done.fail(err);
        }
      });
    })

    describe('fetching data', () => {
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
              tools: [createToolsEntity('AAA', 'knife'), createToolsEntity('BBB', 'spoon')],
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

      it('selectedTool$ should return the tool for the given id; and loaded flag == true', async (done) => {
        try {
          toolsServiceMock.getTool.mockReturnValue(of(createToolsEntity('PRODUCT-CCC', 'egg slicer')));
          let selected = await readFirst(facade.selectedTool$);
          let isLoaded = await readFirst(facade.loaded$);
          expect(selected).toBeUndefined();
          expect(isLoaded).toBe(false);

          store.dispatch(
            ToolsActions.loadToolById({
              id: 'PRODUCT-CCC'
            })
          )

          selected = await readFirst(facade.selectedTool$);
          isLoaded = await readFirst(facade.loaded$);

          expect(selected.name).toEqual('egg slicer');
          expect(isLoaded).toBe(true);
          expect(toolsServiceMock.getTool).toHaveBeenNthCalledWith(1, 'PRODUCT-CCC')
          done();
        } catch (err) {
          done.fail(err);
        }
      })
    })
    describe('delete data', () => {
      it('it should delete given tool', async (done) => {
        try {
          toolsServiceMock.deleteTool.mockReturnValue(of('PRODUCT-CCC'));

          store.dispatch(
            ToolsActions.deleteToolById({
              id: 'PRODUCT-CCC'
            })
          )

          const isLoaded = await readFirst(facade.loaded$);

          expect(isLoaded).toBe(true);
          expect(toolsServiceMock.deleteTool).toHaveBeenNthCalledWith(1, 'PRODUCT-CCC')
          done();
        } catch (err) {
          done.fail(err);
        }
      });
    });
  });
});
