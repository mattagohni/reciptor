# Working with ngrx

## how to add functionality to an existing store

### Adding actions for your new functionality

in `*.actions.ts` add an action which represents the behaviour, e.g. `loadToolById`

```ts
export const loadToolById = createAction(
  '[Tools/API] Load Tool by ID',
  props<{ id: number }>()
)
```

The first parameter should identify the action, so you know what happened if you see this string in a log. The second
parameter, `props`, is an object where you can give numerous things, in this case the id of the tool. In addition to
this action, you should have 2 more actions. One which is fired for successful execution of your `loadXByY`-method and
one for failure

```ts
export const loadToolSuccess = createAction(
  '[Tools/API] Load Tool Success',
  props<{ tool: Tool }>()
)

export const loadToolFailure = createAction(
  '[Tools/API] Load Tool Failure',
  props<{ error: any }>()
)
```

The success-action will have the loaded tool inside which can be used later in a reducer to update your state. The
failure-action should contain the error causing the failure.

### Use the actions in your effects

These actions can be executed by effects. The corresponding effects-file will get the `actions` injected, which enables
it, to create effects for them.

```ts
tool$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ToolsActions.loadToolById),
    fetch({
      run: (action) => {
        return this.toolsService.getTool(action.id).pipe(
          map(tool => ToolsActions.loadToolSuccess({tool}))
        )
      },
      onError: (action, error) => {
        console.error('Error', error);
        return ToolsActions.loadToolFailure({error});
      }
    })
  ))
```

As you can see when executing the `loadToolById` action we use the `success`- and `failure`-actions based on the result.
The effects are the only part, where the service which is responsible for fetching the data is injected.

### Define how the state gets updated in the reducer

In order to update the state, we use `reducers`. The purpose for them is to update the state for given `actions`.

#### What should be changed in the state
With our example `loadToolById` and its corresponding `success`- and `failure`-actions, this would look something like
this:

```ts
const toolsReducer = createReducer(
  initialState,
  // loading one specific tool
  on(
    ToolsActions.loadToolById,
    (state) => ({...state, loaded: false, error: null})),
  on(
    ToolsActions.loadToolSuccess,
    (state, {tool}) => toolsAdapter.setOne(tool, {
      ...state,
      selectedId: tool.id,
      loaded: true
    })
  ),
  on(
    ToolsActions.loadToolFailure,
    (state, {error}) => ({...state, error})
  )
);
```

##### general
the `...state` syntax allows us to get a new state based on the old one without modifying it directly. This way
we only have to set the values we need and return this as our new state.

##### loadToolById
When we trigger the `loadToolById`-action we also have to set `loaded` to false, since at this point the tool is not loaded yet.
Furthermore, we can set `error` to null, since no error has been received yet. Both values will be set by either the `success` or the `failure`-action

##### loadToolByIdSuccess
In case of `success` we have to parameters. The first one is the current `state` again. The second one is the tool which was successfully loaded.
To update the state with the new selected Tool we use the `toolsAdapter`, where a `setOne`-method exists which will add/set the given tool in the state.
Furthermore, we set the `selectedId` to the `id` of the `tool`.

##### loadToolByIdFailure
In case of `failure` we also get the current state with the `...`-operator and set the `error` property to the error, which caused the failure

## Facade
Instead of injecting the store into your components, you can use the `facade`. In our example it would be the `tools.facade.ts`. 
