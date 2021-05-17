package de.mattagohni.reciptorserver.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import lombok.AllArgsConstructor
import lombok.NoArgsConstructor
import lombok.ToString
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.stream.Collectors

@Table
@ToString
@AllArgsConstructor
@NoArgsConstructor
class User : UserDetails {
  @Id
  var id: Long? = null

  private var username: String? = null
  private var password: String? = null

  var enabled: Boolean? = null

  var roles: List<Role>? = null

  constructor()

  constructor(username: String?) {
    this.username = username
  }

  override fun getUsername(): String? {
    return username
  }

  open fun setUsername(username: String) {
    this.username = username
  }

  override fun isAccountNonExpired(): Boolean {
    return false
  }

  override fun isAccountNonLocked(): Boolean {
    return false
  }

  override fun isCredentialsNonExpired(): Boolean {
    return false
  }

  override fun isEnabled(): Boolean {
    return enabled!!
  }

  override fun getAuthorities(): Collection<GrantedAuthority?>? {
    return roles!!.stream().map { authority: Role ->
      SimpleGrantedAuthority(
        authority.name
      )
    }.collect(Collectors.toList())
  }

  @JsonIgnore
  override fun getPassword(): String? {
    return password
  }

  @JsonProperty
  open fun setPassword(password: String?) {
    this.password = password
  }
}
