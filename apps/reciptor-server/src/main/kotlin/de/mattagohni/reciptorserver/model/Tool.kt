package de.mattagohni.reciptorserver.model

import org.springframework.data.annotation.Id

data class Tool(
  @Id
  val id: Int?,
  val name: String
)
