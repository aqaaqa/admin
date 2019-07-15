<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo"  />
    <!-- :collapse="isCollapse" -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :router = false
        mode="vertical"
        @open="handleOpen" 
        @close="handleClose"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { roleList } from '@/api/user'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      openMenu: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'role'
    ]),
    routes() {
      return this.role
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if(meta.id) {
        this.$store.dispatch('page/setId',meta.id)
      }
      return path
      // return '/example/table'
    },
    showLogo() {
      return true
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.openMenu.push(key)
      this.$store.dispatch('page/changeMenu',this.openMenu)
    },
    handleClose(key, keyPath) {
      this.openMenu = this.openMenu.filter(e => e != key)
      this.$store.dispatch('page/changeMenu',this.openMenu)
    }
  },
  mounted() {
    let arr=this.activeMenu.trim().split('/');
    this.openMenu.push('/'+arr[1])
    this.$store.dispatch('page/changeMenu',this.openMenu)
  }
}
</script>
