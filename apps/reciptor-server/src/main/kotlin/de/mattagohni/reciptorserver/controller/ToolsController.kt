package de.mattagohni.reciptorserver.controller

import de.mattagohni.reciptor.model.Tool
import de.mattagohni.reciptorserver.service.ToolsService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class ToolsController(private val toolsService: ToolsService) {
  @GetMapping("/api/v1/tools/{id}")
  fun getTool(@PathVariable id: String): Mono<ResponseEntity<Tool>> {
    return toolsService.findToolById(id)
      .map { tool -> ResponseEntity.ok(tool) }
      .defaultIfEmpty(ResponseEntity.notFound().build())
  }
}
