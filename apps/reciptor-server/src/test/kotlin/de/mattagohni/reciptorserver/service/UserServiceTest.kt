package de.mattagohni.reciptorserver.service

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptorserver.model.ReciptorUser
import de.mattagohni.reciptorserver.repository.ReactiveReciptorUserRepository
import io.mockk.every
import io.mockk.slot
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Mono.empty
import reactor.core.publisher.Mono.just
import reactor.test.StepVerifier
import java.lang.RuntimeException

@Suppress("ReactiveStreamsUnusedPublisher")
@SpringBootTest(classes = [UserService::class, ReactiveReciptorUserRepository::class])
internal class UserServiceTest {
  @Autowired
  private lateinit var userService: UserService

  @MockkBean
  private lateinit var userRepository: ReactiveReciptorUserRepository

  @Test
  @DisplayName("it finds a user by username")
  fun findUserByUsername() {
    every { userRepository.findByUsername("mattagohni") } returns just(ReciptorUser("mattagohni"))

    val result = userService.findByUsername("mattagohni")

    StepVerifier.create(result)
      .assertNext { user ->
        run { assertThat(user.username).isEqualTo("mattagohni") }
      }
      .verifyComplete()
  }

  @Test
  @DisplayName("it can create a new user")
  fun creatUser() {
    val user = ReciptorUser("mattagohni")
    val savedUser = slot<ReciptorUser>()
    user.password = "myEncodeSecurePassword"
    every { userRepository.save(capture(savedUser)) } returns just(user)
    every { userRepository.findByUsername("mattagohni") } returns empty()

    val result = userService.createUser("mattagohni", "myEncodeSecurePassword")

    StepVerifier.create(result)
      .assertNext {
        run {
          assertThat(it.username).isEqualTo("mattagohni")
          assertThat(it.password).isEqualTo("myEncodeSecurePassword")
        }
      }
      .verifyComplete()

    verify(exactly = 1) { userRepository.save(savedUser.captured) }
    assertThat(savedUser.captured.username).isEqualTo("mattagohni")
    assertThat(savedUser.captured.password).isEqualTo("myEncodeSecurePassword")
  }

  @Test
  @DisplayName("it does not create a new user when user already exists")
  fun doesNotCreateUserWhenUserAlreadyExists() {
    val user = ReciptorUser("mattagohni")
    user.password = "myEncodeSecurePassword"
    every { userRepository.findByUsername("mattagohni") } returns just(ReciptorUser("mattagohni"))

    val result = userService.createUser("mattagohni", "myEncodeSecurePassword")

    StepVerifier.create(result)
      .expectErrorSatisfies { it::class === RuntimeException::class && it.localizedMessage === "User mattagohni already exists" }
      .verify()

    verify(exactly = 1) { userRepository.findByUsername(any()) }
    verify(exactly = 0) { userRepository.save(any()) }
  }
}
