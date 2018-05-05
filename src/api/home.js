import request from '@/utils/request'

export function getMobileInfoAPI() {
  return request({
    url: '/home/mobileData',
    method: 'get',
    params: ''
  })
}

export function countMonthlyUsage() {
  return request({
    url: '/home/countMonthlyUsage',
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

export function modifyPassword(params) {
  return request({
    url: '/user/modifyPassword',
    method: 'post',
    params: ''
  })
}

export function validateAutoRechargeDevice() {
  return request({
    url: '/user/validateAutoRechargeDevice',
    method: 'post',
    params: ''
  })
}

export function validateAutoRechargeSubmit() {
  return request({
    url: '/user/validateAutoRechargeSubmit',
    method: 'post',
    params: ''
  })
}

export function getEq() {
  return request({
    url: '/user/eq/get',
    method: 'get',
    params: ''
  })
}

export function updateEq() {
  return request({
    url: '/user/eq/update',
    method: 'post',
    params: ''
  })
}
