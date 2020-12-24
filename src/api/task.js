import request from '@/utils/request'

export function listTask(data) {
  return request({
    url: '/wuyi_oa/v1/task/list.json',
    method: 'post',
    data
  })
}

export function saveTask(data) {
  return request({
    url: '/wuyi_oa/v1/task/save.json',
    method: 'post',
    data
  })
}

export function updateTask(data) {
  return request({
    url: '/wuyi_oa/v1/task/edit.json',
    method: 'post',
    data
  })
}

export function deleteTask(data) {
  return request({
    url: '/wuyi_oa/v1/task/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteTask(data) {
  return request({
    url: '/wuyi_oa/v1/task/batchDelete.json',
    method: 'post',
    data
  })
}

export function getTaskDetail(data) {
  return request({
    url: '/wuyi_oa/v1/task/getDetail.json',
    method: 'post',
    data
  })
}
