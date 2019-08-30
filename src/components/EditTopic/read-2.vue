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
    <p class="hint-text">注：每一题答案占一行</p>
    <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { senOper, readStr, strTab,cleanCor } from '@/utils/arr'


export default {
  data(){
    return {
      form: {
        desc: '二、任务型阅读',
        article: 'Are you worried about moving up to senior high school? Have you ever thought about how to spend your three years of senior high school life? It is a completely new experience, but you shouldn’t be frightened. Here are some tips to help you. You are not alone. Maybe you do not notice that everybody else in your grade are just as nervous as you are. \n\r\n___1___ Moving up to senior high school is a chance, not a problem. Things are different, and all you need to do is to be open-minded and learn the new rules. ___2___ If you don’t know what to do or have problems in learning or relationship, you should ask for help. Teachers are certainly the best people to turn to because they have experience in dealing with students’ problems, including helping them get used to the new environment. Also, if you cannot attend the school for some days, ask your teachers about any missed work. It is your responsibility to catch up, not theirs. \n\r\n',
        detail: 'A. It is risky to start on your work a few days before your deadline. \r\n\nB. If it is due to valid reasons.\r\n\nC. Do not put your future to waste. \r\n\nD. So remember that you all are in the same boat. ',
        cor: '1.A\n2.B\n3.B'
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = readStr(val)
      form.article = val.article.replace(/<br>|<br\/>/g, '\n')
      val.detail.forEach(e=> {
        form.detail = e.options.join('\r\n\n')
        form.cor = e.correct.join('\n')
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
      let list  = senOper(form.detail,form.cor)
      partObj.detail = list
      // partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      partObj.article = strTab(form.article)

      return partObj
    }

  }
}
</script>