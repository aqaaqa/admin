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
 * 填充option
 */
export function pushOption(str) {
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
 * 单选
 */
export function changeOper(str,cor) {
  let list = []
  let a = str.split('\n')
  let cors = cor.toUpperCase().split('\n').filter(e => e.trim() != '')
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
export function trueOper(str,cor, other) {
  let list = []
  let cors = ''
  if(other) {
    cors = cor.split('\n').filter(e => e.trim() != '')
  } else {
    cors = cor.toUpperCase().split('\n').filter(e => e.trim() != '')
  }
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
  let cors = cor.split('\n').filter(e=> e.trim() != '')
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
  let cors = cor.toUpperCase().split('\n').filter(e=> e.trim() != '')
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
  let cors = cor.split('\n').filter( e => e.trim() != '')
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
 let cors = cor.split('\n').filter( e => e.trim() != '')
 list.push({
   steam: pushSteam(detail),
   select_words : pushSteam(str),
   correct : cors
 })
 return list
}


/**
 * 完型填空
 */
export function proOper(str,cor) {
  let cors = cor.toUpperCase().split('\n').filter(e => e.trim() != '')
  let list = []
  let arrs = {
    options: [],
    steam: []
  }
  let strs = str.split('\n')
  for(let i in strs) {
    let k = strs[i].trim()
    if(k) {
      let a = k.indexOf('A.')
      let b = k.indexOf('B.')
      let c = k.indexOf('C.')
      let d = k.indexOf('D.')
      arrs.steam.push(k.substring(0,a).trim())
      arrs.options.push(k.substring(a,b).trim())
      arrs.options.push(k.substring(b,c).trim())
      arrs.options.push(k.substring(c,d).trim())
      arrs.options.push(k.substring(d).trim())
      list.push(arrs)
      arrs = {
        options: [],
        steam: []
      }
    }
  }

  for(let i=0;i< list.length;i++) {
    list[i].correct = [cors[i]]
  }
  return list
}

/**
 * 选句填空
 */
export function senOper(str,cor) {
  let list = []
  let cors = cor.toUpperCase().split('\n').filter(e => e.trim() != '')
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
  let cors = cor.toUpperCase().split('\n').filter(e => e.trim() != '')
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
  if(cor) {
    let cors = pushSteam(cor)
    for(let i = 0; i < steam.length; i++) {
      list.push({
        steam : [steam[i]],
        correct : [cors[i]]
      })
    }
  } else {
    for(let i = 0; i < steam.length; i++) {
      list.push({
        steam : [steam[i]],
      })
    }
  }
  
  
  return list
}

/**
 * 写作
 */
export function writeSteam(str,cor) {
  let arrs = []
  let b = strTab(cor).split(/###+/g)
  let a = strTab(str).split(/###+/g)
  // let atr = pushSteam(cor)
  // for(let i = 0; i <a.length; i++) {
  //   let c = a[i].trim()
  //   if(c) {
  //     b.push(c)
  //     if(i == a.length-1) {
  //       arrs.push({
  //         steam: b
  //       })
  //     }
  //   } else {
  //     if(b) {
  //       arrs.push({
  //         steam: b
  //       })
  //       b = []
  //     }
  //   }
  // }
  for(let k = 0; k < a.length; k++) {
    arrs.push({
      steam: [a[k]],
      correct: [b[k]]
    })
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
  let arrs = []
  let b = pushOption(options)
  let a = pushSteam(str)
  for(let i =0; i<a.length;i++) {
    arrs.push({
      steam: [a[i]],
      options: b[i]
    })
  }
  return arrs
}

/**
 * 辩论题型整合
 */
export function argueStr(str) {
  let list = {}
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
        list = b
      }
    } else {
      if(x==0) {
        x=1
      } else {
        list = b
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
/**
 * 表格，网格
 */
export function tableOper (str, cor, option) {
  let a = str.split('\n').filter(e=> e.trim()!= '')

  if(option) {
    let b = cor.split('\n').map(e=> {
      return e=e.trim()
    })
    let d = pushSteam(option)
    return [{
      steam: a,
      correct: b,
      options : d
    }]
  } else {
    let b = cor.split('\n').map(e=> {
      return e=e.trim()
    })
    return [{
      steam: a,
      correct: b
    }]
  }
}

/**
 * 复述
 */
export function retellOper(str) {
  let list = []
  list.push({
    steam : pushSteam(str),
  })
  return list
}



/**
 * 标题转 str
 */
export function titleStr(name, desc) {
  let c = ''
  if(desc && desc.en && desc.zh) {
    c = `${name}\n${desc.en}\n${desc.zh}`
  } else if(desc && desc.en) {
    c = `${name}\n${desc.en}`
  } else {
    c = `${name}`
  }
  return c
}
/**
 * 听力str
 */
export function listenStr(data) {
  let form = {}
  form.desc = titleStr(data.name, data.directions)
  form.article = data.article ? data.article.replace(/<br>|<br\/>/g, '\n') : ''
  // let mp3 = data.mp3
  // form.url = mp3.substring(mp3.lastIndexOf('//')+2)
  return form
}

/**
 * 语言知识运用str
 */
export function langStr(data) {
  let form = {}
  form.desc = titleStr(data.name, data.directions)
  return form
}


/**
 * 阅读str
 */
export function readStr(data) {
  let form = {}
  form.desc = titleStr(data.name, data.directions)
  return form
}

/**
 * lang3,4
 */
export function lang3Str(val, a) {
  let form = {}
  val.detail.forEach(e=> {
    form.detail = e.steam.join('\r\n\n')
    if(a) {
      form.cor = e.correct.join('\n')
    } else {
      form.cor = e.correct.join('\r\n\n')
    }
    
  })
  form.desc = titleStr(val.name, val.directions)
  return form
}


/**
 * str加表格
 */

export function strTab(html) {
  var arr = [];
  for(var i=0;i<html.length;){
    var s = html.indexOf('<table ', i);
    var e = html.indexOf('</table>', s);
    if(s!= -1 & e!=-1){
      var prev = html.substring(i,s);
      var table = html.substring(s,e+8);
      arr.push(prev.replace(/[\r]?[\n]/g, '<br>'));
      arr.push(table);
      i = e+8;
      if(html.substring(i,i+2) ==  '\r\n'){
        i+=2;
      }else if(html.substring(i,i+1) ==  '\n'){
        i+=1;
      }
    }else{
      var prev = html.substring(i);
      arr.push(prev.replace(/[\r]?[\n]/g, '<br>'));
      i = html.length;
    }
  }
  
  return arr.join('')
}