package de.mattagohni.reciptor.repository

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest

@DataMongoTest
class ReactiveRecipeRepositoryTests {
  @Autowired
  private lateinit var repository: ReactiveRecipeRepository

  @Test
  @DisplayName("it can be autowired")
  fun canBeAutowired() {
    assertThat(repository).isNotNull
  }
}
