package de.mattagohni.reciptor.model

import lombok.AllArgsConstructor
import lombok.Data
import lombok.NoArgsConstructor
import org.springframework.data.mongodb.core.mapping.Document

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
class Recipe(val id: String, val name: String)
