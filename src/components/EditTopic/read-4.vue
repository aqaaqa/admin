<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item v-if="part == '阅读题'" label="文章" :label-width="formLabelWidth" > 
    <p class="hint-text">注：段落之间换行隔开</p>
    <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="答案" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { shortOper } from '@/utils/arr'

export default {
  props: ['value'],
  data(){
    return {
      form: {
        desc: '四、 简答题\nAnswer the questions. \n回答下列问题。',
        article: 'If you want to make sure your understanding is correct, you may want to change the sentence into simple language and ask the person you are talking to if the meaning is correct. It never hurts to try to make something that you have heard in a conversation clearer. If you don’t ask, you don’t learn.\r\n\nThis advice applies when you hear some odd phrases in a conversation. You have to consider what the general context is in the conversation, and from there you will be able to make a guess of how the idiomatic expression connects to the conversation. Of course, this requires that you listen actively to the conversation and that your mind is not somewhere else.',
        detail: '19.What is Li Ming’s problem?\r\n\n20.What type of word is most likely to be used with the prefix “non-”?\r\n\n21.What happens to the prefix “in-” when it comes before the letters “b”, “l” and “r”?',
        cor: 'What is Li Ming’s proble\r\n\nWhat is Li Ming’s proble'
      },
      formLabelWidth: '120px',
      part: '',
      type: this.value
    }
  },
  watch: {
    value(val) {
      this.type = val
      if(val) {
        this.types()
      }
      
    }
  },
  created() {
    this.types()
  },
  methods: {
    types() {
      let a = this.type.split('|')
      this.part = a[1]
      if(a[1] == '写作题') {
        this.form = {
          desc : '一、翻译题。使用括号中所给的单词或短语将下列句子翻译成英文。',
          detail : '83.请在这张表格上填写您的基本信息。（fill in）\r\n\n84.你在使用这台新电脑时有困难吗？（have trouble doing）',
          cor: 'What is Li Ming’s proble\r\n\nWhat is Li Ming’s proble'
        }
      } else if(a[1] == '阅读题') {
        this.form = {
          desc: '四、 简答题\nAnswer the questions. \n回答下列问题。',
          article: 'If you want to make sure your understanding is correct, you may want to change the sentence into simple language and ask the person you are talking to if the meaning is correct. It never hurts to try to make something that you have heard in a conversation clearer. If you don’t ask, you don’t learn.\r\n\nThis advice applies when you hear some odd phrases in a conversation. You have to consider what the general context is in the conversation, and from there you will be able to make a guess of how the idiomatic expression connects to the conversation. Of course, this requires that you listen actively to the conversation and that your mind is not somewhere else.',
          detail: '19.What is Li Ming’s problem?\r\n\n20.What type of word is most likely to be used with the prefix “non-”?\r\n\n21.What happens to the prefix “in-” when it comes before the letters “b”, “l” and “r”?',
          cor: 'What is Li Ming’s proble\r\n\nWhat is Li Ming’s proble'
        }
      } else {
        this.form = {
          desc : '三、简答题\nTalk about the following questions. \n谈论下列问题。',
          detail : '92.What is the most important thing about learning English? Why do you think it is important?\r\n\n93.What may cause misunderstanding when you communicate with foreigners?',
          cor: 'What is Li Ming’s proble\r\n\nWhat is Li Ming’s proble'
        }
      }
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
      let list  = shortOper(form.detail,form.cor)
      partObj.detail = list
      if( this.part == '阅读题') {
        partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      }
      return partObj
    }

  }
}
</script>