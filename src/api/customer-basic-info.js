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

/** 查询客户基本信息详情 */
export function getCustomerBasicInfo(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/get.json',
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

/** 查询客户基本信息列表（业务人员） */
export function listCustomerBasicInfoForBusiness(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/listForBusiness.json',
    method: 'post',
    data
  })
}

/** 查询客户基本信息列表（区域负责人） */
export function listCustomerBasicInfoForRegionalManage(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/listForRegionalManage.json',
    method: 'post',
    data
  })
}

/** 查询客户基本信息列表（服务门店） */
export function listCustomerBasicInfoForService(data) {
  return request({
    url: '/wuyi_oa/v1/customerBasicInfo/listForService.json',
    method: 'post',
    data
  })
}
