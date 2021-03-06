# Add a new lib

## Generate the app

```bash
$ node node_modules/@nrwl/cli/bin/nx.js generate @nrwl/angular:library --name=<name_of_the_lib> --directory=<name_of_the_feature> --prefix=<desired_prefix> --skipFormat --style=scss --routing --lazy --unitTestRunner=jest --linter=eslint --no-interactive
```

## Add TranslateModule

in <name_of_lib>.module.ts add

```ts
@NgModule({
  imports: [OhterModules, TranslateModule.forChild()],
  declarations: [...],
  exports: [...],
})
```

## Add translation files

add folder `./libs/path/to/your/lib/src/assets` with files for every language to support and fill it with content

## Add lib-assets to builder in angular.json

```json
{
  "projects": {
    "reciptor": {
      "architect": {
        "build": {
          "assets": [
            "path/to/other/assets",
            {
              "glob": "**/*",
              "input": "./libs/path/to/your/lib/src/assets/i18n",
              "output": "./assets/i18n/name-of-your-lib/"
            }
          ]
        }
      }
    }
  }
}
```

## Add translations to the MultiHttpLoader

add the `output`-path defined in `angluar.json` to the MultiHttpLoader in `app.module.ts` of the app.

```ts
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' }, // the translations of the app
    { prefix: './assets/i18n/name-of-your-lib/', suffix: '.json' },
  ]);
}
```

### Enforce Module Boundaries
add tags to the definition of the lib in `nx.json`
You should add a tag for the type and the scope of the lib. Possible values for `type` are:
- type:feature
- type:ui
- type:data-access
- type:util

Possible values for `scope` are:
- scope:reciptor
- scope:shared

for example here is the entry for the lib `shared-ui-header`

```json
{
  "projects": {
    "shared-ui-header": {
      "tags": [
        "type:ui",
        "scope:shared"
      ]
    }
  }
}
```

