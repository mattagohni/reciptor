package de.mattagohni.reciptor.repository

import de.mattagohni.reciptor.model.Recipe
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ReactiveRecipeRepository : ReactiveMongoRepository<Recipe, String> {
  fun findByName(name: String)
}
