package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptorserver.exception.UserAlreadyExistsException
import de.mattagohni.reciptorserver.model.ReciptorUser
import de.mattagohni.reciptorserver.repository.ReactiveReciptorUserRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class UserService(private val userRepository: ReactiveReciptorUserRepository) {
  fun findByUsername(username: String): Mono<ReciptorUser> {
    return userRepository.findByUsername(username)
  }

  fun createUser(username: String, encodedPassword: String): Mono<ReciptorUser> {
    return userRepository.findByUsername(username)
      .doOnNext { throwError(it) }
      .switchIfEmpty(Mono.just(ReciptorUser(username)))
      .map { user ->
        user.password = encodedPassword
        user
      }
      .flatMap { user -> userRepository.save(user) }
  }

  private fun throwError(it: ReciptorUser?) {
    throw UserAlreadyExistsException("User " + it?.username + " already exists")
  }
}
