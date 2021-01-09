import request from '@/utils/request'

export function listPlatformDefaultRole(data) {
  return request({
    url: '/wuyi_uas/v1/productDefaultRole/list.json',
    method: 'post',
    data
  })
}

export function savePlatformDefaultRole(data) {
  return request({
    url: '/wuyi_uas/v1/productDefaultRole/save.json',
    method: 'post',
    data
  })
}

export function updatePlatformDefaultRole(data) {
  return request({
    url: '/wuyi_uas/v1/productDefaultRole/edit.json',
    method: 'post',
    data
  })
}

export function deletePlatformDefaultRole(data) {
  return request({
    url: '/wuyi_uas/v1/productDefaultRole/delete.json',
    method: 'post',
    data
  })
}

export function batchDeletePlatformDefaultRole(data) {
  return request({
    url: '/wuyi_uas/v1/productDefaultRole/batchDelete.json',
    method: 'post',
    data
  })
}

export function listAllPlatformDefaultRole(data) {
  return request({
    url: '/wuyi_uas/v1/productDefaultRole/listAll.json',
    method: 'post',
    data
  })
}

export function listAllAccountType4Product(data) {
  return request({
    url: '/wuyi_uas/v1/productAccountType/listAll4Product.json',
    method: 'post',
    data
  })
}

export function listAccountType4Product(data) {
  return request({
    url: '/wuyi_uas/v1/productAccountType/list4Product.json',
    method: 'post',
    data
  })
}

export function saveAccountType(data) {
  return request({
    url: '/wuyi_uas/v1/productAccountType/save.json',
    method: 'post',
    data
  })
}

export function updateAccountType(data) {
  return request({
    url: '/wuyi_uas/v1/productAccountType/edit.json',
    method: 'post',
    data
  })
}

export function deleteAccountType(data) {
  return request({
    url: '/wuyi_uas/v1/productAccountType/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteAccountType(data) {
  return request({
    url: '/wuyi_uas/v1/productAccountType/batchDelete.json',
    method: 'post',
    data
  })
}
