<template>
  <div class="setting app__content--inner">
    <div class="system-setting">
      <div class="page__header">
        <div class="page__header--title">系统设置</div>
        <div class="page__header--content">
          <div class="el-tabs">

            <div class="el-tabs__header">
              <div class="el-tabs__nav-wrap">
                <div class="el-tabs__nav-scroll">
                  <div class="el-tabs__nav">
                    <div class="el-tabs__active-bar" style="width: 150px; transform: translateX(0px);">
                    </div>
                    <div class="el-tabs__item is-active">自动续费</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="el-tabs__content">
              <div class="el-tab-pane"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="page__content">
        <div class="page__content--box">
          <div class="setting-box automatic-renewal width-100">
            <div class="automatic-renewal__rules">
              <p class="margin-bottom20">自动续费规则</p>
              <div class="rules__details">
                <p>1、平台将在<span class="f-bold f-size-l6">每月15-22日</span>（下午15点）执行自动续费操作；</p>
                <p>2、自动续费卡范围<span class="block margin-left20">1）开启自动续费的按月套餐的物联网卡；</span><span
                  class="block margin-left20">2）物联网卡的对应过期时间：<span class="f-bold f-size-l6">本月15日 - 本月末</span>；</span>
                </p>
                <p>3、执行自动续费操作默认续当前套餐档位，套餐周期增加一个月；</p>
                <p>4、开启自动续费功能后，请保持账户余额充足；</p>
                <p>5、余额不足时不执行自动续费；平台会进行短信通知，请在收到短信后及时充值</p>
                <p>6、如因账户余额不足未执行自动续费，用户可在<span class="f-bold f-size-l6">每月23日零点前</span>前进行账户余额充值；（操作步骤：卡片列表导出自动续费卡清单、手动续费）
                </p></div>
            </div>
            <div class="automatic-renewal__operation">
              <div class="operation__export">您有9张物联网卡已经开启自动续费！</div>
              <div class="operation__tips">本月将自动续费0张卡，预计扣除0元</div>
            </div>
            <div class="operation__btn">
              <el-button type="primary" @click="openPay.visible = true">开启自动续费</el-button>
              <el-button type="default" @click="openPay.visible = true">关闭自动续费</el-button>
            </div>
            <el-dialog
              title="批量开启自动续费"
              :visible.sync="openPay.visible"
              size="small">
              <el-input type="textarea" v-model="openPay.ICCID" placeholder="可以直接复制excel中整列ICCID；手动输入多个ICCID，一行一个；"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="openPay.visible = false">取 消</el-button>
                <el-button type="primary" @click="openAutoPay()">下一步</el-button>
              </span>
            </el-dialog>
            
            <el-dialog title="开启自动续费" :visible.sync="openPayNext.visible" size="small">
              <el-form class="dialog-form" :model="openPayNext.form" :rules="openPayNextRule">
                <el-form-item label="ICCID" label-width="120px" prop="agree">
                  <div class="iccid__box">
                    <span class="recharge__invalid" v-if="openPayNext.aviliabelCard.length <= 0">无卡片</span>
                    <span class="" v-else v-for="item in openPayNext.aviliabelCard">{{ item }}</span>
                  </div>
                  <p class="el-form-item__content--hint">
                    <span>当前有效ICCID共{{ openPayNext.aviliabelCard.length }}个</span>
                      <el-tooltip v-if="openPayNext.unAviliabelCard.length > 0" class="item" effect="dark" :content="`${openPayNext.unAviliabelCard.length}张非法ICCID`" placement="right">
                        <i class="iconfont"></i>
                      </el-tooltip>
                    </span>
                  </p>
                  <div class="el-form-item__error" v-show="openPayNext.form.idFlag">请至少选择一个可用的ICCID</div>
                </el-form-item>
                <el-form-item label-width="120px">
                  <el-checkbox-group v-model="openPayNext.form.agree">
                    <el-checkbox label="我已确认物联网卡自动续费规则" name="agree"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="openPayNext.visible = false">取 消</el-button>
                <el-button type="primary" @click="openPayNextBtn()">确认</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { validateAutoRechargeDevice, validateAutoRechargeSubmit } from '@/api/home'
  export default {
    name: 'system-setting',
    components: {},
    data() {
      var validateAgree = (rule, value, callback) => {
        this.openPayNext.aviliabelCard.length > 0 ? callback() : callback(new Error('请至少选择一个可用的ICCID'))
      }
      return {
        openPay: {
          visible: false,
          ICCID: ''
        },
        openPayNext: {
          visible: false,
          tip: '',
          unAviliabelCard: [],
          aviliabelCard: [],
          form: {
            agree: '',
            idFlag: false
          }
        },
        openPayNextRule: {
          agree: [
            { validator: validateAgree }
          ]
        }
      }
    },
    mounted() {
      this.getIccidCard()
    },
    methods: {
      openAutoPay() {
        if (this.openPay.ICCID) {
          this.openPay.visible = false
          this.openPayNext.visible = true
          this.getIccidCard()
        } else {
          this.$message({
            message: '您没有输入任何信息',
            type: 'warning'
          })
        }
      },
      openPayNextBtn() {
        if (!this.openPayNext.form.agree) {
          this.$message({
            message: '请先勾选物联网卡自动续费规则',
            type: 'warning'
          })
        } else {
          if (this.openPayNext.aviliabelCard <= 0) {
            this.openPayNext.form.idFlag = true
          } else {
            validateAutoRechargeSubmit().then(res => {
              this.openPayNext.visible = false
            })
          }
        }
      },
      getIccidCard() {
        const _this = this
        validateAutoRechargeDevice().then(res => {
          console.log(res.data.data)
          _this.openPayNext.unAviliabelCard = res.data.data.failed
          _this.openPayNext.aviliabelCard = res.data.data.success
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import 'setsystem.scss';
  .system-setting {
    background-color: #f4f4f4;
  }
  .app-main {
    background: none;
  }
  .el-form-item__label {
    font-weight: normal !important;
  }
</style>


