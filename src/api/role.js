import request from '@/utils/request';
/*
 * 查询所有用户角色信息 (用户角色信息列表)
 * @param {} data 
 */
export function getAllUser(data) {
  return request({
    url: '/back/urole/userRole',
    method: 'post',
    data
  })
}
/*
 *  查询所有用户的所有角色
 * @param {*} data 
 */
export function getAllRole(data) {
  return request({
    url: '/back/role/roles',
    method: 'post',
    data
  })
}
/*
 * 修改用户角色
 * @param {*} data 
 */
export function modify(data) {
  return request({
    url: '/back/urole/add',
    method: 'post',
    data
  })
}

