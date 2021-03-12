package de.mattagohni.reciptorserver.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer

@Configuration
class CustomWebfluxConfigurer(val configuration: CorsConfiguration) : WebFluxConfigurer {
  private fun getAllowedOrigins(): List<String> {
    return this.configuration.allowedOrigins
  }

  private fun getAllowedMethods(): List<String> {
    return this.configuration.allowedMethods
  }

  override fun addCorsMappings(corsRegistry: CorsRegistry) {
    val listOfAllowedMethods = this.getAllowedMethods()
    val listOfAllowedOrigins = this.getAllowedOrigins()

    corsRegistry.addMapping("/**")
      .allowedOrigins(*listOfAllowedOrigins.toTypedArray())
      .allowedMethods(*listOfAllowedMethods.toTypedArray())
  }
}
