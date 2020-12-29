import request from '@/utils/request'

/** 查询权限 */
export function listLoginLog(data) {
  return request({
    url: '/wuyi_uas/v1/permission/list.json',
    method: 'post',
    data
  })
}
