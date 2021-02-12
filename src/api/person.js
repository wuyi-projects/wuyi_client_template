import request from '@/utils/request'

export function listAllPerson() {
  return request({
    url: '/wuyi_oa/v1/person/listAll.json',
    method: 'post'
  })
}

export function listAllSuperior4Person(data) {
  return request({
    url: '/wuyi_oa/v1/person/listAllSuperior4Person.json',
    method: 'post',
    data
  })
}

export function getPerson(data) {
  return request({
    url: '/wuyi_oa/v1/person/get.json',
    method: 'post',
    data
  })
}

export function listPerson(data) {
  return request({
    url: '/wuyi_oa/v1/person/list.json',
    method: 'post',
    data
  })
}

export function savePerson(data) {
  return request({
    url: '/wuyi_oa/v1/person/save.json',
    method: 'post',
    data
  })
}

export function updatePerson(data) {
  return request({
    url: '/wuyi_oa/v1/person/edit.json',
    method: 'post',
    data
  })
}

export function deletePerson(data) {
  return request({
    url: '/wuyi_oa/v1/person/delete.json',
    method: 'post',
    data
  })
}

export function batchDeletePerson(data) {
  return request({
    url: '/wuyi_oa/v1/person/batchDelete.json',
    method: 'post',
    data
  })
}

export function listAllPerson4Department(data) {
  return request({
    url: '/wuyi_oa/v1/person/listAllPerson4Department.json',
    method: 'post',
    data
  })
}

