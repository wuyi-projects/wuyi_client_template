import request from '@/utils/request'

export function listNews(data) {
  return request({
    url: '/wuyi_news/v1/news/list.json',
    method: 'post',
    data
  })
}

export function saveNews(data) {
  return request({
    url: '/wuyi_news/v1/news/save.json',
    method: 'post',
    data
  })
}

export function updateNews(data) {
  return request({
    url: '/wuyi_news/v1/news/edit.json',
    method: 'post',
    data
  })
}

export function deleteNews(data) {
  return request({
    url: '/wuyi_news/v1/news/delete.json',
    method: 'post',
    data
  })
}

export function batchDeleteNews(data) {
  return request({
    url: '/wuyi_news/v1/news/batchDelete.json',
    method: 'post',
    data
  })
}

export function getNews(data) {
  return request({
    url: '/wuyi_news/v1/news/get.json',
    method: 'post',
    data
  })
}
