<template>
    <div class="app__content--wrapper">
      <div class="home app__content--inner" style="">
        <div class="home__clump home__top">
          <div class="home__clump--main home__block">
            <div class="home__block--header">
              <span class="home__block--title home__left--title">{{ company }}</span>
                <span><img src="https://simboss-public.oss-cn-hangzhou.aliyuncs.com/palette/static/public/images/nocretify.png" title="企业认证通审核未通过" class="certify certify__pass">
                <router-link to="/set/set-account" class="link certify__link">立即认证</router-link>
              </span>
            </div>
          <div class="home__block--content">
            <div class="home__clump">
              <div class="home__clump--base count">
                <p class="count__title">卡片总数</p>
                <p><span class="count__number">{{ amount }}</span></p>
              </div>
              <div class="home__clump--base count">
                <p class="count__title">账户余额</p>
                <p><span class="count__number">{{ storeMoney }}</span></p>
              </div>
            </div>
            </div>
          </div>
        </div>
        
        <div class="home__clump">
          <div class="home__clump--main home__block">
            <div class="home__block--header">
              <div class="home__block--title home__left--title">卡片统计</div>
            </div>
            <div class="home__clump">
              <div class="home__clump--base" v-for="item in mobileInfo">
                <div class="quantity">
                  <div class="quantity__title home__left--box">
                    {{ item.type }}<span class="quantity__title--number">{{ item.num }}</span>
                  </div>
                  <div class="quantity__content">
                    <div class="quantity__content--box" id="cmccCount">
                      <div :class="getClass(item.type)"></div>
                      <pie-chart :data-array="item.cards"></pie-chart>
                    </div>
                  </div>
              
                  <div class="quantity__footer">
                    <div class="quantity__footer--item">已激活<p>{{ item['cards'][0] }} &nbsp;</p></div>
                    <div class="quantity__footer--item">已停卡<p>{{ item['cards'][1] }} &nbsp;</p></div>
                    <div class="quantity__footer--item">库存<p>{{ item['cards'][2] }} &nbsp;</p></div>
                    <div class="quantity__footer--item">测试期<p>{{ item['cards'][3] }} &nbsp;</p></div>
                    <div class="quantity__footer--item">已销卡<p>{{ item['cards'][4] }} &nbsp;</p></div>
                  </div>

                </div>
              </div> 

              <div class="home__clump--minor home__block">
                <div class="home__block--header">
                  <div class="home__block--title">流量统计</div>
                </div>
                <div class="home__block--content">
                  <div class="flow__content">
                    <BarChart :bar-data="barData"></BarChart>
                  </div>
                </div>
                <div class="home__block--footer">
                  <div class="flow__count">本月总消耗(M): <span class="flow__count--number">{{ barData.CMCC + barData.UNICOM + barData.CHINANET }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="el-loading-mask" style="display: none;"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!----></div></div>
      </div>
    </div>
</template>

<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import { getMobileInfoAPI, countMonthlyUsage } from '@/api/home'

export default {
  name: 'dashboard-admin',
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      company: '',
      amount: 0,
      storeMoney: 0,
      mobileInfo: [],
      barData: {
        CMCC: 0,
        UNICOM: 0,
        CHINANET: 0
      }
    }
  },
  created() {
    this.getMobileInfo()
    this.countMonthlyUsage()
  },
  methods: {
    getMobileInfo() {
      const _this = this
      getMobileInfoAPI().then(res => {
        console.log(res)
        _this.company = res.data.company
        _this.amount = res.data.num
        _this.storeMoney = res.data.storeMoney
        _this.mobileInfo = res.data.detail
      })
    },
    countMonthlyUsage() {
      const _this = this
      countMonthlyUsage().then(res => {
        console.log(res.data)
        _this.barData = res.data.data
      })
    },
    getClass(type) {
      switch (type) {
        case '移动卡':
          return 'cmccIcon quantity__content--icon'
        case '联通卡':
          return 'unicomIcon quantity__content--icon'
        default:
          return 'chinaIcon quantity__content--icon'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './home.scss';
</style>
