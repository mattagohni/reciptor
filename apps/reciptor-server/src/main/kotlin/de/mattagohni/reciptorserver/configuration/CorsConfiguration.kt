package de.mattagohni.reciptorserver.configuration

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "cors")
data class CorsConfiguration(
  val allowedOrigins: List<String>,
  val allowedMethods: List<String>
)
