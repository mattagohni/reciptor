package de.mattagohni.reciptorserver.repository

import de.mattagohni.reciptorserver.model.User
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono

interface ReactiveUserRepository : ReactiveCrudRepository<User, Int> {
  fun findByUsername(username: String): Mono<User>
}
