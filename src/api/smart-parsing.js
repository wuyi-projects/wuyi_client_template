import request from '@/utils/request'

export function saveSmartParsing(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/save.json',
    method: 'post',
    data
  })
}

export function deleteSmartParsing(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteSmartParsing(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/batchDelete.json',
    method: 'post',
    data
  })
}

export function updateSmartParsing(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/edit.json',
    method: 'post',
    data
  })
}

export function getSmartParsing(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/get.json',
    method: 'post',
    data
  })
}

export function listSmartParsing(data) {
  return request({
    url: '/wuyi_fapiao/v1/fapiaoInfo/list.json',
    method: 'post',
    data
  })
}
