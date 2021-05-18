package de.mattagohni.reciptorserver.util

import de.mattagohni.reciptorserver.configuration.PasswordEncoderConfiguration
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(
  classes = [PBKDF2Encoder::class, PasswordEncoderConfiguration::class],
  properties = [
    "reciptor.password.encoder.secret=superSecret",
    "reciptor.password.encoder.iteration=25",
    "reciptor.password.encoder.keylength=512",
  ]
)
internal class PBKDF2EncoderTest {
  @Autowired
  private lateinit var pbkdF2Encoder: PBKDF2Encoder

  @Test
  @DisplayName("it encodes a given password")
  fun encodePassword() {
    // arrange
    val stringToEncode = "mySuperSecretPassword"

    // act
    val result = pbkdF2Encoder.encode(stringToEncode)
    // assert

    assertThat(result).isEqualTo("PlVA9bq4fIUNZTlg2hRcIY8NPeXAEdD4+Xti2HLo8n8tIIhG5Lvz9xW3helgIfp4raz8PWN9GzGiPohZAogclg==")
  }

  @Test
  @DisplayName("it matches correct password")
  fun matchCorrectPassword() {
    assertThat(
      pbkdF2Encoder.matches(
        "mySuperSecretPassword",
        "PlVA9bq4fIUNZTlg2hRcIY8NPeXAEdD4+Xti2HLo8n8tIIhG5Lvz9xW3helgIfp4raz8PWN9GzGiPohZAogclg=="
      )
    ).isTrue
  }

  @Test
  @DisplayName("it does not match for wrong password")
  fun rejectIncorrectPassword() {
    assertThat(
      pbkdF2Encoder.matches(
        "myUltraWrongPassword",
        "PlVA9bq4fIUNZTlg2hRcIY8NPeXAEdD4+Xti2HLo8n8tIIhG5Lvz9xW3helgIfp4raz8PWN9GzGiPohZAogclg=="
      )
    ).isFalse
  }
}
