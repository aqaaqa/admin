<template>
  <el-form :model="form" size="mini">
    <el-form-item label="标题和描述" :label-width="formLabelWidth">
      <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth" > 
      <p class="hint-text">注：小题之间空行隔开，题目'___1___'</p>
      <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="单词" :label-width="formLabelWidth" > 
      <p class="hint-text">注：单词之间空行隔开</p>
      <el-input type="textarea" v-model="form.select_words" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth" > 
      <p class="hint-text">注：每个答案之间用英文逗号 ',' 分隔</p>
      <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-form>  
</template>

<script>
import { simpleOper } from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '一、填空题。从方框中选择适当的单词并用其正确形式填入句子中。\nFill in the blanks with the correct form of the words below.\n用下列单词的正确形式填空。',
        detail: '33.	The museum collects many world-famous paintings and ______.\r\n\n34.	Although he is my friend, I hold a(n) ______ view on this plan.\r\n\n35.	People were not aware of the fire until the ______ rang.\r\n\n36.	Parents and teachers should encourage young children’s ______.',
        select_words:'comment\r\n\nlikely\r\n\nsculpt\r\n\nremind',
        cor: 'remind,sculpt,comment, likely'
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
      let list  = simpleOper(form.detail,form.select_words,form.cor)
      partObj.detail = list
      return partObj
    }
  }
}
</script>