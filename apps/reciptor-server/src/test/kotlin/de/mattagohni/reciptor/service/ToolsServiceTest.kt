package de.mattagohni.reciptor.service

import de.mattagohni.reciptor.model.Tool
import de.mattagohni.reciptor.repository.ReactiveToolsRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.BDDMockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import reactor.core.publisher.Mono
import reactor.test.StepVerifier

@DataMongoTest
@Import(ToolsService::class)
class ToolsServiceTest {

  @Autowired
  private lateinit var toolsService: ToolsService

  @MockBean
  private lateinit var toolsRepository: ReactiveToolsRepository

  @Test
  @DisplayName("it can save a Tool")
  fun canSaveATool() {
    // arrange
    val tool = Tool(id = "SomeId", name = "theMasterTool")
    `when`(toolsRepository.save(tool)).thenReturn(Mono.just(tool))

    // act
    val result = toolsService.saveTool(tool)

    // assert
    verify(toolsRepository, times(1)).save(tool)
    StepVerifier.create(result)
      .assertNext { resultingTool -> assertThat(resultingTool.name).isEqualTo("theMasterTool") }
      .verifyComplete()
  }

  @Test
  @DisplayName("it propagates exception when tool can not be saved by repository")
  fun throwWhenSaveNotPossible() {
    // arrange
    val tool = Tool(id = "SomeId", name = "theMasterTool")
    `when`(toolsRepository.save(tool)).thenThrow(RuntimeException("something went wrong"))

    // act
    val exception = assertThrows<RuntimeException> { toolsService.saveTool(tool) }

    // assert
    verify(toolsRepository, times(1)).save(tool)
    assertThat(exception.message).isEqualTo("something went wrong")
  }
}
