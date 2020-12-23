import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  getrefreshtoken,
  setToken,
  removeToken,
  removerefreshtoken
} from '@/utils/auth'
import {
  Getrefreshtoken
} from '@/api/user'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    alert(error)
    // do something with request error
    console.log(error.status) // for debug
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
    if (!res.success) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return res
      //return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 401) {
      Getrefreshtoken({
          access_token: getToken(),
          refreshtoken: getrefreshtoken()
        }).then((res) => {
          alert(res.success)
          if (!res.success) {

            MessageBox.alert('', '登录超时', {
              confirmButtonText: '确定',
              center: true,
              type: 'error',
              callback: action => {
                removeToken()
                removerefreshtoken()
                window.location.reload()
              }
            });
          } else {
            store.commit('SET_TOKEN', res.data.checkedtoken)
            setToken(res.data.access_token)
            error.config.__isRetryRequest = true;
            error.config.headers.Authorization = getToken();
            // error.config 包含了当前请求的所有信息
            return service(error);
          }
        })
        .catch(() => {})
    } else if (error.response.status === 404) {
      Message({
        message: '未找到地址',
        type: 'error',
        duration: 5 * 1000
      })
    } else {}
    return Promise.reject(error.response)
  }
)

export default service
