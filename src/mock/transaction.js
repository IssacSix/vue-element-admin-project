import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    order_no: '@guid()',
    timestamp: +Mock.Random.date('T'),
    username: '@name()',
    price: '@float(1000, 15000, 0, 2)',
    'status|1': ['success', 'pending']
  }))
}

export default {
  getList: () => {
    return {
      total: List.length,
      items: List
    }
  },
  getBalance: () => {
    return {
      'data': {
        'balance': 5,
        't': {
          'time': 1525070671332,
          'minutes': 44,
          'seconds': 31,
          'hours': 14,
          'month': 3,
          'year': 118,
          'timezoneOffset': -480
        }
      },
      'message': '获取余额成功',
      'success': true
    }
  },
  getBalanceNotify() {
    return {
      'data': {
        'criticalThreshold': null,
        'fatalThreshold': 5,
        'gmtCreated': '2018-04-19 13:33:59',
        'gmtModified': '2018-04-24 16:54:57',
        'id': 4074,
        'notifyEmail': null,
        'notifyOption': 0,
        'notifyPhone': null,
        'refId': 9430,
        'refType': 'BALANCE_NOTIFY',
        'status': 'ACTIVE',
        'warningThreshold': null
      },
      'message': '获取成功',
      'success': true
    }
  },
  balanceNotifySave() {
    return {
      'data': null,
      'message': '保存成功',
      'success': true
    }
  },
  getTradeList() {
    return {
      'data': {
        'list': [],
        'page': {
          'allCount': 400,
          'currentPage': 1,
          'orderByClause': '',
          'rowsPerPage': 20,
          'start': 0,
          'totalPage': 0
        }
      },
      'message': '获取交易记录成功',
      'success': true
    }
  }
}
