package de.mattagohni.reciptorserver.service

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptorserver.model.Tool
import de.mattagohni.reciptorserver.repository.ReactiveToolsRepository
import io.mockk.every
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.test.StepVerifier

// suppressed because mockk produces a false-positive when returning a mono
@Suppress("ReactiveStreamsUnusedPublisher")
@SpringBootTest
class ToolsServiceTest {

  @Autowired
  private lateinit var toolsService: ToolsService

  @MockkBean
  private lateinit var toolsRepository: ReactiveToolsRepository

  @Test
  @DisplayName("it can return a list of all tools")
  fun getAllTools() {
    // arrange
    val toolsFlux = Flux.just(Tool(id = 1, name = "knife"), Tool(id = 2, name = "spoon"))
    every { toolsRepository.findAll() } returns toolsFlux

    // act
    val result: Flux<Tool> = toolsService.getAll()

    // assert
    StepVerifier.create(result)
      .assertNext { tool ->
        run {
          assertThat(tool.id).isEqualTo(1)
          assertThat(tool.name).isEqualTo("knife")
        }
      }
      .assertNext { tool ->
        run {
          assertThat(tool.id).isEqualTo(2)
          assertThat(tool.name).isEqualTo("spoon")
        }
      }
      .verifyComplete()
  }

  @Test
  @DisplayName("it can save a Tool")
  fun canSaveATool() {
    // arrange
    val tool = Tool(id = null, name = "theMasterTool")
    val toolAfterSave = tool.copy(id = 1)
    every { toolsRepository.findByName(tool.name) } returns Mono.empty()
    every { toolsRepository.save(any<Tool>()) } returns Mono.just(toolAfterSave)

    // act
    val result = toolsService.saveTool(tool)

    // assert
    StepVerifier.create(result)
      .assertNext { resultingTool ->
        run {
          assertThat(resultingTool.name).isEqualTo("theMasterTool")
          assertThat(resultingTool.id).isNotNull()
        }
      }
      .verifyComplete()
    verify { toolsRepository.save(tool) }
  }

  @Test
  @DisplayName("it does not save a tool twice")
  fun dontSaveToolTwice() {
    val toolToSave = Tool(id = null, name = "theMasterTool")
    val toolInDatabase = Tool(id = 1, name = "theMasterTool")

    every { toolsRepository.findByName("theMasterTool") } returns Mono.just(toolInDatabase)

    // act
    val result = toolsService.saveTool(toolToSave)

    // assert
    StepVerifier.create(result)
      .expectErrorMatches { throwable ->
        run {
          val exception = throwable as ResponseStatusException
          exception.status == HttpStatus.CONFLICT
        }
      }
      .verify()
    verify(exactly = 0) { toolsRepository.save(toolToSave) }
  }

  @Test
  @DisplayName("it propagates exception when tool can not be saved by repository")
  fun throwWhenSaveNotPossible() {
    // arrange
    val tool = Tool(id = null, name = "theMasterTool")
    every { toolsRepository.findByName(any<String>()) } returns Mono.empty()
    every { toolsRepository.save(tool) }.throws(RuntimeException("something went wrong"))

    // act
    val result = toolsService.saveTool(tool)
    // assert
    StepVerifier.create(result)
      .expectError()
      .verify()
    verify { toolsRepository.save(tool) }
  }

  @Test
  @DisplayName("it can find a tool by name")
  fun returnExisting() {
    // arrange
    val tool = Tool(id = 1, name = "theMasterTool")
    every { toolsRepository.findByName(any<String>()) }.returns(Mono.just(tool))

    // act
    val resultingToolMono = toolsService.findToolByName("theMasterTool")

    // assert
    StepVerifier.create(resultingToolMono)
      .assertNext { resultingTool -> assertThat(resultingTool).isEqualTo(tool) }
      .verifyComplete()
    verify { toolsRepository.findByName("theMasterTool") }
  }

  @Test
  @DisplayName("it can delete an existing tool")
  fun deleteExisting() {
    // arrange
    val tool = Tool(id = 1, name = "theMasterTool")
    every { toolsRepository.deleteById(any<Int>()) }.returns(Mono.empty())

    // act
    val resultingToolMono = toolsService.delete(id = 1)

    // assert
    StepVerifier.create(resultingToolMono)
      .assertNext { returnedId -> assertThat(returnedId).isEqualTo(1) }
      .verifyComplete()
    verify(exactly = 1) { toolsRepository.deleteById(any<Int>()) }
  }
}
