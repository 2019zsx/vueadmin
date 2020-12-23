import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Account/SystemLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/Account/GetUserinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function GetUserinfopage(data) {
  return request({
    url: 'GetUserinfopage',
    method: 'get',
    params:data
  })
}

export function Getrefreshtoken(data) {
  return request({
    url: '/Account/Getrefreshtoken',
    method: 'post',
    data
  })
}
export function GetMenuTree() {
  return request({
    url: '/Permission/GetMenuTree',
    method: 'get'
  })
}