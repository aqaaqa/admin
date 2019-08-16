<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item v-if="part == '阅读'" label="文章" :label-width="formLabelWidth" > 
    <p class="hint-text">注：段落之间换行隔开</p>
    <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item v-if="part != '口语'" label="答案" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题之间空行隔开</p>
    <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { shortOper, readStr, strTab } from '@/utils/arr'

export default {
  props: ['value'],
  data(){
    return {
      form: {
        desc: '四、 简答题\nAnswer the questions. \n回答下列问题。',
        article: 'If you want to make sure your understanding is correct, you may want to change the sentence into simple language and ask the person you are talking to if the meaning is correct. It never hurts to try to make something that you have heard in a conversation clearer. If you don’t ask, you don’t learn.\r\n\nThis advice applies when you hear some odd phrases in a conversation. You have to consider what the general context is in the conversation, and from there you will be able to make a guess of how the idiomatic expression connects to the conversation. Of course, this requires that you listen actively to the conversation and that your mind is not somewhere else.',
        detail: '19.What is Li Ming’s problem?\r\n\n20.What type of word is most likely to be used with the prefix “non-”?\r\n\n21.What happens to the prefix “in-” when it comes before the letters “b”, “l” and “r”?',
        cor: '19.What is Li Ming’s proble\r\n\n20.What is Li Ming’s proble'
      },
      formLabelWidth: '100px',
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
      if(a[1] == '口语') {
        this.form = {
          desc: '四、 简答题\nAnswer the questions. \n回答下列问题。',
          detail: '19.What is Li Ming’s problem?\r\n\n20.What type of word is most likely to be used with the prefix “non-”?\r\n\n21.What happens to the prefix “in-” when it comes before the letters “b”, “l” and “r”?',
        }
      } else if (a[1] == '阅读') {
        this.form = {
          desc: '四、 简答题\nAnswer the questions. \n回答下列问题。',
          article: 'If you want to make sure your understanding is correct, you may want to change the sentence into simple language and ask the person you are talking to if the meaning is correct. It never hurts to try to make something that you have heard in a conversation clearer. If you don’t ask, you don’t learn.\r\n\nThis advice applies when you hear some odd phrases in a conversation. You have to consider what the general context is in the conversation, and from there you will be able to make a guess of how the idiomatic expression connects to the conversation. Of course, this requires that you listen actively to the conversation and that your mind is not somewhere else.',
          detail: '19.What is Li Ming’s problem?\r\n\n20.What type of word is most likely to be used with the prefix “non-”?\r\n\n21.What happens to the prefix “in-” when it comes before the letters “b”, “l” and “r”?',
          cor: '19.What is Li Ming’s proble\r\n\n20.What is Li Ming’s proble'
        }
      } else if (a[1] == '写作') {
        this.form = {
          desc: '四、 翻译',
          detail: '19.What is Li Ming’s problem?\r\n\n20.What type of word is most likely to be used with the prefix “non-”?\r\n\n21.What happens to the prefix “in-” when it comes before the letters “b”, “l” and “r”?',
          cor: '19.What is Li Ming’s proble\r\n\n20.What is Li Ming’s proble'
        }
      }
    },
    partForm(val) {
      let form = this.form
      let a = readStr(val)
      form.detail = '' 
      if(this.part == '阅读') {
        form.article = val.article.replace(/<br>|<br\/>/g, '\n')
      }
      if(this.part != '口语') {
        form.cor = ''
        val.detail.forEach(e=> {
          let steam = e.steam.join('\n')
          form.detail = form.detail + steam +'\r\n\n'
          e.correct && e.correct[0] ? form.cor = form.cor+ e.correct[0] + '\r\n\n' : ''
        })
      } else {
        val.detail.forEach(e=> {
          let steam = e.steam.join('\n').replace(/<br>|<br\/>/g, '\n')
          form.detail = form.detail + steam +'\r\n\n'
        })
      }
      
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
      let list
      if(this.part == '口语') {
        list  = shortOper(form.detail)
      } else {
        list  = shortOper(form.detail,form.cor)
      }
      
      partObj.detail = list
      if( this.part == '阅读') {
        // partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
        partObj.article = strTab(form.article)
      }
      return partObj
    }

  }
}
</script>