package de.mattagohni.reciptor.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "Tools")
data class Tool(
  @Id
  val id: String,
  val name: String
)
