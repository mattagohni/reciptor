package de.mattagohni.reciptorserver.configuration

import de.mattagohni.reciptorserver.authentication.AuthenticationManager
import de.mattagohni.reciptorserver.authentication.SecurityContextRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain
import reactor.core.publisher.Mono

@EnableWebFluxSecurity
@Configuration
class SecurityConfiguration(
  val authenticationManager: AuthenticationManager,
  val securityContextRepository: SecurityContextRepository
) {

  @Bean
  fun securityWebFilterChain(
    http: ServerHttpSecurity
  ): SecurityWebFilterChain? {
    return http
      .exceptionHandling()
      .authenticationEntryPoint { serverWebExchange, _ ->
        Mono.fromRunnable {
          serverWebExchange.response.statusCode = HttpStatus.UNAUTHORIZED
        }
      }.accessDeniedHandler { serverWebExchange, _ ->
        Mono.fromRunnable { serverWebExchange.response.statusCode = HttpStatus.FORBIDDEN }
      }.and()
      .csrf().disable()
      .formLogin().disable()
      .httpBasic().disable()
      .authenticationManager(authenticationManager)
      .securityContextRepository(securityContextRepository)
      .authorizeExchange()
      .pathMatchers(HttpMethod.OPTIONS).permitAll()
      .pathMatchers("/api/v1/login", "/api/v1/register").permitAll()
      .anyExchange().authenticated()
      .and().build()
  }
}
