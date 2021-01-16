import Cookies from 'js-cookie'

const OpenID = 'Open-ID'
const TokenKey = 'Access-Token'
const TeamNumber = 'Team-Number'
const ProductCode = 'Product-Code'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 90 })
}

export function getOpenID() {
  return Cookies.get(OpenID)
}

export function setOpenID(openId) {
  return Cookies.set(OpenID, openId, { expires: 90 })
}

export function getTeamNumber() {
  return Cookies.get(TeamNumber)
}

export function setTeamNumber(teamNumber) {
  return Cookies.set(TeamNumber, teamNumber, { expires: 90 })
}

export function getProductCode() {
  return Cookies.get(ProductCode)
}

export function setProductCode(productCode) {
  return Cookies.set(ProductCode, productCode, { expires: 90 })
}

export function removeToken() {
  return Cookies.remove(TokenKey) && Cookies.remove(OpenID) && Cookies.remove(TeamNumber)
}
