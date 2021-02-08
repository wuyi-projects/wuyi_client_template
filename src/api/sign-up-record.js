import request from '@/utils/request'

/** 新增签到记录 */
export function saveSignUpRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpRecord/save.json',
    method: 'post',
    data
  })
}

/** 删除签到记录 */
export function deleteSignUpRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpRecord/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除签到记录 */
export function batchDeleteSignUpRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpRecord/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑签到记录 */
export function updateSignUpRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpRecord/edit.json',
    method: 'post',
    data
  })
}

/** 查询签到记录列表 */
export function listSignUpRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/signUpRecord/list.json',
    method: 'post',
    data
  })
}