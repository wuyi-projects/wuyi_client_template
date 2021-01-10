import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/wuyi_uas/assistant/user/login.json',
    method: 'post',
    data
  })
}

export function isLogin() {
  return request({
    url: '/wuyi_uas/platform/isLogin.json',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/wuyi_uas/v1/userInfo/getInfo2.json',
    method: 'post',
    token
  })
}

export function logout() {
  return request({
    url: '/wuyi_uas/platform/admin/logout.json',
    method: 'post'
  })
}

export function listUser(data) {
  return request({
    url: '/wuyi_uas/v1/user/list.json',
    method: 'post',
    data
  })
}
