<template>
  <el-menu class="navbar" mode="horizontal">
    <div layout="column center-center" class="logo"><img src="https://simboss.com/www/images/logo.svg" class="logo-img"> </div>
    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/set/set-account">
            <el-dropdown-item>
              账户设置
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'

export default {
  components: {
    Hamburger,
    ErrorLog
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  background-color: #20a0ff;
  .logo {
    float: left;
    width: 200px;
    height: 50px;
    text-align: center;
    border-radius: 0 0 0 3px;
  }
  .logo-img {
    width: 120px;
    height: 30px;
  }
}
.el-dropdown-menu__item {
  font-size: 12px;
  text-align: center;
  color: #a2a2a2;
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 50px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          float: left;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name {
          margin: 0 10px 0 20px;
          color: #fff;
          float: left;
          line-height: 40px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
