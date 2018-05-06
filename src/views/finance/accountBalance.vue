<template>
  <div class="finance">
    <div class="page__header"><div class="page__header--title">账户余额</div></div>
    <div class="page__content" v-loading="loading">
      <div class="account__balance account__balance--box">
        <div class="balance__show">
          <span title="点击可更新数据" class="balance__show--wait" @click="refreshBalance()">当前余额<span class="balance__show--amount">{{balance}}</span>元</span>
          <el-button size="medium" plain class="balance__show--btn" @click="openReminder">余额提醒</el-button>
        </div> 
        <div class="balance__table">
          <div class="balance__table--header">
            <p class="margin-bottom20">交易记录</p>
          </div> 
          <el-table
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
              prop="date"
              label="交易时间"
              min-width="157"
              align="left">
              </el-table-column>
              <el-table-column
              prop="type"
              label="交易类型"
              min-width="196"
              align="left">
              </el-table-column>
              <el-table-column
              prop="number"
              label="交易编号"
              min-width="195"
              align="left">
              </el-table-column>
              <el-table-column
              prop="amount"
              label="金额"
              min-width="195"
              align="right">
              </el-table-column>
              <el-table-column
              prop="balance"
              label="账户余额"
              min-width="195"
              align="right">
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
    <el-dialog title="余额提醒设置" size="tiny" class="balance-alarm" :visible.sync="reminder" width="30%">
      <el-form :model="form">
        <div class="alarm__top">
          <span class="alarm__title">余额提醒</span><el-switch v-model="form.hasOpenReminder" on-text="开启" off-text="关闭"></el-switch>
        </div>
        <el-form-item>
          账户余额低于:<div class="el-input-number el-input-number--small is-without-controls alarm__input"><el-input v-model="form.fatalThreshold" min="0" max="Infinity" size="small" :disabled="!form.hasOpenReminder"></el-input></div>元进行通知
        </el-form-item>
        <div class="alarm__title">通知设置</div>
        <div>免费发送短信到对应手机号码<button type="button" class="el-button el-button--text"><span @click="toSet">&nbsp;&nbsp;&nbsp;&nbsp;去设置</span></button></div>
      </el-form>
      <div slot="footer" class="footer">
        <el-button @click="reminder = false">取 消</el-button><el-button type="primary" @click="submitReminder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentBalance, getBalanceNotify, balanceNotifySave, getTransactionRecord } from '@/api/home'
export default {
  name: 'accountBalance',
  data() {
    return {
      total: 0,
      currentPage: 0,
      pageSize: 20,
      loading: false,
      tableData: [],
      reminder: false,
      form: {
        hasOpenReminder: false,
        fatalThreshold: 5
      },
      balance: 0
    }
  },
  created() {
    this.getBalance()
    this.getTable(1)
  },
  methods: {
    getTable(curPage) {
      const that = this
      this.loading = true
      getTransactionRecord({
        currentPage: curPage,
        rowsPerPage: 20
      }).then(res => {
        that.total = res.data.data.page.allCount
        that.loading = false
      })
    },
    getBalance() {
      const that = this
      getCurrentBalance().then(res => {
        that.balance = res.data.data.balance
      })
    },
    refreshBalance() {
      this.getBalance()
    },
    getBalanceNotify() {
      const that = this
      getBalanceNotify().then((res) => {
        that.form.fatalThreshold = res.data.data.fatalThreshold
        const status = res.data.data.status.toLowerCase()
        that.form.hasOpenReminder = status === 'active'
      })
    },
    openReminder() {
      this.getBalanceNotify()
      this.reminder = true
    },
    toSet() {
      this.$router.push('/form/set-account')
    },
    submitReminder() {
      const that = this
      const status = this.form.hasOpenReminder === true ? 'ACTIVE' : 'DEACTIVE'
      balanceNotifySave({
        status: status,
        fatalThreshold: 5
      }).then((res) => {
        that.reminder = false
      })
    },
    handleCurrentChange(val) {
      this.getTable(val)
    }
  }
}
</script>
<style>
@import url('../dashboard/home.scss');
.finance .page__header {
    padding: 0 10px;
    background-color: #fff;
}
.finance .page__header--title {
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
.finance .page__header--title:after {
    content: " ";
    width: 100%;
    display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 0;
    border-bottom: 1px solid #ebebeb;
}
.finance .page__content {
    padding: 10px;
}
.finance .page__content--box {
    padding: 20px;
    background-color: #fff;
    min-height: calc(100vh - 160px);
}
.account__balance {
    font-size: 14px;
    padding: 10px;
    color: #333;
    box-sizing: content-box;
}
.account__balance--box {
    padding: 20px;
    min-height: calc(100vh - 160px);
    background-color: #fff;
}
.balance__show {
    margin-top: 10px;
    margin-bottom: 40px;
    padding-bottom: 50px;
    border-bottom: 1px solid #ebebeb; 
    color: #333;
}
.balance__show--wait {
    cursor: pointer;
}
.balance__show--amount {
    font-size: 20px;
    margin-left: 20px;
    color: #33c14a;
    font-weight: 600;
}
.balance__show--btn {
    margin-left: 10px;
}
.account__balance .el-table {
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: #1f2d3d;
}
.account__balance .el-table .el-table__header-wrapper .el-table__header th div.cell {
    padding-left: 4px;
    padding-right: 4px;
    color: #666;
}
.account__balance .el-table__header-wrapper .el-table__header th {
    background-color: #f5f8fa;
}
.account__balance .el-table__header-wrapper .el-table__header th div.cell {
    padding-left: 4px;
    padding-right: 4px;
    color: #666;
    background-color: transparent;
    font-size: 12px;
}
.account__balance .el-button:focus, .el-button:hover {
    color: #20a0ff;
    border-color: #20a0ff;
}
.account__balance .el-switch__input:checked+.el-switch__core>.el-switch__button {
    left: -4px;
}
.account__balance .align-center {
    text-align: center;
}
.account__balance .margin-top10 {
    margin-top: 10px;
}
.account__balance .margin-bottom20 {
    margin-bottom: 20px;
}
.account__balance .alarm__top {
    box-sizing: content-box;
    width: 100%;
    height: 50px;
    background: #f5f8fa;
    margin: -20px -20px 10px;
    padding: 0 20px;
    line-height: 50px;
}
.account__balance .el-switch {
    height: 26px;
    line-height: 26px;
    display: inline-block;
    font-size: 14px;
}
.account__balance .el-switch__core {
    height: 26px;
    border-radius: 14px;
}
.account__balance .el-switch__core .el-switch__button {
    width: 20px;
    height: 20px;
    transition: .3s cubic-bezier(.4,0,.2,1);
}
.account__balance .el-switch__label span {
    top: 7px;
    font-size: 13px;
    font-weight: 700;
}
.account__balance .balance-alarm .alarm__title {
    font-weight: 700;
    margin-right: 15px;
}
.account__balance .balance-alarm .alarm__input {
    width: 80px;
}
.account__balance .el-input-number--small {
    width: 130px;
}
.account__balance .el-input-number {
    display: inline-block;
    width: 180px;
    position: relative;
}
.account__balance .footer {
    margin-top: -40px;
}
.account__balance .el-dialog__footer{
    padding-bottom: 25px;
}
.account__balance .el-table {
    border-radius: 3px;
    font-size: 12px;
}
</style>

