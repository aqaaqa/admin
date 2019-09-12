<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开,下划线用 '___'</p>
      <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每一题答案占一行</p>
      <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { gapOper, lang3Str, cleanCor,langStr  } from '@/utils/arr'

export default {
  props: ['value'],
  data(){
    return {
      form: {
        desc: '二、填空题。阅读下面的短文，在空白处填入适当的单词或括号内单词的正确形式。',
        article: "A new report points out that a higher chance of getting heart disease is related (1) ______ eating eggs. The results follow several (2) ______ (early) studies that found eating eggs was generally (3) ______ (health).\r\n\nThe JAMA Network Open (4) ______ (publish) the new report in March. (5) ______ (combine) data from six other earlier studies, the report shows a six percent increased risk (6) ______ heart disease when the average number of eggs a person eats each day increases by half an egg.\r\n\nNorrina Allen, (7) ______ co-wrote the report, reported that, in the United States, eggs are generally one of the top (8) ______ (source) of cholesterol (胆固醇) in a person's diet. Individuals with higher levels of cholesterol in their diet are at increased risk for the (9) ______ (develop) of heart disease later in life, she said.\r\n\n(10) ______, Allen added that she would not say that eggs are completely unhealthy. \"I'm not encouraging people to take eggs out of their diets completely,\" she said. \"I'm just suggesting that people eat them reasonably.",
        cor: '43.wrewr\n44.werw\n45.werw'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = langStr(val)
      form.article = val.article.replace(/<br>|<br\/>/g, '\n') 
      form.cor = ''
      val.detail.forEach(e=> {
        form.cor = form.cor + e.correct.join('\n')
      })
      form.cor = cleanCor(form.cor)
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
      form.cor = cleanCor(form.cor)
      partObj.detail = [{
        correct : form.cor.split('\n').filter(e=> e.trim() != '')
      }]
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }
  }
}
</script>