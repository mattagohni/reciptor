package de.mattagohni.reciptorserver.repository

import de.mattagohni.reciptorserver.model.Tool
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface ReactiveToolsRepository : ReactiveCrudRepository<Tool, Int> {
  fun findByName(name: String): Mono<Tool>
}
