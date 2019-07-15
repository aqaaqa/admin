import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function letterArr() {
  var count1 = 0
  var change = []
  for (let i = 65; i < 91; i++) {
    change[count1] = String.fromCharCode(i)
    count1++
  }

  return change
}