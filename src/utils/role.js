import layout from '@/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)


// export function routerGo(role, to, next) {
//   let getRole = filterAsyncRouter(role) //过滤路由
//   // console.log(getRouter)
//   router.addRoutes(getRole) //动态添加路由
//   global.antRouter = getRole //将路由数据传递给全局变量，做侧边栏菜单渲染工作
//   next({ ...to, replace: true })
// }

export function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

export function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(localStorage.getItem(name));

}

export function removeObjArr(name) { //localStorage 获取数组对象的方法
  localStorage.removeItem(name)
}

//session
export function saveSession(name, data) { //localStorage 存储数组对象的方法
  sessionStorage.setItem(name, JSON.stringify(data))
}

export function getSession(name) { //localStorage 获取数组对象的方法
  return JSON.parse(sessionStorage.getItem(name));
}

export function removeSession(name) { //localStorage 获取数组对象的方法
  sessionStorage.removeItem(name)
}


export function getState(data) {
  // console.log(data)
  let child = []
  const roleList = data.map(e=> {
    if(e.children) {
      child = e.children.map(k=> {
        return k.meta.state = e.state
      })
    }
    return e
  })
  return roleList
}

export function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {//Layout组件特殊处理
        route.component = layout
        if(route.children && route.children.length) {
          route.redirect = route.children[0].path
        }
      } else {
        // console.log(route.component)
        route.component = _import('table/index')
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}