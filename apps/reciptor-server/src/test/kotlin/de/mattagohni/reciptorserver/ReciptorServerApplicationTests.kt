package de.mattagohni.reciptorserver

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(
  properties = [
    "reciptor.password.encoder.secret=superSecret",
    "reciptor.password.encoder.iteration=25",
    "reciptor.password.encoder.keylength=512",
    "reciptor.jwt.secret=alsoVerySecret",
    "reciptor.jwt.expiration=3600"
  ]
)
class ReciptorServerApplicationTests {

  @Test
  fun contextLoads() {
  }
}
