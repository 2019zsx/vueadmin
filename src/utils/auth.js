import Cookies from 'js-cookie'

const TokenKey = 'access_token'
const uidKey = 'uid'
const freshtokenKey = 'freshtokenKey'
const routes='routes'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getrefreshtoken() {
  return Cookies.get(freshtokenKey)
}

export function setrefreshtoken(token) {
  return Cookies.set(freshtokenKey, token)
}

export function removerefreshtoken() {
  return Cookies.remove(freshtokenKey)
}
export function getuid() {
  return Cookies.get(uidKey)
}

export function setuid(uid) {
  return Cookies.set(uidKey, uid)
}

export function removeuid() {
  return Cookies.remove(uidKey)
}



export function setroutes(data) {
  return localStorage.setItem(routes, data)

}
export function getroutes() {
  return localStorage.getItem(routes);

}
export function removeroutes() {
  return localStorage.removeItem(routes);

}