<template>
  <div class="invoiceApplication">
    <div class="page__header">
      <div class="page__header--title">发票申请</div>
       <div class="page__header--content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
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
            <el-form ref="applyForm" :rules="applyRules" v-show="radio1==='普通发票（纸质）'" label-position="left" :model="applyForm" label-width="100px">
              <el-form-item label="发票金额" prop="consumeAmount">
                {{applyForm.consumeAmount}}元 <el-button type="text" @click="chooseAmount">选择开票金额</el-button>
              </el-form-item>
              <el-form-item label="发票抬头" prop="header" :rules="[{ required: true, message: '发票抬头不能为空'}]">
                <el-input class="invoice-apply__body--input" v-model="applyForm.header"></el-input>
              </el-form-item>
              <el-form-item label="纳税人识别号" prop="number" :rules="[{ required: true, message: '纳税人识别号不能为空'}]">
                <el-input class="invoice-apply__body--input" v-model="applyForm.number" placeholder="企业纳税人识别号或统一社会信用代码"></el-input>
              </el-form-item>
              <el-form-item label="发票内容">
                <el-button class="is-selected">技术服务费</el-button>
              </el-form-item>
              <el-form-item label="收货人信息">
                <el-button @click="dialog2 = true">新增收货地址</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="apply('applyForm')">申请发票</el-button>
              </el-form-item>
            </el-form>
            <el-form ref="applyForm2" :rules="applyRules" v-show="radio1==='增值税专用发票'" label-position="left" :model="applyForm" label-width="100px">
              <el-form-item label="增票资质">
                <div class="invoice-apply__body--board">
                  <div class="invoice-apply__body--board-content" v-if="hasCompanyInfo">
                    <div>
                      <p>增票资质信息核对</p>
                      <p><span>公司名称：</span>{{qualityForm.name}}</p> 
                      <p><span>纳税人识别码：</span>{{qualityForm.taxNum}}</p> 
                      <p><span>注册地址：</span>{{registAddress}}</p> 
                      <p><span>注册电话：</span>{{registPhone}}</p> 
                      <p><span>开户银行：</span>{{qualityForm.bank}}</p> 
                      <p><span>开户名：</span>{{qualityForm.accountName}}</p> 
                      <p><span>银行账号：</span>{{qualityForm.bankAccount}}</p>
                    </div>
                  </div>
                  <div class="invoice-apply__body--board-none" v-else>
                    首次申请开具增值税专用发票，请在【<el-button type="text" @click="activeName='appreciation'"> 增票资质 </el-button>】页面上传资料，再申请发票。
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="发票金额" prop="consumeAmount">
               {{applyForm.consumeAmount}}元<el-button type="text" @click="chooseAmount">选择开票金额</el-button>
                <div class="el-form-item__error" v-show="showError">单次开票金额须大于200元；</div>
              </el-form-item>
              <el-form-item label="发票内容">
                <el-button class="is-selected">技术服务费</el-button>
              </el-form-item>
              <el-form-item label="收货人信息">
                <el-button @click="dialog2 = true">新增收货地址</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="hasCompanyInfo === false">申请发票</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="invoice-record" v-show="activeName==='record'">
          <el-table 
          :data="recordData"
          border
          style="width: 100%">
            <el-table-column
            prop="applyTime"
            label="申请时间"
            min-width="180">
            </el-table-column>
            <el-table-column
            prop="invoiceAmount"
            label="发票金额"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="invoiceType"
            label="发票类型"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="invoiceInfo"
            label="发票信息"
            min-width="200">
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态"
            min-width="90">
            </el-table-column>
            <el-table-column
            prop="memo"
            label="备注"
            min-width="210">
            </el-table-column>
            <el-table-column
            prop="operation"
            label="操作"
            min-width="80">
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
        <div class="invoice-quality" v-show="activeName==='appreciation'">
          <div class="margin-bottom20">你的增票资质
            <span class="margin-left10 color-666">未提交</span>
          </div>
          <el-form ref="qualityForm" :rules="qualityRules" class="quality-form" label-position="left" :model="qualityForm" label-width="100px">
            <el-form-item label="公司名称" prop="name" >
              <el-input v-model="qualityForm.name" placeholder="公司全称"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="taxNum">
              <el-input v-model="qualityForm.taxNum" placeholder="企业纳税人识别号或统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="registAddress">
              <el-input v-model="qualityForm.registAddress" placeholder="公司注册地址，请与《税务登记证》上保持一致"></el-input>
            </el-form-item>
            <el-form-item label="注册电话" prop="registPhone">
              <el-input v-model="qualityForm.registPhone" placeholder="公司注册固定电话，请与《税务登记证》上保持一致"></el-input>
            </el-form-item>
            <el-form-item label="开户银行" prop="bank">
              <el-input v-model="qualityForm.bank" placeholder="开户银行，请与《银行开户许可证》上保持一致"></el-input>
            </el-form-item>
            <el-form-item label="开户名" prop="accountName">
              <el-input v-model="qualityForm.accountName" placeholder="开户名，请与《银行开户许可证》上保持一致"></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="bankAccount">
              <el-input v-model="qualityForm.bankAccount" placeholder="开户账号，请与《银行开户许可证》上保持一致"></el-input>
            </el-form-item>
            <el-form-item label="上传证件照">
              <upload-image title="营业执照" tid="img1" @getImg="getImg" :errorProp="errorText[0]"></upload-image>
              <upload-image title="税务登记证" tid="img2" @getImg="getImg" :errorProp="errorText[1]"></upload-image>
              <upload-image title="纳税人资格证" tid="img3" @getImg="getImg" :errorProp="errorText[2]">
                <el-tooltip class="item" effect="dark" placement="left" slot="tip">
                  <div slot="content">没有一般纳税人证书，您可以提供以下任意证件：<br>
                    1.盖有“增值税一般纳税人”章的税务登记证副本；<br>
                    2.一般纳税人年检通知书；<br>
                    3.增值税一般纳税人申请人定表；<br>
                    4.国家税务局增值税一般纳税人资格认定批复件；<br>
                    5.国税局颁发的相关的一般纳税人税务事项通知书。<br>
                  </div>
                  <i class="iconfont f-size-l7 align-middle el-tooltip"></i>
                </el-tooltip> 
              </upload-image>
              <upload-image title="银行开户许可证" tid="img4" @getImg="getImg" :errorProp="errorText[3]"></upload-image>
              <p class="color-666 f-size-l9"><span>格式要求：</span>支持.jpg/.jpeg/.png格式图片，每张图片大小不超过5M</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="qualitySubmit('qualityForm')">确认提交</el-button>
              <!-- <el-button>取消</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>  
    <el-dialog title="选择消费项目" size="large" :visible.sync="dialog1">
      <el-alert
      title="单次开票金额须大于200元；为了避免浪费，请您选择多次充值统一开票；"
      type="info"
      :closable="false"
      show-icon>
     </el-alert>
      <el-table class="margin-top20" @selection-change="handleSelectionChange" border :data="consumeTable">
        <el-table-column type="selection" min-width="55"></el-table-column>
        <el-table-column property="date" label="交易时间" min-width="80"></el-table-column>
        <el-table-column property="project" label="项目" min-width="80"></el-table-column>
        <el-table-column property="amount" label="金额" min-width="80"></el-table-column>
        <el-table-column property="memo" label="备注" min-width="80"></el-table-column>
      </el-table>
      <div class="invoice__choose-order--bottom">
        已选择 <span>{{consumeLength}}</span> 条项目， 金额 <span>{{applyForm.consumeAmount}}</span> 元
      </div>
      <div slot="footer" class="footer1">
        <el-button @click="dialog1 = false">取 消</el-button><el-button type="primary" @click="consumeSubmit">确 认</el-button>
        <div class="margin-top20">*订单开票后，您将不能申请该笔订单的退款 </div>
      </div>
    </el-dialog>
    <el-dialog title="新增地址" size="small" :visible.sync="dialog2" @close="cancelDialog2">
      <el-form ref="addressForm" class="address-form-dialog" label-position="left" :model="addressForm" label-width="100px">
        <el-form-item label="收货人" prop="receiver"  :rules="[{ required: true, message: '请输入收货人姓名'}]">
          <el-input v-model="addressForm.receiver" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :rules="[{ required: true, message: '请输入正确11位手机号'}]">
          <el-input v-model="addressForm.phone" placeholder="请输入联系手机号"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="district" :rules="[{ required: true, message: '请选择省市信息'}]">
          <div class="pal-city-picker el-select" style="position:relative" @click="showCity">
            <div class="el-input">
              <i :class="['el-input__icon', 'el-icon-caret-top', isReverse ? 'is-reverse' : '']"></i> 
              <input v-model="addressForm.district" autocomplete="off" readonly="readonly" icon="caret-top" type="text" placeholder="请选择省市信息" class="el-input__inner">
            </div>
            <div v-show="showDown" @click.stop="preventClick" class="pal-city-picker el-select-dropdown show_down">
              <div class="picker-tab">
                <ul class="picker-tab__head">
                  <li @click.stop="cityShow = false" :class="cityShow ? '' : 'is-active'">
                    <span class="right">省份</span>
                  </li>
                  <li @click.stop="cityShow = true" :class="cityShow ? 'is-active' : ''">
                    <span class="right">市/区</span>
                  </li>
                </ul> 
                <div class="picker-tab__contents">
                  <div class="picker-tab__content is-active" v-show="!cityShow">
                    <dl v-for="(item, index) in cities" :key="index" >
                      <dt class="f-bold">{{item.spread}}</dt> 
                      <dd>
                        <a v-for="(sheng, index2) in item.sheng" 
                        :key="index2" 
                        :class="keyIndex1 == index && keyIndex2 == index2 ? 'is-selected' : ''" 
                        @click.stop="chooseSheng(index, index2, sheng.name)">{{sheng.name}}</a>
                      </dd> 
                      <div class="clearfix"></div>
                    </dl>
                  </div>
                  <div class="picker-tab__content is-active city" v-if="keyIndex2 > -1 && cityShow" v-show="cityShow">
                    <dl>
                      <dd>
                        <a v-for="(cityItem, index3) in cityItem" 
                        :key="index3"
                        :class="keyIndex3 == index3 ? 'is-selected' : ''" 
                        @click.stop="chooseCity(index3, cityItem)">{{cityItem}}</a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" prop="address" :rules="[{ required: true, message: '请输入详细地址'}]">
          <el-input v-model="addressForm.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 100px;">
        <el-checkbox v-model="addressChecked">设为默认收货地址</el-checkbox>
      </div>
      <div slot="footer" class="footer1">
        <el-button @click="cancelDialog2">取 消</el-button><el-button type="primary" @click="addressSubmit('addressForm')">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadImage from '@/components/Upload/uploadImage'
import { cities } from '@/utils/city'
import { getInvoiceList, getInvoiceItemList } from '@/api/home'
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司名称不能为空'))
      } else {
        callback()
      }
    }
    var validateTaxNum = (rule, value, callback) => {
      if (!value) {
        callback(new Error('纳税人识别号不能为空'))
      } else {
        if (value.length !== 15 && value.length !== 18 && value.length !== 20) {
          callback(new Error('请输入合法长度的纳税人识别号!'))
        }
        callback()
      }
    }
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司注册地址不能为空'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司注册电话不能为空'))
      } else {
        callback()
      }
    }
    var validateBank = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司开户银行不能为空'))
      } else {
        callback()
      }
    }
    var validateAccountName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司开户名不能为空'))
      } else {
        callback()
      }
    }
    var validateBankAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('公司开户账号不能为空'))
      } else {
        callback()
      }
    }
    var validateAmount = (rule, value, callback) => {
      if (value * 1 <= 200) {
        callback(new Error('单次开票金额须大于200元；'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'apply',
      radio1: '普通发票（纸质）',
      applyForm: {
        number: '',
        header: '',
        consumeAmount: 0
      },
      recordData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      qualityForm: {
        name: '',
        taxNum: '',
        registAddress: '',
        registPhone: '',
        bank: '',
        accountName: '',
        bankAccount: ''
      },
      applyRules: {
        consumeAmount: [{ validator: validateAmount, trigger: 'blur' }]
      },
      qualityRules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        taxNum: [{ validator: validateTaxNum, trigger: 'blur' }],
        registAddress: [{ validator: validateAddress, trigger: 'blur' }],
        registPhone: [{ validator: validatePhone, trigger: 'blur' }],
        bank: [{ validator: validateBank, trigger: 'blur' }],
        accountName: [{ validator: validateAccountName, trigger: 'blur' }],
        bankAccount: [{ validator: validateBankAccount, trigger: 'blur' }]
      },
      dialog1: false,
      dialog2: false,
      consumeTable: [{ date: '2018-05-20', project: 'a', amount: 200, memo: '' }, { date: '2018-05-20', project: 'b', amount: 20, memo: '' }],
      consumeLength: 0,
      addressForm: {
        receiver: '',
        phone: '',
        district: '',
        address: ''
      },
      addressChecked: false,
      showError: false,
      hasCompanyInfo: false,
      image: [{ tid: 'img1', result: '', title: '营业执照' }, { tid: 'img2', result: '', title: '税务登记证' }, { tid: 'img3', result: '', title: '纳税人资格证' }, { tid: 'img4', result: '', title: '银行开户许可证' }],
      errorText: ['', '', '', ''],
      isReverse: false,
      showDown: false,
      cities: [],
      keyIndex1: -1,
      keyIndex2: -1,
      keyIndex3: -1,
      cityShow: false,
      cityItem: [],
      sheng: ''
    }
  },
  components: {
    UploadImage
  },
  created() {
    this.cities = cities
  },
  methods: {
    chooseAmount() {
      this.dialog1 = true
      getInvoiceItemList().then(res => {
        console.log(res.data.data)
      })
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    handleClick(tab, event) {
      this.resetForm('applyForm')
      this.resetForm('applyForm2')
      this.resetForm('qualityForm')
      if (tab.index === '1') {
        getInvoiceList({ pageNo: this.currentPage }).then(res => {
          console.log(res.data.data.list)
        })
      }
    },
    consumeSubmit() {
      this.dialog1 = false
      if (this.applyForm.consumeAmount <= 0) {
        this.showError = true
      } else {
        this.showError = false
      }
    },
    addressSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          return false
        }
      })
    },
    handleSelectionChange(val) {
      let amount = 0
      const len = val.length
      val.forEach(i => {
        amount += i.amount
      })
      this.consumeLength = len
      this.applyForm.consumeAmount = amount
    },
    apply(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          return false
        }
      })
    },
    qualitySubmit(formName) {
      this.image.forEach((i, index) => {
        if (i.result === '') {
          this.errorText[index] = '请上传' + i.title
        //   console.log(this.errorText[index])
        } else {
          this.errorText[index] = ''
        }
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          return false
        }
      })
    },
    getImg(val) {
      const i = val.tid.substring(3)
      this.image[i - 1].result = val.result
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    showCity() {
      this.isReverse = !this.isReverse
      this.showDown = !this.showDown
    },
    cancelDialog2() {
      this.dialog2 = false
      this.resetForm('addressForm')
    },
    chooseSheng(index1, index2, name) {
      this.keyIndex1 = index1
      this.keyIndex2 = index2
      this.cityItem = cities[this.keyIndex1].sheng[this.keyIndex2].city
      this.cityShow = true
      this.sheng=name
    },
    preventClick() {
      console.log('just prevent')
    },
    chooseCity(index3, name) {
      this.keyIndex3 = index3
      this.showDown = false
      this.cityShow = false
      this.addressForm.district = this.sheng + '/' + name
    }
  }
}
</script>

<style lang="scss">
@import url('./finance.scss');
</style>