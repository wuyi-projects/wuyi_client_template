import request from '@/utils/request'

/** 新增服务评价 */
export function saveServiceEvaluation(data) {
  return request({
    url: '/wuyi_oa/v1/serviceEvaluation/save.json',
    method: 'post',
    data
  })
}

/** 删除服务评价 */
export function deleteServiceEvaluation(data) {
  return request({
    url: '/wuyi_oa/v1/serviceEvaluation/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除服务评价 */
export function batchDeleteServiceEvaluation(data) {
  return request({
    url: '/wuyi_oa/v1/serviceEvaluation/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑服务评价 */
export function updateServiceEvaluation(data) {
  return request({
    url: '/wuyi_oa/v1/serviceEvaluation/edit.json',
    method: 'post',
    data
  })
}

/** 查询服务评价详情 */
export function getServiceEvaluation(data) {
  return request({
    url: '/wuyi_oa/v1/serviceEvaluation/get.json',
    method: 'post',
    data
  })
}

/** 查询服务评价列表 */
export function listServiceEvaluation(data) {
  return request({
    url: '/wuyi_oa/v1/serviceEvaluation/list.json',
    method: 'post',
    data
  })
}