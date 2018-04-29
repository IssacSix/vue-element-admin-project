<template>
  <div class="cardList">
    <div class="page__header">
      <div class="page__header--title">卡片列表</div>
       <div class="page__header--content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="移动" name="yidong"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="page__content">
      <div class="page__content--box">
        <div class="device-list">
          <div class="container">
            <div class="container__bar--search">
              <el-input class="search__simple" placeholder="请输入ICCID" v-model="serachVal">
                <el-button slot="append" icon="search"></el-button>
              </el-input>
              <el-button icon="search">高级搜索</el-button>
              <button type="button" class="el-button search__icon el-button--default"><span><i class="iconfont"></i></span></button>
              <button type="button" class="el-button search__icon el-button--default"><span><i class="iconfont f-weight-bold"></i>已销卡</span></button>
              <div class="float-right">
                  <i class="iconfont color-waring"></i><span class="align-middle" style="margin-left: 5px;">移动物联网卡续费操作截止每月</span><span class="f-bold f-size-l6 align-middle">22日</span>
              </div>
            </div>
            <div class="container__bar--tool">
              <el-button type="primary" @click="renew = true">续费</el-button>
              <el-button @click="autoRenew = true">自动续费</el-button>
              <div class="float-right">
                  <!-- <button type="button" @click="popover=!popover" class="el-button margin-right10 search__icon el-button--default" ><span><i class="iconfont"></i></span></button> <button type="button" class="el-button el-button search__icon el-button--default"><span><i class="iconfont"></i></span></button> -->
                  <el-button v-popover:popover1></el-button>
                  <el-popover
                    ref="popover1"
                    placement="top-start"
                    title="标题"
                    width="200"
                    trigger="hover"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                  </el-popover>
                  <el-button v-popover:popover2></el-button>
                  <el-popover
                    ref="popover2"
                    placement="top-start"
                    title="标题"
                    width="200"
                    trigger="hover"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                  </el-popover>
              </div>
            </div>
            <div class="container__bar--table">
              <div class="table-detail">
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  border
                  v-loading="loading"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="28">
                  </el-table-column>
                  <el-table-column
                    label="ICCID"
                    width="160"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="电话号码"
                    width="120">
                  </el-table-column>
                   <el-table-column
                    label="卡类型"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    label="自动续费"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="网络状态"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    label="设备状态"
                    width="90"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="本月用量"
                    width="80"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="套餐规格"
                    width="80"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="套餐总量"
                    width="80"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="套餐已用"
                    width="80"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="套餐剩余"
                    width="80"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="最近同步时间"
                    width="130"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="测试期过期时间"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    label="过期时间"
                    width="130"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    width="130"
                    sortable>
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="align-center margin-top10"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="totalPages">
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
       <div slot="footer" class="footer">
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
      <div slot="footer" class="footer">
        <el-button @click="autoRenew = false">取消</el-button><el-button type="primary" @click="autoRenewSubmit">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'yidong',
      totalPages: 0,
      currentPage: 0,
      pageSize: 0,
      loading: false,
      tableData: [],
      renew: false,
      autoRenew: false,
      renewVal: ''
    }
  },
  methods: {
    renewSubmit() {
      if (this.renewVal === '') {
        console.log('sdsa')
      }
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
.cardList .footer {
    margin-top: -20px;
    padding-bottom: 15px;
}
</style>
