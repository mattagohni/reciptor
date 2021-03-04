package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptor.model.Tool
import de.mattagohni.reciptorserver.repository.ReactiveToolsRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.`when`
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import reactor.core.publisher.Mono
import reactor.test.StepVerifier

@SpringBootTest
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

  @Test
  @DisplayName("it can find a tool by name")
  fun returnExisting() {
    // arrange
    val tool = Tool(id = "SomeId", name = "theMasterTool")
    `when`(toolsRepository.findByName("theMasterTool")).thenReturn(Mono.just(tool))

    // act
    val resultingToolMono = toolsService.findToolByName("theMasterTool")

    // assert
    StepVerifier.create(resultingToolMono)
      .assertNext { resultingTool -> assertThat(resultingTool).isEqualTo(tool) }
      .verifyComplete()
    verify(toolsRepository, times(1)).findByName("theMasterTool")
  }
}
