<template>
  <div class="login-container">

    <div class="s-nav">
      <div class="l-row">
        <div class="logo">
          <a href="http://simboss.com" class="logo__img">SIMBOSS</a>
        </div>
      </div>
    </div>

    <div class="l-row"><h1 class="title title--user title--high">欢迎登录</h1></div>

    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入手机号码 / 账户名" />
      </el-form-item>
      
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      
      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">立即登录</el-button>
   
      <p class="sign__tip">
        <span>没有账号?</span>
        <a href="" class="sign__link sign__link--attention">立即注册 </a> 
        <a href="" class="sign__link"> 忘记密码?</a>
      </p>
      <p class="sign__tip sign__tip--err" v-show="passVal">帐号不存在</p>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  components: { LangSelect, SocialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      passVal: false,
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.passVal = true
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#1f2d3d;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: none;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #bfcbd9;
    background: none;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .s-nav {
    width: 100%;
    box-shadow: 0 2px 0 #eee;
    padding-left: 50px;
    overflow: hidden;
    .l-row {
      max-width: 1200px;
      min-width: 1140px;
      margin: 0 auto;
      position: relative;
    }
    .logo {
      height: 70px;
      display: inline-block;
    }
    .logo__img {
      display: block;
      font-size: 30px;
      color: transparent;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      line-height: 70px;
      background: url('https://www.simboss.com/images/logo.png') no-repeat left 45%;
      background-size: 100% auto;
    }
  }
  .l-row {
    max-width: 1200px;
    min-width: 1140px;
    margin: 0 auto;
    position: relative;
    .title--high {
      margin-bottom: 100px;
    }
    .title--user {
      border-bottom: 3px solid #0095e2;
      margin-bottom: 50px;
    }
    .title {
      font-size: 27px;
      color: #555;
      padding: 25px 0 15px;
      padding-left: 20px;
    }
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .sign__tip {
    padding-top: 15px;
    font-size: 13px;
    color: #555;
    a:hover {
      text-decoration: underline;
    }
  }
  .sign__link {
    padding-top: 15px;
    display: inline-block;
    font-size: 13px;
    color: #555;
    margin-right: 16px;
  }
  .sign__link--attention {
    color: #20a0ff;
  }
  .sign__tip--err {
    color: #f06161;
    font-size: 14px;
  }
}
</style>
