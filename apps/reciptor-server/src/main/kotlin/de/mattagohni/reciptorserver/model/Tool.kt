package de.mattagohni.reciptorserver.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

@Table
data class Tool(
  @Id
  val id: Long?,
  val name: String
)
