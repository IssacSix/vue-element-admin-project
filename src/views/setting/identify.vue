<template>
  <div class="cardList">
    <div class="page__header">
      <div class="page__header--title">实名认证</div>
    </div>
    <div class="page__content" v-loading="loading">
      <div class="page__content--box">
        <div class="device-list">
          <div class="container">
            <div class="container__bar--search">
              <el-input class="search__simple" placeholder="请输入ICCID/姓名/手机号码搜索" v-model="searchVal">
                <el-button slot="append" icon="search" @click="commonSearch"></el-button>
              </el-input>
               <el-popover
                  ref="popover2"
                  placement="bottom"
                  title="高级搜索"
                  v-model="highSearchPop"
                  trigger="click">
                  <el-form ref="highSearchForm" :model="highSearchForm" label-width="88px">
                    <el-form-item label="设备状态">
                      <el-select class="small-selector" v-model="highSearchForm.status" placeholder="请选择" clearable>
                        <el-option label="待审核" value="waitting"></el-option>
                        <el-option label="审核通过" value="pass"></el-option>
                        <el-option label="审核不通过" value="failepass"></el-option>
                      </el-select>
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
                      <el-button @click="clearAll">清空</el-button>
                      <el-button type="primary" @click="highSearchSubmit">确认</el-button>
                    </el-form-item>
                  </el-form>
                </el-popover>
              <button type="button" @click="refresh" class="el-button search__icon el-button--default"><span><i class="iconfont"></i></span></button>
              <el-button icon="search" v-popover:popover2>高级搜索</el-button>
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
                    v-for="(item,index) in items.slice(0,4)"
                    v-if="item.show"
                    :key="index"
                    :prop="item.value"
                    :label="item.name"
                    :width="item.width"
                    :sortable="item.sortable">
                  </el-table-column>
                  <el-table-column
                    v-if="items[4].show"
                    :prop="items[4].value"
                    :label="items[4].name"
                    :width="items[4].width">
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
  </div>
</template>

<script>
import { realName } from '@/api/home'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      total: 0,
      currentPage: 0,
      pageSize: 15,
      tableData: [],
      tableDataPop: [],
      autoRenewChecked: false,
      loading: false,
      searchVal: '',
      items: [
        { name: '提交时间', value: 'submitTime', width: '200', show: true, sortable: false },
        { name: 'ICCID', value: 'iccid', width: '200', show: true, sortable: true },
        { name: '认证信息', value: 'idetifyTime', width: '200', show: true, sortable: false },
        { name: '证件信息', value: 'idetifyInfo', width: '200', show: true, sortable: false },
        { name: '操作', value: 'idetifyInfo', width: '200', show: true, sortable: false }
      ],
      checkedItem: ['iccid', 'msisdn', 'type', 'automaticRecharge', 'gprsStatus', 'status', 'currMonthDataUsage', 'ratePlanName', 'totalDataVolume', 'usedDataVolume', 'lastDataVolume', 'lastSyncDateTime', 'testingExpireDateTime', 'expireDateTime', 'userMemo'],
      multipleSelection: [],
      eysClose: false,
      valideIcNo: 0,
      highSearchPop: false,
      highSearchForm: {
        status: '',
        expireDate_St: '',
        expireDate_Ed: ''
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
        currentPage: 1, // 销卡
        currentPage: 20
      }
      params = Object.assign(params, this.highSearchForm)
      realName(params).then(res => {
        this.loading = false
        console.log('get realName list')
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
    handleEdit(iccid, memo) {
      console.log('edit!')
      this.memo = true
      this.editIccid = iccid
      this.memoText = memo
    },
    refresh() {
      this.getList(1, 'cmcc')
    },
    handleCurrentChange(val) {
      this.getList(val, 'cmcc')
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>

<style lang='scss'>
@import url('../card-manage/card.scss');
  .cardList .page__content {
    padding: 0;
  }
</style>
