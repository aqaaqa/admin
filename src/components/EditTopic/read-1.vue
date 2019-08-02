<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="文章" :label-width="formLabelWidth" > 
    <p class="hint-text">注：段落之间换行隔开</p>
    <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题,题干需空一行隔开，选项必须一项占一行</p>
    <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="答案" :label-width="formLabelWidth" > 
    <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { changeOper, readStr } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '一、单选题',
        article: 'Food expressions are popular with language learners. They combine two things important to every culture: food and language. Today we are going to talk potatoes!\nWhether you like them boiled, baked or fried – potatoes are what we call a staple. This means they are a kind of basic food that you can build on. You can cover them in butter, salt and pepper or sour cream and herbs. ',
        detail: '29.Why does the author mention different ways to cook potatoes in Paragraph 4?\n\r\nA.To recommend his favourite potato dish.\nB.To introduce different types of potatoes in different countries.\nC.To show that potatoes are a main food for most people in their lives.\nD.To show that people have not lived until they have eaten a baked potato.',
        cor: 'ABB'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = readStr(val)
      form.detail = '' 
      form.cor = ''
      form.article = val.article.replace(/<br>|<br\/>/g, '\n')
      val.detail.forEach(e=> {
        let c = ''
        let steam = e.steam.join('\n')
        c = e.options.join('\n')
        form.detail = form.detail + steam +'\r\n\n' + c +'\r\n\n'
        e.correct[0] ? form.cor = form.cor+ e.correct[0] : ''
      })
      form = Object.assign(form, a)
    },
    lists() {
      let partObj = {}
      let form = this.form
      let msg
      for(let d in form) {
        if(!form[d]) {
          msg = '信息不能为空'
        }
      }
      if(msg) {
        this.$message.error(msg)
        return false
      }
      let list  = changeOper(form.detail,form.cor)
      partObj.detail = list
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }

  }
}
</script>