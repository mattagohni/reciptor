package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptorserver.model.User
import de.mattagohni.reciptorserver.repository.ReactiveUserRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class UserService(private val userRepository: ReactiveUserRepository) {
  fun findByUsername(username: String): Mono<User> {
    return userRepository.findByUsername(username)
  }
}
