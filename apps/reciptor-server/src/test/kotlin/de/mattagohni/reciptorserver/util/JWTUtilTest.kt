package de.mattagohni.reciptorserver.util

import de.mattagohni.reciptorserver.configuration.JWTUtilConfiguration
import de.mattagohni.reciptorserver.model.Role
import de.mattagohni.reciptorserver.model.User
import io.jsonwebtoken.Claims
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.util.Date

@SpringBootTest(
  classes = [JWTUtil::class, JWTUtilConfiguration::class],
  properties = ["reciptor.jwt.secret=ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave64ByteLength", "reciptor.jwt.expiration=3600"]
)
internal class JWTUtilTest {
  @Autowired
  private lateinit var jwtUtil: JWTUtil

  val user = User("mattagohni")

  @BeforeEach
  fun setupUser() {
    user.roles = listOf(Role.ROLE_ADMIN, Role.ROLE_BASIC_USER)
  }

  @Test
  @DisplayName("it gets all claims from a token")
  fun getAllClaims() {
    // arrange
    val token = jwtUtil.generateToken(user)

    // act
    val allClaims: Claims = jwtUtil.getAllClaimsFromToken(token) as Claims

    val issuedAt: Int = allClaims["iat"] as Int
    val expires: Int = allClaims["exp"] as Int

    // assert
    assertThat(allClaims).isInstanceOf(Claims::class.java)
    assertThat(allClaims["role"]).isEqualTo(listOf(Role.ROLE_ADMIN.toString(), Role.ROLE_BASIC_USER.toString()))
    assertThat(expires - issuedAt).isEqualTo(3600)
    assertThat(allClaims["sub"]).isEqualTo(user.username)
  }

  @Test
  @DisplayName("it gets username from a token")
  fun getUsername() {
    // arrange
    val token = jwtUtil.generateToken(user)

    // act
    val username = jwtUtil.getUsernameFromToken(token)

    // assert
    assertThat(username).isEqualTo(user.username)
  }

  @Test
  @DisplayName("it gets expiration date from a token")
  fun getExpirationDate() {
    // arrange
    val token = jwtUtil.generateToken(user)
    val now = Date()
    val expectedDate = Date(now.time + 3600 * 1000)

    // act
    val expirationDate: Date = jwtUtil.getExpirationDateFromToken(token)
    // assert

    assertThat(expirationDate).isAfter(now)
    assertThat(expirationDate).isCloseTo(expectedDate, 1000)
  }

  @Test
  @DisplayName("it can tell whether a token is not expired")
  fun isNotExpired() {
    // arrange
    val token = jwtUtil.generateToken(user)

    // act
    val isExpired: Boolean = jwtUtil.isTokenExpired(token)

    // assert
    assertThat(isExpired).isFalse
  }

  @Test
  @DisplayName("it can tell whether a token is expired")
  fun isExpired() {
    // arrange
    val token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfQURNSU4iLCJST0xFX0JBU0lDX1VTRVIiXSwic3ViIjoibWF0dGFnb2huaSIsImlhdCI6MTYyMTMzODQyNSwiZ" +
      "XhwIjoxNjIxMzM4NDI5fQ.qMRMeF-Cj3QKK2eKrr-r0pQ8w7rsQOCVrVgA9NnkHIuabi_MsGwJFB4Qor-cfjCvTG90J_YhgWSuGWun1HMKGw"

    // act
    val isExpired: Boolean = jwtUtil.isTokenExpired(token)

    // assert
    assertThat(isExpired).isTrue
  }

  @Test
  @DisplayName("it can generate a token")
  fun generateToken() {
    // act
    val token: String = jwtUtil.generateToken(user)

    // assert
    assertThat(token).matches("^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*\$")
  }

  @Test
  @DisplayName("it can validate a fresh token as valid")
  fun validateAValidToken() {
    // arrange
    val token = jwtUtil.generateToken(user)

    // act
    val isValid: Boolean = jwtUtil.validateToke(token)

    // assert
    assertThat(isValid).isTrue
  }

  @Test
  @DisplayName("it can validate an expired token as invalid")
  fun validateAnExpiredToken() {
    // arrange
    val token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfQURNSU4iLCJST0xFX0JBU0lDX1VTRVIiXSwic3ViIjoibWF0dGFnb2huaSIsImlhdCI6MTYyMTMzODQyNSwiZ" +
      "XhwIjoxNjIxMzM4NDI5fQ.qMRMeF-Cj3QKK2eKrr-r0pQ8w7rsQOCVrVgA9NnkHIuabi_MsGwJFB4Qor-cfjCvTG90J_YhgWSuGWun1HMKGw"

    // act
    val isValid: Boolean = jwtUtil.validateToke(token)

    // assert
    assertThat(isValid).isFalse
  }

  @Test
  @DisplayName("it can validate invalid token as invalid")
  fun validateAnInvalidToken() {
    // arrange
    val token = "someNoneSense"

    // act
    val isValid: Boolean = jwtUtil.validateToke(token)

    // assert
    assertThat(isValid).isFalse
  }
}
