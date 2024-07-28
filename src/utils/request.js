import axios from 'axios'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: {
    'Cache-Control': process.env.VUE_APP_NO_CACHE === true ? 'no-cache' : null
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config)
    if (config.token) {
      // need token
      config.headers['authorization'] = 'token ' + getToken()
    }
    // do something before request is sent
    // if (getToken()) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['authorization'] = 'token ' + getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.data instanceof Blob) {
      return response.data
    } else {
      return response.data.data
    }
  },
  error => {
    // if (error.response.status === 401) {
    //   // removeToken()
    //   // router.push({
    //   //   name: 'ClientLogin'
    //   // })
    // }
    return Promise.reject(error.response.data.message, error)
  }
)

export default service
