import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  
  {
    path: 'table',
    component: Layout,
    redirect: '/table',
    children: [
      {
        path: '/table',
        meta: { title: '学校管理', icon: 'dashboard' },
        component: () => import('@/views/table/index'),
      }
    ]
  },

  {
    path: 'user',
    component: Layout,
    redirect: '/user',
    meta: { title: '用户管理', icon: 'dashboard' },
    children: [
      {
        path: '/user',
        meta: { title: '用户信息管理' },
        component: () => import('@/views/user/index'),
      },
      {
        path: '/user/role',
        meta: { title: '用户角色管理'},
        component: () => import('@/views/user/role'),
      }
    ]
  },

  {
    path: 'menu',
    component: Layout,
    redirect: '/menu',
    meta: { title: '题库管理', icon: 'dashboard' },
    children: [
      {
        path: '/menu',
        meta: { title: '题库管理' },
        component: () => import('@/views/menus/index'),
      }
    ]
  },
  {
    path: 'topic',
    component: Layout,
    redirect: '/topic',
    meta: { title: '题目统计', icon: 'dashboard' },
    children: [
      {
        path: '/topic',
        meta: { title: '题目统计' },
        component: () => import('@/views/topic/index'),
      }
    ]
  },
  {
    path: 'quest',
    component: Layout,
    redirect: '/quest',
    meta: { title: '试题录入', icon: 'dashboard' },
    children: [
      {
        path: '/quest',
        meta: { title: '试题录入' },
        component: () => import('@/views/quest/index'),
      }
    ]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
