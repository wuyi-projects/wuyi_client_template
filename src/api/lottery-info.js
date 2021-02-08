import request from '@/utils/request'

/** 新增抽奖信息 */
export function saveLotteryInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryInfo/save.json',
    method: 'post',
    data
  })
}

/** 删除抽奖信息 */
export function deleteLotteryInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryInfo/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除抽奖信息 */
export function batchDeleteLotteryInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryInfo/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑抽奖信息 */
export function updateLotteryInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryInfo/edit.json',
    method: 'post',
    data
  })
}

/** 查询抽奖信息列表 */
export function listLotteryInfo(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryInfo/list.json',
    method: 'post',
    data
  })
}