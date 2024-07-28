import request from '@/utils/request'

export function getPosts() {
  return request({
    url: '/blog/posts/get',
    method: 'get'
  })
}

export function getPost(params) {
  return request({
    url: '/blog/post/get',
    method: 'get',
    params
  })
}

export function getCategories() {
  return request({
    url: '/blog/categories/get',
    method: 'get'
  })
}
