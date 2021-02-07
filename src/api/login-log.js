import request from '@/utils/request'

/** 查询权限 */
export function listLoginLog4Me(data) {
  return request({
    url: '/wuyi_uas/v1/loginLog/list4Me.json',
    method: 'post',
    data
  })
}

/** 查询权限 */
export function listLoginLog(data) {
  return request({
    url: '/wuyi_uas/v1/loginLog/list.json',
    method: 'post',
    data
  })
}
