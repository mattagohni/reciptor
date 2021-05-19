package de.mattagohni.reciptorserver.authentication.configuration

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(
  classes = [PasswordEncoderConfiguration::class],
  properties = [
    "reciptor.password.encoder.secret=superSecret",
    "reciptor.password.encoder.iteration=25",
    "reciptor.password.encoder.keylength=512",
  ]
)
internal class PasswordEncoderConfigurationTest {
  @Autowired
  private lateinit var passwordEncoderConfiguration: PasswordEncoderConfiguration

  @Test
  @DisplayName("ensure configuration is read from application.yml")
  fun readConfiguration() {
    assertThat(passwordEncoderConfiguration.secret).isEqualTo("superSecret")
    assertThat(passwordEncoderConfiguration.iteration).isEqualTo(25)
    assertThat(passwordEncoderConfiguration.keylength).isEqualTo(512)
  }
}
