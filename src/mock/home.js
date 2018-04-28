
export default {
  mobileData: () => {
    return {
      company: '大华',
      num: 150,
      storeMoney: 100000,
      detail: [{
        type: '移动卡',
        num: 40,
        cards: [2, 4, 48, 1, 20]
      }, {
        type: '联通卡',
        num: 60,
        cards: [20, 4, 48, 1, 28]
      }, {
        type: '电信卡',
        num: 50,
        cards: [1, 20, 48, 1, 2]
      }],
      flow: [{
        type: '移动',
        num: 1000
      }, {
        type: '联通',
        num: 10.8
      }, {
        type: '电信',
        num: 1.05
      }]
    }
  },
  accountInfo: () => {
    return {
      'message': '获取账户信息成功',
      'data': {
        'eqStatus': 'not-pass',
        'phone': '18969121159',
        'orgName': '大华',
        'orgId': 9430,
        'ownedBySales': false,
        'superAdmin': false,
        'address': '杭州市滨江区大华技术股份有限公司',
        'email': '',
        'secret': '1a400c45afc029113ca908cc5bf0f74d',
        'userAccount': '18969121159',
        'legalEntityStatus': 'not-submit',
        'appID': '102420134896'
      },
      'success': true
    }
  }
}
