<template>
  <div class="menu-wrapper">
    <el-menu-item style="text-align:center" class="submenu-title-noDropdown">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    </el-menu-item>
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <i v-if="item.children[0].meta&&item.children[0].meta.icon" class="iconfont nav-icon" v-html="item.children[0].meta.icon"></i>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon" class="iconfont nav-icon" v-html="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span class="menu-title" v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  components: {
    Hamburger
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 654991 */
    src: url('//at.alicdn.com/t/font_654991_fxzoaoxyoktvs4i.eot');
    src: url('//at.alicdn.com/t/font_654991_fxzoaoxyoktvs4i.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_654991_fxzoaoxyoktvs4i.woff') format('woff'),
    url('//at.alicdn.com/t/font_654991_fxzoaoxyoktvs4i.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_654991_fxzoaoxyoktvs4i.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .nav-icon {
    margin-right: 20px;
  }
</style>


