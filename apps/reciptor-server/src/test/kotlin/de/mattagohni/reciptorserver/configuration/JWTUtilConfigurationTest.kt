package de.mattagohni.reciptorserver.configuration

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(
  properties = [
    "reciptor.jwt.secret=superSecret",
    "reciptor.jwt.expiration=60"
  ],
  classes = [JWTUtilConfiguration::class]
)
internal class JWTUtilConfigurationTest {
  @Autowired
  private lateinit var jwtUtilConfiguration: JWTUtilConfiguration

  @Test
  @DisplayName("ensure configuration is read from application.yml")
  fun readConfiguration() {
    assertThat(jwtUtilConfiguration.secret).isEqualTo("superSecret")
    assertThat(jwtUtilConfiguration.expiration).isEqualTo(60)
  }
}
