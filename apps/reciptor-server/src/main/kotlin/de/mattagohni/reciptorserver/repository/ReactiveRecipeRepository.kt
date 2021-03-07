package de.mattagohni.reciptorserver.repository

import de.mattagohni.reciptorserver.model.Recipe
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ReactiveRecipeRepository : ReactiveCrudRepository<Recipe, Int> {
  fun findByName(name: String)
}
