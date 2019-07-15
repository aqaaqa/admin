import request from '@/utils/request'

/*
 * 登录
 * @param {*} data 
 */
export function login(data) {
  return request({
    url: '/passport/dologin',
    method: 'post',
    data
  })
}

/*
 * 注册
 * @param {*} data 
 */
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

/*
 * 注册
 * @param {*} data 
 */
export function sms(data) {
  return request({
    url: '/user/sms',
    method: 'post',
    data
  })
}

/*
 * 退出
 * @param {*} data 
 */
export function logout() {
  return request({
    url: '/passport/logout',
    method: 'post'
  })
}


/*
 * 菜单栏
 * @param {*} data 
 */
export function roleList() {
    return request({
        url: '/base/menu',
        method: 'post'
    })
}


/*
 * 注册学校
 * @param {*} data 
 */
export function userSchool() {
  return request({
      url: '/user/school',
      method: 'post',
  })
}

/*
 * 激活单元
 * @param {*} data 
 */
export function activateBase(data) {
  return request({
      url: '/quest/active',
      method: 'post',
      data
  })
}
