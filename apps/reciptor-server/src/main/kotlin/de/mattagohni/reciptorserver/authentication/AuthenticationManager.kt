package de.mattagohni.reciptorserver.authentication

import de.mattagohni.reciptorserver.authentication.util.JWTUtil
import io.jsonwebtoken.Claims
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class AuthenticationManager(val jwtUtil: JWTUtil) : ReactiveAuthenticationManager {
  override fun authenticate(authentication: Authentication?): Mono<Authentication> {
    val token = authentication?.credentials.toString()

    try {
      if (!jwtUtil.validateToken(token)) {
        return Mono.empty()
      }
      val claims: Claims? = jwtUtil.getAllClaimsFromToken(token)
      val rolesMap: MutableList<*>? = claims?.get("role", MutableList::class.java)
      val authorities = mutableListOf<GrantedAuthority>()

      rolesMap?.forEach {
        authorities.add(SimpleGrantedAuthority(it.toString()))
      }

      return Mono.just(UsernamePasswordAuthenticationToken(claims?.subject, null, authorities))
    } catch (exception: Throwable) {
      return Mono.empty()
    }
  }
}
