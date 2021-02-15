import request from '@/utils/request'

/** 新增签到信息 */
export function saveSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/save.json',
    method: 'post',
    data
  })
}

/** 删除签到信息 */
export function deleteSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除签到信息 */
export function batchDeleteSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑签到信息 */
export function updateSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/edit.json',
    method: 'post',
    data
  })
}

/** 查询签到信息详情 */
export function getSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/get.json',
    method: 'post',
    data
  })
}

/** 查询签到信息列表 */
export function listSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/list.json',
    method: 'post',
    data
  })
}

/** 获取当前签到信息列表 */
export function listCurrentSignUpInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpInfo/listSignUpInfo.json',
    method: 'post',
    data
  })
}
