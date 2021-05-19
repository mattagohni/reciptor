package de.mattagohni.reciptorserver.repository

import de.mattagohni.reciptorserver.model.ReciptorUser
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Mono

interface ReactiveReciptorUserRepository : ReactiveCrudRepository<ReciptorUser, Int> {
  fun findByUsername(username: String): Mono<ReciptorUser>
}
