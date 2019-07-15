import axios from 'axios'
import router from '../router'
import store from '../store'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true
axios.defaults.dataType = 'json'
axios.defaults.headers['cache-control'] = 'no-cache'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
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
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status != 1) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // || (error+1).indexOf('500') > -1
    if((error+1).indexOf('401') > -1 ) {
      // console.log(router)
      store.dispatch('user/postError')
      router.push(`/login?redirect=${router.app._route.fullPath}`)
    } 
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service