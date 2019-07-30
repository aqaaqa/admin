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
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="答案" :label-width="formLabelWidth" > 
    <el-input v-model="form.cor" placeholder="请输入内容"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { judegOper } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '三、判断题\nDecide if the following statements are true or false. \n判断下列表述的正误。',
        article: 'If you want to make sure your understanding is correct, you may want to change the sentence into simple language and ask the person you are talking to if the meaning is correct. It never hurts to try to make something that you have heard in a conversation clearer. If you don’t ask, you don’t learn.\r\n\nThis advice applies when you hear some odd phrases in a conversation. You have to consider what the general context is in the conversation, and from there you will be able to make a guess of how the idiomatic expression connects to the conversation. Of course, this requires that you listen actively to the conversation and that your mind is not somewhere else.',
        detail: '1. People can see many on-screen scenes in Harry Potter movie series, but they willstill not know how the secret of magic.\r\n\n2. The entrance ticket of Warner Bros. Studio is included in the tour fee.',
        cor: 'FT'
      },
      formLabelWidth: '120px'
    }
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
      let list  = judegOper(form.detail,form.cor)
      partObj.detail = list
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    }

  }
}
</script>