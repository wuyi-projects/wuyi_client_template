import request from '@/utils/request'

export function listCompany(data) {
  return request({
    url: '/wuyi_fapiao/v1/company/list.json',
    method: 'post',
    data
  })
}

export function saveCompany(data) {
  return request({
    url: '/wuyi_fapiao/v1/company/save.json',
    method: 'post',
    data
  })
}

export function updateCompany(data) {
  return request({
    url: '/wuyi_fapiao/v1/company/edit.json',
    method: 'post',
    data
  })
}

export function deleteCompany(data) {
  return request({
    url: '/wuyi_fapiao/v1/company/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteCompany(data) {
  return request({
    url: '/wuyi_fapiao/v1/company/batchDelete.json',
    method: 'post',
    data
  })
}

export function getCompany(data) {
  return request({
    url: '/wuyi_fapiao/v1/company/get.json',
    method: 'post',
    data
  })
}
