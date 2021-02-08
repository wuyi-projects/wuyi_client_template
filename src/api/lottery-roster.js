import request from '@/utils/request'

/** 新增抽奖人员 */
export function saveLotteryRoster(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRoster/save.json',
    method: 'post',
    data
  })
}

/** 删除抽奖人员 */
export function deleteLotteryRoster(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRoster/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除抽奖人员 */
export function batchDeleteLotteryRoster(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRoster/batchDelete.json',
    method: 'post',
    data
  })
}

/** 编辑抽奖人员 */
export function updateLotteryRoster(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRoster/edit.json',
    method: 'post',
    data
  })
}

/** 查询抽奖人员详情 */
export function getLotteryRoster(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRoster/get.json',
    method: 'post',
    data
  })
}

/** 查询抽奖人员列表 */
export function listLotteryRoster(data) {
  return request({
    url: '/wuyi_lottery/v1/lotteryRoster/list.json',
    method: 'post',
    data
  })
}