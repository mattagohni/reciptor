package de.mattagohni.reciptorserver.model

import lombok.AllArgsConstructor
import lombok.Data
import lombok.NoArgsConstructor
import org.springframework.data.annotation.Id

@Data
@AllArgsConstructor
@NoArgsConstructor
class Recipe(@Id val id: String, val name: String)
