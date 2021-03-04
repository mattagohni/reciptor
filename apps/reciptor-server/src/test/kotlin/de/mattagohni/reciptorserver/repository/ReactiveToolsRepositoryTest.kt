package de.mattagohni.reciptorserver.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest

@DataMongoTest
class ReactiveToolsRepositoryTest {
  @Autowired
  private lateinit var repository: ReactiveToolsRepository

  @Test
  @DisplayName("it can be autowired")
  fun canBeAutowired() {
    Assertions.assertThat(repository).isNotNull
  }
}
