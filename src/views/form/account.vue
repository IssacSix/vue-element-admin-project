<template>
  <div class="app__content--wrapper">
    <div class="setting app__content--inner">
      <div class="account-setting">
        <div class="page__header">
          <div class="page__header--title">账户设置</div>

          <div class="page__header--content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="user"></el-tab-pane>
              <el-tab-pane label="密码修改" name="pwd"></el-tab-pane>
              <el-tab-pane label="企业资质" name="company"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="page__content">
            <div class="page__content--box">

              <div class="setting-box" v-show="activeName === 'user'">
                <el-form :model="baseForm" :rules="baseRules" ref="baseForm" label-width="100px" class="pal-form-detail el-form--label-left">
                  <el-form-item label="账号">
                    {{ baseForm.userAccount }}
                  </el-form-item>
                  <el-form-item label="公司名称">
                    {{ baseForm.orgName }}
                  </el-form-item>
                  <el-form-item label="联系电话" prop="phone">
                    <div v-if="baseSaveFlag">{{ baseForm.phone }}</div>
                    <el-input v-else type="tel" v-model="baseForm.phone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系邮箱" prop="email">
                    <div v-if="baseSaveFlag">{{ baseForm.email }}</div>
                    <el-input v-else type="email" v-model="baseForm.email" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="地址" prop="address">
                    <div v-if="baseSaveFlag">{{ baseForm.address }}</div>
                    <el-input v-else v-model="baseForm.address" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="baseSave('baseForm')">{{ baseSaveFlag ? '修改' : '保存' }}</el-button>
                  </el-form-item>
                </el-form>
              </div>

              <div class="setting-box" v-show="activeName === 'pwd'">
                <el-form :model="pwdForm" :rules="pwdRule" ref="pwdForm" label-width="100px" class="el-form--label-left">
                  <el-form-item label="原密码" prop="oldPass">
                    <el-input v-model.number="pwdForm.oldPass"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="pwdForm.pass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="pwdForm.checkPass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="changePwd('pwdForm')">确认修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
              
              <div class="setting-quality" v-show="activeName === 'company'">
                <el-alert :title="quality.alert.text" :type="quality.alert.type" :closable="false" show-icon></el-alert>
                <div class="quality__ic">
                  <div class="quality__ic--tips">
                    <div>
                      <span>工商信息</span>
                      <span class="badge margin-left10 unverified">未认证</span>
                    </div>
                    <div>提交后可免费申请测试卡</div>
                  </div>
                  <el-form :model="quality.icForm" ref="pwdForm" label-width="160px" class="quality__ic--form el-form--label-left">
                    <el-form-item label="企业全称">
                      <el-input v-model.trim="quality.icForm.companyName" placeholder="企业全称"></el-input>
                    </el-form-item>
                    <el-form-item label="工商营业执照注册号">
                      <el-input v-model.trim="quality.icForm.companyNumber" placeholder="工商营业执照注册号"></el-input>
                      <p class="quality__des">请输入15位工商营业执照注册号，或三证合一后18位的统一社会信用代码</p>
                    </el-form-item>
                    <el-form-item label="企业工商营业执照">
                      <div class="img-inputer img-inputer--light img-inputer--full">
                        <i class="iconfont img-inputer__icon"></i> 
                        <p class="img-inputer__placeholder">上传企业工商营业执照</p>
                        <label for="qq18m" title="" class="img-inputer__label"></label>
                        <input type="file" id="qq18m" accept="image/jpg,image/gif,image/png,image/jpeg,image/bmp;" capture="video" class="img-inputer__inputer">
                      </div>
                      <p class="quality__des">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png等格式照片，大小不超过2M</p>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary">确认提交</el-button>
                      <el-button type="default">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
           
                <div class="quality__lp">
                  <div class="quality__ic--tips">
                    <div>
                      <span>法人信息</span>
                      <span class="badge margin-left10 unverified">未认证</span>
                    </div>
                    <div>提交后可购买正式卡</div>
                  </div>
                  <el-form :model="quality.ipForm" ref="pwdForm" :rules="quality.ipRule" label-width="160px" class="quality__ic--form el-form--label-left">
                    <el-form-item label="法人身份证号码">
                      <el-input v-model.trim="quality.ipForm.id" placeholder="法人身份证号码"></el-input>
                    </el-form-item>
                    <el-form-item label="企业工商营业执照">
                      <div class="img-inputer img-inputer--light img-inputer--full"><i class="iconfont img-inputer__icon"></i> <p class="img-inputer__placeholder">点击上传法人身份证照片(正面)</p><label for="qq18m" title="" class="img-inputer__label"></label><input type="file" id="qq18m" accept="image/jpg,image/gif,image/png,image/jpeg,image/bmp;" capture="video" class="img-inputer__inputer"></div>
                      <p class="quality__des">请提交中华人民共和国居民身份证；格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</p>
                    </el-form-item>
                    <el-form-item label="企业工商营业执照">
                      <div class="img-inputer img-inputer--light img-inputer--full"><i class="iconfont img-inputer__icon"></i> <p class="img-inputer__placeholder">点击上传法人身份证照片(反面)</p><label for="qq18m" title="" class="img-inputer__label"></label><input type="file" id="qq18m" accept="image/jpg,image/gif,image/png,image/jpeg,image/bmp;" capture="video" class="img-inputer__inputer"></div>
                      <p class="quality__des">请提交中华人民共和国居民身份证；格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</p>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary">确认提交</el-button>
                      <el-button type="default">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { queryAccountInfo, modifyAccountInfo } from '@/api/home'
  export default {
    data() {
      var validateOldPass = (rule, value, callback) => {
        value ? callback() : callback(new Error('请输入密码'))
      }
      var validateId = (rule, value, callback) => {
        value ? callback() : callback(new Error('请输入法人身份证号码'))
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.pwdForm.checkPass !== '') {
            this.$refs.pwdForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.pwdForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'pwd',
        pwdForm: {
          oldPass: '',
          pass: '',
          checkPass: ''
        },
        baseSaveFlag: true,
        baseForm: {
          userAccount: '',
          orgName: '',
          phone: '',
          email: '',
          address: ''
        },
        baseRules: {
          phone: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ]
        },
        pwdRule: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ]
        },
        quality: {
          alert: {
            type: 'info',
            text: '根据工信部实名制规定，为了保障您的物联网卡使用权益，您需要完成企业认证'
          },
          icForm: {
            companyName: '',
            companyNumber: ''
          },
          ipForm: {
            id: '',
            imageUrl: ''
          },
          ipRule: {
            id: [
              { validator: validateId, trigger: 'blur' }
            ]
          }
        }
      }
    },
    mounted() {
      this.getAccountInfo()
    },
    methods: {
      baseSave(formName) {
        const _this = this
        if (!this.baseSaveFlag) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              modifyAccountInfo(_this.baseForm).then(res => {
                _this.$message({
                  message: '恭喜你，这是一条成功消息',
                  type: 'success'
                })
                this.baseSaveFlag = true
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          this.baseSaveFlag = false
        }
      },
      handleClick(tab, event) {
        console.log(this.activeName)
      },
      getAccountInfo() {
        const _this = this
        queryAccountInfo().then(res => {
          console.log(res.data.data)
          _this.baseForm = res.data.data
        })
      },
      changePwd(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import 'setaccount.scss';
</style>
