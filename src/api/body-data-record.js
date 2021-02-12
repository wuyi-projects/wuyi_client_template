import request from '@/utils/request'

/** 新增体型信息记录 */
export function saveBodyDataRecord(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/save.json',
    method: 'post',
    data
  })
}

/** 删除体型信息记录 */
export function deleteBodyDataRecord(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除体型信息记录 */
export function batchDeleteBodyDataRecord(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑体型信息记录 */
export function updateBodyDataRecord(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/edit.json',
    method: 'post',
    data
  })
}

/** 查询体型信息记录详情 */
export function getBodyDataRecord(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/get.json',
    method: 'post',
    data
  })
}

/** 查询体型信息记录列表 */
export function listBodyDataRecord(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/list.json',
    method: 'post',
    data
  })
}

/** 查询体型信息记录列表（客户） */
export function listBodyDataRecordForCustomer(data) {
  return request({
    url: '/wuyi_oa/v1/bodyDataRecord/listForCustomer.json',
    method: 'post',
    data
  })
}
