package de.mattagohni.reciptorserver.controller

import de.mattagohni.reciptor.model.Tool
import de.mattagohni.reciptorserver.service.ToolsService
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.Mockito.verifyNoMoreInteractions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.reactive.server.WebTestClient
import reactor.core.publisher.Mono

@WebFluxTest(controllers = [ToolsController::class])
@AutoConfigureWebTestClient
class ToolsControllerTest() {
  @Autowired
  private lateinit var webTestClient: WebTestClient

  @MockBean
  private lateinit var toolsService: ToolsService

  @Test
  @DisplayName("it returns a responseEntity containing a tool")
  @WithMockUser
  fun getTool() {
    // arrange
    val tool = Tool(id = "1", name = "knife")
    `when`(toolsService.findToolById("1")).thenReturn(Mono.just(tool))

    webTestClient.get().uri("/api/v1/tools/1")
      .exchange()
      .expectStatus().isOk
      .expectBody().jsonPath("$.name").isEqualTo("knife")
    verify(toolsService, times(1)).findToolById("1")
    verifyNoMoreInteractions(toolsService)
  }

  @Test
  @DisplayName("it returns a responseEntity containing with status 404 if a tool is not found")
  @WithMockUser
  fun getTool_notFound() {
    // arrange
    `when`(toolsService.findToolById("1")).thenReturn(Mono.empty())

    webTestClient.get().uri("/api/v1/tools/1")
      .exchange()
      .expectStatus().isNotFound
    verify(toolsService, times(1)).findToolById("1")
    verifyNoMoreInteractions(toolsService)
  }
}
