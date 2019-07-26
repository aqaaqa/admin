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
        b= b+'<br/>'+c
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
 * 短文填空
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
* 单句填空
*/
export function simpleOper(detail,str,cor) {
 let list = []
 let cors = cor.split(',')
 list.push({
   stean: pushSteam(detail),
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
 * 简答
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

/**
 * 写作
 */
export function writeSteam(str) {
  let arrs = []
  let b = []
  let a = str.split('\n')
  for(let i = 0; i <a.length; i++) {
    let c = a[i].trim()
    if(c) {
      b.push(c)
      if(i == a.length-1) {
        arrs.push(b)
      }
    } else {
      if(b) {
        arrs.push(b)
        b = []
      }
    }
  }
  return arrs
}

/**
 * 朗读
 */
export function speakSteam(str) {
  let arrs = [
    {
      steam: []
    }
  ]
  let b = ''
  let a = str.split('\n')
  for(let i = 0; i <a.length; i++) {
    let c = a[i].trim()
    if(c) {
      if(b) {
        b = b+'<br/>' +c
      } else {
        b = c
      }
      if(i == a.length-1) {
        arrs[0].steam.push(b)
      }
    } else {
      if(b) {
        arrs[0].steam.push(b)
        b = ''
      }
    }
  }
  return arrs
}

/**
 * 讨论
 */
export function discSteam(str, options) {
  let arrs = [{
    steam: []
  }]
  let b = ''
  let a = str.split('\n')
  for(let i = 0; i <a.length; i++) {
    let c = a[i].trim()
    if(c) {
      if(b) {
        b = b+'<br/>' +c
      } else {
        b = c
      }
      if(i == a.length-1) {
        arrs[0].steam.push(b)
      }
    } else {
      if(b) {
        arrs[0].steam.push(b)
        b = ''
      }
    }
  }
  arrs[0].options = options.split('\n').filter(e => e != '')
  return arrs
}

/**
 * 辩论题型整合
 */
export function argueStr(str) {
  let list = []
  let a = str.split('\n')
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
          options: [],
          steam: []
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
  return list

}

/**
 * 辩论
 */
export function argueSteam(str, options) {
  let arrs=[]
  arrs.push(
    argueStr(str)
  )
  arrs.push(
    argueStr(options)
  )
  return arrs
}

export function tableOper (str, cor) {
  let a = str.split('\n').filter(e=> e!= '')
  let b = cor.split(',')
  return [{
    steam: a,
    correct: b
  }]
}
