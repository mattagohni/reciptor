package de.mattagohni.reciptorserver.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

internal class ReciptorUserTest {

  @Test
  @DisplayName("create User with username")
  fun user() {
    val user = ReciptorUser(username = "mattagohni")

    assertThat(user.username).isEqualTo("mattagohni")
  }

  @Test
  @DisplayName("set username on fresh user")
  fun setUsername() {
    val user = ReciptorUser()
    user.setUsername("mattagohni")

    assertThat(user.username).isEqualTo("mattagohni")
  }

  @Test
  @DisplayName("isAccountNonExpired returns false")
  fun isAccountNonExpired() {
    val user = ReciptorUser()

    assertThat(user.isAccountNonExpired).isFalse
  }

  @Test
  @DisplayName("isAccountNonLocked returns false")
  fun isAccountNonLocked() {
    val user = ReciptorUser()

    assertThat(user.isAccountNonLocked).isFalse
  }

  @Test
  @DisplayName("isCredentialsNonExpired returns false")
  fun isCredentialsNonExpired() {
    val user = ReciptorUser()

    assertThat(user.isCredentialsNonExpired).isFalse
  }

  @Test
  @DisplayName("enabled can be set to true")
  fun isEnabled() {
    val user = ReciptorUser()
    user.enabled = true

    assertThat(user.isEnabled).isTrue
  }

  @Test
  @DisplayName("returns given Authorities")
  fun getAuthorities() {
    val user = ReciptorUser()
    val listOfAuthorities = listOf(Role.ROLE_BASIC_USER, Role.ROLE_ADMIN)
    user.roles = listOfAuthorities

    user.authorities!!.forEach { grantedAuthority ->
      run {
        assertThat(grantedAuthority!!.authority).isIn(listOf("ROLE_BASIC_USER", "ROLE_ADMIN"))
      }
    }
  }

  @Test
  @DisplayName("it can set and get a password")
  fun getPassword() {
    val user = ReciptorUser()
    user.password = "ultraSavePassword"

    assertThat(user.password).isEqualTo("ultraSavePassword")
  }
}
