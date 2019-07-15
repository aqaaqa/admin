import request from '@/utils/request'

/*
 * 我的试卷
 * @param {*} data 
 */
export function myPaper(params) {
  return request({
      url: '/paper/myPaper',
      method: 'get',
      params
  })
}

/*
 * 删除试卷
 * @param {*} data 
 */
export function paperDel(data) {
  return request({
      url: '/paper/delete',
      method: 'post',
      data
  })
}

/*
 * 试卷题目列表
 * @param {*} data 
 */
export function paperEdit(data) {
  return request({
      url: '/paper/edit',
      method: 'post',
      data
  })
}

/*
 * 保存试卷
 * @param {*} data 
 */
export function paperSave(data) {
  return request({
      url: '/paper/save',
      method: 'post',
      data
  })
}

/*
 * 服务器信息
 * @param {*} data 
 */
export function paperInfo(data) {
  return request({
      url: 'paper/info',
      method: 'get',
      data
  })
}


// /*
//  * 删除全部已选试题
//  * @param {*} data 
//  */
// export function paperDelall(data) {
//   return request({
//       url: '/paper/delAll',
//       method: 'post',
//       data
//   })
// }

/*
 * 删除已选试题
 * @param {*} data 
 */
// export function paperDelall(data) {
//   return request({
//       url: '/paper/delAll',
//       method: 'post',
//       data
//   })
// }

// /*
//  * 替换题目
//  * @param {*} data 
//  */
// export function paperRep(data) {
//   return request({
//       url: '/paper/replace',
//       method: 'post',
//       data
//   })
// }
// /*
//  * 更改分数
//  * @param {*} data 
//  */
// export function paperUpdate(data) {
//   return request({
//       url: '/paper/update',
//       method: 'post',
//       data
//   })
// }

// /*
//  * 上移试题
//  * @param {*} data 
//  */
// export function paperUp(data) {
//   return request({
//       url: '/paper/up',
//       method: 'post',
//       data
//   })
// }

// /*
//  * 下移试题
//  * @param {*} data 
//  */
// export function paperDown(data) {
//   return request({
//       url: '/paper/down',
//       method: 'post',
//       data
//   })
// }
