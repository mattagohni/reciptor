package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptorserver.model.Tool
import de.mattagohni.reciptorserver.repository.ReactiveToolsRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class ToolsService(private val toolsRepository: ReactiveToolsRepository) {
  fun saveTool(tool: Tool): Mono<Tool> {
    return toolsRepository.save(tool)
      .onErrorStop()
  }

  fun findToolByName(name: String): Mono<Tool> {
    return toolsRepository.findByName(name).switchIfEmpty(Mono.empty())
  }

  fun findToolById(id: Int): Mono<Tool> {
    return toolsRepository.findById(id).switchIfEmpty(Mono.empty())
  }
}
