<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
    
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题,题干需空一行隔开，选项必须一项占一行</p>
    <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="答案" :label-width="formLabelWidth" > 
    <p class="hint-text">注：每一题答案占一行</p>
    <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { changeOper, langStr, cleanCor } from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '一、单选题\nChoose the correct answer from A, B and C. \n从A，B和C三个选项中选出正确选项。',
        detail: '1. --- Do you know the girl ______ the bike? I probably saw her when I was in Mexico.\n--- Really? It\'s my sister. She went to Mexico last summer.\n\r\nA.	Writing English journals.\nB.	Moving to an English-speaking country.\nC.	Listening to English radio.',
        cor: '1.A'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = langStr(val)
      form.detail = '' 
      form.cor = ''
      val.detail.forEach(e=> {
        let c = ''
        c = e.options.join('\n')
        form.detail = form.detail + e.steam +'\r\n\n' + c +'\r\n\n'
        e.correct[0] ? form.cor = form.cor + e.correct[0]+'\n' : ''
        form.cor = cleanCor(form.cor)
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
      form.cor = cleanCor(form.cor)
      let list  = changeOper(form.detail,form.cor)
      if(list) {
        partObj.detail = list
        return partObj
      } else {
        this.$message.error('格式错误,请检查输入格式')
        return false
      }
      
    }

  }
}
</script>