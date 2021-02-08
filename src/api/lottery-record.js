import request from '@/utils/request'

/** 新增抽奖记录 */
export function saveLotteryRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRecord/save.json',
    method: 'post',
    data
  })
}

/** 删除抽奖记录 */
export function deleteLotteryRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRecord/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除抽奖记录 */
export function batchDeleteLotteryRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRecord/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑抽奖记录 */
export function updateLotteryRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRecord/edit.json',
    method: 'post',
    data
  })
}

/** 查询抽奖记录详情 */
export function getLotteryRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRecord/get.json',
    method: 'post',
    data
  })
}

/** 查询抽奖记录列表 */
export function listLotteryRecord(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRecord/list.json',
    method: 'post',
    data
  })
}