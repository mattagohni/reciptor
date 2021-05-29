package de.mattagohni.reciptorserver.service

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptorserver.model.ReciptorUser
import de.mattagohni.reciptorserver.repository.ReactiveReciptorUserRepository
import io.mockk.every
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Mono.just
import reactor.test.StepVerifier

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
}
