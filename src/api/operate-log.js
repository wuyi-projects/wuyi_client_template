import request from '@/utils/request'

/* 查询 */
export function listOperatelog4Me(data) {
  return request({
    url: '/wuyi_uas/v1/operationLog/list4Me.json',
    method: 'post',
    data
  })
}

/* 查询 */
export function listOperatelog(data) {
  return request({
    url: '/wuyi_uas/v1/operationLog/list.json',
    method: 'post',
    data
  })
}