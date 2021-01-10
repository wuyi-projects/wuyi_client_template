import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getOpenID, getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    if (store.getters.token) {
      config.headers['Open-ID'] = getOpenID()
      config.headers['Product-Code'] = 'assistant'
      config.headers['Access-Token'] = getToken()
      config.headers['Team-Number'] = 999999999
      
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 110030: Illegal token; 110060: Other clients logged in; 110050: Token expired;
      if (res.code === 110030 || res.code === 110060 || res.code === 110050) {
        // to re-login
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
