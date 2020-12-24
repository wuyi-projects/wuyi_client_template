import request from '@/utils/request'

export function listAllPost() {
  return request({
    url: '/wuyi_oa/v1/post/listAll.json',
    method: 'post'
  })
}

export function listPost(data) {
  return request({
    url: '/wuyi_oa/v1/post/list.json',
    method: 'post',
    data
  })
}

export function savePost(data) {
  return request({
    url: '/wuyi_oa/v1/post/save.json',
    method: 'post',
    data
  })
}

export function updatePost(data) {
  return request({
    url: '/wuyi_oa/v1/post/edit.json',
    method: 'post',
    data
  })
}

export function deletePost(data) {
  return request({
    url: '/wuyi_oa/v1/post/delete.json',
    method: 'post',
    data
  })
}

export function batchDeletePost(data) {
  return request({
    url: '/wuyi_oa/v1/post/batchDelete.json',
    method: 'post',
    data
  })
}

