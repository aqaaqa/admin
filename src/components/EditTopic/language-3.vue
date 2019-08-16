<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每题之间空行隔开</p>
      <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { trueOper, lang3Str } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '三、改写题\nRewrite the sentences by using verb-ing form. \n用动词的ing形式改写下列句子。',
        detail: '1.	Mrs Webb didn’t receive any directions from Mr Smith.  \r\n\n2.	Mrs Webb travelled to downtown by an underground train. \r\n\n3.	Mr Smith’s office is opposite a road under the street. 	\r\n\n4.	Mr Smith’s office is on street level. \r\n\n5.	Mr Smith doesn’t know American English well. ',
        cor: '1.Mrs Webb didn’t receive any directions from Mr Smith.\r\n\n2.Mrs Webb didn’t receive any directions from Mr Smith.'
      },
      formLabelWidth: '100px',
    }
  },
  methods: {
    partForm(val) {
      this.form = lang3Str(val)
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
      let list  = trueOper(form.detail,form.cor,'other')
      partObj.detail = list
      return partObj
    }
  }
}
</script>
