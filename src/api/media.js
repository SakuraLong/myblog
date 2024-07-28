import request from '@/utils/request'

// 图片资源转github，用仓库当图床

export function uploadImages(data) {
  return request({
    url: '/blogmanage/images/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    token: true
  })
}

export function getImageUrls(params) {
  return request({
    url: '/blogmanage/images/get',
    method: 'get',
    params
  })
}

export function renameImage(data) {
  return request({
    url: '/blogmanage/images/rename',
    method: 'put',
    data,
    token: true
  })
}
