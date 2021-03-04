package de.mattagohni.reciptorserver.configuration

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain

@EnableWebFluxSecurity
class SecurityConfiguration {
  @Bean
  fun securitygWebFilterChain(
    http: ServerHttpSecurity
  ): SecurityWebFilterChain? {
    return http.authorizeExchange()
      .anyExchange().authenticated()
      .and().build()
  }
}
