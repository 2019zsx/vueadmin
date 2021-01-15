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
// 获取新token

export function Getrefreshtoken(data) {
  return request({
    url: '/Account/Getrefreshtoken',
    method: 'post',
    data
  })
}
// 获取权限树形
export function GetMenuTree() {
  return request({
    url: '/Permission/GetMenuTree',
    method: 'get'
  })
}
// 获取用户列表
export function GetUserPage(data) {
  return request({
    url: '/SysUser/GetUserPage',
    method: 'get',
    params:data
  })
}
// 获取用户信息
export function GetUser(data) {
  return request({
    url: '/SysUser/GetUser',
    method: 'get',
    params:data
  })
}
// 添加用户
export function Create(data) {
  return request({
    url: '/SysUser/Create',
    method: 'post',
    data
  })
}

// 编辑用户
export function Edit(data) {
  return request({
    url: '/SysUser/Edit',
    method: 'put',
    data
  })
}

// 删除用户
export function Del(data) {
  return request({
    url: '/SysUser/Del',
    method: 'delete',
    params:data
  })
}