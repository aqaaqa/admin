import request from '@/utils/request'

/**
 * 全部试题
 * @param {*} params 
 */
export function questList(data) {
  return request({
    url:'/quest/list',
    method: 'post',
    data
  })
}

/**
 * 已选试题
 * @param {*} params 
 */
export function listSeled(data) {
  return request({
    url:'/quest/listSeled',
    method: 'post',
    data
  })
}


/**
 * 所属题型
 * @param {*} params 
 */
export function questTypes() {
  return request({
    url:'/quest/types',
    method: 'post'
  })
}

/**
 * 添加已选
 * @param {*} params 
 */
export function cacheAdd(data) {
  return request({
    url:'/cache/add',
    method: 'post',
    data
  })
}

/**
 * 删除已选
 * @param {*} params 
 */
export function cacheDel(data) {
  return request({
    url:'/cache/del',
    method: 'post',
    data
  })
}


/**
 * 删除全部
 * @param {*} params 
 */
export function cacheDelall(data) {
  return request({
    url:'/cache/delAll',
    method: 'post',
    data
  })
}

/**
 * 上移试题
 * @param {*} params 
 */
export function cacheUp(data) {
  return request({
    url:'/cache/up',
    method: 'post',
    data
  })
}

/**
 * 下移试题
 * @param {*} params 
 */
export function cacheDown(data) {
  return request({
    url:'/cache/down',
    method: 'post',
    data
  })
}


/**
 * 替换试题
 * @param {*} params 
 */
export function cacheRep(data) {
  return request({
    url:'/cache/repQes',
    method: 'post',
    data
  })
}

/**
 * 更改分数
 * @param {*} params 
 */
export function cacheUpdate(data) {
  return request({
    url:'/quest/update',
    method: 'post',
    data
  })
}

/**
 * 导出word
 * @param {*} params 
 */
export function paprerWord(params) {
  return request({
    url:'/paper/download',
    method: 'get',
    params
  })
}

