import request from '@/utils/request'

export function listWechatMiniprogramConfig(data) {
  return request({
    url: '/wuyi_miniprogram/v1/wechatMiniprogramConfig/list.json',
    method: 'post',
    data
  })
}

export function saveWechatMiniprogramConfig(data) {
  return request({
    url: '/wuyi_miniprogram/v1/wechatMiniprogramConfig/save.json',
    method: 'post',
    data
  })
}

export function updateWechatMiniprogramConfig(data) {
  return request({
    url: '/wuyi_miniprogram/v1/wechatMiniprogramConfig/edit.json',
    method: 'post',
    data
  })
}

export function deleteWechatMiniprogramConfig(data) {
  return request({
    url: '/wuyi_miniprogram/v1/wechatMiniprogramConfig/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteWechatMiniprogramConfig(data) {
  return request({
    url: '/wuyi_miniprogram/v1/wechatMiniprogramConfig/batchDelete.json',
    method: 'post',
    data
  })
}

export function getWechatMiniprogramConfig(data) {
  return request({
    url: '/wuyi_miniprogram/v1/wechatMiniprogramConfig/get.json',
    method: 'post',
    data
  })
}
