package de.mattagohni.reciptorserver.service

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptor.model.Tool
import de.mattagohni.reciptorserver.repository.ReactiveToolsRepository
import io.mockk.every
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import reactor.core.publisher.Mono
import reactor.test.StepVerifier

@SpringBootTest
class ToolsServiceTest {

  @Autowired
  private lateinit var toolsService: ToolsService

  @MockkBean
  private lateinit var toolsRepository: ReactiveToolsRepository

  @Test
  @DisplayName("it can save a Tool")
  fun canSaveATool() {
    // arrange
    val tool = Tool(id = "SomeId", name = "theMasterTool")
    every { toolsRepository.save(tool) } returns Mono.just(tool)

    // act
    val result = toolsService.saveTool(tool)

    // assert
    verify { toolsRepository.save(tool) }
    StepVerifier.create(result)
      .assertNext { resultingTool -> assertThat(resultingTool.name).isEqualTo("theMasterTool") }
      .verifyComplete()
  }

  @Test
  @DisplayName("it propagates exception when tool can not be saved by repository")
  fun throwWhenSaveNotPossible() {
    // arrange
    val tool = Tool(id = "SomeId", name = "theMasterTool")
    every { toolsRepository.save(tool) }.throws(RuntimeException("something went wrong"))

    // act
    val exception = assertThrows<RuntimeException> { toolsService.saveTool(tool) }

    // assert
    verify { toolsRepository.save(tool) }
    assertThat(exception.message).isEqualTo("something went wrong")
  }

  @Test
  @DisplayName("it can find a tool by name")
  fun returnExisting() {
    // arrange
    val tool = Tool(id = "SomeId", name = "theMasterTool")
    every { toolsRepository.findByName(any<String>()) }.returns(Mono.just(tool))

    // act
    val resultingToolMono = toolsService.findToolByName("theMasterTool")

    // assert
    StepVerifier.create(resultingToolMono)
      .assertNext { resultingTool -> assertThat(resultingTool).isEqualTo(tool) }
      .verifyComplete()
    verify { toolsRepository.findByName("theMasterTool") }
  }
}
