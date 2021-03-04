package de.mattagohni.reciptorserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ReciptorServerApplication

fun main(args: Array<String>) {
  runApplication<ReciptorServerApplication>(*args)
}