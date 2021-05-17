package de.mattagohni.reciptorserver.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

internal class UserTest {

  @Test
  @DisplayName("create User with username")
  fun user() {
    val user = User(username = "mattagohni")

    assertThat(user.username).isEqualTo("mattagohni")
  }

  @Test
  @DisplayName("set username on fresh user")
  fun setUsername() {
    val user = User()
    user.setUsername("mattagohni")

    assertThat(user.username).isEqualTo("mattagohni")
  }

  @Test
  @DisplayName("isAccountNonExpired returns false")
  fun isAccountNonExpired() {
    val user = User()

    assertThat(user.isAccountNonExpired).isFalse
  }

  @Test
  @DisplayName("isAccountNonLocked returns false")
  fun isAccountNonLocked() {
    val user = User()

    assertThat(user.isAccountNonLocked).isFalse
  }

  @Test
  @DisplayName("isCredentialsNonExpired returns false")
  fun isCredentialsNonExpired() {
    val user = User()

    assertThat(user.isCredentialsNonExpired).isFalse
  }

  @Test
  @DisplayName("enabled can be set to true")
  fun isEnabled() {
    val user = User()
    user.enabled = true

    assertThat(user.isEnabled).isTrue
  }

  @Test
  @DisplayName("returns given Authorities")
  fun getAuthorities() {
    val user = User()
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
    val user = User()
    user.password = "ultraSavePassword"

    assertThat(user.password).isEqualTo("ultraSavePassword")
  }
}
