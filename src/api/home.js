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
    params: params
  })
}

export function modifyPassword(params) {
  return request({
    url: '/user/modifyPassword',
    method: 'post',
    params: params
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

// 财务
export function getCurrentBalance() {
  return request({
    url: 'balance/get',
    method: 'get',
    params: ''
  })
}

export function getBalanceNotify() {
  return request({
    url: '/balance/notify/get',
    method: 'get',
    params: ''
  })
}

export function balanceNotifySave(params) {
  return request({
    url: '/balance/notify/save',
    method: 'post',
    params: params
  })
}

export function getTransactionRecord(params) {
  return request({
    url: '/trade/list?currentPage=' + params.currenPage + '&rowsPerPage=' + params.rowsPerPage,
    method: 'get',
    params: ''
  })
}

// 卡片管理
export function getCardList(params) {
  return request({
    url: '/card/list?excludeRetired=' + params.excludeRetired + '&currentPage=' + params.currentPage + '&rowsPerPage=' + params.rowsPerPage + '&carrier=' + params.carrier + '&iccid_St=' + params.iccid_St,
    method: 'get',
    params: ''
  })
}

export function renew(params) {
  return request({
    url: '/device/validate',
    method: 'post',
    params: params
  })
}

export function verifyAutoRecharge(params) {
  return request({
    url: '/card/verifyAutoRechargeInfo',
    method: 'post',
    params: params
  })
}

export function updateAutoRecharge(params) {
  return request({
    url: '/card/updateAutoRecharge',
    method: 'post',
    params: params
  })
}

export function updateUserMemo(params) {
  return request({
    url: '/card/updateUserMemo',
    method: 'post',
    params: params
  })
}

export function realName(params) {
  return request({
    url: 'realName/search',
    method: 'get',
    params: params
  })
}
