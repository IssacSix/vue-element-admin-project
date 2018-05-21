import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/home'),
      name: 'dashboard',
      meta: { title: '首页', icon: '&#xe628;', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/cardManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'cardManage',
    meta: {
      title: '卡片管理',
      icon: '&#xe6e7;'
    },
    children: [
      { path: 'cardList', component: _import('card-manage/cardList'), name: 'cardList', meta: { title: '卡片列表' }},
      { path: 'dataZone', component: _import('card-manage/dataZone'), name: 'dataZone', meta: { title: '流量池' }}
    ]
  },

  {
    path: '/finance',
    component: Layout,
    alwaysShow: true,
    meta: { title: '财务', icon: '&#xe618;' },
    redirect: 'noredirect',
    children: [
      { path: 'accountBalance', component: _import('finance/accountBalance'), name: 'accountBalance', meta: { title: '账户余额' }},
      { path: 'invoiceApplication', component: _import('finance/invoiceApplication'), name: 'invoiceApplication', meta: { title: '发票申请' }}
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: '设置',
      icon: '&#xe7f6;'
    },
    children: [
      { path: 'set-system', component: _import('setting/system'), name: 'systemSetting', meta: { title: '系统设置' }},
      { path: 'set-account', component: _import('setting/account'), name: 'setAccount', meta: { title: '账户设置' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
