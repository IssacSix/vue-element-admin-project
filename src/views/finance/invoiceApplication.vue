<template>
  <div class="invoiceApplication">
    <div class="page__header">
      <div class="page__header--title">发票申请</div>
       <div class="page__header--content">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="申请发票" name="apply"></el-tab-pane>
          <el-tab-pane label="发票记录" name="record"></el-tab-pane>
          <el-tab-pane label="增值资质" name="appreciation"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="page__content">
      <div class="page__content--box">
        <div class="invoice-apply" v-show="activeName==='apply'">
          <div class="invoice-apply__top">
            <p>关于发票</p> 
            <p>1、支持普通发票和增值税发票；</p> 
            <p>2、单次开票金额须大于200元，发票包邮；</p> 
            <p>3、每月25号之前，发票申请提交后3-5个工作日寄出；</p> 
            <p>4、每月25-30日为公司内部结算日，不再开票；申请的发票次月初寄出，请合理安排发票申请时间。</p>
          </div> 
          <div class="invoice-apply__body">
            <el-radio-group class="margin-bottom20" v-model="radio1">
              <el-radio-button label="普通发票（纸质）"></el-radio-button>
              <el-radio-button label="增值税专用发票"></el-radio-button>
            </el-radio-group>
            <el-form ref="form" v-show="radio1==='普通发票（纸质）'" label-position="left" :model="form" label-width="100px">
              <el-form-item label="发票金额">
                0元 <el-button type="text">选择开票金额</el-button>
              </el-form-item>
              <el-form-item label="发票抬头">
                <el-input class="invoice-apply__body--input" v-model="form.header"></el-input>
              </el-form-item>
              <el-form-item label="纳税人识别号">
                <el-input class="invoice-apply__body--input" v-model="form.number" placeholder="企业纳税人识别号或统一社会信用代码"></el-input>
              </el-form-item>
              <el-form-item label="发票内容">
                <el-button class="is-selected">技术服务费</el-button>
              </el-form-item>
              <el-form-item label="收货人信息">
                <el-button>新增收货地址</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">申请发票</el-button>
              </el-form-item>
            </el-form>
            <el-form ref="form" v-show="radio1==='增值税专用发票'" label-position="left" :model="form" label-width="100px">
              <el-form-item label="增票资质">
                <div class="invoice-apply__body--board">
                  <div class="invoice-apply__body--board-none">
                    首次申请开具增值税专用发票，请在【<el-button type="text"> 增票资质 </el-button>】页面上传资料，再申请发票。
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="发票金额">
                0元 <el-button type="text">选择开票金额</el-button>
              </el-form-item>
              <el-form-item label="发票内容">
                <el-button class="is-selected">技术服务费</el-button>
              </el-form-item>
              <el-form-item label="收货人信息">
                <el-button>新增收货地址</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" disabled>申请发票</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'apply',
      radio1: '普通发票（纸质）',
      form: {
        number: '',
        header: ''
      }
    }
  }
}
</script>

<style lang="scss">
@import url('./finance.scss');
</style>
