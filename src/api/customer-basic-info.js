import request from '@/utils/request'

/** 新增客户基本信息 */
export function saveCustomerBasicInfo(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/save.json',
    method: 'post',
    data
  })
}

/** 删除客户基本信息 */
export function deleteCustomerBasicInfo(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除客户基本信息 */
export function batchDeleteCustomerBasicInfo(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑客户基本信息 */
export function updateCustomerBasicInfo(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/edit.json',
    method: 'post',
    data
  })
}

/** 查询客户基本信息列表 */
export function listCustomerBasicInfo(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/list.json',
    method: 'post',
    data
  })
}