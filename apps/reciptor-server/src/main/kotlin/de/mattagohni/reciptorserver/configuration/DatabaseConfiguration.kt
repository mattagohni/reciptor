package de.mattagohni.reciptorserver.configuration

import io.r2dbc.pool.PoolingConnectionFactoryProvider.MAX_SIZE
import io.r2dbc.spi.ConnectionFactories
import io.r2dbc.spi.ConnectionFactory
import io.r2dbc.spi.ConnectionFactoryOptions
import io.r2dbc.spi.ConnectionFactoryOptions.DATABASE
import io.r2dbc.spi.ConnectionFactoryOptions.DRIVER
import io.r2dbc.spi.ConnectionFactoryOptions.HOST
import io.r2dbc.spi.ConnectionFactoryOptions.PASSWORD
import io.r2dbc.spi.ConnectionFactoryOptions.PORT
import io.r2dbc.spi.ConnectionFactoryOptions.USER
import org.springframework.context.annotation.Configuration
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration

@Configuration
class DatabaseConfiguration : AbstractR2dbcConfiguration() {
  override fun connectionFactory(): ConnectionFactory {
    return ConnectionFactories.get(
      ConnectionFactoryOptions.builder()
        .option(DRIVER, "postgresql")
        .option(HOST, "localhost")
        .option(PORT, 5432)
        .option(USER, "reciptor")
        .option(PASSWORD, "reciptor")
        .option(DATABASE, "postgres")
        .option(MAX_SIZE, 40)
        .build()
    )
  }
}
