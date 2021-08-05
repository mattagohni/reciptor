package de.mattagohni.reciptorserver.controller

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptorserver.authentication.AuthenticationManager
import de.mattagohni.reciptorserver.authentication.SecurityContextRepository
import de.mattagohni.reciptorserver.authentication.util.JWTUtil
import de.mattagohni.reciptorserver.authentication.util.PBKDF2Encoder
import de.mattagohni.reciptorserver.configuration.CorsConfiguration
import de.mattagohni.reciptorserver.configuration.DatabaseConfiguration
import de.mattagohni.reciptorserver.configuration.SecurityConfiguration
import de.mattagohni.reciptorserver.model.AuthRequest
import de.mattagohni.reciptorserver.model.ReciptorUser
import de.mattagohni.reciptorserver.service.UserService
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.context.annotation.Import
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.web.reactive.function.BodyInserters
import reactor.core.publisher.Mono.just
import java.util.*

@AutoConfigureWebTestClient
@WebFluxTest(
  controllers = [UserController::class],
  properties = [
    "reciptor.password.encoder.secret=superSecret",
    "reciptor.password.encoder.iteration=25",
    "reciptor.password.encoder.keylength=512",
    "reciptor.jwt.secret=ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave64ByteLength",
    "reciptor.jwt.expiration=3600"
  ]
)
@Import(
  CorsConfiguration::class,
  SecurityConfiguration::class,
  SecurityContextRepository::class,
  AuthenticationManager::class,
  DatabaseConfiguration::class
)
internal class UserControllerTest {
  @Autowired
  private lateinit var webTestClient: WebTestClient

  @MockkBean
  private lateinit var jwtUtil: JWTUtil

  @MockkBean
  private lateinit var pbkdF2Encoder: PBKDF2Encoder

  @MockkBean
  private lateinit var userService: UserService

  @Test
  fun loginSuccessful() {
    val authRequest = AuthRequest("mattagohni", "myCorrectPassword")
    val user = ReciptorUser(username = authRequest.username)
    user.password = "theEncodeValueOfTheCorrectPassword"
    val now = Date()
    val mockedExpirationDate = Date(now.time + 3600)

    every { userService.findByUsername(authRequest.username) } returns just(user)
    every { pbkdF2Encoder.encode(authRequest.password) } returns "theEncodeValueOfTheCorrectPassword"
    every { jwtUtil.generateToken(user) } returns "tokenGeneratedForCorrectPassword"
    every { jwtUtil.getExpirationDateFromToken("tokenGeneratedForCorrectPassword") } returns mockedExpirationDate

    webTestClient.mutateWith(csrf()).post().uri("/api/v1/login")
      .body(BodyInserters.fromValue(authRequest))
      .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
      .exchange()
      .expectStatus().is2xxSuccessful

    verify(exactly = 1) { userService.findByUsername(authRequest.username) }
    verify(exactly = 1) { pbkdF2Encoder.encode(authRequest.password) }
    verify(exactly = 1) { jwtUtil.generateToken(user) }
    verify(exactly = 1) { jwtUtil.getExpirationDateFromToken("tokenGeneratedForCorrectPassword") }
  }

  @Test
  fun loginFailure() {
    val authRequest = AuthRequest("mattagohni", "myInCorrectPassword")
    val user = ReciptorUser(username = authRequest.username)
    user.password = "theEncodeValueOfTheCorrectPassword"

    every { userService.findByUsername(authRequest.username) } returns just(user)
    every { pbkdF2Encoder.encode(authRequest.password) } returns "theEncodeValueOfTheInCorrectPassword"

    webTestClient.mutateWith(csrf()).post().uri("/api/v1/login")
      .body(BodyInserters.fromValue(authRequest))
      .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
      .exchange()
      .expectStatus().is4xxClientError

    verify(exactly = 1) { userService.findByUsername(authRequest.username) }
    verify(exactly = 1) { pbkdF2Encoder.encode(authRequest.password) }
    verify(exactly = 0) { jwtUtil.generateToken(any()) }
    verify(exactly = 0) { jwtUtil.getExpirationDateFromToken(any()) }
  }
}
