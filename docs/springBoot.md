# SpringBoot im MonoRepo
## Run migrations
In order to keep the database up to date, database migrations have to be run in case there
are changes to the database scheme.

```bash
$ (cd apps/reciptor-server && mvn flyway:migrate)
```
