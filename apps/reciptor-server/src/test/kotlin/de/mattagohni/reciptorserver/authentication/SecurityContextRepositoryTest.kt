package de.mattagohni.reciptorserver.authentication

import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockkClass
import io.mockk.verify
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.http.HttpHeaders
import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono
import reactor.test.StepVerifier

@Suppress("ReactiveStreamsUnusedPublisher")
internal class SecurityContextRepositoryTest {
  @MockK
  val authenticationManager: AuthenticationManager = mockkClass(AuthenticationManager::class)

  private val securityContextRepository: SecurityContextRepository = SecurityContextRepository(authenticationManager)

  @Test
  @DisplayName("it does not support save for the moment")
  fun notSupportSave() {
    // arrange
    val serverWebExchange = mockkClass(ServerWebExchange::class)
    val securityContext = mockkClass(SecurityContext::class)

    // act
    assertThrows<UnsupportedOperationException> { securityContextRepository.save(serverWebExchange, securityContext) }
  }

  @Test
  @DisplayName("it loads a security context based on authorization header for a valid token")
  fun loadSecurityContextForValidToken() {
    // arrange
    val serverWebExchange = mockkClass(ServerWebExchange::class)
    val request = mockkClass(ServerHttpRequest::class)
    val authentication = mockkClass(Authentication::class)

    every { serverWebExchange.request } returns request
    every { request.headers.getFirst(HttpHeaders.AUTHORIZATION) } returns "Bearer mySuperToken"
    every { authenticationManager.authenticate(any()) } returns Mono.just(authentication)

    // act
    val securityContext: Mono<SecurityContext> = securityContextRepository.load(serverWebExchange)

    // assert
    StepVerifier.create(securityContext)
      .expectNextCount(1)
      .verifyComplete()

    verify(exactly = 1) { serverWebExchange.request }
    verify(exactly = 1) { request.headers.getFirst(HttpHeaders.AUTHORIZATION) }
    verify(exactly = 1) { authenticationManager.authenticate(any()) }
  }
}
