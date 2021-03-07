package de.mattagohni.reciptorserver.exception

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class ToolAlreadyExistsException(httpStatus: HttpStatus) : ResponseStatusException(httpStatus)
