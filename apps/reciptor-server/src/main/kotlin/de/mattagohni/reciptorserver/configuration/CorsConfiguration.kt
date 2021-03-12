package de.mattagohni.reciptorserver.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties(prefix = "cors")
data class CorsConfiguration(
  val allowedOrigins: List<String>,
  val allowedMethods: List<String>
)
