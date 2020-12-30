import request from '@/utils/request'

export function listFileInfo(data) {
  return request({
    url: '/wuyi_file/v1/fileInfo/list.json',
    method: 'post',
    data
  })
}

/** 新增权限 */
export function saveFileInfo(data) {
  return request({
    url: '/wuyi_uas/v1/fileInfo/save.json',
    method: 'post',
    data
  })
}

/** 编辑权限 */
export function updateFileInfo(data) {
  return request({
    url: '/wuyi_uas/v1/fileInfo/edit.json',
    method: 'post',
    data
  })
}

export function deleteFileInfo(data) {
  return request({
    url: '/wuyi_uas/v1/fileInfo/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除权限 */
export function batchDeleteFileInfo(data) {
  return request({
    url: '/wuyi_uas/v1/fileInfo/batchDeleteFileInfo.json',
    method: 'post',
    data
  })
}
