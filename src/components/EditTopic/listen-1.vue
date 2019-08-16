<template>
<el-form :model="form" size="mini">
  
  <el-form-item label="听力音频" :label-width="formLabelWidth" > 
    <p class="hint-text">注：只能上传mp3,ogg,wav格式文件</p>
    <upload ref = 'mp3Up' />
  </el-form-item>
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="小标题" :label-width="formLabelWidth">
    <el-input type="textarea" v-model="form.title" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：小题,题干需空一行隔开，选项必须一项占一行</p>
    <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="答案" :label-width="formLabelWidth" > 
    <p class="hint-text">注：每一题答案占一行</p>
    <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <!-- <el-form-item label="听力地址" :label-width="formLabelWidth" > 
    <el-input v-model="form.url" placeholder="请输入内容"></el-input>
  </el-form-item> -->
  <el-form-item label="听力脚本" :label-width="formLabelWidth" > 
    <p class="hint-text">注：段落之间换行隔开,小题的需要&lt;span&gt;&lt;/span&gt;标签分隔</p>
    <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { changeOper, listenStr } from '@/utils/arr'
import upload  from '../upload/index' 

export default {
  data(){
    return {
      form: {
        desc: '一、听短对话，选择正确的答案\nListen to 10 short conversations and choose the correct answer for each question.\n听对话，从每题所给的A，B，C三个选项中选择正确选项。',
        detail: '6.	Which of the following is not Mr Lee’s suggestion about creating an English learning environment?\n\r\nA.	Writing English journals.\nB.	Moving to an English-speaking country.\nC.	Listening to English radio.',
        title: '听第一段对话，回答第6至第7题。',
        cor: '6.A',
        article: '<span>1.</span><span>W: What’s that building next to the playground? The sports centre? \nM: No, it’s the library. The sports centre is near the meeting hall.</span>\n<span>2.</span><span>B: Have you seen my dictionary? I remember I put it next to the textbooks, but it’s not there.\nW: Let me check the shelf. Um… Nope. Ah, here it is, under the newspaper!</span>\r\n\nyou can learn this for some time hi this is listening article , you can learn this for some time\nhi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time hi this is listening article , you can learn this for some time'
      },
      formLabelWidth: '100px',
      mp3Url: ''
    }
  },
  components: {
    upload
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = listenStr(val)
      form.detail = '' 
      form.cor = ''
      val.detail.forEach(e=> {
        let c = ''
        let steam = e.steam.join('\n')
        c = e.options.join('\n')
        form.detail = form.detail + steam +'\r\n\n' + c +'\r\n\n'
        e.correct[0] ? form.cor = form.cor+ e.correct[0] + '\n' : ''
      })
      form.title = val.title
      this.$refs.mp3Up.arrPush(val.mp3)
      form = Object.assign(form, a)
    },
    lists() {
      let partObj = {}
      let form = this.form
      let msg
      for(let d in form) {
        if(!form[d] && d!='title') {
          msg = '信息不能为空'
        }
      }
      if(msg) {
        this.$message.error(msg)
        return false
      }
      let list  = changeOper(form.detail,form.cor)
      partObj.detail = list
      partObj.mp3 = this.$refs.mp3Up.imageUrl
      partObj.title = form.title
      partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      return partObj
    },
    

  }
}
</script>