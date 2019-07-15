<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="item.state == 0">
      <!-- <router-link :to="{ path: '/activate', query:{ redirect: item.path+'/'+item.children[0].path, id:item.children[0].id } }">
        <el-menu-item :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="item.meta" :icon="item.state || item.state == 0 ? openMenu.indexOf(item.path) > -1 ? 'folder-open' :'folder' : ''" :title="item.meta.title" />
          <i v-if="isCollapse" class="locks">
            <svg-icon :icon-class="'block'" />
          </i>
        </el-menu-item>
      </router-link> -->

      <div @click="toRouter('/activate',item.children[0].meta.id,item.children[0].path, item.meta.baseId)">
        <el-menu-item :index="'/activate?base ='+item.meta.baseId" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="item.meta" :icon="item.state || item.state == 0 ? openMenu.indexOf(item.path) > -1 ? 'folder-open' :'folder' : ''" :title="item.meta.title" />
          <i class="locks">
            <svg-icon :icon-class="'block'" />
          </i>
        </el-menu-item>
      </div>
      
    </template>
    <template v-else-if="item.state == 2">
      <router-link :to="{ path: '/paper/index'}">
        <el-menu-item :index="'/paper/index'" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="item.meta" :icon="item.state || item.state == 0 ? openMenu.indexOf(item.path) > -1 ? 'folder-open' :'folder' : ''" :title="item.meta.title" />
        </el-menu-item>
      </router-link>
    </template>
    
    
    <template v-else>
      <template v-if="!item.state && hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
        <!-- <app-link v-if="onlyOneChild.meta" :to="{path: resolvePath(onlyOneChild.path) , query :{id:onlyOneChild.id }}">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <item :icon="item.state ? openMenu.indexOf(item.path) > -1 ? 'folder-open' :'folder' :''" :title="item.meta.title" />
          </el-menu-item>
        </app-link> -->
        <div v-if="onlyOneChild.meta" @click="toRouter(resolvePath(onlyOneChild.path),onlyOneChild.meta.id)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <item :icon="item.state ? openMenu.indexOf(item.path) > -1 ? 'folder-open' :'folder' :''" :title="item.meta.title" />
          </el-menu-item>
        </div>
      </template>

      <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
        <template slot="title">
          <item v-if="item.meta" :icon="item.state ? openMenu.indexOf(item.path) > -1 ? 'folder-open' :'folder' :''" :title="item.meta.title" />
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  computed: {
    ...mapGetters([
      'sidebar',
      'menu'
    ]),
    isCollapse() {
      return this.sidebar.opened
    }
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      newRouter: '',
      openMenu: []
    }
  },
  watch: {
    $route() {
      this.newRouter = this.$route.name
    },

    menu: {
      handler: function(val) {
        this.openMenu = val
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    toRouter(next, id, redirect,base) {
      this.$store.dispatch('page/setId', id).then( res=> {
        if(redirect) {
          this.$router.push(`${next}?redirect=${redirect}&&base=${base}`)
        } else {
          this.$router.push(next)
        }
      })
      
    }
  }
}
</script>

<style lang="css">
  .el-icon-lock:before {
      content: "\e6e5";
  }
  .locks {
    font-size: 14px !important;
    float: right;
    width: 1em !important;
    height: 1em !important;
    position: relative;
    z-index: 10;
    color:rgb(191, 203, 217) !important;
  }
</style>

