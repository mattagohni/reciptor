package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptorserver.exception.ToolAlreadyExistsException
import de.mattagohni.reciptorserver.exception.ToolNotFoundException
import de.mattagohni.reciptorserver.model.Tool
import de.mattagohni.reciptorserver.repository.ReactiveToolsRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ToolsService(private val toolsRepository: ReactiveToolsRepository) {
  fun saveTool(tool: Tool): Mono<Tool> {
    return toolsRepository.findByName(tool.name)
      .doOnNext { throw ToolAlreadyExistsException(HttpStatus.CONFLICT) }
      .switchIfEmpty(Mono.defer { toolsRepository.save(tool) })
  }

  fun findToolByName(name: String): Mono<Tool> {
    return toolsRepository.findByName(name).switchIfEmpty(Mono.empty())
  }

  fun findToolById(id: Int): Mono<Tool> {
    return toolsRepository.findById(id).switchIfEmpty(Mono.empty())
  }

  fun getAll(): Flux<Tool> {
    return toolsRepository.findAll()
  }

  fun delete(id: Int): Mono<Int> {
    return toolsRepository.deleteById(id).then(Mono.just(id))
  }

  fun update(id: Int, updatedTool: Tool): Mono<Tool> {
    return toolsRepository.findById(id)
      .flatMap { tool -> toolsRepository.save(tool.copy(name = updatedTool.name)) }
      .switchIfEmpty(Mono.defer { throw ToolNotFoundException(HttpStatus.NOT_FOUND) })
  }
}
