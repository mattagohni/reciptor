package de.mattagohni.reciptorserver.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "reciptor.password.encoder")
class PasswordEncoderConfiguration {
  var secret: String? = null
  var iteration: Int? = null
  var keylength: Int? = null
}
