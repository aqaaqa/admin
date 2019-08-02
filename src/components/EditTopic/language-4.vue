<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开,下划线用 '___'</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每一题答案占一行</p>
      <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { gapOper, lang3Str } from '@/utils/arr'

export default {
  props: ['value'],
  data(){
    return {
      form: {
        desc: '二、填空题。根据括号中的中文释义，用本单元出现的单词的正确形式完成句子。',
        detail: '43.I was ______ (相当) surprised to see my parents in my school.\r\n\n44.His speech ______ (反映) the views of most citizens.\r\n\n45.Mike is new to this school, so he is ______ (不熟悉的) with his classmates.',
        cor: 'wrewr\nwerw\nwerw'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    partForm(val) {
      this.form = lang3Str(val,'splits')
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
      let list  = gapOper(form.detail,form.cor)
      partObj.detail = list
      return partObj
    }
  }
}
</script>