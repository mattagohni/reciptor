package de.mattagohni.reciptorserver.authentication.util

import de.mattagohni.reciptorserver.authentication.configuration.PasswordEncoderConfiguration
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.security.NoSuchAlgorithmException
import java.security.spec.InvalidKeySpecException
import java.util.Base64
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

@Component
class PBKDF2Encoder(private val configuration: PasswordEncoderConfiguration) : PasswordEncoder {
  override fun encode(input: CharSequence?): String {
    return try {
      val result = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")
        .generateSecret(
          PBEKeySpec(
            input.toString().toCharArray(),
            configuration.secret!!.encodeToByteArray(),
            configuration.iteration!!,
            configuration.keylength!!
          )
        )
        .encoded
      Base64.getEncoder().encodeToString(result)
    } catch (ex: NoSuchAlgorithmException) {
      throw RuntimeException(ex)
    } catch (ex: InvalidKeySpecException) {
      throw RuntimeException(ex)
    }
  }

  override fun matches(input: CharSequence?, candidate: String?): Boolean {
    return encode(input) == candidate
  }
}
