import axios from 'axios'
import _ from 'lodash'
import {
  MessageBox,
  Loading,
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
// loading对象
let loading

// 当前正在请求的数量
let needLoadingRequestCount = 0

// 显示loading
function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: 'Loading...',
      spinner: 'el-icon-loading', // 加载图标
      background: 'rgba(240, 242, 245, 1)',
      target: '.app-container'
    })
  }
  needLoadingRequestCount++
}

// 隐藏loading
function hideLoading() {
  needLoadingRequestCount--
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 做个保护
  if (needLoadingRequestCount === 0) {
    // 关闭loading
    toHideLoading()
  }
}

// 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
  loading.close()
  loading = null
}, 300)
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
  // 判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      showLoading(config.headers.loadingTarget)
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 判断当前请求是否设置了不显示Loading
    if (config.headers.showLoading !== false) {
      hideLoading()
    }
    // do something with request error
    console.log(error.states) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or states
   * Please return  response => response
   */

  /**
   * Determine the request states by custom code
   * Here is just an example
   * You can also judge the states by HTTP states Code
   */
  response => {
    const res = response.data
    // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false) {
      hideLoading()
    }
    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return res
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.headers.showLoading !== false) {
      hideLoading()
    }
    if (error.response.status == 401) {
      return Getrefreshtoken({
        access_token: getToken(),
        refreshtoken: getrefreshtoken()
      }).then((response) => {
        if (response.success) {
          store.commit('SET_TOKEN', response.data.checkedtoken)
          setToken(response.data.access_token)
          error.config.__isRetryRequest = true
          error.config.headers.Authorization = getToken()
          // error.config 包含了当前请求的所有信息
          return service(error)
        } else {
          removeToken()
          removerefreshtoken()
          MessageBox.alert('', '登录超时', {
            confirmButtonText: '确定',
            center: true,
            type: 'error',
            callback: action => {
              window.location.reload()
            }
          })
        }
      })
    } else if (error.response.status == 500) {
      Message({
        message: '抱歉服务器出错！请稍候再试',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      console.log('请求出错', error)
    }
    return Promise.resolve(error.response)
  }

  //   if (error.response.states === 401) {
  //     Getrefreshtoken({
  //         access_token: getToken(),
  //         refreshtoken: getrefreshtoken()
  //       }).then((res) => {
  //         if (!res.success) {
  //           removeToken()
  //           removerefreshtoken()
  //           MessageBox.alert('', '登录超时', {
  //             confirmButtonText: '确定',
  //             center: true,
  //             type: 'error',
  //             callback: action => {
  //               window.location.reload()
  //             }
  //           });
  //         } else {
  //           store.commit('SET_TOKEN', res.data.checkedtoken)
  //           setToken(res.data.access_token)
  //           error.config.__isRetryRequest = true;
  //           error.config.headers.Authorization = getToken();
  //           // error.config 包含了当前请求的所有信息
  //           return service(error);
  //         }
  //       })
  //       .catch(() => {})
  //   } else if (error.response.states === 404) {
  //     Message({
  //       message: '未找到地址',
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //   } else {}
  //   return Promise.reject(error.response)
  // }
)

export default service
