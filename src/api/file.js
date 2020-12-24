import request from '@/utils/request'

export function getOssToken() {
  return request({
    url: '/wuyi_file/v1/oss/getSign.json',
    method: 'post'
  })
}
