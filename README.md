# Reciptor
## local development
### start local environment
you can start both `reciptor-server` as the backend and `reciptor` as the ui by running the following command

```shell
  nx serve-reciptor
```

### adding new app to start with the whole system
In `angular.json` locate the key `serve-reciptor`. There the commands are located, which have to be executed to start all
apps (ui and api), in order to start the whole reciptor-system.

If a new `app` or `api` should be started along with the existing ones you have to add a command to the `commands`-array.

## Add new Libs
see [Libs](docs/newLib.md)


## Nx

see [Nx-Readme](docs/nx.md)
