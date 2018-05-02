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
              <el-button icon="search">高级搜索</el-button>
              <button type="button" @click="refresh" class="el-button search__icon el-button--default"><span><i class="iconfont"></i></span></button>
              <button type="button" class="el-button search__icon el-button--default"><span><i class="iconfont f-weight-bold"></i>已销卡</span></button>
              <div class="float-right">
                  <i class="iconfont color-waring"></i><span class="align-middle" style="margin-left: 5px;">移动物联网卡续费操作截止每月</span><span class="f-bold f-size-l6 align-middle">22日</span>
              </div>
            </div>
            <div class="container__bar--tool">
              <el-button type="primary" @click="renew = true">续费</el-button>
              <el-button @click="autoRenew = true">自动续费</el-button>
              <div class="float-right">
                  <el-popover
                    ref="popover1"
                    placement="bottom"
                    title="标题"
                    width="200"
                    trigger="click">
                    <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemChange">
                      <el-checkbox v-for="item in items" :label="item.value" :key="item.value">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-popover>
                  <el-button v-popover:popover1>y</el-button>
                  <el-button @click="handleDownload">z</el-button>
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
                    v-for="(item,index) in items"
                    v-if="item.show"
                    :key="index"
                    :prop="item.value"
                    :label="item.name"
                    :width="item.width"
                    sortable>
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
          prop="number"
          label="序号"
          min-width="48"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="套餐类型"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量（张）"
          min-width="100"
          align="center">
        </el-table-column>
      </el-table>
      <p class="hint__content--bar"><span>当前有效ICCID共0个</span></p>
      <div class="margin-top20">
        <el-checkbox v-model="autoRenewChecked">我已确认
          <el-button type="text" @click="open">物联网卡自动续费规则</el-button>
        </el-checkbox>
      </div>
      <div slot="footer" class="footer2">
        <el-button type="primary">开启自动续费</el-button><el-button>关闭自动续费</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCardList } from '@/api/home'
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
      renewVal: '',
      tableDataPop: [],
      autoRenewChecked: false,
      loading: false,
      searchVal: '',
      items: [
        { name: 'ICCID', value: 'iccid', width: '160', show: true },
        { name: '电话号码', value: 'msisdn', width: '120', show: true },
        { name: '卡类型', value: 'type', width: '90', show: true },
        { name: '自动续费', value: 'autoRenew', width: '120', show: true },
        { name: '网络状态', value: 'netStatus', width: '90', show: true },
        { name: '设备状态', value: 'deviceStatus', width: '90', show: true },
        { name: '本月用量', value: 'currMonthDataUsage', width: '80', show: true },
        { name: '套餐规格', value: 'ratePlanName', width: '80', show: true },
        { name: '套餐总量', value: 'totalDataVolume', width: '80', show: true },
        { name: '套餐已用', value: 'usedDataVolume', width: '80', show: true },
        { name: '套餐剩余', value: 'lastDataVolume', width: '80', show: true },
        { name: '最近同步时间', value: 'lastSyncDate', width: '130', show: true },
        { name: '测试期过期时间', value: 'testingExpireDate', width: '130', show: true },
        { name: '过期时间', value: 'expireDate', width: '130', show: true },
        { name: '备注', value: 'userMemo', width: '130', show: true }
      ],
      checkedItem: ['iccid', 'msisdn', 'type', 'autoRenew', 'netStatus', 'deviceStatus', 'currMonthDataUsage', 'ratePlanName', 'totalDataVolume', 'usedDataVolume', 'lastDataVolume', 'lastSyncDate', 'testingExpireDate', 'expireDate', 'userMemo'],
      multipleSelection: []
    }
  },
  created() {
    this.getList(1, 'cmcc')
  },
  methods: {
    commonSearch() {
      this.getList(1, 'cmcc')
    },
    getList(curPage, carrier) {
      this.loading = true
      getCardList({
        excludeRetired: false,
        currentPage: curPage,
        rowsPerPage: this.pageSize,
        carrier: carrier,
        iccid_St: this.serachVal
      }).then(res => {
        console.log(res)
        this.allCount = res.data.data.page.allCount
        this.tableData = res.data.data.list
        this.tableData.map(i => {
        })
        this.loading = false
      })
    },
    renewSubmit() {
      if (this.renewVal === '') {
        this.openWarn()
      }
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
    openWarn() {
      this.$message({
        message: '您没有输入任何信息',
        type: 'warning'
      })
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
    refresh() {
      this.getList(1, 'cmcc')
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

<style>
@import url('../dashboard/home.scss');
.cardList {
    box-sizing: content-box;
    background: transparent;
}
.cardList .page__header {
    padding: 0 10px;
    background-color: #fff;
}
.cardList .page__header--title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    height: 50px;
    font-size: 16px;
}
.cardList .page__header--title:after {
    content: " ";
    width: 100%;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 0;
    border-bottom: 1px solid #ebebeb;
}
.cardList .page__header--content {
    padding-left: 10px;
    height: 50px!important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: #fff;
}
.cardList .el-tabs__header{
    margin: 0!important;
}
.cardList .el-tabs__active-bar {
    width: 150px!important;
}
.cardList .el-tabs .el-tabs__item {
    width: 150px;
    text-align: center;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
}
.cardList .page__content {
    padding: 10px;
}
.cardList .page__content--box {
    padding: 20px;
    background-color: #fff;
    min-height: calc(100vh - 212px);
}
.cardList .page__content .container__bar--search {
    width: 100%;
    margin-bottom: 20px;
}
.cardList .container__bar--search .search__simple {
    width: 300px;
    margin-right: 10px;
}
.cardList .page__content .container__bar--tool {
    height: 38px;
    background: #f5f8fa;
    padding: 7px 0 7px 10px;
    margin-bottom: 10px;
}
.cardList .footer1 {
    margin-top: -20px;
    padding-bottom: 15px;
}
.cardList .footer2 {
    margin-top: -40px;
    padding-bottom: 15px;
}
.cardList .el-dialog.el-dialog--small {
    width: 60%!important;
}
.cardList .hint__content--bar {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0 10px;
    background: #f0f0f0;
    color: #666;
    margin-top: 2px;
}
.agreement {
    padding: 0 0 20px!important;
}
.cardList .el-message-box__message p {
    line-height: 1.4;
    margin: 0px;
}
.cardList .agreement p {
    text-indent: 20px;
    font-size: 15px;
    padding-bottom: 10px;
    line-height: 1.4;
    color: rgb(102, 102, 102);
}
</style>
