package de.mattagohni.reciptorserver.controller

import de.mattagohni.reciptorserver.model.Tool
import de.mattagohni.reciptorserver.service.ToolsService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class ToolsController(private val toolsService: ToolsService) {
  @GetMapping("/api/v1/tools/{id}")
  fun getTool(@PathVariable id: Int): Mono<ResponseEntity<Tool>> {
    return toolsService.findToolById(id)
      .map { tool -> ResponseEntity.ok(tool) }
      .defaultIfEmpty(ResponseEntity.notFound().build())
  }

  @PostMapping("/api/v1/tools")
  fun createTool(@RequestBody toolToSave: Tool): Mono<ResponseEntity<Void>> {

    return toolsService.saveTool(toolToSave)
      .map { ResponseEntity.status(HttpStatus.CREATED).build() }
  }
}
