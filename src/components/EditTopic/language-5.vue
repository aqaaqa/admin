<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="短文" :label-width="formLabelWidth" > 
      <p class="hint-text">注：标注题目'___12___'</p>
      <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="单词" :label-width="formLabelWidth" > 
      <p class="hint-text">注：单词之间空行隔开</p>
      <el-input type="textarea" v-model="form.select_words" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每一题答案占一行</p>
      <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { choiceOper, langStr, cleanCor } from '@/utils/arr'

export default {
  props: ['value'],
  data(){
    return {
      form: {
        desc: '五、填空题。阅读下面的短文，从方框中选择适当的单词或短语并用其正确形式将短文补充完整。',
        article: 'The Notre Dame de Paris (巴黎圣母院) is one of the most widely ___73___ symbols of the city of Paris and the French nation. \nIt is located in downtown Paris, along the Seine River. The features that make this cathedral so ___74___ are its rose windows and historic ___75___ . ',
        select_words:'comment\r\n\nlikely\r\n\nsculpt\r\n\nremind',
        cor: '73.remind\n74.sculpt\n75.comment'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = langStr(val)
      form.article = val.article.replace(/<br>|<br\/>/g, '\n')
      val.detail.forEach(e=> {
        form.cor = e.correct.join('\n')
        form.select_words = e.select_words.join('\r\n\n')
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
      let list  = choiceOper(form.select_words,form.cor)
      partObj.detail = list
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }
  }
}
</script>