package de.mattagohni.reciptor.repository

import de.mattagohni.reciptor.model.Tool
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface ReactiveToolsRepository : ReactiveMongoRepository<Tool, String> {
}
