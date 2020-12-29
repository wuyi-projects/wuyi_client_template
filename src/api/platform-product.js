import request from '@/utils/request'

export function listPlatformProduct(data) {
  return request({
    url: '/wuyi_uas/v1/platformProduct/list.json',
    method: 'post',
    data
  })
}

export function savePlatformProduct(data) {
  return request({
    url: '/wuyi_uas/v1/platformProduct/save.json',
    method: 'post',
    data
  })
}

export function updatePlatformProduct(data) {
  return request({
    url: '/wuyi_uas/v1/platformProduct/edit.json',
    method: 'post',
    data
  })
}

export function deletePlatformProduct(data) {
  return request({
    url: '/wuyi_uas/v1/platformProduct/delete.json',
    method: 'post',
    data
  })
}

export function batchDeletePlatformProduct(data) {
  return request({
    url: '/wuyi_uas/v1/platformProduct/batchDelete.json',
    method: 'post',
    data
  })
}

export function listAllPlatformProduct(data) {
  return request({
    url: '/wuyi_uas/v1/platformProduct/listAll.json',
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
