import request from '@/utils/request'

export function listSms(data) {
  return request({
    url: '/wuyi_sms_platform/v1/smsSendRecord/list.json',
    method: 'post',
    data
  })
}
