<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- <transition-group name="breadcrumb"> -->
      <!-- <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadc"rumb-item> -->
      <!-- <span v-if="name == '我的试卷'">{{name}}</span> -->
    <!-- </transition-group> -->
    <span v-if="name == 'paper'" class="fontSize">/ 我的试卷</span>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null,
      name: ''
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
      this.name = this.$route.name
    }
  },
  created() {
    this.getBreadcrumb()
    this.name = this.$route.name
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return true
      }

      return name.trim().toLocaleLowerCase() === 'dashboard'
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.fontSize {
  font-size:14px;
  font-weight:500;
  color:rgba(0,0,0,0.85);
}
</style>
