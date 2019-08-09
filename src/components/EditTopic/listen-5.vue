<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
    </el-form-item>
    <el-form-item label="表格小标题" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="form.title" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
    </el-form-item>
    <el-form-item label="表格" :label-width="formLabelWidth" > 
      <p class="hint-text">注：需添加标题,标题和内容需空格隔开，
        <br>
        例第一行第一列1.1+空格+内容=1.1 listen<br>第二行第一列2.1 ___1___<br>第三行第一列2.2 (空格)表示空行
        <br>
        每行之间空行隔开</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每一题答案占一行</p>
      <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="听力地址" :label-width="formLabelWidth" > 
      <el-input v-model="form.url" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="听力脚本" :label-width="formLabelWidth" > 
      <p class="hint-text">注：段落之间换行隔开</p>
      <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { tableOper, listenStr } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '三、听对话，填表格',
        title: 'What Should a Good Friend Be like?',
        detail: '1.1 Expression\n1.2 Meaning\n1.3 Explanation\r\n\n2.1 ___1___ \n2.2 \n2.3 Look at this person is a treat for ___3___, just like candy is a treat for the tongue.',
        url: '1.mp3',
        cor: 'around\nhouse',
        article: 'hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time\nhi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time'
      },
      formLabelWidth: '100px'
    }
  },
  computed: {
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = listenStr(val)
      let strs = ''
      val.detail.forEach(e=> {
        for (let i = 0; i < e.steam.length; i++) {
          let q = e.steam[i].substr(0, 2)
          if(i == 0) {
            strs = e.steam[0] + '\n'
          } else {
            if(strs.indexOf(q) > -1) {
              strs = strs + e.steam[i] + '\n'
            } else {
              strs = strs + '\r\n' + e.steam[i] + '\n'
            }
          }
          
        }
        form.detail = strs
        form.cor = e.correct.join('\n')
      })
      form.title = val.title
      form = Object.assign(form, a)
      
    },
    lists() {
      let partObj = {}
      let form = this.form
      let msg
      for(let d in form) {
        if(!form[d] && d!='title') {
          msg = '信息不能为空'
        }
      }
      if(msg) {
        this.$message.error(msg)
        return false
      }
      let list  = tableOper(form.detail, form.cor)
      partObj.detail = list
      partObj.mp3 = form.url
      partObj.title = form.title
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }
  }
}
</script>