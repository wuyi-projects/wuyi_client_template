import request from '@/utils/request'

export function listMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/list.json',
    method: 'post',
    data
  })
}

export function saveMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/save.json',
    method: 'post',
    data
  })
}

export function updateMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/edit.json',
    method: 'post',
    data
  })
}

export function deleteMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/batchDelete.json',
    method: 'post',
    data
  })
}

export function disableMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/disable.json',
    method: 'post',
    data
  })
}

export function enableMiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/enable.json',
    method: 'post',
    data
  })
}

export function changePhone4MiniProgramBindAccount(data) {
  return request({
    url: '/wuyi_uas/v1/miniProgramBindAccount/changePhone.json',
    method: 'post',
    data
  })
}
