import request from '@/utils/request'

export function getMobileInfoAPI() {
  return request({
    url: '/home/mobileData',
    method: 'get',
    params: ''
  })
}

export function queryAccountInfo() {
  return request({
    url: '/user/queryAccountInfo',
    method: 'get',
    params: ''
  })
}
export function modifyAccountInfo(params) {
  return request({
    url: '/user/modifyAccountInfo',
    method: 'post',
    params: ''
  })
}
