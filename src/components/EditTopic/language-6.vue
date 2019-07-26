<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="短文" :label-width="formLabelWidth" > 
      <p class="hint-text">注：标注题目'___1___'</p>
      <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：小题之间空行隔开</p>
      <el-input type="textarea" v-model="form.options" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { proOper } from '@/utils/arr'

export default {
  props: ['value'],
  data(){
    return {
      form: {
        desc: '八、完形填空题',
        article: 'Since the beginning of the twentieth century the number of wild Tigers has been on an alarming decrease. ___1___, it appears the tide has finally turned. The ___2___ of dedicated conservation programmes has ___3___ the first growth in wild population numbers for over a century and, while still vulnerable, the big cat’s future is looking a little more assured.',
        options:'1. A. Though B.Therefore C.However D. Instead\r\n\n2. A. establishment B. majority C. arrangement D. permission',
        cor: 'ABC'
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    // let a = this.value.split('|')
    // this.form.desc = '一、' + a[0]
  },
  methods: {
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
      let list  = proOper(form.options,form.cor)
      partObj.detail = list
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }
  }
}
</script>