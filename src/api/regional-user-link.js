import request from '@/utils/request'

/** 新增区域人员关联 */
export function saveRegionalUserLink(data) {
  return request({
    url: '/wuyi_oa/v1/regionalUserLink/save.json',
    method: 'post',
    data
  })
}

/** 删除区域人员关联 */
export function deleteRegionalUserLink(data) {
  return request({
    url: '/wuyi_oa/v1/regionalUserLink/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除区域人员关联 */
export function batchDeleteRegionalUserLink(data) {
  return request({
    url: '/wuyi_oa/v1/regionalUserLink/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑区域人员关联 */
export function updateRegionalUserLink(data) {
  return request({
    url: '/wuyi_oa/v1/regionalUserLink/edit.json',
    method: 'post',
    data
  })
}

/** 查询区域人员关联列表 */
export function listRegionalUserLink(data) {
  return request({
    url: '/wuyi_oa/v1/regionalUserLink/list.json',
    method: 'post',
    data
  })
}