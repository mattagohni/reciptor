package de.mattagohni.reciptorserver.controller

import com.ninjasquad.springmockk.MockkBean
import de.mattagohni.reciptorserver.configuration.CorsConfiguration
import de.mattagohni.reciptorserver.configuration.CustomWebfluxConfigurer
import de.mattagohni.reciptorserver.configuration.DatabaseConfiguration
import de.mattagohni.reciptorserver.configuration.SecurityConfiguration
import de.mattagohni.reciptorserver.exception.ToolAlreadyExistsException
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
import org.springframework.http.HttpStatus
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.web.reactive.function.BodyInserters
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

// suppressed because mockk produces a false-positive when returning a mono
@Suppress("ReactiveStreamsUnusedPublisher")
@WebFluxTest(controllers = [ToolsController::class])
@Import(SecurityConfiguration::class, DatabaseConfiguration::class, CorsConfiguration::class, CustomWebfluxConfigurer::class)
@AutoConfigureWebTestClient
class ToolsControllerTest {
  @Autowired
  private lateinit var webTestClient: WebTestClient

  @MockkBean
  private lateinit var toolsService: ToolsService

  @Test
  @DisplayName("it returns a list of all tools with status OK")
  @WithMockUser
  fun getTools() {
    val toolsFlux = Flux.just(
      Tool(id = 1, name = "knife"),
      Tool(id = 2, name = "spoon")
    )

    every { toolsService.getAll() } returns toolsFlux

    webTestClient.get().uri("/api/v1/tools")
      .exchange()
      .expectStatus().isOk
      .expectBody()
      .jsonPath("$.[0].name").isEqualTo("knife")
      .jsonPath("$.[1].name").isEqualTo("spoon")

    verify(exactly = 1) { toolsService.getAll() }
  }

  @Test
  @DisplayName("it returns empty list with status OK when no tools exist")
  @WithMockUser
  fun getTools_emptyList() {
    val toolsFlux = Flux.empty<Tool>()

    every { toolsService.getAll() } returns toolsFlux

    webTestClient.get().uri("/api/v1/tools")
      .exchange()
      .expectStatus().isOk
      .expectBody().json("[]")

    verify(exactly = 1) { toolsService.getAll() }
  }

  @Test
  @DisplayName("it returns a responseEntity containing a tool")
  @WithMockUser
  fun getTool() {
    // arrange
    val tool = Tool(id = 1, name = "knife")
    every { toolsService.findToolById(any()) } returns Mono.just(tool)

    webTestClient.get().uri("/api/v1/tools/1")
      .exchange()
      .expectStatus().isOk
      .expectBody().jsonPath("$.name").isEqualTo("knife")

    verify(exactly = 1) { toolsService.findToolById(1) }
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

    verify(exactly = 1) { toolsService.findToolById(1) }
  }

  @Test
  @DisplayName("it saves Tool to the database and returns 201")
  @WithMockUser
  fun createTool_OK() {
    // arrange
    val toolBeforeSave = Tool(id = null, name = "knife")
    val toolAfterSave = Tool(id = 1, name = "knife")

    every { toolsService.saveTool(any()) }.returns(Mono.just(toolAfterSave))

    // act
    webTestClient.post().uri("/api/v1/tools")
      .body(BodyInserters.fromValue(toolBeforeSave))
      .exchange()
      .expectStatus().isCreated

    // assert
    verify(exactly = 1) { toolsService.saveTool(toolBeforeSave) }
  }

  // At some point tools should be unique on a user level. e.g. Every user should be able to add a custom knife, this should not
  // fail if user A names his knife exactly like user B. As long as there are no Users in the application, this is of course not possible
  @Test
  @DisplayName("it dont save the same tool twice")
  @WithMockUser
  fun createTool_Conflict() {
    // arrange
    val toolToSave = Tool(id = null, name = "knife")

    every { toolsService.saveTool(any()) }.throws(ToolAlreadyExistsException(HttpStatus.CONFLICT))

    // act
    webTestClient.post().uri("/api/v1/tools")
      .body(BodyInserters.fromValue(toolToSave))
      .exchange()
      .expectStatus().isEqualTo(HttpStatus.CONFLICT)

    verify(exactly = 1) { toolsService.saveTool(any()) }
  }
}
