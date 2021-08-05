package de.mattagohni.reciptorserver.controller

import de.mattagohni.reciptorserver.authentication.util.JWTUtil
import de.mattagohni.reciptorserver.authentication.util.PBKDF2Encoder
import de.mattagohni.reciptorserver.model.AuthRequest
import de.mattagohni.reciptorserver.model.AuthResponse
import de.mattagohni.reciptorserver.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class UserController(val jwtUtil: JWTUtil, val pbkdF2Encoder: PBKDF2Encoder, val userService: UserService) {

  @PostMapping("api/v1/login", consumes = [MediaType.APPLICATION_JSON_VALUE])
  fun login(@RequestBody authRequest: AuthRequest): Mono<ResponseEntity<AuthResponse>> {
    return userService.findByUsername(authRequest.username)
      .map {
        if (pbkdF2Encoder.encode(authRequest.password) == it.password) {
          val token = jwtUtil.generateToken(it)
          ResponseEntity.ok(AuthResponse(token, jwtUtil.getExpirationDateFromToken(token).toInstant().epochSecond))
        } else {
          ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
      }
      .defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build())
  }
}
