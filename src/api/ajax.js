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

//菜单管理

/*
 * 册列表
 * @param {*} data 
 */
export function bookList(data) {
  return request({
    url: '/back/base/book',
    method: 'post',
    data
  })
}

/*
 * 添加册
 * @param {*} data 
 */
export function addBook(data) {
  return request({
    url: '/back/base/addBook',
    method: 'post',
    data
  })
}

/*
 * 修改册
 * @param {*} data 
 */
export function editBook(data) {
  return request({
    url: '/back/base/editBook',
    method: 'post',
    data
  })
}

/*
 * 删除册
 * @param {*} data 
 */
// export function editBook(data) {
//   return request({
//     url: 'back/base/editBook',
//     method: 'post',
//     data
//   })
// }


/*
 * 增加单元
 * @param {*} data 
 */
export function addUnit(data) {
  return request({
    url: '/back/base/addUnit',
    method: 'post',
    data
  })
}

/*
 * 修改单元
 * @param {*} data 
 */
export function editUnit(data) {
  return request({
    url: '/back/base/editUnit',
    method: 'post',
    data
  })
}

/*
 * 修改单元
 * @param {*} data 
 */
export function deleteUnit(data) {
  return request({
    url: '/back/base/deleteUnit',
    method: 'post',
    data
  })
}

/*
 * 单元列表
 * @param {*} data 
 */
export function unitList(data) {
  return request({
    url: '/back/base/unit',
    method: 'post',
    data
  })
}

//激活码管理
/*
 * 添加激活码
 * @param {*} data 
 */
export function addCode(data) {
  return request({
    url: '/back/code/addCode',
    method: 'post',
    data
  })
}

/*
 * 激活码列表
 * @param {*} data 
 */
export function codeList(data) {
  return request({
    url: '/back/code/code',
    method: 'post',
    data
  })
}

/*
 * 激活码列表
 * @param {*} data 
 */
export function codeEdit(data) {
  return request({
    url: '/back/code/edit',
    method: 'post',
    data
  })
}

//题目查询接口
/*
 * 激活码列表
 * @param {*} data 
 */
export function qlogList(data) {
  return request({
    url: '/back/qlog/list',
    method: 'post',
    data
  })
}


//查询全部模块试题
/*
 * 全部模块试题
 * @param {*} data 
 */
export function partType(data) {
  return request({
    url: 'back/qest/partType',
    method: 'post',
    data
  })
}

/*
 * 多级菜单
 * @param {*} data 
 */
export function mulMenu(data) {
  return request({
    url: '/back/base/mulMenu',
    method: 'post',
    data
  })
}

/*
 * 录入
 * @param {*} data 
 */
export function qestUp(data) {
  return request({
    url: '/back/qest/submit',
    method: 'post',
    data
  })
}

/*
 * 根据册、单元、题型查询题目
 */
export function qestList(data) {
  return request({
    url: 'back/qest/list',
    method: 'post',
    data
  })
} 

/*
 * 删除试题
 * @param {*} data 
 */
export function qestDel(data) {
  return request({
    url: 'back/qest/delete',
    method: 'post',
    data
  })
}

/*
 * 编辑试题
 * @param {*} data 
 */
export function qestEdit(data) {
  return request({
    url: 'back/qest/edit',
    method: 'post',
    data
  })
}