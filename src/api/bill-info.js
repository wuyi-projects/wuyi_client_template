import request from '@/utils/request'

export function listBillInfo(data) {
  return request({
    url: '/wuyi_file/v1/billInfo/list.json',
    method: 'post',
    data
  })
}

/** 新增权限 */
export function saveBillInfo(data) {
  return request({
    url: '/wuyi_fapiao/v1/billInfo/save.json',
    method: 'post',
    data
  })
}

/** 编辑权限 */
export function updateBillInfo(data) {
  return request({
    url: '/wuyi_fapiao/v1/billInfo/edit.json',
    method: 'post',
    data
  })
}

export function deleteBillInfo(data) {
  return request({
    url: '/wuyi_fapiao/v1/billInfo/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除权限 */
export function batchDeleteBillInfo(data) {
  return request({
    url: '/wuyi_fapiao/v1/billInfo/batchDeleteBillInfo.json',
    method: 'post',
    data
  })
}
