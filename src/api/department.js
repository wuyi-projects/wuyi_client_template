import request from '@/utils/request'

export function listAllDepartment4Recursion() {
  return request({
    url: '/wuyi_oa/v1/department/listAll4Recursion.json',
    method: 'post'
  })
}

export function listAllDepartment() {
  return request({
    url: '/wuyi_oa/v1/department/listAll.json',
    method: 'post'
  })
}

export function saveDepartment(data) {
  return request({
    url: '/wuyi_oa/v1/department/save.json',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: '/wuyi_oa/v1/department/edit.json',
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: '/wuyi_oa/v1/department/delete.json',
    method: 'post',
    data
  })
}
