import request from '@/utils/request'

export function saveFapiaoManagement(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/save.json',
    method: 'post',
    data
  })
}

export function deleteFapiaoManagement(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteFapiaoManagement(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/batchDelete.json',
    method: 'post',
    data
  })
}

export function updateFapiaoManagement(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/edit.json',
    method: 'post',
    data
  })
}
export function getFapiaoManagement(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/get.json',
    method: 'post',
    data
  })
}
export function listFapiaoManagement(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/list.json',
    method: 'post',
    data
  })
}
