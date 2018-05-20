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
                <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model.number="pwdForm.oldPass"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="pwdForm.pass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="pwdForm.checkPass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="changePwd('pwdForm')">提交</el-button>
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

                  <!-- 可修改的ic表单 -->
                  <el-form v-if="icSaveFlag" :model="icForm" :rules="icRule" ref="icForm" label-width="160px" class="quality__ic--form el-form--label-left">
                    <el-form-item label="企业全称" prop="name">
                      <el-input v-model.trim="icForm.name" placeholder="企业全称"></el-input>
                    </el-form-item>
                    <el-form-item label="工商营业执照注册号" prop="licence">
                      <el-input v-model.trim="icForm.licence" placeholder="工商营业执照注册号"></el-input>
                      <p class="certification__tooltip">
                        <el-tooltip class="certification__tooltip-content" effect="light" :content="'111'" placement="right">
                          <span class="certification__tooltip-content el-tooltip">查看示例</span>
                        </el-tooltip>
                      </p>
                      <p class="quality__des">请输入15位工商营业执照注册号，或三证合一后18位的统一社会信用代码</p>
                    </el-form-item>
                    <el-form-item label="企业工商营业执照" prop="licencePic">
                      <el-upload
                        class="img-inputer img-inputer--light img-inputer--full"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <i class="iconfont img-inputer__icon"></i> 
                        <p class="img-inputer__placeholder">上传企业工商营业执照</p>
                        <div class="img-inputer__preview-box" v-if="icForm.licencePic">
                          <img :src="icForm.licencePic" class="img-inputer__preview-img">
                        </div>
                      </el-upload>
                      <p class="quality__des">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png等格式照片，大小不超过2M</p>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="updateEq('icForm')">确认提交</el-button>
                      <el-button type="default">取消</el-button>
                    </el-form-item>
                  </el-form>

                  <!-- 不可修改的ic表单 -->
                  <el-form v-else label-width="160px" class="quality__ic--form el-form--label-left">
                    <el-form-item label="企业全称" prop="name">
                      {{ icForm.name }}
                    </el-form-item>
                    <el-form-item label="工商营业执照注册号" prop="licence">
                      {{ icForm.licence }}
                    </el-form-item>
                    <el-form-item label="企业工商营业执照" prop="licencePic">
                      <div class="img-inputer img-inputer--light img-inputer--ful">
                        <div class="img-inputer__preview-box" v-if="icForm.licencePic">
                          <img :src="icForm.licencePic" class="img-inputer__preview-img">
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" disabled="">请联系客服修改</el-button>
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
                  
                  <!-- 可修改的ip表单 -->
                  <el-form v-if="ipSaveFlag" :model="ipForm" :rules="ipRule" ref="ipForm" label-width="160px" class="quality__ic--form el-form--label-left">
                    <el-form-item label="法人身份证号码" prop="id">
                      <el-input v-model.trim="ipForm.idCardNum" placeholder="法人身份证号码"></el-input>
                    </el-form-item>
                    <el-form-item label="法人身份证照片（正面）" prop="idCardPicFont">
                      <el-upload
                        class="img-inputer img-inputer--light img-inputer--full"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <i class="iconfont img-inputer__icon"></i> 
                        <p class="img-inputer__placeholder">点击上传法人身份证照片（正面）</p>
                        <div class="img-inputer__preview-box" v-if="ipForm.idCardPicFont">
                          <img :src="ipForm.idCardPicFont" class="img-inputer__preview-img">
                        </div>
                      </el-upload>
                      <p class="quality__des">请提交中华人民共和国居民身份证；格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</p>
                    </el-form-item>
                    <el-form-item label="法人身份证照片（反面）" prop="idCardPicBack">
                      <el-upload
                        class="img-inputer img-inputer--light img-inputer--full"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <i class="iconfont img-inputer__icon"></i> 
                        <p class="img-inputer__placeholder">点击上传法人身份证照片（反面）</p>
                        <div class="img-inputer__preview-box" v-if="ipForm.idCardPicBack">
                          <img :src="ipForm.idCardPicBack" class="img-inputer__preview-img">
                        </div>
                      </el-upload>
                      <p class="quality__des">请提交中华人民共和国居民身份证；格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M</p>
                    </el-form-item>
                    <el-form-item v-if="ipSaveFlag">
                      <el-button type="primary" @click="updateEq('ipForm')">确认提交</el-button>
                      <el-button type="default">取消</el-button>
                    </el-form-item>
                    <el-form-item v-else>
                      <el-button type="primary" disabled="">请联系客服修改</el-button>
                    </el-form-item>
                  </el-form>

                  <!-- 不可修改的ip表单 -->
                  <el-form v-else label-width="160px" class="quality__ic--form el-form--label-left">
                    <el-form-item label="法人身份证号码" prop="id">
                      {{ ipForm.idCardNum }}
                    </el-form-item>
                    <el-form-item label="法人身份证照片（正面）" prop="idCardPicFont">
                      <div class="img-inputer img-inputer--light img-inputer--full">
                        <div class="img-inputer__preview-box" v-if="ipForm.idCardPicFont">
                          <img :src="ipForm.idCardPicFont" class="img-inputer__preview-img">
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="法人身份证照片（反面）" prop="idCardPicBack">
                      <div class="img-inputer img-inputer--light img-inputer--full">
                        <div class="img-inputer__preview-box" v-if="ipForm.idCardPicBack">
                          <img :src="ipForm.idCardPicBack" class="img-inputer__preview-img">
                        </div>
                      </div>
                    </el-form-item>
                     <el-form-item>
                      <el-button type="primary" disabled="">请联系客服修改</el-button>
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
  import { queryAccountInfo, modifyAccountInfo, modifyPassword, getEq, updateEq } from '@/api/home'
  export default {
    data() {
      var validateOldPass = (rule, value, callback) => {
        value ? callback() : callback(new Error('请输入密码'))
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
        activeName: 'user',
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
        pwdForm: {
          pass: '',
          checkPass: '',
          oldPass: ''
        },
        pwdRules: {
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        icSaveFlag: true,
        icForm: {
          licencePic: '',
          status: '',
          orgName: '',
          licence: ''
        },
        icRule: {
          name: [
            { required: true, message: '请填写企业名称', trigger: 'blur' }
          ],
          licence: [
            { required: true, message: '请填写工商营业执照注册号', trigger: 'blur' }
          ],
          licencePic: [
            { required: true, message: '请选择企业工商营业执照', trigger: 'blur' }
          ]
        },
        ipSaveFlag: true,
        ipForm: {
          idCardNum: '',
          idCardPicFont: '',
          idCardPicBack: ''
        },
        ipRule: {
          id: [
            { required: true, message: '请输入法人身份证号码', trigger: 'blur' }
          ],
          idCardPicFont: [
            { required: true, message: '请选择法人身份证照片(正面)', trigger: 'blur' }
          ],
          idCardPicBack: [
            { required: true, message: '请选择法人身份证照片(反面)', trigger: 'blur' }
          ]
        },
        quality: {
          alert: {
            type: 'info',
            text: '根据工信部实名制规定，为了保障您的物联网卡使用权益，您需要完成企业认证'
          }
        }
      }
    },
    created() {
      this.getAccountInfo()
      this.getEq()
    },
    mounted() {
    },
    methods: {
      baseSave(formName) {
        const _this = this
        if (!this.baseSaveFlag) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              modifyAccountInfo(_this.baseForm).then(res => {
                _this.$message({
                  message: '修改成功',
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
          // console.log(res.data.data)
          _this.baseForm = res.data.data
        })
      },
      changePwd(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyPassword(_this.pwdForm).then(res => {
              _this.pwdForm.pass = ''
              _this.pwdForm.checkPass = ''
              _this.pwdForm.oldPass = ''
              _this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.icForm.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isImage = file.type.indexOf('image') > -1
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isImage) {
          this.$message.error('支持.jpg .jpeg .bmp .gif .png等格式照片')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isImage && isLt2M
      },
      getEq() {
        const _this = this
        getEq().then(res => {
          const _data = res.data.data
          if (_data) {
            // 企业信息form
            _this.icForm.licencePic = _data.licencePic
            _this.icForm.status = _data.status
            _this.icForm.name = _data.name
            _this.icForm.licence = _data.licence
            // 法人信息form
            _this.ipForm.idCardNum = _data.idCardNum
            _this.ipForm.idCardPicFont = _data.idCardPicFont
            _this.ipForm.idCardPicBack = _data.idCardPicBack
          }
          // 默认理解 status 不为空即为认证过，则只能通过客服进行修改
          if (res.data.data && res.data.data.status !== '') _this.icSaveFlag = false
          else _this.icSaveFlag = true
          if (res.data.data && res.data.data.legalEntityStatus !== '') _this.ipSaveFlag = false
          else _this.ipSaveFlag = true
        })
      },
      updateEq(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateEq(Object.assign(_this.icForm, _this.icForm)).then(res => {
              _this.getEq()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import 'setaccount.scss';
</style>
