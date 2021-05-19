# SpringBoot im MonoRepo
## Run migrations
In order to keep the database up to date, database migrations have to be run in case there
are changes to the database scheme.

```bash
$ (cd apps/reciptor-server && mvn flyway:migrate)
```

If a migration is not recognized even though being correctly named according to [flyway-docs](https://flywaydb.org/documentation/concepts/migrations.html#sql-based-migrations)
you should clear `/target`-folder and try again, since flyway will search in this folder for migrations.

# weiter mit
Next, create WebSecurityConfig and add EnableWebFluxSecurity and EnableReactiveMethodSecurty annotation, in this component you can configure all your security needs, like authentication manager, security context repository, which url is in permit (in this case /login), etc.
