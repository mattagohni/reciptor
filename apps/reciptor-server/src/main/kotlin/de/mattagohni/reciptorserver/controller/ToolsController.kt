package de.mattagohni.reciptorserver.controller

import de.mattagohni.reciptorserver.model.Tool
import de.mattagohni.reciptorserver.service.ToolsService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class ToolsController(private val toolsService: ToolsService) {
  @GetMapping("/api/v1/tools")
  fun getTools(): Mono<ResponseEntity<List<Tool>>> {
    return toolsService.getAll()
      .collectList()
      .map { toolsList -> ResponseEntity.ok(toolsList) }
  }

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

  @PutMapping("/api/v1/tools/{id}")
  fun updateTool(@PathVariable id: Int, @RequestBody toolToUpdate: Tool): Mono<ResponseEntity<Tool>> {
    return toolsService.update(id, toolToUpdate)
      .map { tool -> ResponseEntity.status(HttpStatus.ACCEPTED).body(tool) }
  }

  @DeleteMapping("/api/v1/tools/{id}")
  fun deleteTool(@PathVariable id: Int): Mono<ResponseEntity<Int>> {
    return toolsService.findToolById(id)
      .flatMap { toolsService.delete(id) }
      .flatMap { idOfDeletedItem -> Mono.just(ResponseEntity.ok(idOfDeletedItem)) }
      .defaultIfEmpty(ResponseEntity.notFound().build())
  }
}
