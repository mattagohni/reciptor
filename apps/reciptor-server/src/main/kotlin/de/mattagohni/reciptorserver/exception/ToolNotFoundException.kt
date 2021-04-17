package de.mattagohni.reciptorserver.exception

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class ToolNotFoundException(httpStatus: HttpStatus) : ResponseStatusException(httpStatus)
