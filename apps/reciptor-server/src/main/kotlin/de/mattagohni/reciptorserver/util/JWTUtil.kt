package de.mattagohni.reciptorserver.util

import de.mattagohni.reciptorserver.configuration.JWTUtilConfiguration
import de.mattagohni.reciptorserver.model.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import java.util.Date

@Component
class JWTUtil(private val jwtUtilConfiguration: JWTUtilConfiguration) {
  private val key = Keys.hmacShaKeyFor(jwtUtilConfiguration.secret!!.toByteArray())

  fun generateToken(user: User): String {
    val claims: MutableMap<String, Any?> = HashMap()
    claims["role"] = user.roles

    // generate token
    val expirationDuration = jwtUtilConfiguration.expiration!!.toLong()

    val now = Date()
    val expirationDate = Date(now.time + expirationDuration * 1000)

    return Jwts.builder()
      .setClaims(claims)
      .setSubject(user.username)
      .setIssuedAt(now)
      .setExpiration(expirationDate)
      .signWith(key)
      .compact()
  }

  fun getAllClaimsFromToken(token: String): Claims? {
    return Jwts.parserBuilder()
      .setSigningKey(key)
      .build()
      .parse(token)
      .body as Claims
  }

  fun getUsernameFromToken(token: String): String {
    return getAllClaimsFromToken(token)!!.subject
  }

  fun getExpirationDateFromToken(token: String): Date {
    return getAllClaimsFromToken(token)!!.expiration
  }

  fun isTokenExpired(token: String): Boolean {
    return try {
      getAllClaimsFromToken(token)!!.expiration.before(Date())
    } catch (exception: ExpiredJwtException) {
      true
    }
  }

  fun validateToke(token: String): Boolean {
    return try {
      !isTokenExpired(token)
    } catch (exception: MalformedJwtException) {
      false
    }
  }
}
