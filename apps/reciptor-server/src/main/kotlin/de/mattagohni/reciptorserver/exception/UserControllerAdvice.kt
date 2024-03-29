package de.mattagohni.reciptorserver.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController

@ControllerAdvice(annotations = [RestController::class])
class UserControllerAdvice {
  @ExceptionHandler(UserAlreadyExistsException::class)
  fun userAlreadyExistsException(error: UserAlreadyExistsException): ResponseEntity<Void> {
    return ResponseEntity.status(HttpStatus.CONFLICT).build()
  }
}
