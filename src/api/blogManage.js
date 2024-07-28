import request from '@/utils/request'

export function getPosts() {
  return request({
    url: '/blogmanage/posts/get',
    method: 'post',
    token: true
  })
}

export function getPost(data) {
  return request({
    url: '/blogmanage/post/get',
    method: 'post',
    data,
    token: true
  })
}

export function createDraft(data) {
  return request({
    url: '/blogmanage/post/create',
    method: 'post',
    data,
    token: true
  })
}

export function detailDataSave(data) {
  return request({
    url: '/blogmanage/post/save',
    method: 'post',
    data,
    token: true
  })
}

export function publish(id) {
  return request({
    url: '/blogmanage/post/publish',
    method: 'post',
    data: {
      id
    },
    token: true
  })
}

export function updateCategories(categories) {
  return request({
    url: '/blogmanage/categories/update',
    method: 'put',
    data: {
      categories
    },
    token: true
  })
}
