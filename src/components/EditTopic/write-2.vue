<template>
<el-form :model="form" size="mini">
  <el-form-item label="标题和描述" :label-width="formLabelWidth">
    <p class="hint-text">注：根据换行自动匹配对应标题和描述</p>
    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
  </el-form-item>
  <el-form-item label="题目" :label-width="formLabelWidth" > 
    <p class="hint-text">注：建议每次只录一题，多题###隔开</p>
    <el-input type="textarea" v-model="form.article" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
  <el-form-item label="范文" :label-width="formLabelWidth" > 
    <p class="hint-text">注：每题答案之间###隔开</p>
    <el-input type="textarea" v-model="form.cor" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
  </el-form-item>
</el-form>  
</template>

<script>
import { writeSteam, readStr} from '@/utils/arr'

export default {
  data(){
    return {
      form: {
        desc: '二、书面表达。',
        article: '88.你所在学校的英文杂志正在向学生征集有关英语学习的文章，请你结合自身学习英语的经历，写一则短文。要点如下：\n（1）你在英语学习过程中遇到了哪些困难？\n（2）你是如何解决这些困难的？\n（3）你认为自己在英语学习上还有哪些需要提高的地方？你打算怎么做？\n注意：\n（1）词数不少于80；\n（2）可以适当增加细节，以使行文连贯。\n###\n 89.请根据以下题目和提示写一篇议论文',
        cor: 'When I look back on previous years, many memories come to my mind. For example, I used to have an inferiority complex due to my poor English speaking and listening ability, despite being pretty good at English grammar. \n###\nIt was absolutely frustrating being unable to engage in meaningful conversations, at the dining table of my house, where I lived with a native English speaker. However, little by little, I got used to it, as the saying goes, “Practice makes perfect.”'
      },
      formLabelWidth: '100px',
      
    }
  },
  created() {
    this.form = {
      desc: '二、书面表达。',
      article: '88.你所在学校的英文杂志正在向学生征集有关英语学习的文章，请你结合自身学习英语的经历，写一则短文。要点如下：\n（1）你在英语学习过程中遇到了哪些困难？\n（2）你是如何解决这些困难的？\n（3）你认为自己在英语学习上还有哪些需要提高的地方？你打算怎么做？\n注意：\n（1）词数不少于80；\n（2）可以适当增加细节，以使行文连贯。\n###\n 89.请根据以下题目和提示写一篇议论文',
      cor: 'When I look back on previous years, many memories come to my mind. For example, I used to have an inferiority complex due to my poor English speaking and listening ability, despite being pretty good at English grammar. \n###\nIt was absolutely frustrating being unable to engage in meaningful conversations, at the dining table of my house, where I lived with a native English speaker. However, little by little, I got used to it, as the saying goes, “Practice makes perfect.”'
    }
  },
  methods: {
    partForm(val) {
      let form = this.form
      let a = readStr(val)
      form.article = ''
      form.cor = ''
      val.detail.forEach(e=> {
        form.article = form.article + e.steam.join('\n').replace(/<br>|<br\/>/g, '\n') + '\n###\n'
        e.correct && e.correct[0] ? form.cor = form.cor + e.correct.join('\n').replace(/<br>|<br\/>/g, '\n') + '\n###\n' : ''
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
      let list  = writeSteam(form.article, form.cor)
      partObj.detail = list
      // if( this.type == '阅读题') {
      //   partObj.article = form.article.replace(/(\r\n)|(\n)/g,'<br/>')
      // }
      return partObj
    }

  }
}
</script>