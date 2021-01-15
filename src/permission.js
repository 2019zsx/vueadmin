import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import Layout from '@/layout'
import getPageTitle from '@/utils/get-page-title'
const _import = require('./router/_import_' + process.env.NODE_ENV) // 获取组件的方法
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {

    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name

      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          // 获取路由
          var accessedRoutes = await store.dispatch('user/generateRoutes')
          console.log(accessedRoutes)

          const menus = filterAsyncRouter(accessedRoutes) // 1.过滤路由
          console.log('menus', menus)
          router.options.routes = router.options.routes.concat(menus)

          router.addRoutes(menus) // 2.动态添加路由
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          //出现错误  删除token
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === '/') {
        route.component = Layout
      } else {
        console.log('component', route.component);
        route.component = _import(route.component) // 导入组件
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
