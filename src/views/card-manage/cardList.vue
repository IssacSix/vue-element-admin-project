<template>
  <div class="cardList">
    <div class="page__header">
      <div class="page__header--title">卡片列表</div>
       <div class="page__header--content">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="移动" name="cmcc"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="page__content" v-loading="loading">
      <div class="page__content--box">
        <div class="device-list">
          <div class="container">
            <div class="container__bar--search">
              <el-input class="search__simple" placeholder="请输入ICCID" v-model="searchVal">
                <el-button slot="append" icon="search" @click="commonSearch"></el-button>
              </el-input>
               <el-popover
                  ref="popover2"
                  placement="bottom"
                  title="高级搜索"
                  v-model="highSearchPop"
                  trigger="click">
                  <el-form ref="highSearchForm" :model="highSearchForm" label-width="88px">
                    <el-form-item label="ICCID">
                      <el-input class="little-input" v-model="highSearchForm.iccid_St"></el-input>
                      -
                      <el-input class="little-input" v-model="highSearchForm.iccid_Ed"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码">
                      <el-input v-model="highSearchForm.msisdn"></el-input>
                    </el-form-item>
                    <el-form-item label="卡类型">
                      <el-select class="small-selector" v-model="highSearchForm.type" placeholder="请选择" clearable>
                        <el-option label="单卡" value="STANDARD,CUSTOM"></el-option>
                        <el-option label="流量卡池" value="POOL"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="自动续费">
                      <el-select class="small-selector" v-model="highSearchForm.automaticRechargeCondition" placeholder="请选择" clearable>
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="设备状态">
                      <el-select class="small-selector" v-model="highSearchForm.status" placeholder="请选择" clearable>
                        <el-option label="库存" value="level2"></el-option>
                        <el-option label="已激活" value="activation"></el-option>
                        <el-option label="已停卡" value="deactivation"></el-option>
                        <el-option label="可测试" value="testing"></el-option>
                        <el-option label="已销卡" value="retired"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="剩余流量">
                      <el-input class="little-input" v-model="highSearchForm.surplusDataVolume_St"></el-input>
                      -
                      <el-input class="little-input" v-model="highSearchForm.surplusDataVolume_Ed"></el-input>
                    </el-form-item>
                    <el-form-item label="过期时间">
                      <!-- <el-col :span="24"> -->
                        <el-date-picker
                          format="yyyy-MM-dd"
                          v-model="dateValue"
                          type="daterange"
                          placeholder="选择时间范围"
                          clearable>
                        </el-date-picker>
                      <!-- </el-col> -->
                    </el-form-item>  
                    <el-form-item label="备注">
                      <el-input v-model="highSearchForm.userMemo"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="clearAll">清空</el-button>
                      <el-button type="primary" @click="highSearchSubmit">确认</el-button>
                    </el-form-item>
                  </el-form>
                </el-popover>
              <el-button icon="search" v-popover:popover2>高级搜索</el-button>
              <button type="button" @click="refresh" class="el-button search__icon el-button--default"><span><i class="iconfont"></i></span></button>
              <button type="button" @click="cardClosed" class="el-button search__icon el-button--default"><span><i class="iconfont f-weight-bold"></i>已销卡</span></button>
              <div class="float-right">
                  <i class="iconfont color-waring"></i><span class="align-middle" style="margin-left: 5px;">移动物联网卡续费操作截止每月</span><span class="f-bold f-size-l6 align-middle">22日</span>
              </div>
            </div>
            <div class="container__bar--tool">
              <el-button type="primary" @click="renew = true">续费</el-button>
              <el-button @click="clickAutoRenew">自动续费</el-button>
              <div class="float-right">
                  <el-popover
                    ref="popover1"
                    placement="bottom"
                    title="筛选条件"
                    width="120"
                    trigger="click">
                    <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemChange" >
                      <div class="checklabel" v-for="item in items" :key="item.value">
                        <el-checkbox :label="item.value" v-show="item.value!=='iccid'">{{item.name}}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-popover>
                  <el-button icon="my-loudou" v-popover:popover1></el-button>
                  <el-button icon="my-excel" @click="handleDownload"></el-button>
              </div>
            </div>
            <div class="container__bar--table">
              <div class="table-detail">
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="28">
                  </el-table-column>
                  <el-table-column
                    v-for="(item,index) in items.slice(0,14)"
                    v-if="item.show"
                    :key="index"
                    :prop="item.value"
                    :label="item.name"
                    :width="item.width"
                    :sortable="item.sortable">
                  </el-table-column>
                  <el-table-column
                    v-if="items[14].show"
                    :prop="items[14].value"
                    :label="items[14].name"
                    :width="items[14].width">
                    <template slot-scope="scope">
                      <i class="el-icon-edit edit"  @click="handleEdit(scope.row.iccid, scope.row.userMemo)"></i>
                      <span>{{scope.row.userMemo}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="align-center margin-top10"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="手动续费" class="balance-alarm" :visible.sync="renew">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="可以直接复制excel中整列ICCID；手动输入多个ICCID，一行一个；"
        v-model="renewVal">
      </el-input>
       <div slot="footer" class="footer1">
        <el-button @click="renew = false">取消</el-button><el-button type="primary" @click="renewSubmit">下一步</el-button>
      </div>
    </el-dialog>
    <el-dialog title="续费" class="balance-alarm" :visible.sync="renewMenu">
      <div class="renewal-panel">
        <p class="color-666 f-size-l8 margin-bottom20">
          <span>以下ICCID支持续套餐周期/修改套餐/续费加油包操作，无效或输入错误的ICCID已为你剔除</span>
        </p>
        <div class="renewal-panel__body">
          <div class="body__card disabled">
            <div class="card__title">
              <span class="color-333 f-size-l6 bold">续套餐周期</span>
              <div class="card__title--description">增加物联网卡的套餐周期</div>
            </div>
            <div class="card__body">
              <p class="f-size-l9">没有符合要求的物联网卡</p>
            </div>
            <div class="card__body--details">
              <div class="body__details--inner">
                <div class="el-scrollbar">
                  <div class="el-select-dropdown__wrap details__inner--max el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                    <ul class="el-scrollbar__view el-select-dropdown__list no-padding" style="position: relative;">
                      <div class="resize-triggers">
                        <div class="expand-trigger">
                          <div style="width: 126px; height: 1px;"></div>
                        </div>
                        <div class="contract-trigger"></div>
                      </div>
                    </ul>
                  </div>
                  <div class="el-scrollbar__bar is-horizontal">
                    <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                  </div>
                  <div class="el-scrollbar__bar is-vertical">
                    <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="body__card disabled">
            <div class="card__title">
              <span class="color-333 f-size-l6 bold">修改套餐</span>
              <div class="card__title--description">修改套餐将会在当前套餐结束后生效</div>
            </div>
            <div class="card__body">
              <p class="f-size-l9">没有符合要求的物联网卡</p>
            </div>
            <div class="card__body--details">
              <div class="body__details--inner">
                <div class="el-scrollbar">
                  <div class="el-select-dropdown__wrap details__inner--max el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                    <ul class="el-scrollbar__view el-select-dropdown__list no-padding" style="position: relative;">
                      <div class="resize-triggers">
                        <div class="expand-trigger">
                          <div style="width: 126px; height: 1px;"></div>
                        </div>
                        <div class="contract-trigger"></div>
                      </div>
                    </ul>
                  </div>
                  <div class="el-scrollbar__bar is-horizontal">
                    <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                  </div>
                  <div class="el-scrollbar__bar is-vertical">
                    <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="body__card disabled">
            <div class="card__title">
              <span class="color-333 f-size-l6 bold">续费加油包</span>
              <div class="card__title--description">续费后立即生效，当月清零</div>
            </div>
            <div class="card__body">
              <p class="f-size-l9">没有符合要求的物联网卡</p>
            </div>
            <div class="card__body--details">
              <div class="body__details--inner">
                <div class="el-scrollbar">
                  <div class="el-select-dropdown__wrap details__inner--max el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                    <ul class="el-scrollbar__view el-select-dropdown__list no-padding" style="position: relative;">
                      <div class="resize-triggers">
                        <div class="expand-trigger">
                          <div style="width: 126px; height: 1px;"></div>
                        </div>
                        <div class="contract-trigger"></div>
                      </div>
                    </ul>
                  </div>
                  <div class="el-scrollbar__bar is-horizontal">
                    <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                  </div>
                  <div class="el-scrollbar__bar is-vertical">
                    <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="自动续费设置" class="balance-alarm" :visible.sync="autoRenew">
      <el-alert
        title="当前为按照查询条件全选模式执行自动续费。"
        type="info"
        :closable="false"
        show-icon>
      </el-alert>
      <el-table
        :data="tableDataPop"
        style="width: 100%"
        class="margin-top10">
        <el-table-column
          type="index"
          label="序号"
          min-width="48"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="套餐类型"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="count"
          label="数量（张）"
          min-width="100"
          align="center">
        </el-table-column>
      </el-table>
      <p class="hint__content--bar"><span>当前有效ICCID共{{valideIcNo}}个</span></p>
      <div class="margin-top20">
        <el-checkbox v-model="autoRenewChecked">我已确认
          <el-button type="text" @click="open">物联网卡自动续费规则</el-button>
        </el-checkbox>
      </div>
      <div slot="footer" class="footer2">
        <el-button type="primary" :disabled="tableDataPop.length===0" @click="autoRenewSubmit(true)">开启自动续费</el-button><el-button  :disabled="tableDataPop.length===0" @click="autoRenewSubmit(false)">关闭自动续费</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑备注" class="balance-alarm small" size="small" :visible.sync="memo">
      <el-input
        type="textarea"
        :rows="4"
        maxlength=50
        placeholder="请输入备注信息，字数不超过50"
        v-model="memoText">
      </el-input>
       <div slot="footer" class="footer1">
        <el-button @click="memo = false">取消</el-button><el-button type="primary" @click="editMemo">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCardList, renew, verifyAutoRecharge, updateAutoRecharge, updateUserMemo } from '@/api/home'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      activeName: 'cmcc',
      filename: '卡片列表',
      total: 0,
      currentPage: 0,
      pageSize: 15,
      tableData: [],
      renew: false,
      autoRenew: false,
      renewMenu: false,
      renewVal: '',
      tableDataPop: [],
      autoRenewChecked: false,
      loading: false,
      searchVal: '',
      items: [
        { name: 'ICCID', value: 'iccid', width: '160', show: true, sortable: true },
        { name: '电话号码', value: 'msisdn', width: '120', show: true, sortable: false },
        { name: '卡类型', value: 'type', width: '90', show: true, sortable: false },
        { name: '自动续费', value: 'automaticRecharge', width: '120', show: true, sortable: false },
        { name: '网络状态', value: 'gprsStatus', width: '90', show: true, sortable: false },
        { name: '设备状态', value: 'status', width: '90', show: true, sortable: true },
        { name: '本月用量', value: 'currMonthDataUsage', width: '80', show: true, sortable: true },
        { name: '套餐规格', value: 'ratePlanName', width: '80', show: true, sortable: true },
        { name: '套餐总量', value: 'totalDataVolume', width: '80', show: true, sortable: true },
        { name: '套餐已用', value: 'usedDataVolume', width: '80', show: true, sortable: true },
        { name: '套餐剩余', value: 'lastDataVolume', width: '80', show: true, sortable: true },
        { name: '最近同步时间', value: 'lastSyncDateTime', width: '130', show: true, sortable: true },
        { name: '测试期过期时间', value: 'testingExpireDateTime', width: '130', show: true, sortable: true },
        { name: '过期时间', value: 'expireDateTime', width: '130', show: true, sortable: true },
        { name: '备注', value: 'userMemo', width: '130', show: true, sortable: false }
      ],
      checkedItem: ['iccid', 'msisdn', 'type', 'automaticRecharge', 'gprsStatus', 'status', 'currMonthDataUsage', 'ratePlanName', 'totalDataVolume', 'usedDataVolume', 'lastDataVolume', 'lastSyncDateTime', 'testingExpireDateTime', 'expireDateTime', 'userMemo'],
      multipleSelection: [],
      eysClose: false,
      valideIcNo: 0,
      highSearchPop: false,
      highSearchForm: {
        msisdn: '',
        status: '',
        type: '',
        automaticRechargeCondition: '',
        userMemo: '',
        excludeRetired: '',
        surplusDataVolume_St: '',
        surplusDataVolume_Ed: '',
        expireDate_St: '',
        expireDate_Ed: '',
        iccid_St: '',
        iccid_Ed: ''
      },
      dateValue: '',
      cardStatus: {
        level2: '库存',
        activation: '已激活',
        deactivation: '已停卡',
        testing: '可测试',
        retired: '已销卡'
      },
      memo: false,
      memoText: '',
      editIccid: ''
    }
  },
  created() {
    this.getList(1, 'cmcc')
  },
  methods: {
    commonSearch() {
      this.getList(1, 'cmcc')
    },
    getList(curPage = 1, carrier = 'cmcc') {
      this.loading = true
      let params = {
        excludeRetired: this.eyeClose, // 销卡
        currentPage: curPage,
        rowsPerPage: this.pageSize,
        carrier: carrier,
        iccid_St: this.serachVal
      }
      params = Object.assign(params, this.highSearchForm)
      getCardList(params).then(res => {
        console.log(res)
        this.total = res.data.data.page.allCount
        this.tableData = res.data.data.list
        this.tableData.forEach(i => {
          i['type'] = i['type'].toLowerCase() === 'standard' ? '单卡' : ''
          i['automaticRecharge'] = i['automaticRecharge'] ? '是' : '否'
          i['gprsStatus'] = i['gprsStatus'].toLowerCase() === 'activated_name' ? '开启' : ''
          i['status'] = this.cardStatus[i.status]
          i['currMonthDataUsage'] = Number(i['currMonthDataUsage']) === 0 ? '0M' : i['currMonthDataUsage'].toFixed(3) + 'M'
          var active = i['physicalStatus'] === 'ACTIVATION_READY_NAME' ? '未激活' : ''
          i['ratePlanName'] = i['ratePlanName'] === '' ? '0M(' + active + ')' : i['ratePlanName']
          i['totalDataVolume'] = Number(i['totalDataVolume']) === 0 ? '0M' : i['totalDataVolume'] && i['totalDataVolume'].toFixed(3) + 'M'
          i['usedDataVolume'] = Number(i['usedDataVolume']) === 0 ? '0M' : i['usedDataVolume'] && i['usedDataVolume'].toFixed(3) + 'M'
          i['lastDataVolume'] = Number(i['lastDataVolume']) === 0 ? '0M' : i['lastDataVolume'] && i['lastDataVolume'].toFixed(3) + 'M'
          i['lastSyncDateTime'] = i['lastSyncDate'] ? parseTime(i['lastSyncDate'].time) : ''
          console.log(i['testingExpireDate'])
          i['testingExpireDateTime'] = i['testingExpireDate'] ? parseTime(i['testingExpireDate'].time) : ''
          i['expireDateTime'] = i['expireDate'] ? parseTime(i['expireDate'].time) : ''
        })
        this.loading = false
      })
    },
    renewSubmit() {
      if (this.renewVal === '') {
        this.openWarn('renew')
        return
      }
      renew({
        iccids: this.renewVal
      }).then(res => {
        this.renewVal = ''
        console.log(res.data.success)
        this.renewMenu = true
      })
    },
    open() {
      const h = this.$createElement
      this.$msgbox({
        title: '物联网卡自动续费规则',
        message: h('div', { class: 'agreement' }, [
          h('p', '1、平台将在每月15-22日（下午15点）执行自动续费操作'),
          h('p', '2、自动续费卡范围:'),
          h('p', '1）只有按月套餐的物联网卡才能开启自动续费;'),
          h('p', '2）物联网卡的对应过期时间：本月15日 - 本月末；'),
          h('p', '3、执行自动续费操作默认续当前套餐档位，套餐周期增加一个月；'),
          h('p', '4、开启自动续费功能后，请保持账户余额充足；'),
          h('p', '5、余额不足时不执行自动续费；平台会进行短信通知，请在收到短信后及时充值'),
          h('p', '6、如因账户余额不足未执行自动续费，用户可在每月23日零点前前进行账户余额充值；（操作步骤：卡片列表导出自动续费卡清单、手动续费）'),
          h('p', '7、自动续费设置在每月23日零点之前修改则当月生效，23日之后修改则次月生效。')
        ]),
        showConfirmButton: false
      })
    },
    openWarn(val) {
      if (val === 'renew') {
        this.$message({
          message: '您没有输入任何信息',
          type: 'warning'
        })
        return
      }
      if (val === 'autoRenew') {
        this.$message({
          message: '请确认物联网卡自动续费规则',
          type: 'warning'
        })
        return
      }
    },
    openSuccess(val) {
      this.$message({
        message: val,
        type: 'success'
      })
      return
    },
    clickAutoRenew() {
      this.tableDataPop = []
      this.autoRenewChecked = false
      this.autoRenew = true
      verifyAutoRecharge({
        excludeRetired: this.eyeClose,
        carrier: this.carrier
      }).then(res => {
        console.log('dadasdasdsdad')
        const table = res.data.data
        for (var key in table) {
          this.valideIcNo += table[key].count
          if (table[key].count > 0) {
            this.tableDataPop.push(table[key])
          }
        }
      })
    },
    autoRenewSubmit(val) {
      console.log(val)
      if (!this.autoRenewChecked) {
        this.openWarn('autoRenew')
        return
      }
      updateAutoRecharge({
        excludeRetired: this.eyeClose,
        carrier: this.carrier,
        isAutoRecharge: val
      }).then(res => {
        if (res.data.success) {
          const msg = val === true ? '开启自动续费成功' : '关闭自动续费成功'
          this.openSuccess(msg)
          this.autoRenew = false
        }
      })
    },
    clearAll() {
      for (var key in this.highSearchForm) {
        this.highSearchForm[key] = ''
      }
    },
    highSearchSubmit() {
      if (this.dateValue) {
        this.highSearchForm.expireDate_St = this.dateFormant(this.dateValue[0]) + ' 00:00:00'
        this.highSearchForm.expireDate_Ed = this.dateFormant(this.dateValue[1]) + ' 23:59:59'
        console.log(this.highSearchForm.expireDate_St)
      }
      this.highSearchPop = false
      this.getList()
    },
    dateFormant(val) {
      var year = val.getFullYear()
      var month = parseInt(val.getMonth()) + 1 > 9 ? parseInt(val.getMonth()) + 1 : '0' + (parseInt(val.getMonth()) + 1)
      var day = val.getDate()
      return year + '-' + month + '-' + day
    },
    handleCheckedItemChange(value) {
      this.items.map(i => {
        if (value.indexOf(i.value) < 0) {
          i.show = false
        }
        if (value.indexOf(i.value) > 0) {
          i.show = true
        }
        return i
      })
    },
    handleEdit(iccid, memo) {
      console.log('edit!')
      this.memo = true
      this.editIccid = iccid
      this.memoText = memo
    },
    editMemo() {
      updateUserMemo({
        iccid: this.editIccid,
        memo: this.memoText
      }).then(res => {
        if (res.data.success) {
          this.openSuccess('备注编辑成功')
          this.memo = false
          this.getList()
        }
      })
    },
    refresh() {
      this.getList(1, 'cmcc')
    },
    cardClosed() {
      this.eyeClose = !this.eyeClose
      this.getList(this.currentPage, this.activeName)
    },
    handleCurrentChange(val) {
      this.getList(val, 'cmcc')
    },
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleDownload() {
      console.log('excel')
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = []
        const filterVal = []
        this.items.forEach(i => {
          if (i.show === true) {
            tHeader.push(i.name)
            filterVal.push(i.value)
          }
        })
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang='scss'>
@import url('./card.scss');
</style>
