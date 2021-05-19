package de.mattagohni.reciptorserver.authentication

import org.springframework.http.HttpHeaders
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.security.web.server.context.ServerSecurityContextRepository
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

@Component
class SecurityContextRepository(val authenticationManager: AuthenticationManager) : ServerSecurityContextRepository {
  private val tokenPrefix = "Bearer "

  override fun save(serverWebExchange: ServerWebExchange?, securityContext: SecurityContext?): Mono<Void> {
    throw UnsupportedOperationException("not yet supported")
  }

  override fun load(serverWebExchange: ServerWebExchange?): Mono<SecurityContext> {
    val request: ServerHttpRequest = serverWebExchange!!.request
    val authenticationHeader: String? = request.headers.getFirst(HttpHeaders.AUTHORIZATION)

    if (authenticationHeader !== null && authenticationHeader.startsWith(tokenPrefix)) {
      val token = authenticationHeader.substring(tokenPrefix.length)
      val authentication: Authentication = UsernamePasswordAuthenticationToken(token, token)

      return authenticationManager.authenticate(authentication).map { SecurityContextImpl(it) }
    }
    return Mono.empty()
  }
}
