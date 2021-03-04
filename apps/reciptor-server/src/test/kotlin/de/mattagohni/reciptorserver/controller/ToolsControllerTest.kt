package de.mattagohni.reciptorserver.controller

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptorserver.configuration.DatabaseConfiguration
import de.mattagohni.reciptorserver.configuration.SecurityConfiguration
import de.mattagohni.reciptorserver.model.Tool
import de.mattagohni.reciptorserver.service.ToolsService
import io.mockk.every
import io.mockk.verify
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.context.annotation.Import
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.web.reactive.function.BodyInserters
import reactor.core.publisher.Mono

// suppressed because mockk produces a false-positive when returning a mono
@Suppress("ReactiveStreamsUnusedPublisher")
@WebFluxTest(controllers = [ToolsController::class])
@Import(SecurityConfiguration::class, DatabaseConfiguration::class)
@AutoConfigureWebTestClient
class ToolsControllerTest {
  @Autowired
  private lateinit var webTestClient: WebTestClient

  @MockkBean
  private lateinit var toolsService: ToolsService

  @Test
  @DisplayName("it returns a responseEntity containing a tool")
  @WithMockUser
  fun getTool() {
    // arrange
    val tool = Tool(id = 1, name = "knife")
    every { toolsService.findToolById(any<Int>()) } returns Mono.just(tool)

    webTestClient.get().uri("/api/v1/tools/1")
      .exchange()
      .expectStatus().isOk
      .expectBody().jsonPath("$.name").isEqualTo("knife")

    verify { toolsService.findToolById(1) }
  }

  @Test
  @DisplayName("it returns a responseEntity containing with status 404 if a tool is not found")
  @WithMockUser
  fun getTool_notFound() {
    // arrange
    every { toolsService.findToolById(1) } returns Mono.empty()

    webTestClient.get().uri("/api/v1/tools/1")
      .exchange()
      .expectStatus().isNotFound

    verify { toolsService.findToolById(1) }
  }

  @Test
  @DisplayName("it saves Tool to the database and returns 201")
  @WithMockUser
  fun createTool_OK() {
    // arrange
    val toolBeforeSave = Tool(id = null, name = "knife")
    val toolAfterSave = Tool(id = 1, name = "knife")

    every { toolsService.saveTool(any<Tool>()) }.returns(Mono.just(toolAfterSave))

    // act
    webTestClient.post().uri("/api/v1/tools")
      .body(BodyInserters.fromValue(toolBeforeSave))
      .exchange()
      .expectStatus().isCreated

    // assert
  }
}
