import request from '@/utils/request'

export function GetLoginRole(data) {
  return request({
    url: '/Account/GetLoginRole',
    method: 'post',
    data
  })
}