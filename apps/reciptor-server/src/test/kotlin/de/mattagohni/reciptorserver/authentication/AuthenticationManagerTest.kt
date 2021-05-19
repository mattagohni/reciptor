package de.mattagohni.reciptorserver.authentication

import de.mattagohni.reciptorserver.authentication.util.JWTUtil
import de.mattagohni.reciptorserver.model.Role
import io.jsonwebtoken.Claims
import io.jsonwebtoken.impl.DefaultClaims
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockkClass
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import reactor.test.StepVerifier

internal class AuthenticationManagerTest {
  @MockK
  private val jwtUtil: JWTUtil = mockkClass(JWTUtil::class)

  private val authenticationManager = AuthenticationManager(jwtUtil)

  @Test
  @DisplayName("it can authenticate")
  fun authenticate() {
    val authentication: Authentication = UsernamePasswordAuthenticationToken("mattagohni", "someToken", mutableListOf())
    val claims: Claims = DefaultClaims()
    claims["role"] = mutableListOf(Role.ROLE_ADMIN.toString())

    every { jwtUtil.validateToken("someToken") } returns true
    every { jwtUtil.getAllClaimsFromToken("someToken") } returns claims

    // act
    val result = authenticationManager.authenticate(authentication)

    StepVerifier.create(result)
      .assertNext {
        assertThat(it.authorities.first().authority).isEqualTo("ROLE_ADMIN")
      }.verifyComplete()
    verify(exactly = 1) { jwtUtil.validateToken("someToken") }
    verify(exactly = 1) { jwtUtil.getAllClaimsFromToken("someToken") }
  }

  @Test
  @DisplayName("it does not authenticate for invalid token")
  fun notAuthenticateInvalidToken() {
    val authentication: Authentication = UsernamePasswordAuthenticationToken("mattagohni", "someInvalidToken", mutableListOf())
    val claims: Claims = DefaultClaims()
    claims["role"] = mutableListOf(Role.ROLE_ADMIN.toString())

    every { jwtUtil.validateToken("someInvalidToken") } returns false

    // act
    val result = authenticationManager.authenticate(authentication)

    StepVerifier.create(result)
      .expectNextCount(0)
      .verifyComplete()
    verify(exactly = 1) { jwtUtil.validateToken("someInvalidToken") }
    verify(exactly = 0) { jwtUtil.getAllClaimsFromToken(any()) }
  }
}
