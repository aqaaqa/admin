import request from '@/utils/request'

//学校管理
/*
 * 学校管理查询接口
 * @param {*} data 
 */
export function tantList(data) {
  return request({
    url: '/back/tant/list',
    method: 'post',
    data
  })
}

/*
 * 新增学校、编辑学校
 * @param {*} data 
 */
export function tantAdd(data) {
  return request({
    url: '/back/tant/add',
    method: 'post',
    data
  })
}


/*
 * 删除学校
 * @param {*} data 
 */
export function tantDel(data) {
  return request({
    url: '/back/tant/delete',
    method: 'post',
    data
  })
}

//用户管理

/*
 * 查询全部
 * @param {*} data 
 */
export function userList(data) {
  return request({
    url: '/back/user/users',
    method: 'post',
    data
  })
}

/*
 * 删除用户
 * @param {*} data 
 */
export function userDel(data) {
  return request({
    url: '/back/user/delete',
    method: 'post',
    data
  })
}

/*
 * 添加用户
 * @param {*} data 
 */
export function userAdd(data) {
  return request({
    url: '/back/user/add',
    method: 'post',
    data
  })
}

/*
 * 修改用户信息
 * @param {*} data 
 */
export function userEdit(data) {
  return request({
    url: '/back/user/edit',
    method: 'post',
    data
  })
}

/*
 * 学校列表
 * @param {*} data 
 */
export function userSchool(data) {
  return request({
    url: '/back/user/school',
    method: 'post',
    data
  })
}