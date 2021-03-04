package de.mattagohni.reciptorserver.service

import de.mattagohni.reciptor.model.Tool
import de.mattagohni.reciptorserver.repository.ReactiveToolsRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class ToolsService(private val toolsRepository: ReactiveToolsRepository) {
  fun saveTool(tool: Tool): Mono<Tool> {
    return toolsRepository.save(tool)
      .onErrorStop()
  }
}
