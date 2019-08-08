<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <router-link to="/">
      <transition name="sidebarLogoFade">
        <!-- <div key="collapse" class="sidebar-logo-link">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <h1 v-else class="sidebar-title">{{ title }} </h1>
        </div> -->
        <div key="expand" class="sidebar-logo-link">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <h1 class="sidebar-title">{{ title }} </h1>
        </div>
      </transition>
    </router-link>
  </div>
</template>

<script>
import logo1 from '@/assets/logo/logo.png'
export default {
  name: 'SidebarLogo',
  props: {
    // collapse: {
    //   type: Boolean,
    //   required: true
    // }
  },
  data() {
    return {
      collapse: true,
      title: '外研社新标准英语同步测试系统',
      logo: logo1
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 200;
      line-height: 50px;
      font-size: 12px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      margin-left: 20px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
