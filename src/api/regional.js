import request from '@/utils/request'

/** 新增区域信息 */
export function saveRegional(data) {
  return request({
    url: '/wuyi_oa/v1/regional/save.json',
    method: 'post',
    data
  })
}

/** 删除区域信息 */
export function deleteRegional(data) {
  return request({
    url: '/wuyi_oa/v1/regional/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除区域信息 */
export function batchDeleteRegional(data) {
  return request({
    url: '/wuyi_oa/v1/regional/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑区域信息 */
export function updateRegional(data) {
  return request({
    url: '/wuyi_oa/v1/regional/edit.json',
    method: 'post',
    data
  })
}

/** 查询区域信息列表 */
export function listRegional(data) {
  return request({
    url: '/wuyi_oa/v1/regional/list.json',
    method: 'post',
    data
  })
}