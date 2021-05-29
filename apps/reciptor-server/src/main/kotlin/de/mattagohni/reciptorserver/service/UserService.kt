package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptorserver.model.ReciptorUser
import de.mattagohni.reciptorserver.repository.ReactiveReciptorUserRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class UserService(private val userRepository: ReactiveReciptorUserRepository) {
  fun findByUsername(username: String): Mono<ReciptorUser> {
    return userRepository.findByUsername(username)
  }
}
