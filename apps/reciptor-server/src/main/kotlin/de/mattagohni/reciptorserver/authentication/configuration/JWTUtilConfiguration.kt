package de.mattagohni.reciptorserver.authentication.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "reciptor.jwt")
class JWTUtilConfiguration {
  var secret: String? = null
  var expiration: Int? = null
}
