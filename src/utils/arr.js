/**
 * 处理标题
 * string
 */
export function titleOper(str) {
  return str.split('\n').filter(e=> e.trim()!= '')
}

/**
 * 填充题干
 */
export function pushSteam(str) {
  let arrs = []
  let b
  let a = str.split('\n')
  for(let i = 0; i <a.length; i++) {
    let c = a[i].trim()
    if(c) {
      if(b) {
        b= b+'\n'+c
      } else {
        b = c
      }
      if(i == a.length-1) {
        arrs.push(b)
      }
    } else {
      if(b) {
        arrs.push(b)
        b = null
      }
    }
  }
  return arrs
}


/**
 * 单选
 */
export function changeOper(str,cor) {
  let list = []
  let a = str.split('\n')
  let cors = cor.toUpperCase().split('')
  let b = {
    options: [],
    steam: []
  }
  let x = 0;
  for(let i = 0; i <a.length; i++) {
    let c = a[i].trim()
    if(c) {
      if(x=='1') {
        b.options.push(c)
      } else {
        b.steam.push(c)
      }
      if(i == a.length-1) {
        list.push(b)
        b = {
          options: []
        }
      }
    } else {
      if(x==0) {
        x=1
      } else {
        list.push(b)
        b = {
          options: [],
          steam: []
        }
        x=0
      }
    }
  }
  for(let i=0;i< list.length;i++) {
    list[i].correct = [cors[i]]
  }
  return list
}


/**
 * 判断
 */
export function trueOper(str,cor) {
  let list = []
  let cors = cor.toUpperCase().split('')
  list.push({
    steam : pushSteam(str),
    correct : cors
  })
  return list
}

/**
 * 填空
 */
export function gapOper(str,cor) {
  let list = []
  let cors = cor.split(',')
  list.push({
    steam : pushSteam(str),
    correct : cors
  })
  return list
}

/**
 * 匹配
 */
export function matchOper(str1,str2,cor) {
  let list = []
  let cors = cor.split('')
  list.push({
    steam : pushSteam(str1),
    options: pushSteam(str2),
    correct : cors
  })
  return list
}

/**
 * 选词填空
 */
export function choiceOper(str,cor) {
  let list = []
  let cors = cor.split(',')
  list.push({
    select_words : pushSteam(str),
    correct : cors
  })
  return list
}

/**
 * 完型填空
 */
export function proOper(str,cor) {
  let list = []
  let cors = cor.split('')
  let a = pushSteam(str).map(e=> {
    e = e.replace(/\n/g,' ')
    return e
  })
  list.push({
    options : a,
    correct : cors
  })
  return list
}

/**
 * 选句填空
 */
export function senOper(str,cor) {
  let list = []
  let cors = cor.split('')
  list.push({
    options : pushSteam(str),
    correct : cors
  })
  return list
}

/**
 * 判断
 */
export function judegOper(str,cor) {
  let list = []
  let steam = pushSteam(str)
  let cors = cor.split('')
  for(let i = 0; i < steam.length; i++) {
    list.push({
      steam : [steam[i]],
      correct : [cors[i]]
    })
  }
  return list
}


/**
 * 判断
 */
export function shortOper(str,cor) {
  let list = []
  let steam = pushSteam(str)
  let cors = pushSteam(cor)
  for(let i = 0; i < steam.length; i++) {
    list.push({
      steam : [steam[i]],
      correct : [cors[i]]
    })
  }
  return list
}