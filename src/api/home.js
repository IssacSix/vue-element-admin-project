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
