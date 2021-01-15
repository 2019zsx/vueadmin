import {
  login,
  logout,
  getInfo,
  GetMenuTree
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getrefreshtoken,
  setrefreshtoken,
  setuid,
  getuid,
  setroutes,
  getroutes
} from '@/utils/auth'
import {
  resetRouter,
  filterAsyncRouter
} from '@/router'

const getDefaultState = () => {
  return {
    refreshtoken: getrefreshtoken(),
    token: getToken(),
    name: '',
    avatar: '',
    userinfo: {},
    uid: getuid(),
    routedata: getroutes() // 获取路由
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_TOKENrefresh: (state, token) => {
    state.refreshtoken = token
  },
  SET_USERINFo: (state, userinfo) => {
    state.userinfo = userinfo
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routedata) => {
    state.routedata = routedata
  }

}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password,
      roleid
    } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.access_token)
        commit('SET_TOKENrefresh', data.refreshtoken)
        setToken(data.access_token)
        setrefreshtoken(data.refreshtoken)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const {
          data
        } = response
        if (response.success) {
          const _data = data
          commit('SET_USERINFo', _data)
          commit('SET_NAME', data.username)
          commit('SET_UID', data.uid)
          // commit('SET_AVATAR', avatar)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  generateRoutes({
    commit
  }) {
    return new Promise(resolve => {
      // 获取路由
      let accessedRoutes = null;
      /*
      当路由为空时候重新获取路由
      */ 
      if (getroutes() === '' || getroutes() === null|| getroutes().length==0) {
        GetMenuTree().then((res) => {
          commit('SET_ROUTES', res.data)
          setroutes(JSON.stringify(res.data))
          resolve(res.data)
        }).catch((error) => {
          resolve(error)
        });
      } else {
        resolve(JSON.parse(getroutes()))
      }


    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
