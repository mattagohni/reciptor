package de.mattagohni.reciptorserver.repository

import de.mattagohni.reciptor.model.Tool
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface ReactiveToolsRepository : ReactiveMongoRepository<Tool, String> {
  fun findByName(name: String): Mono<Tool>
}
