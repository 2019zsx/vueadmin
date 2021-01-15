import request from '@/utils/request'

export function GetLoginRole(data) {
  return request({
    url: '/Account/GetLoginRole',
    method: 'post',
    data
  })
}
export function GetRoleList(data) {
  return request({
    url: '/Role/GetRoleList',
    method: 'get',
    params: data
  })
}
export function GetRolePage(data) {
  return request({
    url: '/Role/GetRolePage',
    method: 'get',
    params: data
  })
}
// 添加角色
export function Create(data) {
  return request({
    url: '/Role/Create',
    method: 'post',
    data
  })
}

// 编辑角色
export function Edit(data) {
  return request({
    url: '/Role/Edit',
    method: 'put',
    data
  })
}

// 删除角色
export function Del(data) {
  return request({
    url: '/Role/Del',
    method: 'delete',
    params:data
  })
}
export function GetRole(data) {
  return request({
    url: '/Role/GetRole',
    method: 'get',
    params: data
  })
} 