import Mock from 'mockjs'
import loginAPI from './login'
import homeAPI from './home'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import cardAPI from './card'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 首页相关
Mock.mock(/\/home\/mobileData/, 'get', homeAPI.mobileData)
Mock.mock(/\/home\/countMonthlyUsage/, 'get', homeAPI.countMonthlyUsage)

// 设置相关
Mock.mock(/\/user\/queryAccountInfo/, 'get', homeAPI.accountInfo)
Mock.mock(/\/user\/modifyAccountInfo/, 'post', '')
Mock.mock(/\/user\/modifyPassword/, 'post', '')
Mock.mock(/\/user\/validateAutoRechargeDevice/, 'post', homeAPI.validateAutoRechargeDevice)
Mock.mock(/\/user\/validateAutoRechargeSubmit/, 'post', '')
Mock.mock(/\/user\/eq\/get/, 'get', homeAPI.getEq)
Mock.mock(/\/user\/eq\/update/, 'post', '')

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)
Mock.mock(/\/balance\/get/, 'get', transactionAPI.getBalance)
Mock.mock(/\/balance\/notify\/get/, 'get', transactionAPI.getBalanceNotify)
Mock.mock(/\/balance\/notify\/save/, 'post', transactionAPI.balanceNotifySave)
Mock.mock(/\/trade\/list/, 'get', transactionAPI.getTradeList)

// 卡片管理
Mock.mock(/\/card\/list/, 'get', cardAPI.getCardList)
Mock.mock(/\/device\/validate/, 'post', cardAPI.renew)
Mock.mock(/\/card\/verifyAutoRechargeInfo/, 'post', cardAPI.verifyAutoRecharge)
Mock.mock(/\/card\/updateAutoRecharge/, 'post', cardAPI.updateAutoRecharge)
Mock.mock(/\/card\/updateUserMemo/, 'post', cardAPI.updateUserMemo)

export default Mock
